---
layout: post
title:  "How to Distribute Library on jCenter and My First UI Lib"
date:   2016-02-01 18:00:00
categories: blog1
---

In order to modularize the [ViSearch Android SDK](https://github.com/visenze/visearch-sdk-android) that I was working with previously, I developed my very first UI lib - [image-crop-layout](https://github.com/yulu/crop-image-layout). This is a light-weight image cropping module that supports UI customization and box update listener. 

Here is a very good tutorial on how to [upload a library to jCenter by Brian Attwell](http://brianattwell.com/distributing-android-libs-via-jcenter/). 

### Submit library to jCenter via Bintray

#### Step 0
Register a [Bintray](https://bintray.com/) account and create a new package for the library using a proper Bintray repo name.

#### Step 1
Add bintray plug-in and maven plug-in under the project's `build.gradle` file

{% highlight python %}
    dependencies {
        classpath 'com.android.tools.build:gradle:1.3.0'
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.2'
        classpath 'com.github.dcendents:android-maven-gradle-plugin:1.3'
    }
{% endhighlight %}

#### Step 2
Config the metadata by adding the script to `build.gradle` file under the library module

{% highlight c %}
ext {
    // Where you will see your artifact in Bintray's web interface
    // The "bintrayName" should match the name of the Bintray repro.
    bintrayRepo = "maven"
    bintrayName = "crop-image-layout"

    // Maven metadata
    publishedGroupId = "me.littlecheesecake"
    libraryName = "CropImageLayout"
    // Save yourself a head ache, and set this equal to the name of the Android Studio library
    // module. The artifact name needs to match the name of the library.
    artifact = "croplayout"

    libraryDescription = "Crop image view layout"
    libraryVersion = "${versionMajor}.${versionMinor}.${versionPatch}"

    developerId = "yulu"
    developerName = "Yu Lu"
    developerEmail = "yulu8798@gmail.com"
}
{% endhighlight %}

#### Step 3
apply the bintray plug-in by including the script from other's gist:

{% highlight python %}
apply from: 'https://raw.githubusercontent.com/attwellBrian/JCenter/master/installv1.gradle'
apply from: 'https://raw.githubusercontent.com/attwellBrian/JCenter/master/bintrayv1.gradle'
{% endhighlight %}

or download the scripts and apply from local path:

{% highlight python %}
apply from: '../tools/bintray.gradle'
{% endhighlight %}

Then upload the `local.properties` file in the project by including the bintray user name and password:

{% highlight python %}
bintray.user=(BINTRAY_USERNAME)
bintray.apikey=(BINTRAY_API_KEY)
{% endhighlight %}

#### Step 4
Run gradle command to upload the library after implementation and testing:

{% highlight python %}
> ./gradlew bintrayUpload
{% endhighlight %}

After successfully upload, you can include the library in the dependencies but need to include the repo

{% highlight python %}
repositories {
    maven {
        url 'https://dl.bintray.com/yulu/maven/'
    }
}

dependencies {
    compile 'me.littlecheesecake:crop-image-layout:1.0.5'
}
{% endhighlight %}

By add the package to jCenter using the option provided on bintray website, the step of including the maven repo could be eliminated.

### Usage the crop-image-layout library

#### Import

{% highlight python %}
dependencies {
    compile 'me.littlecheesecake:croplayout:1.0.5'
    ...
}
{% endhighlight %}

#### Usage

{% highlight java %}
EditPhotoView imageView = (EditPhotoView) findViewById(R.id.editable_image);
EditableImage image = new EditableImage(this, R.drawable.photo2);
image.setBox(new ScalableBox(25,180,640,880));

imageView.initView(this, image);

imageView.setOnBoxChangedListener(new OnBoxChangedListener() {
    @Override
    public void onChanged(int x1, int y1, int x2, int y2) {
        //TODO: cropping box updated 
    }
});
{% endhighlight %}

#### UI Customization

{% highlight xml %}
<me.littlecheesecake.croplayout.EditPhotoView
    android:id="@+id/editable_image"
    android:layout_width="300dp"
    android:layout_height="200dp"
    android:layout_margin="20dp"
    android:background="#fff"
    crop:crop_corner_color="#45B4CA"
    crop:crop_line_color="#d7af55"
    crop:crop_shadow_color="#77ffffff"/>
{% endhighlight %}

![image_attr](https://raw.githubusercontent.com/yulu/crop-image-layout/master/doc/crop_attr.png)


#### Known Issue

- actual cropping of the image is not implemented, but only update the selected area (cropping box)
- crop box will be reset to the full image after rotation
- image zoom-in is not supported