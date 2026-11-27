---
layout: post
title: "When less is more: predicting how a listener's face moves"
date: 2025-04-08
description: A sparse keyframe representation of facial motion that makes listening-head generation more accurate and more varied. IEEE Transactions on Computational Social Systems, 2025.
tags: facial-behavior tokenization
related_publications: true
thumbnail: assets/img/blog/sfms-overview.jpg
---

When someone talks to you, your face is never still. You nod when they pause, smile at a joke, frown at bad news. A robot or avatar that stares blankly while you speak feels wrong, even if its own speech is perfect. Generating these **listening reactions** is the problem behind this paper {% cite nguyen2025less %}.

{% include figure.liquid loading="eager" path="assets/img/blog/sfms-overview.jpg" class="img-fluid rounded z-depth-1" alt="Overview: the speaker's video and audio, plus the listener's past motion, feed a predictor that outputs a few sparse keyframes; a motion inpainting step fills the frames in between." caption="Instead of predicting every frame, we predict a few keyframes (blue) and let an inpainting network fill the transitions between them." %}

## Why the usual approach struggles

Recent listening-head models borrow a trick from language models. They chop facial motion into short chunks, turn each chunk into a discrete token from a learned codebook, and predict the next token. It works, but facial motion is a poor fit for fixed-size chunks:

- a nod and a slow smile last very different lengths of time;
- most frames are "in between" two meaningful expressions, so the codebook wastes capacity memorising transitions;
- the boundaries between chunks show up as jitter, and smoothing the jitter away also smooths away variety.

## Our idea: keyframes plus inpainting

We represent a motion sequence the way an animator would: a few **keyframes** where the expression actually changes, and **transition frames** that are interpolated between them. We call this a Sparse Facial Motion Structure (SFMS).

1. **Find the keyframes without labels.** A scoring module learns where to place keyframes by trying to reconstruct the full sequence from them (analysis by synthesis). Over training, it moves keyframes toward the parts of the sequence where reconstruction error is highest.
2. **Quantise only the keyframes.** The codebook now only has to learn distinct expression states, not every transition, so a small codebook goes a long way.
3. **Predict sparsely.** A Transformer predicts the listener's next keyframe tokens from the speaker's audio and face and the listener's own recent motion, then the inpainting network fills in the frames.

This also lines up with how psychologists describe expressions (onset, apex, offset) and with evidence that facial movements are driven by sparse, action-specific signals.

## Results

- **Reconstruction.** Learned keyframe placement beat evenly spaced keyframes at every setting we tried (MSE 0.12–0.15 vs 0.33–0.89, ×10⁻²). With a smaller model (9.6 M vs 13 M parameters), our sparse tokens cut reconstruction error on the REACT23 data from 2.12 to 0.79 (×10⁻²) compared with dense FSQ tokens.
- **Listening-head prediction on Learning2Listen.** Lower error than Learning2Listen and other baselines (expression L2 26.65 vs 33.16; Fréchet distance 1.13 vs 3.55), with diversity closer to real listeners.
- **Listening-head prediction on REACT.** Much better appropriateness than the dense token baseline (FRCorr 0.84 vs 0.31, close to the ground-truth 0.85), with more diverse reactions.

Everything trains in 2 to 4 hours on a single RTX 4060, which matters for labs without large compute budgets.

## What's still open

We use a fixed number of keyframes per window; letting the model choose how many would fit calm and busy moments better. Listening-head datasets are also far smaller than talking-head datasets, so it is not yet clear how sparse representations behave at scale.

**Links:** [paper (arXiv)](https://arxiv.org/abs/2504.05748) · [project page]({{ '/projects/sfms_25/' | relative_url }})
