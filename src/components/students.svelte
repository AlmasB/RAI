<script lang="ts">
	import { base } from "$app/paths";

	type STUDENT = {
		name: string;
		project: string;
		image: string;
		social: Array<{
			url: string;
			icon: string;
		}>;
	};

	const STUDENT_LIST: STUDENT[] = [
		{
			name: "Sajjad Hussain",
			project: "Multi-modal Robotics Control",
			image: `${base}/images/team/sh.png`,
			social: [
				{
					url: "https://linkedin.com",
					icon: "fas fa-user-circle",
				},
			],
		},
		{
			name: "Ola Ezekiel",
			project: "Emotion Recognition and Analysis",
			image: `${base}/images/team/ote.png`,
			social: [
				{
					url: "https://linkedin.com",
					icon: "fas fa-user-circle",
				},
			],
		},
		{
			name: "Awes Mubarak",
			project: "Determinism in Large Language Models",
			image: `${base}/images/team/am.png`,
			social: [
				{
					url: "https://linkedin.com",
					icon: "fas fa-user-circle",
				},
			],
		},
		{
			name: "Hansen Han",
			project: "Text-conditioned Human Motion Generation",
			image: `${base}/images/team/hh.png`,
			social: [
				{
					url: "https://linkedin.com",
					icon: "fas fa-user-circle",
				},
			],
		},
		{
			name: "TBC New Researcher",
			project: "Research Project",
			image: `${base}/images/placeholder.jpg`,
			social: [
				{
					url: "https://linkedin.com",
					icon: "fas fa-user-circle",
				},
			],
		},
	];
</script>

{#snippet student(data: STUDENT)}
	<div class="member">
		<div class="content">
			<div class="line"></div>
			<div class="u">
				<img src={data.image} alt={data.name} />
				<span class="name">{data.name}</span>
				<div class="social">
					{#each data.social as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.icon}
						>
							<i class={link.icon}></i>
						</a>
					{/each}
				</div>
			</div>
			<div class="l">
				<p>{data.project}</p>
			</div>
		</div>
	</div>
{/snippet}

<div class="students">
	{#each STUDENT_LIST as data}
		{@render student(data)}
	{/each}
	<div
		class="decor l"
		style="background-image: url({base}/images/decor1.svg);"
	></div>
	<div
		class="decor r"
		style="background-image: url({base}/images/decor1.svg);"
	></div>
</div>

<style lang="scss">
	@use "../assets/global";
	.students {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: calc(global.$margin-1 * 2) calc(global.$margin-1 * 7 / 2)
			calc(global.$margin-1 * 2) calc(global.$margin-1 * 10 / 3);

		.decor {
			position: absolute;
			width: 4px;
			height: 540px;
			top: 50%;
			margin-top: -270px;

			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center;

			&.l {
				left: calc(global.$margin-1 * 2);
			}
			&.r {
				right: calc(global.$margin-1 * 2);
				transform: rotate(180deg);
			}
		}

		.member {
			width: 49%;
			height: 80px;
			display: flex;
			flex-direction: row;
			align-items: center;

			&:nth-child(even) {
				justify-content: flex-end;
			}

			&:nth-child(odd) {
				justify-content: flex-start;
			}

			.content {
				width: 560px;
				position: relative;

				@include global.glassblur(2px);

				.line {
					width: 100%;
					height: 1px;
					margin-bottom: calc(global.$margin-1 / 2);
					background: linear-gradient(
						to left,
						rgba(112, 88, 213, 0.15) 15%,
						rgb(112, 88, 213) 100%
					);
				}

				.u {
					width: 100%;
					height: 80px;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
					margin-bottom: calc(global.$margin-1/2);
					padding: calc(global.$margin-1 / 2);
					box-sizing: border-box;
					border-left: 4px solid global.$font-white;

					background-color: rgb(38, 34, 65);
					clip-path: polygon(
						0 0,
						100% 0,
						100% 70%,
						96% 100%,
						0% 100%
					);

					img {
						width: 50px;
						height: 50px;
						border-radius: 50%;
						margin-right: calc(global.$margin-1/2);
					}

					.name {
						font-size: 24px;
						margin-right: calc(global.$margin-1 / 2);

						@include global.operation-font;
					}

					a {
						i {
							color: global.$font-white;
							font-size: 24px;
						}
					}
				}

				.l {
					font-size: 20px;
				}
			}
		}
	}
</style>
