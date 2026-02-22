"use client";

import { Modal, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Form } from "antd";
import { useTranslation } from "@/i18n/context";
import { useCreateChamado } from "@/hooks/use-chamados";
import { AREA_OPTIONS, CreateChamadoInput, PRIORIDADE_OPTIONS } from "@/types/chamado";

function useChamadoSchema() {
  const { t } = useTranslation();

  return z.object({
    titulo: z
      .string()
      .min(5, t("form.validation.titleMin"))
      .max(200, t("form.validation.titleMax")),
    area: z.enum(["Refrigeração", "Energia", "Ar-condicionado", "Água"], {
      required_error: t("form.validation.areaRequired"),
    }),
    prioridade: z.enum(["Crítica", "Alta", "Média", "Baixa"], {
      required_error: t("form.validation.priorityRequired"),
    }),
    descricao: z
      .string()
      .min(10, t("form.validation.descriptionMin"))
      .max(1000, t("form.validation.descriptionMax")),
    equipamento: z
      .string()
      .min(3, t("form.validation.equipmentMin"))
      .max(100, t("form.validation.equipmentMax")),
  });
}

type ChamadoFormValues = z.infer<ReturnType<typeof useChamadoSchema>>;

interface ChamadoFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChamadoFormModal({ open, onClose }: ChamadoFormModalProps) {
  const { t } = useTranslation();
  const createMutation = useCreateChamado();
  const [messageApi, contextHolder] = message.useMessage();
  const schema = useChamadoSchema();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChamadoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      descricao: "",
      equipamento: "",
    },
  });

  const onSubmit = async (values: ChamadoFormValues) => {
    try {
      await createMutation.mutateAsync(values as CreateChamadoInput);
      messageApi.success(t("form.successMessage"));
      reset();
      onClose();
    } catch {
      messageApi.error(t("form.errorMessage"));
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={t("form.title")}
        open={open}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okText={t("form.submit")}
        cancelText={t("form.cancel")}
        confirmLoading={createMutation.isPending}
        width={600}
        destroyOnHidden
        data-testid="form-modal"
      >
        <form className="flex flex-col gap-4 pt-4">
          <Form.Item
            label={t("form.titleLabel")}
            validateStatus={errors.titulo ? "error" : ""}
            help={errors.titulo?.message}
            required
            layout="vertical"
          >
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t("form.titlePlaceholder")}
                  maxLength={200}
                  data-testid="input-titulo"
                />
              )}
            />
          </Form.Item>

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <Form.Item
              label={t("form.areaLabel")}
              validateStatus={errors.area ? "error" : ""}
              help={errors.area?.message}
              required
              layout="vertical"
              className="flex-1 w-full"
            >
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t("form.areaPlaceholder")}
                    options={AREA_OPTIONS.map((a) => ({
                      label: t(`common.area.${a}`),
                      value: a,
                    }))}
                    data-testid="select-area"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={t("form.priorityLabel")}
              validateStatus={errors.prioridade ? "error" : ""}
              help={errors.prioridade?.message}
              required
              layout="vertical"
              className="flex-1 w-full"
            >
              <Controller
                name="prioridade"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t("form.priorityPlaceholder")}
                    options={PRIORIDADE_OPTIONS.map((p) => ({
                      label: t(`common.priority.${p}`),
                      value: p,
                    }))}
                    data-testid="select-prioridade"
                  />
                )}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={t("form.equipmentLabel")}
            validateStatus={errors.equipamento ? "error" : ""}
            help={errors.equipamento?.message}
            required
            layout="vertical"
          >
            <Controller
              name="equipamento"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t("form.equipmentPlaceholder")}
                  maxLength={100}
                  data-testid="input-equipamento"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={t("form.descriptionLabel")}
            validateStatus={errors.descricao ? "error" : ""}
            help={errors.descricao?.message}
            required
            layout="vertical"
          >
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder={t("form.descriptionPlaceholder")}
                  rows={4}
                  maxLength={1000}
                  showCount
                  data-testid="input-descricao"
                />
              )}
            />
          </Form.Item>
        </form>
      </Modal>
    </>
  );
}
