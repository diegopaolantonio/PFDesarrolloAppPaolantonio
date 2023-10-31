import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { colors } from "../theme/colors";
import { firebaseAuth } from "../firebase/firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { usePutDbMutation } from "../services/daApi";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [putDb, result] = usePutDbMutation();

  const handleRegister = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      let user = {
        id: response.user.uid,
        nombre: "",
        edad: 0,
        profesion: "",
        ciudad: "",
        pais: "",
      };

      const resultado = await putDb(user);

      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Registrar mi perfil" />
      <TextInput
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.text}
        placeholder="Ingrese su email"
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        value={password}
        style={styles.text}
        placeholder="Ingrese su Contraseña"
      />
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("login")}>
        <Text>Si ya tienes usuario, logueate aqui</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    // Container styles
    width: "78%",
    margin: 15,
    padding: 10,
    // fontFamily: "Caveat",

    // Border styles
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.heavyGreen,

    // Text styles
    // color: colors.heavyGreen,
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

export default Login;
