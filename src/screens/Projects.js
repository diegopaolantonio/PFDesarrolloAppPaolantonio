import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Pressable } from "react-native";
import Search from "../components/Search";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import ProjectsList from "../components/ProjectsList";

const Projects = ({ route, navigation }) => {
  const { item } = route.params;
  const uid = useSelector((state) => state.authSlice.uid);
  const userClients = useSelector((state) => state.authSlice.userClients);

  let clientProjects = userClients[uid][item].projects;

  const goToAddProject = () => {
    navigation.navigate("addProject", { uid: uid, userClients: userClients });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item} navigation={navigation} />
      <ProjectsList navigation={navigation} />
      <Pressable style={styles.addButton} onPress={goToAddProject}>
        <AntDesign name="addfolder" size={24} color="black" />
      </Pressable>
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
  addButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    right: 10,
  },
  backButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    left: 10,
  },
});

export default Projects;
