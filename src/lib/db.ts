import Dexie, { Table } from 'dexie';

export interface Reservation {
    id?: number;
    date: string;
    time: string;
    productName: string; // '패키지', '플레이존', '캔버스존'
    customerName: string;
    status: 'CONFIRMED' | 'CANCELLED';
}

class LocalERPDatabase extends Dexie {
    reservations!: Table<Reservation>;

    constructor() {
        super('DeepErpDB');
        this.version(1).stores({
            reservations: '++id, date, time, productName'
        });
    }
}

export const db = new LocalERPDatabase();
