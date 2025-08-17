import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, AlertTriangle, CheckCircle, Info, FileText, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export const ImporterResponsibilityPage = () => {
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
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-slide-up leading-tight">
              Responsabilidade do <span className="text-yellow-300">Importador</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Entenda suas responsabilidades como importador e como a SkyPostal pode ajudar você a cumprir todas as obrigações legais.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 animate-slide-up delay-400">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                Consultar Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600 transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                Ver Documentação
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              O que é a Responsabilidade do Importador?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A responsabilidade do importador é um conceito fundamental no comércio internacional que define 
              as obrigações legais, fiscais e comerciais de quem importa mercadorias para o Brasil. 
              Como importador, você é responsável por garantir que todos os produtos importados estejam 
              em conformidade com as leis brasileiras.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Principais Responsabilidades do Importador
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Como importador, você tem as seguintes responsabilidades:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade Legal:</strong> Garantir que os produtos atendam às normas brasileiras
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Documentação Completa:</strong> Fornecer todos os documentos necessários
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Pagamento de Impostos:</strong> Liquidar todos os tributos devidos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Qualidade dos Produtos:</strong> Garantir que os produtos sejam seguros e adequados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Rastreabilidade:</strong> Manter registros de toda a cadeia de importação
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Responsabilidades Fiscais
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              No âmbito fiscal, o importador é responsável por:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>II (Imposto de Importação):</strong> Calcular e pagar o imposto sobre importações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>IPI (Imposto sobre Produtos Industrializados):</strong> Quando aplicável
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>ICMS (Imposto sobre Circulação de Mercadorias):</strong> Imposto estadual
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>PIS/COFINS:</strong> Contribuições sociais sobre importações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Taxas Administrativas:</strong> Taxas da Receita Federal e outros órgãos
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Responsabilidades Comerciais
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              No aspecto comercial, você deve:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Verificar Fornecedores:</strong> Confirmar a idoneidade dos fornecedores estrangeiros
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Negociar Termos:</strong> Estabelecer condições claras de compra e entrega
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Contratos Adequados:</strong> Firmar contratos que protejam seus interesses
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Seguros:</strong> Contratar seguros adequados para as mercadorias
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Gestão de Riscos:</strong> Identificar e mitigar riscos comerciais
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Responsabilidades Técnicas
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Do ponto de vista técnico, é sua responsabilidade:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Certificações:</strong> Verificar se os produtos possuem certificações obrigatórias
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Padrões Técnicos:</strong> Garantir que atendam aos padrões brasileiros
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Instruções de Uso:</strong> Produtos devem vir com instruções em português
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Garantias:</strong> Estabelecer políticas de garantia adequadas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Suporte Técnico:</strong> Oferecer suporte técnico quando necessário
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Consequências do Descumprimento
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              O não cumprimento das responsabilidades pode resultar em:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Multas e Penalidades
                </h4>
                <p className="text-red-700 text-sm">
                  Aplicação de multas por órgãos fiscalizadores como Receita Federal, Anvisa e outros.
                </p>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Apreensão de Mercadorias
                </h4>
                <p className="text-orange-700 text-sm">
                  Produtos podem ser apreendidos na alfândega se não estiverem em conformidade.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Processos Administrativos
                </h4>
                <p className="text-yellow-700 text-sm">
                  Abertura de processos administrativos que podem resultar em restrições futuras.
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Responsabilidade Civil
                </h4>
                <p className="text-purple-700 text-sm">
                  Pode ser responsabilizado civilmente por danos causados aos consumidores.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Como a SkyPostal Pode Ajudar
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nossa equipe especializada pode auxiliar você a cumprir todas as responsabilidades:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Consultoria Especializada:</strong> Orientação completa sobre responsabilidades
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Gestão de Documentos:</strong> Organização e verificação de toda documentação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Cálculo de Impostos:</strong> Cálculo correto de todos os tributos devidos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Verificação de Conformidade:</strong> Análise de conformidade dos produtos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Acompanhamento de Processos:</strong> Monitoramento de todo o processo de importação
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Melhores Práticas para Importadores
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Siga estas práticas para ser um importador responsável:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Planejamento Adequado:</strong> Planeje suas importações com antecedência
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Documentação Organizada:</strong> Mantenha todos os documentos organizados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Fornecedores Confiáveis:</strong> Trabalhe apenas com fornecedores idôneos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Monitoramento Contínuo:</strong> Acompanhe todas as etapas do processo
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Atualização de Conhecimentos:</strong> Mantenha-se atualizado sobre mudanças na legislação
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Documentação Essencial
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Mantenha sempre em dia os seguintes documentos:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Registro de Importadores:</strong> Cadastro na Receita Federal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Licenças de Importação:</strong> Quando aplicável
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Certidões Negativas:</strong> De débitos fiscais e trabalhistas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Contratos com Fornecedores:</strong> Documentos comerciais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Registros de Importação:</strong> Histórico de todas as operações
                </span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg my-8">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                💡 Dica Importante
              </h4>
              <p className="text-blue-700">
                A responsabilidade do importador é contínua e não termina com a chegada da mercadoria. 
                Você deve manter registros e documentação por pelo menos 5 anos, conforme exigido pela legislação brasileira.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in">
              <Shield className="h-12 w-12 md:h-16 md:w-16 text-sky-500 mx-auto mb-4 md:mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
                Precisa de ajuda com suas responsabilidades?
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600 max-w-2xl mx-auto px-4">
                Nossa equipe especializada está pronta para orientar você em todas as suas obrigações como importador.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                  Consultar Especialista
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                  Ver Documentação
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
