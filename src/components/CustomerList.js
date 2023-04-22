CustomerList;
import React, {useState, useEffect} from "react";
import {FlatList} from "react-native";
import {List, ListItem, Icon, Text, Button} from "@ui-kitten/components";
import {useDispatch, useSelector} from "react-redux";
import {fetchCustomers} from "../redux/reducers/customerSlice";

const CustomerList = () => {
  const dispatch = useDispatch();
  const {customersList: customers} = useSelector((state) => state.customer);

  useEffect(() => {
    console.log(customers);
    dispatch(fetchCustomers());
    console.log(customers);
  }, [dispatch]);

  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      description={`Balance: ${item.balance}`}
      accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
      accessoryRight={(props) => (
        <Button appearance="ghost" {...props}>
          View transactions
        </Button>
      )}
    />
  );

  return (
    <List
      data={customers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CustomerList;
