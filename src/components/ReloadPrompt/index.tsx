import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ReloadPrompt = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());

    useEffect(() => {
        const resetTimer = () => setLastActivity(Date.now());

        const checkInactivity = setInterval(() => {
            if (Date.now() - lastActivity > (60 * 10) * 1000) {
                setShowMessage(true);
            }
        }, 1000);

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("touchstart", resetTimer);
        window.addEventListener("scroll", resetTimer);

        return () => {
            clearInterval(checkInactivity);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("touchstart", resetTimer);
            window.removeEventListener("scroll", resetTimer);
        };
    }, [lastActivity]);

    if (!showMessage) return

    return (
        <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-full bg-black/80 z-50">
            <div className="bg-white text-black p-4 rounded-lg shadow-lg text-center">
                <p className="mb-4">Detectamos um período prolongado de inatividade. <br />Por favor, recarregue a página para continuar.</p>
                <Button onClick={() => location.reload()} variant={'primary'}>Clique aqui para recarregar a página</Button>
            </div>
        </div>
    );
};

export default ReloadPrompt;
