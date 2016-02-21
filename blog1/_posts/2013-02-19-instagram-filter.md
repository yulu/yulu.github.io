---
layout: post
title:  "Explore Instagram-like Filters with Photoshop and OpenGL ES Shaders"
date:   2013-02-19 19:00:00
categories: blog1
---

I used to spend quite some time working with Photoshop®, to edit photos or do some digital painting. However I became too lazy to PS since I started to use smartphones. Apps like Instagram® seems to be able to do the processing job more efficiently and produce results that look surprisingly amazing (not considering the quality loss of the photo). After studying the OpenGL Shaders, I thought I should be enable to do mimic the filter effect using shaders, with those previous experience working with Photoshop®. I could first explore in Photoshop® to figure out the steps to take to produce the filter effect. Then I could implement it using OpenGL ES Shaders. After spending some time in research, I kind of found the way to duplicate the filter effect, might not be exactly the same, but the feeling is captured. Take the Hudson filter as an example, I summarized the work I have done.

![ins-1](https://c1.staticflickr.com/9/8742/17067546716_44fe02ee61.jpg)

### Working with Photoshop®

Learned from a digital photography course in the college, the first thing we need to do when loading an photo into the Photoshop, is to adjust the level and curve. However I think level and curve adjusting is not that easy to implement in the shaders. How about a less effective but simpler way: adjust Brightness/Contrast/Saturation. All these three steps can be easily realized by blending the image with a base image (either a constant image or the luminanced image of itself). By simply doing these, the quality of the image can be improved quite a lot.


![ins-2](https://c2.staticflickr.com/8/7665/17067547336_95c1901627.jpg)

![ins-3](https://c2.staticflickr.com/8/7671/16886111067_a545bbf835.jpg)

Then if the filter favors a particular color, can adjust the color balance a bit. Or can also add a filter layer on top then blend it with the base image. Hudson is a filter to make the image have an icy look, the slight tint and altered lighting give the images a colder feel. Therefore a radial gradient mask with blue to black is used for blending. With a lot trials, I found that overlay blending mode is best suitable to produce the vignetting effect (darkens the corners). Overlay blending is a combination of multiply and screen. It darkens the darker part and brightens the lighter part of the base image. And we can adjust the opacity of the top filtering layer to make the effect less strong.

![ins-4](https://c2.staticflickr.com/8/7674/16905949040_cb6e62df4b.jpg)

![ins-5](https://c2.staticflickr.com/8/7605/17067549246_c611ab20de_z.jpg)

Basically that's it! Just simply three steps: 1) adjust B/C/S, 2) adjust color balance, 3) overlay blend a radial gradient layer with some opacity. Let's see the result. Emm.. not exactly, but similar.

![ins-6](https://c2.staticflickr.com/8/7600/16907301009_156210a24a.jpg)

### Implement using OpenGL ES Shaders

So, I have three things to do: adjust the B/C/S, change the color balance and add a new layer of texture to overlay blend on top.

#### Adjust the B/C/S

In my previous post, I have discussed all the three processes, I just combine them into a single function in the Fragment Shader.

{% highlight c %}
vec3 BrightnessContrastSaturation(vec3 color, float brt, float con, float sat){
    vec3 black = vec3(0., 0., 0.);
    vec3 middle = vec3(0.5, 0.5, 0.5);
    float luminance = dot(color, W);
    vec3 gray = vec3(luminance, luminance, luminance);
    vec3 brtColor = mix(black, color, brt);
    vec3 conColor = mix(middle, brtColor, con);
    vec3 satColor = mix(gray, conColor, sat);
    return satColor;
}
{% endhighlight %}

#### Adjust color

I slightly adjust the single channel.

{% highlight c %}
//add blue
vec3 blue_result = vec3(bcs_result.r, bcs_result.g, bcs_result.b * 1.1);
{% endhighlight %}

#### Overlay blending

The function of overlay blending:

$$ f(a,b)=\left\{ 
\begin{array}{l l} 
2ab & \quad \text{if $b < 0.5$}\\
1-2(1-a)(1-b) & \quad \text{otherwise} 
\end{array} \right. $$

{% highlight c %}
vec3 ovelayBlender(vec3 Color, vec3 filter)
{
    vec3 filter_result;
    float luminance = dot(filter, W); 
    if(luminance < 0.5)
        filter_result = 2. * filter * Color;
    else
        filter_result = 1. - (1. - (2. *(filter - 0.5)))*(1. - Color); 
    return filter_result;
}
{% endhighlight %}

The result from shader implementation:

![ins-7](https://c1.staticflickr.com/9/8696/16471061984_33530f710f.jpg)

#### Some Other Exploration

Similarly I create more filters to mimic the Instagram® style.

- I add noise at the edge of the top filter lay, to produce the over- exposured film effect in Hefe filter

- Give high saturation to vibrate the color and to emphasize the dark corners to get X-pro

- Reduce the saturation and add a lot of red and yellow, to give the feel of Rise filter

- Add a red to purple filter to get the Toaster effect

### Closure

This is so fun! Weeks ago I was told by my friend of the words

 >CONNECTING THE DOTS

I start to realize what it means. Find the things you are good at and try to make connection and produce better work on it. I will definitely continue with this work. I am also glad to share with anyone who are interested in this area, find the full implementation of the basic image processing using OpenGL ES Shaders in Android from my github. Source Code on [Github](https://github.com/yulu/Instagram_Filter)


