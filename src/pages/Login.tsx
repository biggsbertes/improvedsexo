import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Logo } from '@/components/Logo'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(username, password)
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o painel...",
      })
      navigate('/leads')
    } else {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha incorretos.",
        variant: "destructive"
      })
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-elegant border border-border p-8">
          <div className="text-center mb-8">
            <Logo className="mx-auto mb-6" />
            <h1 className="text-2xl font-semibold text-text-primary mb-2">
              Painel Administrativo
            </h1>
            <p className="text-text-secondary">
              Faça login para acessar o sistema
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-text-primary font-medium">
                Usuário
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-text-primary font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              variant="skypostal"
              size="lg"
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            <p>Sua entrega, nossa responsabilidade! :D</p>
          </div>
        </div>
      </div>
    </div>
  )
}