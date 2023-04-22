import {Auth} from "aws-amplify";
import {Button, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {signOutAction} from "../redux/reducers/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Go to Product List "
        onPress={() => navigation.navigate("ProductList")}
      />
      <Button
        title="Add new product"
        onPress={() => navigation.navigate("NewProduct")}
      />
      <Button
        title="Customer and Suppliers Transaction"
        onPress={() => navigation.navigate("CustomerSuppliersScreen")}
      />

      <Button
        title="Products by Category"
        onPress={() => navigation.navigate("ProductsByCategoryScreen")}
      />
      <Button
        title="Create a product"
        onPress={() => navigation.navigate("CreateProductScreen")}
      />
      <Button
        title="Customer List"
        onPress={() => navigation.navigate("CustomerListScreen")}
      />
      <Button
        title="Sign Out"
        onPress={() => {
          Auth.signOut();
          dispatch(signOutAction());
        }}
      />
    </View>
  );
};

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

export default HomeScreen;
