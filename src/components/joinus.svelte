<script lang="ts">
	import { base } from "$app/paths";
</script>

<div class="joinus">
	<div class="upper">
		<div
			class="decor"
			style="background-image: url({base}/images/decor.svg);"
		></div>
		<div class="study">
			<div>
				<div class="t-bar">
					<div class="icon">
						<i class="fas fa-graduation-cap fa-stack-1x fa-inverse"
						></i>
					</div>
					<h3>Study for your PhD</h3>
				</div>
				<p>
					We welcome any applications related to Robotics and/or AI.
					You can find out more at UoB Computing PhD.
				</p>
			</div>
			<div>
				<div class="t-bar">
					<div class="icon">
						<i class="fas fa-user-plus fa-stack-1x fa-inverse"></i>
					</div>
					<h3>Work with our team</h3>
				</div>
				<p>
					We are always looking to create new networks and support
					academic and industrial collaborations.
				</p>
			</div>
		</div>

		<div class="contact">
			<h3>Contact Us</h3>
			<p>University of Brighton</p>
			<p>Advanced Engineering Building Brighton</p>
			<p>United Kingdom BN2 4AT</p>
			<p>
				Please contact <a
					href="https://research.brighton.ac.uk/en/persons/almas-baimagambetov"
					target="_blank"
					rel="noopener noreferrer">Almas</a
				>
				for any queries related to the Robotics AI Lab.
			</p>
		</div>
	</div>

	<div class="footer">
		<div class="copyright">Copyright © UoB RAI Lab 2025</div>
		<div class="privacy">
			<a href="{base}/privacy">Privacy Policy</a>
		</div>
	</div>
</div>

<style lang="scss">
	@use "../assets/global";

	.joinus {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: calc(global.$margin-1 * 2) calc(global.$margin-1 * 2)
			calc(global.$margin-1) calc(global.$margin-1 * 7 / 3);

		.upper {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
			width: 100%;
			flex-grow: 1;

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

			.study {
				flex: 1 1 auto;
				height: 100%;
				margin-right: global.$robot-margin;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;

				@include global.glassblur(2px);

				& > div {
					margin-bottom: global.$margin-1;

					.t-bar {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						margin-bottom: calc(global.$margin-1/2);

						.icon {
							width: 30px;
							height: 30px;
							margin-right: calc(global.$margin-1/2);

							i {
								width: 30px;
								height: 30px;
								font-size: 28px;
							}
						}
					}

					h3 {
						font-size: 24px;
						margin-bottom: 0;

						@include global.operation-font;
					}

					p {
						font-size: 18px;
						line-height: 1.5;
					}
				}
			}
			.contact {
				width: 400px;
				flex-grow: 0;
				padding-top: global.$margin-1;

				h3 {
					font-size: 24px;

					@include global.operation-font;
				}

				p {
					font-size: 18px;
					line-height: 1;
				}

				a {
					@include global.link;
					text-decoration: underline;
				}
			}
		}
		.footer {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.copyright {
				margin-right: global.$margin-1;
			}

			.privacy {
				a {
					@include global.link;
				}
			}
		}
	}
</style>
