import { Button } from "../../components/ui/button"



const Anexos = () => {
    return <div>
        <div className='flex gap-4 pb-4  mt-8 border-b border-[#EFF4FB]'>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
            <div className='relative bg-img-add w-32 h-32'>
                <button>
                    <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                        delete
                    </span>
                </button>
            </div>
        </div>
        <div className='flex justify-end py-7'>
            <Button variant={"outlinePrimary"}>Adicionar anexo</Button>
        </div>
    </div>

}

export default Anexos