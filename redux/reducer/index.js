import { combineReducers } from "redux";
import dwrAll from "./allDwr";
import allNotifications from "./allNotification-reducer";
import attendanceCalendar from "./attendance-calendar-reducer";
import attendanceDateSummary from "./attendance-date-summary-reducer";
import attendance from "./attendance-reducer";
import attendanceSummary from "./attendance-summary-reducer";
import attendanceTxnHistory from "./attendance-txn-history-reducer";
import attendanceTxnPending from "./attendance-txn-pending-reducer";
import selectedAttendanceTransaction from "./attendance-txn-selected-reducer";
import selectedAttendanceTransactionTabDetails from "./attendance-txn-tab-reducer";
import attendanceTxnUser from "./attendance-txn-user-reducer";
import bdayOfCrrntMonths from "./bdayCrrntMonthRed";
import compOffTxnHistory from "./comp-off-txn-history-reducer";
import compOffTxnHoliday from "./comp-off-txn-holidays-reducer";
import compOffTxnPending from "./comp-off-txn-pending-reducer";
import compOffTxnSelected from "./comp-off-txn-selected-reducer";
import compOffTxnTabDetails from "./comp-off-txn-tab-details-reducer";
import compOffTxnUser from "./comp-off-txn-user-reducer";
import departments from "./department-reducer";
import deviceToken from "./device-token-reducer";
import dwrApprovalPendingList from "./dwrApprovalPending";
import dwrCount from "./dwrCount";
import dwrPendingDetail from "./dwrPendingRed";
import eisAssets from "./eis-assets-reducer";
import eisEducational from "./eis-educational-reducer";
import eisExperience from "./eis-experience-reducer";
import eisFamily from "./eis-family-reducer";
import eisLanguage from "./eis-language-reducer";
import eisMediclaim from "./eis-mediclaim-reducer";
import eisOfficial from "./eis-official-reducer";
import eisOfficialSecond from "./eis-official-second-reducer";
import eisPersonal from "./eis-personal-reducer";
import eisStatutory from "./eis-statutory-reducer";
import eisTransferHistory from "./eis-transfer-history-reducer";
import employees from "./employee-reducer";
import grades from "./grade-reducer";
import holidays from "./holiday-reducer";
import leaveBalanceByEmployee from "./leave-balance-reducer";
import leaves from "./leave-reducer";
import leaveTxnApplied from "./leave-txn-applied-reducer";
import leaveTxnOfEmployee from "./leave-txn-by-employee-reducer";
import leaveTxnHistory from "./leave-txn-history-reducer";
import leaveTxnPending from "./leave-txn-pending-reducer";
import selectedLeaveTransaction from "./leave-txn-selected-reducer";
import leaveTxnUser from "./leave-txn-user-reducer";
import loadingReqs from "./loadingReqs";
import message from "./message";
import multipleUploadResult from "./multiple-upload-result-reducer";
import myPendingTxn from "./my-pending-txn-reducer";
import newJoiner from "./newJoinRed";
import notifications from "./notification-reducer";
import allODApplications from "./od-app-all-reducer";
import pendingODApplications from "./od-app-pending-reducer";
import selectedODTransaction from "./od-selected-details-reducer";
import selectedODTransactionTabDetails from "./od-selected-tab-details-reducer";
import odTxnUser from "./od-txn-user-reducer";
import pendingTransactionCount from "./pending-txn-count-reducer";
import salaryMonthSummary from "./salary-month-summary-reducer";
import shiftTxnHistory from "./shift-txn-history-reducer";
import shiftTxnPending from "./shift-txn-pending-reducer";
import shiftTxnSelected from "./shift-txn-selected-reducer";
import shiftTxnUser from "./shift-txn-user-reducer";
import sites from "./site-reducer";
import siteSQLMap from "./site-sql-map-reducer";
import teamAttendanceSummaryDetails from "./team-attendance-summary-details-reducer";
import teamAttendanceSummary from "./team-attendance-summary-reducer";
import teamPendingTxn from "./team-pending-txn-reducer";
import toasts from "./toasts";
import token from "./token";
import tourTxnHistory from "./tour-txn-history-reducer";
import tourTxnPending from "./tour-txn-pending-reducer";
import tourTxnSelected from "./tour-txn-selected-reducer";
import tourTxnUser from "./tour-txn-user-reducer";
import user from "./userRed";
import workflowEmployees from "./workflow-employee-reducer";

import accountingPeriods from "./accountingPeriods-reducer";
import filterParams from "./filter-params-reducer";
import itDeclaration from "./itDeclaration-reducer";
import modalManage from "./modal-manage-reducer";
import selectedITDeclaration from "./selected-it-decl-reducer";

import selectedCompOffTxnTabDetails from "./comp-off-txn-tab-details-reducer";
import compOffUserReducer from "./comp-off-user-details-reducer";
import CompOffTxnCreateUser from "./compoff-txn-create-user-reducer";
import attendanceDaywiseModal from "./fetchattendace-daywise-modal-reducer";
import attendanceDaywise from "./fetchattendace-daywise-reducer";
import leaveTxnCreateUser from "./leave-txn-create-user-reducer";

export default combineReducers({
  message,
  user,
  token,
  bdayOfCrrntMonths,
  newJoiner,
  dwrPendingDetail,
  notifications,
  deviceToken,
  loadingReqs,
  dwrCount,
  dwrApprovalPendingList,
  allNotifications,
  attendance,
  employees,
  siteSQLMap,
  toasts,
  holidays,
  leaves,
  leaveBalanceByEmployee,
  myPendingTxn,
  teamPendingTxn,
  attendanceSummary,
  teamAttendanceSummary,
  departments,
  sites,
  grades,
  dwrAll,
  pendingODApplications,
  allODApplications,
  selectedODTransaction,
  selectedODTransactionTabDetails,
  leaveTxnOfEmployee,
  leaveTxnHistory,
  leaveTxnPending,
  selectedLeaveTransaction,
  leaveTxnApplied,
  shiftTxnPending,
  shiftTxnHistory,
  shiftTxnSelected,
  tourTxnPending,
  tourTxnHistory,
  tourTxnSelected,
  compOffTxnPending,
  compOffTxnHistory,
  compOffTxnSelected,
  compOffTxnTabDetails,
  compOffTxnHoliday,
  attendanceCalendar,
  attendanceTxnHistory,
  attendanceTxnPending,
  selectedAttendanceTransaction,
  selectedAttendanceTransactionTabDetails,
  eisPersonal,
  eisOfficial,
  eisOfficialSecond,
  eisAssets,
  eisEducational,
  eisExperience,
  eisFamily,
  eisMediclaim,
  eisStatutory,
  eisTransferHistory,
  multipleUploadResult,
  workflowEmployees,
  eisLanguage,
  teamAttendanceSummaryDetails,
  pendingTransactionCount,
  attendanceDateSummary,
  salaryMonthSummary,
  odTxnUser,
  leaveTxnUser,
  shiftTxnUser,
  tourTxnUser,
  compOffTxnUser,
  attendanceTxnUser,
  accountingPeriods,
  itDeclaration,
  filterParams,
  selectedITDeclaration,
  modalManage,
  attendanceDaywise,
  attendanceDaywiseModal,
  compOffUserReducer,
  leaveTxnCreateUser,
  selectedCompOffTxnTabDetails,
  CompOffTxnCreateUser,
});
