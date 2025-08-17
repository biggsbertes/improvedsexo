import { ordersRepository } from '@/lib/ordersRepository'
import { useOrdersStore } from '@/stores/ordersStore'
import { toast } from '@/components/ui/sonner'

// Simples polling local para refletir mudanças (ex.: outro tab/usuário) e avisar via toast
// Em produção, ideal integrar WebSocket/server-sent events. Aqui deixamos um fallback leve.
export function startOrdersRealtime(intervalMs = 4000) {
  let prevStatusById = new Map<number, string>()
  let prevIds = new Set<number>()

  const tick = async () => {
    try {
      const all = await ordersRepository.listAll()
      const currentIds = new Set<number>()

      // Detectar novos pedidos e mudanças de status
      for (const o of all) {
        if (typeof o.id !== 'number') continue
        currentIds.add(o.id)

        if (!prevIds.has(o.id)) {
          // Novo pedido gerado
          toast.info('Pagamento PIX gerado', {
            description: `Tracking ${o.tracking || ''} • Valor ${(o.amount/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`.trim(),
          })
        } else {
          const prev = prevStatusById.get(o.id)
          if (prev && prev !== o.status) {
            if (o.status === 'approved') {
              toast.success('Pagamento aprovado!', { description: `Tracking ${o.tracking || ''}` })
            } else if (o.status === 'cancelled') {
              toast('Transação cancelada', { description: `Tracking ${o.tracking || ''}` })
            } else if (o.status === 'expired') {
              toast('Transação expirada', { description: `Tracking ${o.tracking || ''}` })
            } else if (o.status === 'refunded') {
              toast('Transação estornada', { description: `Tracking ${o.tracking || ''}` })
            }
          }
        }

        prevStatusById.set(o.id, o.status)
      }

      prevIds = currentIds
      useOrdersStore.getState().setOrders(all)
    } catch {
      // ignore
    }
  }

  const id = window.setInterval(() => { void tick() }, intervalMs)
  void tick()
  return () => window.clearInterval(id)
}


