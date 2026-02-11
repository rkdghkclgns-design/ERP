from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.accounting import JournalHeader, JournalLine

class LedgerService:
    @staticmethod
    def create_transaction(db: Session, data: dict):
        # 대차평형 검증: SUM(Debit) = SUM(Credit)
        total_debit = sum(line['debit'] for line in data['lines'])
        total_credit = sum(line['credit'] for line in data['lines'])
        
        if total_debit != total_credit:
            raise HTTPException(status_code=400, detail="대차 불일치: 전표를 저장할 수 없습니다.")

        header = JournalHeader(date=data['date'], description=data['description'])
        db.add(header)
        db.flush()

        for line in data['lines']:
            db_line = JournalLine(header_id=header.id, **line)
            db.add(db_line)
        
        db.commit()
        return header
