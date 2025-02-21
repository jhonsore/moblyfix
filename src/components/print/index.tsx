import React from 'react';
import './styles.css'
import { Outlet } from "react-router"

const PrintLayout: React.FC = () => {
    return (
        <div className='py-10 px-6'>
            <Outlet />
        </div>
    );
};

export default PrintLayout;