import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagenContainer}>
        <Image style={styles.imagen} source={{ uri: item.thumbnail }} />
      </View>
      <Text style={styles.textItemTitle}>{item.title}</Text>
      <View style={styles.textContainerPrice}>
        <Text style={styles.textItemQuantity}>{item.quantity}</Text>
        <Text style={styles.textItemPrice}>USD {item.totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
  },
  textItemTitle: {
    margin: 5,
    width: "45%",
  },
  textContainerPrice: {
    width: "40%",
    flexDirection: "row",
  },
  textItemQuantity: {
    margin: 5,
    width: "40%",
  },
  textItemPrice: {
    margin: 5,
    width: "60%",
  },
  imagenContainer: {
    width: "15%",
  },
  imagen: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default CartItem;
