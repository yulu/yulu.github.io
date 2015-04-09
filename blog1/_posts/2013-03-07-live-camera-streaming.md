---
layout: post
title:  "Live Camera Streaming using OpenGL Texture Mapping"
date:   2013-03-07 19:00:00
categories: blog1
---

Previous works are handling only single image. Now I consider to apply those shader manipulations on live camera feed in, so that I might achieve a "real-time" filter effect.  There is a good [example](http://nhenze.net/?p=172) on camera frame mapped to OpenGL texture by Niels Henze. The app can be downloaded from [Google Play](https://play.google.com/store/apps/details?id=de.offis.magic.core&hl=en). However the author just dealt with black-and-white image mapping. To deal with color image really takes much more effort. The main problem to handle in the process is the image format conversion. Since the raw data from the camera is yuv format, rgb format however is required for the gltexture mapping. While pixel manipulation is extremely slow in Java (that's why we want to use GPU to take the burden off). Here I adopt a piece of native code (from the [AndAR](https://code.google.com/p/andar/) project) to perform the yuv to rgb conversion.

Android NDK is required since we need to build lib from native codes. This piece of C++ code below is the conversion from yuv to rgb:

{% highlight c %}
const int bytes_per_pixel = 2;

static inline void color_convert_common(
    unsigned char *pY, unsigned char *pUV,
    int width, int height,
    unsigned char *buffer,
    int size, int gray, int rotate)
{
    int i, j;
    int nR, nG, nB;
    int nY, nU, nV;
    unsigned char *out = buffer;
    int offset = 0;

    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            nY = *(pY + i * width + j);
            nV = *(pUV + (i/2) * width + bytes_per_pixel * (j/2));
            nU = *(pUV + (i/2) * width + bytes_per_pixel * (j/2) + 1);

            // Yuv Convert
            nY -= 16;
            nU -= 128;
            nV -= 128;

            if (nY < 0)
                nY = 0;

            nB = (int)(1192 * nY + 2066 * nU);
            nG = (int)(1192 * nY - 833 * nV - 400 * nU);
            nR = (int)(1192 * nY + 1634 * nV);

            nR = min(262143, max(0, nR));
            nG = min(262143, max(0, nG));
            nB = min(262143, max(0, nB));

            nR >>= 10; nR &= 0xff;
            nG >>= 10; nG &= 0xff;
            nB >>= 10; nB &= 0xff;

            out[offset++] = (unsigned char)nR;
            out[offset++] = (unsigned char)nG;
            out[offset++] = (unsigned char)nB;
        }
    }
}

{% endhighlight %}

The Android project source code can be pulled from the my [github](). There are a TextView class I added on, just a test of another app under development of mine. The issue I encountered currently is that texture mapping is not working in my HTC One X with image dimension more than 128x128. So the code might not be working on devices other than Samsung Galaxy S3 (the only device on hand for testing).