'use client'
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { useEffect, useRef, useState } from "react";
import Planet from "../lib/Planet";
import Rotation from "../lib/Rotation";
import Ring from "../lib/Ring";
import Moon from "../lib/Moon";

export default function SolarSystem({ planets }) {
	const canvasElement = useRef(null);
	const [canvasPlane, setCanvasPlane] = useState(null);

	useEffect(() => {
		if (canvasElement?.current && !canvasElement.current.classList.contains('canvas-init') && !canvasPlane) {
			const scalePlane = 1e6;

			const getPlanetOrbitSpeed = (distanceSunPlanet) => {
				const G = 6.67430e-11 / scalePlane;
				const sunWeight = 1.989e30 / scalePlane;
				const orbitPlanetSpeed = Math.sqrt((G * sunWeight) / distanceSunPlanet);
				return orbitPlanetSpeed / 1000;
			}

			const initScene = async () => {
				const setStopOrbitRotation = (value) => (stopOrbitRotation = value);

				let newScene = new SceneInit();
				newScene.initScene(setStopOrbitRotation, canvasElement.current);
				newScene.animate();

				setCanvasPlane(newScene);

				const sunGeometry = new THREE.SphereGeometry(20);
				const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
				const sunMaterial = new THREE.MeshBasicMaterial({
					map: sunTexture,
				});
				const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
				const solarSystem = new THREE.Group();
				solarSystem.add(sunMesh);

				newScene.scene.add(solarSystem);

				let systemPlanets = [];
				planets.forEach(planet => {
					const newPlanet = new Planet(planet.radius, (planet.centerDistance / scalePlane), planet.texture);
					const planetMesh = newPlanet.getMesh();
					let planetSystem = new THREE.Group();
					planetSystem.add(planetMesh);
					planetMesh.name += "_" + planet.name;
					solarSystem.add(planetSystem);

					planetMesh.receiveShadow = true;
					planetMesh.castShadow = true;

					const rotation = new Rotation(planetMesh);
					const rotationMesh = rotation.getMesh();
					planetSystem.add(rotationMesh);

					const newSystemPlanet = {
						name: planet.name,
						planet: newPlanet,
						planetMesh,
						planetSystem,
						centerDistance: planet.centerDistance / scalePlane,
						planetYear: planet.planetYear,
						rotationMesh,
						moons: [],
						rings: []
					}

					planet.layers?.forEach(layer => {
						const newLayer = new Planet(layer.radius, 0, layer.texture);
						const layerMesh = newLayer.getMesh();
						// planet opacities
						layerMesh.material.transparent = true;
						layerMesh.material.opacity = 0.5;
						planetMesh.add(layerMesh);
					})


					planet.moons?.forEach(moon => {
						const newMoon = new Moon(moon.radius, moon.distance, moon.texture);
						const moonMesh = newMoon.getMesh();

						planetMesh.add(moonMesh);
					})

					planet.rings?.forEach(ring => {
						const ringGeometry = new Ring(ring.insideRadius, ring.outsideRadius, ring.segments, planet.texture);
						const ringGeometryMesh = ringGeometry.getMesh();
						planetMesh.add(ringGeometryMesh);
					})

					if (planet.name == 'earth') {
						newScene.INTERSECTED = planetMesh;
					}


					systemPlanets.push(newSystemPlanet);
				});

				let stopOrbitRotation = false;

				window.addEventListener("mousedown", () => {
					//setStopOrbitRotation(true);
				})

				window.addEventListener("contextmenu", () => {
					if (newScene.INTERSECTED != null) {
						setStopOrbitRotation(false);
						newScene.initialDistance = newScene.sunInitialDistance
						newScene.updateCamera(sunMesh, true)
						newScene.INTERSECTED = null;
					}
				})

				const animate = () => {
					sunMesh.rotation.y += 2 * Math.PI * (1 / 60) * (1 / 60);
					systemPlanets.forEach((planet) => {
						const { planetSystem, centerDistance, planetMesh, planetYear } = planet;
						if (!stopOrbitRotation) {
							planetSystem.rotation.y += getPlanetOrbitSpeed(centerDistance) * 0.001;
						}

						planetMesh.rotation.y += planetYear;
						if (newScene.INTERSECTED?.uuid == planetMesh.uuid) {
							newScene.updateCamera(planetMesh, true, getPlanetOrbitSpeed(centerDistance) * 0.001)
							//setStopOrbitRotation(true);
						}
					})

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
