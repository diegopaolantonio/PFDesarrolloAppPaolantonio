import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { useDispatch } from "react-redux";
import { setClient } from "../redux/slice/authSlice";

const ClientItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const selectClient = () => {
    dispatch(setClient(item));
    navigation.navigate("projects", { item: item });
  };

  return (
    <Pressable onPress={() => selectClient()}>
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

export default ClientItem;
