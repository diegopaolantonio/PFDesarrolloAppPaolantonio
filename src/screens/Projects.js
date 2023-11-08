import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Pressable } from "react-native";
import Search from "../components/Search";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import ProjectsList from "../components/ProjectsList";
import OptionSelector from "../components/OptionSelector";

const Projects = ({ route, navigation }) => {
  const { item } = route.params;
  const [selectedOption, setSelectedOption] = useState(0);
  const uid = useSelector((state) => state.authSlice.uid);
  const userClients = useSelector((state) => state.authSlice.userClients);

  const clientOptions = [
    "Sin seleccion",
    "Mostrar datos del cliente",
    "Editar/Eliminar cliente",
    "Agregar Proyecto",
  ];

  const goToAddProject = () => {
    navigation.navigate("addProject", { uid: uid, userClients: userClients });
  };

  const SelectedClientOption = () => {
    if (selectedOption === 1) {
      navigation.navigate("clientDetail", {
        uid: uid,
        item: item,
        userClient: userClients[uid],
      });
    }
    if (selectedOption === 2) {
      navigation.navigate("editClient", {
        uid: uid,
        selectedClient: item,
        selectedClientData: userClients[uid],
      });
    }
    if (selectedOption === 3) {
      goToAddProject();
    }
  };

  useEffect(() => {
    SelectedClientOption();
  }, [selectedOption]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item} navigation={navigation} />

      <OptionSelector
        // style={styles.selector}
        selectOptions={clientOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <ProjectsList navigation={navigation} />

      <Pressable style={styles.addButton} onPress={() => goToAddProject()}>
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
  // selector: {
  //   width: "80%",
  // },
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
