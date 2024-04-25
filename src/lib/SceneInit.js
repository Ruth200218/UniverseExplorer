import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  constructor(fov = 75, camera, scene, stats, controls, renderer) {
    this.fov = fov;
    this.scene = scene;
    //this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.rayCaster = null;
    this.INTERSECTED = null;
    this.pointer = null;
    this.initialDistance = 20;
    this.initialX = null;
    this.initialY = null;
    this.sunInitialDistance = 128;
  }

  initScene(setStopOrbitRotation, element) {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    this.camera.position.z = 128;

    this.camera.enableDamping = true;

    this.scene = new THREE.Scene();

    // rayCaster
    this.rayCaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // light
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    // this.scene.add(ambientLight);

    // const spaceTexture = new THREE.TextureLoader().load("space2.jpeg");
    // this.scene.background = spaceTexture;

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    this.renderer = new THREE.WebGLRenderer({
      canvas: element,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    element.classList.add('canvas-init')
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.enableDamping = true;

    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);
    this.renderer.domElement.addEventListener('click', (event) => this.onPointerClick(event, setStopOrbitRotation), false);
    this.renderer.domElement.addEventListener('wheel', (event) => this.onWheel(event), false);
    this.renderer.domElement.addEventListener('scroll', (event) => this.onWheel(event), false);

    //this.renderer.domElement.addEventListener('mousedown', (event) => this.onMouseDown(event, setStopOrbitRotation), false);
    //this.renderer.domElement.addEventListener('mouseup', (event) => this.onMouseUp(event, setStopOrbitRotation), false);
    //this.renderer.domElement.addEventListener('mousemove', (event) => this.onMove(event), false);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  // onMouseDown(event, setStopOrbitRotation) {
  //   if (this.INTERSECTED) {
  //     setStopOrbitRotation(true)
  //   }
  // }

  // onMouseUp(event, setStopOrbitRotation) {
  //   setStopOrbitRotation(false)
  // }

  onWheel(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    this.initialDistance += delta;
  }

  selectPlanet(planetName) {
    const planet = this.scene.getObjectByName('planet_' + planetName);
    this.INTERSECTED = planet;
    this.updateCamera(planet);
  }

  onPointerClick(event, setStopOrbitRotation) {
    event.stopPropagation()

    const closest = event.target === this.renderer.domElement;
    if (!closest) return;

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.rayCaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.rayCaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object instanceof THREE.Mesh && object.parent instanceof THREE.Group && object.name.includes('planet') && i == intersects.length - 1) {
          this.INTERSECTED = object;
          //this.updateCamera(this.INTERSECTED)
          //setStopOrbitRotation(true);
        }
      }
    }
  }

  planetPosition(planetMesh) {
    const planetPosition = new THREE.Vector3();
    planetPosition.setFromMatrixPosition(planetMesh.matrixWorld);
    return planetPosition;
  }

  planetTargetPosition(planetMesh) {
    const planetPosition = this.planetPosition(planetMesh);
    const targetPosition = planetPosition.clone().add(new THREE.Vector3(0, 0, this.initialDistance))
    return { targetPosition, planetPosition };
  }

  updateCamera(planetMesh, controls = false) {
    if (planetMesh) {
      const planetPosition = this.planetPosition(planetMesh);

      //planetPosition.y += 1;

      const currentDistance = this.camera.position.distanceTo(planetPosition);
      const scale = this.initialDistance / currentDistance;

      this.camera.position.sub(planetPosition).multiplyScalar(scale).add(planetPosition);

      this.controls.target = planetPosition
      this.controls.update();
      this.camera.lookAt(planetPosition);
    }
  }

  animate() {
    // requestAnimationFrame(this.animate.bind(this));
    requestAnimationFrame(this.animate.bind(this));
    this.render();
    //this.stats.update();
    //this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
