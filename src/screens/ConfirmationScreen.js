import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Text, TextInput, Button} from "react-native-paper";
import {Auth} from "aws-amplify";

const ConfirmationScreen = ({route, navigation}) => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const {username} = route.params;

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("Error confirming sign up", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Account</Text>
      <Text style={styles.subtitle}>
        A confirmation code has been sent to your email
      </Text>
      <TextInput
        label="Confirmation Code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={confirmSignUp} style={styles.button}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
});

export default ConfirmationScreen;
