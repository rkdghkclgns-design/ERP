from celery import Celery
import os

celery_app = Celery("erp_tasks", broker=os.getenv("REDIS_URL"), backend=os.getenv("REDIS_URL"))

@celery_app.task
def process_tax_report(year_month: str):
    # 무거운 세무 계산 로직 시뮬레이션
    import time
    time.sleep(5)
    return {"status": "Complete", "report_url": f"/reports/{year_month}.pdf"}
