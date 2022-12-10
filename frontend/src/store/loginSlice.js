import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const stateA = (state, action) => {
  state.isLoggedIn = action.payload.isLoggedIn;
  state.isLoading = action.payload.isLoading;
  state.user = action.payload.user;
  state.alert = action.payload.alert;
  state.status = action.payload.status;
  state.isUpdating = action.payload.isUpdating;
};

const login = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    alert: "",
    user: null,
    status: "",
    isUpdating: false,
  },
  reducers: {
    login(state, action) {
      stateA(state, action);
    },
    singup(state, action) {
      stateA(state, action);
    },
    loadUser(state, action) {
      stateA(state, action);
    },
    logout(state, action) {
      stateA(state, action);
    },
    updateUser(state, action) {
      stateA(state, action);
    },
    clearAlert(state, action) {
      state.status = null;
      state.alert = null;
    },
  },
});

export const loginUser = (userData) =>
  async function (dispatch) {
    try {
      dispatch(login.actions.login({ isLoading: true }));
      // const config = { headers: { "Content-Type": "application/json" } };

      const data = await axios({
        // headers: { "Content-Type": "application/json" },
        url: "/api/v1/users/login",
        data: userData,
        method: "POST",
      });

      dispatch(
        login.actions.login({
          isLoading: false,
          user: data.data.data.user,
          isLoggedIn: true,
          status: "Success",
          alert: "Logged In",
        })
      );
    } catch (err) {
      const errorsss = err.response.data.message;
      console.log(err.response);
      dispatch(
        login.actions.login({
          status: "Error",
          alert:
            err.response.status === 500 ? err.response.statusText : errorsss,
        })
      );
    }
    setTimeout(() => {
      dispatch(login.actions.clearAlert());
    }, 3000);
  };

export const singupUser = (userData) => async (dispatch) => {
  try {
    dispatch(login.actions.singup({ isLoading: true }));

    const user = await axios({
      url: "/api/v1/users/singup",
      data: userData,
      method: "POST",
    });

    dispatch(
      login.actions.login({
        isLoading: false,
        user: user.data.data.user,
        isLoggedIn: true,
        status: "Success",
        alert: "Signed In",
      })
    );
  } catch (error) {
    console.log(error);
    console.log(error.response.data);

    const errorsss = error.response.data.message;
    // const err = Object.values(errorsss)[0].message;
    dispatch(
      login.actions.singup({
        status: "Error",
        alert: errorsss,
      })
    );
  }
  setTimeout(() => {
    dispatch(login.actions.clearAlert());
  }, 3000);
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch(login.actions.updateUser({ isLoading: true, isUpdating: true }));

    const user = await axios({
      url: "/api/v1/users/updateMe",
      data: userData,
      method: "PATCH",
    });

    console.log(user);

    dispatch(
      login.actions.updateUser({
        isLoading: false,
        status: "Success",
        user: user.data.data.user,
        alert: "Updated",
        isLoggedIn: true,
        isUpdating: false,
      })
    );
  } catch (err) {
    console.log(err.response);
    dispatch(
      login.actions.updateUser({
        isLoading: false,
        status: "Error",
        alert: "Update Failed",
        error: "Err",
        isUpdating: false,
      })
    );
  }
  setTimeout(() => {
    dispatch(login.actions.clearAlert());
  }, 3000);
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(login.actions.loadUser({ isLoading: true }));
    const user = await axios.get("/api/v1/users/loaduser");
    console.log(user);

    dispatch(
      login.actions.loadUser({
        isLoading: false,
        isLoggedIn: true,
        user: user.data.user,
      })
    );
  } catch (err) {
    dispatch(login.actions.loadUser({ isLoading: false, user: null }));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(login.actions.logout({ isLoading: true }));
    const res = await axios.get("/api/v1/users/logout");
    console.log(res);
    dispatch(
      login.actions.logout({
        isLoading: false,
        user: null,
        isLoggedIn: false,
        alert: "Logged Out",
        status: "Success",
      })
    );
  } catch (err) {
    dispatch(
      login.actions.loadUser({
        isLoading: false,
        isError: err.response.data.message,
        alert: "Error",
        status: err.response.data.message,
      })
    );
  }
  setTimeout(() => {
    dispatch(login.actions.clearAlert());
  }, 3000);
};

export const clearAlerts = () => async (dispatch) => {
  dispatch(login.actions.clearAlert());
};

export default login;
