import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { colors } from "../theme/colors";
import { useGetClientsQuery } from "../services/daApi";
import { useSelector } from "react-redux";

const Cart = () => {
  let paymentCart = [];
  const [totalCart, setTotalCart] = useState();

  const uid = useSelector((state) => state.authSlice.uid);
  const {
    data: clientes,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetClientsQuery();

  useEffect(() => {
    refetch();
    for (const [key, value] of Object.entries(clientes[uid])) {
      if (
        value.projects != null &&
        value.projects != undefined &&
        value.projects != ""
      )
        value.projects.forEach((element) => {
          const temp = {
            client: key,
            project: element.nombre,
            id: element.id,
            paymentStatus: element.paymentStatus,
            moneda: element.coin,
            monto: element.monto,
          };
          paymentCart.push(temp);
        });
    }

    setTotalCart(paymentCart);
  }, []);

  return (
    <SafeAreaView>
      <Header title="Facturacion a cobrar" />
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={styles.containerDetalle}>
            <Text style={styles.textItem}>Cliente</Text>
            <Text style={styles.textItem}>Proyecto</Text>
            <Text style={styles.textItem}>Pago</Text>
            <Text style={styles.textItemQuantity}>Moneda</Text>
            <Text style={styles.textItemQuantity}>Monto</Text>
          </View>
          {isLoading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size="small" color="blue" />
            </View>
          ) : (
            <>
              <FlatList
                data={totalCart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItem item={item} />}
              />
            </>
          )}
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
  list: {
    width: "100%",
  },
  containerDetalle: {
    margin: 5,
    flexDirection: "row",
    // Border styles
    borderColor: colors.heavyGreen,
    borderRadius: 10,
    borderWidth: 2,
  },
  textItem: {
    margin: 5,
    fontWeight: "600",
    width: "20%",
  },
  textItemQuantity: {
    margin: 5,
    width: "15%",
  },
});

export default Cart;
