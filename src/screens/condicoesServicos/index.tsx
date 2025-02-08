import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { TypeTermsAndConditions } from "../../types/TermsAndConditions"
import { DB } from "../../functions/database"

const CondicoesServicos = () => {
  const { db } = useFirebaseContext()
  const [termsAndConditions, setTermsAndConditions] = useState<TypeTermsAndConditions[]>([])

  useEffect(() => {
    if (!db) return
    const load = async () => {
      // const result = await DB.views.termsAndConditions.list({ db })
      // setTermsAndConditions(Object.values(result?.docs))
    }
    load()
  }, [])

  const save = async () => {
    const result = await DB.sales.create({ db, data: { signFile: '', observations: '', discountType: 'cash', paymentType: 'card', items: [], _headquarterId: 'AQZLhFK5fw1kE4sRPUVj', _storeId: 'fy1rlAiFJeMeU6URevgK' } })

    console.log(result)
  }

  return <>
    <HeaderPage title="Condições de serviços">
      <Link to={'/dashboard/condicao-de-servico/novo'}>
        <Button variant={"primary"}>Novo item</Button>
      </Link>
      <Button onClick={save} variant={"primary"}>Novo item</Button>
    </ HeaderPage>
    <PageContent>

      <div className=" m-w-full py-6">
        <table className=" w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Título
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className=" bg-white">
            {termsAndConditions.map((transaction) => (
              <tr key={transaction._id} className='border-b border-gray-200'>
                <td className="whitespace-nowrap py-4 pl-2 pr-2 text-sm text-gray-900 ">
                  {transaction.title}
                </td>
                <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium ">
                  <Link to={`/dashboard/condicao-de-servico/${transaction._id}`}>
                    <span className="text-gray-400 hover:text-indigo-900 mr-2">
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </span>
                  </Link>
                  <a href="#" className="text-gray-400 hover:text-indigo-900">
                    <span className="material-symbols-outlined">
                      delete
                    </span><span className="sr-only">, {transaction._id}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContent>
  </>
}
export default CondicoesServicos