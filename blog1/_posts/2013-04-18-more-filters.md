---
layout: post
title:  "More Interesting Filters using Fragment Shader"
date:   2013-04-18 19:00:00
categories: blog1
tags: OpenGL
---

Continued with the previous project - image processing using OpenGL ES shaders, I studied and implemented another two interesting filters: artistic painting effect and diffuse glow effect.

### Artistic Painting Effect

The idea is still taken from the popular book [Graphics Shaders](http://books.google.com.sg/books/about/Graphics_Shaders.html?id=29YSpc-aOlgC&redir_esc=y), which is followed closely from the very start of the project. The artist effect is achieved by scanning the pixels around the centre one, and take either the brightest or darkest to replace the centre. The patch shape is critical for the final result. The sample code is using a 3x3 square patch. Since OpenGL ES shaders does not support non-constant indexed array, the implementation has to be copied through all the pixels in the patch (the codes will be super long if a larger patch is used).

{% highlight c %}

vec3 filter()
{    
    float dx = uPixelSize.x;
    float dy = uPixelSize.y;

    float tempLumi;
    float minLumi = -1.0;
    float Quantize = 10.;
    vec3 color;

    //Go through all the the random selected pixels in a 5x5 patch to find the hightest

    vec3 sample0 = texture2D(sTexture, vec2(vTextureCoord.x - dx, vTextureCoord.y + dy)).rgb;
    tempLumi = dot(sample0, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample0;
    }

    vec3 sample1 = texture2D(sTexture, vec2(vTextureCoord.x - dx, vTextureCoord.y)).rgb;
    tempLumi = dot(sample1, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample1;
    }

    vec3 sample2 = texture2D(sTexture, vec2(vTextureCoord.x - dx, vTextureCoord.y - dy)).rgb;
    tempLumi = dot(sample2, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample2;
    }

    vec3 sample4 = texture2D(sTexture, vec2(vTextureCoord.x, vTextureCoord.y)).rgb;
    tempLumi = dot(sample4, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample4;
    }

    vec3 sample6 = texture2D(sTexture, vec2(vTextureCoord.x + dx, vTextureCoord.y + dy)).rgb;
    tempLumi = dot(sample6, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample6;
    }

    vec3 sample7 = texture2D(sTexture, vec2(vTextureCoord.x + dx, vTextureCoord.y)).rgb;
    tempLumi = dot(sample7, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample7;
    }

    vec3 sample9 = texture2D(sTexture, vec2(vTextureCoord.x + 2.*dx, vTextureCoord.y)).rgb;
    tempLumi = dot(sample9, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample9;
    }

    vec3 sample10 = texture2D(sTexture, vec2(vTextureCoord.x - 2.* dx, vTextureCoord.y)).rgb;
    tempLumi = dot(sample10, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample10;
    }

    vec3 sample11 = texture2D(sTexture, vec2(vTextureCoord.x, vTextureCoord.y - 2.* dy)).rgb;
    tempLumi = dot(sample11, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample11;
    }

    vec3 sample12 = texture2D(sTexture, vec2(vTextureCoord.x, vTextureCoord.y + 2.* dy)).rgb;
    tempLumi = dot(sample12, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample12;
    }

    vec3 sample13 = texture2D(sTexture, vec2(vTextureCoord.x + 2.*dx, vTextureCoord.y + 2.* dy)).rgb;
    tempLumi = dot(sample13, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample13;
    }

    vec3 sample14 = texture2D(sTexture, vec2(vTextureCoord.x - dx, vTextureCoord.y + 2.* dy)).rgb;
    tempLumi = dot(sample14, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample14;
    }

    vec3 sample15 = texture2D(sTexture, vec2(vTextureCoord.x + dx, vTextureCoord.y + 2. *dy)).rgb;
    tempLumi = dot(sample15, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample15;
    }

    vec3 sample16 = texture2D(sTexture, vec2(vTextureCoord.x- 2.*dx, vTextureCoord.y + dy)).rgb;
    tempLumi = dot(sample16, W);
    if(tempLumi > minLumi){
        minLumi = tempLumi;
        color = sample16;
    }

    color = floor(color * 10.0) * 0.1;

    return color;
}

{% endhighlight %}

![filter-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/17091936692_6eeb3c9f6a_o.jpg)

### Diffuse Glow Effect

Diffuse glow effect, as termed in Photoshop, gives the image a smooth, dreamy and lightening effect. It softens the skin color if applied to portrait images. I have done some research on Google, however could not find a detail explanation of the mechanism of this effect. Then I dig deep into the codes of the open source image processing software GIMP (It can be cloned from git by git clone git://git.gnome.org/gimp). The effect is termed as Soft Glow Filter in GIMP, and the source code can be found under the plug-in/common folder. Modified for an efficient implementation using Shaders, the steps are summaried:

#### 1. Gaussian Blur

A 3x3 Gaussian Blur box is used for a fast implementation. Slightly adjust the pixel size here to achieve a stronger blurring effect.

{% highlight c %}
...

float dx = uPixelSize.x*1.5;
float dy = uPixelSize.y*1.5;

//Gaussian Blur
vec3 sample0=(texture2D(sTexture, vec2(texturePos.x-dx, texturePos.y+dy)).rgb);
vec3 sample1=(texture2D(sTexture, vec2(texturePos.x-dx, texturePos.y)   ).rgb);
vec3 sample2=(texture2D(sTexture, vec2(texturePos.x-dx, texturePos.y-dy)).rgb);
vec3 sample3=(texture2D(sTexture, vec2(texturePos.x,    texturePos.y+dy)).rgb);
vec3 sample4=(texture2D(sTexture, vec2(texturePos.x,    texturePos.y)   ).rgb);
vec3 sample5=(texture2D(sTexture, vec2(texturePos.x,    texturePos.y-dy)).rgb);
vec3 sample6=(texture2D(sTexture, vec2(texturePos.x+dx, texturePos.y+dy)).rgb);
vec3 sample7=(texture2D(sTexture, vec2(texturePos.x+dx, texturePos.y)   ).rgb);
vec3 sample8=(texture2D(sTexture, vec2(texturePos.x+dx, texturePos.y-dy)).rgb);

{% endhighlight %}

#### 2. Desaturation

Mix with luminance image of itself we can get the saturated image.

{% highlight c %}
vec3 saturation(vec3 color, float sat) {

    float luminance = dot(color, W);
    vec3 lumi = vec3(luminance, luminance, luminance);
 
    return mix(lumi, color, sat);
}
{% endhighlight %}

#### 3. Sigmoidal Transfer

A sigmoid function, which has an "S" shape,  is defined as below. The parameters are adopted from the open source codes of GIMP. (It is a curve adjusting process)

$$ s(t)= \frac{1}{1+e^{-t}}$$

{% highlight c %}
...

const float SIGMOIDAL_BASE = 2.;
const float SHARPNESS = 0.85;
const float SIGMOIDAL_RANGE = 20.;
const float BRIGHTNESS = 1.2;

vec3 sigmoid(vec3 color) {
 
    val = 1./(1. + exp(-1.*(SIGMOIDAL_BASE + SHARPNESS * SIGMOIDAL_RANGE)*(val - 0.5))); 
    val = val * BRIGHTNESS; 
    val = clamp(val, vec3(0.), vec3(1.));
 
    return val;
}

{% endhighlight %}
 
#### 4. Screen Blend

With screen blend mode the values of the pixels in the two layers are negated, multiplied, and then negated again. The result is a brighter picture:

$$ f(a,b) = 1 - (1-a)(1-b) $$

{% highlight c %}
...

vec3 screen(vec3 mask, float alpha, vec3 color){

    return 1.0 - (1.0 - (mask*alpha))*(1.0 - image);

}

{% endhighlight %}

![filter-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/archive/16470994114_5d65ea3957_o.jpg)

### Closure

It is fun to dig into the open source code and reverse engineered out the algorithms and implemented on the faster GPU chip. I hope I could spend more time to do this, but unfortunately I have to deal with some more serious projects to produce papers, so sad. There are two very good open source projects that I get inspirations from: [InstaCam](https://github.com/harism/android_instacam) by Harri Smatt, and [LightBox](https://github.com/lightbox/PhotoProcessing).