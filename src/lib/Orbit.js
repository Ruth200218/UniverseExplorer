import * as THREE from "three";
import Sphere from "./Sphere";
import Ring from "./Ring";
import Rotation from "./Rotation";

export default class Orbit {
    constructor(config) {
        this.object = config.object;
        this.orbit = null;
        this.mesh = null;
        this.scene = config.scene;
        this.camera = config.camera;
        this.controls = config.controls;
        this.renderer = config.renderer;
        this.scene = config.scene;
    }

    setDirectionalLight(x, y, z, name = "mainDirectionalLight") {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-1, 0, 0);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.name = name;
        directionalLight.castShadow = true;

        console.log("directionalLight", directionalLight)
        this.scene.add(directionalLight);

        // const pointLight = new THREE.PointLight(0xffffff, 1);
        // pointLight.castShadow = true;
        // pointLight.shadow.mapSize.width = 4096;
        // pointLight.shadow.mapSize.height = 4096;
        // pointLight.shadow.camera.near = 1.5;
        // pointLight.shadow.camera.far = 30;
        // pointLight.shadow.radius = 16;
        // this.scene.add(pointLight);
    }

    setAmbientLight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
        this.scene.add(ambientLight);
    }

    getOrbSpeed(day, year) {
        const secondsInYear = year * day * 3600;
        const orbSpeed = (2 * Math.PI) / secondsInYear;
        return orbSpeed;
    }

    updateLightRota() {
        const light = this.scene.getObjectByName("mainDirectionalLight");
        if (light) {
            light.position.set(this.orbit.position.x, this.orbit.position.y, this.orbit.position.z);
        }
    }

    getPlanetRotationSpeed(day) {
        // calculate the rotation speed of the planet width the day in hours
        const KmPerSeconds = (2 * Math.PI) / day;
        return KmPerSeconds;
    }

    animate = () => {
        const { year, day } = this.object;
        // rotation of the planet
        this.mesh.rotation.y += this.getPlanetRotationSpeed(day) * 0.001;
        // rotation of the orbit
        this.orbit.rotation.y += this.getOrbSpeed(year, day) + 0.0001;
        requestAnimationFrame(this.animate);
    }

    getMesh() {
        const object = this.object;
        if (this.orbit === undefined || this.orbit === null) {

            const planet = new Sphere(object.radius, object.distance, object.texture, object.prefix);
            this.mesh = planet.getMesh();

            // name 
            this.mesh.name += (object.prefix ? "_" : '') + object.name;

            if (object.isMainStar) {
                const texture = new THREE.TextureLoader().load(object.texture);
                this.mesh.position.set(0, 0, 0);
                // change material
                this.mesh.material.emissiveIntensity = 1
                this.mesh.material.emissive = new THREE.Color(0xffffff)
                this.mesh.material.emissiveMap = texture
            } else {
                this.mesh.receiveShadow = true;
                this.mesh.castShadow = true;
            }

            this.orbit = new THREE.Group();
            this.orbit.add(this.mesh);


            // has orbit parent
            if (object.orbitParent) {
                object.orbitParent.add(this.orbit);
            }

            if (object.directionalLight) {
                this.setDirectionalLight(this.orbit.position.x, this.orbit.position.y, this.orbit.position.z);
            }

            if (object.ambientLight) {
                this.setAmbientLight();
            }


            if (object.planets) {
                object.planets.forEach(planet => {
                    planet.prefix = "planet";
                    const planetOrbit = new Orbit({
                        object: planet,
                        scene: this.scene,
                        camera: this.camera,
                        controls: this.controls,
                        renderer: this.renderer,
                        orbitParent: this.orbit,
                    });

                    const { orbit, mesh } = planetOrbit.getMesh();
                    this.orbit.add(orbit);
                });
            }

            if (object.moons) {
                object.moons.forEach(moon => {
                    moon.prefix = "moon";
                    const planetOrbit = new Orbit({
                        object: moon,
                        scene: this.scene,
                        camera: this.camera,
                        controls: this.controls,
                        renderer: this.renderer,
                        orbitParent: this.orbit
                    });

                    const { orbit, mesh } = planetOrbit.getMesh();
                    this.mesh.add(orbit);
                });
            }

            if (object.rings) {
                object.rings.forEach(ring => {
                    const ringOrbit = new Ring(
                        ring.insideRadius,
                        ring.outsideRadius,
                        ring.segments,
                        ring.textureFile
                    );
                    this.mesh.add(ringOrbit.getMesh());
                });
            }

            if (object.layers) {
                object.layers?.forEach(layer => {
                    const newLayer = new Sphere(layer.radius, 0, layer.texture);
                    const layerMesh = newLayer.getMesh();
                    // planet opacities
                    layerMesh.material.transparent = layer.opacity ? true : false;
                    layerMesh.material.opacity = layer.opacity;
                    this.mesh.add(layerMesh);
                })
            }

            const rotation = new Rotation(this.mesh);
            this.orbit.add(rotation.getMesh());

            if (!object.isMainStar) {
                this.animate();
            }
        }

        return this;
    }
}
