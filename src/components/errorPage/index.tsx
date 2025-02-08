import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export const ErrorPage = () => {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <ExclamationTriangleIcon className="size-20 mx-auto text-red-700" />
            <span>Ocorreu um erro ao carregar os dados da página, <br /> tente recarregar o navegador.</span>
        </div>
    </div>
}