import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext, useState } from "react";
import { connect } from "react-redux";
import Button from "../buttons/button";
import { DimensionContext } from "../dimensionContext";
import Icon from "../icons";
import ModalContainer from "../modalContainer/modal";
import ChangePasswordModal from "../../newComponents/ChangePassword/ChangePasswordModal";

const SideMenu = ({
	menu,
	navigation,
	onPress,
	label,
	icon,
	name,
	backgroundColor,
	textColor,
	SideMenuStyle,
	badgeCount,
	headerStyle,
	removeFilterParams,
}) => {
	return (
		<View
			style={
				SideMenuStyle
					? SideMenuStyle
					: {
							// height: 80,
							width: 120,
							borderRadius: 5,
							backgroundColor: backgroundColor
								? backgroundColor
								: "#fff",
							borderRadius: 5,
							shadowColor: "#696969",
							shadowOpacity: 0.8,
							elevation: 6,
							shadowRadius: 5,
							shadowOffset: { width: 1, height: 1 },
							margin: 12,
							flexWrap: "wrap",
						}
			}
			key={menu ? `menu-${menu._id}` : `${label}`}
		>
			<TouchableOpacity
				style={{ flexDirection: "column" }}
				onPress={onPress}
			>
				<View style={{ margin: 10, flexDirection: "row", width: 120 }}>
					{icon ? icon() : <Icon name="box3D" />}
					{badgeCount ? (
						<Badge
							style={{
								position: "absolute",
								backgroundColor: "#cb4141",
								height: 25,
								width: 25,
								justifyContent: "center",
								borderRadius: 100,
								right: 0,
								bottom: 30,
							}}
							number={badgeCount}
							countColor="#fff"
						></Badge>
					) : (
						<></>
					)}
				</View>
				{/* <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 17,
          }}
        >
          <View
            style={{
              flex: 1,
              maxWidth: 30,
              justifyContent: "flex-start",
            }}
          >
            {icon ? icon() : <Icon name="box3D" />}
          </View>
        </View> */}
				<Text
					allowFontScaling={true}
					adjustsFontSizeToFit
					numberOfLines={1}
					style={[
						{
							alignSelf: "flex-start",
							color: textColor,
							fontSize: 17,
							fontWeight: "700",
							marginLeft: 10,
							maxWidth: 110,
						},
						headerStyle,
					]}
				>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
const Badge = ({ number, style, countColor }) => {
	return (
		<View style={style}>
			<Text style={{ alignSelf: "center", color: countColor }}>
				{number}
			</Text>
		</View>
	);
};
const CustomSidebarMenu = (props) => {
	const [selectedItem, setSelectedItem] = useState("dashboard");
	const [modalVisible, setModalVisible] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [data, setData] = useState(oldData);
	const [hideCurrentPass, setHideCurrentPass] = useState(true);
	const [hideNewPass, setHideNewPass] = useState(true);
	const [hideConfirmPass, setHideConfirmPass] = useState(true);
	const [focused, setFocused] = useState({
		crntPaswrd: false,
		newPswrd: false,
		confrmPswrd: false,
	});

	const dimension = useWindowDimensions();
	const onRequestClosePasswordModal = () => {
		setShowPasswordModal(false);
		setFocused(false);
		setData(oldData);
	};
	const onRequestCloseModal = () => {
		setModalVisible(false);
	};
	let oldData = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	};
	const setPasswordData = (details) => {
		setData({ ...data, ...details });
	};

	const changePassword = () => {
		if (data.newPassword === data.confirmPassword) {
			props.updatePassword({
				password: data.currentPassword,
				newPassword: data.newPassword,
			});
			onRequestClosePasswordModal();
		} else {
			props.addError(
				"New Passwords do not match. Please check again!",
				3000,
			);
		}
	};
	const { window } = useContext(DimensionContext);
	return (
		<View
			style={{
				// minHeight: dimension.height - 30,
				// maxHeight: dimension.height - 30,
				flex: 1,
				// paddingTop: 24,
				// height: dimension.height - 80,
			}}
		>
			<Image
				style={{
					height: 80,
					width: 200,
					alignSelf: "center",
					marginTop: 10,
				}}
				resizeMethod={"scale"}
				resizeMode={"contain"}
				source={require("../../assets/logo.png")}
			></Image>

			<DrawerContentScrollView
				nestedScrollEnabled={true}
				style={{
					maxHeight: dimension.height - 170,
					backgroundColor: "#EAEAEA",
				}}
				showsVerticalScrollIndicator={false}
				{...props}
			>
				<View style={{ flexWrap: "wrap", flexDirection: "row" }}>
					<SideMenu
						textColor={
							selectedItem === "dashboard" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "dashboard"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Dashboard"
						onPress={() => {
							setSelectedItem("dashboard");
							props.removeFilterParams();
							props.navigation.navigate("home");
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								name="box"
								fill={
									selectedItem === "dashboard"
										? "#fff"
										: "#0B4C5F"
								}
							/>
						)}
					></SideMenu>
					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "DWR",
							)?.totPending
						}
						textColor={selectedItem === "dwr" ? "#fff" : "#383838"}
						backgroundColor={
							selectedItem === "dwr" ? "rgb(155, 43, 44)" : "#fff"
						}
						name="DWR"
						onPress={() => {
							setSelectedItem("dwr");
							props.removeFilterParams();
							props.navigation.navigate("dwr");
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								name="materialWork"
								fill={
									selectedItem === "dwr" ? "#fff" : "#b70101"
								}
							/>
						)}
					></SideMenu>
					{["A", "H"].includes(props.user.userType) ? (
						<SideMenu
							textColor={
								selectedItem === "notification"
									? "#fff"
									: "#383838"
							}
							backgroundColor={
								selectedItem === "notification"
									? "rgb(155, 43, 44)"
									: "#fff"
							}
							name="Notification"
							onPress={() => {
								setSelectedItem("notification");
								props.removeFilterParams();
								props.navigation.navigate("notification");
							}}
							icon={() => (
								<Icon
									height={35}
									width={35}
									name="send"
									fill={
										selectedItem === "notification"
											? "#fff"
											: "#045FB4"
									}
								/>
							)}
						></SideMenu>
					) : (
						<></>
					)}
					{["A"].includes(props.user.userType) ? (
						<SideMenu
							textColor={
								selectedItem === "sqlData" ? "#fff" : "#383838"
							}
							backgroundColor={
								selectedItem === "sqlData"
									? "rgb(155, 43, 44)"
									: "#fff"
							}
							name="SQL"
							onPress={() => {
								setSelectedItem("sqlData");
								props.removeFilterParams();
								props.navigation.navigate("sql-data");
							}}
							icon={() => (
								<Icon
									height={35}
									width={35}
									name="sql"
									fill={
										selectedItem === "sqlData"
											? "#fff"
											: "#FA5882"
									}
								/>
							)}
						></SideMenu>
					) : (
						<></>
					)}
					<SideMenu
						textColor={
							selectedItem === "calendar" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "calendar"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Calendar"
						onPress={() => {
							setSelectedItem("calendar");
							props.removeFilterParams();
							props.navigation.navigate("calendar");
						}}
						icon={() => (
							<Icon
								fheight={35}
								width={35}
								fill={
									selectedItem === "calendar"
										? "#fff"
										: "#004077"
								}
								name={"calendar"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
					<SideMenu
						textColor={
							selectedItem === "employeeInfo" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "employeeInfo"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="EIS"
						onPress={() => {
							setSelectedItem("employeeInfo");
							props.removeFilterParams();
							props.navigation.navigate("employee-info");
						}}
						icon={() => (
							<Icon
								fill={
									selectedItem === "employeeInfo"
										? "#fff"
										: "#cb4141"
								}
								style={{ height: 30, width: 30 }}
								name="avatar"
							></Icon>
						)}
					></SideMenu>
					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "ON DUTY",
							)?.totPending
						}
						textColor={
							selectedItem === "od-app" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "od-app"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="OD"
						headerStyle={{
							alignSelf: "flex-start",
							color:
								selectedItem === "od-app" ? "#fff" : "#383838",
							fontSize: 17,
							fontWeight: "700",
							marginLeft: 15,
						}}
						onPress={() => {
							setSelectedItem("od-app");
							props.removeFilterParams();
							props.navigation.navigate("on-duty-application", {
								lastScreen: null,
							});
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								name="onDuty"
								fill={
									selectedItem === "od-app"
										? "#fff"
										: "#cb4141"
								}
							/>
						)}
					></SideMenu>

					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "LEAVE",
							)?.totPending
						}
						textColor={
							selectedItem === "leave" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "leave"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Leave"
						onPress={() => {
							setSelectedItem("leave");
							props.removeFilterParams();
							props.navigation.navigate("leave", {
								lastScreen: null,
							});
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								fill={
									selectedItem === "leave"
										? "#fff"
										: "#cb4141"
								}
								name={"leave"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "SHIFT",
							)?.totPending
						}
						textColor={
							selectedItem === "shift" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "shift"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Shift"
						onPress={() => {
							setSelectedItem("shift");
							props.removeFilterParams();
							props.navigation.navigate("shift", {
								lastScreen: null,
							});
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								fill={
									selectedItem === "shift"
										? "#fff"
										: "#20B2AA"
								}
								name={"shift"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "TOUR",
							)?.totPending
						}
						textColor={selectedItem === "tour" ? "#fff" : "#383838"}
						backgroundColor={
							selectedItem === "tour"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Tour"
						onPress={() => {
							setSelectedItem("tour");
							props.removeFilterParams();
							props.navigation.navigate("tour", {
								lastScreen: null,
							});
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								fill={
									selectedItem === "tour" ? "#fff" : "#46ba6a"
								}
								name={"tour"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "COMP OFF",
							)?.totPending
						}
						textColor={
							selectedItem === "comp-off" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "comp-off"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Comp-Off"
						onPress={() => {
							setSelectedItem("comp-off");
							props.removeFilterParams();
							props.navigation.navigate("comp-off", {
								lastScreen: null,
							});
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								fill={
									selectedItem === "comp-off"
										? "#fff"
										: "#ffb817"
								}
								name={"calendarCross"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
					{["A", "H"].includes(props.user.userType) ? (
						<SideMenu
							badgeCount={
								props.pendingTransactionCount.find(
									(x) => x.type === "ATTENDANCE",
								)?.totPending
							}
							textColor={
								selectedItem === "attendance"
									? "#fff"
									: "#383838"
							}
							backgroundColor={
								selectedItem === "attendance"
									? "rgb(155, 43, 44)"
									: "#fff"
							}
							name="Attendance"
							onPress={() => {
								setSelectedItem("attendance");
								props.removeFilterParams();
								props.navigation.navigate("attendance", {
									lastScreen: null,
								});
							}}
							icon={() => (
								<Icon
									height={35}
									width={35}
									fill={
										selectedItem === "attendance"
											? "#fff"
											: "#4682B4"
									}
									name={"attendance"}
									style={{ height: 30, width: 30 }}
								></Icon>
							)}
						></SideMenu>
					) : (
						<></>
					)}

					<SideMenu
						badgeCount={
							props.pendingTransactionCount.find(
								(x) => x.type === "Compensation",
							)?.totPending
						}
						textColor={
							selectedItem === "compensation" ? "#fff" : "#383838"
						}
						backgroundColor={
							selectedItem === "compensation"
								? "rgb(155, 43, 44)"
								: "#fff"
						}
						name="Compensation"
						onPress={() => {
							setSelectedItem("compensation");
							props.removeFilterParams();
							props.navigation.navigate("compensation");
						}}
						icon={() => (
							<Icon
								height={35}
								width={35}
								fill={
									selectedItem === "compensation"
										? "#fff"
										: "#4682B4"
								}
								name={"compensation"}
								style={{ height: 30, width: 30 }}
							></Icon>
						)}
					></SideMenu>
				</View>
			</DrawerContentScrollView>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 20,
					margin: 10,
				}}
			>
				<Button
					onPress={() => setModalVisible(true)}
					style={{ width: 120 }}
					title="Setting"
				></Button>
				<Button
					onPress={() => props.logout()}
					style={{ width: 120 }}
					title="Logout"
				></Button>
			</View>
			{/* </View> */}

			{/* <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          left: 15,
          height: 50,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          style={{ marginBottom: 30 }}
          name="setting"
          fill="rgb(155, 43, 44)"
        />
      </TouchableOpacity> */}
			{/* <TouchableOpacity
        style={{
          position: "absolute",
          bottom: -15,
          right: 20,
          height: 50,
        }}
        onPress={() => props.logout()}
      >
        <Icon
          style={{ marginBottom: 40 }}
          name="logOut"
          fill="rgb(155, 43, 44)"
        />
      </TouchableOpacity> */}

			<ModalContainer
				showModal={modalVisible}
				modalContentStyle={{ minHeight: 110, maxHeight: 110 }}
				modalViewStyle={{
					minHeight: 100,
					maxHeight: 100,
					width: dimension.width > 550 ? 400 : 310,
				}}
				onClose={onRequestCloseModal}
				modalContent={
					<View
						style={{
							minHeight: 100,
							maxHeight: 100,
							height: 100,
							width: dimension.width > 550 ? 400 : "100%",
							borderRadius: 10,
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(false);
								setShowPasswordModal(true);
							}}
						>
							<Text
								style={{
									alignSelf: "center",
									fontSize: 19,
									fontWeight: "bold",
									marginBottom: 20,
								}}
							>
								Change Password
							</Text>
						</TouchableOpacity>
					</View>
				}
				onRequestCloseModal={onRequestCloseModal}
			></ModalContainer>
			<ModalContainer
				showModal={showPasswordModal}
				modalViewStyle={{
					maxHeight: 400,
					width: dimension.width > 550 ? 400 : 340,
				}}
				title="Change Password"
				onClose={onRequestClosePasswordModal}
				modalContent={
					<View
						style={{
							maxHeight: 400,
							height: 400,
							width: dimension.width > 550 ? 380 : "94%",
							borderRadius: 10,
							padding: 5,
							flexDirection: "column",
							justifyContent: "space-evenly",
							marginLeft: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<TextInput
								onFocus={() =>
									setFocused({
										crntPaswrd: true,
										newPswrd: false,
										confrmPswrd: false,
									})
								}
								style={{
									width: dimension.width > 550 ? 380 : "100%",
									height: 55,
									borderBottomWidth: 1,
									padding: 7,
								}}
								secureTextEntry={hideCurrentPass ? true : false}
								underlineColorAndroid="transparent"
								placeholder="Current Password"
								placeholderTextColor="grey"
								onChangeText={(x) =>
									setPasswordData({ currentPassword: x })
								}
								value={data?.currentPassword}
							/>
							{focused.crntPaswrd ? (
								<TouchableOpacity
									style={{
										position: "absolute",
										top: 25,
										right: 10,
									}}
									onPress={() =>
										setHideCurrentPass(!hideCurrentPass)
									}
								>
									<Icon
										height={20}
										width={20}
										name={
											hideCurrentPass ? "eyeSlash" : "eye"
										}
									></Icon>
								</TouchableOpacity>
							) : (
								<></>
							)}
						</View>
						<View style={{ flexDirection: "row" }}>
							<TextInput
								onFocus={() =>
									setFocused({
										crntPaswrd: false,
										newPswrd: true,
										confrmPswrd: false,
									})
								}
								style={{
									width: dimension.width > 550 ? 380 : "100%",
									height: 55,
									borderBottomWidth: 1,
									padding: 7,
								}}
								secureTextEntry={hideNewPass ? true : false}
								underlineColorAndroid="transparent"
								placeholder="New Password"
								placeholderTextColor="grey"
								onChangeText={(x) =>
									setPasswordData({ newPassword: x })
								}
								value={data?.newPassword}
							/>
							{focused.newPswrd ? (
								<TouchableOpacity
									style={{
										position: "absolute",
										right: 10,
										top: 25,
									}}
									onPress={() => setHideNewPass(!hideNewPass)}
								>
									<Icon
										height={20}
										width={20}
										name={hideNewPass ? "eyeSlash" : "eye"}
									></Icon>
								</TouchableOpacity>
							) : (
								<></>
							)}
						</View>
						<View style={{ flexDirection: "row" }}>
							<TextInput
								onFocus={() =>
									setFocused({
										crntPaswrd: false,
										newPswrd: false,
										confrmPswrd: true,
									})
								}
								style={{
									width: dimension.width > 550 ? 380 : "100%",
									height: 55,
									borderBottomWidth: 1,
									padding: 7,
								}}
								secureTextEntry={hideConfirmPass ? true : false}
								underlineColorAndroid="transparent"
								placeholder="Confirm Password"
								placeholderTextColor="grey"
								onChangeText={(x) =>
									setPasswordData({ confirmPassword: x })
								}
								value={data?.confirmPassword}
							/>
							{focused.confrmPswrd ? (
								<TouchableOpacity
									style={{
										position: "absolute",
										right: 10,
										top: 25,
									}}
									onPress={() =>
										setHideConfirmPass(!hideConfirmPass)
									}
								>
									<Icon
										height={20}
										width={20}
										name={
											hideConfirmPass ? "eyeSlash" : "eye"
										}
									></Icon>
								</TouchableOpacity>
							) : (
								<></>
							)}
						</View>

						<Button
							onPress={() => changePassword()}
							title="Change Password"
							color="rgb(155, 43, 44)"
						></Button>
					</View>
				}
				onRequestCloseModal={onRequestClosePasswordModal}
			></ModalContainer>
		</View>
	);
};

const styles = StyleSheet.create({
	badgeStyle: {
		height: 10,
		width: 10,
		justifyContent: "center",
		borderRadius: 100,
	},
});

const mapStateToProps = ({ user, pendingTransactionCount }) => ({
	user,
	pendingTransactionCount,
});

export default connect(mapStateToProps, {})(CustomSidebarMenu);
