import React from 'react';
import SolarSystem from '../../../../components/SolarSystem';
import systemSolar from '../../../../mocks/solar_system.json';

export default function Page() {
	const { planets } = systemSolar;

	return <SolarSystem systemSolar={systemSolar} planets={planets}></SolarSystem>;
}
