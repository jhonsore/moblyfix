import { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../../providers/firebase/useFirebaseContext';
import { useParams } from 'react-router';
import { DB } from '../../../functions/database';
import HTMLtoPDFViewer from '../../../components/HTMLtoPDFViewer';
import { ErrorPage } from '../../../components/errorPage';
import { LoadingPage } from '../../../components/loadingPage';
import convertNumberOs from '../../../functions/os/convertOsNumber';
import formatCpfCnpj from '../../../functions/utils/formatCpfCnpj';
import { format } from 'date-fns';

function OsEntrance() {
    const [htmlString, setHtmlString] = useState('')
    const { db } = useFirebaseContext()
    const { id } = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        async function load() {
            if (!id) return
            const result = await DB.os.read({ db, id })

            if (!result.status || !result.doc) {
                setError(true)
                return
            }
            const resultStore = await DB.stores.read({ db, id: result.doc?._storeId })
            console.log(resultStore)
            if (!resultStore.status || !resultStore.doc) {
                setError(true)
                return
            }

            setHtmlString(`<div class="container">
    <table>
        <tr>
            <td>
            <img class="logo" src="${resultStore.doc.logo?.url}" alt="logo-loja" />
                
            </td>
            <td colspan="2" class="titulo-loja">
                <h3>
            ${resultStore.doc.name}
                </h3>
                <p>
                    Vendedor: <span>${result.doc?.createdBy?.name}</span>
                </p>
            </td>
            <td class="subtitulo-loja">
                <p>
                    Entrada OS:
                </p>
                <span>${convertNumberOs(result.doc?.numberOs)}</span>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td class="titulo">
                Dados do cliente
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Nome: <span class="dados">${result.doc?.customer?.name}</span>
            </td>
            <td class="subtitulo">
                Cpf/Cnpj: <span class="dados">${result.doc.customer.cpfCnpj ? formatCpfCnpj(result.doc.customer.cpfCnpj) : '-'}</span>
            </td>

        </tr>
        
        <tr>
            <td colspan="4">
                <span class="border"></span>
            </td>
        </tr>
        <tr>
            <td class="titulo">
                Dados do Produto
            </td>
        </tr>
        <tr>
            <td colspan="2" class="subtitulo">
                Produto: <span class="dados">${result.doc?.product}</span>
            </td>
            <td class="subtitulo">
                Serial: <span class="dados">${result.doc?.serialNumber || '-'}</span>
            </td>
        <tr>
            <td colspan="2" class="subtitulo">
                Acessórios: <span class="dados">${result.doc?.accessories || '-'}</span>
            </td>
            <td class="subtitulo">
                Garantia: <span class="dados">${result.doc?.guarantee ? 'Sim' : 'Não'}</span>
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Observação: <span class="dados">${result.doc?.observation || '-'}</span>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <span class="border"></span>
            </td>
        </tr>

    </table>
    <div>
        <h3 class="titulo">
            Condições de serviço
        </h3>
        <div class="dados">${result.doc?.termsAndConditions}</div>
    </div>
    <div class="assinatura">
        <div class="aceito">
            Aceito em: <span>${format(result.doc.createdAt.toDate(), 'dd/MM/yyyy')}</span>
        </div>
        <div>
            <img src="${result.doc.signFile?.url}" class="sign-file" />
        </div>
        <span class="border-assinatura"></span>
        <p class="assinatura-cliente">
            Assinatura Cliente
        </p>

    </div>

</div>
<style>
.aceito{
margin-top: 20px;
font-size: 12px;
}
.sign-file{
width: 200px;
margin: 0 auto;
display: block;
}
    .container {
        max-width: 634px;
        padding: 0;
        margin: 0 auto;
        font-family: Arial, Helvetica, sans-serif;
    }

    .logo {
        width: 100px;
        heigth: 200px;
    }

    table {
        width: 100%;
        border-spacing: 0;
        padding: 0;

    }

    td {
        white-space: nowrap;
    }

    .titulo-loja {
        text-align: center;
        width: 33%;

    }

    .subtitulo-loja {
        text-align: end;
        width: 33%;
    }

    .titulo {
        font-weight: bold;
        font-size: 20px;
        padding: 10px 0;

    }

    .subtitulo {
        font-weight: bold;
        font-size: 16px;
        padding: 0 15px 10px 0;
    }

    .dados {
        font-weight: normal;
        font-size: 16px;
        display: block;
        white-space: pre-wrap;
    }

    .border {
        border-bottom: 1px solid #000;
        display: block;
        margin-bottom: 10px;
    }

    .border-assinatura {
        border-bottom: 1px solid #000;
        display: block;
        width: 70%;
        margin: 0 auto 10px;
    }

    .border-alert {
        padding: 20px;
        text-align: center;
        border: 1px solid #0000006b;
        box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 0.46);
        margin: 20px 0;

    }

    h3,
    p {
        margin: 0;
        padding: 0;
    }


    .nome-cliente {
        padding-top: 50px;
        padding-bottom: 50px;
        display: block;
        text-align: center;
    }

    .assinatura-cliente {
        font-size: 18px;
        text-align: center;
        padding-bottom: 100px;
    }

    .alerta-email {
        font-size: 18px;
        display: block;
        text-align: center;
        padding-top: 20px;
    }



    @print {
        .container {
            max-width: 100%;
        }
    }
</style>
`)
        }
        load()
    }, [id])

    if (error) {
        return <ErrorPage />
    }

    if (!htmlString) {
        return <LoadingPage />
    }

    return (
        <HTMLtoPDFViewer htmlString={htmlString} />);
}

export default OsEntrance;