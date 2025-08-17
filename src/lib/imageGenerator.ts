interface LeadImageData {
  name: string;
  address: string;
  city: string;
  state: string;
}

export const generateProductImage = async (leadData: LeadImageData): Promise<string> => {
  console.log('🔍 generateProductImage chamada com dados:', leadData);
  
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('❌ Não foi possível obter o contexto 2D do canvas');
      resolve('/placeholder.svg');
      return;
    }

    // Criar uma nova imagem para usar como base
    const baseImage = new Image();
    baseImage.crossOrigin = 'anonymous';
    
    baseImage.onload = () => {
      console.log('✅ Imagem base carregada com sucesso:', baseImage.width, 'x', baseImage.height);
      
      // Configurar dimensões do canvas baseado na imagem
      canvas.width = baseImage.width;
      canvas.height = baseImage.height;
      
      // Desenhar a imagem base
      ctx.drawImage(baseImage, 0, 0);
      
      // Adicionar uma camada escura semi-transparente para o texto
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, canvas.height - 120, canvas.width, 120);
      
      // Configurar estilo do texto
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      
      // Nome do lead
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      
      // Quebrar o nome em múltiplas linhas se necessário
      const nameLines = wrapText(ctx, leadData.name, canvas.width - 40);
      nameLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, canvas.height - 80 + (index * 30));
      });
      
      // Endereço
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      
      // Quebrar o endereço em múltiplas linhas se necessário
      const addressText = `${leadData.address}, ${leadData.city} - ${leadData.state}`;
      const addressLines = wrapText(ctx, addressText, canvas.width - 40);
      addressLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, canvas.height - 30 + (index * 25));
      });
      
      // Converter para data URL
      const dataUrl = canvas.toDataURL('image/png');
      console.log('✅ Imagem gerada com sucesso, tamanho:', dataUrl.length);
      resolve(dataUrl);
    };
    
    baseImage.onerror = (error) => {
      console.error('❌ Erro ao carregar imagem base:', error);
      // Se a imagem falhar ao carregar, usar fallback
      resolve('/placeholder.svg');
    };
    
    console.log('🔄 Tentando carregar imagem base de:', '/product-base-image.png');
    // Carregar a imagem base
    baseImage.src = '/product-base-image.png';
  });
};

// Função auxiliar para quebrar texto em múltiplas linhas
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  
  lines.push(currentLine);
  return lines;
};

// Função para gerar uma imagem com dados mock para demonstração
export const generateMockProductImage = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '/placeholder.svg';

  canvas.width = 400;
  canvas.height = 300;

  // Fundo gradiente
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#f8fafc');
  gradient.addColorStop(1, '#e2e8f0');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ícone de produto
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(200, 80, 40, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.fillRect(185, 65, 30, 30);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(190, 70, 20, 20);

  // Texto
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.fillText('PRODUTO', 200, 150);

  ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#3b82f6';
  ctx.fillText('João Silva', 200, 170);

  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Rua das Flores, 123 - Centro', 200, 190);
  ctx.fillText('São Paulo - SP', 200, 208);

  // Borda
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  return canvas.toDataURL('image/png');
};
