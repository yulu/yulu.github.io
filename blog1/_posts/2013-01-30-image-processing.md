---
layout: post
title:  "Having Fun: Image Processing with OpenGL ES Fragment Shaders"
date:   2013-01-30 19:00:00
categories: blog1
---

I have taken a very long time to get myself familiar with OpenGL ES Shaders. Finally I made some codes run and got some results that looked nice. The main area I want to explore is to use shaders to perform general purpose GPU computation (GPGPU). Here I summarize some image manipulation examples from the very popular textbook Graphics Shaders: theory and practice by Bailey and Cunningham. The examples are made to be running on the Android phone.

### Texture mapping using OpenGL ES 2.0

[Here](http://www.learnopengles.com/android-lesson-one-getting-started/) is a good online tutorial to get start with on OpenGL ES 2.0 for Android. A simple project of texture mapping is created. It basically maps an bitmap image to a square fragment that fits into the window size of the device. The fun things I am going to do start from this stage.

![rendering](https://c2.staticflickr.com/8/7614/16905771328_c58d995850_z.jpg)

### Basic Concepts

GLSL deals with images by treating them as textures and using texture access and manipulation to set the color of each pixel in the color buffer. This texture file may be treated as an image raster by working with each texel individually. Since any OpenGL texture has texture coordinates ranging from 0.0 to 1.0, the coordinates of the center of the image are vec(0.5, 0.5) and you can increment texture coordinates by 1./ResS or 1./ResT to move from one texel to another horizontally or vertically. ResS and ResT are the sizes of the displayed image in pixel.

### Working with Fragment Shaders

The Fragment Shader is responsible for the per texel processing. The manipulation of the image pixels are handled merely using Fragment Shaders. Here is the simple fragment shader that just displays the texture:

{% highlight c%}
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate; 

void main()
{
    gl_FragColor = (texture2D(u_Texture, v_TexCoordinate));
}
{% endhighlight %}

#### Color/Brightness/Hue

*Luminance*: luminance is defined as a linear combination of red, green and blue. The weight vector is a const: `vec3(0.2125, 0.7154, 0.0721)`.

{% highlight c %}
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate; 
void main()
{ 
    const vec3 W = vec3(0.2125, 0.1754, 0.0721); 
    vec3 irgb = texture2D(u_Texture, v_TexCoordinate).rgb; 
    float luminance = dot(irgb, W); 
    gl_FragColor = vec4(luminance, luminance, luminance, 1.);
}

{% endhighlight %}

<figcaption>
Illuminance Adjustment
</figcaption>
![illuminance](https://c2.staticflickr.com/8/7625/16907296299_82e96ecba3_z.jpg)

*Hue shifting*: the RGB is first converted into the HSV color space, the hue shifting is just a adjustment of the h value in degree.The code is a bit long, check it out in the source code directory.

<figcaption>
Hue Shift
</figcaption>
![hueshift](https://c2.staticflickr.com/8/7630/17093504515_9523c3c071_z.jpg)

*Negative*: negative is obtained by subtracting the color of each pixel from the white

{% highlight c %}
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate; 

void main()
{
    float T = 1.0; 
    vec2 st = v_TexCoordinate.st;
    vec3 irgb = texture2D(u_Texture, st).rgb;
    vec3 neg = vec3(1., 1., 1.)-irgb;
    gl_FragColor = vec4(mix(irgb,neg, T), 1.);
}

{% endhighlight %}

<figcaption>
Negative
</figcaption>
![negative](https://c2.staticflickr.com/8/7588/17067558526_7787654204_z.jpg)

*Brightness*: add or subtract black can be used to adjust the brightness of the image

{% highlight c %}
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate;

void main()
{
    float T = 2.0;
    vec2 st = v_TexCoordinate.st;
    vec3 irgb = texture2D(u_Texture, st).rgb;
    vec3 black = vec3(0., 0., 0.);
    gl_FragColor = vec4(mix(black, irgb, T), 1.);
}

{% endhighlight %}

<figcaption>
Brightness Adjustment
</figcaption>
![brightness](https://c1.staticflickr.com/9/8768/16473298933_3a217ae515_z.jpg)

*Contrast*: use a gray image as a base image, and mix with the color image. It can be made either move the color component towards the gray or away from. That is how the contrast is adjusted.

{% highlight c %}
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate;

void main()
{
    float T = 2.0;
    vec2 st = v_TexCoordinate.st;
    vec3 irgb = texture2D(u_Texture, st).rgb;
    vec3 target = vec3(0.5, 0.5, 0.5);
    gl_FragColor = vec4(mix(target, irgb, T), 1.);
}

{% endhighlight %}

*Saturation*: mix the color and grayscale image from the luminance example, can obtain a saturated image

{% highlight c %}
precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TexCoordinate; 
const vec3 W = vec3(0.2125, 0.7154, 0.0721);

void main()
{
    float T = 0.5;
    vec2 st = v_TexCoordinate.st;
    vec3 irgb = texture2D(u_Texture, st).rgb; 
    float luminance = dot(irgb, W);
    vec3 target = vec3(luminance, luminance, luminance); 
    gl_FragColor = vec4(mix(target, irgb, T), 1.);
}

{% endhighlight %}

#### Warping/Distortion

The twirl transformation rotates the image around a given anchor point(xc, yc) by an angle that varies across the space from a value alpha at the center, decreasing linearly with the radial distance as it proceeds toward a limiting radius r. There are lots of other transformation worthy being tried.

<figcaption>
Twirl
</figcaption>
![twirl](https://c2.staticflickr.com/8/7689/16473395223_2cae1c636e_z.jpg)

#### Image processing/vision

*Edge detection*: [Sobel filter](http://en.wikipedia.org/wiki/Sobel_operator) is used for edge detection. The manipulation of neighboring pixels are required. Here we need to know the exact width and height of the texture displayed in pixel. However I haven't figure out how to do this. So I cheated a bit, just use the screen height (720 px in this case) since the image is assumed to fit in the window, which is not exactly true.

<figcaption>
Edge Detection
</figcaption>
![edge](https://c1.staticflickr.com/9/8790/17093470525_f64935b03a_z.jpg)

*Blurring*: 3x3 Gaussian filter s used for blurring in this case. The result is not a obvious since a small radius is used.

<figcaption>
Blur Effect
</figcaption>
![blurring](https://c2.staticflickr.com/8/7691/17091947422_fbb60308e9_z.jpg)

#### Artistic Effect

*Embossing*: the embossing image is obtained from applying the edge detection luminanced image and highlighting the images differently depending on the edge's angle.

<figcaption>
Emboss Effect
</figcaption>
![emboss](https://c1.staticflickr.com/9/8793/17093478185_5feab22704_z.jpg)

*Toon like image*: steps includes -Calculate the luminance of each pixel, apply the Sobel filter to detect edge and get a magnitude, if magnitude is larger than the threshold, color the pixel black, else quantize the pixel's color.

<figcaption>
Toon Effect
</figcaption>
![toon](https://c2.staticflickr.com/8/7612/17093548725_9cf8a4e090_z.jpg)

### Closure

These are all simple image manipulations that can be easily done by software like Photoshop. The interesting thing is that it is now running on the GPU of the embedded devices. The advances of GPGPU might not be seen from here, but I will try to do some efficiency evaluations and continue with my "serious" research to see how it will help. Source Code on [Github](https://github.com/yulu/GLtext)




