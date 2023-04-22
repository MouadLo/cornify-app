import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import * as eva from "@eva-design/eva";
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import {Amplify} from "aws-amplify";
import "react-native-gesture-handler";
import {useDispatch, useSelector, Provider} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";

import store from "./src/redux/store";

import config from "./config";
import {checkAuthState} from "./src/redux/actions/auth";

import AppNavigator from "./src/navigation/AppNavigator";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "products",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

function App() {
  const dispatch = useDispatch();
  const {user, error, loading} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
    // dispatch(fetchProducts());
  }, [dispatch]);

  if (user) {
    return <AppNavigator isSignedIn={true} />;
  }

  return <AppNavigator />;
}

const Root = () => (
  <Provider store={store}>
    <PaperProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </PaperProvider>
  </Provider>
);

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});
