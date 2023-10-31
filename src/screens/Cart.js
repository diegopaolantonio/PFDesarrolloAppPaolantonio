import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { cart } from "../data/cart";
import { colors } from "../theme/colors";

const Cart = () => {
  let tempTotalCartPrice = 0;
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    cart.forEach((e, index) => {
      cart[index].totalPrice = e.quantity * e.price;
    });
    tempTotalCartPrice = cart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPrice,
      0
    );
    setTotalCartPrice(tempTotalCartPrice);
  }, []);

  return (
    <SafeAreaView>
      <Header title="Carrito" />
      <View style={styles.container}>
        <Text style={styles.totalPrice}>Total: USD {totalCartPrice}</Text>
        <Pressable
          style={styles.button}
          onPress={() => console.log("Finalizar compra")}
        >
          <Text style={styles.buttonText}>Finalizar compra</Text>
        </Pressable>
        <Text>Detalle</Text>
        <View style={styles.list}>
          <FlatList
            data={cart}
            keyExtractor={cart.id}
            renderItem={({ item }) => <CartItem item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  totalPrice: {
    fontSize: 30,
    color: colors.heavyGreen,
    marginTop: 20,
  },
  list: {
    width: "100%",
  },
  button: {
    // Button styles
    margin: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: colors.mediumGreen,
  },
  buttonText: {
    // Button text styles
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Satisfy",
    color: "black",
  },
});

export default Cart;
