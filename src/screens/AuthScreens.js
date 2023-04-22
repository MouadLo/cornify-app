import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {ActivityIndicator, Button, Text, TextInput} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthState, signIn, signUp} from "../redux/actions/auth";
import {setErrorAction} from "../redux/reducers/auth";

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, error, loading} = useSelector((state) => state.auth);

  const handleSignIn = () => {
    if (email === "" || password === "") {
      console.log();
      dispatch(setErrorAction("Please enter your email and password."));
      return;
    }

    dispatch(signIn(email, password, navigation));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        style={styles.input}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
          Sign In
        </Button>
      )}
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("SignUp");
          dispatch(setErrorAction(""));
        }}
        style={styles.button}
      >
        Go To Sign Up
      </Button>
    </View>
  );
};

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {user, error, loading} = useSelector((state) => state.auth);
  const handleSignUp = async () => {
    // handle sign up logic
    if (email === "" || password === "") {
      dispatch(setErrorAction("Please enter your email and password."));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(
        setErrorAction("Password and confirm password fields do not match.")
      );
      return;
    }
    dispatch(signUp(email, password, email, navigation));
    // navigation.navigate("Confirmation", {username: email});
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        style={styles.input}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
      )}

      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("SignIn");
          dispatch(setErrorAction(""));
        }}
        style={styles.button}
      >
        Go To Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export {SignInScreen, SignUpScreen};
