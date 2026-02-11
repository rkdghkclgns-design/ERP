from sqlalchemy.orm import Session
from models.audit import AuditLog

class AuditService:
    @staticmethod
    def log_action(db: Session, user_id: str, action: str, target_table: str, target_id: int, before: dict = None, after: dict = None):
        log = AuditLog(
            user_id=user_id,
            action=action,
            target_table=target_table,
            target_id=target_id,
            before_data=before,
            after_data=after
        )
        db.add(log)
        # Note: Commit is usually handled by the caller or a context manager
