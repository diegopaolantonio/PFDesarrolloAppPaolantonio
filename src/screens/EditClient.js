import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { colors } from "../theme/colors";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
  usePutClientMutation,
} from "../services/daApi";
import { AntDesign } from "@expo/vector-icons";

const EditClient = ({ navigation, route }) => {
  const { uid, selectedClient, selectedClientData } = route.params;
  const { data, isLoading, isError, error, refetch } = useGetClientsQuery();
  const [client, setClient] = useState(selectedClient);
  const [rubro, setRubro] = useState(selectedClientData[selectedClient].rubro);
  const [ciudad, setCiudad] = useState(
    selectedClientData[selectedClient].ciudad
  );
  const [pais, setPais] = useState(selectedClientData[selectedClient].pais);
  const [cuit, setCuit] = useState(selectedClientData[selectedClient].cuit);
  const [putClient, result] = usePutClientMutation();
  const [deleteClient, resultDelete] = useDeleteClientMutation();
  let clientsArray = [];
  let clientData = {
    id: selectedClientData[selectedClient].id,
    rubro,
    ciudad,
    pais,
    cuit,
    projects: selectedClientData[selectedClient].projects,
  };

  for (const [key, value] of Object.entries(selectedClientData)) {
    if (value.id != selectedClientData[selectedClient].id) {
      clientsArray.push(key);
    }
  }

  const updateClient = async () => {
    const clientExists = clientsArray.filter(
      (element) => element === selectedClient
    );

    if (clientExists.length > 0) {
      Alert.alert("Error de datos", "El cliente ya existe", [
        { text: "OK", onPress: () => console.log("El cliente ya existe") },
      ]);
      return;
    }

    if (client === "") {
      Alert.alert("Error de datos", "El nombre no puede estar en blanco", [
        {
          text: "OK",
          onPress: () => console.log("El nombre no puede estar en blanco"),
        },
      ]);
      return;
    }

    await deleteClient({ uid, client: selectedClient });
    await putClient({ uid, client, clientData });
    refetch();
    setClient("");
    setRubro("");
    setCiudad("");
    setPais("");
    setCuit("");
    navigation.navigate("clients");
  };

  const delClient = async () => {
    await deleteClient({ uid, client: selectedClient });
    refetch();
    navigation.navigate("clients");
  };

  return (
    <SafeAreaView>
      <Header title={"Editar Cliente"} />
      <View style={styles.container}>
        <Text>Nombre</Text>
        <TextInput
          onChangeText={(value) => setClient(value)}
          value={client}
          style={styles.text}
          placeholder="Ingrese nombre del cliente"
        />
        <Text>Rubro</Text>
        <TextInput
          onChangeText={(value) => setRubro(value)}
          value={rubro}
          style={styles.text}
          placeholder="Ingrese rubro"
        />
        <Text>Ciudad</Text>
        <TextInput
          onChangeText={(value) => setCiudad(value)}
          value={ciudad}
          style={styles.text}
          placeholder="Ingrese cuidad"
        />
        <Text>Pais</Text>
        <TextInput
          onChangeText={(value) => setPais(value)}
          value={pais}
          style={styles.text}
          placeholder="Ingrese pais"
        />
        <Text>CUIT</Text>
        <TextInput
          onChangeText={(value) => setCuit(value)}
          value={cuit}
          style={styles.text}
          placeholder="Ingrese CUIT"
        />

        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => updateClient()}>
            <Text style={styles.buttonText}> Guardar </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => {
              refetch();
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
        </View>
        <Pressable style={styles.button} onPress={() => delClient()}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    // Container styles
    width: "78%",
    padding: 10,
    margin: 10,

    // Border styles
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.heavyGreen,

    // Text styles
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    // Button styles
    margin: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: colors.mediumGreen,
  },
  buttonText: {
    // Button text styles
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Satisfy",
    color: "black",
  },
  backButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    left: 10,
  },
});

export default EditClient;
