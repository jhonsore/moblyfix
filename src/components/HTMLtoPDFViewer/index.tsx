import { useState, useRef, useEffect } from 'react';

function HTMLtoPDFViewer({ htmlString }: { htmlString: string }) {
    const [pdfUrl, setPdfUrl] = useState(null);
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        if (htmlString) {
            const pagePrint = `<html>
      <head>
        <style>@page {size: auto;margin: 0mm;}</style>
      </head>
      <body>
        ${htmlString}
        <script type="text/javascript" nonce="">// <![CDATA[
document.body.onload=function(){document.body.offsetHeight;window.print()};
// ]]></script>
      </body>
    </html>`
            // Cria um Blob com o conteúdo HTML
            const blob = new Blob([pagePrint], { type: 'text/html' });

            // Cria uma URL para o Blob
            const url: any = URL.createObjectURL(blob);
            setPdfUrl(url);
        }

        return () => {
            // Limpa a URL do objeto quando o componente é desmontado
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [htmlString]);

    return (<>
        {pdfUrl && (
            <iframe
                className='fixed top-0 left-0 w-full h-full'
                ref={viewerRef}
                src={pdfUrl}
            />
        )}
    </>);
}

export default HTMLtoPDFViewer;