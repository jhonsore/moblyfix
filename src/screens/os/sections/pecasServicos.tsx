const OSPecasServicos = () => {
    return <div className="pt-8">
        <div className="pb-6">
            <table className="w-full">
                <thead className="bg-gray-50 border-b-4 border-gray-300">
                    <tr className="align-top">
                        <th
                            scope="col"
                            className="whitespace-nowrap pl-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Peça/Serviço
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap pr-8 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                            Qtd
                        </th>
                        <th scope="col"
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Preço de custo
                        </th>
                        <th scope="col"
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Venda á vista<br /> (débito/dinheiro)
                        </th>

                        <th colSpan={2}
                            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900">
                            Venda á prazo
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b-4 border-gray-200'>
                        <td className="whitespace-nowrap pl-2 py-4 text-sm font-semibold text-gray-900">
                            Peça-1
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            1
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$1000,00
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$3000,00
                        </td>
                        <td className="whitespace-nowrap text-left py-4 text-sm font-semibold text-gray-900">
                            R$2300,00
                        </td>
                        <td className="text-center">
                            <span className="material-symbols-outlined cursor-pointer text-red-400 hover:text-indigo-900 mr-2 text-sm">
                                x
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total á prazo
                    </h2>
                    <span>
                        R$ 00,00
                    </span>
                </div>
                <div className="py-4 text-base font-bold text-gray-900 border-b border-gray-200 flex justify-between">
                    <h2>
                        Total á vista
                    </h2>
                    <span>
                        R$ 00,00
                    </span>
                </div>
            </div>
        </div>
    </div>


}

export default OSPecasServicos