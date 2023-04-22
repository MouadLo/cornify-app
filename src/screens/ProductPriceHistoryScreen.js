import React, {useEffect, useState} from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import {API} from "aws-amplify";

const ProductPriceHistoryScreen = ({route}) => {
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const {productId} = route.params;
        console.log(productId);
        const response = await API.get(
          "products",
          `/products/price-history/${productId}`
        );
        console.log(response);
        setPriceHistory(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPriceHistory();
  }, [route.params]);

  const renderPriceHistoryItem = ({item}) => {
    const {price, buyingPrice, timestamp} = item;
    return (
      <View style={styles.priceHistoryItem}>
        <Text style={styles.price}>P.V: {price}</Text>
        {buyingPrice && <Text style={styles.price}>P.A: {buyingPrice}</Text>}
        <Text style={styles.timestamp}>
          {new Date(timestamp).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={priceHistory}
        keyExtractor={(item) =>
          `${item.timestamp}+${item.price}+${item.product_id}`
        }
        renderItem={renderPriceHistoryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  priceHistoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 14,
    color: "#888",
  },
});

export default ProductPriceHistoryScreen;
