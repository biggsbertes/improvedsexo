import { db } from '@/lib/db'
import type { Lead } from '@/types/lead'

export const leadsRepository = {
  async listAll(): Promise<Lead[]> {
    try {
      const res = await fetch('/api/leads')
      if (res.ok) return await res.json()
    } catch {}
    const all = await db.leads.orderBy('created_at').toArray()
    return all
  },
  async findByTracking(tracking: string): Promise<Lead | undefined> {
    try {
      const res = await fetch(`/api/leads/by-tracking/${encodeURIComponent(tracking)}`)
      if (res.ok) return await res.json()
      if (res.status === 404) return undefined
    } catch {}
    const found = await db.leads.where('tracking').equalsIgnoreCase(tracking).first()
    return found
  },
  async addMany(leads: Omit<Lead, 'id'>[]): Promise<Lead[]> {
    async function postChunk(chunk: Omit<Lead, 'id'>[]): Promise<Lead[]> {
      const res = await fetch('/api/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk),
      })
      if (res.ok) {
        const data = await res.json()
        return (data.items || []) as Lead[]
      }
      if (res.status === 413 && chunk.length > 1) {
        const mid = Math.ceil(chunk.length / 2)
        const left = await postChunk(chunk.slice(0, mid))
        const right = await postChunk(chunk.slice(mid))
        return [...left, ...right]
      }
      throw new Error(`bulk_upload_failed_${res.status}`)
    }

    try {
      const created: Lead[] = []
      const baseChunkSize = 1000
      for (let i = 0; i < leads.length; i += baseChunkSize) {
        const chunk = leads.slice(i, i + baseChunkSize)
        const part = await postChunk(chunk)
        created.push(...part)
      }
      return created
    } catch {}

    const withMeta = leads.map(l => ({ ...l, created_at: l.created_at ?? new Date().toISOString() }))
    const uniqueByTracking = new Map<string, Omit<Lead, 'id'>>()
    for (const l of withMeta) {
      const key = (l.tracking || '').toLowerCase()
      if (!key) continue
      if (!uniqueByTracking.has(key)) uniqueByTracking.set(key, l)
    }
    const toInsert = Array.from(uniqueByTracking.values())
    const ids = await db.leads.bulkAdd(toInsert, { allKeys: true })
    return toInsert.map((l, i) => ({ ...l, id: ids[i] as number }))
  },
  async addOne(lead: Omit<Lead, 'id'>): Promise<Lead> {
    const toInsert = { ...lead, created_at: lead.created_at ?? new Date().toISOString() }
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toInsert),
      })
      if (res.ok) return await res.json()
    } catch {}
    const id = await db.leads.add(toInsert)
    return { ...toInsert, id }
  },
  async updateOne(lead: Lead): Promise<void> {
    if (!lead.id) return
    try {
      await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      return
    } catch {}
    await db.leads.update(lead.id, lead)
  },
  async deleteOne(id: number): Promise<void> {
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' })
      return
    } catch {}
    await db.leads.delete(id)
  },
  async clearAll(): Promise<void> {
    try {
      await fetch('/api/leads', { method: 'DELETE' })
      return
    } catch {}
    await db.leads.clear()
  },
  async clearAll(): Promise<void> {
    await db.leads.clear()
  }
}


