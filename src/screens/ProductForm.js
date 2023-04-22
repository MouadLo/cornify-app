import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {API} from "aws-amplify";
import {BarCodeScanner} from "expo-barcode-scanner";

const ProductForm = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [codeBar, setCodeBar] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleBarCodeScanned = ({data}) => {
    setCodeBar(data);
    setShowScanner(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (showScanner) {
    return (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
  const createProduct = async (
    title,
    category,
    brand,
    description,
    price,
    codeBar,
    buyingPrice
  ) => {
    const product = {
      title,
      category,
      description,
      codeBar,
      price: parseFloat(price),
      brand,
      buyingPrice: parseFloat(buyingPrice),
    };

    try {
      console.log("add new product");
      return await API.post("products", "/products", {body: product});
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  const handleSubmit = async () => {
    // Submit the form data to create a new product entity
    console.log(
      "Submitted form data:",
      title,
      description,
      price,
      category,
      codeBar,
      buyingPrice
    );

    const data = await createProduct(
      title,
      category,
      brand,
      description,
      price,
      codeBar,
      buyingPrice
    );
    navigation.navigate("ProductList");
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Buying Price"
        value={buyingPrice}
        onChangeText={(text) => setBuyingPrice(text)}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Category"
        value={category}
        onChangeText={(text) => setCategory(text)}
        style={styles.input}
      />

      <TextInput
        label="Code bard"
        value={codeBar}
        disabled={true}
        style={styles.input}
      />
      <TextInput
        label="Brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
        style={styles.input}
      />
      <Button
        title="Scan Barcode"
        onPress={handleScanBarcode}
        style={styles.button}
      >
        Scan Barcode
      </Button>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Create
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default ProductForm;
