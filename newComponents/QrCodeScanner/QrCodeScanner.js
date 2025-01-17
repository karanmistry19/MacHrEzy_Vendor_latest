import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Modal,
	SafeAreaView,
	StatusBar,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { connect } from "react-redux";
import { fetchEmployeeDetailsQr } from "../../redux/actions/eis.action";
import config from "../../config/config";
import { Camera } from "expo-camera";

const Icon = ({ name, size, color }) => {
	const iconPaths = {
		close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
		calendar:
			"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z",
		time: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
		business:
			"M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
		location:
			"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
	};

	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="rgb(155, 43, 44)"
		>
			<Path d={iconPaths[name]} />
		</Svg>
	);
};

const Button = ({ title, onPress, style, textStyle }) => (
	<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
		<Text style={[styles.buttonText, textStyle]}>{title}</Text>
	</TouchableOpacity>
);

function QrCodeScanner({
	qrCodeScannerModal,
	setQrCodeScannerModal,
	fetchEmployeeDetailsQr,
	employeeDetailsQR,
}) {
	const [loading, setLoading] = useState(true);
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [empCode, setEmpCode] = useState(null);
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		const [empCode, date, time] = data.split("_");
		setEmpCode(empCode);
		setDate(date);
		setTime(time);
		setModalVisible(true);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	// useEffect(() => {
	// 	fetchEmployeeDetailsQr("H004711")
	// 		.then(() => setLoading(false)) // Set loading false after data is fetched
	// 		.catch(() => setLoading(false)); // Handle any errors
	// }, [fetchEmployeeDetailsQr]);

	useEffect(() => {
		fetchEmployeeDetailsQr(empCode)
			.then(() => setLoading(false)) // Set loading false after data is fetched
			.catch(() => setLoading(false)); // Handle any errors
	}, [fetchEmployeeDetailsQr]);

	// const image = {
	// 	url: `${config.baseUrl}api/user/dp?empCode=${"H004711"}`,
	// };
	const image = {
		url: `${config.baseUrl}api/user/dp?empCode=${"empCode"}`,
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			{scanned ? (
				<>
					<Text style={styles.text}>Scanned Data: {scannedData}</Text>
					<Button
						title="Tap to Scan Again"
						onPress={() => setScanned(false)}
					/>
				</>
			) : (
				<Camera
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={StyleSheet.absoluteFillObject}
					barCodeScannerSettings={{
						barCodeTypes: [Camera.Constants.BarCodeType.qr], // Include other barcode types if needed
					}}
				/>
			)}
			<Modal
				animationType="slide"
				transparent={true}
				visible={qrCodeScannerModal}
				onRequestClose={() => setQrCodeScannerModal(false)}
			>
				<View style={styles.modalBackground}>
					<View style={styles.modalContent}>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setQrCodeScannerModal(false)}
						>
							<Icon name="close" size={24} color="#4b5563" />
						</TouchableOpacity>

						<View style={styles.headerContainer}>
							<Image
								source={
									image.url ||
									require("../../assets/avatar.jpg")
								}
								style={styles.profileImage}
							/>
							<Text style={styles.nameText}>
								{employeeDetailsQR?.empName || "Not Found"}
							</Text>
							<Text style={styles.codeText}>
								{employeeDetailsQR?.empCode || "Not Found"}
							</Text>
						</View>

						<View style={styles.detailsContainer}>
							<Text style={styles.detailsTitle}>
								Employee Details
							</Text>
							<View style={styles.detailRow}>
								<Icon
									name="location"
									size={20}
									color="#6366f1"
								/>
								<Text style={styles.detailText}>
									Location:{" "}
									{employeeDetailsQR?.siteName || "Not Found"}
								</Text>
							</View>
							<View style={styles.detailRow}>
								<Icon
									name="business"
									size={20}
									color="#6366f1"
								/>
								<Text style={styles.detailText}>
									Department:{" "}
									{employeeDetailsQR?.deptName || "Not Found"}
								</Text>
							</View>
							<View style={styles.detailRow}>
								<Icon name="time" size={20} color="#6366f1" />
								<Text style={styles.detailText}>
									Time: {new Date().toLocaleTimeString()}
									{"-"}
									{new Date().toLocaleDateString()}
								</Text>
							</View>
						</View>

						<View style={styles.buttonContainer}>
							<Button
								title="Check In"
								onPress={() => {}}
								style={styles.checkInButton}
								textStyle={styles.buttonText}
							/>
							<Button
								title="Check Out"
								onPress={() => {}}
								style={styles.checkOutButton}
								textStyle={styles.buttonText}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		borderColor: "none",
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		justifyContent: "center",
		backgroundColor: "#ffffff",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: "110%",
		height: "110%", // Increase the width of the modal
	},
	closeButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 1,
	},
	headerContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 4,
		borderColor: "rgb(155, 43, 44)",
		marginBottom: 10,
	},
	nameText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1f2937",
	},
	codeText: {
		fontSize: 16,
		color: "#4b5563",
		marginBottom: 10,
	},
	detailsContainer: {
		width: "100%",
		marginBottom: 20,
		backgroundColor: "#E6E6E6",
		flex: 1,
		alignItems: "left",
		justifyContent: "center",
		borderRadius: 20,
		paddingLeft: 10,
	},
	detailsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#1f2937",
		marginBottom: 10,
	},
	detailRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	detailText: {
		fontSize: 16,
		color: "#4b5563",
		marginLeft: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
	},
	button: {
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		width: "48%", // Adjust the width to create space between buttons
		elevation: 3, // Add shadow for Android
		shadowColor: "#000", // Add shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	checkInButton: {
		backgroundColor: "rgb(155, 43, 44)",
	},
	checkOutButton: {
		backgroundColor: "rgb(155, 43, 44)",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
		textTransform: "uppercase", // Make text uppercase for a more professional look
	},
});
const mapStateToProps = ({ employeeDetailsQR }) => ({
	employeeDetailsQR,
});

export default connect(mapStateToProps, { fetchEmployeeDetailsQr })(
	QrCodeScanner,
);
