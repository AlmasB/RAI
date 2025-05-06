<script lang="ts">
	import { base } from "$app/paths";

	type Staff = {
		name: string;
		role: string;
		image: string;
		social: Array<{
			url: string;
			icon: string;
		}>;
	};

	const STAFF_LIST: Staff[] = [
		{
			name: "Dr Almas Baim",
			role: "Lead Software Architect, Co-Founder",
			image: `${base}/images/team/ab.png`,
			social: [
				{
					url: "https://research.brighton.ac.uk/en/persons/almas-baimagambetov",
					icon: "fas fa-user-circle",
				},
				{
					url: "https://github.com/AlmasB/",
					icon: "fab fa-github",
				},
				{
					url: "https://www.youtube.com/@AlmasB0",
					icon: "fab fa-youtube",
				},
			],
		},
		{
			name: "Dr Khizer Saeed",
			role: "Engineering Lead, Co-Founder",
			image: `${base}/images/placeholder.jpg`,
			social: [
				{
					url: "https://research.brighton.ac.uk/en/persons/khizer-saeed",
					icon: "fas fa-user-circle",
				},
			],
		},
		{
			name: "Dr Shanay Rab",
			role: "Metrology, Machine Design, Automation, and Robotics.",
			image: `${base}/images/team/sr.png`,
			social: [
				{
					url: "https://research.brighton.ac.uk/en/persons/shanay-rab",
					icon: "fas fa-user-circle",
				},
			],
		},
	];

	let active_staff_index = $state(0);
</script>

{#snippet staff(member: Staff)}
	<div class="profile">
		<img src={member.image} alt={member.name} />
		<div class="r">
			<h3>{member.name}</h3>
			<p>{member.role}</p>
			<div class="social">
				{#each member.social as link}
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
	</div>
	<div class="desc">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde recusandae
		sed, suscipit eum officia magni a itaque nisi doloribus minus ut, optio
		tenetur eos magnam excepturi expedita totam soluta asperiores?
	</div>
{/snippet}

<div class="staff">
	<div class="detail">
		{@render staff(STAFF_LIST[active_staff_index])}
	</div>

	<div class="staff-list">
		{#each STAFF_LIST as member, i}
			<div class="member">
				<button
					onclick={() => {
						active_staff_index = i;
					}}
				>
					<img
						src={member.image
							? member.image
							: `${base}/images/placeholder.jpg`}
						alt={member.name}
					/>
					<span class="name">
						{member.name}
					</span>
				</button>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "../assets/global";

	.staff {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: calc(global.$margin-1 * 2) global.$margin-1
			calc(global.$margin-1 * 2) calc(global.$margin-1 * 7 / 3);

		.detail {
			position: relative;
			width: 58%;
			flex: 1 1 auto;

			.profile {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				margin-bottom: global.$margin-1;
				img {
					width: 200px;
					height: 200px;
					border: 4px solid global.$font-white;
					margin-right: global.$margin-1;
				}

				.r {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					h3 {
						font-size: 32px;
						margin-bottom: calc(global.$margin-1 / 2);
						@include global.operation-font;
					}

					p {
						font-size: 24px;
						margin-bottom: calc(global.$margin-1 / 2);
						@include global.operation-font;
					}

					.social {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;

						a {
							margin-right: calc(global.$margin-1 / 2);

							i {
								color: global.$font-white;
								font-size: 24px;
							}
						}
					}
				}
			}

			.desc {
				font-size: 20px;
				line-height: 1.5;
			}
		}

		.staff-list {
			$h: 86px;

			width: 100%;
			height: $h;
			flex-grow: 0;
			display: flex;
			flex-direction: row;
			overflow: hidden;

			.member {
				margin-right: calc(global.$margin-1/ 2);
				width: 560px;
				position: relative;

				// @include global.button-top;

				button {
					// @include global.button-bottom;

					padding: calc(global.$margin-1 / 4)
						calc(global.$margin-1 / 2);
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
					width: 100%;
					height: 100%;

					border-left: 4px solid global.$font-white;

					background-color: rgb(38, 34, 65);
					clip-path: polygon(
						0 0,
						100% 0,
						100% 70%,
						96% 100%,
						0% 100%
					);
				}

				img {
					width: calc($h - global.$margin-1 / 2);
					height: calc($h - global.$margin-1 / 2);
					border-radius: 50%;
					text-align: center;
					margin-right: calc(global.$margin-1/ 2);
				}

				.name {
					font-size: 24px;

					@include global.operation-font;
				}
			}
		}
	}

	
</style>
