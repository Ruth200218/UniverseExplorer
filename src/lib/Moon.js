import * as THREE from "three";

export default class Moon {
  constructor(radius, distance, textureFile) {
    this.radius = radius;
    this.distance = distance;
    this.textureFile = textureFile;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
        const geometry = new THREE.SphereGeometry(this.radius);
        const texture = new THREE.TextureLoader().load(this.textureFile);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        const moonDeg = Math.PI / 3; 
        const moonPosition = new THREE.Vector3(
            Math.cos(moonDeg) * this.distance,
            0,
            Math.sin(moonDeg) * this.distance
        );

        this.mesh.position.copy(moonPosition);
        this.mesh.name = "moon";
    }
    return this.mesh;
  }
}
