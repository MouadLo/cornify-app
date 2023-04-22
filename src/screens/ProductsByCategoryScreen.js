ProductsByCategoryScreen;
import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  Layout,
  Text,
  Select,
  List,
  ListItem,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import {fetchProducts} from "../redux/reducers/products";
import {fetchCategories} from "../redux/reducers/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import getCategoryData from "../selectors/getCategoryData";
import {addItem} from "../redux/reducers/cartSlice";

const ProductsByCategoryScreen = () => {
  const dispatch = useDispatch();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    new IndexPath(0)
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  const {products} = useSelector((state) => state.products);
  const {categories, loading: loadingCategory} = useSelector(
    (state) => state.categories
  );

  const {cartItems} = useSelector((state) => state.cart);

  const categoriesMap = useSelector(getCategoryData);
  useEffect(() => {
    if (categories.length === 0 || products.length === 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }

    if (products.length > 0 && categories.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category ===
          categories[selectedCategoryIndex.row ? selectedCategoryIndex.row : 0]
            .id
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategoryIndex]);
  const renderItem = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        <ListItem
          title={item.title}
          onPress={() => {
            dispatch(
              addItem({
                id: item.productID,
                name: item.title,
                price: item.price,
                quantity: 1,
              })
            );
          }}
          accessoryRight={() => <AddToCartButton item={item} />}
        >
          <Text>{item.title} :</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}> {`$${item.price}`}</Text>
            {item.buyingPrice && (
              <Text style={styles.salePrice}>{item.buyingPrice}</Text>
            )}
          </View>
        </ListItem>
      </View>
    );
  };
  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Text category="h5" style={styles.headerText}>
          Products By Category
        </Text>
        {loadingCategory ? (
          <ActivityIndicator />
        ) : (
          <Select
            label="Select Category"
            placeholder="Select a category"
            selectedIndex={selectedCategoryIndex}
            onSelect={(index) => {
              setSelectedCategoryIndex(index);
            }}
            value={
              categories.length > 0
                ? categoriesMap[categories[selectedCategoryIndex.row].id]
                : ""
            }
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <SelectItem key={category.id} title={category.name} />
              ))
            ) : (
              <SelectItem title="No categories found." />
            )}
          </Select>
        )}
      </View>

      {filteredProducts.length > 0 ? (
        <List data={filteredProducts} renderItem={renderItem} />
      ) : (
        <Text>No products found.</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    paddingBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    marginRight: 8,
  },
  salePrice: {
    color: "gray",
  },
});

export default ProductsByCategoryScreen;
