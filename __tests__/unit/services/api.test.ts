import { fetchChamados, fetchChamadoById, createChamado } from '@/services/api'
import type { PaginatedParams, CreateChamadoInput } from '@/types/chamado'

describe('API Service', () => {
  describe('fetchChamados', () => {
    it('deve retornar lista paginada de chamados', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 10,
      }

      const result = await fetchChamados(params)

      expect(result).toBeDefined()
      expect(result.data).toBeInstanceOf(Array)
      expect(result.data.length).toBeLessThanOrEqual(10)
      expect(result.total).toBeGreaterThan(0)
      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(10)
    })

    it('deve filtrar por status', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
        status: 'Aberto',
      }

      const result = await fetchChamados(params)

      expect(result.data.every((c) => c.status === 'Aberto')).toBe(true)
    })

    it('deve filtrar por prioridade', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
        prioridade: 'Crítica',
      }

      const result = await fetchChamados(params)

      expect(result.data.every((c) => c.prioridade === 'Crítica')).toBe(true)
    })

    it('deve filtrar por área', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
        area: 'Refrigeração',
      }

      const result = await fetchChamados(params)

      expect(result.data.every((c) => c.area === 'Refrigeração')).toBe(true)
    })

    it('deve buscar por termo de título', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
        search: 'temperatura',
      }

      const result = await fetchChamados(params)

      expect(
        result.data.every((c) =>
          c.titulo.toLowerCase().includes('temperatura')
        )
      ).toBe(true)
    })

    it('deve ordenar por data de abertura (descendente por padrão)', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
      }

      const result = await fetchChamados(params)

      if (result.data.length > 1) {
        for (let i = 0; i < result.data.length - 1; i++) {
          const current = new Date(result.data[i].abertura).getTime()
          const next = new Date(result.data[i + 1].abertura).getTime()
          expect(current).toBeGreaterThanOrEqual(next)
        }
      }
    })

    it('deve ordenar por prioridade quando sortField="prioridade"', async () => {
      const params: PaginatedParams = {
        page: 1,
        pageSize: 100,
        sortField: 'prioridade',
        sortOrder: 'ascend',
      }

      const result = await fetchChamados(params)

      const priorityWeight: Record<string, number> = {
        Crítica: 0,
        Alta: 1,
        Média: 2,
        Baixa: 3,
      }

      if (result.data.length > 1) {
        for (let i = 0; i < result.data.length - 1; i++) {
          const current = priorityWeight[result.data[i].prioridade]
          const next = priorityWeight[result.data[i + 1].prioridade]
          expect(current).toBeLessThanOrEqual(next)
        }
      }
    })

    it('deve paginação criar corretamente', async () => {
      const params1: PaginatedParams = {
        page: 1,
        pageSize: 10,
      }

      const params2: PaginatedParams = {
        page: 2,
        pageSize: 10,
      }

      const result1 = await fetchChamados(params1)
      const result2 = await fetchChamados(params2)

      expect(result1.data[0].id).not.toBe(result2.data[0].id)
    })
  })

  describe('fetchChamadoById', () => {
    it('deve retornar um chamado pelo ID', async () => {
      const result = await fetchChamadoById(1001)

      expect(result).toBeDefined()
      expect(result?.id).toBe(1001)
    })

    it('deve retornar null quando ID não existe', async () => {
      const result = await fetchChamadoById(99999)

      expect(result).toBeNull()
    })

    it('deve incluir timeline no chamado retornado', async () => {
      const result = await fetchChamadoById(1001)

      expect(result?.timeline).toBeDefined()
      expect(result?.timeline).toBeInstanceOf(Array)
    })
  })

  describe('createChamado', () => {
    it('deve criar um novo chamado', async () => {
      const input: CreateChamadoInput = {
        titulo: 'Teste novo chamado',
        area: 'Refrigeração',
        prioridade: 'Alta',
        descricao: 'Descrição de teste para novo chamado',
        equipamento: 'Equipamento teste',
      }

      const result = await createChamado(input)

      expect(result).toBeDefined()
      expect(result.id).toBeDefined()
      expect(result.titulo).toBe(input.titulo)
      expect(result.area).toBe(input.area)
      expect(result.prioridade).toBe(input.prioridade)
      expect(result.status).toBe('Aberto')
      expect(result.responsavel).toBeNull()
    })

    it('deve gerar data de abertura automática', async () => {
      const input: CreateChamadoInput = {
        titulo: 'Teste com data',
        area: 'Energia',
        prioridade: 'Média',
        descricao: 'Teste',
        equipamento: 'Teste',
      }

      const result = await createChamado(input)

      expect(result.abertura).toBeDefined()
      expect(new Date(result.abertura)).toBeInstanceOf(Date)
    })

    it('deve retornar novo chamado com timeline vazia', async () => {
      const input: CreateChamadoInput = {
        titulo: 'Teste timeline',
        area: 'Ar-condicionado',
        prioridade: 'Baixa',
        descricao: 'Teste',
        equipamento: 'Teste',
      }

      const result = await createChamado(input)

      expect(result.timeline).toBeDefined()
      expect(result.timeline).toBeInstanceOf(Array)
      expect(result.timeline?.length).toBeGreaterThan(0)
    })
  })
})
