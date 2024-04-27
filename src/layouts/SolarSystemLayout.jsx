'use client';
import React, { useState } from 'react';
import SolarSystem from '../components/SolarSystem'
import systemSolar from '../mocks/solar_system.json';
import EditMenu from '../components/EditMenu';

export default function SolarSystemLayout() {
    const [solarSystemDB, setSolarSystemDB] = useState(systemSolar);
    const [isEditPage, setIsEditPage] = useState(false);

    const handleSystemChange = (newSystem) => {
        setSolarSystemDB({ ...newSystem.formData });
    }

    return (
        <>
            <div className='dashboard'>
                <div className='dashboard__grid-container'>
                    <aside className='dashboard__side-menu'>
                        <EditMenu setIsEditPage={setIsEditPage} handleChange={handleSystemChange} schema={systemSolar} />
                    </aside>
                    <div className='dashboard__content'>
                        <SolarSystem isEditPage={isEditPage} solarSystemDB={solarSystemDB} />
                    </div>
                </div>
            </div>
        </>
    );
}

