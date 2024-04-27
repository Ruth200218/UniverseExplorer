'use client';

import React, { useState } from 'react';
import SolarSystem from '../components/SolarSystem';
import systemSolar from '../mocks/solar_system.json';

export default function SolarSystemLayout() {
	const [solarSystemDB, setSolarSystemDB] = useState(systemSolar);
	const [isEditPage, setIsEditPage] = useState(false);

	return <SolarSystem isEditPage={isEditPage} solarSystemDB={solarSystemDB} />;
}
