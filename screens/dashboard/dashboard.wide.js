import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import LeaveApplicationModel from "../../components/Attendance/LeaveApplicationModel";
import AttendanceComponent from "../../components/attendanceComponent";
import Card from "../../components/card";
import { DimensionContext } from "../../components/dimensionContext";
import ModalContainer from "../../components/modalContainer/modal";
import NotificationComponent from "../../components/notificationComponent";
import TransactionComponent from "../../components/transactionComponent";
import { formatDate } from "../../components/utils";
import WishComponent from "../../components/wishComponent";
import AttendanceCard from "../../newComponents/attendanceCard/AttendanceCard";
import CheckInOutcard from "../../newComponents/CheckInOutcard/CheckInOutcard";
import Modalcard from "../../newComponents/modal/Modalcard";
import {
	fetchAttendance,
	fetchAttendanceDaywiseForModal,
	fetchTabDetailsAttendanceTxn,
} from "../../redux/actions/attendance.action";
import {
	dwrApplicationCount,
	dwrApprovalPending,
	dwrPendingDetails,
} from "../../redux/actions/dwr.action";
import { closeModal, openModal } from "../../redux/actions/modal-manage.action";
import { createOD } from "../../redux/actions/od-app.action";
import { sendMessage } from "../../redux/actions/sendMessage.action";
import { addError } from "../../redux/actions/toast.action";
import { createTourTxn } from "../../redux/actions/tour.action";
import CreateOdModal from "../od-application/create-odModal";
import CreateTourModal from "../tour/create-tour-modal";
import GetUserLocation from "../../newComponents/GeoLocation/GetUserLocation";

const Dashboard = ({
	notifications,
	dwrCount,
	attendance,
	fetchAttendance,
	holidays,
	leaves,
	attendanceSummary,
	teamAttendanceSummary,
	onAttendanceSummaryDateChange,
	onTeamAttendanceSummaryDateChange,
	onAttendanceDateChange,
	teamAttendanceSummaryDetails,
	user,
	fetchAttendanceDaywiseForModal,
	attendanceDaywiseModal,
	navigation,
	modalManage,
	addError,
	createOD,
	createTourTxn,
}) => {
	const defaultLeavType = {
		OD: false,
		Tour: false,
		Leave: false,
	};
	const { window } = useContext(DimensionContext);
	const [variables, setVariables] = useState([
		moment().startOf("month"),
		moment(),
	]);
	const { width } = useWindowDimensions();
	const [nextHoliday, setNextHoliday] = useState({});
	const [showHolidayModal, setShowHolidayModal] = useState(false);
	const [showDates, setShowDates] = useState(false);
	const [myDropdownPressed, setMyDropdownPressed] = useState(false);
	const [modalType, setmodalType] = useState();
	const [modalHeader, setModalHeader] = useState([
		"S.no",
		"Date",
		"Shift",
		"Time-In",
		"Time-Out",
		"Total-hrs",
	]);
	const [modalcontent, setmodalcontent] = useState([]);
	const [modalDate, setmodalDate] = useState(
		`${moment(new Date(new Date())).format("DD/MM/yyyy")}`,
	);
	const modalViewType = useRef("");
	const selectedRegularizeDate = useRef();
	const handleCallback = () => {
		setShowDates(showDates ? false : true);
	};
	const [leaveTypeModal, setLeaveTypeModal] = useState(defaultLeavType);

	const [attendanceCardWidth, setAttendanceCardWidth] = useState(0);
	const dispatch = useDispatch();
	const [isUpdate, setisUpdate] = useState(false);

	function find_dimesions(layout) {
		const { x, y, width, height } = layout;
		setAttendanceCardWidth(width);
	}
	const MyAttendanceDataKey = ["Present", "Late", "Regularize", "Leave"];
	let MyAttendanceDataValue = [];
	let MyAttendancePercentage = 0;
	if (attendanceSummary) {
		MyAttendanceDataValue = [
			attendanceSummary["presentDays"] || 0,
			attendanceSummary["late"] || 0,
			attendanceSummary["regularize"]
				?.split(",")
				?.filter((x) => x.trim() != "")?.length || 0,
			attendanceSummary["leaves"] || 0,
		];
		MyAttendancePercentage = isNaN(
			parseInt(
				(MyAttendanceDataValue[0] /
					(MyAttendanceDataValue[0] + MyAttendanceDataValue[2])) *
					100,
			),
		)
			? 0
			: parseInt(
					(MyAttendanceDataValue[0] /
						(MyAttendanceDataValue[0] + MyAttendanceDataValue[2])) *
						100,
				);
	}
	const TeamAttendanceDataKey = [
		"Present",
		"Late",
		"On Leave",
		"Early Out",
		"Incomplete",
	];
	let TeamAttendanceDataValue = [];
	let TeamAttendancePercentage = 0;
	if (teamAttendanceSummary) {
		TeamAttendanceDataValue = [
			teamAttendanceSummary["presentEmp"] || 0,
			teamAttendanceSummary["late"] || 0,
			teamAttendanceSummary["leaves"] || 0,
			teamAttendanceSummary["earlyOut"] || 0,
			teamAttendanceSummary["incompleteHrs"] || 0,
		];
		TeamAttendancePercentage = isNaN(
			parseInt(
				(TeamAttendanceDataValue[0] /
					(TeamAttendanceDataValue[0] + TeamAttendanceDataValue[2])) *
					100,
			),
		)
			? 0
			: parseInt(
					(TeamAttendanceDataValue[0] /
						(TeamAttendanceDataValue[0] +
							TeamAttendanceDataValue[2])) *
						100,
				);
	}
	const dataConfig = {
		Present: "P",
		Late: "L",
		"On Leave": "A",
		Incomplete: "I",
		"Early Out": "EO",
	};

	function updateModalAttendace(status, date) {
		let start = moment(new Date(date[0]));
		let end = moment(new Date(date[1]));
		fetchAttendanceDaywiseForModal({
			user: user,
			StartDate: start.clone()._d,
			EndDate: end.clone()._d,
			status: status,
		});
	}
	useEffect(() => {
		setmodalcontent(() => {
			let result = [];
			attendanceDaywiseModal.map((x, i) => {
				const st = moment(x.StartTime).format("HH:mm");
				const et = moment(x.EndTime).format("HH:mm");
				const isSame = st === et;
				let hr = isSame
					? "0:00"
					: `${moment(x.EndTime).diff(moment(x.StartTime), "minutes")}`;
				if (!isSame) {
					hr = `${parseInt(hr / 60)}:${hr % 60}`;
				}
				const arr = [
					`${i + 1}`,
					`${new Date(x.StartTime).toDateString().slice(8, 10)} ${new Date(
						x.StartTime,
					)
						.toDateString()
						.slice(4, 7)}`,
					`${modalViewType.current == "Present" ? "Day 1" : x.Subject}`,
					isSame ? "0:00" : st,
					isSame ? "0:00" : et,
					hr,
				];
				if (modalViewType.current === "Regularize") {
					arr.push(renderDropdownPicker);
				}
				result.push(arr);
			});
			return result;
		});
	}, [attendanceDaywiseModal]);

	//

	useEffect(() => {
		let nextHoliday = holidays?.find(
			(x) => new Date(x.dateOfHoliday).getTime() > new Date().getTime(),
		);

		setNextHoliday(nextHoliday);
	}, [holidays]);

	useEffect(() => {
		let currentDate = new Date(),
			eventFromDate,
			eventToDate;
		eventFromDate = moment(
			new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + (currentDate.getDate() > 15 ? 0 : -1),
				16,
				12,
			),
		).format("YYYY-MM-DD");
		eventToDate = moment(new Date()).format("YYYY-MM-DD");
		setVariables([eventFromDate, eventToDate]);
	}, []);

	const renderDropdownPicker = (val) => {
		return (
			<Picker
				style={{
					width: "100%",
					borderWidth: 1,
					height: 20,
					borderRadius: 5,
					borderWidth: 1,
					borderColor: "#bdbdbd",
					fontFamily: "Roboto",
				}}
				onValueChange={(itemValue) => {
					let currentDate = new Date();
					const dateVal = `${val} ${currentDate.getFullYear()}`;
					selectedRegularizeDate.current = moment(
						dateVal,
						"DD MMM YYYY",
					);
					setShowDates(false);
					if (itemValue === "OD" || itemValue === "Tour") {
						dispatch(openModal);
					}
					itemValue &&
						setLeaveTypeModal({
							...leaveTypeModal,
							[itemValue]: true,
						});
				}}
				selectedValue={""}
			>
				<Picker.Item label="LT" value="" />
				<Picker.Item label="OD" value="OD" />
				<Picker.Item label="Tour" value="Tour" />
				<Picker.Item label="Leave" value="Leave" />
			</Picker>
		);
	};

	const onComplete = () => {
		dispatch(closeModal());
		setLeaveTypeModal(defaultLeavType);
		fetchAttendance({
			eventFromDate: moment(variables[0]).format("YYYY-MM-DD"),
			eventToDate: moment(variables[1]).format("YYYY-MM-DD"),
		});
	};

	const renderModal = () => {
		return (
			<>
				{leaveTypeModal["Tour"] && (
					<CreateTourModal
						showModal={true}
						onRequestCloseModal={onComplete}
						user={user}
						behalfOther={false}
						createTourTxn={createTourTxn}
						selectedTransaction={""}
						onComplete={onComplete}
						addError={addError}
						modalManage={modalManage}
						selectedDate={selectedRegularizeDate.current}
					></CreateTourModal>
				)}
				{leaveTypeModal["OD"] && (
					<CreateOdModal
						onPressCancel={onComplete}
						onClose={onComplete}
						showModal={true}
						behalfOther={false}
						selectedTransaction={""}
						user={user}
						fetchTabDetailsAttendanceTxn={
							fetchTabDetailsAttendanceTxn
						}
						selectedAttendanceTransactionTabDetails={""}
						addError={addError}
						createOD={createOD}
						modalManage={modalManage}
						selectedDate={selectedRegularizeDate.current}
					></CreateOdModal>
				)}
				{leaveTypeModal["Leave"] && (
					<LeaveApplicationModel
						user={user}
						setLeave={onComplete}
						leave={true}
						selectedDate={selectedRegularizeDate.current}
					/>
				)}
			</>
		);
	};

	const renderDashboardComponent = () => {
		return (
			<View
				style={[
					styles.displayCardContainer,
					{
						width: width < 1130 ? "100%" : "60%",
						marginTop: width < 550 ? 0 : 21,
					},
				]}
			>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-around",
						marginBottom: 20,
					}}
				>
					<View
						style={[
							{
								width: "48%",
								// maxHeight: 250,
							},
						]}
						onLayout={(event) => {
							find_dimesions(event.nativeEvent.layout);
						}}
					>
						<AttendanceCard
							onPress={(key) => {
								modalViewType.current = key;
								const arr = [
									"S.no",
									"Date",
									"Status",
									"Time-In",
									"Time-Out",
									"Total-hrs",
								];
								if (key === "Regularize") {
									arr.push("Leave Type");
								}
								setShowDates((pre) => !pre);
								setModalHeader(() => arr);
								setmodalType(() => "My Attendance");
							}}
							setMyDropdownPressed={setMyDropdownPressed}
							w={attendanceCardWidth}
							title="My Attendance"
							// titleFontSize={AttendanceCardTitleResponsive()}
							// progressCircleLayout={ProgressCircleResponsive()}
							percent={MyAttendancePercentage}
							// dataFontSize={AttendanceDataFontSizeResponsive()}
							dataKey={MyAttendanceDataKey}
							dataValue={MyAttendanceDataValue}
							teamAttendance={false}
							onAttendanceSummaryDateChange={
								onAttendanceSummaryDateChange
							}
							onTeamAttendanceSummaryDateChange={
								onTeamAttendanceSummaryDateChange
							}
							setModalDate={(date) => setmodalDate(date)}
							updateModalAttendace={updateModalAttendace}
							isUpdate={isUpdate}
						/>
					</View>
					{user.userType !== "U" && (
						<>
							<View
								style={[
									{
										width: "48%",
									},
								]}
							>
								<AttendanceCard
									setMyDropdownPressed={setMyDropdownPressed}
									onPress={(key) => {
										const status = dataConfig[key];
										setShowDates((pre) => !pre);
										setModalHeader(() => [
											"S.no",
											"Name",
											"Shift",
											"Time-In",
											"Time-Out",
											"Late-hrs",
										]);
										setmodalcontent(() => {
											let result = [];
											teamAttendanceSummaryDetails
												.filter((item) => {
													const stat =
														status === "L"
															? "P"
															: status;
													if (item.status === stat) {
														if (
															item.status === "P"
														) {
															if (
																status === "L"
															) {
																return Boolean(
																	item.late,
																);
															}
															return true;
														}
													}
													return false;
												})
												.map((x, i) => {
													result.push([
														`${i + 1}`,
														x?.shortName.slice(
															0,
															9,
														),
														x?.shiftName?.slice(
															0,
															1,
														),
														x?.inTime || "00.00",
														x?.outTime || "00.00",
														!x?.inTime ||
														!x?.outTime
															? "00.00"
															: "00.00",
													]); //need to know the format of in and out time
												});
											return result;
										});
										setmodalType(() => "Team List");
									}}
									setModalDate={(date) => setmodalDate(date)}
									w={attendanceCardWidth}
									title="Team Attendance"
									dataKey={TeamAttendanceDataKey}
									dataValue={TeamAttendanceDataValue}
									percent={TeamAttendancePercentage}
									teamAttendance={true}
									onAttendanceSummaryDateChange={
										onAttendanceSummaryDateChange
									}
									onTeamAttendanceSummaryDateChange={
										onTeamAttendanceSummaryDateChange
									}
								/>
							</View>
						</>
					)}
				</View>

				<View style={{ marginTop: -20, marginLeft: 10 }}>
					<Pressable
						onPress={
							Platform.OS == "web"
								? () => setShowHolidayModal(true)
								: onPressHolidayCard
						}
					>
						<Card
							fixHeight={Platform.OS != "web"}
							info={
								nextHoliday?.dateOfHoliday ? (
									formatDate(
										new Date(nextHoliday?.dateOfHoliday),
									)
								) : (
									<Text>{`No Upcoming Holidays \nfor this year`}</Text>
								)
							}
							iconName={"umbrella"}
							description={
								<View>
									<Text
										style={{
											fontSize: 18,
											fontWeight: "bold",
										}}
									>
										{nextHoliday?.holiName}
									</Text>
									<Text style={{ fontSize: 12 }}>
										{nextHoliday?.dateOfHoliday
											? "Next Holiday"
											: ""}
									</Text>
								</View>
							}
							infoStyle={{
								fontWeight: "bold",
								fontSize: 20,
								color: "#375712",
							}}
						></Card>
					</Pressable>
				</View>

				{user.userType !== "U" && (
					<View
						style={[
							{
								width: "48%",
								height: "216px",
								marginTop: -30,
								marginBottom: 10,
								marginLeft: 10,
							},
						]}
					>
						<CheckInOutcard />
					</View>
				)}

				<View>
					<Card
						fixHeight={Platform.OS != "web"}
						fill="#FFBA00"
						renderInfo={
							<View
								style={{
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<View style={styles.row}>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 30,
											color: "#000",
										}}
									>
										{leaves?.reduce(
											(a, b) => a + b.leaveBalance,
											0,
										)}
									</Text>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 30,
											color: "#000",
										}}
									>
										Leaves
									</Text>
								</View>
							</View>
						}
						descriptionJsx={
							<ScrollView
								showsHorizontalScrollIndicator={false}
								nestedScrollEnabled={true}
								horizontal={true}
								style={{ width: "100%" }}
							>
								{leaves.map((x, i) => (
									<View
										style={{
											marginRight: 15,
											alignSelf: "flex-end",
											alignItems: "center",
										}}
										key={`${x.leaveAlias}${i}`}
									>
										<Text
											style={styles.infoTextWithBold}
										>{`${x.leaveBalance}`}</Text>
										<Text
											style={styles.infoTextStyle}
										>{`${x.leaveAlias}`}</Text>
									</View>
								))}
							</ScrollView>
						}
					></Card>
				</View>

				{/* {user.userType !== "U" && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingLeft: 10,
              marginTop: 10,
            }}
          >
            <View
              style={[
                {
                  width: "48%",
                  height: "100",
                },
              ]}
            >
              {/* <CheckInOutcard /> */}
				{/*</View>
        //    <View style={{ width: "48" }}></View>
        //  </View>
        //)} */}

				<ModalContainer
					title="Holiday List"
					onClose={() => setShowHolidayModal(false)}
					showModal={showHolidayModal}
					onRequestCloseModal={() => setShowHolidayModal(false)}
					modalContent={
						<ScrollView
							nestedScrollEnabled={true}
							contentContainerStyle={{ paddingBottom: 30 }}
						>
							{holidays.map((holiday, index) => (
								<View
									key={holiday.holiCode + " " + index}
									style={{
										width: "95%",
										borderRadius: 7,
										// borderWidth: 2,
										// height: 40,
										marginTop: 5,
										marginLeft: 10,
										flexDirection: "row",
										justifyContent: "space-between",
										flexWrap: "wrap",
										marginVertical: 10,
										backgroundColor: "#D0D0D0",
									}}
								>
									<Text
										numberOfLines={1}
										style={{
											color: "#303030",
											alignSelf: "center",
											fontSize: 15,
											fontWeight: "600",
											minWidth: "100%",
											// maxWidth: 160,
											marginLeft: 5,
											paddingHorizontal: 5,
											marginVertical: 5,
										}}
									>
										{holiday.holiName}
									</Text>
									<Text
										style={{
											color: "#303030",
											alignSelf: "center",
											marginTop: 2,
											fontSize: 15,
											fontWeight: "600",
											marginRight: 20,
											backgroundColor: "#FFBA00",
											paddingHorizontal: 5,
											marginLeft: 5,
											marginVertical: 5,
											borderRadius: 2,
										}}
									>
										{moment(
											new Date(holiday.dateOfHoliday),
										).format("dddd, MMM Do, YYYY")}
									</Text>
								</View>
							))}
						</ScrollView>
					}
				></ModalContainer>

				<ModalContainer
					showModal={showDates} //showDates
					onRequestCloseModal={handleCallback}
					onClose={handleCallback}
					titleDisable={false}
					title={modalType}
					modalDate={modalDate}
					modalStyle={{}}
					modalContentStyle={{}}
					modalContent={Modalcard(modalHeader, modalcontent)}
				/>
				{renderModal()}
			</View>
		);
	};

	return (
		<View
			style={[
				styles.container,
				{ flexDirection: "row", flexWrap: "wrap" },
			]}
		>
			{window.width < 1130 ? (
				<></>
			) : (
				<NotificationComponent
					data={notifications}
				></NotificationComponent>
			)}
			{renderDashboardComponent()}
			<AttendanceComponent
				modularCardStyle={{
					maxHeight: window.height / 3,
					minHeight: window.height / 3,
				}}
				attendance={attendance}
				onFilterChange={(vv) => {
					fetchAttendance({
						eventFromDate: moment(vv.value[0]).format("YYYY-MM-DD"),
						eventToDate: moment(vv.value[1]).format("YYYY-MM-DD"),
					});
					setVariables([vv.value[0], vv.value[1]]);
					if (onAttendanceDateChange)
						onAttendanceDateChange(vv.value);
				}}
			></AttendanceComponent>
			<TransactionComponent></TransactionComponent>
			<WishComponent></WishComponent>
		</View>
	);
};
const mapStateToProps = ({
	user,
	messages,
	notifications,
	dwrCount,
	attendance,
	holidays,
	leaves,
	attendanceSummary,
	teamAttendanceSummary,
	teamAttendanceSummaryDetails,
	attendanceDaywise,
	attendanceDaywiseModal,
	modalManage,
}) => ({
	user,
	messages,
	notifications,
	dwrCount,
	attendance,
	holidays,
	leaves,
	attendanceSummary,
	teamAttendanceSummary,
	teamAttendanceSummaryDetails,
	attendanceDaywise,
	attendanceDaywiseModal,
	modalManage,
});
export default connect(mapStateToProps, {
	sendMessage,
	dwrPendingDetails,
	dwrApplicationCount,
	dwrApprovalPending,
	fetchAttendance,
	fetchAttendanceDaywiseForModal,
	createTourTxn,
	addError,
	createOD,
})(Dashboard);

const styles = StyleSheet.create({
	textAreaContainer: {
		borderColor: "gray",
		borderWidth: 1,
		marginTop: 10,
		height: 190,
		borderRadius: 10,
	},
	container: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		margin: 10,
	},
	textArea: {
		height: 150,
		justifyContent: "flex-start",
		flex: 1,
		padding: 8,
	},
	Text: {
		fontSize: 25,
		margin: 20,
		color: "white",
	},
	displayCardContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		marginBottom: 10,
	},
	textStyle: {
		fontSize: 30,
		color: "#FFBA00",
		fontWeight: "bold",
	},
	tableContainer: {
		margin: 5,
	},
	cellStyle: {
		width: 100,
	},

	infoTextStyle: {
		fontSize: 15,
	},
	infoTextWithBold: {
		fontWeight: "bold",
		fontSize: 17,
		alignSelf: "center",
		paddingHorizontal: 3,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 5,
		alignItems: "center",
	},
	box: {
		height: 22,
		minWidth: 25,
		color: "#FFF",
		borderRadius: 5,
		justifyContent: "center",
	},
});
