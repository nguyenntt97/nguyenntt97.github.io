---
layout: post
title: "Winning REACT 2024 with a better facial tokenizer"
date: 2024-05-27
description: Finite Scalar Quantization as a single-frame facial tokenizer for generating appropriate listener reactions. First place in the REACT 2024 challenge at IEEE FG 2024.
tags: facial-behavior tokenization
related_publications: true
---

The REACT challenge asks a simple-sounding question: given a video of someone speaking, generate a **listener's facial reaction** that is appropriate, varied and in sync. There is no single right answer. A listener might nod, smile or stay neutral, so a good model should produce several plausible reactions, not one average face.

Our team (Quang Tien Dam, me, Dinh Tuan Tran and Joo-Ho Lee) **won first place in the online track of REACT 2024**, held with IEEE FG 2024 {% cite dam2024finite %}.

## The idea in one line

Treat facial expressions like words: build a small, well-used vocabulary of face "tokens", then generate reactions token by token, the way a language model writes a sentence.

## Two stages

1. **A face tokenizer.** Most token-based face models use vector quantization (VQ), which tends to use only a fraction of its codebook. We used **Finite Scalar Quantization (FSQ)** instead: each latent value is simply rounded to a fixed grid. FSQ uses its codebook far more evenly, which let us tokenize a **single frame** at a time rather than a chunk of frames.
2. **A reaction predictor.** A Transformer predicts the listener's next face tokens from the speaker's voice (wav2vec2 features), the speaker's face, and the listener's own recent tokens. Cross-modal attention fuses these streams. During training we mask tokens at random, and at inference we sample from the predicted distribution, so each run gives a different but plausible reaction.

## Results

On the REACT 2024 test set our model reached a facial reaction correlation (FRCorr, higher is better) of **0.32** and a distance (FRDist, lower is better) of **82.0**. The challenge's baselines were Trans-VAE at 0.07 / 90.3 and BeLFusion at 0.12 / 94.1.

## Where it led

FSQ tokens became the dense baseline for our follow-up work. In [*When less is more*]({% post_url 2025-04-08-sparse-facial-motion-structure %}) we asked a further question: if tokenizing every frame works this well, what if we only tokenize the frames that matter?

**Links:** [code and checkpoints (GitHub)](https://github.com/ais-lab/FaceAIS_REACT24) · [paper (IEEE)](https://ieeexplore.ieee.org/abstract/document/10581929)
