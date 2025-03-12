import { Timestamp } from "firebase/firestore"
import { TypeOfStatus } from "../consts/TYPE_STATUS"
import { TypeOfSubstatus } from "../consts/TYPE_SUBSTATUS"
import { TypeSales } from "./Sales"

export type TypeOs = {
    _id: string
    _headquarterId: string
    _storeId: string
    _saleId: string
    createdAt: Timestamp
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
            _id: string
        }
        description: string
        title: string
    }[]
    partsServicesProducts: TypeSales['items']
    technicalReports: {
        createdAt: Timestamp
        createdBy: {
            name: string
            _id: string
        }
        description: string
    }[]
    finishedAt: Timestamp
    status: TypeOfStatus
    substatus: TypeOfSubstatus | null
    positionInCabinet: string
    serialNumber: string
    numberOs: number

    product: string
    guarantee: boolean
    date: Timestamp
    accessories: string
    observation: string
    report: string
    signFile: { url: string, path: string } | null

    photos: { url: string, path: string }[]
    responsibleTechnician: {
        name: string
        _id: string
    }
}

export type TypeOsViewList =
    {
        _headquarterId: TypeOs['_headquarterId']
        _storeId: TypeOs['_storeId']
        _id: TypeOs['_id']
        createdAt: TypeOs['createdAt']
        product: TypeOs['product']
        finishedAt: TypeOs['finishedAt']
        status: TypeOs['status']
        substatus: TypeOs['substatus']
        customer: TypeOs['customer']
        numberOs: TypeOs['numberOs']
        query: { [id: string]: boolean }
    }