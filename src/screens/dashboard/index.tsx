import HeaderPage from "../../components/headerPage"
import { ImageUploader } from "../../components/imageUploader"
import PageContent from "../../components/layout/pageContent"
import { Button } from "../../components/ui/button";
import { DB } from "../../functions/database";
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext";
import { useStoresContext } from "../../providers/stores/useStoresContext";
import GraphMethodsPayment from "./components/graphMethodsPayment";
import GraphTypePayments from "./components/graphTypePayments";

const PageDashboard = () => {
    const { db } = useFirebaseContext()
    const { store } = useStoresContext()

    return <>
        <HeaderPage title="Dashboard" />
        <div className=" px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Os criadas
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                24
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
                                +20%
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Clientes novos
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                55
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
                                +4%
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vendas realizadas</p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">54</h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-500/15 dark:text-red-500">
                                -1.59%
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Produtos vendidos</p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                50
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
                                +7%
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Produtos mais vendidos
                        </h3>


                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                            <span className="text-theme-xs text-gray-400"> Source </span>
                            <span className="text-right text-theme-xs text-gray-400"> Visitors </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                Google
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                4.7K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                Facebook
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                3.4K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                Threads
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                2.9K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                Google
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                1.5K
                            </span>
                        </div>
                    </div>


                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Serviços mais realizados
                        </h3>


                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                            <span className="text-theme-xs text-gray-400"> Source </span>
                            <span className="text-right text-theme-xs text-gray-400"> Pageview </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                4.7K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                preview.tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                3.4K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                docs.tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                2.9K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                tailadmin.com/componetns
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                1.5K
                            </span>
                        </div>
                    </div>


                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Peças mais vendidas
                        </h3>


                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                            <span className="text-theme-xs text-gray-400"> Source </span>
                            <span className="text-right text-theme-xs text-gray-400"> Pageview </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                4.7K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                preview.tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                3.4K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                docs.tailadmin.com
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                2.9K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 dark:border-gray-800">
                            <span className="text-theme-sm text-gray-500 dark:text-gray-400">
                                tailadmin.com/componetns
                            </span>
                            <span className="text-right text-theme-sm text-gray-500 dark:text-gray-400">
                                1.5K
                            </span>
                        </div>
                    </div>


                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Tipos de pagamentos
                    </h3>
                    <GraphTypePayments />
                </div>
                <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Métodos de pagamento
                    </h3>
                    <GraphMethodsPayment />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">

            </div>

            {/** ======= */}
        </div >

    </>
}
export default PageDashboard