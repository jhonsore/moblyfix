import { Outlet } from "react-router"
import Menu from "../menu"

const Layout = () => {
    return <div>
        <Menu />
        <Outlet />
    </div>
}

export default Layout