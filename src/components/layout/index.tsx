import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"
import ReloadPrompt from "../ReloadPrompt"


const Layout = () => {
    return <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-[#F1F5F9] pt-20">
            <ReloadPrompt />
            <Outlet />
        </main>
    </SidebarProvider>
}

export default Layout