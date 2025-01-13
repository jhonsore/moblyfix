import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../providers/auth/useAuthContext";
import { ReactNode, Suspense } from "react";

function RequireAuth({ children }: { children: ReactNode }) {
    const auth = useAuthContext();
    const location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Suspense fallback={<div>Carregando página</div>}>{children}</Suspense>;
}

export default RequireAuth