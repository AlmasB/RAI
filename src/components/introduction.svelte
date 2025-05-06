<script lang="ts">
	import { base } from "$app/paths";

	export let current_section_index;
</script>

<div class="intro">
	<!-- <div class="top-bar">
		<div class="nav"><a href="#projects">Projects</a></div>
		<div class="nav"><a href="#team">Team</a></div>
		<div class="nav"><a href="#joinus">Join Us</a></div>
	</div> -->
	<div class="desc">
		<div
			class="desc-inner"
			style="background-image: url({base}/images/intro-background.png);"
		>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
			officiis exercitationem sapiente labore praesentium, omnis porro
			tempore tenetur placeat veniam soluta itaque magnam.
		</div>
	</div>

	<div class="scroll" class:invisible={current_section_index !== 0}>
		<a href="#projects">Scroll to explore</a>
		<div class="container">
			<div class="chevron"></div>
			<div class="chevron"></div>
			<div class="chevron"></div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "../assets/global";

	.intro {
		width: 100%;
		height: 100%;

		@include global.flex-center;

		// .top-bar {
		// 	width: 100%;
		// 	display: flex;
		// 	flex-direction: row;
		// 	height: global.$top-bar-height;
		// 	align-items: center;
		// 	justify-content: flex-start;
		// 	margin-bottom: global.$margin-1;

		// 	.nav {
		// 		text-transform: uppercase;
		// 		font-size: 18px;
		// 		margin-right: 36px;
		// 		letter-spacing: 4px;
		// 		width: 180px;
		// 		height: global.$top-bar-height;
		// 		color: global.$font-white;

		// 		@include global.button-top;

		// 		&:last-child {
		// 			border-right: none;
		// 		}

		// 		a {
		// 			@include global.button-bottom;
		// 		}
		// 	}
		// }

		.desc {
			width: 100%;
			min-height: 0;
			flex: 1 1 auto;
			@include global.flex-center;

			.desc-inner {
				width: 58%;
				margin-left: -12%;
				// color: global.$font-white;
				font-size: 64px;
				will-change: transform;
				background-color: global.$font-white;
				background-repeat: no-repeat;
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				animation: rotateBackground 10s linear infinite;

				@include global.flex-center;
			}

			@keyframes rotateBackground {
				0% {
					background-position: -40% 50%;
				}
				25% {
					background-position: 40% 50%;
				}
				50% {
					background-position: 120% 50%;
				}
				75% {
					background-position: 40% 50%;
				}
				100% {
					background-position: -40% 50%;
				}
			}
		}

		.scroll {
			text-transform: uppercase;
			position: absolute;
			bottom: 40px;
			right: 80px;
			height: 30px;
			cursor: pointer;

			@include global.flex-center;
			@include global.opacity-ease;
			@include global.operation-font;

			a {
				@include global.link;
			}

			.container {
				$base: 4px;
				$size: 20px;

				display: flex;
				justify-content: center;
				align-items: center;
				width: $size;
				height: $size;
				margin: $size * -1.5 0 0 $size;

				.chevron {
					position: absolute;
					width: $base * 3.5;
					height: $base * 0.8;
					opacity: 0;
					transform: scale(0.3);
					animation: move-chevron 3s ease-out infinite;
				}

				.chevron:first-child {
					animation: move-chevron 3s ease-out 1s infinite;
				}

				.chevron:nth-child(2) {
					animation: move-chevron 3s ease-out 2s infinite;
				}

				.chevron:before,
				.chevron:after {
					content: "";
					position: absolute;
					top: 0;
					height: 100%;
					width: 50%;
					background: #fff;
				}

				.chevron:before {
					left: 0;
					transform: skewY(30deg);
				}

				.chevron:after {
					right: 0;
					width: 50%;
					transform: skewY(-30deg);
				}

				@keyframes move-chevron {
					25% {
						opacity: 1;
					}
					33.3% {
						opacity: 1;
						transform: translateY($base * 3.8);
					}
					66.6% {
						opacity: 1;
						transform: translateY($base * 5.2);
					}
					100% {
						opacity: 0;
						transform: translateY($base * 8) scale(0.5);
					}
				}
			}
		}
	}
</style>
