import moment from "moment";
import React, { useContext, useState } from "react";
import { ScrollView, View, Platform, PermissionsAndroid } from "react-native";
import { connect, useDispatch } from "react-redux";
import CameraOpenCard from "../../components/CheckIn/CameraOpenCard";
import CheckInCard from "../../components/CheckIn/CheckInCard";
import { DimensionContext } from "../../components/dimensionContext";
import { CheckInOutMark } from "../../redux/actions/checkin.action";
import config from "../../config/config";
import Geolocation from "react-native-geolocation-service"; // Mobile only
import axios from "axios";
import { addError, addSuccess } from "../../redux/actions/toast.action";
const CheckIn = ({
	user,
	CheckInOutMark,
	CheckOutMark,
	addSuccess,
	addError,
}) => {
	const dispatch = useDispatch();
	const { window } = useContext(DimensionContext);
	const [checkinData, setCheckInData] = useState();
	const [location, setLocation] = useState(null);
	const [photoUri, setPhotoUri] = useState(null);
	const [checkRemark, setCheckRemark] = useState("Check-In");
	//*Here Call the GET API to check if already CHECKED IN or NOT if YES Then Provide an option of CHECKOUT ELSE CHECK IN *//

	// useEffect(() => {
	// 	getCheckInData();
	// }, []);

	// const getCheckInData = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${config.baseUrl}api/attendance/checkInStatus`,
	// 		);
	// 		if (response.data.message === "Exists") {
	// 			setCheckRemark("Check-Out");
	// 		}
	// 		addSuccess(response.data.message, 3000);
	// 	} catch (e) {
	// 		addError(error.response.data.message, 3000);
	// 	}
	// };

	async function checkRadiusStatus() {
		Geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position?.coords;
				setLocation({ latitude, longitude });
			},
			(err) =>
				addError(
					`Geolocation Permission Denied/Not Supported. ${err}`,
					4000,
				),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
		);
		const response = await axios.post(
			`${config.baseUrl}api/attendance/checkRadiusStatus`,
			{
				empSite: user?.empSite,
				latitude: location?.latitude,
				longitude: location?.longitude,
			},
		);

		if (response?.data?.message === "TRUE") {
			addSuccess("You are in the radius", 3000);
		} else {
			addError("You are not in the radius", 3000);
		}
	}
	const onCheckInOut = async () => {
		const status = await checkRadiusStatus();
		if (status === "TRUE") {
			let data = {
				empCode: user.empCode,
				deptCode: user.deptCode,
				fromDate: moment().format("YYYY-MM-DD HH:mm"),
				toDate: moment().format("YYYY-MM-DD HH:mm"),
				eventDate: moment().format("YYYY-MM-DD"),
				lat: location.latitude,
				lnn: location.longitude,
				remarks: checkRemark,
				approvalAuthority: "HR",
				employeePhoto: photoUri,
			};

			CheckInOut(data);
		} else {
			addError("You are not in the radius", 3000);
		}
	};
	const CheckInOut = async (data) => {
		try {
			const response = await axios.post(
				`${config.baseUrl}api/attendance/checkInOut`,
				{
					data: data,
				},
			);
			addSuccess(response.data.message, 3000);
		} catch (error) {
			addError(error.response.data.message, 3000);
		}
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View
				style={{
					flexDirection: window.width > 600 ? "row" : "column",
					margin: 10,
					width: window.width > 600 ? "80%" : null,
					...(window.width > 600 && { flex: 1 }),
					...(window.width > 600 && { alignSelf: "center" }),
				}}
			>
				<View
					style={{
						marginLeft: window.width > 600 ? 20 : 0,
						flex: 1,
						flexDirection: window.width > 600 ? "row" : "column",
					}}
				>
					<CheckInCard
						time={new Date()}
						active
						title={`${checkRemark} Time`}
						buttonText={`Mark As ${checkRemark}`}
						onPress={onCheckInOut}
						location={location}
						photoUri={photoUri}
						checkRadiusStatus={checkRadiusStatus}
					/>
				</View>

				<View
					style={
						window.width > 600 ? { marginLeft: 20, width: 600 } : {}
					}
				>
					<CameraOpenCard
						location={location}
						setLocation={setLocation}
						photoUri={photoUri}
						setPhotoUri={setPhotoUri}
						addError={addError}
						addSuccess={addSuccess}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

const mapStateToProps = ({ user }) => ({
	user,
});
export default connect(mapStateToProps, {
	CheckInOutMark,
	addSuccess,
	addError,
})(CheckIn);
