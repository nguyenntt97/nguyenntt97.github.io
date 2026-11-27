---
layout: post
title: "PainDiffusion: teaching a simulated patient to wince"
date: 2025-10-20
description: A diffusion model that generates realistic, controllable pain expressions for robotic patient simulators. IROS 2025 Best Entertainment and Amusement Paper Award.
tags: facial-behavior robotics diffusion
related_publications: true
thumbnail: assets/img/blog/paindiffusion-overview.jpg
---

Clinicians often underestimate how much pain a patient is in. Training helps, and robotic patient simulators let students practise without risk to real patients. Today's simulators can breathe, bleed and move their limbs, but their faces barely react. When a student bends a simulated elbow too far, nothing on the face says "stop".

PainDiffusion is our attempt to give the simulator that face {% cite dam2024paindiffusion %}. This paper was led by Quang Tien Dam, with me as co-first author. It received the **Best Entertainment and Amusement Paper Award at IROS 2025**.

{% include figure.liquid loading="eager" path="assets/img/blog/paindiffusion-overview.jpg" class="img-fluid rounded z-depth-1" alt="PainDiffusion overview: noisy past expression codes are denoised into clean expression codes, conditioned on pain stimulus, expressiveness and emotion, then rendered on a virtual avatar." caption="PainDiffusion takes the pain stimulus, an expressiveness setting, an emotion setting and the last few frames, and predicts the next facial expression." %}

## The problem

Pain expressions are hard to hand-animate. The same stimulus produces different faces in different people, depending on how expressive they are, what mood they are in and what kind of pain it is. Rule-based systems that map "pain level 3" to a fixed grimace miss that variety, and they look scripted.

So we learned the mapping from data instead. We used the **BioVid HeatPain Database**, the only public dataset that records the pain stimulus, physiological signals and natural (not acted) facial reactions together.

## What we built

- **A diffusion model in a compact expression space.** Faces are encoded as continuous expression codes (from EMOCA) rather than pixels or discrete tokens, which keeps motion smooth. A temporal U-Net with attention denoises a window of future expression codes.
- **Diffusion forcing for endless output.** A rehabilitation session has no fixed length. Diffusion forcing lets the model keep rolling forward, frame window after frame window, without drifting, which is what a real-time robot needs.
- **Knobs a trainer can turn.** Besides the stimulus, the model is conditioned on *pain expressiveness* and *emotion*. A trainer can make the same patient stoic or expressive, calm or distressed.
- **A robot to test it on.** We built a single-joint elbow driven by an MX-64 servo, mapped the joint angle to heat-stimulus intensity, and showed the predicted face live on a Gaussian-splatting avatar.

## What we found

- Against autoregressive and heuristic baselines, PainDiffusion tracked the ground-truth pain signal (PSPI) more closely and produced more diverse expressions.
- We asked **18 Japanese rehabilitation clinicians** to exercise the robotic elbow and rate the reactions, then to compare generated and real videos. In about one comparison in three (**31.2% ± 4.8%**), clinicians judged the generated clip more realistic than the real recording. A rate of 50% would mean they could not tell the two apart at all.
- The controls behave sensibly: stronger stimuli produce more movement, and sadness or happiness amplify the pain response compared with a neutral state.

## What's still open

The clinicians' most useful comment was cultural. They expected the restrained pain expressions typical of Japanese patients, while the model learned from a European dataset. A pain simulator for clinical training needs data, or at least calibration, that matches the patients the trainees will actually see. The model also only drives a virtual face for now; putting it on a physical robot face is the next step.

**Links:** [paper (arXiv)](https://arxiv.org/abs/2409.11635) · [project page with videos and code](https://damtien444.github.io/paindf/)
