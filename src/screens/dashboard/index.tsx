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
                <div className="rounded-2xl border border-gray-200 bg-white p-5  ">
                    <p className="text-sm text-gray-500 ">
                        Os criadas
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 ">
                                24
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600  ">
                                +20%
                            </span>

                            <span className="text-xs text-gray-500 ">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5  ">
                    <p className="text-sm text-gray-500 ">
                        Clientes novos
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 ">
                                55
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600  ">
                                +4%
                            </span>

                            <span className="text-xs text-gray-500 ">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5  ">
                    <p className="text-sm text-gray-500 ">Vendas realizadas</p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 ">54</h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600  ">
                                -1.59%
                            </span>

                            <span className="text-xs text-gray-500 ">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5  ">
                    <p className="text-sm text-gray-500 ">Produtos vendidos</p>

                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 ">
                                50
                            </h4>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600  ">
                                +7%
                            </span>

                            <span className="text-xs text-gray-500 ">
                                último mês
                            </span>
                        </div>
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-4   md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 ">
                            Produtos mais vendidos
                        </h3>


                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 ">
                            <span className="text-xs text-gray-400"> Source </span>
                            <span className="text-right text-xs text-gray-400"> Visitors </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                Google
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                4.7K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                Facebook
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                3.4K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                Threads
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                2.9K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                Google
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                1.5K
                            </span>
                        </div>
                    </div>


                </div>


                <div className="rounded-2xl border border-gray-200 bg-white p-5   md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 ">
                            Serviços mais realizados
                        </h3>


                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 ">
                            <span className="text-xs text-gray-400"> Source </span>
                            <span className="text-right text-xs text-gray-400"> Pageview </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                tailadmin.com
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                4.7K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                preview.tailadmin.com
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                3.4K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                docs.tailadmin.com
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                2.9K
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 ">
                                tailadmin.com/componetns
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                1.5K
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5   md:p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 ">
                            Aniversariantes do mês
                        </h3>
                    </div>

                    <div className="my-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 ">
                            <span className="text-xs text-gray-400">Nome </span>
                            <span className="text-right text-xs text-gray-400">Data </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 flex items-center">
                                tailadmin.com
                                <a href="/" className="ml-2">
                                    <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                                        <path style={{ fill: '#2cb742' }} d="M0,800l68.8-206.39c-34.91-58.72-55.01-127.24-55.01-200.51C13.79,176,189.79,0,406.9,0s393.1,176,393.1,393.1-176,393.1-393.1,393.1c-66.06,0-128.26-16.37-182.9-45.14L0,800Z" />
                                        <path style={{ fill: "#ffffff" }} d="M657.7,523.93c-18.15-34.3-85.09-73.53-85.09-73.53-15.14-8.63-33.42-9.6-42.06,5.79,0,0-21.75,26.08-27.28,29.83-25.27,17.12-48.68,16.46-72.3-7.17l-54.91-54.91-54.91-54.91c-23.63-23.63-24.29-47.03-7.17-72.3,3.75-5.53,29.83-27.28,29.83-27.28,15.39-8.65,14.43-26.91,5.79-42.06,0,0-39.23-66.94-73.53-85.09-14.59-7.72-32.51-5.02-44.18,6.65l-24.25,24.25c-76.92,76.92-39.05,163.77,37.88,240.69l70.3,70.3,70.3,70.3c76.92,76.92,163.77,114.8,240.69,37.88l24.25-24.25c11.67-11.7,14.36-29.61,6.63-44.19Z" />
                                    </svg></a>
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                00/00/00
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 flex items-center">
                                tailadmin.com
                                <a href="/" className="ml-2">
                                    <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                                        <path style={{ fill: '#2cb742' }} d="M0,800l68.8-206.39c-34.91-58.72-55.01-127.24-55.01-200.51C13.79,176,189.79,0,406.9,0s393.1,176,393.1,393.1-176,393.1-393.1,393.1c-66.06,0-128.26-16.37-182.9-45.14L0,800Z" />
                                        <path style={{ fill: "#ffffff" }} d="M657.7,523.93c-18.15-34.3-85.09-73.53-85.09-73.53-15.14-8.63-33.42-9.6-42.06,5.79,0,0-21.75,26.08-27.28,29.83-25.27,17.12-48.68,16.46-72.3-7.17l-54.91-54.91-54.91-54.91c-23.63-23.63-24.29-47.03-7.17-72.3,3.75-5.53,29.83-27.28,29.83-27.28,15.39-8.65,14.43-26.91,5.79-42.06,0,0-39.23-66.94-73.53-85.09-14.59-7.72-32.51-5.02-44.18,6.65l-24.25,24.25c-76.92,76.92-39.05,163.77,37.88,240.69l70.3,70.3,70.3,70.3c76.92,76.92,163.77,114.8,240.69,37.88l24.25-24.25c11.67-11.7,14.36-29.61,6.63-44.19Z" />
                                    </svg></a>
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                00/00/00
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 py-3 ">
                            <span className="text-sm text-gray-500 flex items-center">
                                tailadmin.com
                                <a href="/" className="ml-2">
                                    <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                                        <path style={{ fill: '#2cb742' }} d="M0,800l68.8-206.39c-34.91-58.72-55.01-127.24-55.01-200.51C13.79,176,189.79,0,406.9,0s393.1,176,393.1,393.1-176,393.1-393.1,393.1c-66.06,0-128.26-16.37-182.9-45.14L0,800Z" />
                                        <path style={{ fill: "#ffffff" }} d="M657.7,523.93c-18.15-34.3-85.09-73.53-85.09-73.53-15.14-8.63-33.42-9.6-42.06,5.79,0,0-21.75,26.08-27.28,29.83-25.27,17.12-48.68,16.46-72.3-7.17l-54.91-54.91-54.91-54.91c-23.63-23.63-24.29-47.03-7.17-72.3,3.75-5.53,29.83-27.28,29.83-27.28,15.39-8.65,14.43-26.91,5.79-42.06,0,0-39.23-66.94-73.53-85.09-14.59-7.72-32.51-5.02-44.18,6.65l-24.25,24.25c-76.92,76.92-39.05,163.77,37.88,240.69l70.3,70.3,70.3,70.3c76.92,76.92,163.77,114.8,240.69,37.88l24.25-24.25c11.67-11.7,14.36-29.61,6.63-44.19Z" />
                                    </svg></a>
                            </span>
                            <span className="text-right text-sm text-gray-500 ">
                                00/00/00
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-5   md:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 ">
                        Tipos de pagamentos
                    </h3>
                    <GraphTypePayments />
                </div>
                <div className="h-[300px] rounded-2xl border border-gray-200 bg-white p-5   md:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 ">
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