import * as THREE from "three";

export default class Ring {
  constructor(insideRadius, outsideRadius, segments, textureFile) {
    this.insideRadius = insideRadius;
    this.outsideRadius = outsideRadius;
    this.segments = segments;
    this.textureFile = textureFile;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const ringGeometry = new THREE.RingGeometry(this.insideRadius, this.outsideRadius, this.segments);
      const ringTexture = new THREE.TextureLoader().load(this.textureFile);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });


      this.mesh = new THREE.Mesh(ringGeometry, ringMaterial);

      this.mesh.rotation.x = Math.PI / 2;
      this.mesh.name = "ring";
    }
    return this;
  }
}
