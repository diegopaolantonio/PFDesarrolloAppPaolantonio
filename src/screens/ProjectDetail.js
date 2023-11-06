import React from "react";
import Header from "../components/Header";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ProjectDetail = ({ navigation, route }) => {
  const { item } = route.params;

  const goToEditProject = () => {
    navigation.navigate("editProject", { item: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalle de proyecto" />
      <Text style={styles.text}>Id: {item.id}</Text>
      <Text style={styles.text}>Nombre: {item.nombre}</Text>
      <Text style={styles.text}>Cotizacion N°: {item.cotizacion}</Text>
      <Text style={styles.text}>N° de orden: {item.orden}</Text>
      <Text style={styles.text}>Monto: {item.monto}</Text>
      <Text style={styles.text}>Horas: {item.horas}</Text>
      <Text style={styles.text}>
        Fecha de inicio: {item.finishDate.day} / {item.finishDate.month} /{" "}
        {item.finishDate.year}
      </Text>
      <Text style={styles.text}>
        Fecha de finalizacion: {item.startDate.day} / {item.startDate.month} /{" "}
        {item.startDate.year}
      </Text>
      <Text style={styles.text}>Extado: {item.estado}</Text>

      <Pressable style={styles.addButton} onPress={goToEditProject}>
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
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: colors.mediumGreen,
  },
  text: {
    marginTop: 20,
    fontFamily: "Satisfy",
    fontSize: 20,
    fontWeight: "600",
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

export default ProjectDetail;
