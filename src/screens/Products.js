import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Pressable } from "react-native";
import Search from "../components/Search";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";

const Products = ({ route, navigation }) => {
  const [categoryProd, setCategoryProd] = useState([]);
  const [text, setText] = useState("");
  const { item } = route.params;

  const products = useSelector((state) => state.homeSlice.allProducts);
  const categoryProducts = useSelector(
    (state) => state.homeSlice.productsFilter
  );

  useEffect(() => {
    setCategoryProd(categoryProducts);

    if (text) {
      const titleProduct = products.filter(
        (el) => el.title.toLowerCase() === text.toLowerCase
      );
      setCategoryProd(titleProduct);
    }
  }, [text, item]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item} navigation={navigation} />
      <Search text={text} setText={setText} />
      <FlatList
        data={categoryProd}
        keyExtractor={products.id}
        renderItem={({ item }) => (
          <ProductItem item={item} navigation={navigation} />
        )}
      />
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    paddingBottom: 30,
    backgroundColor: colors.heavyGreen,
  },
  backButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    left: 10,
  },
});

export default Products;
