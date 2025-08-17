import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Shield, Lock, Eye, FileText, Clock, CheckCircle, Info } from 'lucide-react'
import { useState, useEffect } from 'react'

export const PrivacyPolicyPage = () => {
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
              Política de <span className="text-yellow-300">Privacidade</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Conheça como a SkyPostal protege e gerencia suas informações pessoais, garantindo total transparência e segurança.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 animate-slide-up delay-400">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                Entrar em Contato
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600 transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                Ver Termos
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
              Nossa Política de Privacidade
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A SkyPostal está comprometida em proteger a privacidade e a segurança de suas informações pessoais. 
              Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações quando você 
              utiliza nossos serviços.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Última atualização:</strong> 15 de Janeiro de 2024
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Informações que Coletamos
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Pessoais:</strong> Nome, email, telefone, endereço e documentos de identificação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Comerciais:</strong> Dados da empresa, CNPJ, histórico de transações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações de Envio:</strong> Detalhes dos pacotes, endereços de destino, valores
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações de Navegação:</strong> Cookies, logs de acesso, preferências do usuário
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações de Pagamento:</strong> Dados de cartão de crédito, histórico de pagamentos
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Como Coletamos as Informações
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Utilizamos diferentes métodos para coletar suas informações:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Formulários:</strong> Quando você preenche formulários em nosso site
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Comunicação Direta:</strong> Através de emails, telefone ou chat
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Uso de Serviços:</strong> Durante a utilização de nossas plataformas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Cookies e Tecnologias:</strong> Tecnologias de rastreamento automático
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Terceiros:</strong> De parceiros comerciais e provedores de serviços
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Como Utilizamos suas Informações
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Suas informações são utilizadas para os seguintes propósitos:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Fornecimento de Serviços:</strong> Processar envios, gerar etiquetas e rastrear pacotes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Comunicação:</strong> Enviar atualizações, notificações e suporte ao cliente
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Melhorias:</strong> Analisar dados para melhorar nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Segurança:</strong> Prevenir fraudes e garantir a segurança dos usuários
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade Legal:</strong> Cumprir obrigações legais e regulamentares
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Compartilhamento de Informações
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Suas informações podem ser compartilhadas nas seguintes situações:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Com seu Consentimento:</strong> Quando você autorizar explicitamente
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Prestadores de Serviços:</strong> Empresas que nos auxiliam na operação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Parceiros Comerciais:</strong> Para processar envios e pagamentos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Obrigação Legal:</strong> Quando exigido por lei ou autoridades
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Proteção de Direitos:</strong> Para proteger nossos direitos e segurança
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Segurança das Informações
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Implementamos medidas rigorosas de segurança para proteger suas informações:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Criptografia:</strong> Dados sensíveis são criptografados em trânsito e em repouso
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Controle de Acesso:</strong> Acesso restrito apenas a funcionários autorizados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Monitoramento:</strong> Sistemas de monitoramento 24/7 para detectar ameaças
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Backup Seguro:</strong> Cópias de segurança em locais seguros
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Treinamento:</strong> Funcionários treinados em práticas de segurança
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Seus Direitos
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Como usuário de nossos serviços, você tem os seguintes direitos:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Acesso:</strong> Solicitar acesso às suas informações pessoais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Correção:</strong> Solicitar correção de informações incorretas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Exclusão:</strong> Solicitar exclusão de suas informações pessoais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Portabilidade:</strong> Receber suas informações em formato estruturado
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Oposição:</strong> Opor-se ao processamento de suas informações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Revogação:</strong> Revogar consentimento a qualquer momento
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Retenção de Dados
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Mantemos suas informações pelo tempo necessário para:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Fornecer Serviços:</strong> Durante o período de uso de nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Cumprir Obrigações Legais:</strong> Conforme exigido pela legislação
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Resolver Disputas:</strong> Para resolver questões pendentes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Melhorar Serviços:</strong> Para análise e desenvolvimento de produtos
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Cookies e Tecnologias de Rastreamento
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Funcionalidade:</strong> Manter suas preferências e configurações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Análise:</strong> Entender como você utiliza nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Segurança:</strong> Detectar atividades suspeitas e fraudes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Personalização:</strong> Oferecer conteúdo relevante para você
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Transferências Internacionais
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Suas informações podem ser transferidas para outros países quando:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Processamento de Envios:</strong> Para processar envios internacionais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Serviços em Nuvem:</strong> Quando utilizamos provedores internacionais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Parceiros Comerciais:</strong> Para operações com parceiros estrangeiros
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Menores de Idade
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente 
              informações pessoais de menores. Se você é responsável por um menor e acredita que ele 
              forneceu informações pessoais, entre em contato conosco imediatamente.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Alterações na Política
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Podemos atualizar esta política periodicamente. Quando fizermos alterações significativas:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Notificação:</strong> Você será notificado sobre as mudanças
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Data de Atualização:</strong> A data de última atualização será modificada
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Consentimento:</strong> Pode ser necessário seu consentimento para mudanças significativas
                </span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg my-8">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                💡 Dica Importante
              </h4>
              <p className="text-blue-700">
                Recomendamos que você revise esta política periodicamente para se manter informado sobre 
                como protegemos suas informações.
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
                Tem dúvidas sobre privacidade?
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600 max-w-2xl mx-auto px-4">
                Nossa equipe está pronta para esclarecer todas as suas dúvidas sobre como protegemos suas informações.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                  Entrar em Contato
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                  Ver Termos
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
