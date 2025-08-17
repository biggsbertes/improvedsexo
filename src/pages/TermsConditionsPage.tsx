import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, FileText, Shield, AlertTriangle, CheckCircle, Info, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export const TermsConditionsPage = () => {
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
              Termos e <span className="text-yellow-300">Condições</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Conheça os termos e condições que regem o uso dos nossos serviços e a relação com nossos clientes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 animate-slide-up delay-400">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                Entrar em Contato
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600 transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                Ver Política
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
              Termos e Condições de Uso
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Estes termos e condições estabelecem as regras e regulamentos para o uso dos serviços da SkyPostal. 
              Ao utilizar nossos serviços, você concorda em cumprir estes termos. Se você não concordar com qualquer 
              parte destes termos, não deve utilizar nossos serviços.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Última atualização:</strong> 15 de Janeiro de 2024
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Aceitação dos Termos
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Ao acessar e utilizar os serviços da SkyPostal, você confirma que:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Leu e Entendeu:</strong> Leu completamente estes termos e condições
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Concorda:</strong> Aceita e concorda em cumprir todos os termos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Capacidade Legal:</strong> Tem capacidade legal para celebrar contratos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Verdadeiras:</strong> Fornecerá informações verdadeiras e precisas
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Definições
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Para os fins destes termos, as seguintes definições se aplicam:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>SkyPostal:</strong> Refere-se à empresa SkyPostal Ltda. e seus serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Cliente:</strong> Pessoa física ou jurídica que utiliza nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Serviços:</strong> Todos os serviços oferecidos pela SkyPostal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Envio:</strong> Pacote ou mercadoria enviada através de nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Site:</strong> Plataforma online da SkyPostal
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Descrição dos Serviços
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A SkyPostal oferece os seguintes serviços:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Envio Internacional:</strong> Serviços de envio para diversos países
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Rastreamento:</strong> Sistema de rastreamento em tempo real
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Seguro:</strong> Opções de seguro para suas mercadorias
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Suporte:</strong> Atendimento ao cliente e suporte técnico
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Integrações:</strong> APIs e ferramentas para desenvolvedores
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Elegibilidade para Uso dos Serviços
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Para utilizar nossos serviços, você deve:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Idade Mínima:</strong> Ter pelo menos 18 anos de idade
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Capacidade Legal:</strong> Ter capacidade legal para celebrar contratos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Verdadeiras:</strong> Fornecer informações precisas e atualizadas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade:</strong> Cumprir todas as leis e regulamentos aplicáveis
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Registro e Conta
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Para utilizar certos serviços, você pode precisar criar uma conta:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Precisas:</strong> Fornecer informações verdadeiras e precisas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Segurança da Conta:</strong> Manter a confidencialidade de suas credenciais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Atualizações:</strong> Manter suas informações sempre atualizadas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Responsabilidade:</strong> Ser responsável por todas as atividades em sua conta
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Uso Aceitável dos Serviços
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Você concorda em utilizar nossos serviços apenas para propósitos legais e aceitáveis:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Propósitos Legais:</strong> Utilizar os serviços apenas para fins legais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Respeito aos Direitos:</strong> Respeitar os direitos de terceiros
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade:</strong> Cumprir todas as leis e regulamentos aplicáveis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Uso Responsável:</strong> Utilizar os serviços de forma responsável
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Uso Proibido
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              É estritamente proibido utilizar nossos serviços para:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Atividades Ilegais:</strong> Qualquer atividade ilegal ou fraudulenta
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Produtos Proibidos:</strong> Envio de produtos proibidos ou restritos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Violação de Direitos:</strong> Violar direitos de propriedade intelectual
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Spam e Abuso:</strong> Envio de spam ou uso abusivo dos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Interferência:</strong> Interferir no funcionamento dos serviços
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Responsabilidades do Cliente
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Como cliente, você é responsável por:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Informações Precisas:</strong> Fornecer informações precisas sobre envios
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Embalagem Adequada:</strong> Embalar adequadamente suas mercadorias
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade Legal:</strong> Garantir conformidade com leis aplicáveis
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Pagamento:</strong> Pagar todos os valores devidos pelos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Cooperação:</strong> Cooperar com nossa equipe quando solicitado
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Responsabilidades da SkyPostal
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A SkyPostal se compromete a:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Qualidade dos Serviços:</strong> Fornecer serviços de alta qualidade
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Segurança:</strong> Proteger a segurança de suas informações
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Suporte:</strong> Oferecer suporte adequado aos clientes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Transparência:</strong> Ser transparente sobre nossos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conformidade:</strong> Cumprir todas as leis e regulamentos aplicáveis
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Limitação de Responsabilidade
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A responsabilidade da SkyPostal é limitada da seguinte forma:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Danos Diretos:</strong> Apenas danos diretos causados por nossa negligência
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Valor do Envio:</strong> Limitação ao valor declarado do envio
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Exclusões:</strong> Danos indiretos, consequenciais ou punitivos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Força Maior:</strong> Eventos fora de nosso controle
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Política de Privacidade
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              O uso de nossos serviços também está sujeito à nossa Política de Privacidade, que descreve como 
              coletamos, usamos e protegemos suas informações pessoais. Recomendamos que você leia nossa 
              Política de Privacidade para entender nossas práticas.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Propriedade Intelectual
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Todos os direitos de propriedade intelectual relacionados aos nossos serviços pertencem à SkyPostal:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Marca Registrada:</strong> Logotipos, nomes e marcas comerciais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Software:</strong> Código, aplicativos e plataformas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Conteúdo:</strong> Textos, imagens e materiais informativos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Design:</strong> Layout, design e interface do usuário
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Rescisão dos Serviços
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Podemos rescindir ou suspender o acesso aos nossos serviços nas seguintes situações:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Violacao dos Termos:</strong> Violação destes termos e condições
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Uso Inadequado:</strong> Uso inadequado ou abusivo dos serviços
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Atividades Ilegais:</strong> Envolvimento em atividades ilegais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Inadimplência:</strong> Inadimplência no pagamento dos serviços
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Modificações dos Termos
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Notificação:</strong> Você será notificado sobre mudanças significativas
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
                  <strong>Continuidade:</strong> O uso continuado implica aceitação das mudanças
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Lei Aplicável e Jurisdição
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais 
              da comarca de São Paulo, SP, Brasil, com renúncia expressa a qualquer outro foro.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
              Disposições Gerais
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Outras disposições importantes:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Independência:</strong> Cada disposição é independente das demais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Renúncia:</strong> A falha em fazer valer um direito não constitui renúncia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Acordo Completo:</strong> Estes termos constituem o acordo completo entre as partes
                </span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg my-8">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                💡 Dica Importante
              </h4>
              <p className="text-blue-700">
                Recomendamos que você revise estes termos periodicamente para se manter informado sobre 
                as condições de uso de nossos serviços.
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
              <FileText className="h-12 w-12 md:h-16 md:w-16 text-sky-500 mx-auto mb-4 md:mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
                Tem dúvidas sobre os termos?
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600 max-w-2xl mx-auto px-4">
                Nossa equipe jurídica está pronta para esclarecer todas as suas dúvidas sobre nossos termos e condições.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                  Entrar em Contato
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                  Ver Política
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
