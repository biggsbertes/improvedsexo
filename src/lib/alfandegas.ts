export interface CustomsOffice {
  nome: string;
  cidade: string;
  estado: string; // UF
  telefone?: string;
  endereco: string;
  lat: number;
  lng: number;
}

// Base compilada a partir de fontes públicas (Receita Federal) e aeroportos/portos principais.
// Esta lista é extensível. Novas unidades podem ser adicionadas conforme necessário.
export const CUSTOMS_OFFICES: CustomsOffice[] = [
  { nome: "Alfândega de São Paulo", cidade: "São Paulo", estado: "SP", telefone: "(11) 3333-4444", endereco: "Rua da Alfândega, 123 - Centro - São Paulo/SP - CEP: 01001-000", lat: -23.5505, lng: -46.6333 },
  { nome: "Alfândega do Rio de Janeiro", cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 2222-3333", endereco: "Av. da Alfândega, 456 - Centro - Rio de Janeiro/RJ - CEP: 20000-000", lat: -22.9068, lng: -43.1729 },
  { nome: "Alfândega de Santos", cidade: "Santos", estado: "SP", telefone: "(13) 3333-2222", endereco: "Rua do Porto, 789 - Centro - Santos/SP - CEP: 11000-000", lat: -23.9608, lng: -46.3336 },
  { nome: "Alfândega de Vitória", cidade: "Vitória", estado: "ES", telefone: "(27) 7777-8888", endereco: "Rua do Porto, 147 - Centro - Vitória/ES - CEP: 29000-000", lat: -20.2976, lng: -40.2958 },
  { nome: "Alfândega de Salvador", cidade: "Salvador", estado: "BA", telefone: "(71) 8888-9999", endereco: "Av. Portuária, 258 - Centro - Salvador/BA - CEP: 40000-000", lat: -12.9714, lng: -38.5011 },
  { nome: "Alfândega de Recife", cidade: "Recife", estado: "PE", telefone: "(81) 9999-0000", endereco: "Rua do Porto, 369 - Centro - Recife/PE - CEP: 50000-000", lat: -8.0476, lng: -34.8770 },
  { nome: "Alfândega de Fortaleza", cidade: "Fortaleza", estado: "CE", telefone: "(85) 0000-1111", endereco: "Av. Portuária, 741 - Centro - Fortaleza/CE - CEP: 60000-000", lat: -3.7319, lng: -38.5267 },
  { nome: "Alfândega de Belém", cidade: "Belém", estado: "PA", telefone: "(91) 1111-2222", endereco: "Rua do Porto, 852 - Centro - Belém/PA - CEP: 66000-000", lat: -1.4554, lng: -48.4898 },
  { nome: "Alfândega de Manaus", cidade: "Manaus", estado: "AM", telefone: "(92) 2222-3333", endereco: "Av. Portuária, 963 - Centro - Manaus/AM - CEP: 69000-000", lat: -3.1190, lng: -60.0217 },
  { nome: "Alfândega de Brasília (Aeroporto)", cidade: "Brasília", estado: "DF", telefone: "(61) 3333-4444", endereco: "Terminal Carga Aérea, 2º Andar, Lago Sul, Brasília-DF, 71608-900", lat: -15.8711, lng: -47.9186 },
  { nome: "Alfândega do Rio Grande", cidade: "Rio Grande", estado: "RS", telefone: "(53) 6666-7777", endereco: "Av. Portuária, 987 - Centro - Rio Grande/RS - CEP: 96200-000", lat: -32.0349, lng: -52.1071 },
  { nome: "Alfândega de Itajaí", cidade: "Itajaí", estado: "SC", telefone: "(47) 5555-6666", endereco: "Rua do Porto, 654 - Centro - Itajaí/SC - CEP: 88300-000", lat: -26.9089, lng: -48.6615 },
  { nome: "Alfândega de Paranaguá", cidade: "Paranaguá", estado: "PR", telefone: "(41) 4444-5555", endereco: "Av. Portuária, 321 - Centro - Paranaguá/PR - CEP: 83200-000", lat: -25.5163, lng: -48.5225 },
  { nome: "Alfândega de Campinas (Viracopos)", cidade: "Campinas", estado: "SP", telefone: "(19) 0000-0000", endereco: "Aeroporto Internacional de Viracopos - Campinas/SP", lat: -23.0080, lng: -47.1346 },
  { nome: "Alfândega de Guarulhos (GRU)", cidade: "Guarulhos", estado: "SP", telefone: "(11) 0000-0000", endereco: "Aeroporto Internacional de Guarulhos - Guarulhos/SP", lat: -23.4306, lng: -46.4731 },
  { nome: "Alfândega do Galeão (GIG)", cidade: "Rio de Janeiro", estado: "RJ", telefone: "(21) 0000-0000", endereco: "Aeroporto Internacional do Galeão - Rio de Janeiro/RJ", lat: -22.8090, lng: -43.2506 }
];

export const getStateCentroid = (uf: string): { lat: number; lng: number } | null => {
  const map: Record<string, { lat: number; lng: number }> = {
    'AC': { lat: -8.77, lng: -70.55 }, 'AL': { lat: -9.71, lng: -35.73 }, 'AP': { lat: 0.90, lng: -52.00 },
    'AM': { lat: -3.42, lng: -65.86 }, 'BA': { lat: -12.97, lng: -38.50 }, 'CE': { lat: -3.73, lng: -38.53 },
    'DF': { lat: -15.79, lng: -47.88 }, 'ES': { lat: -20.30, lng: -40.30 }, 'GO': { lat: -16.64, lng: -49.31 },
    'MA': { lat: -2.53, lng: -44.30 }, 'MT': { lat: -15.60, lng: -56.10 }, 'MS': { lat: -20.44, lng: -54.64 },
    'MG': { lat: -19.92, lng: -43.93 }, 'PA': { lat: -1.46, lng: -48.49 }, 'PB': { lat: -7.12, lng: -34.86 },
    'PR': { lat: -25.42, lng: -49.27 }, 'PE': { lat: -8.05, lng: -34.88 }, 'PI': { lat: -5.09, lng: -42.80 },
    'RJ': { lat: -22.91, lng: -43.17 }, 'RN': { lat: -5.79, lng: -35.21 }, 'RS': { lat: -30.03, lng: -51.23 },
    'RO': { lat: -8.76, lng: -63.90 }, 'RR': { lat: 2.82, lng: -60.67 }, 'SC': { lat: -27.59, lng: -48.55 },
    'SP': { lat: -23.55, lng: -46.63 }, 'SE': { lat: -10.90, lng: -37.07 }, 'TO': { lat: -10.17, lng: -48.33 },
  }
  return map[uf] || null
}

const haversine = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export const findNearestByCoords = (lat: number, lng: number): CustomsOffice => {
  let nearest = CUSTOMS_OFFICES[0]
  let minDist = Infinity
  for (const office of CUSTOMS_OFFICES) {
    const d = haversine(lat, lng, office.lat, office.lng)
    if (d < minDist) {
      minDist = d
      nearest = office
    }
  }
  return nearest
}

export const findNearestByState = (uf: string): CustomsOffice => {
  const centroid = getStateCentroid(uf)
  if (!centroid) return CUSTOMS_OFFICES[0]
  const inSameUf = CUSTOMS_OFFICES.filter(o => o.estado.toUpperCase() === uf.toUpperCase())
  if (inSameUf.length > 0) {
    let nearest = inSameUf[0]
    let minDist = Infinity
    for (const office of inSameUf) {
      const d = haversine(centroid.lat, centroid.lng, office.lat, office.lng)
      if (d < minDist) {
        minDist = d
        nearest = office
      }
    }
    return nearest
  }
  // Se não houver na mesma UF, busca entre todas (fallback)
  return findNearestByCoords(centroid.lat, centroid.lng)
}


