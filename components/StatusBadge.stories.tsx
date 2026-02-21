import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge";
import { StatusBadgeWithTooltip } from "./status-badge-with-tooltip";
import { StatusBadgeWithDropdown } from "./status-badge-with-dropdown";
import type { MenuProps } from "antd";

/**
 * # StatusBadge - Padrão de Arquitetura de Componentes
 *
 * Este story demonstra como projetar componentes reutilizáveis sem criar
 * "mega-componentes" cheios de props condicionais.
 *
 * ## Problema
 * StatusBadge é usado em 4 telas diferentes:
 * 1. Exibir com tooltip (contexto adicional)
 * 2. Abrir menu dropdown ao clicar (ações interativas)
 * 3. Apenas visual (exibição simples)
 *
 * ## Solução: Padrão de Composição
 * Em vez de adicionar props `showTooltip`, `onDropdownClick`, `tooltipContent` ao StatusBadge,
 * criamos componentes wrapper especializados que compõem o StatusBadge base.
 *
 * Esta abordagem mantém o componente base simples (Single Responsibility Principle)
 * enquanto fornece máxima flexibilidade através de composição (Composite Pattern).
 *
 * ## Benefícios
 * - ✅ Componente base permanece simples e focado (apenas 1 responsabilidade)
 * - ✅ Cada wrapper tem uma responsabilidade clara e única
 * - ✅ Fácil combinar wrappers (ex: Tooltip + Dropdown)
 * - ✅ Sem prop drilling ou condicionais aninhadas
 * - ✅ Mais fácil testar cada comportamento independentemente
 * - ✅ Melhor tree-shaking (use apenas o que precisa)
 * - ✅ API descobridora (nomes mostram intenção)
 */
const meta: Meta<typeof StatusBadge> = {
    title: "Componentes/StatusBadge - Padrão de Arquitetura",
    component: StatusBadge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Componente StatusBadge flexível demonstrando reutilização através de composição.",
            },
        },
    },
};

export default meta;

// ============================================================================
// SCENARIO 1: Simple Visual Display (Base Component)
// ============================================================================

export const VisualOnly: StoryObj<typeof StatusBadge> = {
    name: "1️⃣ Apenas Visual (Componente Base)",
    render: () => (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
                Caso de Uso: Tabela de Dashboard, Visualizações em Lista
            </h3>
            <div className="space-y-2">
                <p className="text-xs text-gray-600">
                    Exibição simples e leve. Nenhum recurso extra necessário.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <StatusBadge status="Aberto" />
                    <StatusBadge status="Em andamento" />
                    <StatusBadge status="Resolvido" />
                    <StatusBadge status="Cancelado" />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "O componente StatusBadge base é simples e focado. Apenas exibe o status com estilo apropriado. Perfeito para visualizações somente leitura onde nenhum contexto adicional é necessário.",
            },
        },
    },
};

// ============================================================================
// SCENARIO 2: With Tooltip (Composition via Wrapper)
// ============================================================================

export const WithTooltip: StoryObj<typeof StatusBadgeWithTooltip> = {
    name: "2️⃣ Com Tooltip (Componente Envolvido)",
    render: () => (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
                Caso de Uso: Visualização do Técnico, Dashboard do Gerente
            </h3>
            <div className="space-y-2">
                <p className="text-xs text-gray-600">
                    Passe o mouse sobre os badges para ver contexto adicional. Sem necessidade de abrir detalhes.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <StatusBadgeWithTooltip
                        status="Aberto"
                        tooltipTitle="Status"
                        tooltipContent="Aguardando atribuição"
                    />
                    <StatusBadgeWithTooltip
                        status="Em andamento"
                        tooltipTitle="Status"
                        tooltipContent="Atribuído para João Silva"
                    />
                    <StatusBadgeWithTooltip
                        status="Resolvido"
                        tooltipTitle="Status"
                        tooltipContent="Concluído em 15/02/2026"
                    />
                    <StatusBadgeWithTooltip
                        status="Cancelado"
                        tooltipTitle="Status"
                        tooltipContent="Cancelado por: maria@company.com"
                    />
                </div>
            </div>

            {/* Architecture details */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
                <p className="font-semibold text-blue-900 mb-2">Como Funciona:</p>
                <p className="text-blue-800">
                    StatusBadgeWithTooltip envolve StatusBadge + Tooltip do Antd. O componente base
                    não sabe nada sobre a lógica do tooltip. Separação de responsabilidades → fácil de testar, manter
                    e estender.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "StatusBadgeWithTooltip envolve o StatusBadge base com funcionalidade de Tooltip. Esta composição mantém o componente base simples enquanto adiciona informação contextual no hover.",
            },
        },
    },
};

// ============================================================================
// SCENARIO 3: With Dropdown Menu (Composition via Wrapper)
// ============================================================================

const dropdownActions: MenuProps["items"] = [
    {
        key: "update_status",
        label: "Alterar Status",
    },
    {
        key: "reassign",
        label: "Reatribuir",
    },
    {
        type: "divider",
    },
    {
        key: "view_details",
        label: "Ver Detalhes",
    },
    {
        key: "close",
        label: "Fechar Chamado",
        danger: true,
    },
];

export const WithDropdown: StoryObj<typeof StatusBadgeWithDropdown> = {
    name: "3️⃣ Com Menu Dropdown (Componente Envolvido)",
    render: () => (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
                Caso de Uso: Painel Admin, Ações do Gerente
            </h3>
            <div className="space-y-2">
                <p className="text-xs text-gray-600">
                    Clique no badge para abrir menu de ações. Permite gerenciamento em massa de status.
                </p>
                <div className="flex gap-2 flex-wrap">
                    <StatusBadgeWithDropdown
                        status="Aberto"
                        actions={dropdownActions}
                        placement="bottomLeft"
                    />
                    <StatusBadgeWithDropdown
                        status="Em andamento"
                        actions={dropdownActions}
                        placement="bottomLeft"
                    />
                    <StatusBadgeWithDropdown
                        status="Resolvido"
                        actions={dropdownActions}
                        placement="bottomLeft"
                    />
                    <StatusBadgeWithDropdown
                        status="Cancelado"
                        actions={dropdownActions}
                        placement="bottomLeft"
                    />
                </div>
            </div>

            {/* Architecture details */}
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded text-xs">
                <p className="font-semibold text-green-900 mb-2">Padrão de Composição:</p>
                <p className="text-green-800">
                    StatusBadgeWithDropdown envolve StatusBadge + Dropdown do Antd. Cada wrapper é
                    responsável por UM comportamento adicional. O ícone é adicionado no nível do wrapper, não
                    no componente base. Isto é extensível: você pode criar
                    StatusBadgeWithTooltipAndDropdown envolvendo os dois!
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "StatusBadgeWithDropdown envolve o StatusBadge base com funcionalidade de menu Dropdown. Clique no badge para revelar ações. Isto demonstra como composição permite interações de clique sem inchar o componente base.",
            },
        },
    },
};

// ============================================================================
// BONUS: Advanced Composition (Combining Multiple Wrappers)
// ============================================================================

export const AdvancedComposition: StoryObj = {
    name: "🚀 Composição Avançada (Múltiplos Wrappers)",
    render: () => (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
                Caso de Uso Avançado: Componentes Interativos Ricos
            </h3>
            <div className="space-y-2">
                <p className="text-xs text-gray-600">
                    Você pode combinar wrappers para ter tooltip e dropdown. Crie novos componentes wrapper conforme necessário!
                </p>

                <div className="mt-4 space-y-3">
                    {/* Example 1: Custom wrapper combining tooltip + dropdown */}
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                        <p className="text-xs font-semibold text-purple-900 mb-2">
                            Exemplo: StatusBadgeWithTooltipAndDropdown
                        </p>
                        <pre className="text-xs bg-white p-2 rounded border border-purple-200 overflow-auto">
                            {`/* Em vez de mega-props no componente base: */
// ❌ StatusBadge showTooltip dropdownMenu onClick ...

/* Crie componentes wrapper focados: */
// ✅ StatusBadgeWithTooltip
// ✅ StatusBadgeWithDropdown

/* Combine-os facilmente: */
export function StatusBadgeWithTooltipAndDropdown({
  status,
  tooltipContent,
  dropdownActions
}) {
  return (
    <StatusBadgeWithTooltip
      status={status}
      tooltipContent={tooltipContent}
    >
      <StatusBadgeWithDropdown
        status={status}
        actions={dropdownActions}
      />
    </StatusBadgeWithTooltip>
  );
}`}
                        </pre>
                    </div>

                    {/* Architecture comparison */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                            <p className="text-xs font-semibold text-red-900">❌ Abordagem Mega-Componente</p>
                            <pre className="text-xs bg-white p-2 mt-2 rounded border border-red-200 overflow-auto">
                                {`interface StatusBadgeProps {
  status: Status;
  showTooltip?: boolean;
  tooltipContent?: string;
  showDropdown?: boolean;
  dropdownItems?: MenuItem[];
  onDropdownSelect?: ()=>void;
  variant?: 'simple' | 'rich' | 'admin';
  // ... mais props
}`}
                            </pre>
                        </div>

                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                            <p className="text-xs font-semibold text-green-900">✅ Abordagem Composição</p>
                            <pre className="text-xs bg-white p-2 mt-2 rounded border border-green-200 overflow-auto">
                                {`// Base: Simples & Focado
interface StatusBadgeProps {
  status: Status;
  className?: string;
}

// Wrapper 1: Adiciona tooltip
interface StatusBadgeWithTooltipProps 
extends StatusBadgeProps {
  tooltipTitle: string;
  tooltipContent?: string;
}

// Wrapper 2: Adiciona dropdown
interface StatusBadgeWithDropdownProps 
extends StatusBadgeProps {
  actions: MenuProps["items"];
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key principles */}
            <div className="mt-6 space-y-2 p-4 bg-gray-50 rounded border border-gray-200">
                <h4 className="font-semibold text-gray-900 text-xs">Princípios de Design Principais</h4>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                    <li>
                        <strong>Responsabilidade Única:</strong> Cada componente faz UMA coisa bem
                    </li>
                    <li>
                        <strong>Composição sobre Props:</strong> Envolva em vez de adicionar lógica condicional
                    </li>
                    <li>
                        <strong>Princípio Open/Closed:</strong> Fácil de estender sem modificar a base
                    </li>
                    <li>
                        <strong>Tree-shaking:</strong> Importe apenas componentes que precisa
                    </li>
                    <li>
                        <strong>Testes:</strong> Teste cada comportamento independentemente
                    </li>
                </ul>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Este exemplo mostra como composição escala. Em vez de adicionar mais props, crie novos componentes wrapper. Isto mantém a arquitetura limpa, mantível e extensível.",
            },
        },
    },
};

// ============================================================================
// REFERENCE: Component Code Comparison
// ============================================================================

export const CodeComparison: StoryObj = {
    name: "💻 Comparação de Código & Arquitetura",
    render: () => (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
                Como Estes Componentes São Estruturados
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Component 1 */}
                <div className="border rounded bg-white">
                    <div className="bg-gray-100 p-2 border-b">
                        <p className="text-xs font-semibold">StatusBadge (Base)</p>
                    </div>
                    <pre className="text-xs p-3 overflow-auto">
                        {`interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({
  status,
  className
}: StatusBadgeProps) {
  const { t } = useTranslation();
  return (
    <Tag color={color}>
      {t(\`status.\${status}\`)}
    </Tag>
  );
}`}
                    </pre>
                    <div className="p-2 bg-blue-50 border-t text-xs">
                        <p className="font-semibold text-blue-900">✨ Valor:</p>
                        <p className="text-blue-800">Simples, focado, fácil de testar</p>
                    </div>
                </div>

                {/* Component 2 */}
                <div className="border rounded bg-white">
                    <div className="bg-gray-100 p-2 border-b">
                        <p className="text-xs font-semibold">StatusBadgeWithTooltip</p>
                    </div>
                    <pre className="text-xs p-3 overflow-auto">
                        {`interface StatusBadgeWithTooltipProps {
  status: Status;
  tooltipTitle: string;
  tooltipContent?: string;
  className?: string;
}

export function StatusBadgeWithTooltip({
  status,
  tooltipTitle,
  tooltipContent,
  className
}: Props) {
  return (
    <Tooltip title={...}>
      <div>
        <StatusBadge
          status={status}
          className={className}
        />
      </div>
    </Tooltip>
  );
}`}
                    </pre>
                    <div className="p-2 bg-green-50 border-t text-xs">
                        <p className="font-semibold text-green-900">✨ Valor:</p>
                        <p className="text-green-800">Adiciona tooltip, reusa base</p>
                    </div>
                </div>

                {/* Component 3 */}
                <div className="border rounded bg-white">
                    <div className="bg-gray-100 p-2 border-b">
                        <p className="text-xs font-semibold">StatusBadgeWithDropdown</p>
                    </div>
                    <pre className="text-xs p-3 overflow-auto">
                        {`interface StatusBadgeWithDropdownProps {
  status: Status;
  actions: MenuProps["items"];
  className?: string;
  placement?: string;
}

export function StatusBadgeWithDropdown({
  status,
  actions,
  className,
  placement
}: Props) {
  return (
    <Dropdown 
      menu={{ items: actions }}
      trigger={["click"]}
    >
      <Space size={2}>
        <StatusBadge 
          status={status}
          className={className}
        />
        <ChevronDown size={14} />
      </Space>
    </Dropdown>
  );
}`}
                    </pre>
                    <div className="p-2 bg-purple-50 border-t text-xs">
                        <p className="font-semibold text-purple-900">✨ Valor:</p>
                        <p className="text-purple-800">Adiciona dropdown, reusa base</p>
                    </div>
                </div>
            </div>

            {/* Dependency diagram */}
            <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs font-semibold text-gray-900 mb-3">Gráfico de Dependências</p>
                <div className="text-xs text-gray-700 font-mono space-y-2">
                    <div>StatusBadge (base)</div>
                    <div className="pl-4 text-gray-600">
                        ├── StatusBadgeWithTooltip
                    </div>
                    <div className="pl-4 text-gray-600">
                        ├── StatusBadgeWithDropdown
                    </div>
                    <div className="pl-4 text-gray-600">
                        └── StatusBadgeWithTooltipAndDropdown (futuro)
                    </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                    Cada camada adiciona UMA responsabilidade sem modificar a camada abaixo.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Comparação lado a lado mostrando como composição mantém cada componente focado e maintível.",
            },
        },
    },
};
