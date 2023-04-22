import React from "react";
import {StyleSheet, FlatList, View} from "react-native";
import {Text, Button, Icon, Input} from "@ui-kitten/components";
import {useDispatch, useSelector} from "react-redux";
import {mdiTrashCan} from "@mdi/js";
import {removeItem, updateItemQuantity} from "../redux/reducers/cartSlice";
import {TextInput} from "react-native-gesture-handler";

const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {cartItems} = useSelector((state) => state.cart);
  const renderCartItem = ({item}) => {
    console.log(item);
    return (
      <>
        {item ? (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Input
              value={item.quantity.toString()}
              inputMode="numeric"
              keyboardType="numeric"
              size="small"
              onChangeText={(quantity) => {
                console.log(quantity);
                dispatch(
                  updateItemQuantity({
                    id: item.id,
                    quantity,
                  })
                );
              }}
            />
            <Text>${item.price * item.quantity}</Text>
            <Button
              size="small"
              onPress={() => dispatch(removeItem(item))}
              status="danger"
              accessoryLeft={TrashIcon}
            ></Button>
          </View>
        ) : (
          <Text>no item found.</Text>
        )}
      </>
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      )
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalContainer}>
            <Text>Total: ${calculateTotal()} </Text>
            <Button onPress={() => navigation.navigate("InvoiceScreen")}>
              Checkout
            </Button>
          </View>
        </>
      ) : (
        <Text>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
    marginRight: 8,
  },
});

export default CartScreen;
