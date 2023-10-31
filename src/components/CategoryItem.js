import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCategorySelected } from "../redux/slice/homeSlice";
import { colors } from "../theme/colors";

const CategoryItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const selectCategory = () => {
    dispatch(setCategorySelected(item));
    navigation.navigate("products", { item: item });
  };
  return (
    <Pressable
      onPress={() => {
        selectCategory();
      }}
    >
      <Text style={styles.categoryTitle}>{item}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    // Container styles
    marginHorizontal: 20,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,

    // Border styles
    borderColor: colors.lightColor,
    borderWidth: 2,
    borderRadius: 20,

    // Text styles
    fontSize: 22,
    textAlign: "center",
    color: colors.lightColor,
  },
});

export default CategoryItem;
