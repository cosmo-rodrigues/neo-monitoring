import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Chamado, TimelineEvent, Status, Prioridade, Area } from "@/types/chamado";
import seedData from "./chamados.json";

const AREA_VALUES: Area[] = ["Refrigeração", "Energia", "Ar-condicionado", "Água"];

const INSTALACOES = [
  "Loja Centro - SP",
  "CD Logístico - RJ",
  "Escritório Sede - SP",
  "Loja Norte - AM",
  "Loja Sul - PR",
  "Loja Oeste - MG",
  "Loja Leste - BA",
  "CD Frigorificado - SC",
  "Filial Nordeste - CE",
  "Loja Zona Sul - RJ",
];

const EQUIPAMENTOS: Record<Area, string[]> = {
  "Refrigeração": [
    "Compressor Bitzer 4TCS-8.2",
    "Rack de Refrigeração #12",
    "Câmara Fria #01",
    "Câmara Fria #03",
    "Controlador Carel pCO5",
    "Sensor PT100",
    "Evaporador Industrial EV-200",
    "Condensador Remoto CR-500",
  ],
  Energia: [
    "Quadro Elétrico QD-01",
    "Nobreak APC 3kVA",
    "Painel LED FLV-02",
    "Medidor Geral Loja",
    "Transformador 150kVA",
    "Gerador Diesel 250kVA",
    "Banco de Capacitores BC-01",
  ],
  "Ar-condicionado": [
    "Split Inverter 60k BTU",
    "Condensadora VRF Daikin",
    "Fan Coil FC-300",
    "Chiller Carrier 200TR",
    "Torre de Resfriamento TR-01",
  ],
  "Água": [
    "Bomba Centrífuga BC-01",
    "Reservatório Superior 10m³",
    "Sistema de Tratamento ETA-01",
    "Hidrômetro Digital HD-03",
    "Válvula Solenoide VS-12",
  ],
};

const RESPONSAVEIS = [
  "Carlos Silva",
  "Ana Costa",
  "Roberto Lima",
  "Marcos Oliveira",
  "Juliana Santos",
  "Fernando Alves",
  "Patrícia Mendes",
  "Lucas Ferreira",
  null,
];

const TITULOS_POR_AREA: Record<Area, string[]> = {
  "Refrigeração": [
    "Temperatura acima do limite no compressor",
    "Falha no sensor de temperatura",
    "Vazamento de gás refrigerante",
    "Porta da câmara fria com vedação comprometida",
    "Compressor com ruído anormal",
    "Degelo não acionando automaticamente",
    "Pressão do sistema abaixo do normal",
    "Alarme de temperatura alta ativado",
  ],
  Energia: [
    "Queda de tensão na rede principal",
    "Nobreak com bateria fraca",
    "Consumo acima da média histórica",
    "Iluminação intermitente no setor",
    "Disjuntor desarmando repetidamente",
    "Fator de potência abaixo do mínimo",
    "Falha no gerador de emergência",
    "Pico de tensão registrado",
  ],
  "Ar-condicionado": [
    "AC desligou inesperadamente",
    "Condensador com acúmulo de sujeira",
    "Fan coil com vazamento de água",
    "Temperatura da sala fora do setpoint",
    "Compressor do AC com vibração",
    "Filtro de ar obstruído",
    "Falha na comunicação do VRF",
    "Ruído excessivo na condensadora",
  ],
  "Água": [
    "Bomba de recalque não liga",
    "Nível do reservatório baixo",
    "Vazamento detectado na tubulação",
    "Pressão da água insuficiente",
    "Hidrômetro com leitura inconsistente",
    "Sistema de tratamento com alarme",
    "Válvula solenoide não fechando",
    "Qualidade da água fora do padrão",
  ],
};

function generateTimeline(chamado: Pick<Chamado, "abertura" | "status" | "responsavel">): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const abertura = new Date(chamado.abertura);

  events.push({
    id: faker.string.uuid(),
    data: chamado.abertura,
    tipo: "criacao",
    descricao: "Chamado criado automaticamente pelo sistema de monitoramento.",
    autor: "Sistema NEO",
  });

  if (chamado.responsavel) {
    const assignDate = new Date(abertura.getTime() + faker.number.int({ min: 600000, max: 7200000 }));
    events.push({
      id: faker.string.uuid(),
      data: assignDate.toISOString(),
      tipo: "atribuicao",
      descricao: `Chamado atribuído para ${chamado.responsavel}.`,
      autor: "Sistema NEO",
    });
  }

  if (chamado.status === "Em andamento" || chamado.status === "Resolvido") {
    const updateDate = new Date(abertura.getTime() + faker.number.int({ min: 3600000, max: 86400000 }));
    events.push({
      id: faker.string.uuid(),
      data: updateDate.toISOString(),
      tipo: "atualizacao_status",
      descricao: "Status alterado para Em andamento.",
      autor: chamado.responsavel ?? "Sistema NEO",
    });

    events.push({
      id: faker.string.uuid(),
      data: new Date(updateDate.getTime() + faker.number.int({ min: 1800000, max: 14400000 })).toISOString(),
      tipo: "comentario",
      descricao: faker.helpers.arrayElement([
        "Técnico no local realizando diagnóstico.",
        "Peça de reposição solicitada ao fornecedor.",
        "Inspeção visual concluída, aguardando autorização.",
        "Teste realizado com sucesso parcial.",
        "Equipe de manutenção acionada.",
      ]),
      autor: chamado.responsavel,
    });
  }

  if (chamado.status === "Resolvido") {
    const resolveDate = new Date(abertura.getTime() + faker.number.int({ min: 86400000, max: 259200000 }));
    events.push({
      id: faker.string.uuid(),
      data: resolveDate.toISOString(),
      tipo: "atualizacao_status",
      descricao: "Chamado resolvido.",
      autor: chamado.responsavel ?? "Sistema NEO",
    });
  }

  if (chamado.status === "Cancelado") {
    const cancelDate = new Date(abertura.getTime() + faker.number.int({ min: 3600000, max: 172800000 }));
    events.push({
      id: faker.string.uuid(),
      data: cancelDate.toISOString(),
      tipo: "atualizacao_status",
      descricao: faker.helpers.arrayElement([
        "Chamado cancelado — duplicidade identificada.",
        "Chamado cancelado — problema corrigido automaticamente.",
        "Chamado cancelado pelo gestor.",
      ]),
      autor: faker.helpers.arrayElement(RESPONSAVEIS.filter(Boolean)),
    });
  }

  return events.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
}

function generateSingleChamado(id: number): Chamado {
  const area = faker.helpers.arrayElement(AREA_VALUES);
  const status = faker.helpers.weightedArrayElement([
    { value: "Aberto" as Status, weight: 35 },
    { value: "Em andamento" as Status, weight: 25 },
    { value: "Resolvido" as Status, weight: 30 },
    { value: "Cancelado" as Status, weight: 10 },
  ]);
  const prioridade = faker.helpers.weightedArrayElement([
    { value: "Crítica" as Prioridade, weight: 10 },
    { value: "Alta" as Prioridade, weight: 25 },
    { value: "Média" as Prioridade, weight: 40 },
    { value: "Baixa" as Prioridade, weight: 25 },
  ]);
  const abertura = faker.date.between({ from: "2025-11-01", to: "2026-02-10" }).toISOString();
  const responsavel = status === "Aberto" && faker.datatype.boolean(0.4)
    ? null
    : faker.helpers.arrayElement(RESPONSAVEIS.filter(Boolean));

  const chamadoBase = {
    abertura,
    status,
    responsavel,
  };

  const timeline = generateTimeline(chamadoBase);
  const ultimaAtualizacao =
    timeline.length > 0
      ? timeline[timeline.length - 1].data
      : abertura;

  return {
    id,
    titulo: faker.helpers.arrayElement(TITULOS_POR_AREA[area]),
    area,
    prioridade,
    status,
    equipamento: faker.helpers.arrayElement(EQUIPAMENTOS[area]),
    instalacao: faker.helpers.arrayElement(INSTALACOES),
    abertura,
    ultimaAtualizacao,
    descricao: faker.lorem.sentences({ min: 1, max: 3 }),
    responsavel,
    timeline,
  };
}

let cachedData: Chamado[] | null = null;

export function getAllChamados(): Chamado[] {
  if (cachedData) return cachedData;

  faker.seed(42);

  const seeds: Chamado[] = (seedData as Chamado[]).map((c) => ({
    ...c,
    timeline: generateTimeline(c),
  }));

  const generated: Chamado[] = [];
  for (let i = 0; i < 1000; i++) {
    generated.push(generateSingleChamado(2001 + i));
  }

  cachedData = [...seeds, ...generated];
  return cachedData;
}

export function addChamado(chamado: Chamado): void {
  if (!cachedData) getAllChamados();
  cachedData!.unshift(chamado);
}
