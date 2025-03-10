const TYPE_STATUS = {
    created: { value: 'created', label: 'OS criada' },
    inService: { value: 'inService', label: 'Em atendimento' },
    canceled: { value: 'canceled', label: 'Cancelado' },
    finished: { value: 'finished', label: 'Finalizado' }
}

export type TypeOfStatus = keyof typeof TYPE_STATUS

export default TYPE_STATUS