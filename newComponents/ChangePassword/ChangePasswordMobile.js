import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	ScrollView,
	Animated,
	Image,
} from "react-native";
import axios from "axios";
import config from "../../config/config";
import { Ionicons } from "@expo/vector-icons";
import acceptGif from "../../assets/icons8-tick.gif";
import * as Yup from "yup";

export default function Component({ setModalVisible }) {
	const [screen, setScreen] = useState(0);
	const [employeeCode, setEmployeeCode] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [maskedMobileNumber, setMaskedMobileNumber] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const otpInputs = useRef([]);
	const splashAnimation = useRef(new Animated.Value(0)).current;

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

	const handleSendOTP = () => {
		if (employeeCode.length === 7) {
			setIsLoading(true);
			sendOTP(employeeCode);
			setErrorMessage("");
		} else {
			setErrorMessage("Please enter a valid employee code");
		}
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
				// if (response.data.mobileNo[0] === null) {
				// 	setErrorMessage("Contact your HR");
				// 	return;
				// }
				setMobileNumber(response.data.mobileNo[0]);
				setMaskedMobileNumber(
					response.data.mobileNo[0].replace(/\d(?=\d{2})/g, "*"),
				);

				// Move to next screen after 2 seconds
				if (response?.data?.message === "Success") {
					setTimeout(() => {
						setIsLoading(true);
						setScreen(1);
						setIsLoading(false);
					}, 2000);
				} else {
					setIsLoading(false);
					setErrorMessage(response.data.message);
				}
			} catch (error) {
				setIsLoading(false);
				setErrorMessage(error.response.data.error);
			}
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

	const verifyOTP = async (otpString) => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const response = await axios.post(
				`${config.baseUrl}api/changePassword/verifyOTP`,
				{
					otp: otpString,
					employeeCode: employeeCode,
					mobileNumber: mobileNumber,
				},
			);

			// Move to next screen after 2 seconds
			if (response?.data?.message === "Success") {
				setTimeout(() => {
					setIsLoading(true);
					setScreen(2);
					setIsLoading(false);
					setErrorMessage("");
				}, 2000);
			} else {
				setIsLoading(false);
				setErrorMessage(response?.data?.message);
			}
		} catch (e) {
			setIsLoading(false);
			setErrorMessage("Invalid OTP");
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

	const renderScreen = () => {
		switch (screen) {
			case 0:
				return (
					<>
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
									placeholderTextColor="#999"
									maxLength={7}
								/>
								{errorMessage ? (
									<Text style={styles.errorText}>
										{errorMessage}
									</Text>
								) : null}
							</View>
						</View>
						<TouchableOpacity
							style={[
								styles.button,
								isLoading && styles.buttonDisabled,
							]}
							onPress={handleSendOTP}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buttonText}>Send OTP</Text>
							)}
						</TouchableOpacity>
					</>
				);
			case 1:
				return (
					<>
						<View style={styles.otpSection}>
							{/* <Text style={styles.label}>
								OTP was sent to the mobile number:{" "}
								{maskedMobileNumber}
							</Text>
							<Text style={styles.otpTitle}>Enter OTP</Text> */}
							<View style={styles.otpContainer}>
								{renderOtpInputs()}
							</View>
							{errorMessage ? (
								<Text style={styles.errorText}>
									{errorMessage}
								</Text>
							) : null}
						</View>
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
					</>
				);
			case 2:
				return (
					<>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>New Password:</Text>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={styles.passwordInput}
									placeholder="Enter new password"
									value={newPassword}
									onChangeText={setNewPassword}
									secureTextEntry={!showPassword}
									placeholderTextColor="#999"
								/>
								<TouchableOpacity
									style={styles.eyeIcon}
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
								<Text style={styles.errorText}>
									{newPasswordError}
								</Text>
							) : null}
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Confirm Password:</Text>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={styles.passwordInput}
									placeholder="Confirm new password"
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry={!showConfirmPassword}
									placeholderTextColor="#999"
								/>
								<TouchableOpacity
									style={styles.eyeIcon}
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
								<Text style={styles.errorText}>
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
							<Text style={styles.successText}>
								Password Changed Successfully
							</Text>
						</Animated.View>
					</>
				);
		}
	};

	return (
		<View style={styles.customFullScreenModal}>
			<TouchableOpacity
				style={styles.customFullScreenModalOverlay}
				onPress={() => setModalVisible(false)}
			/>
			<View style={styles.customFullScreenModalContent}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.customFullScreenModalContainer}
				>
					<ScrollView contentContainerStyle={styles.scrollContainer}>
						<View style={styles.formContainer}>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setModalVisible(false)}
							>
								<Ionicons
									name="close"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
							<View style={styles.headerContainer}>
								<Text style={styles.formTitle}>
									{screen === 1
										? "Enter OTP"
										: screen === 2
											? "Create Password"
											: "Change Password"}
								</Text>
								{screen === 0 && (
									<Text style={styles.subTitle}>
										to use{" "}
										<Text style={styles.brandName}>
											MacHRezy
										</Text>
									</Text>
								)}
								<Text style={styles.description}>
									{screen === 0
										? "Enter your Employee Code to change your password"
										: screen === 1
											? `Enter the OTP sent to your mobile number ${maskedMobileNumber}`
											: "Create a new password for your account"}
								</Text>
							</View>
							{renderScreen()}
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	customFullScreenModal: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	customFullScreenModalOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "transparent",
	},
	customFullScreenModalContent: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "white",
	},
	customFullScreenModalContainer: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
	},
	formContainer: {
		flex: 1,
		justifyContent: "space-evenly",
		padding: 40,
	},
	closeButton: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: 20,
	},
	headerContainer: {
		textAlign: "left",
		alignItems: "flex-start",
	},
	formTitle: {
		fontSize: 40,
		fontWeight: "bold",
		marginTop: 20,
	},
	subTitle: {
		fontSize: 20,
		marginBottom: 5,
	},
	description: {
		color: "#979797",
		fontSize: 14,
		marginBottom: 20,
	},
	brandName: {
		color: "red",
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
	},
	input: {
		height: 50,
		fontSize: 16,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		paddingHorizontal: 10,
	},
	passwordInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
	passwordInput: {
		flex: 1,
		height: 50,
		fontSize: 16,
		paddingHorizontal: 10,
	},
	eyeIcon: {
		padding: 10,
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
		justifyContent: "space-between",
		marginBottom: 20,
	},
	otpInputWrapper: {
		marginHorizontal: 4,
	},
	otpInput: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		fontSize: 24,
		textAlign: "center",
	},
	errorText: {
		color: "red",
		fontSize: 14,
		marginTop: 5,
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
	successText: {
		fontWeight: "bold",
		fontSize: 20,
		color: "green",
	},
});
