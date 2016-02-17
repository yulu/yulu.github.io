---
layout: post
title:  "A Photo-sharing App using Facebook and Weibo API"
date:   2013-04-04 19:00:00
categories: blog1
---

I have spent some time to play around with [Facebook](https://developers.facebook.com/android/) and [Weibo](http://open.weibo.com/wiki/SDK#Android_SDK) SDK for Android and create an app for photo-sharing to Facebook and Weibo with in-app log in. Here are the steps and tips. The source code is available in my [Github Repo](https://github.com/yulu/SocialShare). Before it can be built and run, some steps need to be done first:

#### For Facebook (details in section 2)

1. Download Facebook SDK and add the correct dependency path

2. Generate and filled in the key hash in the app development page

3. Fill in your own app id in res/values/strings.xml

#### For Weibo (details in section 3)

1. Add the weibo lib (.jar) file in libs.

2. Add app key in res/values/strings.xml

3. Add the test user in the app management if the user is not the developer

### 1. Create an app with simple UI

#### 1.1 Main Activity Layout

The UI is minimum. Take notes that the uri (local path) of the image needs to be passed to the two new activities which are triggered by the "Facebook" and Weibo" buttons. Since the screen sizes differ for phones, some photo might be too large to be displayed, you may want to resize it before display (not done in the sample code).

Sample codes for starting activity with parameters:

{% highlight java %}
private String selectedImagePath;

...

facebookButton.setOnClickListener(new OnClickListener(){

    public void onClick(View arg0){

        Intent intent = new Intent(SocialShare.this, facebookUpload.class);
        intent.putExtra("bitmapPath", selectedImagePath);
        startActivity(intent);

    }
});



weiboButton.setOnClickListener(new OnClickListener(){
    public void onClick(View arg0){

        Intent intent = new Intent(SocialShare.this, weiboUpload.class);
        intent.putExtra("bitmapPath", selectedImagePath);
        startActivity(intent);

    }
 });
 
{% endhighlight %}

The main UI:

![share-1](/assets/share-1.png)

#### 1.2 Dialog layout for Log-in

The Facebook Log-in button is default, and similar button for weibo log-in is drawn by myself. When the user logged in, the profile image is displayed for the confirmation of the user id.

![share-2](/assets/share-2.png)

### 2. Facebook Log-in

[Here](https://developers.facebook.com/docs/getting-started/facebook-sdk-for-android/3.0/) is a must-go-through tutorial for Facebook integration in Android app. The main points summarized below

#### 2.1 Add dependency

If the Facebook lib conflict with the project, a error will be shown. Just delete the android-support-v4.jar file in libs folder.

![share-3](/assets/share-3.png)

#### 2.2 Declare Activities in the Manifest

Delcare not only the self-defined activity from which the Facebook log-in is called, but also the default Facebook Log-in activity

{% highlight xml %}
<activity
    android:name="com.sample.socialshare.facebookUpload"
    android:label="@string/app_name"
    android:theme="@android:style/Theme.DeviceDefault.Dialog">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>

<activity
    android:name="com.facebook.LoginActivity"
    android:theme="@android:style/Theme.Translucent.NoTitleBar"
    android:label="@string/app_name"/>
<meta-data
    android:name="com.facebook.sdk.ApplicationId"
    android:value="@string/fb_app_id"/>
{% endhighlight %}
    
#### 2.3 Generate Key Hash
The tutorial has talked about it carefully. It is an IMPORTANT step, I stuck in the development for a long time because I didn't realize I should do this first! Use the keytool to generate the key hash and filled in at the development page app settings accordingly.

{% highlight c %}
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
{% endhighlight %}

![share-4](/assets/share-4.png)

#### 2.4 Add the app_id to the project

Add the app_id provided by Facebook in the project /res/values/strings.xml

![share-5](/assets/share-5.png)

If all the above have been carefully done, the Facebook Log-in should work and can share the photo within the app to Facebook now.

### 3. Weibo Log-in

#### 3.1 Add the Weibo lib in the project

The weibo.sdk.android.sso.jar file should be included in the download zip file from the web. It should be put inside the libs folder. Also a class is copied from the sample code to manage the access token (AccessTokenKeeper.java).

![share-6](/assets/share-6.png)

#### 3.2 Fill the App Key

The same as the Facebook app, the app key is required in the res/values/strings.xml

![share-7](/assets/share-7.png)

####3.3 Add the test user in the app

If the log-in user is not the developer of the sample app (app still under developing and testing, not approved yet), Weibo requires a declare of the test users in the app management page.

![share-8](/assets/share-8.png)

#### 3.4 Get the Profile Image

Weibo SDK does not have default function to load the user profile image. We need to use the AccountAPI object and UsersAPI object, and listening for the query of an Json object. The user profile image url is referred by the "avatar_large" parameter.

{% highlight java %}
try {

    JSONObject ja = new JSONObject(result);
    userId = ja.getLong("uid");
    UsersAPI user = new UsersAPI(weiboUpload.accessToken);

    user.show(userId, new RequestListener(){

        @Override
        public void onComplete(String result) {

            // CONVERT RESPONSE STRING TO JSON ARRAY
            try {
                JSONObject ja = new JSONObject(result);
                profileImageUrl = ja.getString("avatar_large");
                userProfile = getBitmapFromURL(profileImageUrl);

                runOnUiThread(new Runnable() {
                    public void run() {
                        if(profileImageUrl != null)
                            userDiaplay.setImageBitmap(userProfile);
                    }

                });
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onError(WeiboException arg0) {
        }

        @Override
        public void onIOException(IOException arg0) {
        }

    });

} catch (JSONException e) {
    e.printStackTrace();
}

{% endhighlight %}

That's it, the photo-sharing app. It has not been carefully tested and debugged, forgive me for all the bugs in the app, just for sharing.

