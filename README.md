# Example on how to use the Geolocation API from Android with Nativescript

I made this, because nativescript-geolocation plugin didn't work reliably for me.

[Android LocationManager Dev Page](https://developer.android.com/reference/android/location/LocationManager.html)

All the native Android API functions can be used as shown in main-page.js

**Sugestions or Questions are very welcome.**

## Usage
`tns plugin add nativescript-permissions`

no need for nativescript-geolocation plugin anymore

within main-page.js is the documented usage with comments from the Android LocationManager Developer Page

## TO NOTICE !
- I do not know, if nativescript-geolocation works with iOS.
- I do not know yet, how to adapt this code so that it also runs on iOS.

- The first time the app is started the permissions are not granted and the `requestPermissions()` Promise will return false. As soon as the App is started a second time, they are automatically granted. This is somehow linke to the behaviour of `nativescript-permissions` plugin. It adds the permissions on runtime to the `AndroidManifest.xml` therefore they can't be granted when the App loads for the first time.
```
android.Manifest.permission.ACCESS_FINE_LOCATION,
android.Manifest.permission.ACCESS_COARSE_LOCATION
```

- To avoid that place the permissions hardcoded by hand into `AndroidManifest.xml`
```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

- If they are hardcoded, permissions are granted from the very first start of the App. That also means there would not be any reason to use `requestPermissions()` anymore and it could be omitted.