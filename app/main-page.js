/*
     List<String> 	getAllProviders()
		Returns a list of the names of all known location providers.	
	::: usage
		androidLocationManager.getAllProviders();
	________________________________
    void requestLocationUpdates (String provider, 
                long minTime, 
                float minDistance, 
                LocationListener listener)

       	Register for location updates using the named provider, and a pending 
       	intent. 

    		provider 	String: the name of the provider with which to register
			minTime 	long: minimum time interval between location updates, in milliseconds
			minDistance 	float: minimum distance between location updates, in meters
			listener 	LocationListener: a LocationListener whose onLocationChanged(Location) 
							method will be called for each location update
    ::: usage - instant update:
    	androidLocationManager.requestLocationUpdates('gps', 0 , 0, locationListener);
    	androidLocationManager.requestLocationUpdates('network', 0 , 0, locationListener);
    	androidLocationManager.requestLocationUpdates('passive', 0 , 0, locationListener);
	
	::: usage - intervalled update
    	androidLocationManager.requestLocationUpdates('gps', 20000 , 5, locationListener)
	________________________________
	Location 	getLastKnownLocation(String provider)
		Returns a Location indicating the data from the last known location fix obtained from 
		the given provider.    
    ::: usage
    	androidLocationManager.getLastKnownLocation('gps')
    	var latitude = androidLocationManager.getLastKnownLocation('net').getLatitude();
    	alert('Latitue: ' + latitude);
    ________________________________
    void 	requestSingleUpdate(String provider, LocationListener listener, Looper looper)
		Register for a single location update using the named provider and a callback.
	::: usage
		androidLocationManager.requestSingleUpdate('gps', locationListener, null);
	________________________________
	void 	removeUpdates(LocationListener listener)
		Removes all location updates for the specified LocationListener. 
		Stops either requestSinlgeUpdate(...) or requestLocationUpdates(...) instantly and
		should be called after a Promise calls requestLocationUpdates in .then()
	::: usage
		androidLocationManager.removeUpdates(locationListener);
*/

"use strict";
var createViewModel = require("./main-view-model").createViewModel;
var application = require("application");
var permissions = require("nativescript-permissions");

var androidLocationManager;

function pageLoaded(args) {

    var page = args.object;  

    requestPermissions()
    	.then(function (granted){
    		console.log('Location Permissions granted');
    		androidLocationManager = application.android.context.getSystemService(android.content.Context.LOCATION_SERVICE);    

		    var criteria = createCriteria();
		    var locationListener = createLocationListener();

			console.log(androidLocationManager.getAllProviders());

			androidLocationManager.requestSingleUpdate('gps', locationListener, null);

	    })
	    .catch(function (error) {
	    	console.log('Location Permissions not granted', error);
    	});
    

    page.bindingContext = createViewModel();
}

exports.pageLoaded = pageLoaded;

function createCriteria() {
    var criteria = new android.location.Criteria();
    criteria.setAccuracy(android.location.Criteria.ACCURACY_FINE);
    /* 
	a couple of other options (for more see https://developer.android.com/reference/android/location/Criteria.html)
	
		criteria.setPowerRequirement(Criteria.POWER_LOW); // Chose your desired power consumption level.
	    criteria.setSpeedRequired(true); // Chose if speed for first location fix is required.
	    criteria.setAltitudeRequired(false); // Choose if you use altitude.
	    criteria.setBearingRequired(false); // Choose if you use bearing.
	    criteria.setCostAllowed(false); // Choose if this provider can waste money :-)

    get best provider with given criterias: locationManager.getBestProvider(criteria, true)
    */
    return criteria;
}

function createLocationListener() {
    var locationListener = new android.location.LocationListener({
        onLocationChanged: function (location) {
        	alert('Location changed ' + new Date());
        	/*
			Called when the location has changed.
			
			location 	Location: The new location, as a Location object.
        	*/
        	alert('Location changed ' + new Date() + location.getLatitude());
        },
        onProviderDisabled: function (provider) {
        	/*
        	Called when the provider is disabled by the user. If requestLocationUpdates is called on an already disabled provider, this method is called immediately.
			
			provider 	String: the name of the location provider associated with this update. 
        	*/
        	alert('Provider disabled ' + new Date());
        },
        onProviderEnabled: function (provider) {
        	/*
        	Called when the provider is enabled by the user.

        	provider 	String: the name of the location provider associated with this update. 
        	*/
        	alert('Provider enabled ' + new Date());
        },
        onStatusChanged: function (provider, status, extras) {
        	/*
        	Called when the provider status changes. This method is called when a provider is unable to fetch a location or if the provider has recently become available after a period of unavailability.

        	provider 	String: the name of the location provider associated with this update.
        	status 		int: OUT_OF_SERVICE (Constant value: 0) if the provider is out of service, and this is not expected to change in the near future; TEMPORARILY_UNAVAILABLE (Constant Value: 1) if the provider is temporarily unavailable but is expected to be available shortly; and AVAILABLE (Constant Value: 2) if the provider is currently available.
        	extras 		Bundle: an optional Bundle which will contain provider specific status variables.
						A number of common key/value pairs for the extras Bundle are listed below. Providers that use any of the keys on this list must provide the corresponding value as described below.
    						satellites - the number of satellites used to derive the fix 
        	*/
        	alert('Status Changed ' + new Date());
        }
    });
    return locationListener;
}

function requestPermissions() {
  return new Promise(function(resolve, reject) {
    
    if (!application.android) {
    	return resolve(true);
    }   

    permissions.requestPermission(
    	[
      		android.Manifest.permission.ACCESS_FINE_LOCATION,
       		android.Manifest.permission.ACCESS_COARSE_LOCATION
       	],
      	"This demo will stink without these..."
    )
    .then(function (result) {
        console.log("Permissions granted!");
        resolve(true);
    })
    .catch(function (result) {
        console.log("Permissions failed :(", result);
        reject(false);
    });

  });
}