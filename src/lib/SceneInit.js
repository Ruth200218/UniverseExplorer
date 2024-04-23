import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  constructor(fov = 36, camera, scene, stats, controls, renderer) {
    this.fov = fov;
    this.scene = scene;
    //this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.rayCaster = null;
    this.INTERSECTED = null;
    this.pointer = null;
  }

  initScene(setStopOrbitRotation, element) {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 128;

    this.scene = new THREE.Scene();

    this.rayCaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();

    // const spaceTexture = new THREE.TextureLoader().load("space2.jpeg");
    // this.scene.background = spaceTexture;

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    this.renderer = new THREE.WebGLRenderer({
      canvas: element,
      antialias: true,
    });
    element.classList.add('canvas-init')
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.enableDamping = true;

    // this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    document.addEventListener( 'click', (event) => this.onPointerClick(event, setStopOrbitRotation), false);
    document.addEventListener( 'mousemove', (event) => this.onPointerMove(event, setStopOrbitRotation), false);
    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  onPointerMove( event, setStopOrbitRotation ) {
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.rayCaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.rayCaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            const object = intersects[i].object;
            if(!this.INTERSECTED) {
              if(object instanceof THREE.Mesh && object.parent instanceof THREE.Group && object.name == "planet" && i == intersects.length - 1) {
                setStopOrbitRotation(true);
              }else {
                setStopOrbitRotation(false);
              }
            }
        }
    }
  }

  onPointerClick( event, setStopOrbitRotation ) {
    event.stopPropagation()
    this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.rayCaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.rayCaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            const object = intersects[i].object;
            if(object instanceof THREE.Mesh && object.parent instanceof THREE.Group && object.name == "planet" && i == intersects.length - 1) {
              this.INTERSECTED = object;
              //this.updateCamera(this.INTERSECTED)
              //setStopOrbitRotation(true);
            }
        }
    }
  }

  updateCamera(planetMesh, controls = false) {
    if (planetMesh) {
      const planetPosition = new THREE.Vector3();
      planetPosition.setFromMatrixPosition(planetMesh.matrixWorld);

      const calculatedDistance = planetMesh.geometry.parameters.radius + 20;
      const targetPosition = planetPosition.clone().add(new THREE.Vector3(0, 12, calculatedDistance)); 

      this.camera.position.lerp(targetPosition, 0.1);
      this.camera.lookAt(planetPosition);


      this.controls.enabled = controls;

      this.controls.target = planetPosition;
      this.controls.update();
      //this.INTERSECTED = null;
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
