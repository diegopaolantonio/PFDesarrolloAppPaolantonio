import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../theme/colors";
import Header from "../components/Header";
import { usePutDbMutation } from "../services/daApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slice/authSlice";

const UpdateUserData = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = route.params;
  const [putDb, result] = usePutDbMutation();
  const [nombre, setNombre] = useState(userData.nombre);
  const [profesion, setProfesion] = useState(userData.profesion);
  const [ciudad, setCiudad] = useState(userData.ciudad);
  const [pais, setPais] = useState(userData.pais);
  const [edad, setEdad] = useState(userData.edad);

  let updateUser = {
    nombre,
    profesion,
    ciudad,
    pais,
    edad,
    id: userData.id,
  };

  const updateData = async () => {
    const resultado = await putDb(updateUser);
    dispatch(setUserData(updateUser));
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Header title="Editar Perfil" navigation={navigation} />
      <View style={styles.container}>
        <Text>Nombre</Text>
        <TextInput
          onChangeText={(value) => setNombre(value)}
          value={nombre}
          style={styles.text}
          placeholder="Ingrese su nombre completo"
        />
        <Text>Profesion</Text>
        <TextInput
          onChangeText={(value) => setProfesion(value)}
          value={profesion}
          style={styles.text}
          placeholder="Ingrese su profesion"
        />
        <Text>Ciudad</Text>
        <TextInput
          onChangeText={(value) => setCiudad(value)}
          value={ciudad}
          style={styles.text}
          placeholder="Ingrese su cuidad"
        />
        <Text>Pais</Text>
        <TextInput
          onChangeText={(value) => setPais(value)}
          value={pais}
          style={styles.text}
          placeholder="Ingrese su pais"
        />
        <Text>Edad</Text>
        <TextInput
          onChangeText={(value) => setEdad(value)}
          value={edad}
          style={styles.text}
          placeholder="Ingrese su edad"
        />
        <Pressable style={styles.button} onPress={updateData}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </Pressable>
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
    // fontFamily: "Caveat",

    // Border styles
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.heavyGreen,

    // Text styles
    textAlign: "center",
    fontSize: 20,
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

export default UpdateUserData;
