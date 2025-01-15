import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"


const Layout = () => {
    return <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-[#F1F5F9]">
            <Outlet />
        </main>
    </SidebarProvider>
}

export default Layout