const TYPE_SUBSTATUS = {
    waitingForTechnicalAnalysis: 'waitingForTechnicalAnalysis',// Esperando pela análise técnica
    inTechnicalAnalysis: 'inTechnicalAnalysis',// em análise técnica
    technicalAnalysisCompleted: 'technicalAnalysisCompleted',// análise técnica finalizada, aguardando início de reparo
    inRepair: 'inRepair',// em reparo
    repairCompleted: 'repairCompleted',// reparo finalizado, aguardando pagamento e retirada do aparelho
}

export type TypeOfSubstatus = keyof typeof TYPE_SUBSTATUS

export default TYPE_SUBSTATUS