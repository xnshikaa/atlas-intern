from datetime import datetime, timezone, date
from sqlalchemy import String, Boolean, DateTime, Integer, ForeignKey, Date, Text, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
import enum

from app.core.database import Base

class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    theme_color: Mapped[str] = mapped_column(String(20), default="#2A3A8A")
    
    programs: Mapped[List["Program"]] = relationship(back_populates="department", cascade="all, delete-orphan")

class Program(Base):
    __tablename__ = "programs"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    department: Mapped["Department"] = relationship(back_populates="programs")
    cohorts: Mapped[List["Cohort"]] = relationship(back_populates="program", cascade="all, delete-orphan")

class Cohort(Base):
    __tablename__ = "cohorts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    program_id: Mapped[int] = mapped_column(ForeignKey("programs.id"), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    division_name: Mapped[str] = mapped_column(String(50), nullable=False)
    
    program: Mapped["Program"] = relationship(back_populates="cohorts")
    subjects: Mapped[List["Subject"]] = relationship(back_populates="cohort", cascade="all, delete-orphan")

class Subject(Base):
    __tablename__ = "subjects"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    cohort_id: Mapped[int] = mapped_column(ForeignKey("cohorts.id"), nullable=False)
    primary_faculty_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    credits: Mapped[int] = mapped_column(Integer, default=3)
    
    cohort: Mapped["Cohort"] = relationship(back_populates="subjects")
    modules: Mapped[List["Module"]] = relationship(back_populates="subject", cascade="all, delete-orphan")
    schedules: Mapped[List["Schedule"]] = relationship(back_populates="subject", cascade="all, delete-orphan")

class Module(Base):
    __tablename__ = "modules"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    order: Mapped[int] = mapped_column(Integer, default=1)
    
    subject: Mapped["Subject"] = relationship(back_populates="modules")
    topics: Mapped[List["Topic"]] = relationship(back_populates="module", cascade="all, delete-orphan")

class ModuleDependency(Base):
    __tablename__ = "module_dependencies"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    module_id: Mapped[int] = mapped_column(ForeignKey("modules.id"), nullable=False)
    depends_on_module_id: Mapped[int] = mapped_column(ForeignKey("modules.id"), nullable=False)

class TopicState(str, enum.Enum):
    NOT_STARTED = "NOT_STARTED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Topic(Base):
    __tablename__ = "topics"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    module_id: Mapped[int] = mapped_column(ForeignKey("modules.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    estimated_lectures: Mapped[int] = mapped_column(Integer, default=1)
    completed_lectures: Mapped[int] = mapped_column(Integer, default=0)
    dependency_order: Mapped[int] = mapped_column(Integer, default=1)
    state: Mapped[TopicState] = mapped_column(Enum(TopicState), default=TopicState.NOT_STARTED, nullable=False)
    completion_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    
    module: Mapped["Module"] = relationship(back_populates="topics")

class ScheduleType(str, enum.Enum):
    LECTURE = "LECTURE"
    LAB = "LAB"
    MOOT_COURT = "MOOT_COURT"
    CASE_DISCUSSION = "CASE_DISCUSSION"
    PRESENTATION = "PRESENTATION"
    CIA = "CIA"
    TUTORIAL = "TUTORIAL"

class Schedule(Base):
    __tablename__ = "schedules"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    faculty_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"), nullable=False)
    cohort_id: Mapped[int] = mapped_column(ForeignKey("cohorts.id"), nullable=False)
    type: Mapped[ScheduleType] = mapped_column(Enum(ScheduleType), default=ScheduleType.LECTURE, nullable=False)
    day_of_week: Mapped[int] = mapped_column(Integer, nullable=False) # 0=Monday
    start_time: Mapped[str] = mapped_column(String(10), nullable=False) 
    end_time: Mapped[str] = mapped_column(String(10), nullable=False)
    room_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    subject: Mapped["Subject"] = relationship(back_populates="schedules")
    lecture_logs: Mapped[List["LectureLog"]] = relationship(back_populates="schedule", cascade="all, delete-orphan")

class LectureLog(Base):
    __tablename__ = "lecture_logs"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    schedule_id: Mapped[int] = mapped_column(ForeignKey("schedules.id"), nullable=False)
    actual_date: Mapped[date] = mapped_column(Date, nullable=False)
    topics_covered: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    attendance_pct: Mapped[Optional[float]] = mapped_column(nullable=True)
    
    schedule: Mapped["Schedule"] = relationship(back_populates="lecture_logs")

class Holiday(Base):
    __tablename__ = "holidays"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped[date] = mapped_column(Date, unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)

class AlertPriority(str, enum.Enum):
    CRITICAL = "CRITICAL"
    WARNING = "WARNING"
    INFO = "INFO"

class Alert(Base):
    __tablename__ = "alerts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    message: Mapped[str] = mapped_column(String(500), nullable=False)
    priority: Mapped[AlertPriority] = mapped_column(Enum(AlertPriority), default=AlertPriority.INFO, nullable=False)
    actionable_link: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    auto_resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
