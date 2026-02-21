import React from 'react'
import { render, screen } from '@testing-library/react'
import { PriorityTag } from '@/components/priority-tag'

jest.mock('@/i18n/context', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.priority.Crítica': 'Crítica',
        'common.priority.Alta': 'Alta',
        'common.priority.Média': 'Média',
        'common.priority.Baixa': 'Baixa',
      }
      return translations[key] || key
    },
  }),
}))

describe('PriorityTag Component', () => {
  it('deve renderizar com prioridade Crítica', () => {
    render(<PriorityTag prioridade="Crítica" />)
    
    expect(screen.getByText('Crítica')).toBeInTheDocument()
  })

  it('deve renderizar com prioridade Alta', () => {
    render(<PriorityTag prioridade="Alta" />)
    
    expect(screen.getByText('Alta')).toBeInTheDocument()
  })

  it('deve renderizar com prioridade Média', () => {
    render(<PriorityTag prioridade="Média" />)
    
    expect(screen.getByText('Média')).toBeInTheDocument()
  })

  it('deve renderizar com prioridade Baixa', () => {
    render(<PriorityTag prioridade="Baixa" />)
    
    expect(screen.getByText('Baixa')).toBeInTheDocument()
  })

  it('deve ter cor correspondente à prioridade', () => {
    const { container } = render(<PriorityTag prioridade="Crítica" />)
    
    const tag = container.querySelector('[class*="ant-tag"]')
    expect(tag).toBeInTheDocument()
  })
})
