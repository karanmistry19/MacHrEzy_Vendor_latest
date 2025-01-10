import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import localForage from "localforage";
import { Platform } from "react-native";
import { applyMiddleware, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import config from "../config/config";
import { doneLoading, loading } from "./actions/loading.action";
import { uuidv4 } from "./actions/toast.action";
import asyncDispatchMiddleware from "./middleware/async-dispatch.mw";
import navigateOnSuccessMiddleware from "./middleware/navigate-on-success.mw";
import reducer from "./reducer/index";
// import FSStorage, { CacheDir } from "redux-persist-fs-storage";

// const persistConfig = {
//   key: "root",
//   keyPrefix: "", // the redux-persist default is `persist:` which doesn't work with some file systems
//   storage: FSStorage(CacheDir, "myApp"),
// };
const persistConfig = {
  key: "root",
  storage: Platform.OS === "web" ? localForage : AsyncStorage,
};
const client = axios.create({
  baseURL: config.baseUrl,
  responseType: "json",
});

axios.interceptors.request.use((req) => {
  req.baseURL = store.getState().baseURL || config.baseUrl;
  req.timeout = 60000;
  console.log(req.baseURL);
  if (store.getState().user && store.getState().token) {
    const token = store.getState().token;
    req.headers.common.Authorization = `Bearer ${token}`;
  }
  // Important: request interceptors **must** return the request.
  return req;
});

const effect = (eff, _action) => axios({ ...eff, ["baseURL"]: config.baseUrl });
const discard = (error, _action, _retries) => {
  const { request, response } = error;
  if (!request) throw error; // There was an error creating the request
  if (!response) return false; // There was no response
  return 400 <= response.status && response.status < 500;
};

// const {
//   middleware: offlineMiddleware,
//   enhanceReducer: offlineEnhanceReducer,
//   enhanceStore: offlineEnhanceStore,
// } = createOffline({
//   ...offlineConfig,
//   persist: false,
//   effect,
//   discard,
// });

const axiosMiddlewareConfig = {
  interceptors: {
    request: [
      function ({ getState, dispatch, getSourceAction }, req) {
        req.baseURL = getState().baseURL || config.baseUrl;
        req.timeout = 60000;
        req.uid = uuidv4();
        console.log(req.baseURL);
        if (getState().user && getState().token) {
          const token = getState().token;
          req.headers.common.Authorization = `Bearer ${token}`;
        }
        dispatch(loading(req.uid));
        return req;
      },
    ],
    response: [
      {
        success: function ({ getState, dispatch, getSourceAction }, res) {
          dispatch(doneLoading(res.config.uid));
          return Promise.resolve(res);
        },
        error: function ({ getState, dispatch, getSourceAction }, error) {
          dispatch(doneLoading(error.config.uid));
          console.log(error);
          if (error && error.response && error.response.status === 401) {
            // unauthorized - redirect to login
            console.log(error);
            if (isFunction(navigator.navigate)) navigator.navigate("Login");
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    axiosMiddleware(client, axiosMiddlewareConfig),
    asyncDispatchMiddleware,
    navigateOnSuccessMiddleware,
  ),
);
export const store = createStore(persistedReducer, enhancer);
export const persister = persistStore(store);
