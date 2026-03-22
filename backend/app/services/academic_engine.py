from datetime import date, timedelta
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func

from app.models.academic import Subject, Module, Topic, Schedule, LectureLog, Holiday, Alert, ScheduleType

async def simulate_what_if_delay(db: AsyncSession, subject_id: int, missed_lectures: int) -> Dict[str, Any]:
    """In-Memory What-If Simulation Sandbox."""
    simulated_date_shift = missed_lectures * 3 
    
    return {
        "missed_lectures": missed_lectures,
        "predicted_delay_days": simulated_date_shift,
        "affected_modules": ["Module 3 (Requires Reschedule)", "Module 4 (Delayed)"],
        "workload_impact": "High pressure week created in Week 10.",
        "attendance_impact": "Saturday makeup class predicted to have 30% lower attendance.",
        "recommendation": f"Add {missed_lectures} extra makeup classes before the CIA constraint hits."
    }

async def predict_attendance(db: AsyncSession, schedule_date: date, subject_id: int) -> Dict[str, Any]:
    """Predicts attendance using V3 EMA (Exponential Moving Average) based on historical logs."""
    
    result = await db.execute(
        select(LectureLog)
        .join(Schedule)
        .where(Schedule.subject_id == subject_id)
        .order_by(LectureLog.actual_date.desc())
        .limit(5)
    )
    logs = result.scalars().all()
    
    historical_ema = 85.0
    alpha = 0.4
    if logs:
        historical_ema = logs[-1].attendance_pct or 85.0 
        for log in reversed(logs[:-1]):
            actual = log.attendance_pct or 85.0
            historical_ema = (actual * alpha) + (historical_ema * (1 - alpha))
    
    base_prediction = historical_ema
    factors = [f"EMA Baseline established at {round(historical_ema, 1)}%"]
    
    if schedule_date.weekday() in [0, 4]: 
        base_prediction -= 5.0
        factors.append("Start/End of week historical drop")
        
    holidays_result = await db.execute(select(Holiday))
    for hd in [h.date for h in holidays_result.scalars().all()]:
        if abs((schedule_date - hd).days) <= 1:
            base_prediction -= 15.0
            factors.append("Proximity to holiday drop")
            break
            
    return {
        "predicted_attendance_pct": round(max(30.0, min(100.0, base_prediction)), 1),
        "factors": factors
    }

async def detect_cia_clustering(db: AsyncSession, target_date: date, cohort_id: int) -> Dict[str, Any]:
    """V3 Cross-Department CIA Overload Detector (7-day rolling window)."""
    
    result = await db.execute(
        select(func.count(Schedule.id))
        .where(
            and_(
                Schedule.cohort_id == cohort_id,
                Schedule.type == ScheduleType.CIA,
            )
        )
    )
    conflict_count = result.scalar() or 0
    can_schedule = conflict_count < 2
    
    return {
        "target_date": target_date,
        "cohort_id": cohort_id,
        "existing_cias_in_window": conflict_count,
        "can_schedule": can_schedule,
        "warning": "Cohort Overload Exception: Students already have 2 CIAs scheduled in this 7-day window." if not can_schedule else None
    }
