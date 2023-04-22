import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import {TouchableOpacity} from "react-native-gesture-handler";

const InvoiceScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [pdfUri, setPdfUri] = useState(null);

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const tax = subTotal * 0.07; // 7% tax rate

  const shipping = 5; // Flat shipping fee of $5

  const discount = 0; // No discounts applied

  const total = subTotal + tax + shipping - discount;

  useEffect(() => {
    const createInvoice = async () => {
      let htmlContent = `
        <html>
          <head>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Invoice</h1>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${cartItems.map(
                  (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${Number(item.price).toFixed(2)}</td>
                      <td>${Number(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  `
                )}
              </tbody>
              <thead>
                <tr>
                  <th>Total HT</th>
                  <th>Tax</th>
                  <th>Total TTC</th>
                </tr>
              </thead>
              <tbody>
                ${`
                    <tr>
                      <td>${Number(subTotal).toFixed(2)}</td>
                      <td>${0}</td>
                      <td>${Number(subTotal).toFixed(2)}</td>
                    </tr>
                  `}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const {uri} = await Print.printToFileAsync({html: htmlContent});
      setPdfUri(uri);
    };

    createInvoice();
  }, [cartItems]);

  const handlePrint = async () => {
    const pdfFile = await FileSystem.readAsStringAsync(pdfUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const pdfBase64 = `data:application/pdf;base64,${pdfFile}`;
    await Print.printAsync({uri: pdfBase64});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice</Text>
      {pdfUri && (
        <Text style={styles.message}>
          Invoice generated successfully. Tap the button to print it.
        </Text>
      )}
      <View style={styles.buttonContainer}>
        {pdfUri && (
          <TouchableOpacity style={styles.button} onPress={handlePrint}>
            <Text style={styles.buttonText}>Print Invoice</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InvoiceScreen;
