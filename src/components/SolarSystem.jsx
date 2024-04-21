'use client'
import * as THREE from "three";
import SceneInit from "../lib/SceneInit";
import { useEffect, useState } from "react";
import Planet from "../lib/Planet";
import Rotation from "../lib/Rotation";

export default function SolarSystem() {
	const [planets, setPlanets] = useState([
		{
			'name': 'mercury',
			radius: 2,
			positionX: 16,
			texture: "mercury.png",
			sunDistance: 57.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'venus',
			radius: 3,
			positionX: 32,
			texture: "venus.jpeg",
			sunDistance: 108.2e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'earth',
			radius: 1,
			positionX: 48,
			texture: "earth.jpeg",
			sunDistance: 149.6e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'mars',
			radius: 3,
			positionX: 64,
			texture: "mars.jpeg",
			sunDistance: 227.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		},
		{
			'name': 'mars 1',
			radius: 3,
			positionX: 32,
			texture: "earth.jpeg",
			sunDistance: 255.9e6,
			planetYear: 2 * Math.PI * (1 / 60) * (1 / 60),
		}
	]);
	
  useEffect(() => {
	let gui;
	const scalePlane = 1e6;

	const getPlanetOrbitSpeed = (distanceSunPlanet) => {
		const G = 6.67430e-11 / scalePlane;
		const sunWeight = 1.989e30 / scalePlane; 
		const orbitPlanetSpeed = Math.sqrt((G * sunWeight) / distanceSunPlanet);
		return orbitPlanetSpeed / 1000;
	}

	const initGui = async () => {
	  const dat = await import("dat.gui");
	  gui = new dat.GUI();
	};

	const initScene = async () => {
		const setStopOrbitRotation = (value) => (stopOrbitRotation = value);

		let newScene = new SceneInit();
		newScene.initScene(setStopOrbitRotation);
		newScene.animate();
	
		const sunGeometry = new THREE.SphereGeometry(20);
		const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
		const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
		const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
		const solarSystem = new THREE.Group();
		solarSystem.add(sunMesh);

		newScene.scene.add(solarSystem);

		let systemPlanets = [];
		planets.forEach(planet => {
			const newPlanet = new Planet(planet.radius, (planet.sunDistance / scalePlane), planet.texture);
			const planetMesh = newPlanet.getMesh();
			let planetSystem = new THREE.Group();
			planetMesh.name = 'planet';
			planetSystem.add(planetMesh);

			solarSystem.add(planetSystem);

			planetMesh.receiveShadow = true;
			planetMesh.castShadow = true;

			const rotation = new Rotation(planetMesh);
			const rotationMesh = rotation.getMesh();
			planetSystem.add(rotationMesh);

			systemPlanets.push({
				name: planet.name,
				planet: newPlanet,
				planetMesh, 
				planetSystem,
				sunDistance : planet.sunDistance / scalePlane,
				planetYear: planet.planetYear,
				rotationMesh
			});

			// on click 3d planet show planet info
			planetMesh.addEventListener("click", () => {
				console.log(planet.name);
			})
		});

		// await initGui();
		// const solarSystemGui = gui.addFolder("solar system");

		// systemPlanets.forEach((planet) => {
		// 	const {rotationMesh} = planet;
		// 	solarSystemGui.add(rotationMesh, "visible").name(planet.name).listen();
		// })

		let stopOrbitRotation = false;

		window.addEventListener("mousedown", () => {
			//setStopOrbitRotation(true);
		})
		window.addEventListener("mouseup", () => {
			//setStopOrbitRotation(true);
		})

	
		const animate = () => {
			sunMesh.rotation.y += 2 * Math.PI * (1 / 60) * (1 / 60);
			systemPlanets.forEach((planet) => {
				const {planetSystem, sunDistance, planetMesh, planetYear} = planet;
				if(!stopOrbitRotation){
					planetSystem.rotation.y += getPlanetOrbitSpeed(sunDistance) * 0.001;
				}

				planetMesh.rotation.y += planetYear;
				if(newScene.INTERSECTED?.uuid == planetMesh.uuid) {

				}
			})
			requestAnimationFrame(animate);
		};
		animate();
	  }
	
	initScene();
  }, [planets]);

  return (
    <div className="flex flex-col items-center justify-center">
      	<canvas id="myThreeJsCanvas" />
		<div id="planets-list">
		{planets.map((planet) => {
			<div key={planet.name}>
				<h3>{planet.name}</h3>
				<p>Distance from Sun: {planet.sunDistance} km</p>
				<p>Orbital period: {planet.planetYear} seconds</p>
			</div>
		})}
		</div>
    </div>
  );
}
