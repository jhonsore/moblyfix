import { Button } from "../../components/ui/button"
import PageContent from "@/components/layout/pageContent"
import HeaderPage from "../../components/headerPage"
import { Badge } from "../../components/ui/badge"
import { Link } from "react-router"



const tabs = [
  { name: 'Dados da OS', href: '/dashboard/ordem-servico/dados', current: false },
  { name: 'Anexos', href: '/dashboard/ordem-servico/anexos', current: true },
  { name: 'Acompanhamento', href: '/dashboard/ordem-servico/acompanhamento', current: false },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const AnexosPage = () => {

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
      <div className=" mt-6">

      <div className='flex gap-4 pb-4  mt-8 border-b border-[#EFF4FB]'>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
        </div>
        <div className='flex justify-end py-7'>
            <Button variant={"outlinePrimary"}>Adicionar anexo</Button>
        </div>

      </div>

    </PageContent >
  </>
}
export default AnexosPage

