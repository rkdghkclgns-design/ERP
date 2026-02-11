from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime

class JournalHeader(Base):
    __tablename__ = "journal_headers"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String) # YYYY-MM-DD
    description = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    lines = relationship("JournalLine", back_populates="header", cascade="all, delete-orphan")

class JournalLine(Base):
    __tablename__ = "journal_lines"
    id = Column(Integer, primary_key=True)
    header_id = Column(Integer, ForeignKey("journal_headers.id"))
    account_code = Column(String) # 예: 816 (임차료)
    account_name = Column(String)
    debit = Column(BigInteger, default=0)  # 차변
    credit = Column(BigInteger, default=0) # 대변
    header = relationship("JournalHeader", back_populates="lines")
