import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {Icon, ListItem, Divider, Input} from "@ui-kitten/components";
import {useDispatch, useSelector} from "react-redux";
import {
  addCustomer,
  deleteCustomer,
  fetchCustomers,
} from "../redux/reducers/customerSlice";

const CustomerListScreen = ({}) => {
  const dispatch = useDispatch();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const {customersList} = useSelector((state) => state.customer);
  const [isRequired, setIsRequired] = useState(false); // flag to check if input is required

  useEffect(() => {
    console.log(customersList);
    dispatch(fetchCustomers());
    console.log(customersList);
  }, [dispatch]);

  const handleAddCustomer = () => {
    if (!email || !newCustomerName) {
      setIsRequired(true);
      return;
    }
    console.log({
      name: newCustomerName,
      email,
      streetAddress,
      city,
      state,
      zipCode,
      phone,
    });
    dispatch(
      addCustomer({
        name: newCustomerName,
        email,
        streetAddress,
        city,
        state,
        zipCode,
        phone,
      })
    );

    setIsAddModalVisible(false);
    setNewCustomerName("");
  };

  const renderItem = ({item}) => (
    <>
      {item ? (
        <ListItem
          title={item.email}
          accessoryRight={() => (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => onUpdateCustomer(item)}>
                <Icon name="edit-outline" style={styles.icon} fill="#3366FF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(deleteCustomer({id: item.id}))}
              >
                <Icon name="trash-outline" style={styles.icon} fill="#FF3D71" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>no customer found.</Text>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customersList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
      />
      <View style={styles.addButtonContainer}>
        <Button
          title="Add Customer"
          onPress={() => setIsAddModalVisible(true)}
        />
      </View>
      <Modal visible={isAddModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New Customer</Text>
          <Input
            label="Customer Name"
            style={styles.modalInput}
            value={newCustomerName}
            onChangeText={setNewCustomerName}
            status={isRequired ? "danger" : "basic"}
          />

          <Input
            label="Customer Email"
            style={styles.modalInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            status={isRequired ? "danger" : "basic"}
          />
          <Input
            label="Street Address"
            style={styles.modalInput}
            placeholder="Street Address"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
          <Input
            label="City"
            style={styles.modalInput}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <Input
            label="State"
            style={styles.modalInput}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <Input
            label="Zip Code"
            style={styles.modalInput}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
          />
          <Input
            label="Customer phone number"
            style={styles.modalInput}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Cancel"
              onPress={() => setIsAddModalVisible(false)}
            />
            <Button title="Add" onPress={handleAddCustomer} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 4,
  },
  addButtonContainer: {
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default CustomerListScreen;
