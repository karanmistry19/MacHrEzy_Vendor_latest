import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerRouter } from "@react-navigation/routers";

import React, { useEffect, useRef, useState } from "react";
import {
	AppState,
	Dimensions,
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import Icon from "../components/icons";
import CustomSidebarMenu from "../components/sidebar/customSideBarMenu";
import { logout, updatePassword } from "../redux/actions/login.action";
import Dashboard from "../screens/dashboard/dashboard";

import { DrawerView } from "@react-navigation/drawer";
import {
	createNavigatorFactory,
	useFocusEffect,
	useNavigationBuilder,
} from "@react-navigation/native";
import config from "../config/config";
import { removeFilterParams } from "../redux/actions/filter-params.action";
import { fetchNotifications } from "../redux/actions/notifications.action";
import { addError, addInfo } from "../redux/actions/toast.action";
import { findMyPendingTransactionCount } from "../redux/actions/transaction.action";
import QrCodeModal from "../newComponents/QrCodeModal/qrCodeModal";
import QrCodeScanner from "../newComponents/QrCodeScanner/QrCodeScanner";
const windowDim = Dimensions.get("window");
const screen = Dimensions.get("screen");

const NavigationDrawerStructure = ({ navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.toggleDrawer();
			}}
			style={{
				marginLeft: 20,
			}}
		>
			<Image
				style={{ height: 30, width: 30 }}
				source={require("../assets/mImage.png")}
			></Image>
		</TouchableOpacity>
	);
};

export const openSecondDrawerAction = { type: "OPEN_SECOND_DRAWER" };

export const openSecondDrawer = (navigation) => {
	navigation.dispatch(openSecondDrawerAction);
};

const SecondDrawerRouter = (options) => {
	const router = DrawerRouter(options);
	return {
		...router,
		getStateForAction: (state, action, options) => {
			switch (action.type) {
				case "OPEN_SECOND_DRAWER":
					// CATCH THIS ACTION BUT MODIFY TO AN OPEN_DRAWER
					return router.getStateForAction(
						state,
						{
							...action,
							type: "OPEN_DRAWER",
						},
						options,
					);
				case "OPEN_DRAWER":
					// DO NOT HANDLE THIS ACTION, LET IT BUBBLE TO THE PRIMARY DRAWER
					return null;
				default:
					return router.getStateForAction(state, action, options);
			}
		},
	};
};

const createDrawerNavigatorWithRouter = (router) => {
	function DrawerNavigator({
		initialRouteName,
		openByDefault,
		backBehavior,
		children,
		screenOptions,
		...rest
	}) {
		const { state, descriptors, navigation } = useNavigationBuilder(
			router,
			{
				initialRouteName,
				openByDefault,
				backBehavior,
				children,
				screenOptions,
			},
		);
		return (
			<DrawerView
				{...rest}
				state={state}
				descriptors={descriptors}
				navigation={navigation}
			/>
		);
	}
	return createNavigatorFactory(DrawerNavigator)();
};

const AppStack = createDrawerNavigator();
export const SecondDrawer = createDrawerNavigatorWithRouter(SecondDrawerRouter);

const AppStackScreen = ({
	logout,
	notifications,
	user,
	fetchNotifications,
	addInfo,
	addError,
	updatePassword,
	findMyPendingTransactionCount,
	removeFilterParams,
}) => {
	const [dimensions, setDimensions] = useState({ window: windowDim, screen });
	const [width, setWidth] = useState(dimensions.window.width);
	const [qrCodeModal, setQrCodeModal] = useState(false);
	const [qrCodeScannerModal, setQrCodeScannerModal] = useState(false);

	const onChange = ({ window, screen }) => {
		setDimensions({ window, screen });
		setWidth(window.width);
	};

	useFocusEffect(
		React.useCallback(() => {
			findMyPendingTransactionCount();
		}, []),
	);

	useEffect(() => {
		Dimensions.addEventListener("change", onChange);
		return () => {
			Dimensions.removeEventListener("change", onChange);
		};
	});

	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const appStateChangeMgr = (nextAppState) => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			// fetchNotifications();
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
	};

	useEffect(() => {
		if (appState.current === "active") {
			fetchNotifications();
		}
		AppState.addEventListener("change", appStateChangeMgr);
		return () => {
			AppState.removeEventListener("change", appStateChangeMgr);
		};
	}, []);

	if (Platform.OS === "web") {
		navigator.serviceWorker.onmessage = (event) => {
			if (event) {
				fetchNotifications();
				notify(event.data);
			}
		};
	}

	const notify = (data) => {
		if (!globalThis.window.Notification) {
			console.log("Browser does not support notifications.");
		} else {
			if (Notification.permission === "granted") {
				addInfo(data.notification.body, 3000);
				var notify = new Notification(data.notification.title, {
					body: data.notification.body,
					icon: "",
				});
			} else {
				Notification.requestPermission()
					.then(function (p) {
						if (p === "granted") {
							var notify = new Notification(
								data.notification.title,
								{
									body: data.notification.body,
									icon: "",
								},
							);
						}
					})
					.catch(function (err) {
						console.error(err);
					});
			}
		}
	};

	return (
		<>
			<AppStack.Navigator
				drawerContentOptions={{
					activeTintColor: "#e91e63",
					itemStyle: { marginVertical: 5 },
				}}
				drawerStyle={{
					width: 290,
				}}
				screenOptions={({ navigation }) => ({
					drawerIcon: () => <Icon name="sideMenu" />,
					headerShown: true,
					headerLeft: () => (
						<NavigationDrawerStructure navigation={navigation} />
					),

					headerStyle: {
						backgroundColor: "#fff", //Set Header color
					},
					headerTintColor: "#000", //Set Header text color.
					headerTitleStyle: {
						fontStyle: "italic",
						textTransform: "capitalize",
					},
					title: `Welcome, ${user.name.trim()}`,
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
							}}
						>
							<TouchableOpacity
								onPress={() =>
									setDropdownVisible(!dropdownVisible)
								}
							>
								<Image
									style={{
										height: 30,
										width: 30,
										borderRadius: 50,
									}}
									source={{
										uri: `${config.baseUrl}api/user/dp?empCode=${user.empCode}`,
									}}
								/>
							</TouchableOpacity>
							{dropdownVisible && (
								<View
									style={{
										position: "absolute",
										top: 40,
										right: 0,
										backgroundColor: "#fff",
										borderRadius: 8,
										shadowColor: "#000",
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.25,
										shadowRadius: 3.84,
										elevation: 5,
										padding: 10,
										minWidth: 150,
									}}
								>
									<TouchableOpacity
										onPress={() => {
											setQrCodeModal(true);
											/* Handle My Profile */
											setDropdownVisible(false);
										}}
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 10,
											borderBottomWidth: 1,
											borderBottomColor: "#e0e0e0",
										}}
									>
										<Text style={{ fontSize: 16 }}>
											My Profile QR
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											setQrCodeScannerModal(true);
											/* Handle My Profile */
											setDropdownVisible(false);
										}}
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 10,
											borderBottomWidth: 1,
											borderBottomColor: "#e0e0e0",
										}}
									>
										<Text style={{ fontSize: 16 }}>
											QR Code Scanner
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											/* Handle Logout */
											logout();
											setDropdownVisible(false);
										}}
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 10,
										}}
									>
										<Icon
											name="logout"
											style={{ marginRight: 10 }}
										/>
										<Text style={{ fontSize: 16 }}>
											Logout
										</Text>
									</TouchableOpacity>
								</View>
							)}

							<TouchableOpacity
								onPress={() => {
									// navigation.dispatch(DrawerActions.openDrawer());
									openSecondDrawer(navigation);
								}}
								style={{
									paddingRight: 25,
								}}
							>
								<View style={{ flexDirection: "row" }}>
									<Image
										style={{
											height: 30,
											width: 30,
											borderRadius: 50,
										}}
										source={require("../assets/notificationBell.svg")}
									></Image>
									{/* <Image
                style={{ height: 30, width: 30, borderRadius: 50 }}
                source={{
                  uri: `${config.baseUrl}api/user/dp?empCode=${user.empCode}`,
                }}
              ></Image> */}
									{/* <Icon
                name="notification"
                style={{ height: 30, width: 30 }}
                fill="rgb(155, 43, 44)"
              ></Icon> */}
									<View
										style={{
											alignItems: "center",
											position: "absolute",
											top: -20,
											left: 20,
											backgroundColor: "#9B2B2C",
											height: 20,
											width: 20,
											justifyContent: "center",
											borderRadius: 50,
											marginTop: 13,
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
												color: "#FFFF",
												alignSelf: "center",
											}}
										>
											{
												notifications?.filter(
													(x) =>
														!x.seenBy.includes(
															user.empCode.trim(),
														),
												).length
											}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					),
					openByDefault: false,
				})}
				sceneContainerStyle={{
					overflow: "hidden",
					// marginBottom: 10,
				}}
				drawerType={"front"}
				drawerContent={(props) => (
					<CustomSidebarMenu
						{...props}
						logout={logout}
						addError={addError}
						updatePassword={updatePassword}
						removeFilterParams={removeFilterParams}
					/>
				)}
				openByDefault={false}
			>
				<AppStack.Screen
					component={Dashboard}
					name="dashboard"
				></AppStack.Screen>
			</AppStack.Navigator>
			{qrCodeModal && (
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<QrCodeModal
							qrCodeModal={qrCodeModal}
							setQrCodeModal={setQrCodeModal}
						/>
					</View>
				</View>
			)}
			{qrCodeScannerModal && (
				<View style={styles.modalContainer}>
					<QrCodeScanner
						qrCodeScannerModal={qrCodeScannerModal}
						setQrCodeScannerModal={setQrCodeScannerModal}
					/>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
});

const mapStateToProps = ({ notifications, user }) => ({ notifications, user });
export default connect(mapStateToProps, {
	logout,
	fetchNotifications,
	addInfo,
	updatePassword,
	removeFilterParams,
	addError,
	findMyPendingTransactionCount,
})(AppStackScreen);
