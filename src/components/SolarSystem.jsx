'use client'
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { useEffect, useRef, useState } from "react";
import Orbit from "../lib/Orbit";

export default function SolarSystem({ planets, systemSolar }) {
	const canvasElement = useRef(null);
	const [canvasPlane, setCanvasPlane] = useState(null);
	const { starts, scale_distance, scale_radio } = systemSolar;

	useEffect(() => {
		if (canvasElement?.current && !canvasElement.current.classList.contains('canvas-init') && !canvasPlane) {
			//console.log(2 * Math.PI * (1 / 60) * (1 / 60))
			const scalePlane = scale_distance;

			function getPlanetRotationSpeed(kmPerH, radioKm) {
				const KmPerSeconds = kmPerH / 3600;
				const radPerSeconds = KmPerSeconds / KmPerSeconds;
				return radPerSeconds;
			}

			function getOrbSpeed(day, year) {
				const secondsInYear = year * day * 3600;
				const orbSpeed = (2 * Math.PI) / secondsInYear;
				return orbSpeed;
			}

			function scaleUnit(value) {
				const newScale = (value / scalePlane).toFixed(2)
				return newScale;
			}

			function scaleRadio(value) {
				let newScale = (value / scale_radio).toFixed(2)
				newScale = newScale > 60 ? 60 : newScale;
				newScale = newScale < 0.1 ? 0.1 : newScale;
				return newScale;
			}

			const initScene = async () => {
				const setStopOrbitRotation = (value) => (stopOrbitRotation = value);

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
					object: configOrbit,
					scene: newScene.scene,
					camera: newScene.camera,
					controls: newScene.controls,
					renderer: newScene.renderer,
				});

				const { mesh, orbit: solarSystem } = orbit.getMesh();

				newScene.scene.add(solarSystem);

				let stopOrbitRotation = false;
				let systemPlanets = [];

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
