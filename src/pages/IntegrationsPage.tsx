import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export const IntegrationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled in localStorage or system preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
                    window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(darkMode)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white py-12 md:py-16 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a4ed924c99eb94e082371_Our%20integrations.png')`
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/80 via-blue-600/80 to-sky-700/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-up leading-tight px-2">
              SkyPostal <span className="text-yellow-300">Integrações</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Conecte sua plataforma com a SkyPostal através de APIs robustas e integrações nativas para automatizar seus envios internacionais.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-center px-2">
              Integrações e APIs
            </h2>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed text-center px-2">
              A SkyPostal oferece soluções de integração robustas e flexíveis para conectar sua plataforma 
              diretamente aos nossos serviços de envio internacional. Nossas APIs permitem automatizar 
              todo o processo de envio, desde a criação de etiquetas até o rastreamento em tempo real.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 mt-8 text-center px-2">
              Plataformas Suportadas
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed text-center px-2">
              Oferecemos integrações nativas com as principais plataformas de e-commerce:
            </p>
            
            {/* Carrossel de Logos */}
            <div className="mb-8 overflow-hidden">
              <div className="flex animate-scroll-x space-x-6 sm:space-x-8 md:space-x-12">
                {/* Amazon */}
                <div className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/amazon-web-services.png" 
                      alt="Amazon" 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center">Amazon</span>
                </div>

                {/* eBay */}
                <div className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/ebay.png" 
                      alt="eBay" 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center">eBay</span>
                </div>

                {/* WooCommerce */}
                <div className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/woocommerce.png" 
                      alt="WooCommerce" 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center">WooCommerce</span>
                </div>

                {/* Shopify */}
                <div className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/shopify.png" 
                      alt="Shopify" 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center">Shopify</span>
                </div>

                {/* Magento */}
                <div className="flex flex-col items-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/magento.png" 
                      alt="Magento" 
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center">Magento</span>
                </div>

                {/* Duplicar logos para efeito infinito */}
                {/* Amazon */}
                <div className="flex flex-col items-center min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/amazon-web-services.png" 
                      alt="Amazon" 
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-700 text-center">Amazon</span>
                </div>

                {/* eBay */}
                <div className="flex flex-col items-center min-w-[120px] md:min-w-[150px] group">
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 group-hover:scale-105">
                    <img 
                      src="https://img.icons8.com/color/96/ebay.png" 
                      alt="eBay" 
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-700 text-center">eBay</span>
                </div>
              </div>
            </div>

            {/* APIs Disponíveis */}
            <div className="mb-12">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 mt-8 text-center px-2">
                APIs Disponíveis
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed text-center max-w-3xl mx-auto px-2">
                Escolha a tecnologia que melhor se adapta ao seu projeto:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* API REST */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="bg-blue-500 p-2 md:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/api-settings.png" 
                        alt="API" 
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">API REST</h4>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Endpoints RESTful para todas as operações com autenticação OAuth2
                  </p>
                </div>

                {/* Webhooks */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/lightning-bolt.png" 
                        alt="Webhook" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Webhooks</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Notificações em tempo real para eventos e atualizações
                  </p>
                </div>

                {/* GraphQL */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/database.png" 
                        alt="GraphQL" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">GraphQL</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    API GraphQL para consultas complexas e eficientes
                  </p>
                </div>

                {/* SDKs */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/globe.png" 
                        alt="SDKs" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">SDKs</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Bibliotecas para Node.js, Python, PHP, Java e .NET
                  </p>
                </div>
              </div>
            </div>

            {/* Funcionalidades da API */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-12 text-center">
                Funcionalidades da API
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                Nossas APIs oferecem funcionalidades completas para gerenciar envios:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Criação de Etiquetas */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/22C55E/checkmark.png" 
                        alt="Check" 
                        className="w-5 h-5"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">Criação de Etiquetas</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Gere etiquetas de envio automaticamente
                  </p>
                </div>

                {/* Rastreamento */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/2563EB/checkmark.png" 
                        alt="Check" 
                        className="w-5 h-5"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">Rastreamento</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Acompanhe envios em tempo real
                  </p>
                </div>

                {/* Cálculo de Frete */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/9333EA/checkmark.png" 
                        alt="Check" 
                        className="w-5 h-5"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">Cálculo de Frete</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Calcule custos de envio automaticamente
                  </p>
                </div>

                {/* Gestão de Pedidos */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/EA580C/checkmark.png" 
                        alt="Check" 
                        className="w-5 h-5"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">Gestão de Pedidos</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Gerencie pedidos e envios
                  </p>
                </div>

                {/* Relatórios */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/4F46E5/checkmark.png" 
                        alt="Check" 
                        className="w-5 h-5"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800">Relatórios</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Acesse dados e estatísticas de envios
                  </p>
                </div>
              </div>
            </div>

            {/* Recursos Técnicos */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 mt-12 text-center">
                Recursos Técnicos
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                Tecnologia de ponta para garantir a melhor experiência de integração:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Autenticação Segura */}
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/shield.png" 
                        alt="Shield" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Autenticação Segura</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    OAuth2, JWT e API keys para máxima segurança
                  </p>
                </div>

                {/* Rate Limiting */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-yellow-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/clock.png" 
                        alt="Clock" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Rate Limiting</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Controle de requisições para estabilidade da API
                  </p>
                </div>

                {/* Documentação Completa */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-teal-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/code.png" 
                        alt="Code" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Documentação Completa</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Guias, exemplos e playground interativo
                  </p>
                </div>

                {/* Suporte Técnico */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src="https://img.icons8.com/ios-glyphs/30/FFFFFF/star.png" 
                        alt="Star" 
                        className="w-6 h-6"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">Suporte Técnico</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Equipe especializada para ajudar na integração
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl animate-fade-in">
              <img 
                src="https://img.icons8.com/ios-glyphs/96/0EA5E9/rocket.png" 
                alt="Rocket" 
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 animate-bounce"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 text-gray-800 px-2">
                Pronto para integrar?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 lg:mb-8 text-gray-600 max-w-2xl mx-auto px-4">
                Comece a usar nossas APIs hoje mesmo e automatize seus envios internacionais.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation text-sm sm:text-base">
                  Ver Documentação
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation text-sm sm:text-base">
                  Solicitar Acesso
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
