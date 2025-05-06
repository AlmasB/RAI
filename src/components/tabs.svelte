<script lang="ts">
	import { base } from "$app/paths";
	let { tabs, ...contents } = $props();

	let tab = $state(0);

	const content_keys = Object.keys(contents);

	const content_array = content_keys.map((key) => {
		return contents[key];
	});
</script>

<div class="tabs">
	{#each tabs as name, index}
		<div class="tab active" class:active={tab === index}>
			<button
				class="tab"
				onclick={() => {
					tab = index;
				}}
			>
				{name}
			</button>
		</div>
	{/each}
</div>

{#each content_array as content_snippet, index}
	<div class="tab-content" class:active={tab === index}>
		<div
			class="decor"
			style="background-image: url({base}/images/decor.svg);"
		></div>
		{@render content_snippet()}
	</div>
{/each}

<style lang="scss">
	@use "../assets/global";

	.tabs {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;

		.tab {
			margin-right: calc(global.$margin-1 / 2);
			font-size: 24px;
			// clip-path: polygon(0 0, 95% 0, 100% 30%, 100% 100%, 0 100%);
			min-width: 200px;
			height: 60px;

			// @include global.flex-center;
			@include global.button-top;

			button {
				// background: none;
				// border: none;
				// color: inherit;
				// width: 100%;
				// height: 100%;
				// cursor: pointer;

				@include global.operation-font;
				@include global.button-bottom;
			}
		}
		.tab.active {
			// border-bottom: 2px solid #1954ec;

			background: linear-gradient(
				90deg,
				rgba(199, 172, 255, 0.6),
				rgba(255, 255, 255, 0.6)
			);
		}
	}

	.tab-content {
		position: relative;
		display: none;
		margin-top: calc(global.$margin-1 / 2);
		padding: calc(global.$margin-1 / 2) 0 0 0;
		flex: 1 1 auto;
		width: 100%;
		font-size: 24px;

		// .decor {
		// 	$w: 35px;
		// 	position: absolute;
		// 	width: $w;
		// 	height: 80%;
		// 	top: 10%;
		// 	// margin-top: -200px;
		// 	left: -50px;
		// 	background-size: 100% 100%;
		// 	background-repeat: no-repeat;
		// 	background-position: center;
		// }
	}
	.tab-content.active {
		display: block;
	}
</style>
