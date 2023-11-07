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
import { usePutUserMutation } from "../services/daApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slice/authSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

const UpdateUserData = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = route.params;
  const [putDb, result] = usePutUserMutation();
  const [nombre, setNombre] = useState(userData.nombre);
  const [profesion, setProfesion] = useState(userData.profesion);
  const [ciudad, setCiudad] = useState(userData.ciudad);
  const [pais, setPais] = useState(userData.pais);
  const [date, setDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(userData.birthDate);
  const [showPicker, setShowPicker] = useState(false);
  const [dateToShow, setDateToShow] = useState(
    `${birthDate.day} / ${birthDate.month} / ${birthDate.year}`
  );

  let updateUser = {
    nombre,
    profesion,
    ciudad,
    pais,
    birthDate,
    id: userData.id,
  };

  const updateData = async () => {
    const resultado = await putDb(updateUser);
    dispatch(setUserData(updateUser));
    navigation.goBack();
  };

  const toggleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const selectDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      setBirthDate({ day, month, year });
      setDateToShow(`${day} / ${month} / ${year}`);
    }
    toggleShowPicker();
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
        <Pressable onPress={toggleShowPicker}>
          <Text>Fecha de nacimiento</Text>
          <TextInput
            value={dateToShow}
            style={styles.text}
            placeholder="Ingrese su fecha de nacimiento"
            placeholderTextColor="black"
            editable={false}
          />
        </Pressable>

        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={selectDate}
          />
        )}

        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={updateData}>
            <Text style={styles.buttonText}> Guardar </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
        </View>
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
    // fontFamily: "Caveat",

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

export default UpdateUserData;
