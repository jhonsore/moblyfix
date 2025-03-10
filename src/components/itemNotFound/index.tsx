import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export const ItemNotFoundPage = () => {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <ExclamationTriangleIcon className="size-20 mx-auto text-yellow-500" />
            <span>Item não encontrado</span>
        </div>
    </div>
}