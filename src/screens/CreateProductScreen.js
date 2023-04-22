import React, {useEffect, useState} from "react";
import {mdiBarcode} from "@mdi/js";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  Input,
  Button,
  Select,
  SelectItem,
  IndexPath,
  Modal as UIKittenModal,
  Card,
  Text,
  Icon,
} from "@ui-kitten/components";
import {useDispatch, useSelector} from "react-redux";
import {BarCodeScanner} from "expo-barcode-scanner";
import {
  createCategory,
  fetchCategories,
} from "../redux/reducers/categoriesSlice";
import {createProduct} from "../redux/reducers/products";

const CreateProductScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBuyingPrice, setProductBuyingPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCodeBar, setProducCodeBar] = useState("");

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    new IndexPath(0)
  );
  const [categoryError, setCategoryError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isRequired, setIsRequired] = useState(false); // flag to check if input is required

  const {
    categories,
    error,
    loading: loadingCategory,
  } = useSelector((state) => state.categories);
  const {loadingCreate, errorCreate} = useSelector((state) => state.products);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleBarCodeScanned = ({data}) => {
    setProducCodeBar(data);
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
  const handleCreateProduct = () => {
    // Logic to create product with name, price, and selected category

    if (!selectedCategoryIndex) {
      setCategoryError("Category is required.");
      console.log("Category is required.");
      return;
    }
    if (!productName) {
      setIsRequired(true); // if input is empty, set isRequired to true
      return;
    }
    const product = {
      title: productName,
      category:
        categories.length > 0
          ? categories[selectedCategoryIndex.row].id
          : "default",
      description: productDescription,
      codeBar: productCodeBar,
      price: parseFloat(productPrice),
      brand: productBrand,
      buyingPrice: parseFloat(productBuyingPrice),
    };
    dispatch(createProduct(product, navigation));
  };

  const handleNewCategory = () => {
    // Logic to create new category with newCategoryName
    dispatch(createCategory(newCategoryName));
    setIsModalVisible(false);
  };

  const renderCategoryOption = (category) => {
    return <SelectItem key={category.createdAt} title={category.name} />;
  };

  const renderCategoryModal = () => (
    <UIKittenModal
      visible={isModalVisible}
      backdropStyle={styles.modalBackdrop}
      onBackdropPress={() => setIsModalVisible(false)}
    >
      <Card style={styles.modalCard}>
        <Text category="h6">Create New Category</Text>
        <Input
          placeholder="Enter Category Name"
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          style={styles.modalInput}
        />
        <Button onPress={handleNewCategory}>Create Category</Button>
      </Card>
    </UIKittenModal>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          label="Product Name"
          placeholder="Enter Product Name"
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
          status={isRequired ? "danger" : "basic"}
        />
        <Input
          label="Price"
          placeholder="Enter Product Price"
          keyboardType="numeric"
          value={productPrice}
          onChangeText={setProductPrice}
          style={styles.input}
        />
        <Input
          label="Buying Price"
          placeholder="Enter Product Buying Price"
          keyboardType="numeric"
          value={productBuyingPrice}
          onChangeText={setProductBuyingPrice}
          style={styles.input}
        />
        {loadingCategory ? (
          <ActivityIndicator />
        ) : (
          <Select
            label="Category"
            value={
              selectedCategoryIndex
                ? categories[selectedCategoryIndex.row].name
                : ""
            }
            selectedIndex={selectedCategoryIndex}
            onSelect={(index) => {
              setSelectedCategoryIndex(index);
            }}
            style={styles.input}
            status={!selectedCategoryIndex ? "danger" : "basic"}
          >
            {categories && categories.map(renderCategoryOption)}
            <SelectItem
              title="Create New Category"
              onPress={() => setIsModalVisible(true)}
            />
          </Select>
        )}
        {categoryError && (
          <Text style={styles.error}>Category is required.</Text>
        )}
        <Input
          label="Product Description"
          placeholder="Enter Product Description"
          value={productDescription}
          onChangeText={setProductDescription}
          style={styles.input}
        />
        <Input
          label="Product Brand"
          placeholder="Enter Product Brand"
          value={productBrand}
          onChangeText={setProductBrand}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleScanBarcode}>
          <View>
            <Input
              label="Product Code Bar"
              placeholder="Scan Product Code Bar"
              value={productCodeBar}
              onChangeText={setProducCodeBar}
              style={styles.input}
              disabled={true}
              icon={(props) => (
                <Icon
                  {...props}
                  name={mdiBarcode}
                  onPress={() => setProductName("")}
                />
              )}
            />
            <Text>Click to scan code bar</Text>
          </View>
        </TouchableOpacity>
        {loadingCreate ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button onPress={handleCreateProduct}>Create Product</Button>
        )}
        {errorCreate !== "" && <Text style={styles.error}>{errorCreate}</Text>}
        {renderCategoryModal()}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalInput: {
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 20,
  },
});

export default CreateProductScreen;
