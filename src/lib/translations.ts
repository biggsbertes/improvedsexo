export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    title: 'Rastreamento de Pedidos',
    subtitle: 'Digite o código de rastreamento para acompanhar sua encomenda',
    trackingLabel: 'Código de Rastreamento',
    trackingPlaceholder: 'Digite o código de rastreamento',
    single: 'Único',
    multiple: 'Múltiplos',
    searchButton: 'Buscar Pedido',
    releaseTax: 'Regularizar agora',
    processingPayment: 'Processando pagamento...',
    searching: 'Buscando seu pedido...',
    searchingMessage: 'Aguarde enquanto verificamos as informações',
    found: 'Pedido encontrado com sucesso!',
    code: 'Código',
    payment: 'Pagamento PIX',
    total: 'Total',
    customs: 'Órgão Tributador (Contato e Endereço)',
    phone: 'Telefone',
    address: 'Endereço',
    federalRevenue: 'Receita Federal do Brasil - Atendimento: 0800-978-2339'
  },
  en: {
    title: 'Order Tracking',
    subtitle: 'Enter the tracking code to track your package',
    trackingLabel: 'Tracking Code',
    trackingPlaceholder: 'Enter the tracking code',
    single: 'Single',
    multiple: 'Multiple',
    searchButton: 'Search Order',
    releaseTax: 'Pay release tax',
    processingPayment: 'Processing payment...',
    searching: 'Searching for your order...',
    searchingMessage: 'Please wait while we check the information',
    found: 'Order found successfully!',
    code: 'Code',
    payment: 'PIX Payment',
    total: 'Total',
    customs: 'Customs Authority (Contact and Address)',
    phone: 'Phone',
    address: 'Address',
    federalRevenue: 'Federal Revenue of Brazil - Support: 0800-978-2339'
  },
  es: {
    title: 'Seguimiento de Pedidos',
    subtitle: 'Ingrese el código de seguimiento para rastrear su paquete',
    trackingLabel: 'Código de Seguimiento',
    trackingPlaceholder: 'Ingrese el código de seguimiento',
    single: 'Único',
    multiple: 'Múltiples',
    searchButton: 'Buscar Pedido',
    releaseTax: 'Pagar impuesto de liberación',
    processingPayment: 'Procesando pago...',
    searching: 'Buscando su pedido...',
    searchingMessage: 'Espere mientras verificamos la información',
    found: '¡Pedido encontrado exitosamente!',
    code: 'Código',
    payment: 'Pago PIX',
    total: 'Total',
    customs: 'Autoridad Aduanera (Contacto y Dirección)',
    phone: 'Teléfono',
    address: 'Dirección',
    federalRevenue: 'Receita Federal de Brasil - Soporte: 0800-978-2339'
  }
};

export const getTranslation = (language: Language, key: keyof typeof translations.pt) => {
  return translations[language][key];
};
