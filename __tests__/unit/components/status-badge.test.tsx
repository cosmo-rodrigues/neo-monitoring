import React from 'react'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/components/status-badge'

jest.mock('@/i18n/context', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.status.Aberto': 'Aberto',
        'common.status.Em andamento': 'Em andamento',
        'common.status.Resolvido': 'Resolvido',
        'common.status.Cancelado': 'Cancelado',
      }
      return translations[key] || key
    },
  }),
}))

describe('StatusBadge Component', () => {
  it('deve renderizar com status Aberto', () => {
    render(<StatusBadge status="Aberto" />)
    
    expect(screen.getByText('Aberto')).toBeInTheDocument()
  })

  it('deve renderizar com status Em andamento', () => {
    render(<StatusBadge status="Em andamento" />)
    
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
  })

  it('deve renderizar com status Resolvido', () => {
    render(<StatusBadge status="Resolvido" />)
    
    expect(screen.getByText('Resolvido')).toBeInTheDocument()
  })

  it('deve renderizar com status Cancelado', () => {
    render(<StatusBadge status="Cancelado" />)
    
    expect(screen.getByText('Cancelado')).toBeInTheDocument()
  })

  it('deve aceitar className customizado', () => {
    const { container } = render(
      <StatusBadge status="Aberto" className="custom-class" />
    )

    const tag = container.querySelector('.custom-class')
    expect(tag).toBeInTheDocument()
  })
})
