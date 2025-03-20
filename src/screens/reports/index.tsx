
import { ChevronDown } from "lucide-react"
import HeaderPage from "../../components/headerPage"
import PageContent from "../../components/layout/pageContent"
import { SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../../components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"
import { useState } from "react"
import OsPeriodo from "./components/osPeriodo"
import OsStatus from "./components/osStatus"
import OsAtraso from "./components/osAtraso"
import VendaPeriodo from "./components/vendaPeriodo"
import VendaPagamento from "./components/vendaPagamento"
import PecasPeriodo from "./components/pecasPeriodo"
import VendaLucroBruto from "./components/vendaLucroBruto"

const MENU = [
  {
    label: 'Ordens de serviço',
    menu: [
      {
        title: "Por período",
        url: "os_periodo",
        section: <OsPeriodo />
      },
      {
        title: "Por status",
        url: "os_status",
        section: <OsStatus />
      },
      {
        title: "Em atraso",
        url: "os_atraso",
        section: <OsAtraso />
      },
      {
        title: "Por técnico",
        url: "os_atraso",
        section: <OsAtraso />
      },
    ]
  },
  {
    label: 'Vendas',
    menu: [
      {
        title: "Por período",
        url: "vendas_periodo",
        section: <VendaPeriodo />
      },
      {
        title: "Por tipo de pagamento",
        url: "vendas_pagamento",
        section: <VendaPagamento />
      },
      {
        title: "Lucro bruto",
        url: "vendas_lucro_bruto",
        section: <VendaLucroBruto />
      }
    ]
  },
  {
    label: 'Peças/Serviços/Produtos',
    menu: [
      {
        title: "Por período",
        url: "pecas_periodo",
        section: <PecasPeriodo />
      }
    ]
  }
]


const PageReports = () => {
  const [section, setSection] = useState('os_periodo')
  function openSectionHandler(uid: string) {
    setSection(uid)
  }

  function getSection(): React.ReactNode {
    for (const menu of MENU) {
      const foundItem = menu.menu.find(item => item.url === section);
      if (foundItem) return foundItem.section;
    }
    return null;
  }

  return <>
    <HeaderPage title="Relatórios" />
    <PageContent>
      <div className=" py-6 flex">
        <div className="w-56">

          {MENU.map((menu, index) => <Collapsible className="group/collapsible" defaultOpen={index === 0}>
            <SidebarMenuItem className="list-none">
              <CollapsibleTrigger asChild>
                <div className="text-black text-sm flex items-center cursor-pointer hover:bg-slate-100 rounded-md p-2 group-data-[state=open]/collapsible:bg-slate-100">
                  {menu.label}
                  <ChevronDown size={16} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {menu.menu.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <button onClick={() => openSectionHandler(item.url)} className=" text-black text-sm block w-full text-left cursor-pointer hover:bg-slate-100 rounded-md p-2">
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>)}
        </div>
        <div className="pl-6">
          {getSection()}
        </div>
      </div>
    </PageContent>
  </>
}
export default PageReports