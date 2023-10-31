import React from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "../services/daApi";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import CategoryItem from "./CategoryItem";
import { colors } from "../theme/colors";
import { useDispatch } from "react-redux";
import { setAllCategories, setAllProducts } from "../redux/slice/homeSlice";

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    data: categories,
    isLoadingCategories,
    isErrorCategories,
    errorCategories,
  } = useGetCategoriesQuery();

  const {
    data: products,
    isLoadingProducts,
    isErrorProducts,
    errorProducts,
  } = useGetProductsQuery();

  dispatch(setAllCategories(categories));
  dispatch(setAllProducts(products));

  return (
    <View>
      {isLoadingCategories || isLoadingProducts ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={categories}
            keyExtractor={(key) => key}
            renderItem={({ item }) => (
              <CategoryItem item={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    backgroundColor: colors.heavyGreen,
    paddingTop: 20,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Categories;
