import React from "react";
import { useGetClientsQuery } from "../services/daApi";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ProjectItem from "./ProjectItem";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";

const ProjectsList = ({ navigation }) => {
  const uid = useSelector((state) => state.authSlice.uid);
  const client = useSelector((state) => state.authSlice.client);
  let projectsArray = [];
  let projectsNameArray = [];
  let showProjectsArray = false;

  const {
    data: clientList,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientsQuery();

  if (clientList != undefined) {
    if (
      clientList[uid][client].projects.length != 0 &&
      clientList[uid][client].projects[0] != ""
    ) {
      projectsArray = clientList[uid][client].projects;
      projectsArray.forEach((element) => {
        projectsNameArray.push(element.nombre);
      });
      showProjectsArray = true;
    }
  } else {
    showProjectsArray = false;
  }

  return (
    <View>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : (
        <View style={styles.container}>
          {showProjectsArray ? (
            <>
              <FlatList
                data={projectsArray}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ProjectItem
                    item={item}
                    projectsArray={projectsArray}
                    navigation={navigation}
                  />
                )}
              />
            </>
          ) : (
            <></>
          )}
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

export default ProjectsList;
