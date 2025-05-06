<script lang="ts">
	import { base } from "$app/paths";

	const projects = [
		{
			title: "Multi-modal Control for Robotic Devices",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat harum doloremque.",
			content: content1,
		},
		{
			title: "Central Artificial Intelligence",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat harum doloremque.",
			content: content2,
		},
	];

	let active_project_index = $state(0);
</script>

{#snippet content1()}
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos
		tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores
		tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat
		harum doloremque.
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos
		tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores
		tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat
		harum doloremque.
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos
		tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores
		tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat
		harum doloremque.
	</p>
{/snippet}

{#snippet content2()}
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos
		tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores
		tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat
		harum doloremque.
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, eos
		tempore voluptatum quisquam saepe sed pariatur enim quibusdam asperiores
		tempora earum quis aliquid repudiandae dolores quaerat voluptate fugiat
		harum doloremque.
	</p>
{/snippet}

<div class="projects">
	<!-- <div class="desc">
		<i> Advancing closer to the future of intelligent systems.</i>
	</div> -->

	<div class="project-detail">
		<div
			class="decor"
			style="background-image: url({base}/images/decor.svg);"
		></div>
		<div class="title">{projects[active_project_index].title}</div>
		<div class="detail">
			{@render projects[active_project_index].content()}
		</div>
	</div>

	<div class="project-list">
		{#each projects as project, i}
			<div class="project-item" class:active={active_project_index === i}>
				<button
					onclick={() => {
						active_project_index = i;
					}}
				>
					<div class="title">
						<div
							class="bullet"
							class:hidden={active_project_index === i}
						></div>
						<h2>{project.title}</h2>
					</div>

					<p class:hidden={active_project_index !== i}>
						{project.desc}
					</p>
				</button>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "../assets/global";

	.projects {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: calc(global.$margin-1 * 2) global.$margin-1 0
			calc(global.$margin-1 * 7 / 3);

		.project-list {
			width: 480px;
			margin-right: global.$margin-1;
			flex-shrink: 0;

			.project-item {
				box-sizing: border-box;
				margin-bottom: calc(global.$margin-1/2);

				@include global.glassblur(2px);

				&.active {
					padding: calc(global.$margin-1 / 2);
					background: linear-gradient(
						140deg,
						rgba(255, 255, 255, 0.8),
						rgba(199, 172, 255, 0.8)
					);
					clip-path: polygon(
						0 0,
						100% 0,
						100% 90%,
						96% 100%,
						0% 100%
					);
				}

				&:not(.active) {
				}

				.title {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
					.bullet {
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: global.$font-white;
						margin-right: calc(global.$margin-1/2);
					}

					h2 {
						@include global.operation-font;

						font-size: 24px;
					}
				}
				p {
					font-size: 18px;
				}
			}
		}

		.project-detail {
			position: relative;
			flex: 1 1 auto;
			height: 100%;
			margin-right: global.$robot-margin;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;

			.decor {
				position: absolute;
				width: 35px;
				height: 400px;
				top: 50%;
				margin-top: -200px;
				left: -50px;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center;
			}

			.title {
				@include global.operation-font;

				font-size: 32px;
				margin-bottom: calc(global.$margin-1 / 2);
			}

			.detail {
				@include global.glassblur(2px);
				padding: calc(global.$margin-1 / 2) 0;

				font-size: 18px;
			}
		}
	}
</style>
