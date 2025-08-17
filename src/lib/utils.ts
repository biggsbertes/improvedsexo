import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um CPF para o formato padrão brasileiro (000.000.000-00)
 * @param cpf - CPF como string (com ou sem formatação)
 * @returns CPF formatado ou string original se inválido
 */
export const formatCPF = (cpf?: string): string => {
  if (!cpf) return '—'
  
  // Remove todos os caracteres não numéricos
  const digits = cpf.replace(/\D/g, '')
  
  // Verifica se tem 11 dígitos (formato válido de CPF)
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  
  // Se não tem 11 dígitos, retorna o valor original
  return cpf
}

/**
 * Formata um endereço aplicando Title Case (primeira letra maiúscula) em cada palavra
 * @param address - Endereço como string
 * @returns Endereço formatado
 */
export const formatAddress = (address?: string): string => {
  if (!address) return '—'
  
  return address
    .split(' ')
    .map(word => {
      // Preserva abreviações comuns
      const abbreviations = ['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'na', 'no', 'nas', 'nos']
      if (abbreviations.includes(word.toLowerCase())) {
        return word.toLowerCase()
      }
      
      // Aplica Title Case para outras palavras
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}
