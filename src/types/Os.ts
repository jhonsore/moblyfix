import { Timestamp } from "firebase/firestore"
import { TypeOfStatus } from "../consts/TYPE_STATUS"
import { TypeOfSubstatus } from "../consts/TYPE_SUBSTATUS"
import { TypePartsServicesProducts } from "./PartsServicesProducts"

export type TypeOs = {
    _id: string
    _headquarterId: string
    _storeId: string
    _saleId: string
    createdAt: Timestamp
    number: string
    customer: {
        name: string
        _id: string
        cpfCnpj: string
    }
    attachments: {
        file: string
    }
    followup: {
        createdAt: Timestamp
        createdBy: {
            name: string
        }
        description: string
    }[]
    partsAndServices: {
        createdAt: Timestamp
        createdBy: {
            name: string
        }
        data: TypePartsServicesProducts
    }[]
    technicalReports: {
        createdAt: Timestamp
        createdBy: {
            name: string
        }
        description: string
    }[]
    devices: {
        device: string
    }[]
    finishedAt: Timestamp
    status: TypeOfStatus
    substatus: TypeOfSubstatus
    positionInCabinaet: string
    serialNumber: string
    guarantee: boolean
    date: Timestamp
    accessories: string
    observation: string
    customerReport: string
    signFile: string
    devicePhotos: string[]
    responsibleTechnician: {
        name: string
        _id: string
    }
    completionReport: string// Relato de finalização de serviço
    reasonForReopening: string// Motivo de reabertura de serviço
}

export type TypeOsViewList =
    {
        _headquarterId: TypeOs['_headquarterId']
        _storeId: TypeOs['_storeId']
        _id: TypeOs['_id']
        number: TypeOs['number']
        createdAt: TypeOs['createdAt']
        devices: TypeOs['devices']
        finishedAt: TypeOs['finishedAt']
        status: TypeOs['status']
        substatus: TypeOs['substatus']
        customer: TypeOs['customer']
        query: { [id: string]: boolean }

    }