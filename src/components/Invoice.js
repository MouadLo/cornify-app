import React from "react";
import {Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer";
import {useSelector} from "react-redux";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderStyle: "solid",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    padding: 5,
  },
});

const Invoice = () => {
  const {cartItems: items} = useSelector((state) => state.cart);

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.subtitle}>Items</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Price</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Quantity</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Total</Text>
              </View>
            </View>
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.quantity * item.price}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.subtitle}>Total: {total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
