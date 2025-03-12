import { format } from "date-fns"
import { useOsContext } from "../provider/useOsContext"
import { EmptData } from "../../../components/emptyData"

const OSAcompanhamentos = () => {
    const { os, setOs } = useOsContext()

    if (!os || !setOs) {
        return <div>Erro ao carregar anexos</div>
    }

    return <div className="py-8">
        {(!os.followup || os.followup.length === 0) && <EmptData />}
        {os.followup && os.followup.map(item => <div key={item.createdAt.toMillis()} className='bg-[#F5F5F5]  rounded-lg p-6 mb-4'>
            <div className='flex justify-between text-sm'>
                <span className="block font-bold text-lg">{item.title}</span>
                <span>{format(item.createdAt.toDate(), "dd/MM/yyyy hh:mm")}</span>
            </div>
            <span className="block text-xs">Criado por: {item.createdBy.name}</span>
            <p className=' pt-2'>{item.description}</p>

        </div>)}
    </div>
}

export default OSAcompanhamentos