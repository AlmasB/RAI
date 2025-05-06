import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MathUtils } from "three/src/math/MathUtils.js";
import { FireFlies } from './FireFlies';

const CAMERA_DISTANCE = 200;
const CameraOffset = new THREE.Vector3(0, 10, CAMERA_DISTANCE);


let instance: ThreeScene | undefined;

export default class ThreeScene {
	scene!: THREE.Scene;
	camera!: THREE.PerspectiveCamera;
	renderer!: THREE.WebGLRenderer;
	controls!: OrbitControls;
	clock!: THREE.Clock;
	pLights: THREE.Object3D[] = [];
	fireflies!: FireFlies;

	constructor(canvas: HTMLCanvasElement, width: number, height: number) {
		if (instance) return instance;

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
		this.camera.position.copy(CameraOffset);
		this.camera.updateProjectionMatrix();

		this.scene.add(new THREE.AmbientLight(0xffffff, 1));
		// this.scene.background = new THREE.Color(0x210F37);
		// const loader = new THREE.TextureLoader();
		// this.scene.background = loader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');

		const directLight = new THREE.DirectionalLight(0xffffff, 1);
		directLight.position.set(0, 100, 100);
		directLight.castShadow = true;
		directLight.target = new THREE.Object3D();
		directLight.target.position.set(0, 0, 0);

		this.scene.add(directLight);
		this.scene.add(directLight.target);

		this.renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
		});
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.toneMappingExposure = 0.5;

		this.controls = new OrbitControls(this.camera, canvas);
		this.renderer.setSize(width, height);

		this.clock = new THREE.Clock();

		instance = this;
	}

	dispose(): void {
		// Implement cleanup logic if needed
	}

	onFrameUpdate(stats?: { update: () => void }): void {

		this.pLights.forEach(l => l.userData.update());

		if (this.fireflies) {
			this.fireflies.update(this.clock.getDelta());
		}

		this.renderer.render(this.scene, this.camera);
		if (stats) stats.update();
	}

	resetControl(): void {
		this.controls.reset();
	}

	followTarget(elevation = 0, azimuth = 0): void {
		const diva = this.scene.getObjectByName("diva");
		if (!diva || !diva.children[0]) return;

		const objectPosition = new THREE.Vector3();
		diva.children[0].getWorldPosition(objectPosition);

		CameraOffset.x = Math.sin(MathUtils.degToRad(azimuth)) * CAMERA_DISTANCE;
		CameraOffset.y = Math.sin(MathUtils.degToRad(elevation)) * CAMERA_DISTANCE;
		CameraOffset.z = Math.cos(MathUtils.degToRad(azimuth)) * CAMERA_DISTANCE;

		const targetPos = new THREE.Vector3().addVectors(objectPosition, CameraOffset);
		this.camera.position.copy(targetPos);
		this.camera.lookAt(objectPosition);
	}

	setCamera(target: THREE.Object3D, elevation: number, azimuth: number): void {
		const spherical = new THREE.Spherical();
		spherical.radius = CAMERA_DISTANCE;
		spherical.phi = MathUtils.degToRad(elevation);
		spherical.theta = MathUtils.degToRad(azimuth);

		this.camera.position.setFromSpherical(spherical);
		this.camera.position.add(target.position);
		this.camera.lookAt(target.position);
	}

	_getOrbitObj(mesh: THREE.Mesh) {
		// orbit object
		const orbitObj = new THREE.Object3D();
		const radius = 30;
		mesh.position.x = radius;
		orbitObj.rotation.x = THREE.MathUtils.degToRad(90);
		orbitObj.rotation.y = Math.random() * Math.PI * 2;
		orbitObj.add(mesh);
		const rate = Math.random() * 0.01 + 0.005;
		const offset = Math.floor(Math.random() * 6);
		let roteZ = 0
		function update() {
			roteZ += rate;
			orbitObj.rotation.z = roteZ + offset;
		}
		orbitObj.userData = { update };
		return orbitObj;
	}

	_addGlow(mesh: THREE.Mesh, color: THREE.Color, geo: THREE.BufferGeometry) {
		const glowMat = new THREE.MeshBasicMaterial({
			color,
			transparent: true,
			opacity: 0.15
		});
		const glowMesh = new THREE.Mesh(geo, glowMat);
		glowMesh.scale.multiplyScalar(1.5);
		const glowMesh2 = new THREE.Mesh(geo, glowMat);
		glowMesh2.scale.multiplyScalar(2.5);
		const glowMesh3 = new THREE.Mesh(geo, glowMat);
		glowMesh3.scale.multiplyScalar(4);
		const glowMesh4 = new THREE.Mesh(geo, glowMat);
		glowMesh4.scale.multiplyScalar(6);

		mesh.add(glowMesh);
		mesh.add(glowMesh2);
		mesh.add(glowMesh3);
		mesh.add(glowMesh4);
	}

	getFirefly() {

		let hue = 0.6 + Math.random() * 0.2;

		const color = new THREE.Color().setHSL(hue, 1, 0.5);


		// more performant than PointLight
		const light = new THREE.SpotLight(color, 2);
		// light ball
		const geo = new THREE.IcosahedronGeometry(0.1, 2);
		const mat = new THREE.MeshBasicMaterial({ color });
		const mesh = new THREE.Mesh(geo, mat);

		mesh.add(light);

		const orbitObj = this._getOrbitObj(mesh);
		this._addGlow(mesh, color, geo);

		return orbitObj;
	}

	addfireflys(position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)): void {

		const fireflyGroup = new THREE.Group();
		this.scene.add(fireflyGroup);

		let pLight;
		for (let i = 0, numLights = 10; i < numLights; i += 1) {
			pLight = this.getFirefly();

			fireflyGroup.add(pLight);

			this.pLights.push(pLight);
		}

		fireflyGroup.position.copy(position);
	}

	fireFliesBg() {
		this.fireflies = new FireFlies(this.scene, {
			groupCount: 1,
			firefliesPerGroup: 50,
			groupRadius: 5,
			noiseTexture: null
		});

	}

	unload(target: THREE.Object3D): void {
		target.removeFromParent();
		target.traverse((child: any) => {
			// Dispose materials
			if (child.material && !child.material._isDisposed) {
				for (const value of Object.values(child.material) as any[]) {
					if (value?.dispose && !value._isDisposed) {
						value.dispose();
						value._isDisposed = true;
					}
				}
				child.material.dispose();
				child.material._isDisposed = true;
			}
			// Dispose geometry
			if (child.geometry?.dispose && !child.geometry._isDisposed) {
				child.geometry.dispose();
				child.geometry._isDisposed = true;
			}
		});
	}
}
