import { getNestedValue, interpolate } from '@/helpers/get-nested-value'

describe('getNestedValue', () => {
  const mockData = {
    user: {
      name: 'João da Silva',
      profile: {
        email: 'joao@example.com',
        role: 'admin',
      },
    },
    status: 'active',
  }

  it('deve retornar valor em raiz', () => {
    const result = getNestedValue(mockData, 'status')
    expect(result).toBe('active')
  })

  it('deve retornar valor aninhado com um nível', () => {
    const result = getNestedValue(mockData, 'user.name')
    expect(result).toBe('João da Silva')
  })

  it('deve retornar valor aninhado com dois níveis', () => {
    const result = getNestedValue(mockData, 'user.profile.email')
    expect(result).toBe('joao@example.com')
  })

  it('deve retornar undefined para caminho inexistente', () => {
    const result = getNestedValue(mockData, 'user.profile.phone')
    expect(result).toBeUndefined()
  })

  it('deve retornar undefined para raiz inexistente', () => {
    const result = getNestedValue(mockData, 'nonexistent')
    expect(result).toBeUndefined()
  })

  it('deve retornar undefined para caminho parcialmente inexistente', () => {
    const result = getNestedValue(mockData, 'user.invalid.email')
    expect(result).toBeUndefined()
  })

  it('deve lidar com caminhos vazios', () => {
    const result = getNestedValue(mockData, '')
    expect(result).toBeUndefined()
  })

  it('deve retornar objeto inteiro quando chamado com raiz', () => {
    const result = getNestedValue(mockData, 'user')
    expect(result).toEqual({
      name: 'João da Silva',
      profile: {
        email: 'joao@example.com',
        role: 'admin',
      },
    })
  })
})

describe('interpolate', () => {
  it('deve substituir placeholder simples', () => {
    const result = interpolate('{name} é um desenvolvedor', { name: 'João' })
    expect(result).toBe('João é um desenvolvedor')
  })

  it('deve substituir múltiplos placeholders', () => {
    const result = interpolate('{start}-{end} de {total}', {
      start: '1',
      end: '10',
      total: '100',
    })
    expect(result).toBe('1-10 de 100')
  })

  it('deve substituir placeholders com números', () => {
    const result = interpolate('Total: {count}', { count: 42 })
    expect(result).toBe('Total: 42')
  })

  it('deve manter placeholders não encontrados', () => {
    const result = interpolate('{name} tem {age} anos', { name: 'João' })
    expect(result).toBe('João tem {age} anos')
  })

  it('deve lidar com string vazia', () => {
    const result = interpolate('', {})
    expect(result).toBe('')
  })

  it('deve lidar com params vazios', () => {
    const result = interpolate('Olá {name}', {})
    expect(result).toBe('Olá {name}')
  })

  it('deve substituir placeholder múltiplas vezes', () => {
    const result = interpolate('{x} + {x} = 2', { x: '1' })
    expect(result).toBe('1 + 1 = 2')
  })
})
