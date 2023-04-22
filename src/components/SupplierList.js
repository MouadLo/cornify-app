import React, {useState, useEffect} from "react";
import {StyleSheet, View, FlatList} from "react-native";
import {Text, Card, Icon, Divider} from "@ui-kitten/components";

const SupplierList = ({navigation}) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers data from backend
    /* const fetchData = async () => {
      try {
        const response = await fetch("/api/suppliers");
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); */
  }, []);

  const renderItem = ({item}) => {
    return (
      <Card
        style={styles.card}
        onPress={() => {
          navigation.navigate("Supplier Details", {supplierId: item.id});
        }}
      >
        <View style={styles.cardContent}>
          <Icon style={styles.icon} name="person-outline" />
          <Text category="h6" style={styles.name}>
            {item.name}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.title}>
        Suppliers
      </Text>
      <Divider style={styles.divider} />
      <FlatList
        data={suppliers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  name: {
    fontWeight: "bold",
  },
});

export default SupplierList;
