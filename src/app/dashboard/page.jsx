import React from 'react';
import SolarSystem from '../../components/SolarSystem';

export default function Page() {
	const planets = [
		{
			'name': 'mercury',
			radius: 2,
			positionX: 16,
			texture: "mercury.png",
			centerDistance: 57.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'venus',
			radius: 3,
			positionX: 32,
			texture: "venus.jpeg",
			centerDistance: 108.2e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'earth',
			radius: 1,
			positionX: 48,
			texture: "earth1.jpg",
			centerDistance: 149.6e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
			layers: [
				{
					'name': 'earth',
					radius: 1.1,
					texture: "earth.jpeg",
					planetYear: 2 * Math.PI * (1 / 65) * (1 / 65),
				}
			],
			moons: [
				{
					'name': 'moon',
					radius: 0.3,
					distance: 3,
					texture: "venus.jpeg",
				},
			],
			rings: [
				{
					'insideRadius': 4.8,
					'outsideRadius': 4.9,
					'segments': 100,
				},
				{
					'insideRadius': 4,
					'outsideRadius': 4.7,
					'segments': 100,
				},
				{
					'insideRadius': 3.8,
					'outsideRadius': 3.9,
					'segments': 100,
				}
			]
		},
		{
			'name': 'mars',
			radius: 3,
			positionX: 64,
			texture: "mars.jpeg",
			centerDistance: 227.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'mars_1',
			radius: 3,
			positionX: 32,
			texture: "earth.jpeg",
			centerDistance: 255.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
	];
	return (
		<>
			<div style={{ position: 'relative', zIndex: 1 }}>
				<SolarSystem planets={planets}></SolarSystem>
				<div className="container">
					<div className="dashboard section">
					</div>
				</div>
			</div>
		</>
	)
}
