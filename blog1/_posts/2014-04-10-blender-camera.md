---
layout: post
title:  "UI/UX Design for Blender Camera"
date:   2014-04-10 22:48:25
categories: blog1
image_url: https://c1.staticflickr.com/9/8684/16473297463_d2289f306f_b.jpg
---

This is the first time I practice a methodological design process for Android app. I did not have any professional training on graphic/UI/UX design, just did every step with intuition. Here I note down the process.

#### Random Thoughts on Paper

It is another [camera app](https://play.google.com/store/apps/details?id=com.littlecheesecake.filterblendercamera.free), which is similar to the previous one but with some other interesting [filter effects](https://github.com/yulu/ShaderFilter) and a function of blending two filter effects into one. The previous camera UI uses a gallery adapter to switch between filters, which seems to be working smoothly and easy to control. So I continued with this design. The main camera layout has 3/4 portion to display the camera view, and 1/4 left for the filter gallery. Another activity is the filter blender mode, where the user can view the combinations of two effects and generate a new filter by pressing a button. I thought about a small window (top-left area that comprises 1/6 of the screen) to display the camera view and the bottom part to display the filter galleries (I planned to use three types of filters but end up with only two due to some memory issue). A dialog window need to be popped out when the user press a button to generate a new filter. Another page contains a list of customized filters. The ideas are sketched on the paper.

![blender-camera-concept](https://farm9.staticflickr.com/8735/17016692941_3964eb253b_o.jpg)

#### First Draft

I started the actual design with a mock-up in Photoshop. I selected a red-green color scheme, which I thought was fresh and lively. Following the standard Android design, I mocked up the Action bar. I used some default Android icons and drew a few by myself.

![blender-camera-ui-v1](https://farm9.staticflickr.com/8720/16991582886_f88257f20b_o.jpg)

I held on the project for a few month. Later when I review the design, I felt that the colors were too much, and messed up with the color of the actual photo we are shooting. I tried a simpler color scheme - only use one theme color as below. But still I felt that any color adds on the UI bias the actual tone of photos the camera app is going to catch.

![blender-camera-ui-v2](https://farm9.staticflickr.com/8735/16831356659_7821a1e3d3_o.jpg)

#### Minimize the UI and Maximize the Function

I realized that the main function of the app is just to take photos with nice filter effects. Any buttons and layouts should not extract the users' attention from the camera view. I then make the camera view occupying full screen and overlay transparent UI on top of it. I tried to minimize the UI so that the function would be emphasized. Therefore for all the filters in the Gallery layout, names are displayed without icon. Further more to make better user experience I allow a gesture control to swipe up/down on the view to hide all the buttons. The list view of the customized filters are also overlayed on top of the camera view with a transparent background. So the camera view is always exposed to the user.

![blender-camera-ui-v3](https://farm9.staticflickr.com/8740/16991583756_be1e8c7b91_o.jpg)

I make all the dialogs transparent.

![blender-camera-popup](https://farm8.staticflickr.com/7643/16831358329_e3d3f193fb_o.jpg)

I then drew all the icons in Photoshop. Only a few icons are designed and they are resiponsible for all the necessary functions of the app. That is the concept I want to practice - minimize the UI and maximize the function.

![blender-camera-ui-ele](https://farm9.staticflickr.com/8698/16395154684_dd376f442f_o.jpg)

#### Gesture Control

To provide a better user experience, I implement the gesture control as I have shared in my previous post. This allows easy manipulation of the cameras - switch front/back camera, zoom and shoot.

![blender-camera-control](https://farm8.staticflickr.com/7638/16991584246_afe303fb4a_o.jpg)

#### Closure

Recently I came across the Documentary OBJECTIFIED and learned the ten principle for good design by Dieter Rams. This is very inspiring, and I would like to take a note of it here:

> 1. Good design is innovative
> 2. Good design makes a product useful
> 3. Good design is aesthetic
> 4. Good design makes a product understandable
> 5. Good design is unobtrusive
> 6. Good design is honest
> 7. Good design is long-lasting
> 8. Good design is thorough down to the last detail
> 9. Good design is environmentally-friendly
> 10. Good design is as little design as possible
>
> Less, but better. Back to purity, back to simplicity.