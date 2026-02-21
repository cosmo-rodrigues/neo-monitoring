import { getAllChamados, addChamado } from "@/mocks/generate-chamados";
import type {
  Chamado,
  ChamadoStats,
  CreateChamadoInput,
  PaginatedParams,
  PaginatedResponse,
  Prioridade,
  Area,
  Status,
} from "@/types/chamado";
import { AREA_OPTIONS, STATUS_OPTIONS } from "@/types/chamado";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PRIORIDADE_WEIGHT: Record<Prioridade, number> = {
  "Crítica": 0,
  Alta: 1,
  "Média": 2,
  Baixa: 3,
};

function applyFilters(
  data: Chamado[],
  params: Omit<PaginatedParams, "page" | "pageSize">
): Chamado[] {
  let filtered = [...data];

  if (params.status) {
    filtered = filtered.filter((c) => c.status === params.status);
  }
  if (params.prioridade) {
    filtered = filtered.filter((c) => c.prioridade === params.prioridade);
  }
  if (params.area) {
    filtered = filtered.filter((c) => c.area === params.area);
  }
  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter((c) => c.titulo.toLowerCase().includes(term));
  }

  if (params.sortField === "abertura") {
    filtered.sort((a, b) => {
      const diff = new Date(a.abertura).getTime() - new Date(b.abertura).getTime();
      return params.sortOrder === "ascend" ? diff : -diff;
    });
  } else if (params.sortField === "prioridade") {
    filtered.sort((a, b) => {
      const diff = PRIORIDADE_WEIGHT[a.prioridade] - PRIORIDADE_WEIGHT[b.prioridade];
      return params.sortOrder === "ascend" ? diff : -diff;
    });
  } else {
    filtered.sort(
      (a, b) => new Date(b.abertura).getTime() - new Date(a.abertura).getTime()
    );
  }

  return filtered;
}

export async function fetchChamados(
  params: PaginatedParams
): Promise<PaginatedResponse<Chamado>> {
  await delay(400 + Math.random() * 400);

  const all = getAllChamados();
  const filtered = applyFilters(all, params);

  const start = (params.page - 1) * params.pageSize;
  const paged = filtered.slice(start, start + params.pageSize);

  return {
    data: paged,
    total: filtered.length,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export async function fetchChamadoById(
  id: number
): Promise<Chamado | null> {
  await delay(300 + Math.random() * 300);

  const all = getAllChamados();
  return all.find((c) => c.id === id) ?? null;
}

export async function createChamado(
  input: CreateChamadoInput
): Promise<Chamado> {
  await delay(500 + Math.random() * 500);

  const all = getAllChamados();
  const maxId = Math.max(...all.map((c) => c.id));
  const now = new Date().toISOString();

  const newChamado: Chamado = {
    id: maxId + 1,
    titulo: input.titulo,
    area: input.area,
    prioridade: input.prioridade,
    status: "Aberto",
    equipamento: input.equipamento,
    instalacao: "Loja Centro - SP",
    abertura: now,
    ultimaAtualizacao: now,
    descricao: input.descricao,
    responsavel: null,
    timeline: [
      {
        id: crypto.randomUUID(),
        data: now,
        tipo: "criacao",
        descricao: "Chamado criado manualmente pelo usuário.",
        autor: "Usuário",
      },
    ],
  };

  addChamado(newChamado);
  return newChamado;
}

export async function fetchStats(): Promise<ChamadoStats> {
  await delay(400 + Math.random() * 400);

  const all = getAllChamados();
  const now = new Date();

  const abertos = all.filter((c) => c.status === "Aberto");
  const emAndamento = all.filter((c) => c.status === "Em andamento");
  const resolvidos = all.filter((c) => c.status === "Resolvido");
  const cancelados = all.filter((c) => c.status === "Cancelado");

  const openTickets = all.filter((c) => c.status === "Aberto" || c.status === "Em andamento");
  const avgDays =
    openTickets.length > 0
      ? openTickets.reduce((sum, c) => {
        const diffMs = now.getTime() - new Date(c.abertura).getTime();
        return sum + diffMs / (1000 * 60 * 60 * 24);
      }, 0) / openTickets.length
      : 0;

  const porArea: ChamadoStats["porArea"] = AREA_OPTIONS.map((area: Area) => ({
    area,
    count: all.filter((c) => c.area === area).length,
  }));

  const porStatus: ChamadoStats["porStatus"] = STATUS_OPTIONS.map((status: Status) => ({
    status,
    count: all.filter((c) => c.status === status).length,
  }));

  const monthCounts = new Map<string, number>();
  for (const c of all) {
    const d = new Date(c.abertura);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }
  const porMes = Array.from(monthCounts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mes, count]) => ({ mes, count }));

  return {
    total: all.length,
    abertos: abertos.length,
    emAndamento: emAndamento.length,
    resolvidos: resolvidos.length,
    cancelados: cancelados.length,
    tempoMedioAbertoDias: Math.round(avgDays * 10) / 10,
    porArea,
    porStatus,
    porMes,
  };
}
