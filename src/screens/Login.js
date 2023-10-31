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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setUser,
  setIdToken,
  setUid,
  setUserData,
} from "../redux/slice/authSlice";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { useGetDbQuery } from "../services/daApi";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, isLoading, error, isError, refetch } = useGetDbQuery();

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const userData = data[response.user.uid];

      dispatch(setUser(response.user.email));
      dispatch(setUid(response.user.uid));
      dispatch(setIdToken(response._tokenResponse.idToken));
      dispatch(setUserData(userData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" />
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
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("register")}>
        <Text>Si no tenes usuario, registrate aqui</Text>
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
