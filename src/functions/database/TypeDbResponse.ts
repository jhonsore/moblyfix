export type TypeDbResponse<TypeDoc> = {
    status: boolean
    doc?: TypeDoc
    docs?: { [key: string]: TypeDoc }
    id?: string
    error?: unknown
}