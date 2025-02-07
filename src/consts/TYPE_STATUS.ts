const TYPE_STATUS = {
    inService: 'inService',
    canceled: 'canceled',
    finished: 'finished'
}

export type TypeOfStatus = keyof typeof TYPE_STATUS

export default TYPE_STATUS