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
      this.mesh.position.x += this.distance;
      this.mesh.name = "moon";
    }
    return this.mesh;
  }
}
