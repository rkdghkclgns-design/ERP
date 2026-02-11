from fastapi import FastAPI, Depends, WebSocket
from sqlalchemy.orm import Session
from core.database import get_db, engine, Base
import models.accounting as models

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Enterprise AI ERP")

@app.post("/api/accounting/transaction")
async def add_tx(data: dict, db: Session = Depends(get_db)):
    from services.ledger_service import LedgerService
    return LedgerService.create_transaction(db, data)

@app.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message received: {data}")
