from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from typing import List

from app.models.academic import Topic, TopicState, ModuleDependency, Module

async def verify_cia_prerequisites(db: AsyncSession, subject_id: int):
    """
    Blocks CIAs if prerequisites fail. 
    A CIA requires its assigned modules/topics to be completed.
    """
    result = await db.execute(select(Module).where(Module.subject_id == subject_id))
    modules = result.scalars().all()
    
    for module in modules:
        deps_result = await db.execute(select(ModuleDependency).where(ModuleDependency.module_id == module.id))
        deps = deps_result.scalars().all()
        for dep in deps:
            t_result = await db.execute(select(Topic).where(Topic.module_id == dep.depends_on_module_id))
            topics = t_result.scalars().all()
            if any(t.state != TopicState.COMPLETED for t in topics):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Block Placement Denied: Prerequisites incomplete. Module {dep.depends_on_module_id} must be completed before advancing CIA schedule."
                )
    return True
