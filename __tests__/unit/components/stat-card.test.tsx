import React from 'react'
import { render, screen } from '@testing-library/react'
import { StatCard } from '@/components/stat-card'
import { AlertOutlined } from '@ant-design/icons'

describe('StatCard Component', () => {
  it('deve renderizar título e valor', () => {
    render(
      <StatCard
        title="Total de Chamados"
        value={42}
        prefix={<AlertOutlined />}
        loading={false}
      />
    )

    expect(screen.getByText('Total de Chamados')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('deve exibir suffix quando fornecido', () => {
    render(
      <StatCard
        title="Tempo Médio"
        value={5}
        suffix="dias"
        loading={false}
      />
    )

    expect(screen.getByText('dias')).toBeInTheDocument()
  })

  it('deve aceitar valueStyle customizado', () => {
    const { container } = render(
      <StatCard
        title="Test"
        value={10}
        loading={false}
        valueStyle={{ color: '#ff0000' }}
      />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('deve renderizar skeleton quando loading=true', () => {
    const { container } = render(
      <StatCard
        title="Test"
        value={10}
        loading={true}
      />
    )

    const skeleton = container.querySelector('[class*="ant-skeleton"]')
    expect(skeleton).toBeInTheDocument()
  })

  it('deve renderizar ícone prefix quando fornecido', () => {
    const { container } = render(
      <StatCard
        title="Test"
        value={10}
        prefix={<AlertOutlined data-testid="alert-icon" />}
        loading={false}
      />
    )

    expect(container.querySelector('[class*="anticon"]')).toBeInTheDocument()
  })
})
