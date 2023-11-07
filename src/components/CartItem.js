import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>{item.client}</Text>
      <Text style={styles.textItem}>{item.project}</Text>
      <Text style={styles.textItem}>{item.paymentStatus}</Text>
      <Text style={styles.textItemQuantity}>{item.moneda}</Text>
      <Text style={styles.textItemQuantity}>{item.monto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
  },
  textItem: {
    margin: 5,
    width: "20%",
  },
  textItemQuantity: {
    margin: 5,
    width: "15%",
  },
});

export default CartItem;
