import { db } from "@/lib/db";
import type { Order, OrderStatus } from "@/types/order";

export const ordersRepository = {
  async listAll(): Promise<Order[]> {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) return await res.json()
    } catch {}
    const all = await db.orders.orderBy("created_at").reverse().toArray();
    return all;
  },

  async addOne(order: Omit<Order, "id">): Promise<Order> {
    const nowIso = new Date().toISOString();
    const toInsert: Omit<Order, "id"> = {
      ...order,
      created_at: order.created_at ?? nowIso,
      updated_at: order.updated_at ?? nowIso,
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toInsert),
      })
      if (res.ok) return await res.json()
    } catch {}
    const id = await db.orders.add(toInsert as any);
    return { ...toInsert, id } as Order;
  },

  async updateStatusByTransactionId(transactionId: number, status: OrderStatus): Promise<void> {
    try {
      await fetch(`/api/orders/by-transaction/${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      return
    } catch {}
    const existing = await db.orders.where("transactionId").equals(transactionId).first();
    if (!existing) return;
    await db.orders.update(existing.id!, { status, updated_at: new Date().toISOString() });
  },

  async updateByTransactionId(transactionId: number, data: Partial<Order>): Promise<void> {
    try {
      await fetch(`/api/orders/by-transaction/${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return
    } catch {}
    const existing = await db.orders.where("transactionId").equals(transactionId).first();
    if (!existing) return;
    await db.orders.update(existing.id!, { ...data, updated_at: new Date().toISOString() });
  },

  async findByTransactionId(transactionId: number): Promise<Order | undefined> {
    try {
      const res = await fetch(`/api/orders/by-transaction/${transactionId}`)
      if (res.ok) return await res.json()
      if (res.status === 404) return undefined
    } catch {}
    return await db.orders.where("transactionId").equals(transactionId).first();
  },

  async clearAll(): Promise<void> {
    try {
      await fetch('/api/orders', { method: 'DELETE' })
      return
    } catch {}
    await db.orders.clear()
  }
}


