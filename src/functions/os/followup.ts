import { TypeOs } from "../../types/Os";
import dateToServer from "../utils/dateToServer";

type Response = { title: string };

export const FOLLOWUP_ACTIONS = {
    OsCreated: "OsCreated",
    OsTechnicianAdded: "OsTechnicianAdded",
    OsTechnicianChanged: "OsTechnicianChanged",
    OsTechnicianAnalysisEnded: "OsTechnicianAnalysisEnded",
    OsRepairStarted: "OsRepairStarted",
    OsRepairEnded: "OsRepairEnded",
    OsReopened: "OsReopened",
    OsStatusUpdate: "OsStatusUpdate",
    OsEnded: "OsEnded",
    OsCancelled: "OsCancelled",
} as const;

type FollowUpAction = keyof typeof FOLLOWUP_ACTIONS;

const actionHandlers: Record<FollowUpAction, () => Response> = {
    OsCreated: () => ({ title: "OS criada" }),
    OsTechnicianAdded: () => ({ title: "Relato técnico adicionado" }),
    OsTechnicianChanged: () => ({ title: "Técnico responsável atualizado" }),
    OsTechnicianAnalysisEnded: () => ({ title: "Análise técnica finalizada" }),
    OsRepairStarted: () => ({ title: "Reparo de aparelho iniciado" }),
    OsRepairEnded: () => ({ title: "Reparo de aparelho finalizado" }),
    OsReopened: () => ({ title: "OS reaberta" }),
    OsStatusUpdate: () => ({ title: "Status da OS atualizado" }),
    OsEnded: () => ({ title: "OS finalizada" }),
    OsCancelled: () => ({ title: "OS cancelada" }),
};

interface CreateOsFollowupProps {
    type: FollowUpAction;
    description?: string;
    createdBy: { _id: string; name: string };
    followup: TypeOs['followup'];
}

export default function CreateOsFollowup({ type, description = "", createdBy, followup }: CreateOsFollowupProps): TypeOs["followup"] {
    const action = actionHandlers[type] ?? (() => ({ title: "Ação desconhecida" }));
    return [{
        ...action(),
        createdAt: dateToServer(new Date()),
        description,
        createdBy,
    }, ...followup]
}
