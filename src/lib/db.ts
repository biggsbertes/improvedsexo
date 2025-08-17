import Dexie, { Table } from 'dexie'
import type { Lead } from '@/types/lead'
import type { Order } from '@/types/order'


export class AppDatabase extends Dexie {
  leads!: Table<Lead, number>
  orders!: Table<Order, number>
  // Usamos any para evitar acoplamento com tipos de analytics
  events!: Table<any, number>


  constructor() {
    super('TrackSkyDB')
    this.version(1).stores({
      leads: '++id, name, cpf, email, telephone, tracking, created_at'
    })
    // v2: add orders table
    this.version(2).stores({
      leads: '++id, name, cpf, email, telephone, tracking, created_at',
      orders: '++id, transactionId, tracking, status, created_at'
    })
    // v3: add productImage field to leads
    this.version(3).stores({
      leads: '++id, name, cpf, email, telephone, tracking, created_at, productImage',
      orders: '++id, transactionId, tracking, status, created_at'
    })

    // v4: add events table para analytics
    this.version(4).stores({
      leads: '++id, name, cpf, email, telephone, tracking, created_at, productImage',
      orders: '++id, transactionId, tracking, status, created_at',
      events: '++id, sessionId, timestamp, type, pagePath'
    })

    
    // Cleanup: remove demo/sample data if present
    this.on('ready', async () => {
      try {
        await this.leads.where('tracking').anyOf([
          'BR123456789BR',
          'US987654321US',
          'AM111222333AM'
        ]).delete()
      } catch {}
      try {
        await this.orders.where('transactionId').anyOf([1001, 1002]).delete()
      } catch {}
    })
  }
}

export const db = new AppDatabase()

// Function to reset database (useful for development)
export const resetDatabase = async () => {
  console.log('Resetting database...')
  await db.close()
  await Dexie.delete('TrackSkyDB')
  console.log('Database deleted, refreshing page...')
  window.location.reload()
}


