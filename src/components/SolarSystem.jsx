'use client'
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { useEffect, useRef, useState } from "react";
import Orbit from "../lib/Orbit";

export default function SolarSystem({ planets, systemSolar }) {
	const canvasElement = useRef(null);
	const [canvasPlane, setCanvasPlane] = useState(null);
	const { starts } = systemSolar;

	useEffect(() => {
		if (canvasElement?.current && !canvasElement.current.classList.contains('canvas-init') && !canvasPlane) {

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

				const getPlanetRotationSpeed = (day) => {
					const KmPerSeconds = (2 * Math.PI) / day;
					return KmPerSeconds;
				}

				function animateRotation(object) {
					const { day } = object.config;
					object.mesh.rotation.y += getPlanetRotationSpeed(day) * 0.001;
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

				window.addEventListener("mousedown", () => {
					//setStopOrbitRotation(true);
				})

				window.addEventListener("contextmenu", () => {
					if (newScene.INTERSECTED != null) {
						setStopOrbitRotation(false);
						newScene.initialDistance = newScene.sunInitialDistance
						newScene.updateCamera(orbitMesh, true)
						newScene.INTERSECTED = null;
					}
				})

				const animate = () => {
					mesh.rotation.y += 2 * Math.PI / (1 * 60 * 60);
					generateRotation(systemMap, 'planets')
					requestAnimationFrame(animate);
				};
				animate();
			}

			initScene();
		}
	}, [planets]);

	return (
		<div className="flex flex-col items-center justify-center">
			<canvas ref={canvasElement} id="myThreeJsCanvas" />
			<div id="planets-list">
				{planets.map((planet) => (
					<div key={planet.name} id={planet.name} onClick={function () { canvasPlane.selectPlanet(planet.name) }}>
						<figure className="sphere" style={{
							'--sphere_bg': `url(/${planet.texture}) repeat-x`
						}}></figure>
					</div>
				))}
			</div>
		</div>
	);
}
