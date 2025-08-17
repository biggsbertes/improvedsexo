import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Logo } from './Logo'

export const Footer = () => {
  return (
    <footer className="bg-sky-500 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <img 
                src="https://cdn.prod.website-files.com/66202b3d02d1d9ed3105d86d/66202b3d02d1d9ed3105da6c_skypostal_logo.svg" 
                alt="SkyPostal Logo" 
                className="w-52 h-52 object-contain"
              />
            </div>
          </div>

          {/* Serviços SkyPostal */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base mb-3 text-white border-b-2 border-white/20 pb-2">Serviços SkyPostal</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="/latam" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Enviar a LATAM</a></li>
              <li><a href="/integrations" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Nossas Integrações</a></li>
              <li><a href="/prc-auth" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Processo de Autorização da RPC</a></li>
              <li><a href="/sales-inquiries" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Fale com o Comercial</a></li>
              <li><a href="/importer-responsibility" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Responsabilidade do Importador</a></li>
            </ul>
          </div>

          {/* Enviar Agora */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base mb-3 text-white border-b-2 border-white/20 pb-2">Enviar Agora</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><button className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20 w-full text-left">Fale com o comercial</button></li>
              <li><button className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20 w-full text-left">Guia de Serviços</button></li>
              <li><button className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20 w-full text-left">Itens Restritos</button></li>
              <li><button className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20 w-full text-left">Responsabilidade do Importador</button></li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-base mb-3 text-white border-b-2 border-white/20 pb-2">Suporte</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="/" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Rastrear um pacote</a></li>
              <li><a href="/sales-inquiries" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Atendimento ao Cliente</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Política de Privacidade</a></li>
              <li><a href="/terms-conditions" className="hover:text-white transition-all duration-300 cursor-pointer block py-2 px-3 rounded-lg hover:bg-white/10 active:bg-white/20">Termos e Condições</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a aria-label="LinkedIn" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors" href="#"><Linkedin className="h-5 w-5" /></a>
            <a aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors" href="#"><Instagram className="h-5 w-5" /></a>
            <a aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors" href="#"><Facebook className="h-5 w-5" /></a>
            <a aria-label="YouTube" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors" href="#"><Youtube className="h-5 w-5" /></a>
          </div>
          <div className="text-xs text-white/90 text-center md:text-right">
            2990 NW 75th Ave, Miami, FL 33122, United States
            <div>© 2024 SkyPostal. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}


