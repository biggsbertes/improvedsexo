import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowRight, MessageSquare, Phone, Mail, MapPin, Clock, Star, Rocket, Users, Globe, Shield, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export const SalesInquiriesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled in localStorage or system preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
                    window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(darkMode)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar campos obrigatórios
    const requiredFields = ['name', 'email', 'service', 'message']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios: ' + missingFields.join(', '))
      return
    }
    
    // Simular envio da solicitação
    console.log('Solicitação enviada:', formData)
    
    // Mostrar pop-up de sucesso
    setShowSuccess(true)
    
    // Limpar campos do formulário
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-sky-700 text-white py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.softil.com/wp-content/uploads/2017/07/contact-banner.jpg')`
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/80 via-blue-600/80 to-sky-700/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-slide-up leading-tight">
              Fale com o <span className="text-yellow-300">Comercial</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up delay-200 px-4">
              Nossa equipe especializada está pronta para entender suas necessidades e oferecer as melhores soluções para seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Entre em Contato com Nossa Equipe Comercial
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A SkyPostal está comprometida em oferecer as melhores soluções de envio internacional 
              para seu negócio. Nossa equipe comercial é especializada em entender suas necessidades 
              específicas e desenvolver propostas personalizadas que atendam perfeitamente aos seus objetivos.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in delay-300">
              <CardContent className="p-6 md:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Nome Completo *</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo" 
                        className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">Empresa</Label>
                      <Input 
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa" 
                        className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                      <Input 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        placeholder="seu@email.com" 
                        className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Telefone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999" 
                        className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-700 font-medium">Serviço de Interesse *</Label>
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="envio">Envio Internacional</option>
                      <option value="api">Integrações API</option>
                      <option value="consultoria">Consultoria Especializada</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Mensagem *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descreva suas necessidades e como podemos ajudar..." 
                      rows={4}
                      className="border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:bg-white focus:text-gray-900 touch-manipulation"
                    />
                  </div>
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg px-8 w-full sm:w-auto touch-manipulation"
                    >
                      Enviar Solicitação
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Pop-up de Sucesso */}
            {showSuccess && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md mx-4 text-center shadow-2xl animate-bounce-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Solicitação Enviada!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sua solicitação foi enviada com sucesso. Nossa equipe comercial entrará em contato em até 2 horas úteis.
                  </p>
                  <Button 
                    onClick={() => setShowSuccess(false)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in">
              <MessageSquare className="h-12 w-12 md:h-16 md:w-16 text-sky-500 mx-auto mb-4 md:mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
                Pronto para começar?
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600 max-w-2xl mx-auto px-4">
                Nossa equipe comercial está pronta para entender suas necessidades e oferecer as melhores soluções.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-full sm:w-auto touch-manipulation">
                  Solicitar Proposta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transform hover:scale-105 active:scale-95 transition-all duration-200 w-full sm:w-auto touch-manipulation">
                  Falar por Telefone
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
