const TYPE_SUBSTATUS = {
    waitingForTechnicalAnalysis: { value: 'waitingForTechnicalAnalysis', label: 'Esperando pela análise técnica' },
    inTechnicalAnalysis: { value: 'inTechnicalAnalysis', label: 'Em análise técnica' },
    technicalAnalysisCompleted: { value: 'technicalAnalysisCompleted', label: 'Análise técnica finalizada, aguardando início de reparo' },
    inRepair: { value: 'inRepair', label: 'Em reparo' },
    repairCompleted: { value: 'repairCompleted', label: 'Reparo finalizado, aguardando pagamento e retirada do aparelho' },
}

export type TypeOfSubstatus = keyof typeof TYPE_SUBSTATUS

export default TYPE_SUBSTATUS