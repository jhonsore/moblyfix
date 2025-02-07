import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import ServiceConditions from "../../functions/serviceConditions"
import PartsServicesProducts from "../../functions/partsServicesProducts"
import { Users } from "../../functions/users"
import Customers from "../../functions/customers"
import { getQuery } from "../../functions/utils/getQuery"
import Stores from "../../functions/stores"
import OS from "../../functions/os"
import Sales from "../../functions/sales"

const Dashboard = () => {
    const { db } = useFirebaseContext()
    const { claims, idToken } = useAuthContext()

    const submit = async () => {
        if (!idToken) return
        // const result = await ServiceConditions.create({ db, data: { title: 'este é o título 4', text: 'Este é um texto', _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })
        // const result = await ServiceConditions.update({ db, data: { title: 'este é o título ', text: 'Este é um texto ' }, id: 'GHgCBUWtwlnDHaNAmF3N' })
        // const result = await ServiceConditions.read({ db, id: 'GHgCBUWtwlnDHaNAmF3N' })
        // const result = await ServiceConditions.delete({ db, id: 'GHgCBUWtwlnDHaNAmF3N' })
        // const result = await ServiceConditions.list({ db, pageSize: 2, })


        // const result = await PartsServicesProducts.create({ db, data: { name: 'Product 1', cashPrice: 100, installmentPrice: 110, costPrice: 50, _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })
        // const result = await PartsServicesProducts.update({ db, data: { name: 'Product updated' }, id: 'dBH1O7qTFN8JotvTORuM' })
        // const result = await PartsServicesProducts.read({ db, id: 'YyJYLLxTC4ezLFQsp7K3' })
        // const result = await PartsServicesProducts.delete({ db, id: 'YyJYLLxTC4ezLFQsp7K3' })

        // const result = await Users.create({
        //     token: idToken,
        //     data: {
        //         name: 'Product 1',
        //         email: 'usuario12@moblyfix.com.br',
        //         password: '123456ascd',
        //         type: 'attendant',
        //         whatsapp: '2799999999',
        //         telefone: '2799999999',
        //         state: 'ES',
        //         city: 'Cariacica',
        //         neighborhood: 'Santa Cecília',
        //         address: 'Rua nossa senhora das graças',
        //         zipcode: '29147500',
        //         number: '10',
        //         complement: 'oficina do camrão'
        //         , _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK'
        //     }
        // })
        // const result = await Users.update({ db, data: { name: 'brunela suassuna' }, id: '4xZWxdVM6fT1sulhzMNGZKuJJ4p1' })
        // const result = await Users.read({ db, id: '4xZWxdVM6fT1sulhzMNGZKuJJ4p1' })
        // const result = await Users.delete({ token: idToken, uid: '4xZWxdVM6fT1sulhzMNGZKuJJ4p1' })


        // const result = await Customers.create({
        //     db,
        //     data: {
        //         name: 'Product 1',
        //         email: 'usuario@moblyfix.com.br',
        //         whatsapp: '2799999999',
        //         telefone: '2799999999',
        //         state: 'ES',
        //         city: 'Cariacica',
        //         neighborhood: 'Santa Cecília',
        //         address: 'Rua nossa senhora das graças',
        //         zipcode: '29147500',
        //         number: '10',
        //         cpfCnpj: '12343548756',
        //         complement: 'oficina do camrão'
        //         , _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK'
        //     }
        // })
        // const result = await Customers.update({ db, data: { name: 'brunela suassuna' }, id: 'IatpZfNgCfbjtGNiR4IP' })
        // const result = await Customers.read({ db, id: 'IatpZfNgCfbjtGNiR4IP' })
        // const result = await Customers.delete({ db, id: 'IatpZfNgCfbjtGNiR4IP' })

        // const result = await Stores.create({
        //     db,
        //     data: {
        //         name: 'Product 1',
        //         email: 'usuario@moblyfix.com.br',
        //         whatsapp: '2799999999',
        //         telefone: '2799999999',
        //         state: 'ES',
        //         city: 'Cariacica',
        //         neighborhood: 'Santa Cecília',
        //         address: 'Rua nossa senhora das graças',
        //         zipcode: '29147500',
        //         number: '10',
        //         cnpj: '12343548756',
        //         complement: 'oficina do camrão'
        //         , _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK'
        //     }
        // })
        // const result = await Stores.update({ db, data: { name: 'brunela suassuna' }, id: 'rAcXlRcGdUlr3AeJDRQT' })
        // const result = await Stores.read({ db, id: 'rAcXlRcGdUlr3AeJDRQT' })
        // const result = await Stores.delete({ db, id: 'rAcXlRcGdUlr3AeJDRQT' })


        // const result = await OS.create({ db, data: { devices: [{ device: 'iphone 10' }], _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })
        // const result = await OS.update({ db, data: { devices: [{ device: 'iphone' }, { device: 'android' }] }, id: 'SNjmPC4qH1eFTeG6bSl5' })
        // const result = await OS.read({ db, id: 'SNjmPC4qH1eFTeG6bSl5' })
        // const result = await OS.delete({ db, id: 'SNjmPC4qH1eFTeG6bSl5' })


        // const result = await Sales.create({ db, data: { signFile: '', observations: '', discountType: 'cash', paymentType: 'card', items: [], _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })
        // const result = await Sales.update({ db, data: { paymentType: 'cash' }, id: 'atRoNemmhlwuWfGl9ynM' })
        // const result = await Sales.read({ db, id: 'atRoNemmhlwuWfGl9ynM' })
        // const result = await Sales.delete({ db, id: 'atRoNemmhlwuWfGl9ynM' })

    }

    // TODO: criar trigger para os para a lista

    return <>
        <HeaderPage title="Dashboard" />
        <PageContent>
            aqui entra o dashboard

            <br /><br /><br />


            <button onClick={submit}>Submit</button>
        </PageContent>
    </>
}
export default Dashboard