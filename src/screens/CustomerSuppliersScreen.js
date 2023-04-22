import React from "react";
import {StyleSheet, View} from "react-native";
import {TabView, TabBar} from "@ui-kitten/components";
import CustomerList from "../components/CustomerList";
import SupplierList from "../components/SupplierList";
import TransactionList from "../components/TransactionList";

const CustomerSuppliersScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onIndexChange = (index) => setSelectedIndex(index);

  return (
    <View style={styles.container}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={onIndexChange}
        tabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
      ></TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
});

export default CustomerSuppliersScreen;

const TransactionScreen = () => {
  return (
    <View style={stylesv2.container}>
      <TransactionList />
    </View>
  );
};

const stylesv2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
