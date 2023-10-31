import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";

const Search = ({ text, setText }) => {
  const clearText = () => {
    setText("");
  };

  return (
    <View style={estilos.container}>
      <TextInput
        onChangeText={(value) => setText(value)}
        value={text}
        style={estilos.text}
        placeholder="Busca un producto por titulo"
      />
      <Pressable onPress={() => clearText()}>
        <AntDesign name="close" size={30} color="black" />
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    // Container styles
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: colors.mediumGreen,
  },
  text: {
    // Container styles
    width: "78%",
    padding: 10,
    marginRight: 15,
    fontFamily: "Caveat",

    // Border styles
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.heavyGreen,

    // Text styles
    color: colors.heavyGreen,
    fontSize: 20,
  },
});

export default Search;
