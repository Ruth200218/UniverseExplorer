'use client'
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { useEffect, useState, useRef } from "react";
import Planet from "../lib/Planet";
import Rotation from "../lib/Rotation";
import Ring from "../lib/Ring";
import Moon from "../lib/Moon";

export default function SolarSystem() {
	const [planets, setPlanets] = useState([
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
			layers : [
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
					texture: "earth.jpeg",
				}
			],
			rings : [
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
			'name': 'mars 1',
			radius: 3,
			positionX: 32,
			texture: "earth.jpeg",
			centerDistance: 255.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		}
	]);

	const canvasElement = useRef(null);
	
  useEffect(() => {
	if(canvasElement?.current && !canvasElement.current.classList.contains('canvas-init')){
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
					centerDistance : planet.centerDistance / scalePlane,
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

				if(planet.name == 'earth') {
					newScene.INTERSECTED = planetMesh;
				}

				
				systemPlanets.push(newSystemPlanet);
			});

			let stopOrbitRotation = false;

			window.addEventListener("mousedown", () => {
				//setStopOrbitRotation(true);
			})


			window.addEventListener("dblclick", () => {
				setStopOrbitRotation(false);
				newScene.updateCamera(sunMesh, true)
				newScene.INTERSECTED = null;
			})

			const animate = () => {
				sunMesh.rotation.y += 2 * Math.PI * (1 / 60) * (1 / 60);
				systemPlanets.forEach((planet) => {
					const {planetSystem, centerDistance, planetMesh, planetYear} = planet;
					if(!stopOrbitRotation){
						planetSystem.rotation.y += getPlanetOrbitSpeed(centerDistance) * 0.001;
					}

					planetMesh.rotation.y += planetYear;
					if(newScene.INTERSECTED?.uuid == planetMesh.uuid) {
						newScene.updateCamera(planetMesh)
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
		{planets.map((planet) => {
			<div key={planet.name}>
				<h3>{planet.name}</h3>
				<p>Distance from Sun: {planet.centerDistance} km</p>
				<p>Orbital period: {planet.planetYear} seconds</p>
			</div>
		})}
		</div>
    </div>
  );
}
