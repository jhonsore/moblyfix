import { Button } from "../../components/ui/button"
import PageContent from "@/components/layout/pageContent"
import HeaderPage from "../../components/headerPage"
import Dados from "./dados"
import Anexos from "./anexos"
import { Badge } from "../../components/ui/badge"
import Acompanhamentos from "./acompanhamentos"
import { Link } from "react-router"



const tabs = [
  { name: 'Dados da OS', href: '/dashboard/ordem-servico/dados', current: false },
  { name: 'Anexos', href: '/dashboard/ordem-servico/anexos', current: false },
  { name: 'Acompanhamento', href: '/dashboard/ordem-servico/acompanhamento', current: true },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const AcompanhamentoPage = () => {

  return <>

    <HeaderPage title="OS - 123456">
      <Badge variant="orange">Aguardando atendimento</Badge>
      <Button variant={"destructive"}>Cancelar OS </Button>
      <Button variant={"primary"}>Finalizar</Button>
    </HeaderPage>


    <PageContent>

      <div className='flex justify-end pt-5 items-center'>
        <span className="text-sm text-gray-500 pr-3">Aberto em: 10/10/2024</span>
        <Link to={'/dashboard/ordem-servico/analise-tecnica'}>
        <Button variant={"orange"}>Iniciar análise técnica</Button>
      </Link>
        
      </div>
      <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 pt-4">
        <div className='border-b'>
          <div className="flex justify-between">
            <nav className="flex-1 flex max-w-lg gap-4" aria-label="Tabs">
              {tabs.map((tab, tabIdx) => (
                <Link to={tab.href}>
                
                <a
                  key={tab.name}
                  
                  className={classNames(
                    tab.current ? ' bg-blue-600  hover:text-blue-600 border-x rounded-t-lg px-3' : 'text-gray-500 hover:text-gray-700 border-x rounded-t-lg border-t px-3',
                    tabIdx === 0 ? '' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-t-lg' : '',
                    'group relative z-10 min-w-0 flex-1 overflow-hidden bg-white py-3 text-sm font-medium text-center hover:bg-gray-50 '
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.current ? 'bg-indigo-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5'
                    )}
                  />
                </a>
                </Link>
              ))}
            </nav>
            <div className='flex gap-3 text-gray-500 text-right'>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  attachment
                </span>
              </button>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  mail
                </span>
              </button>
              <button>
                <span className="material-symbols-outlined hover:text-blue-500">
                  print
                </span>
              </button>
              <button>
                <span className='img-whts inline-block '>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-6 pb-7">
        
      <div className='bg-[#F5F5F5] mt-8  rounded-lg p-6'>
            <div className='flex justify-between text-sm'>
                <h2>Criado por: Jhonnatan</h2>
                <span>10/10/2024 10:00</span>
            </div>
            <p className='font-bold pt-2'>OS criada</p>
        </div>
      </div>

    </PageContent >
  </>
}
export default AcompanhamentoPage

