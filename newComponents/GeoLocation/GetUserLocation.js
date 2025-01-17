import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Platform,
	StyleSheet,
	Text,
	View,
	PermissionsAndroid,
} from "react-native";
import Geolocation from "react-native-geolocation-service"; // Mobile only
import { request, PERMISSIONS, RESULTS } from "react-native-permissions"; // Mobile only
// const requestLocationPermission = async () => {
// 	try {
// 		const granted = await PermissionsAndroid.request(
// 			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// 			{
// 				title: "Geolocation Permission",
// 				message: "Can we access your location?",
// 				buttonNeutral: "Ask Me Later",
// 				buttonNegative: "Cancel",
// 				buttonPositive: "OK",
// 			},
// 		);
// 		console.log("granted", granted);
// 		if (granted === "granted") {
// 			console.log("You can use Geolocation");
// 			return true;
// 		} else {
// 			console.log("You cannot use Geolocation");
// 			return false;
// 		}
// 	} catch (err) {
// 		return false;
// 	}
// };
const GetUserLocation = () => {
	const [geoLocation, setGeoLocation] = useState(null);
	const [hasPermission, setHasPermission] = useState(false);

	// const getLocationForMobile = () => {
	// 	// For mobile (iOS/Android) using react-native-geolocation-service
	// 	Geolocation.getCurrentPosition(
	// 		(position) => {
	// 			setLocation(position.coords);
	// 			setHasPermission(true); // Location fetched, so permission granted
	// 		},
	// 		(error) => {
	// 			console.error(error);
	// 			Alert.alert("Error", "Unable to get location");
	// 		},
	// 		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
	// 	);
	// };
	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
			//console.log(navigator.geolocation.getCurrentPosition(showPosition));
		} else {
			toast.warn("Geolocation is not supported by this browser.");
		}
	};
	const showPosition = (position) => {
		setGeoLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
		//console.log(geoLocation);

		return position;
	};
	// const getLocationForWeb = () => {
	// 	// For web using the browser's Geolocation API
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				// This matches the format expected by both web and mobile
	// 				setLocation(position.coords);
	// 				setHasPermission(true); // Permission is automatically granted on web
	// 			},
	// 			(error) => {
	// 				console.error(error);
	// 				Alert.alert("Error", "Unable to get location on the web");
	// 			},
	// 		);
	// 	} else {
	// 		Alert.alert(
	// 			"Error",
	// 			"Geolocation is not supported by this browser.",
	// 		);
	// 	}
	// };

	// const validateUserLocation = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			`${config.baseUrl}api/validateUserLocation`,
	// 			{
	// 				latitude: location.latitude,
	// 				longitude: location.longitude,
	// 			},
	// 		);
	// 		if (response.data.status === "granted") {
	// 			return console.log("You are Checked In Successfully");
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 		return console.log("Error validating user location");
	// 	}
	// };

	// const handleCheckIn = () => {
	// 	if (location) {
	// 		const isInside = isUserInsideGeofence(location);
	// 		if (isInside) {
	// 			Alert.alert(
	// 				"Success",
	// 				"You are within the geofenced area! You can check-in.",
	// 			);
	// 		} else {
	// 			Alert.alert("Error", "You are not within the geofenced area.");
	// 		}
	// 	}
	// };
	useEffect(() => {
		const checkPermissions = async () => {
			if (Platform.OS === "web") {
				// For web, no explicit permission request needed
				getLocationForWeb();
			} else {
				// For mobile (Android/iOS), use react-native-permissions
				let permissionStatus;

				if (Platform.OS === "android") {
					permissionStatus = await request(
						PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
					);
				} else if (Platform.OS === "ios") {
					permissionStatus = await request(
						PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
					);
				}

				if (permissionStatus === RESULTS.GRANTED) {
					setHasPermission(true);
					getLocationForMobile(); // Fetch location if permission is granted
				} else if (permissionStatus === RESULTS.DENIED) {
					Alert.alert(
						"Permission Denied",
						"You need to grant location permission.",
					);
				} else {
					Alert.alert(
						"Permission Denied",
						"Location permission is permanently denied.",
					);
				}
			}
		};

		checkPermissions(); // Check permissions or call the appropriate function on mount
	}, []);

	return (
		<View style={styles.container}>
			{hasPermission ? (
				location ? (
					<Text>
						Latitude: {geoLocation.latitude}, Longitude:{" "}
						{geoLocation.longitude}
					</Text>
				) : (
					<Text>Loading...</Text>
				)
			) : (
				<Text>Permission not granted</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GetUserLocation;
