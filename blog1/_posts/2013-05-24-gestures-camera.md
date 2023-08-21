---
layout: post
title:  "Gestures to Control the Camera View"
date:   2013-05-24 19:00:00
categories: blog1
tags: Android
---

After I published the Mood Camera app to the play store, I have received some, not too many comments - some are from my friends (all of them give me 5 stars, thanks so much guys), some are from the users who are totally strangers to me. I am overwhelmed by the feeling of gratefulness since I didn't expect such sincere and useful comments from people around the world. Honestly I never care enough to leave any words for any apps I have used. An email I have received said that the camera view is totally upside down for him. I have tested for a few phones but this issue never came up, so I have never considered it a problem. It will be an easy fix actually. I just need to add a button to trigger a restart of the camera with a feed in of frames that has been flipped upside down. But I looked at my UI - where to add the button. Like this? So stupid.

![gesture-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16886102697_fc7b7e5758_n.jpg)

Then I recall how the zoom is done in most of the camera (I also realized Mood Camera cannot zoom...) - multi-touch! So why not implement a scheme that flip the view with swipe - up/down to turn it upside down, left/right to switch between front and back camera - interesting!

![gesture-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16905941710_c8e85854ec_b.jpg)

Well, codes explain all, find a demo App on my [github](https://github.com/yulu/GestureCam).