<script lang="ts">
	import { base } from "$app/paths";

	const projects = [
		{
			title: "Multi-modal Control for Robotic Devices",
			desc: "",
			content: content1,
		},
		{
			title: "Central Artificial Intelligence",
			desc: "",
			content: content2,
		},
		{
			title: "Text Conditioned Human Motion Generation",
			desc: "",
			content: content3,
		},
		{
			title: "Secure Human-Robot Interaction Using Facial Emotion",
			desc: "",
			content: content4,
		},
	];

	let active_project_index = $state(0);
</script>

{#snippet content1()}
	<p>
		The transition toward Industry 5.0 necessitates robotic systems capable of seamless, intuitive collaboration with humans, moving beyond pre-programmed tools to adaptive partners. However, current Human-Robot Interaction (HRI) frameworks often struggle to interpret natural, multimodal human cues in dynamic environments, relying on rigid control interfaces that lack contextual reasoning. This research aims to bridge the gap between high-level cognitive reasoning and low-level motor control by developing a robust, multimodal HRI framework for a 7-Degree-of-Freedom (DoF) robotic manipulator. The methodology integrates three core components: a Convolutional Neural Network (CNN) based system (GESTID) for real-time static and dynamic gesture recognition; a Goal-Oriented Action Planning (GOAP) engine for dynamic task sequencing; and a Large Language Model (LLM) interface for interpreting natural language commands. These components are unified via the Robot Operating System (ROS) to control a Franka Emika Panda robot. The study specifically investigates the use of LLMs to perform semantic mapping of ambiguous speech instructions into deterministic robotic actions.
	</p>
	<p>
		Experimental evaluations across complex scenarios, such as beverage preparation, demonstrated high system efficacy. The vision-based gesture recognition module achieved a classification accuracy of 99.1% with low latency, enabling realtime teleoperation. The speech-based interaction, integrated with GOAP, yielded a task success rate of 85.4% under dynamic conditions, while the LLM-driven semantic mapping correctly interpreted natural language instructions with 94.67% accuracy. These findings indicate that fusing visual perception with linguistic reasoning significantly enhances robotic adaptability. This thesis contributes a validated, scalable framework for multimodal HRI, offering tangible implications for industrial automation, healthcare, and assistive technologies where intuitive, hands-free control is paramount.
	</p>
{/snippet}

{#snippet content2()}
	<p>
		Central Artificial Intelligence is an ongoing research project focused on developing a unified software intelligence layer capable of coordinating, controlling, and optimising a diverse ecosystem of robotic devices and AI-driven processes. The project explores how a centralised AI architecture can integrate perception, decision‑making, and actuation across heterogeneous platforms—from mobile robots and manipulators to autonomous sensors and cloud-based agents. By creating a shared cognitive framework, the system enables robots to operate collaboratively, adapt to changing environments, and make informed decisions based on real-time data fusion and distributed situational awareness.
	</p>
	<p>
		At the core of the project is the design of a scalable orchestration engine that manages tasks, resources, and inter-robot communication through advanced algorithms in planning, reinforcement learning, and multi-agent coordination. This central AI acts as both conductor and collaborator: it allocates work, resolves conflicts, and ensures global optimisation, while still allowing individual robots to maintain local autonomy. The long-term goal is to establish a flexible, intelligent control infrastructure that can support complex robotic ecosystems in domains such as smart manufacturing, healthcare automation, environmental monitoring, and service robotics—unlocking seamless interaction between humans, machines, and AI systems.
	</p>
{/snippet}

{#snippet content3()}
	<p>
		We study text-conditioned human motion generation with an emphasis on physical plausibility. The model produces full-body humanoid motion that remains physically stable by given a natural-language description.
	</p>
	<p>
		To improve robustness and personalization, we train policies across multiple body shapes and genders by conditioning on SMPL-style shape parameters (betas) and gender, using a HUMOS/SMPL-based motion library as reference supervision. Learning combines imitation-style tracking with adversarial motion priors to preserve semantic alignment to text while promoting realistic, human-like motion.
	</p>
{/snippet}

{#snippet content4()}
	<p>
		As robots increasingly operate in human-centred environments such as healthcare, education, and domestic assistance, their ability to perceive and respond appropriately to human emotional states has become critical to effective and trustworthy interaction. Facial Emotion Recognition (FER) is widely adopted for enabling emotion-aware behaviour; however, existing approaches largely prioritise classification accuracy while overlooking robustness, uncertainty, and security. This presents significant risks when emotion predictions directly inform robotic decision-making. This study develops a Multimodal Risk-Aware Emotion Verification (MREV) framework for robust emotion-guided Human–Robot Interaction (HRI). The framework treats emotion perception as a safety- and security-critical input and integrates facial emotion recognition with robustness analysis, adversarial vulnerability assessment, and risk-aware decision-making.

	</p>
	<p>
		FER pipelines, including baseline and CNN-based approaches, are evaluated for real-time deployment in HRI settings, with analysis of performance under unconstrained conditions and adversarial perturbations to examine how misclassification and uncertainty propagate to robotic behaviour. The study further demonstrates the integration of emotion recognition with robotic task execution and speech-based interaction, enabling robots to respond adaptively to inferred human emotional states. Adversarial attacks are used to assess system resilience and highlight vulnerabilities that could compromise interaction safety and trust. The primary contribution of this work is a system-level approach that unifies emotion perception, verification, and robotic control within a coherent risk-aware framework. By moving beyond accuracy-driven emotion recognition, the thesis advances the design of secure, interpretable, and trustworthy emotion-aware robotic systems and provides practical guidance for deployment in safety-sensitive and socially interactive environments.
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

				font-size: 22px;
			}
		}
	}
</style>
