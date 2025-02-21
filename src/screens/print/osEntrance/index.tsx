import { useState, useRef, useEffect } from 'react';
import { useFirebaseContext } from '../../../providers/firebase/useFirebaseContext';
import { useParams } from 'react-router';
import { DB } from '../../../functions/database';
import HTMLtoPDFViewer from '../../../components/HTMLtoPDFViewer';
import { ErrorPage } from '../../../components/errorPage';
import { LoadingPage } from '../../../components/loadingPage';

function OsEntrance() {
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
            setHtmlString(`<h1>Conteúdo do meu PDF</h1>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0p0rAHBTku1B9oTDW-m352X_GHHkzurSQIA&s' />
        <p>Este é o conteúdo HTML que será exibido no visualizador de PDF. OS id: ${result.doc?._id}</p>
        
        <style>
                h1{font-size: 10px; color: red;}
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

    return (<HTMLtoPDFViewer htmlString={htmlString} />);
}

export default OsEntrance;