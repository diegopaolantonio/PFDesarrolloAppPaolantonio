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
import { useGetClientsQuery, usePutClientMutation } from "../services/daApi";

const EditClient = ({ navigation, route }) => {
    const { uid, clientsArray } = route.params;
    const { data, isLoading, isError, error, refetch } = useGetClientsQuery();
    const [client, setClient] = useState("");
    const [rubro, setRubro] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [cuit, setCuit] = useState("");
    const [location2, setLocation2] = useState(null);
    const [putClient, result] = usePutClientMutation();
    const projects = [""];
  
    let clientData = {
      id: Date.now() + Math.floor(Math.random() + 1000 + 1),
      rubro,
      ciudad,
      pais,
      cuit,
      projects,
    };
  
    const createClient = async () => {
      const clientExists = clientsArray.filter((element) => element === client);
  
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
      console.log(uid);
      console.log(client);
      console.log(clientData);
      await putClient({ uid, client, clientData });
      refetch();
      setClient("");
      setRubro("");
      setCiudad("");
      setPais("");
      setCuit("");
      navigation.goBack();
    };
  
    return (
      <SafeAreaView>
        <Header title={"Agergar Cliente"} />
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
            <Pressable style={styles.button} onPress={() => createClient()}>
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
        </View>
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
  });

export default EditClient;
