from sqlalchemy import Column, Integer, String, DateTime, JSON
from core.database import Base
from datetime import datetime

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    action = Column(String)
    target_table = Column(String)
    target_id = Column(Integer)
    before_data = Column(JSON, nullable=True)
    after_data = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.now)
