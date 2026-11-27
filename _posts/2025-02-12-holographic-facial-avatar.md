---
layout: post
title: "A simulated patient you can walk around"
date: 2025-02-12
description: Streaming a reactive 3D Gaussian Splatting face to a Looking Glass holographic display, so a group of trainees can read a simulated patient's expression from any angle.
tags: 3dgs robotics
related_publications: true
thumbnail: assets/img/blog/holographic-overview.jpg
---

Pain assessment is a skill: nurses and therapists learn to read a patient's face while they work. Training usually relies on textbooks, mannequins, or actors playing patients. Actors are realistic but expensive. Virtual patients in VR are cheaper, but a headset isolates each trainee, which makes group teaching awkward.

This short paper asks whether a **holographic display** can sit in the middle: a lifelike 3D face that several people can look at together, from different angles, without headsets {% cite nguyen2025interactive %}.

{% include figure.liquid loading="eager" path="assets/img/blog/holographic-overview.jpg" class="img-fluid rounded z-depth-1" alt="Pipeline: an expression model drives a FLAME head, light-field rendering produces many views, and the hologram is shown to several viewers at once." caption="From right to left: an expression model predicts how the face should move, a light-field renderer produces many views of the 3D avatar, and the Looking Glass display shows the right view to each viewer." %}

## How it works

1. **Decide how the face should react.** A Transformer encoder-decoder takes the speaker's voice and face plus the avatar's own recent expressions, and predicts the next facial expression as FLAME parameters (a standard 3D face model).
2. **Render a photoreal 3D face.** The FLAME parameters drive a 3D Gaussian Splatting avatar. Gaussian avatars render fast: above 60 frames per second on a consumer RTX 4060 GPU.
3. **Render for a holographic display.** The Looking Glass Portrait shows 48 views spread over a 40° viewing cone. We render all 48 views each frame into a "quilt" image, with a calibration step that corrects each view's camera for the display's optics and the viewer's position, so neighbouring views do not blur into each other.

## Why it matters

Each person around the display sees the face from their own angle, and the face reacts in real time. That makes the simulated patient something a small group can discuss together, which is how clinical teaching usually happens.

## What's next

This is a proof of concept. The expression model here reacts to conversation; the next step is to drive it with pain signals instead (which is what [PainDiffusion]({% post_url 2025-10-20-paindiffusion %}) does), and then to run proper user studies on whether trainees read pain more accurately on a hologram than on a flat screen.

**Links:** [paper (arXiv)](https://arxiv.org/abs/2502.08085)
