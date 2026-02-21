export const STATUS_OPTIONS = ["Aberto", "Em andamento", "Resolvido", "Cancelado"] as const;
export type Status = (typeof STATUS_OPTIONS)[number];

export const PRIORIDADE_OPTIONS = ["Crítica", "Alta", "Média", "Baixa"] as const;
export type Prioridade = (typeof PRIORIDADE_OPTIONS)[number];

export const AREA_OPTIONS = ["Refrigeração", "Energia", "Ar-condicionado", "Água"] as const;
export type Area = (typeof AREA_OPTIONS)[number];

export interface TimelineEvent {
  id: string;
  data: string;
  tipo: "criacao" | "atualizacao_status" | "comentario" | "atribuicao";
  descricao: string;
  autor: string | null;
}

export interface Chamado {
  id: number;
  titulo: string;
  area: Area;
  prioridade: Prioridade;
  status: Status;
  equipamento: string;
  instalacao: string;
  abertura: string;
  ultimaAtualizacao: string;
  descricao: string;
  responsavel: string | null;
  timeline?: TimelineEvent[];
}

export interface ChamadoFilters {
  status?: Status;
  prioridade?: Prioridade;
  area?: Area;
  search?: string;
  sortField?: "abertura" | "prioridade";
  sortOrder?: "ascend" | "descend";
}

export interface PaginatedParams extends ChamadoFilters {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ChamadoStats {
  total: number;
  abertos: number;
  emAndamento: number;
  resolvidos: number;
  cancelados: number;
  tempoMedioAbertoDias: number;
  porArea: { area: Area; count: number }[];
  porStatus: { status: Status; count: number }[];
  porMes: { mes: string; count: number }[];
}

export interface CreateChamadoInput {
  titulo: string;
  area: Area;
  prioridade: Prioridade;
  descricao: string;
  equipamento: string;
}
