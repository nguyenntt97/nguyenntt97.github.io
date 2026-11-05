---
layout: about
title: about
permalink: /
subtitle: Computer Graphics · 3D Vision · Digital Humans for Robotics

profile:
  align: right
  image: prof_pic.png
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Postdoctoral Researcher</p>
    <p>Advanced Intelligent Space Lab</p>
    <p>Ritsumeikan University · Osaka, JP</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: false # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I build **photorealistic, animatable digital humans** and put them where people can interact with them: on screens, on **holographic displays**, and on a **patient-simulator robot** used to train medical and elderly-care staff.

I'm a postdoctoral researcher at the [Advanced Intelligent Space Lab](https://ais-lab.github.io/), [Ritsumeikan University](https://en.ritsumei.ac.jp/gsise/), where I also completed my Ph.D. (2026) as a [MEXT](https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm) scholar. My current work is **multi-view 3D Gaussian Splatting**: a pipeline that goes from pose-free sparse-view capture to real-time rendering of 4D head avatars. Earlier, I worked on **generative facial behavior**, teaching avatars how to listen, react, and express pain.

Before research, I spent two years as a backend/AI engineer at [VNG Corporation](https://vng.com.vn/), building ad systems that served millions of requests per second. That background still shapes how I work: I validate methods early on real, noisy data, and I care about whether a model fits the hardware and latency budget it will actually run on.

<div class="hl-stats">
  <div><b>8</b><span>peer-reviewed papers</span></div>
  <div><b>2</b><span>international awards<br>IROS '25 · REACT '24</span></div>
  <div><b>3</b><span>display targets<br>screen · hologram · robot</span></div>
  <div><b>5 yrs</b><span>industry R&amp;D<br>collaborations in Japan</span></div>
</div>

<figure class="hl-hero">
  <canvas id="splat-head" aria-label="Interactive point-splat rendering of a 3D head" role="img"></canvas>
  <figcaption>
    <span class="hl-mono">// live</span> About 3.5k Gaussian splats converge from a sparse four-camera initialization into a head, then idle with listener-style nods. This is a ~300-line toy in plain canvas JS, not my research model. <b>Drag to orbit.</b>
  </figcaption>
</figure>

<h2 class="hl-h2">research at a glance</h2>
<p class="hl-lead">One pipeline, from capturing a real face to giving it a body.</p>

<ol class="hl-pipe">
  <li>
    <span class="hl-step">01 · capture</span>
    <h3>Pose-free sparse-view 4D capture</h3>
    <p>Calibration-free multi-view reconstruction of animatable 3DGS head avatars. Coarse feed-forward poses are refined with pycolmap and supervise a deformable cross-view point-map network.</p>
    <p class="hl-papers"><a href="{{ '/publications/#nguyen2026posefree' | relative_url }}">UR '26</a></p>
    <p class="hl-tags"><span>3DGS</span><span>pycolmap</span><span>multi-view geometry</span><span>PyTorch</span></p>
  </li>
  <li>
    <span class="hl-step">02 · track</span>
    <h3>Temporally stable 3DMM tracking</h3>
    <p>Monocular and multi-view stereo face trackers with learnable camera parameters. They turn in-the-wild video into 3DMM animation datasets with low latency.</p>
    <p class="hl-papers"><a href="{{ '/publications/#nguyen2024latency' | relative_url }}">SII '24</a></p>
    <p class="hl-tags"><span>3DMM</span><span>OpenCV</span><span>C++</span></p>
  </li>
  <li>
    <span class="hl-step">03 · behave</span>
    <h3>Generative facial behavior</h3>
    <p>Avatars that listen and react to speech and vision. Methods include sparse keyframe motion tokens, FSQ facial tokenizers, and diffusion models that express pain.</p>
    <p class="hl-papers">
      <a href="{{ '/publications/#nguyen2025less' | relative_url }}">TCSS '25</a>
      <a href="{{ '/publications/#dam2024paindiffusion' | relative_url }}">IROS '25 ★</a>
      <a href="{{ '/publications/#dam2024finite' | relative_url }}">FG '24 ★</a>
      <a href="{{ '/publications/#nguyen2025survey' | relative_url }}">ISR survey</a>
    </p>
    <p class="hl-tags"><span>Transformers</span><span>diffusion</span><span>VQ / FSQ</span></p>
  </li>
  <li>
    <span class="hl-step">04 · embody</span>
    <h3>Real-time rendering &amp; embodiment</h3>
    <p>Custom CUDA kernels speed up 3DGS rendering on a consumer GPU. Avatars stream to Looking Glass holographic displays and drive a robotic shoulder-arm for range-of-motion training in VR.</p>
    <p class="hl-papers"><a href="{{ '/publications/#nguyen2025interactive' | relative_url }}">ICEIC</a></p>
    <p class="hl-tags"><span>CUDA</span><span>OpenGL</span><span>Looking Glass SDK</span><span>ROS 2</span><span>Unity</span></p>
  </li>
</ol>

<script defer src="{{ '/assets/js/splat-head.js' | relative_url }}"></script>
