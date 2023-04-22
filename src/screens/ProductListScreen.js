import React, {useState, useEffect} from "react";
import {View, FlatList, StyleSheet, ActivityIndicator} from "react-native";
import {List, Card, Title, Paragraph, Button} from "react-native-paper";

import {useDispatch, useSelector} from "react-redux";

import {Text} from "react-native";
import {deleteProduct, fetchProducts} from "../redux/reducers/products";
import getCategoryData from "../selectors/getCategoryData";

const ProductListScreen = ({onAddToCart, route, navigation}) => {
  const dispatch = useDispatch();

  const categories = useSelector(getCategoryData);
  const {products, error, loading, loadingDelete, statusDelete, errorDelete} =
    useSelector((state) => state.products);

  const [productToDelete, setProductToDelete] = useState({
    productID: null,
    category: null,
  });
  useEffect(() => {
    console.log(products);
    dispatch(fetchProducts());
    console.log(products);
  }, [dispatch]);

  async function handleDelete(id, category) {
    try {
      console.log("delete product with category:" + category);
      setProductToDelete({productID: id, category: category});
      dispatch(deleteProduct({id, category}));
      //  dispatch(fetchProducts());
    } catch (error) {
      console.log("Error delete ", error);
    }
  }

  const renderItem = ({item}) => {
    const categoryName = categories[item.category];

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>Category: {categoryName}</Paragraph>
          <Paragraph>Price: {item.price}</Paragraph>
          <Paragraph>Buying Price: {item.buyingPrice}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {loadingDelete && item.productID === productToDelete.productID ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Button onPress={() => handleDelete(item.productID, item.category)}>
              Delete Item
            </Button>
          )}

          <Button
            onPress={() =>
              navigation.navigate("ProductPriceHistoryScreen", {
                productId: item.productID,
              })
            }
          >
            Price History
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("UpdateProductScreen", {
                ...item,
              })
            }
          >
            Edit
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      {statusDelete !== "" && (
        <Text style={styles.status}>Delete {statusDelete}</Text>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.productID}+${item.title}`}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eff",
  },
  listContainer: {
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  status: {
    color: "green",
    marginBottom: 20,
  },
});

export default ProductListScreen;
