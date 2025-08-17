/*
  Integração com NovaEra Pagamentos para criação de cobrança PIX.
  Espera-se que as seguintes variáveis de ambiente estejam definidas no build:
  - VITE_NOVAERA_API_BASE: string (ex.: https://api.novaera-pagamentos.com/api/v1/transactions)
  - VITE_NOVAERA_SK: string (sk_userKey)
  - VITE_NOVAERA_PK: string (pk_userKey)
*/

export interface CreatePixRequest {
  amountInCents: number;
  title: string;
  quantity?: number;
  productImageUrl?: string;
  expiresInDays?: number;
  externalRef?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    document: {
      type: "cpf" | "cnpj";
      number: string;
    };
  };
  metadata?: Record<string, unknown>;
  postbackUrl?: string;
}

export interface CreatePixResponse {
  success: boolean;
  message: string;
  status: number;
  data?: {
    id: number;
    status: string;
    amount: number;
    paymentMethod: "pix";
    secureId?: string;
    secureUrl?: string;
    externalId?: string;
    customer?: unknown;
    pix?: {
      qrcode?: string; // data:image/png;base64,...
      qrcodeText?: string; // Pix Copia e Cola
      expirationDate?: string; // ISO
    };
    createdAt?: string;
  };
}

export type TransactionStatusResponse = CreatePixResponse;

// Agora o frontend chama o proxy do servidor, não carrega mais chaves no cliente

export async function createPixCharge(params: CreatePixRequest): Promise<CreatePixResponse> {
  const {
    amountInCents,
    title,
    quantity = 1,
    productImageUrl = "",
    expiresInDays = 1,
    externalRef = "",
    customer,
    metadata = {},
    postbackUrl = "",
  } = params;

  const body = {
    paymentMethod: "pix",
    ip: "172.18.0.1",
    pix: {
      expiresInDays,
    },
    items: [
      {
        title,
        quantity,
        tangible: false,
        unitPrice: amountInCents,
        product_image: productImageUrl,
      },
    ],
    amount: amountInCents,
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      document: customer.document,
    },
    metadata: JSON.stringify(metadata),
    traceable: false,
    externalRef,
    postbackUrl: postbackUrl || undefined,
  };

  const res = await fetch('/api/payments/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  // Pode retornar 201 com corpo JSON
  const json = (await res.json()) as CreatePixResponse;
  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Falha ao criar cobrança PIX (status ${res.status})`);
  }
  return json;
}

export async function getTransactionStatus(transactionId: number): Promise<TransactionStatusResponse> {
  const res = await fetch(`/api/payments/${transactionId}/status`, { method: 'GET' })
  const json = (await res.json()) as TransactionStatusResponse;
  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Falha ao consultar transação (status ${res.status})`);
  }
  return json;
}


