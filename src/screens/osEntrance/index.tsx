import React, { useEffect } from 'react';
import './styles.css'

const OsEntrance: React.FC = () => {
    useEffect(() => {
        window.print();
    }, [])

    return (
        <div className='py-10 px-6'>
            <div >
                <h1>Meu Título</h1>
                <p>Este é um exemplo de PDF gerado com React.</p>
            </div>
        </div>
    );
};

export default OsEntrance;