import React from "react";
import {Button} from "@ui-kitten/components";
import {useDispatch} from "react-redux";
import {addItem} from "../redux/reducers/cartSlice";

const AddToCartButton = ({item}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({id: item.id, name: item.name, price: item.price, quantity: 1})
    );
  };

  return <Button onPress={handleAddToCart}>Add to Cart</Button>;
};

export default AddToCartButton;
