import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {Auth} from "aws-amplify";
import {useDispatch} from "react-redux";
import {signOutAction} from "../redux/reducers/auth";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [userAttributes, setUserAttributes] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserAttributes();
  }, []);

  const getUserAttributes = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const attributes = await Auth.userAttributes(user);
      const attributeMap = {};
      attributes.forEach((attribute) => {
        attributeMap[attribute.getName()] = attribute.getValue();
      });
      setUserAttributes(attributeMap);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeAttribute = (attributeName, attributeValue) => {
    setUserAttributes((prevState) => ({
      ...prevState,
      [attributeName]: attributeValue,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await Auth.updateUserAttributes(Auth.user, userAttributes);
      setSuccessMessage("Changes saved successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while saving your changes. Please try again."
      );
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await Auth.changePassword(userAttributes.email, password, newPassword);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while changing your password. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      {userAttributes && (
        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={userAttributes.email}
            onChangeText={(value) => handleChangeAttribute("email", value)}
          />
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={userAttributes.given_name}
            onChangeText={(value) => handleChangeAttribute("given_name", value)}
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={userAttributes.family_name}
            onChangeText={(value) =>
              handleChangeAttribute("family_name", value)
            }
          />
        </View>
      )}
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Save Changes" onPress={handleSaveChanges} />
      )}
      <Text style={styles.or}>- or -</Text>
      <Button title="Change Password" onPress={handleChangePassword} />
      <Button
        title="Sign Out"
        onPress={() => {
          Auth.signOut();
          dispatch(signOutAction());
        }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 20,
  },
  success: {
    color: "green",
    marginTop: 20,
  },
  loading: {
    marginTop: 20,
  },
});

export default SettingsScreen;
