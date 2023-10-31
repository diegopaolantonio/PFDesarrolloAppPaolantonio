import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    paddingTop: 40,
    height: 85,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lightGreen,
  },
  headerTitle: {
    // Text styles
    fontFamily: "Satisfy",
    fontSize: 25,
    fontWeight: "600",
    color: colors.heavyGreen,
  },
});

export default Header;
