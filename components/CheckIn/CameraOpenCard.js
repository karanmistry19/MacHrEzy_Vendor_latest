import React, { useContext, useState, useEffect, useRef } from "react";
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../buttons/button"; // Ensure this component is defined in your project
import { DimensionContext } from "../dimensionContext"; // Ensure this context is defined in your project
import { ModularCard } from "../modularCard"; // Ensure this component is defined in your project
import TopCameraSwitch from "../TopSwitch/TopCameraSwitch"; // Ensure this component is defined in your project
import { Camera, CameraView, useCameraPermissions } from "expo-camera";

const CameraOpenCard = ({
	location,
	setLocation,
	photoUri,
	setPhotoUri,
	addError,
	addSuccess,
}) => {
	const { window } = useContext(DimensionContext);
	const [selectedTab, setSelectedTab] = useState("Pending");
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [isCameraReady, setIsCameraReady] = useState(false);
	const [hasPermission, setHasPermission] = useState(null);
	//const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
	const [isPreview, setIsPreview] = useState(false);
	const [cameraFacing, setCameraFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const cameraRef = useRef(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(err) =>
					addError(
						"Geolocation Permission Denied/Not Supported.",
						4000,
					),

				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
			);
		} else {
			addError("Geolocation is not supported by this browser.", 3000);
		}
	}, []);

	// Check for camera permission
	useEffect(() => {
		if (hasPermission === false) {
			addError("Camera access is denied.", 3000); // Added error message when permission is denied
		}
	}, [hasPermission]);

	if (hasPermission === false) {
		return (
			<View>
				<Text>No Access to Camera!</Text>
			</View>
		);
	}
	const retakePicture = async () => {
		if (cameraRef.current) {
			setIsPreview(false); // Resume camera preview
			await cameraRef.current.resumePreview();
		}
		setPhotoUri(null); // Clear the current photo URI
	};

	const cancelCapture = () => {
		setIsCameraOpen(false); // Close the camera
		setPhotoUri(null); // Reset the photo URI
		setIsPreview(false); // Reset preview state
	};

	const onCameraReady = () => {
		setIsCameraReady(true);
	};

	const takePicture = async () => {
		try {
			if (cameraRef.current && isCameraReady) {
				const options = {
					quality: 0.5,
					base64: true,
					skipProcessing: true,
				};
				const data = await cameraRef.current.takePictureAsync(options);
				setPhotoUri(data.uri); // Set photo URI to state
				//console.log("Photo taken: ", data);
				await cameraRef.current.pausePreview(); // Pause the preview here
				setIsPreview(true);
			}
		} catch (error) {
			addError("Error taking picture/Camera Permission Denied", 3000);
		}
	};

	const openCamera = () => {
		setIsCameraOpen(true);
	};

	return (
		<ScrollView>
			<ModularCard
				style={{
					flex: 1,
					width: window.width,
					marginTop: 10,
				}}
				cardContent={
					<View style={styles.container}>
						<View style={styles.header}>
							<TopCameraSwitch
								width={300}
								selectedTab={selectedTab}
								setSelectedTab={setSelectedTab}
								title={"New Upload"}
								title2={"Recent"}
							/>
							<View style={styles.settingsIcon}>
								<Icon name="sliders" size={20} />
							</View>
						</View>
						<View style={styles.cameraContainer}>
							<View style={styles.cameraField}>
								{isCameraOpen ? (
									<CameraView
										style={styles.cameraPreview}
										ref={cameraRef} // Add the camera reference here
										facing={cameraFacing}
										onCameraReady={onCameraReady} // Ensure this is included
									/>
								) : (
									<TouchableOpacity
										onPress={openCamera}
										style={styles.touchable}
									>
										<Icon
											name="camera"
											size={50}
											color={"#9F232B"}
										/>
										<Text style={styles.buttonText}>
											Click here to open your camera
										</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
						{isPreview && (
							<View style={styles.previewActions}>
								<Button
									title="Retake"
									onPress={retakePicture}
								/>
								<Button
									title="Cancel"
									onPress={cancelCapture}
								/>
							</View>
						)}
						{isCameraOpen && (
							<View style={styles.captureButtonContainer}>
								<Button
									title={"Capture and Share my location"}
									onPress={async () => {
										await takePicture(); // Ensure to await the picture capture
										if (Platform.OS !== "web") {
											getLocationForMobile(); // Get location only when button is clicked for mobile
										} else {
											navigator.geolocation.getCurrentPosition(
												(position) => {
													const {
														latitude,
														longitude,
													} = position.coords;
													setLocation({
														latitude,
														longitude,
													});
												},
												(error) => console.error(error),
												{ enableHighAccuracy: true },
											);
										}
									}}
								/>
							</View>
						)}
					</View>
				}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	header: {
		borderBottomColor: "#EBEFF2",
		borderBottomWidth: 1,
		paddingBottom: 15,
		marginBottom: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	settingsIcon: {
		borderWidth: 1,
		borderColor: "#EBEFF2",
		width: 36,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 1000,
	},
	cameraContainer: {
		backgroundColor: "#F7F9FB",
		padding: 10,
		height: 500,
	},
	cameraField: {
		flex: 1,
		borderWidth: 2,
		borderColor: "#888888",
		borderStyle: "dashed",
		padding: 40,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		marginTop: 10,
		color: "#888888",
		fontSize: 16,
	},
	captureButtonContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	cameraPreview: {
		flex: 1,
		width: "100%",
		height: 100,
		marginTop: 10,
		borderRadius: 10,
	},
	touchable: {
		justifyContent: "center",
		alignItems: "center",
	},
	previewActions: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
});

export default CameraOpenCard;
