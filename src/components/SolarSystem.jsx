'use client';

import SceneInit from '../lib/SceneInit';
import { useEffect, useRef, useState } from 'react';
import Orbit from '../lib/Orbit';
import { encodeBase64 } from 'bcryptjs';

export default function SolarSystem({ solarSystemDB }) {
	const canvasElement = useRef(null);
	const [canvasPlane, setCanvasPlane] = useState(null);
	const [planets, setPlanets] = useState(null);

	useEffect(() => {
		if (canvasElement?.current && !canvasElement.current.classList.contains('canvas-init') && !canvasPlane) {
			const { starts, planets: newPlanets } = solarSystemDB;
			setPlanets([...newPlanets]);
			const initScene = async () => {
				const setStopOrbitRotation = (value) => (stopOrbitRotation = value);

				const getOrbSpeed = (day, year, distance) => {
					if (year > distance) {
						distance = year * 2;
					}
					const secondsPerDay = day * 3600;
					const secondsInYear = year * secondsPerDay;
					const orbSpeed = (2 * Math.PI * distance) / secondsInYear;
					return orbSpeed;
				}

				const getPlanetRotationSpeed = (day, distance) => {
					const secondsPerDay = day * 3600;
					const KmPerSeconds = (2 * Math.PI * distance) / secondsPerDay;
					return KmPerSeconds;
				}

				function animateRotation(object) {
					const { day, distance } = object.config;
					object.mesh.rotation.y += getPlanetRotationSpeed(day, distance) * 0.01;
				}

				function animateOrbitRotation(object) {
					const { year, day, distance } = object.config;
					object.orbit.rotation.y += getOrbSpeed(year, day, distance);
				}

				function generateRotation(systemMap, sphereType) {
					for (let key in systemMap[sphereType]) {
						animateOrbitRotation(systemMap[sphereType][key]);
						animateRotation(systemMap[sphereType][key]);
					}
				}



				let newScene = new SceneInit();
				newScene.initScene(setStopOrbitRotation, canvasElement.current);
				newScene.animate();

				setCanvasPlane(newScene);

				const configOrbit = {
					...starts[0],
					planets,
					ambientLight: true,
					directionalLight: true,
					isMainStar: true,
				};

				const orbit = new Orbit({
					config: configOrbit,
					scene: newScene.scene,
					camera: newScene.camera,
					controls: newScene.controls,
					renderer: newScene.renderer,
					animateOrbitRotation,
					animateRotation,
				});

				const { mesh, orbit: orbit_system, systemMap } = orbit.getMesh();
				console.log(orbit_system)
				newScene.scene.add(orbit_system);
				newScene.systemMap = systemMap

				let stopOrbitRotation = false;

				window.addEventListener('mousedown', () => {
					//setStopOrbitRotation(true);
				});

				window.addEventListener('contextmenu', () => {
					if (newScene.INTERSECTED != null) {
						setStopOrbitRotation(false);
						newScene.initialDistance = newScene.sunInitialDistance;
						newScene.updateCamera(orbitMesh, true);
						newScene.INTERSECTED = null;
					}
				});

				const animate = () => {
					mesh.rotation.y += 2 * Math.PI / (1 * 60 * 60);
					generateRotation(systemMap, 'planets')
					requestAnimationFrame(animate);
				};
				animate();
			};

			initScene();
		}

		return () => {
			if (canvasPlane) {
				const scene = canvasPlane.scene;

				while (scene.children.length > 0) {
					scene.remove(scene.children[0]);
				}

				canvasPlane.renderer.dispose();
				canvasPlane.controls.dispose();

				canvasElement.current.classList.remove('canvas-init');

				setCanvasPlane(null);
			}
		}
	}, [solarSystemDB]);

	return (
		<div className='SolarSystem'>
			<canvas ref={canvasElement} id='myThreeJsCanvas' key={encodeBase64(JSON.stringify(solarSystemDB))} />
			<div id='planets-list'>
				{planets?.map((planet, index) => (
					<div
						key={`planet-${planet.name}_${index}`}
						id={planet.name}
						onClick={function () {
							canvasPlane.selectPlanet(planet.name);
						}}>
						<figure
							className='sphere'
							style={{
								'--sphere_bg': `url(${planet.texture}) repeat-x`,
							}}></figure>
					</div>
				))}
			</div>
		</div>
	);
}
