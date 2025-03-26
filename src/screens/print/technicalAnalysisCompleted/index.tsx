import { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../../providers/firebase/useFirebaseContext';
import { useParams } from 'react-router';
import { DB } from '../../../functions/database';
import HTMLtoPDFViewer from '../../../components/HTMLtoPDFViewer';
import { ErrorPage } from '../../../components/errorPage';
import { LoadingPage } from '../../../components/loadingPage';

function TechnicalAnalysisCompleted() {
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
    <span class="servico-feito">FEITO REPARO xxxxxxxx</span>
    
    <table>
        <tr>
            <td class="titulo">
                Dados do cliente
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Nome: <span class="dados">xxxxxxx</span>
            </td>
            <td class="subtitulo">
                Cpf/Cnpj: <span class="dados">${result.doc?.customer?.cpfCnpj}</span>
            </td>
            <td class="subtitulo">
                E-mail: <span class="dados">xxxxxxx</span>
            </td>xxx
        </tr>
        <tr>
            <td class="subtitulo">
                Telefone: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Contato1: <span class="dados"></span>
            </td>
            <td class="subtitulo">
                Contato2: <span class="dados"></span>
            </td>
            <td class="subtitulo">
                WhatsApp: <span class="dados">xxxxxxxx</span>
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Uf: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Cidade: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Bairro: <span class="dados">xxxxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Cep: <span class="dados">xxxxxxxxxxx</span>
            </td>
        <tr>
            <td class="subtitulo">
                Endereço: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Número: <span class="dados">xxxxxxx</span>
            </td>
            <td class="subtitulo">
                Complemento: <span class="dados">xxxxxxxx</span>
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
                Produto: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Serial: <span class="dados">xxxxxxxxxx</span>
            </td>
        <tr>
            <td colspan="2" class="subtitulo">
                Acessório: <span class="dados">xxxxxxxxx</span>
            </td>
            <td class="subtitulo">
                Garantia: <span class="dados">xxxxxxxxx</span>
            </td>
        </tr>
        <tr>
            <td class="relato-tecnico">
                 Relato Técnico: <span> FEITO REPARO xxxxxxxxx</span>
            </td>
        </tr>
        <tr>
            <td class="subtitulo">
                Observações: <span class="dados">xxxxxxxxxxx</span>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <span class="border"></span>
            </td>
        </tr>

    </table>
    <div>
        <span class="descricao">Itens de serviço</span>
        <table class="table-descricao">
        
            <tr class="borda-th">
                <th class="titulo-itens">
                    Descrição
                </th>
                <th class="titulo-itens">
                    Qnt.
                </th>
                <th class="titulo-itens">
                    Valor à prazo
                </th>
                <th class="titulo-itens">
                    Valor à vista
                </th>
            </tr>
            <tr class="borda-tr">
                <td class="titulo-reparo">
                    Reparo
                </td>
                <td class="itens-td">
                    200
                </td>
                <td class="itens-td">
                    200
                </td>
                <td class="itens-td">
                    200
                </td>
            </tr>
            <tr class="texto-prazo">
                <td class="texto-prazo-td" colspan="3">
                    Total à prazo
                </td>
                <td class="texto-prazo-td-valor">
                    R$ 0,00
                </td>
            </tr>
            <tr class="texto-prazo">
                <td colspan="3" >
                    Total à vista
                </td>
                <td class="texto-vista-td-valor">
                    R$ 0,00
                </td>
            </tr>
        </table>
    </div>
    <div class="assinatura">
        <h3 class="titulo">
            Gerado em: <span>xxxxxxxxxx</span>
        </h3>
        <span class="nome-cliente">${result.doc?.customer?.name}</span>
        <span class="border-assinatura"></span>
        <p class="assinatura-cliente">
            Assinatura Cliente
        </p>

    </div>
    <span class="alerta-email">Atenção, este é um e-mail automático. favor não responder.</span>

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

    .relato-tecnico {
        font-weight: bold;
        font-size: 16px;
        padding: 20px 0;
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

    .servico-feito {
        display: block;
        border-bottom: 1px solid #000;
        padding-bottom: 30px;
    }

    h3,
    p {
        margin: 0;
        padding: 0;
    }

    .assinatura {
        border-bottom: 1px solid #000;
        border-top: 1px solid #000;
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

    .descricao {
        font-size: 20px;
        font-weight: bold;
        padding: 10px 0;
        display: block;
    }

    .table-descricao {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    .borda-th {
        border-bottom: 1px solid #000;
    }

    .borda-tr {
        border-bottom: 1px solid #0000002f;
    }

    .titulo-itens {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
    }

    .titulo-reparo {
        font-size: 16px;
        text-align: left;
        padding: 10px 0;
    }

    .itens-td {
        font-size: 16px;
        text-align: left;
    }

    .texto-prazo {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-bottom: 1px solid #0000002f;
    }

    .texto-prazo-td {
        padding: 20px 0 5px;
    }

    .texto-prazo-td-valor {
        text-align: right;
        padding: 20px 0 5px;
    }

    .texto-vista-td-valor {
        text-align: right;
        padding: 10px 0 0;
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

export default TechnicalAnalysisCompleted;