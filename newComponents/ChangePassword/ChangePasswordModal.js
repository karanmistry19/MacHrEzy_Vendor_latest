import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	ScrollView,
	Animated,
	Image,
} from "react-native";
import ModalContainer from "../../components/modalContainer/modal";
import axios from "axios";
import config from "../../config/config";
import accept from "../../assets/accept.png";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import acceptGif from "../../assets/icons8-tick.gif";

const ChangePasswordModal = ({ setModalVisible }) => {
	const [currentScreen, setCurrentScreen] = useState(0);
	const [employeeCode, setEmployeeCode] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [unMaskedMobileNo, setUnMaskedMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const otpInputs = useRef([]);

	const splashAnimation = useRef(new Animated.Value(0)).current;

	const handleSendOTP = () => {
		if (employeeCode.length === 7) {
			setIsLoading(true);
			sendOTP(employeeCode);
			setErrorMessage("");
		} else {
			setErrorMessage("Please enter a valid employee code");
		}
	};

	const validatePasswords = () => {
		let newPasswordErrorMsg = "";
		let confirmPasswordErrorMsg = "";

		if (newPassword.length > 0) {
			if (newPassword.length < 6) {
				newPasswordErrorMsg = "Password must be at least 6 characters";
			} else if (!/[a-z]/.test(newPassword)) {
				newPasswordErrorMsg = "Must have at least one lowercase letter";
			} else if (!/[A-Z]/.test(newPassword)) {
				newPasswordErrorMsg = "Must have at least one uppercase letter";
			} else if (!/\d/.test(newPassword)) {
				newPasswordErrorMsg = "Must have at least one number";
			} else if (!/[^a-zA-Z0-9]/.test(newPassword)) {
				newPasswordErrorMsg =
					"Must have at least one special character";
			}
		}

		if (confirmPassword.length > 0) {
			if (confirmPassword !== newPassword) {
				confirmPasswordErrorMsg = "Passwords must match";
			}
		}

		setNewPasswordError(newPasswordErrorMsg);
		setConfirmPasswordError(confirmPasswordErrorMsg);
	};

	useEffect(() => {
		validatePasswords();
	}, [newPassword, confirmPassword]);

	const handleOtpChange = (value, index) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < 3) {
			otpInputs.current[index + 1].focus();
		}
	};

	const handleVerifyOTP = () => {
		const otpString = otp.join("");
		if (otpString.length === 0) {
			setErrorMessage("Please enter the OTP");
		} else if (otpString.length < 4) {
			setErrorMessage("Invalid OTP");
		} else if (/[a-zA-Z]/.test(otpString)) {
			setErrorMessage("Invalid OTP");
		} else {
			verifyOTP(otpString);
		}
	};

	const handleCloseModal = () => {
		setEmployeeCode("");
		setMobileNo("");
		setModalVisible(false);
	};

	const renderOtpInputs = () => {
		return otp.map((digit, index) => (
			<View key={index} style={styles.otpInputWrapper}>
				<TextInput
					style={styles.otpInput}
					value={digit}
					onChangeText={(value) => handleOtpChange(value, index)}
					keyboardType="number-pad"
					maxLength={1}
					ref={(input) => (otpInputs.current[index] = input)}
				/>
			</View>
		));
	};

	const sendOTP = async (employeeCode) => {
		setIsLoading(true);
		if (employeeCode.length === 0) {
			setIsLoading(false);
			setErrorMessage("Please Provide your employee code");
		} else if (employeeCode.length < 7 || employeeCode.length > 7) {
			setIsLoading(false);
			setErrorMessage("Please provide a valid employee code.");
		} else if (employeeCode.length === 7) {
			try {
				const response = await axios.post(
					`${config.baseUrl}api/changePassword/sendOTP`,
					{
						employeeCode: employeeCode,
					},
				);
				setUnMaskedMobileNo(response?.data?.mobileNo[0]);
				setMobileNo(
					response.data.mobileNo[0].replace(/\d(?=\d{2})/g, "*"),
				);

				// Move to next screen after 2 seconds
				if (response?.data?.message === "Success") {
					setTimeout(() => {
						setIsLoading(true);
						setCurrentScreen(1);
						setIsLoading(false);
					}, 2000);
				} else {
					setIsLoading(false);
					setErrorMessage(response.data.error);
				}
			} catch (error) {
				setIsLoading(false);
				setErrorMessage(error.response.data.error);
			}
		}
	};

	const verifyOTP = async (otpString) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${config.baseUrl}api/changePassword/verifyOTP`,
				{
					otp: otpString,
					employeeCode: employeeCode,
					mobileNumber: unMaskedMobileNo,
				},
			);

			// Move to next screen after 2 seconds
			if (response?.data?.message === "Success") {
				setTimeout(() => {
					setIsLoading(true);
					setCurrentScreen(2);
					setIsLoading(false);
				}, 2000);
			} else {
				setIsLoading(false);
				setErrorMessage(response.data.error);
			}
		} catch (e) {
			setIsLoading(false);
			setErrorMessage("Invalid OTP");
		}
	};

	const submitNewPassword = async (newPassword) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${config.baseUrl}api/changePassword/submitNewPassword`,
				{
					newPassword: newPassword,
					confirmPassword: confirmPassword,
					employeeCode: employeeCode,
				},
			);

			// Show splash screen
			Animated.timing(splashAnimation, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();

			// Move to next screen after 2 seconds
			setTimeout(() => {
				Animated.timing(splashAnimation, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}).start(() => {
					setIsLoading(true);
					setModalVisible(false);
					setIsLoading(false);
				});
			}, 2000);
		} catch (e) {
			console.error("Error submitting new password:", e);
			setErrorMessage("Error while setting new password");
			setIsLoading(false);
		}
	};

	const handleSubmitPassword = async () => {
		const schema = Yup.object().shape({
			newPassword: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.matches(
					/[a-z]/,
					"Password must have at least one lowercase letter",
				)
				.matches(
					/[A-Z]/,
					"Password must have at least one uppercase letter",
				)
				.matches(
					/[^a-zA-Z0-9]/,
					"Password must have at least one special character",
				)
				.matches(/\d/, "Password must have at least one number"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
				.required("Confirm password is required"),
		});

		const validationData = {
			newPassword,
			confirmPassword,
		};

		try {
			await schema.validate(validationData, { abortEarly: false });

			await submitNewPassword(newPassword, confirmPassword, employeeCode);
		} catch (error) {
			const errorMessages = error.errors.join(", ");
			setErrorMessage(errorMessages);
		}
	};

	const renderScreen = () => {
		switch (currentScreen) {
			case 0:
				return (
					<View style={styles.screenContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>
								Enter Employee Code:
							</Text>
							<TextInput
								style={styles.input}
								placeholder="Employee Code"
								value={employeeCode}
								onChangeText={setEmployeeCode}
								maxLength={7}
							/>
							{errorMessage ? (
								<Text style={{ color: "red" }}>
									{errorMessage}
								</Text>
							) : null}
						</View>

						<TouchableOpacity
							style={[
								styles.button,
								isLoading && styles.buttonDisabled,
							]}
							onPress={() => handleSendOTP(employeeCode)}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buttonText}>Send OTP</Text>
							)}
						</TouchableOpacity>
					</View>
				);
			case 1:
				return (
					<View style={styles.screenContainer}>
						<View style={styles.otpSection}>
							<Text style={styles.label}>
								Otp was sent to the mobile number: {mobileNo}
							</Text>
							<Text style={styles.otpTitle}>Enter OTP</Text>
							<View style={styles.otpContainer}>
								{renderOtpInputs()}
							</View>
							{errorMessage ? (
								<Text style={{ color: "red" }}>
									{errorMessage}
								</Text>
							) : null}
							{/* <Text
								style={{
									alignSelf: "center",
									marginBottom: 10,
								}}
							>
								Resend OTP
							</Text> */}
							<TouchableOpacity
								style={[
									styles.button,
									isLoading && styles.buttonDisabled,
								]}
								onPress={handleVerifyOTP}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text style={styles.buttonText}>
										Submit OTP
									</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				);
			case 2:
				return (
					<View style={styles.screenContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>New Password:</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextInput
									style={[styles.input, { flex: 1 }]}
									placeholder="Enter new password"
									value={newPassword}
									onChangeText={setNewPassword}
									secureTextEntry={!showPassword}
								/>
								<TouchableOpacity
									style={{ marginLeft: 8 }}
									onPress={() =>
										setShowPassword(!showPassword)
									}
								>
									<Ionicons
										name={showPassword ? "eye-off" : "eye"}
										size={24}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							{newPasswordError ? (
								<Text style={{ color: "red" }}>
									{newPasswordError}
								</Text>
							) : null}
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Confirm Password:</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextInput
									style={[styles.input, { flex: 1 }]}
									placeholder="Confirm new password"
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry={!showConfirmPassword}
								/>
								<TouchableOpacity
									style={{ marginLeft: 8 }}
									onPress={() =>
										setShowConfirmPassword(
											!showConfirmPassword,
										)
									}
								>
									<Ionicons
										name={
											showConfirmPassword
												? "eye-off"
												: "eye"
										}
										size={24}
										color="black"
									/>
								</TouchableOpacity>
							</View>
							{confirmPasswordError ? (
								<Text style={{ color: "red" }}>
									{confirmPasswordError}
								</Text>
							) : null}
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmitPassword}
						>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
						<Animated.View
							style={[
								styles.splashScreen,
								{
									opacity: splashAnimation,
									transform: [
										{
											scale: splashAnimation.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 1],
											}),
										},
									],
								},
							]}
						>
							<Image
								source={acceptGif}
								style={styles.acceptImage}
							/>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 20,
									color: "green",
								}}
							>
								Password Changed Successfully
							</Text>
						</Animated.View>
					</View>
				);
		}
	};

	return (
		<ModalContainer
			modalContent={
				<SafeAreaView style={styles.container}>
					<KeyboardAvoidingView
						behavior={
							Platform.OS === "ios" || Platform.OS === "android"
								? "padding"
								: "height"
						}
						style={styles.keyboardAvoidingView}
					>
						<ScrollView
							contentContainerStyle={styles.scrollViewContent}
						>
							<View style={styles.content}>{renderScreen()}</View>
						</ScrollView>
					</KeyboardAvoidingView>
					<View style={styles.pageIndicator}>
						{[0, 1, 2].map((index) => (
							<TouchableOpacity
								key={index}
								style={styles.indicatorTouchable}
							>
								<View
									style={[
										styles.indicatorDot,
										index === currentScreen &&
											styles.activeIndicatorDot,
									]}
								/>
							</TouchableOpacity>
						))}
					</View>
				</SafeAreaView>
			}
			title="Change  Password"
			onClose={handleCloseModal}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: 450,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	screenContainer: {
		alignItems: "center",
		width: "100%",
	},
	inputContainer: {
		marginBottom: 20,
		width: "100%",
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: "600",
		color: "#333",
		textAlign: "left",
	},
	input: {
		height: 48,
		borderColor: "#ccc",
		borderBottomWidth: 1,
		paddingHorizontal: 12,
		fontSize: 16,
		backgroundColor: "#fff",
		width: "100%",
		marginBottom: 8,
	},
	button: {
		backgroundColor: "rgb(155, 43, 44)",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		marginBottom: 10,
		width: "100%",
	},
	buttonDisabled: {
		opacity: 0.7,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	otpSection: {
		marginTop: 24,
		width: "100%",
	},
	otpTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
	},
	otpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 24,
	},
	otpInput: {
		width: 50,
		height: 50,
		borderWidth: 2,
		borderColor: "#ccc",
		borderRadius: 8,
		fontSize: 24,
		textAlign: "center",
		backgroundColor: "#fff",
	},
	otpInputWrapper: {
		marginHorizontal: 4,
	},
	pageIndicator: {
		flexDirection: "row",
		justifyContent: "center",
		paddingBottom: 20,
	},
	indicatorDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#ccc",
		marginHorizontal: 5,
	},
	activeIndicatorDot: {
		backgroundColor: "rgb(155, 43, 44)",
	},
	indicatorTouchable: {
		padding: 10,
	},
	splashScreen: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	acceptImage: {
		width: 100,
		height: 100,
	},
});

export default ChangePasswordModal;
