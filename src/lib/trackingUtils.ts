import { findNearestByState } from './alfandegas';
import { leadsRepository } from './leadsRepository';

// Mapeamento de códigos de rastreio para estados
// Baseado em padrões comuns de códigos de rastreio brasileiros
const TRACKING_STATE_MAP: Record<string, string> = {
  // Padrões baseados em prefixos de códigos de rastreio
  'BR': 'SP', // Códigos que começam com BR geralmente vão para SP
  'SP': 'SP', // São Paulo
  'RJ': 'RJ', // Rio de Janeiro
  'BA': 'BA', // Bahia
  'PE': 'PE', // Pernambuco
  'CE': 'CE', // Ceará
  'RS': 'RS', // Rio Grande do Sul
  'PR': 'PR', // Paraná
  'SC': 'SC', // Santa Catarina
  'MG': 'MG', // Minas Gerais
  'ES': 'ES', // Espírito Santo
  'GO': 'GO', // Goiás
  'DF': 'DF', // Distrito Federal
  'PA': 'PA', // Pará
  'AM': 'AM', // Amazonas
  'MA': 'MA', // Maranhão
  'PI': 'PI', // Piauí
  'RN': 'RN', // Rio Grande do Norte
  'PB': 'PB', // Paraíba
  'AL': 'AL', // Alagoas
  'SE': 'SE', // Sergipe
  'TO': 'TO', // Tocantins
  'MT': 'MT', // Mato Grosso
  'MS': 'MS', // Mato Grosso do Sul
  'RO': 'RO', // Rondônia
  'AC': 'AC', // Acre
  'AP': 'AP', // Amapá
  'RR': 'RR', // Roraima
};

// Função para extrair estado do código de rastreio
export const getStateFromTracking = (tracking: string): string => {
  if (!tracking) return 'SP'; // Fallback para São Paulo
  
  const upperTracking = tracking.toUpperCase();
  
  // Log para debug
  console.log('Analisando código de rastreio:', tracking);
  
  // Padrões específicos de códigos de rastreio brasileiros
  const trackingPatterns = [
    // Padrões de códigos que começam com BR (Brasil)
    { pattern: /^BR/, state: 'SP' },
    // Padrões de códigos que contêm UF no final
    { pattern: /(SP|RJ|BA|PE|CE|RS|PR|SC|MG|ES|GO|DF|PA|AM|MA|PI|RN|PB|AL|SE|TO|MT|MS|RO|AC|AP|RR)$/, state: null },
    // Padrões específicos de cidades/estados
    { pattern: /SALVADOR|BAHIA/, state: 'BA' },
    { pattern: /SAO PAULO|SANTOS|GUARULHOS/, state: 'SP' },
    { pattern: /RIO JANEIRO|GALEAO/, state: 'RJ' },
    { pattern: /RECIFE|PERNAMBUCO/, state: 'PE' },
    { pattern: /FORTALEZA|CEARA/, state: 'CE' },
    { pattern: /VITORIA|ESPIRITO SANTO/, state: 'ES' },
    { pattern: /BRASILIA|DISTRITO FEDERAL/, state: 'DF' },
    { pattern: /CURITIBA|PARANA/, state: 'PR' },
    { pattern: /PORTO ALEGRE|RIO GRANDE SUL/, state: 'RS' },
    { pattern: /FLORIANOPOLIS|SANTA CATARINA/, state: 'SC' },
    { pattern: /BELO HORIZONTE|MINAS GERAIS/, state: 'MG' },
  ];
  
  // Testa padrões específicos primeiro
  for (const { pattern, state } of trackingPatterns) {
    if (pattern.test(upperTracking)) {
      if (state) {
        console.log(`Encontrou padrão específico -> Estado: ${state}`);
        return state;
      } else {
        // Extrai a UF do final do código
        const match = upperTracking.match(/(SP|RJ|BA|PE|CE|RS|PR|SC|MG|ES|GO|DF|PA|AM|MA|PI|RN|PB|AL|SE|TO|MT|MS|RO|AC|AP|RR)$/);
        if (match) {
          console.log(`Encontrou UF no final: "${match[1]}" -> Estado: ${match[1]}`);
          return match[1];
        }
      }
    }
  }
  
  // Tenta encontrar padrões simples no código
  for (const [pattern, state] of Object.entries(TRACKING_STATE_MAP)) {
    if (upperTracking.includes(pattern)) {
      console.log(`Encontrou padrão simples "${pattern}" -> Estado: ${state}`);
      return state;
    }
  }
  
  // Fallback: distribuição baseada em volume de importações
  const fallbackStates = ['SP', 'RJ', 'BA', 'PE', 'CE', 'RS', 'PR', 'SC', 'MG', 'ES'];
  const hash = tracking.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackState = fallbackStates[hash % fallbackStates.length];
  console.log(`Usando fallback -> Estado: ${fallbackState}`);
  return fallbackState;
};

// Função para obter a alfândega baseada no código de rastreio
export const getCustomsOfficeFromTracking = async (tracking: string) => {
  try {
    // Primeiro, tenta buscar o lead pelo código de rastreio
    const lead = await leadsRepository.findByTracking(tracking);
    
    if (lead) {
      console.log('Lead encontrado:', lead);
      
      // Usa a mesma lógica da página de tracking
      const defaultOffice = findNearestByState('SP'); // Fallback
      
      try {
        // 1) Tenta extrair UF válida do campo state (ex.: "Pernambuco(PE)" -> "PE")
        if (lead.state) {
          const upper = lead.state.toUpperCase();
          const match = upper.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/);
          const ufFromState = match?.[1];
          if (ufFromState) {
            console.log(`Encontrou UF no state: ${ufFromState}`);
            return findNearestByState(ufFromState);
          }
        }
        
        // 2) Se não encontrou no state, tenta usar o CEP
        const rawCep = (lead.zipcode || '').replace(/\D/g, '');
        if (rawCep.length === 8) {
          const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
          const json: { uf?: string } = await res.json();
          if (json?.uf) {
            console.log(`Encontrou UF pelo CEP: ${json.uf}`);
            return findNearestByState(json.uf);
          }
        }
      } catch (error) {
        console.log('Erro ao buscar UF:', error);
      }
      
      // Se não conseguiu determinar pelo lead, usa fallback
      return defaultOffice;
    }
  } catch (error) {
    console.log('Erro ao buscar lead:', error);
  }
  
  // Se não encontrou o lead, usa a lógica antiga como fallback
  const state = getStateFromTracking(tracking);
  return findNearestByState(state);
};

// Função de teste para verificar se a lógica está funcionando
export const testTrackingLogic = () => {
  const testCases = [
    'BR123456789SP', // Deveria retornar SP
    'BR123456789BA', // Deveria retornar BA
    'BR123456789RJ', // Deveria retornar RJ
    'BR123456789PE', // Deveria retornar PE
    'BR123456789CE', // Deveria retornar CE
    'BR123456789RS', // Deveria retornar RS
    'BR123456789PR', // Deveria retornar PR
    'BR123456789SC', // Deveria retornar SC
    'BR123456789MG', // Deveria retornar MG
    'BR123456789ES', // Deveria retornar ES
    'BR123456789GO', // Deveria retornar GO
    'BR123456789DF', // Deveria retornar DF
    'BR123456789PA', // Deveria retornar PA
    'BR123456789AM', // Deveria retornar AM
    'BR123456789MA', // Deveria retornar MA
    'BR123456789PI', // Deveria retornar PI
    'BR123456789RN', // Deveria retornar RN
    'BR123456789PB', // Deveria retornar PB
    'BR123456789AL', // Deveria retornar AL
    'BR123456789SE', // Deveria retornar SE
    'BR123456789TO', // Deveria retornar TO
    'BR123456789MT', // Deveria retornar MT
    'BR123456789MS', // Deveria retornar MS
    'BR123456789RO', // Deveria retornar RO
    'BR123456789AC', // Deveria retornar AC
    'BR123456789AP', // Deveria retornar AP
    'BR123456789RR', // Deveria retornar RR
  ];
  
  console.log('=== TESTE DA LÓGICA DE TRACKING ===');
  testCases.forEach(tracking => {
    const state = getStateFromTracking(tracking);
    const office = getCustomsOfficeFromTracking(tracking);
    console.log(`${tracking} -> Estado: ${state} -> Alfândega: ${office.nome}`);
  });
  console.log('=== FIM DO TESTE ===');
};
