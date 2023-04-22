import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../redux/reducers/products";

import {updateProduct} from "../redux/reducers/updateProduct";

const UpdateProductScreen = ({route, navigation}) => {
  const {
    productID,
    title,
    price,
    codeBar,
    category,
    buyingPrice,
    countInStock,
  } = route.params;
  const dispatch = useDispatch();
  const {products, error, isLoading, status} = useSelector(
    (state) => state.updateProduct
  );
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedBuyingPrice, setUpdatedBuyingPrice] = useState(buyingPrice);
  const [updatedCountInStock, setUpdatedCountInStock] = useState(countInStock);
  const handleUpdate = async () => {
    const updatedProduct = {
      title: updatedTitle,
      price: updatedPrice,
      codeBar,
      category: updatedCategory,
      buyingPrice: updatedBuyingPrice,
      countInStock: updatedCountInStock,
    };

    console.log({productID, updatedProduct});
    dispatch(updateProduct({productID, updatedProduct}));
    dispatch(fetchProducts());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Code Bar:</Text>
      <Text style={styles.text}>{codeBar}</Text>
      <Text style={styles.label}>Product Title:</Text>
      <TextInput
        style={styles.input}
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
      />
      <Text style={styles.label}>Product Price:</Text>
      <TextInput
        style={styles.input}
        value={updatedPrice}
        onChangeText={setUpdatedPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Product Category:</Text>
      <TextInput
        style={styles.input}
        value={updatedCategory}
        onChangeText={setUpdatedCategory}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Product Buying Price:</Text>
      <TextInput
        style={styles.input}
        value={updatedBuyingPrice}
        onChangeText={setUpdatedBuyingPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Count in Stock:</Text>
      <TextInput
        style={styles.input}
        value={updatedCountInStock}
        onChangeText={setUpdatedCountInStock}
        keyboardType="numeric"
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      {isLoading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Button title="Update Product" onPress={handleUpdate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default UpdateProductScreen;
