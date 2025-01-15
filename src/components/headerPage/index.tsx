import { ReactNode } from "react"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"

const HeaderPage = ({ title, children }: { title: string, children?: ReactNode }) => {
    const { open } = useSidebar()

    return <div className="flex  items-center pr-4 bg-white  h-[60px] border-b border-gray-200 sm:pr-6 fixed top-0 left-0 w-full    ">
        <div className={`flex duration-200 ease-linear items-center justify-between pl-6 flex-wrap sm:flex-nowrap ${open ? 'ml-[--sidebar-width]' : 'ml-[48px]'}   duration-200 w-full  `}>
            <div className=" flex items-center">
                <SidebarTrigger />
                <h3 className="text-lg leading-6 font-bold text-black">{title}</h3>
            </div>
            <div className="ml-4 flex gap-4">
                {children}
            </div>
        </div>
    </div>
}

export default HeaderPage