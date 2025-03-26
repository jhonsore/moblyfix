import { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../../providers/firebase/useFirebaseContext';
import { useParams } from 'react-router';
import { DB } from '../../../functions/database';
import HTMLtoPDFViewer from '../../../components/HTMLtoPDFViewer';
import { ErrorPage } from '../../../components/errorPage';
import { LoadingPage } from '../../../components/loadingPage';

function TechnicalAnalysis() {
    const [htmlString, setHtmlString] = useState('')
    const { db } = useFirebaseContext()
    const { id } = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        async function load() {
            if (!id) return
            const result = await DB.os.read({ db, id })
            if (!result.status) {
                setError(true)
                return
            }
            setHtmlString(`<div class="container">
    <table>
        <tr>
            <td>
                <img class="logo" src="https://i.ibb.co/8gqZyg1c/logo-loja.png" alt="logo-loja" />
            </td>
            <td colspan="2" class="titulo-loja">
                <h3>
                    Moblyfix
                </h3>
                <p>
                    Técnico: <span>${result.doc?.responsibleTechnician?.name}</span>
                </p>
            </td>
            <td class="subtitulo-loja">
                <p>
                    Entrada OS:
                </p>
                <span>${result.doc?.customer?.name}</span>
            </td>
        </tr>
    </table>
    <div class="border-alert">
        <span>Atenção, este é um e-mail automático. favor não responder.</span>
    </div>
    <div class="alert-status">
        <span> Sua ordem de serviço nº<span>xxxxxxxx</span> entrou em análise pelos nossos técnicos</span>
    </div>
    <table>
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
                Produto: <span class="dados">xxxxxxx</span>
            </td>
            <td class="subtitulo">
                Serial: <span class="dados">xxxxxxxxxx</span>
            </td>
        <tr>
            <td colspan="2" class="subtitulo">
                Acessório: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Garantia: <span class="dados">$xxxxxxxxxxx</span>
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Observação: <span class="dados">xxxxxxxx</span>
            </td>
        </tr>

    </table>
    <div class="border-bot">

    </div>
    <div class="email-auto">
        <span>Atenção, este é um e-mail automático. favor não responder.</span>
    </div>
</div>
<style>
    .container {
        max-width: 634px;
        padding: 0;
        margin: 0 auto;
        font-family: Arial, Helvetica, sans-serif;
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
    }

    .border {
        border-bottom: 1px solid #000;
        display: block;
        margin-bottom: 10px;
    }

    .border-bot {
        border-bottom: 1px solid #000;
        padding-top: 50px;
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

    .alert-status {
        padding: 10px 0 20px;
    }


    .email-auto {
        padding-top: 20px;
        text-align: center;

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

export default TechnicalAnalysis;