import { MailIcon } from "lucide-react"

const OSRelatosTecnicos = () => {
    return <div className="pt-8">
        {
            [1, 2, 3, 4, 5].map(i => <div className="py-6 mb-4 px-4 bg-gray-50 border-b-4 border-gray-200">
                <div className="flex justify-between items-center pb-4">
                    <span>
                        Jhonnatan
                    </span>
                    <span>
                        11/02/2025  15:00hs
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span>
                        Relato
                    </span>
                    <span className="text-green-300 hover:text-indigo-900">
                        <MailIcon className="w-6" />
                    </span>
                </div>
            </div>)
        }
    </div>
}

export default OSRelatosTecnicos