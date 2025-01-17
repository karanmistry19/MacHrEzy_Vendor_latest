import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Modal,
	SafeAreaView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Button from "../../components/buttons/button";

// Component for displaying a countdown timer
const CountdownTimer = ({ initialTime, onTimerEnd }) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		if (timeLeft === 0) {
			onTimerEnd();
			return;
		}

		// Set up interval to decrement time every second
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		// Clean up interval on component unmount or when timeLeft changes
		return () => clearInterval(timer);
	}, [timeLeft, onTimerEnd]);

	// Format time as MM:SS
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<Text style={styles.timerText}>
			Time remaining: {formatTime(timeLeft)}
		</Text>
	);
};

// Main QR Code Modal component
const QrCodeModal = ({ qrCodeModal, setQrCodeModal, user }) => {
	const onClose = () => setQrCodeModal(false);

	// Generate QR code value using current time and date
	const qrCodeValue = `${
		user.empCode
	}_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`; 

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={qrCodeModal}
			statusBarTranslucent={true}
			onRequestClose={onClose}
			onBackdropPress={onClose}
			onTouchOutside={onClose}
		>
			<SafeAreaView style={styles.modalContainer}>
				<View style={styles.modalContent}>
					{/* Close icon */}
					<TouchableOpacity
						style={styles.closeIcon}
						onPress={onClose}
					>
						<Icon name="close" size={24} color="#333" />
					</TouchableOpacity>
					<Text style={styles.title}>Scan QR Code</Text>
					{/* QR Code container */}
					<View style={styles.qrContainer}>
						<QRCode
							value={qrCodeValue}
							size={200}
							color="black"
							backgroundColor="white"
						/>
					</View>
					<Text style={styles.instruction}>
						Please scan this QR code to check in
					</Text>

					{/* Countdown timer */}
					<CountdownTimer initialTime={30} onTimerEnd={onClose} />

					{/* Close button */}
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

// Styles for the components
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 30,
		borderRadius: 20,
		alignItems: "center",
		maxWidth: 400,
	},
	closeIcon: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	qrContainer: {
		padding: 20,
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
		marginBottom: 20,
	},
	instruction: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: "rgb(155, 43, 44)",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 30,
	},
	closeButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	timerText: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
});

// Mapping Redux state to component props
const mapStateToProps = (state) => ({
	user: state.user, // Extract 'user' from Redux state
});

export default connect(mapStateToProps)(QrCodeModal);
