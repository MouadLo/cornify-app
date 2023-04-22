import {Auth} from "aws-amplify";
import {
  signInAction,
  signUpAction,
  setErrorAction,
  setLoadingAction,
} from "../reducers/auth";

export const signIn = (username, password, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      const user = await Auth.signIn(username, password);

      dispatch(signInAction(user));
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log(error.message);
      if (error.message === "User is not confirmed.") {
        dispatch(setLoadingAction(false));
        navigation.navigate("Confirmation", {username});
      }
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error.message));
    }
  };
};

export const signUp = (username, password, email, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      dispatch(setLoadingAction(false));
      navigation.navigate("Confirmation", {username: email});
    } catch (error) {
      console.log(error);
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error.message));
    }
  };
};

export const checkAuthState = () => async (dispatch) => {
  try {
    console.log("check auth state");
    const user = await Auth.currentAuthenticatedUser();
    console.log("check auth state");
    dispatch(signInAction(user));
    dispatch(signUpAction(user));
  } catch (err) {
    console.log(err);
    dispatch(setErrorAction(err.message));
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    // try {
    //   const user = await Auth.currentAuthenticatedUser();
    //   dispatch(signInAction(user));
    // } catch (err) {
    //   dispatch(setErrorAction(err.message));
    // }
  };
