import type { Lead } from '@/types/lead';

interface ImageGenerationOptions {
  width?: number;
  height?: number;
  textColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  labelText?: string;
  textX?: number;
  textY?: number;
  addressX?: number;
  addressY?: number;
  showAddress?: boolean;
}

export class LocalImageGenerator {
  private defaultOptions: Required<ImageGenerationOptions> = {
    width: 800,
    height: 600,
    textColor: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    labelText: 'Destinatário:',
    showAddress: true,
    addressX: 7,
    addressY: 43
  };

  // Coordenadas padrão para posicionamento do texto
  // Configurado pelo usuário para posição exata na etiqueta
  private defaultTextPosition = { x: 19, y: 41.5 };

  /**
   * Gera uma imagem personalizada usando a imagem base e adicionando o nome do lead
   */
  async generateProductImage(lead: Lead, options: Partial<ImageGenerationOptions> = {}): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    
    console.log('🎨 LocalImageGenerator: Gerando imagem para:', lead.name);
    
    // TESTE DIRETO NO INÍCIO
    console.log('🧪 TESTE DIRETO - Nome:', lead.name);
    console.log('🧪 TESTE DIRETO - Caracteres:', lead.name.length);
    if (lead.name.length >= 32) {
      const testResult = this.abbreviateLongName(lead.name);
      console.log('🧪 TESTE DIRETO - Resultado abreviado:', testResult);
    }
    
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Não foi possível obter o contexto do canvas'));
          return;
        }

        // Carregar a imagem base
        const baseImage = new Image();
        baseImage.crossOrigin = 'anonymous';
        
        baseImage.onload = () => {
          try {
            // Configurar canvas com as dimensões da imagem base
            canvas.width = baseImage.width;
            canvas.height = baseImage.height;
            
            // Desenhar a imagem base
            ctx.drawImage(baseImage, 0, 0);
            
            // Adicionar o nome do lead e endereço na etiqueta
            this.drawLeadNameWithLabel(ctx, canvas, lead, opts);
            
            // Converter para base64
            const imageDataUrl = canvas.toDataURL('image/png', 0.9);
            console.log('✅ LocalImageGenerator: Imagem gerada com sucesso');
            
            resolve(imageDataUrl);
            
          } catch (error) {
            console.error('❌ LocalImageGenerator: Erro ao processar imagem:', error);
            reject(error);
          }
        };
        
        baseImage.onerror = () => {
          reject(new Error('Não foi possível carregar a imagem base product-base-image.png'));
        };
        
        // Carregar a imagem base
        baseImage.src = '/product-base-image.png';
        
      } catch (error) {
        console.error('❌ LocalImageGenerator: Erro ao gerar imagem:', error);
        reject(error);
      }
    });
  }

  /**
   * Desenha o nome do lead e endereço na posição da etiqueta
   */
  private drawLeadNameWithLabel(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, lead: Lead, options: Required<ImageGenerationOptions>) {
    // Configurar fonte para o nome do lead - FORÇAR NEGRITO
    ctx.font = `900 ${options.fontSize}px 'Segoe UI', system-ui, sans-serif`;
    
    // Aplicar transparência para efeito estético de "borrado"
    ctx.globalAlpha = 0.7; // 70% de opacidade
    
    ctx.fillStyle = options.textColor;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // Usar coordenadas personalizadas ou padrão para o nome
    const textX = options.textX ?? this.defaultTextPosition.x;
    const textY = options.textY ?? this.defaultTextPosition.y;
    
    // Calcular posição em pixels baseado na porcentagem
    const labelX = canvas.width * (textX / 100);
    const labelY = canvas.height * (textY / 100);
    
    // Definir largura máxima disponível para o texto (80% da largura da imagem)
    const maxTextWidth = canvas.width * 0.8;
    
    // Teste direto para debug
    console.log('🎯 TESTE DIRETO - Nome original:', lead.name);
    console.log('🎯 TESTE DIRETO - Caracteres:', lead.name.length);
    
    // FORÇAR TESTE DE ABREVIAÇÃO
    if (lead.name.length >= 32) {
      console.log('🔧 FORÇANDO ABREVIAÇÃO - Nome tem 32+ caracteres');
      const testAbbreviated = this.abbreviateLongName(lead.name);
      console.log('🔧 FORÇANDO ABREVIAÇÃO - Resultado:', testAbbreviated);
    }
    
    // Obter o texto que cabe na largura disponível
    const displayText = this.getFittingText(ctx, lead.name, maxTextWidth);
    console.log('🎯 TESTE DIRETO - Texto final:', displayText);
    
    // Aplicar filtro de blur para deixar o nome meio borradinho
    ctx.filter = 'blur(0.8px)';
    
    // TESTE FINAL - FORÇAR ABREVIAÇÃO SE NECESSÁRIO
    let finalText = displayText;
    if (lead.name.length >= 32) {
      console.log('🚨 FORÇANDO ABREVIAÇÃO FINAL');
      finalText = this.abbreviateLongName(lead.name);
      console.log('🚨 TEXTO FINAL FORÇADO:', finalText);
    }
    
    ctx.fillText(finalText, labelX, labelY);
    
    // Restaurar filtro para não afetar outros elementos
    ctx.filter = 'none';
    
    // Se mostrar endereço, desenhar também
    if (options.showAddress) {
      // Usar coordenadas personalizadas ou padrão para o endereço
      const addressX = options.addressX ?? 7;
      const addressY = options.addressY ?? 46;
      
      // Calcular posição em pixels baseado na porcentagem
      const addressPixelX = canvas.width * (addressX / 100);
      const addressPixelY = canvas.height * (addressY / 100);
      
      // Desenhar apenas rua e número (fonte um pouco menor)
      ctx.font = `700 ${options.fontSize - 2}px 'Segoe UI', system-ui, sans-serif`;
      
      // Extrair apenas rua e número do endereço
      const address = lead.address || '';
      const streetAndNumber = this.extractStreetAndNumber(address);
      
      // Aplicar filtro de blur para deixar o texto meio borradinho
      ctx.filter = 'blur(0.8px)';
      ctx.fillText(streetAndNumber, addressPixelX, addressPixelY);
      
      // Restaurar filtro para não afetar outros elementos
      ctx.filter = 'none';
    }
    
    // Restaurar opacidade padrão
    ctx.globalAlpha = 1.0;
  }

  /**
   * Abrevia nomes longos no formato: Primeiro Nome + Iniciais + Último Nome
   * Exemplo: "Regis Fernando Simonato de Carvalho" → "Regis F. S. D. Carvalho"
   */
  private abbreviateLongName(fullName: string): string {
    if (!fullName) return '';
    
    console.log('🔍 Abreviando nome:', fullName, '| Caracteres:', fullName.length);
    
    // Dividir o nome em partes
    const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);
    console.log('📝 Partes do nome:', nameParts);
    
    // Se tem apenas 1 ou 2 nomes, não precisa abreviar
    if (nameParts.length <= 2) {
      console.log('✅ Nome curto, mantendo original:', fullName);
      return fullName;
    }
    
    // Se tem 3 ou mais nomes, aplicar a regra de abreviação
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const middleNames = nameParts.slice(1, nameParts.length - 1);
    
    console.log('👤 Primeiro nome:', firstName);
    console.log('🔤 Nomes do meio:', middleNames);
    console.log('👤 Último nome:', lastName);
    
    // Transformar nomes do meio em iniciais com ponto
    const initials = middleNames.map(name => {
      const initial = name.charAt(0).toUpperCase();
      return initial + '.';
    });
    console.log('🔤 Iniciais geradas:', initials);
    
    // Montar o nome abreviado
    const abbreviatedName = [firstName, ...initials, lastName].join(' ');
    console.log('✅ Nome abreviado final:', abbreviatedName);
    
    return abbreviatedName;
  }

  /**
   * Verifica se o texto cabe na largura disponível e retorna o texto apropriado
   */
  private getFittingText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    console.log('📏 Verificando texto:', text, '| Caracteres:', text.length);
    
    // Verificar se o nome tem 31 caracteres ou menos
    if (text.length <= 31) {
      console.log('✅ Nome curto (≤31), mantendo original:', text);
      return text; // Nome curto, mostrar normal
    }
    
    console.log('🔧 Nome longo (≥32), aplicando abreviação...');
    
    // Se tem 32 caracteres ou mais, aplicar abreviação
    const abbreviatedText = this.abbreviateLongName(text);
    console.log('✅ Nome abreviado final:', abbreviatedText);
    
    // RETORNAR SEMPRE O ABREVIADO SE TIVER 38+ CARACTERES
    return abbreviatedText;
  }

  /**
   * Extrai apenas a rua e número do endereço completo
   */
  private extractStreetAndNumber(address: string): string {
    if (!address) return 'Endereço não informado';
    
    // Dividir o endereço por vírgulas
    const parts = address.split(',').map(part => part.trim());
    
    // Pegar apenas a primeira parte (rua e número)
    const streetAndNumber = parts[0];
    
    // Se não houver vírgulas, retornar o endereço completo
    if (parts.length === 1) {
      return streetAndNumber;
    }
    
    // Aplicar capitalização: primeira letra de cada palavra em maiúscula
    const capitalizedAddress = streetAndNumber
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (word.length === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    
    return capitalizedAddress;
  }

  /**
   * Gera uma imagem com template personalizado (método alternativo)
   */
  async generateCustomTemplate(lead: Lead, templateImageUrl: string, options: Partial<ImageGenerationOptions> = {}): Promise<string> {
    const opts = { ...this.defaultOptions, ...options };
    
    console.log('🎨 LocalImageGenerator: Gerando template personalizado para:', lead.name);
    
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Não foi possível obter o contexto do canvas'));
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          // Configurar canvas com as dimensões da imagem
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Desenhar imagem base
          ctx.drawImage(img, 0, 0);
          
                      // Adicionar o nome do lead e endereço na etiqueta
            this.drawLeadNameWithLabel(ctx, canvas, lead, opts);
          
          // Converter para base64
          const imageDataUrl = canvas.toDataURL('image/png', 0.9);
          console.log('✅ LocalImageGenerator: Template personalizado gerado com sucesso');
          
          resolve(imageDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Não foi possível carregar a imagem do template'));
        };
        
        img.src = templateImageUrl;
        
      } catch (error) {
        console.error('❌ LocalImageGenerator: Erro ao gerar template:', error);
        reject(error);
      }
    });
  }
}

// Instância global
export const localImageGenerator = new LocalImageGenerator();
