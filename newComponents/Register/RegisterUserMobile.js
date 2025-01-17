import React, { useState, useEffect, useRef } from "react";
import {
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Dimensions,
	ActivityIndicator,
	Animated,
	Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import config from "../../config/config";
import Button from "../../components/buttons/button";
import * as Yup from "yup";
import acceptGif from "../../assets/icons8-tick.gif";

export default function Component({ setRegisterMobileModalVisible }) {
	const [screen, setScreen] = useState(1);
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [employeeCode, setEmployeeCode] = useState("");
	const [employeeName, setEmployeeName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [dropdownErrorMessage, setDropDownErrorMessage] = useState("");
	const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(true);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [maskedMobileNumber, setUnMaskedMobileNumber] = useState("");
	const [otp, setOtp] = useState(["", "", "", ""]);
	const otpInputs = useRef([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isOTPLoading, setIsOTPLoading] = useState(false);
	const splashAnimation = useRef(new Animated.Value(0)).current;
	const [createUserButton, setCreateUserButton] = useState(true);

	useEffect(() => {
		const screenWidth = Dimensions.get("window").width;
		if (screenWidth <= 550) {
			setIsFullScreen(true);
		}
	}, []);
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

		if (newPasswordErrorMsg === "" && confirmPasswordErrorMsg === "") {
			setCreateUserButton(false);
		} else {
			setCreateUserButton(true);
		}
	};

	const resetInputFields = () => {
		setEmployeeName("");
		setMobileNumber("");
		setSelectedPlatform("");
	};

	const handleCloseModal = () => {
		setRegisterMobileModalVisible(false);
	};

	const validateEmployeeCode = async () => {
		setIsLoading(true);
		//console.log(Platform.OS);

		try {
			if (employeeCode.length === 0) {
				setErrorMessage("Please Provide your employee code");
				setIsLoading(false);
				setIsSendOtpDisabled(true);
				resetInputFields();
			} else if (employeeCode.length < 7 || employeeCode.length > 7) {
				setErrorMessage("Please provide a valid employee code.");
				setIsLoading(false);
				setIsSendOtpDisabled(true);

				resetInputFields();
			} else if (employeeCode.length === 7) {
				const response = await axios.post(
					`${config.baseUrl}api/registerUser/checkEmployeeCode`,
					{ employeeCode: employeeCode },
				);
				if (response.data.message === "Success") {
					setIsLoading(true);
					setErrorMessage("Valid");
					setIsLoading(false);
					setEmployeeName(response.data.employeeName);

					setUnMaskedMobileNumber(
						response.data.mobileNumber.replace(/\d(?=\d{2})/g, "*"),
					);

					setMobileNumber(response.data.mobileNumber);
					setIsLoading(false);
					setSelectedPlatform("");
					setIsSendOtpDisabled(false);
				} else if (
					response.data.message === "Employee already exists"
				) {
					setIsLoading(false);
					setErrorMessage("Employee already exists");
					setEmployeeName(response.data.employeeName);
					const maskedMobileNo = response.data.mobileNumber.replace(
						/\d(?=\d{2})/g,
						"*",
					);
					setUnMaskedMobileNumber(maskedMobileNo);
					setMobileNumber(maskedMobileNo);
					setSelectedPlatform(response.data.deviceId);
					setIsSendOtpDisabled(true);
				} else {
					setIsLoading(false);
					setErrorMessage(response.data.message);
					setIsSendOtpDisabled(true);
				}
			}
		} catch (e) {
			console.log(e);
			setErrorMessage("Employee Not Found");
			setIsLoading(false);
		}
	};

	const sendOTP = async () => {
		setIsOTPLoading(true);
		setErrorMessage("");
		try {
			if (employeeCode.length === 0) {
				setErrorMessage("Please Provide your employee code");
				setIsOTPLoading(false);
			} else if (selectedPlatform.length === 0) {
				setDropDownErrorMessage(
					"Please select an option from the dropdown",
				);
				setIsOTPLoading(false);
			} else if (employeeName.length === 0 || mobileNumber.length === 0) {
				setErrorMessage("Please contact your department");
				setIsOTPLoading(false);
			} else {
				const response = await axios.post(
					`${config.baseUrl}api/registerUser/sendOTP`,
					{
						employeeCode: employeeCode,
					},
				);
				if (response.data.message === "Success") {
					setTimeout(() => {
						setIsOTPLoading(true);
						setScreen(2);
						setIsOTPLoading(false);
					}, 2000);
				}
			}
		} catch (e) {
			console.log(e);
			setIsOTPLoading(false);
			setErrorMessage("Error");
		}
	};

	const verifyOTP = async () => {
		setIsLoading(true);
		try {
			if (otp.join("").length !== 4) {
				setErrorMessage("Please enter a 4-digit OTP");
				setIsLoading(false);
				return;
			}
			if (otp.join("").match(/[a-z]/i)) {
				setErrorMessage("Please enter a valid OTP");
				setIsLoading(false);
				return;
			}
			const response = await axios.post(
				`${config.baseUrl}api/registerUser/verifyOTP`,
				{
					employeeCode: employeeCode,
					mobileNumber: mobileNumber,
					otp: otp.join(""),
				},
			);
			if (response.data.message === "Success") {
				setIsLoading(true);
				setErrorMessage("");
				setIsLoading(false);
				setScreen(3);
			} else {
				setErrorMessage("Invalid OTP. Please try again.");
				setIsLoading(false);
			}
		} catch (e) {
			console.log(e);
			setErrorMessage("Error verifying OTP");
			setIsLoading(false);
		}
	};

	const createUser = async () => {
		setIsLoading(true);
		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			setIsLoading(false);
			return;
		} else if (newPassword.length === 0) {
			setCreateUserButton(false);
			setIsLoading(false);
			setNewPasswordError("Please enter password");
			return;
		} else if (confirmPassword.length === 0) {
			setCreateUserButton(false);
			setIsLoading(false);
			setConfirmPasswordError("Please enter confirm password");
			return;
		}
		try {
			const response = await axios.post(
				`${config.baseUrl}api/registerUser/createUser`,
				{
					employeeCode: employeeCode,
					newPassword: newPassword,
					selectedPlatform: selectedPlatform,
				},
			);
			if (response.data.message === "Success") {
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
						setIsLoading(false);
						handleCloseModal();
					});
				}, 2000);
			} else {
				setIsLoading(false);
				setErrorMessage("Error creating user. Please try again.");
			}
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			setErrorMessage("Error creating user");
		}
	};

	const renderScreen = () => {
		switch (screen) {
			case 1:
				return (
					<>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputField}
								value={employeeCode}
								onChangeText={setEmployeeCode}
								placeholder="Employee Code"
								placeholderTextColor="#999"
							/>
							{errorMessage ? (
								<Text style={{ color: "red", marginBottom: 8 }}>
									{errorMessage}
								</Text>
							) : null}

							<TouchableOpacity
								style={[
									styles.button,
									isLoading && styles.buttonDisabled,
								]}
								onPress={validateEmployeeCode}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text style={styles.buttonText}>Check</Text>
								)}
							</TouchableOpacity>
							<TextInput
								style={styles.inputField}
								value={employeeName}
								placeholder="Full Name"
								placeholderTextColor="#999"
								editable={false}
							/>
							<TextInput
								style={styles.inputField}
								value={maskedMobileNumber}
								placeholder="Mobile Number"
								keyboardType="phone-pad"
								placeholderTextColor="#999"
								editable={false}
							/>
							<View style={styles.pickerContainer}>
								<Picker
									selectedValue={selectedPlatform}
									onValueChange={(itemValue) =>
										setSelectedPlatform(itemValue)
									}
									style={styles.picker}
								>
									<Picker.Item
										label="Select Platform"
										value=""
										style={styles.pickerItem}
									/>
									<Picker.Item
										label="Android"
										value="ANDROID"
										style={styles.pickerItem}
									/>
									<Picker.Item
										label="iOS"
										value="iOS"
										style={styles.pickerItem}
									/>
								</Picker>
								{dropdownErrorMessage ? (
									<Text style={{ color: "red" }}>
										{dropdownErrorMessage}
									</Text>
								) : null}
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={[
									styles.button,
									isOTPLoading && styles.buttonDisabled,
									isSendOtpDisabled && styles.buttonDisabled,
								]}
								onPress={sendOTP}
								disabled={isOTPLoading || isSendOtpDisabled}
							>
								{isOTPLoading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<Text style={styles.buttonText}>
										Send OTP
									</Text>
								)}
							</TouchableOpacity>
						</View>
					</>
				);
			case 2:
				return (
					<>
						<View style={styles.inputContainer}>
							<View style={styles.otpContainer}>
								{[0, 1, 2, 3].map((index) => (
									<TextInput
										key={index}
										style={styles.otpInput}
										value={otp[index]}
										onChangeText={(value) =>
											handleOtpChange(value, index)
										}
										keyboardType="numeric"
										maxLength={1}
										ref={(input) =>
											(otpInputs.current[index] = input)
										}
									/>
								))}
							</View>
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
							onPress={verifyOTP}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buttonText}>Verify</Text>
							)}
						</TouchableOpacity>
					</>
				);
			case 3:
				return (
					<>
						<View style={styles.inputContainer}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextInput
									style={[styles.inputField, { flex: 1 }]}
									value={newPassword}
									onChangeText={setNewPassword}
									secureTextEntry={!showPassword}
									placeholder="New Password"
									placeholderTextColor="#999"
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
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextInput
									style={[styles.inputField, { flex: 1 }]}
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry={!showConfirmPassword}
									placeholder="Confirm New Password"
									placeholderTextColor="#999"
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
							style={[
								styles.button,
								isLoading && styles.buttonDisabled,
								createUserButton && styles.buttonDisabled,
							]}
							onPress={createUser}
							disabled={isLoading || createUserButton}
						>
							{isLoading ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buttonText}>
									Create User
								</Text>
							)}
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
								User Created
							</Text>
						</Animated.View>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<View style={styles.customFullScreenModal}>
			<TouchableOpacity
				style={styles.customFullScreenModalOverlay}
				onPress={handleCloseModal}
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
								onPress={handleCloseModal}
							>
								<Ionicons
									name="close"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
							<View style={styles.headerContainer}>
								<Text style={styles.formTitle}>
									{screen === 2
										? "Enter OTP"
										: screen === 3
											? "Create Password"
											: "Create Account"}
								</Text>
								{screen === 1 && (
									<Text style={styles.subTitle}>
										to use{" "}
										<Text style={styles.brandName}>
											MacHRezy
										</Text>
									</Text>
								)}
								<Text
									style={[
										styles.subTitle,
										{ color: "#979797", fontSize: 14 },
									]}
								>
									{screen === 1
										? "Enter your Employee Code to check if you are in the database of our system"
										: screen === 2
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
	container: {
		flex: 1,
	},
	acceptImage: {
		width: 100,
		height: 100,
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
	fullScreenContainer: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	scrollContainer: {
		flexGrow: 1,
	},
	formContainer: {
		flex: 1,
		justifyContent: "space-evenly",
		padding: 40,
	},
	splashScreen: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		textAlign: "left",
		alignItems: "left",
	},
	
	buttonContainer: {
		alignItems: "center",
	},
	inputField: {
		height: 50,
		fontSize: 20,
		marginBottom: 20,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderColor: "#ccc",
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
	brandName: {
		color: "red",
	},
	pickerContainer: {
		marginBottom: 20,
		borderRadius: 8,
	},
	picker: {
		height: 50,
		width: "100%",
		fontSize: 16,
		overflow: "hidden",
		padding: 10,
		borderBottom: 1,
		borderColor: "#ccc",
		borderRadius: 8,
	},
	pickerItem: {
		color: "#000",
		fontSize: 16,
		borderRadius: 8,
		overflow: "hidden",
	},
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
	closeButton: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: 20,
	},
	otpContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
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
});
