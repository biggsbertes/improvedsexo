import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export const PrcAuthPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled in localStorage or system preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
                    window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(darkMode)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-slide-up leading-tight px-2">
              Autorização <span className="text-yellow-300">PRC</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Autorização para o SkyPostal visualizar seus pedidos do Seller Central da Amazon
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Mensagem Principal */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-l-4 border-blue-500 mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <img 
                    src="https://img.icons8.com/ios/24/0066cc/document.png" 
                    alt="Documento" 
                    className="w-6 h-6"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Informação Importante
                </h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  <strong className="text-blue-600">Prezado Cliente Vendedor da Amazon,</strong>
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Conforme o acordo entre a Amazon e a transportadora SkyPostal no âmbito do programa Remessa Conforme (PRC) no Brasil, é responsabilidade da SkyPostal fornecer informações precisas às autoridades aduaneiras brasileiras para os pedidos enviados por vendedores da Amazon ao país.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Para garantir a precisão dos dados transmitidos à SkyPostal pelos vendedores da Amazon, precisamos verificar os detalhes do pedido diretamente na Central do Vendedor da Amazon.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Para autorizar a SkyPostal a visualizar os dados do pedido relacionados às suas remessas SkyPostal, clique no botão AUTORIZAR abaixo. Você será direcionado para uma página da Central do Vendedor da Amazon, onde deverá confirmar as informações.
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Isso nos permitirá identificar os pedidos da Amazon, coletar e corrigir todos os detalhes essenciais para os documentos de declaração e enviar os pacotes com eficiência pelo canal PRC.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src="https://img.icons8.com/ios/20/cc9900/warning-shield.png" 
                      alt="Atenção" 
                      className="w-5 h-5"
                    />
                    <p className="text-sm sm:text-base text-yellow-800 font-semibold">
                      Prazo Importante
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-yellow-800">
                    O prazo para fornecer essa autorização à SkyPostal é <strong>4 de abril de 2025</strong>, após o qual não poderemos mais enviar seus itens pelo canal PRC ao Brasil até que tal autorização seja concedida.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              
              {/* Para quem é esse aplicativo */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <img 
                      src="https://img.icons8.com/ios/24/22c55e/group.png" 
                      alt="Grupo" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Para quem é esse aplicativo?
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Este aplicativo foi desenvolvido especificamente para vendedores da Amazon que usam a SkyPostal para enviar produtos para o Brasil. Ele está em conformidade com o Programa Remessa Conforme (PRC) e ajuda a automatizar a sincronização de pedidos e a documentação alfandegária.
                </p>
              </div>

              {/* Serviços */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <img 
                      src="https://img.icons8.com/ios/24/0066cc/delivery.png" 
                      alt="Entrega" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Serviços
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  A SkyPostal fornece uma solução logística completa, cobrindo todas as etapas do processo de envio — desde a geração de etiquetas até o rastreamento completo da última milha, até a entrega bem-sucedida.
                </p>
              </div>

              {/* Funções */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <img 
                      src="https://img.icons8.com/ios/24/9333ea/settings.png" 
                      alt="Configurações" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Funções
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Este aplicativo foi criado exclusivamente para verificar informações de pedidos atribuídos à SkyPostal com destino ao Brasil, garantindo a conformidade com todos os requisitos do programa PRC brasileiro.
                </p>
              </div>

              {/* Preços */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <img 
                      src="https://img.icons8.com/ios/24/22c55e/money.png" 
                      alt="Dinheiro" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Preços
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  A verificação de remessas para o Brasil no programa PRC via SkyPostal é <strong>totalmente gratuita</strong> para todos os clientes SkyPostal.
                </p>
              </div>
            </div>

            {/* Características */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <img 
                    src="https://img.icons8.com/ios/24/f97316/search.png" 
                    alt="Busca" 
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Características
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 text-center">
                Este aplicativo realiza automaticamente as seguintes validações para garantir a conformidade com os requisitos aduaneiros brasileiros no âmbito do programa PRC:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/ios/24/0066cc/package.png" 
                      alt="Pacote" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h4 className="font-semibold text-blue-800 mb-2">Quantidade de Itens</h4>
                  <p className="text-sm text-blue-700">Validação automática</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/ios/24/22c55e/price-tag.png" 
                      alt="Preço" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h4 className="font-semibold text-green-800 mb-2">Preço</h4>
                  <p className="text-sm text-green-700">Validação automática</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <img 
                      src="https://img.icons8.com/ios/24/9333ea/edit.png" 
                      alt="Descrição" 
                      className="w-6 h-6"
                    />
                  </div>
                  <h4 className="font-semibold text-purple-800 mb-2">Descrição</h4>
                  <p className="text-sm text-purple-700">Validação automática</p>
                </div>
              </div>
            </div>

            {/* Diagrama */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <img 
                    src="https://img.icons8.com/ios/24/6366f1/bar-chart.png" 
                    alt="Gráfico" 
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Diagrama do Processo
                </h3>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/68262e4220135804fdb39b68_prcDiagram.png" 
                  alt="Diagrama PRC" 
                  className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
