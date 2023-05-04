---
layout: post
title:  "Lazy Snapping"
date:   2014-01-30 19:00:00
categories: blog1
---

<div class="video-container">
    <iframe width="640" height="360" src="https://www.youtube.com/embed/_LCFladNgRo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Recently I received some emails asking about the implementation of Lazy Snapping (through a video post on my YouTube). I thought of taking notes of this work, however postponed many times due to lack of time. I dig out some old stuff and felt that it is worthy to be record here. Lazy Snapping is an interactive segmentation algorithm developed by Microsoft Research Center. A similar algorithm GrabCut, also by Microsoft are used in Office Words, PowerPoint to segment image foreground and background. These are the papers to look at - [Lazy Snapping](http://research.microsoft.com/pubs/69040/lazysnapping_siggraph04.pdf) and [GrabCut](http://research.microsoft.com/pubs/67890/siggraph04-grabcut.pdf).


This is a [report](/assets/lazy-snapping.pdf) discussing the implementation and test of a simple version of Lazy Snapping on PC and on Android as well. It is just my own understanding of the algorithm. The source code is not uploaded because it is very messy (last minute product for a class project) and it is based on a very old version of OpenCV Android. It is very easy to find many other good implementation of Lazy Snapping online. 


In the demo video I borrowed some pretty photos for testing from my friend [Icho](http://www.flickr.com/photos/ichiyo/).