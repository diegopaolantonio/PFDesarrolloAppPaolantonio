import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categorías" navigation={navigation} />
      <Categories navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    paddingBottom: 30,
    backgroundColor: colors.heavyGreen,
  },
});

export default Home;
