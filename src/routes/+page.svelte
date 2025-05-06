<script lang="ts">
	import { base } from "$app/paths";
	import { browser } from "$app/environment";
	import * as THREE from "three";
	import { onMount, onDestroy } from "svelte";
	import ThreeScene from "../lib/ThreeScene";
	import {
		loadFbx,
		loadJSON,
		play_action,
		visibleWidthAtZDepth,
	} from "../lib/ropes";
	import Loader from "../components/loader.svelte";
	import Introduction from "../components/introduction.svelte";
	import Projects from "../components/projects.svelte";
	import Staff from "../components/staff.svelte";
	import Students from "../components/students.svelte";
	import Joinus from "../components/joinus.svelte";
	import "fullpage.js/dist/fullpage.css";

	let loading = $state(true);

	type Section2 = {
		anchor: HTMLElement | undefined;
		index: number;
		isActive: boolean;
		isFirst: boolean;
		isLast: boolean;
		item: HTMLElement;
	};

	let threeScene: ThreeScene;

	let canvas: HTMLCanvasElement;

	let animation_pointer = 0;

	let mixer: THREE.AnimationMixer | undefined = undefined;

	let idle_action: THREE.AnimationAction | undefined = undefined;

	let new_action: THREE.AnimationAction | undefined = undefined;

	let animation_mapping: Array<THREE.AnimationClip | undefined> = [];

	let current_section_index = $state(0);

	let play_animation = $state(false);

	let time_elapsed = 0;

	const clock = new THREE.Clock();

	function animate() {
		if (mixer) {
			mixer.update(clock.getDelta());
		}

		if (performance.now() - time_elapsed >= 10000) {
			play_animation = true;

			time_elapsed = performance.now();
		}

		// update physics world and threejs renderer
		threeScene.onFrameUpdate();

		animation_pointer = requestAnimationFrame(animate);
	}

	function onAnimationFinished() {
		if (!mixer) {
			return;
		}

		if (new_action) {
			new_action.fadeOut(0.2);
		}

		if (idle_action) {
			play_action(idle_action);
		}
	}

	onMount(async () => {
		/** @ts-ignore */
		const fullpage = (await import("fullpage.js")).default;

		new fullpage("#fullpage", {
			// licenseKey: "YOUR_KEY_HERE",
			anchors: [
				"introduction",
				"projects",
				"staff",
				"students",
				"joinus",
			],
			autoScrolling: true,
			scrollBar: false,
			scrollOverflow: false,
			loopTop: false,
			loopBottom: false,
			navigation: true,
			navigationPosition: "right",
			afterRender: function (origin: Section2) {
				current_section_index = origin.index;
			},
			beforeLeave: (_: Section2, destination: Section2) => {
				current_section_index = destination.index;
				// fired right before leaving the section, just before the transition takes place.
				// cancel the scroll by returning false.
				time_elapsed = performance.now();

				return true;
			},
			afterLoad: () => {
				play_animation = true;
			},
		});

		threeScene = new ThreeScene(
			canvas,
			document.documentElement.clientWidth,
			document.documentElement.clientHeight,
		);

		const visible_width = visibleWidthAtZDepth(0, threeScene.camera);

		const initial_x = visible_width * 0.118;

		Promise.all([
			loadFbx(
				`${base}/character3967ecff-8E949CFF.fbx`,
				"eva",
				new THREE.Vector3(initial_x, -120, 0),
				new THREE.Euler(0, -0.5, 0),
			),
			loadJSON(`${base}/idle.json`),
			loadJSON(`${base}/happy.json`),
			loadJSON(`${base}/thankful.json`),
			loadJSON(`${base}/clapping.json`),
			loadJSON(`${base}/house-dancing.json`),
			loadJSON(`${base}/greeting.json`),
			new Promise((resolve) =>
				setTimeout(
					resolve,
					process.env.NODE_ENV === "production" ? 1500 : 1000,
				),
			) /** minimum loading time */,
		])
			.then(
				([eva, idle, happy, thankful, clapping, dancing, greeting]) => {
					threeScene.scene.add(eva);

					const idle_clip = THREE.AnimationClip.parse(idle);
					const happy_clip = THREE.AnimationClip.parse(happy);
					const thankful_clip = THREE.AnimationClip.parse(thankful);
					const clapping_clip = THREE.AnimationClip.parse(clapping);
					const dancing_clip = THREE.AnimationClip.parse(dancing);
					const greeting_clip = THREE.AnimationClip.parse(greeting);

					animation_mapping.push(happy_clip);
					animation_mapping.push(thankful_clip);
					animation_mapping.push(clapping_clip);
					animation_mapping.push(dancing_clip);
					animation_mapping.push(greeting_clip);

					mixer = new THREE.AnimationMixer(eva);

					mixer.addEventListener("finished", onAnimationFinished);

					idle_action = mixer.clipAction(idle_clip);

					play_action(idle_action);

					loading = false;
				},
			)
			.finally(() => {
				// remove loading screen
				// loading = false;
			});

		animate();
	});

	$effect(() => {
		if (!play_animation) {
			return;
		}

		if (idle_action && idle_action.isRunning()) {
			idle_action.fadeOut(0.2);
		}

		if (new_action && new_action.isRunning()) {
			new_action.fadeOut(0.2);
		}

		const clip = animation_mapping[current_section_index];

		if (mixer && clip instanceof THREE.AnimationClip) {
			new_action = mixer.clipAction(clip);

			play_action(new_action, THREE.LoopOnce, 1);
		}

		play_animation = false;
	});

	onDestroy(() => {
		if (browser) {
			cancelAnimationFrame(animation_pointer);

			if (mixer) {
				mixer.stopAllAction();

				mixer.removeEventListener("finished", onAnimationFinished);
			}

			threeScene.dispose();
		}
	});
</script>

<div
	class="overall-bg"
	style="background-image: url({base}/images/bg.png);"
></div>

<div class="canvas-box">
	<canvas bind:this={canvas}></canvas>
</div>

<div id="fullpage">
	<div class="section"><Introduction {current_section_index} /></div>
	<div class="section"><Projects /></div>
	<div class="section"><Staff /></div>
	<div class="section"><Students /></div>
	<div class="section"><Joinus /></div>
</div>

<div class="top-bar">
	<div class="logo">
		<img src="{base}/images/logo.png" alt="" width="32px" height="32px" />
		<div>
			<span class:invisible={current_section_index !== 0}>
				Brighton AI Robotics (AIR) Force Projects</span
			>
			<span class:invisible={current_section_index !== 1}
				>Research Projects</span
			>
			<span class:invisible={current_section_index !== 2}>Staff</span>
			<span class:invisible={current_section_index !== 3}>Students</span>
			<span class:invisible={current_section_index !== 4}
				>Study or Work With Us</span
			>
		</div>
	</div>

	<div class="navs">
		<div class="nav" class:active={current_section_index === 0}>
			<a href="#introduction">Intro</a>
		</div>
		<div class="nav" class:active={current_section_index === 1}>
			<a href="#projects">Projects</a>
		</div>
		<div class="nav" class:active={current_section_index === 2}>
			<a href="#staff">Staff</a>
		</div>
		<div class="nav" class:active={current_section_index === 3}>
			<a href="#students">Students</a>
		</div>
		<div class="nav" class:active={current_section_index === 4}>
			<a href="#joinus">Join Us</a>
		</div>
	</div>
</div>

{#if loading}
	<Loader />
{/if}

<style lang="scss">
	@use "../assets/global";

	:global {
		#fp-nav.fp-right {
			right: 36px;
			ul {
				li {
					width: 36px;
					height: 36px;
					margin: 18px;
					a {
						span {
							background: white;
						}
					}
				}
			}
		}

		.fp-slidesNav {
			right: 36px;
			ul {
				li {
					width: 20px;
					height: 20px;
					margin: 12px;
					a {
						span {
							background: white;
						}
					}
				}
			}
		}
	}

	.overall-bg {
		// background: radial-gradient(
		// 	ellipse at 70% 50%,
		// 	#392256 0%,
		// 	#210f37 40%,
		// 	#040126 100%
		// );
		min-height: 100vh;
		width: 100%;
		margin: 0;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -99;
		// strech the background image to cover the whole screen
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.canvas-box {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -9;
		canvas {
			width: 100%;
			height: 100%;
		}
	}

	#fullpage {
		background-color: transparent;

		.section {
			height: 100vh;
			box-sizing: border-box;
			display: flex;
			position: relative;
			color: global.$font-white;
			background-color: transparent;
			padding: global.$margin-1;
			overflow: hidden;
		}
	}

	.top-bar {
		position: fixed;
		top: global.$margin-1;
		left: 0;
		width: 100%;
		flex-direction: row;
		height: global.$top-bar-height;
		color: global.$font-white;
		padding: 0 global.$margin-1 * 2;
		box-sizing: border-box;

		@include global.flex-between;

		.logo {
			@include global.flex-center;

			img {
				$size: 32px;

				margin-right: calc(global.$margin-1 * 4 / 3 - $size);
				background-color: global.$font-white;
			}

			& > div {
				position: relative;
				width: 660px;
				height: 32px;

				span {
					font-size: 32px;
					font-weight: bold;
					position: absolute;
					top: 4px;
					left: 0;

					@include global.opacity-ease;
					@include global.operation-font;
				}
			}
		}

		.navs {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			.nav {
				text-transform: uppercase;
				font-size: 24px;
				font-weight: bold;
				margin-right: global.$margin-1;
				letter-spacing: 2px;
				width: 130px;
				height: global.$top-bar-height;
				box-sizing: border-box;

				@include global.flex-center;
				@include global.operation-font;

				&.active {
					border-bottom: 4px solid global.$font-white;
				}

				a {
					color: inherit;

					@include global.link;
				}
			}
		}
	}
</style>
