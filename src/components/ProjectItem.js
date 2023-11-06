import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { useDispatch } from "react-redux";
import { setProject } from "../redux/slice/authSlice";

const ProjectItem = ({ item, projectsArray, navigation }) => {
  const dispatch = useDispatch();

  const selectProject = () => {
    dispatch(setProject(item));
    navigation.navigate("projectDetail", { item: item });
  };

  return (
    <Pressable
      onPress={() => {
        selectProject();
      }}
    >
      <Text style={styles.categoryTitle}>{item.nombre}</Text> 
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

export default ProjectItem;
