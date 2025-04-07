---
layout: project
title: "When Less Is More: A Sparse Facial Motion Structure For Listening Motion Learning"
description: with background image
img: assets/img/12.jpg
importance: 1
category: work
related_publications: true
authors: ["tien", "tuan" ,"lee"]
---
<!-- Teaser video-->
<section class="hero teaser">
  <div class="container is-max-desktop">
    <div class="hero-body">
      <video poster="" id="tree" autoplay muted loop height="100%">
        <!-- Your video here -->
        <source src="/assets/video/project_1/thumbnail_video.mp4"
        type="video/mp4">
      </video>
      <h2 class="subtitle has-text-centered">
        This paper introduces a sparse facial motion structure that models keyframes and interpolates transitions to improve non-verbal listening head motion generation. The approach enhances motion fidelity and diversity, outperforming dense token methods on benchmark datasets.
      </h2>
    </div>
  </div>
</section>
<!-- End teaser video -->

<!-- Paper abstract -->
<section class="section hero is-light">
  <div class="container is-max-desktop">
    <div class="columns is-centered has-text-centered">
      <div class="column is-four-fifths">
        <h2 class="title is-3">Abstract</h2>
        <div class="content has-text-justified">
          <p>
            Effective modeling of non-verbal facial behavior is crucial for human-robot interaction, yet current token-based methods often produce low-fidelity motion due to dense and redundant representations. This paper introduces a sparse facial motion structure that identifies keyframes and reconstructs transitions to capture essential motion dynamics more efficiently. Key contributions include: (1) a novel unsupervised keyframe discovery method, (2) a sparse representation framework that improves reconstruction and token expressiveness, and (3) a Transformer-based predictor for listening head motion using these sparse tokens. The approach outperforms state-of-the-art methods in both fidelity and diversity across benchmark datasets.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End paper abstract -->


<!-- Image carousel -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <div id="results-carousel" class="carousel results-carousel">
       <div class="item">
        <!-- Your image here -->
        <h2 class="subtitle has-text-centered">
          Sparse Representation for Listening Head Prediction
        </h2>
        <img src="/assets/img/project_1/banner.svg" alt="MY ALT TEXT"/>
      </div>
      <div class="item">
        <!-- Your image here -->
        <h2 class="subtitle has-text-centered">
          Sparse Facial Motion Structure Architecture Overview
        </h2>
        <img src="/assets/img/project_1/thumbnail.svg" alt="MY ALT TEXT" style="width: 900px; display: block; margin: 0 auto;"/>
      </div>
      <div class="item">
        <!-- Your image here -->
        <h2 class="subtitle has-text-centered">
         Sparse Representation for Non-verbal Facial Motion
       </h2>
        <img src="/assets/img/project_1/sparse.svg" alt="MY ALT TEXT" style="width: 600px; display: block; margin: 0 auto;"/>
     </div>
  </div>
</div>
</div>
</section>
<!-- End image carousel -->




<!-- Youtube video -->
<section class="hero is-small is-light">
  <div class="hero-body">
    <div class="container">
      <!-- Paper video. -->
      <h2 class="title is-3">Reconstruction</h2>
      <div class="columns is-centered has-text-centered">
        <div class="column is-four-fifths">
          <div id="results-carousel" class="carousel results-carousel">
            <div class="item item-video1">
              <video poster="" id="video1" autoplay muted loop height="100%">
                <!-- Your video file here -->
                <source src="/assets/video/project_1/recon_1.mp4"
                type="video/mp4">
              </video>
            </div>
            <div class="item item-video2">
              <video poster="" id="video2" autoplay muted loop height="100%">
                <!-- Your video file here -->
                <source src="/assets/video/project_1/recon_2.mp4"
                type="video/mp4">
              </video>
            </div>
            <div class="item item-video3">
              <video poster="" id="video3" autoplay muted loop height="100%">\
                <!-- Your video file here -->
                <source src="/assets/video/project_1/recon_3.mp4"
                type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- End youtube video -->


<!-- Video carousel -->
<section class="hero is-small">
  <div class="hero-body">
    <div class="container">
      <h2 class="title is-3">Listening Head Prediction - Appropriateness</h2>
      <video poster="" id="video1" controls height="100%">
        <!-- Your video file here -->
        <source src="/assets/video/project_1/pred_1_mini.mp4"
        type="video/mp4">
      </video>
      <video poster="" id="video2" controls height="100%">
        <!-- Your video file here -->
        <source src="/assets/video/project_1/pred_2_mini.mp4"
        type="video/mp4">
      </video>
      <video poster="" id="video3" controls height="100%">\
        <!-- Your video file here -->
        <source src="/assets/video/project_1/pred_3_mini.mp4"
        type="video/mp4">
      </video>
    </div>
  </div>
</section>
<!-- End video carousel -->