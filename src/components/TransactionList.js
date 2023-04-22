import React from "react";
import {StyleSheet, View} from "react-native";
import {List, ListItem, Text} from "@ui-kitten/components";

const TransactionList = ({transactions}) => {
  const renderItem = ({item}) => (
    <ListItem
      title={`${item.type === "purchase" ? "Purchased" : "Payment"} ${
        item.amount
      }`}
      description={`${item.date} - ${item.customer}`}
    />
  );

  return (
    <View style={styles.container}>
      <Text category="h5">Transactions</Text>
      <List data={transactions} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TransactionList;
