from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from datetime import date, datetime

class TopicBase(BaseModel):
    name: str = Field(..., max_length=255)
    estimated_lectures: int = 1
    completed: bool = False
    completion_date: Optional[date] = None

class TopicCreate(TopicBase):
    module_id: int

class TopicResponse(TopicBase):
    id: int
    module_id: int
    model_config = ConfigDict(from_attributes=True)

class ModuleBase(BaseModel):
    name: str = Field(..., max_length=255)
    order: int = 1
    status: str = "Pending"

class ModuleCreate(ModuleBase):
    subject_id: int

class ModuleResponse(ModuleBase):
    id: int
    subject_id: int
    topics: List[TopicResponse] = []
    model_config = ConfigDict(from_attributes=True)

class SubjectBase(BaseModel):
    name: str = Field(..., max_length=255)
    code: str = Field(..., max_length=50)
    color_code: str = "#2A3686"

class SubjectCreate(SubjectBase):
    pass

class SubjectResponse(SubjectBase):
    id: int
    teacher_id: int
    modules: List[ModuleResponse] = []
    model_config = ConfigDict(from_attributes=True)

class ScheduleBase(BaseModel):
    subject_id: int
    day_of_week: int
    start_time: str
    end_time: str
    room: Optional[str] = None
    batch: Optional[str] = None

class ScheduleCreate(ScheduleBase):
    pass

class ScheduleResponse(ScheduleBase):
    id: int
    teacher_id: int
    model_config = ConfigDict(from_attributes=True)

class LectureLogBase(BaseModel):
    schedule_id: int
    topic_id: Optional[int] = None
    date: date
    content: Optional[str] = None
    attendance_pct: Optional[float] = None

class LectureLogCreate(LectureLogBase):
    pass

class LectureLogResponse(LectureLogBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class AlertResponse(BaseModel):
    id: int
    teacher_id: int
    message: str
    priority: str
    actionable_link: Optional[str] = None
    resolved: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
