import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export const LatamPage = () => {
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
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a4bfd945207b40397a817_LATAM%20banner.png')`
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/80 via-blue-600/80 to-sky-700/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-slide-up leading-tight">
              Enviar a <span className="text-yellow-300">Latam</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Soluções completas de envio internacional para todos os países da América Latina com preços competitivos e entrega rápida.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Main Heading and Description */}
            <div className="text-center mb-12 md:mb-16">
              {/* Globe Icon - moved here for mobile */}
              <div className="flex justify-center mb-6">
                <i className="fa-solid fa-earth-americas text-5xl sm:text-6xl md:text-7xl text-sky-600 animate-pulse"></i>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
                Expanda seu negócio para a américa latina com a SkyPostal
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  O setor de e-commerce da América Latina experimentou um crescimento incrível nos últimos anos, impulsionado pela crescente penetração da internet, aumento do uso de smartphones e uma classe média em expansão. Os itens mais vendidos na américa latina incluem eletrônicos, moda, saúde e bem-estar, entre outros.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  O que isso significa para você como vendedor? É o mercado perfeito para entrar. Com milhares de consumidores digitais ansiosos para comprar, há uma necessidade crescente de soluções de envio e logística confiáveis para facilitar a entrega de mercadorias na região. A SkyPostal está aqui para atender todas as suas necessidades de envio, desde a geração de etiquetas até o rastreamento das entregas na última milha.
                </p>
              </div>
            </div>

            {/* Countries Section */}
            <div className="mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
                  Quais países nós atendemos?
                </h3>
                <Button
                  asChild
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 rounded-lg px-4 py-2"
                >
                  <a
                    href="https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/672a9ee077aaff87b28c9fd9_International%20Service%20Guide-%20Portuguese%20Version-2.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://img.icons8.com/ios-glyphs/30/FFFFFF/ms-excel.png"
                      alt="Excel"
                      className="w-5 h-5"
                    />
                    Guias de Serviço
                  </a>
                </Button>
              </div>
              
              {/* Mobile: Carrossel animado */}
              <div className="md:hidden mb-8 overflow-hidden">
                <div className="flex animate-scroll-x space-x-6">
                  {/* Brasil */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/brazil.png"
                      alt="Brasil"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Brasil</h4>
                  </div>
                  
                  {/* Chile */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/chile.png"
                      alt="Chile"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Chile</h4>
                  </div>
                  
                  {/* Colômbia */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/colombia.png"
                      alt="Colômbia"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Colômbia</h4>
                  </div>
                  
                  {/* Costa Rica */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/costa-rica.png"
                      alt="Costa Rica"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Costa Rica</h4>
                  </div>
                  
                  {/* Equador */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/48/ehcuador.png"
                      alt="Equador"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Equador</h4>
                  </div>
                  
                  {/* México */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/mexico.png"
                      alt="México"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">México</h4>
                  </div>
                  
                  {/* Peru */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/peru.png"
                      alt="Peru"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Peru</h4>
                  </div>

                  {/* Duplicar países para efeito infinito */}
                  {/* Brasil */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/brazil.png"
                      alt="Brasil"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Brasil</h4>
                  </div>
                  
                  {/* Chile */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/chile.png"
                      alt="Chile"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Chile</h4>
                  </div>
                  
                  {/* Colômbia */}
                  <div className="flex flex-col items-center min-w-[120px] group">
                    <img
                      src="https://img.icons8.com/color/96/colombia.png"
                      alt="Colômbia"
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Colômbia</h4>
                  </div>
                </div>
              </div>

              {/* Desktop: Carrossel animado */}
              <div className="hidden md:block mb-8 overflow-hidden">
                <div className="flex animate-scroll-x space-x-8 lg:space-x-12">
                  {/* Brasil */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/brazil.png"
                      alt="Brasil"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Brasil</span>
                  </div>
                  
                  {/* Chile */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/chile.png"
                      alt="Chile"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Chile</span>
                  </div>
                  
                  {/* Colômbia */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/colombia.png"
                      alt="Colômbia"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Colômbia</span>
                  </div>
                  
                  {/* Costa Rica */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/costa-rica.png"
                      alt="Costa Rica"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Costa Rica</span>
                  </div>
                  
                  {/* Equador */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/48/ehcuador.png"
                      alt="Equador"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Equador</span>
                  </div>
                  
                  {/* México */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/mexico.png"
                      alt="México"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">México</span>
                  </div>
                  
                  {/* Peru */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/peru.png"
                      alt="Peru"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Peru</span>
                  </div>

                  {/* Duplicar países para efeito infinito */}
                  {/* Brasil */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/brazil.png"
                      alt="Brasil"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Brasil</span>
                  </div>
                  
                  {/* Chile */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/chile.png"
                      alt="Chile"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Chile</span>
                  </div>
                  
                  {/* Colômbia */}
                  <div className="flex flex-col items-center min-w-[150px] lg:min-w-[180px] group">
                    <img
                      src="https://img.icons8.com/color/96/colombia.png"
                      alt="Colômbia"
                      className="w-20 h-20 lg:w-24 lg:h-24 mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-base lg:text-lg font-medium text-gray-700 text-center">Colômbia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800">
                Por que SkyPostal?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Tarifas flexíveis</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Projetadas para escalar seu negócio</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Entrega Domiciliar</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Com Confirmação de entrega</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Opções de Courier e Correios</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Flexibilidade na escolha</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Despacho Aduaneiro</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Processo simplificado</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Gestão de Impostos e Taxas</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Transparência total</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1 leading-tight">Opção de Seguro</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Proteção para suas mercadorias</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                Contatar Vendas
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
