import React from 'react';
import SolarSystem from '../../components/SolarSystem';

export default function Page() {
	return (
		<>
			<div style={{position: 'relative',zIndex: 1}}>
				<SolarSystem></SolarSystem>
				<div className="container">
					<div className="dashboard section">
					</div>
				</div>
			</div>
		</>
	)
}
// import React from 'react';