# Example on how to use the Geolocation API from Android with Nativescript

- I made this, because [nativescript-geolocation plugin](https://github.com/NativeScript/nativescript-geolocation) didn't work reliably for me.

- All the native Android API functions can be used as shown in [main-page.js](app/main-page.js)

- **Comments, Suggestions and/or Questions are very welcome.**

## Usage
- `tns plugin add nativescript-permissions`

- No need for [nativescript-geolocation plugin](https://github.com/NativeScript/nativescript-geolocation) anymore

- Documented usage with comments can be found in [main-page.js](app/main-page.js)

- [Android LocationManager Developer Page](https://developer.android.com/reference/android/location/LocationManager.html)

## TO NOTICE !
- I do not know, if [nativescript-geolocation plugin](https://github.com/NativeScript/nativescript-geolocation) works with iOS. As for now I do not have an iOS to test with.
- I do not know yet, how to adapt this code for iOS.

- The first time the app is started the permissions are not granted and the `requestPermissions()` Promise will return false. As soon as the App is started a second time, they are automatically granted. This is somehow linked to the behaviour of `nativescript-permissions` plugin. It adds the permissions on runtime to the `AndroidManifest.xml`. Therefore they can of cause not be granted when the App loads for the first time.
```
	android.Manifest.permission.ACCESS_FINE_LOCATION,
	android.Manifest.permission.ACCESS_COARSE_LOCATION
```

- To have the permissions granted right away after installation and from the very first start place the permissions hardcoded by hand into `AndroidManifest.xml`
```
	<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
	<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

- If they are hardcoded, there is no need to call and use `requestPermissions()` anymore and it can be omitted.