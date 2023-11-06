import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { colors } from "../theme/colors";
import { useGetClientsQuery, usePutProjectMutation } from "../services/daApi";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddProject = ({ navigation }) => {
  const uid = useSelector((state) => state.authSlice.uid);
  const client = useSelector((state) => state.authSlice.client);
  const {
    data: clients,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientsQuery();
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [monto, setMonto] = useState("");
  const [startDate, setStartDate] = useState({
    day: "1",
    month: "1",
    year: "1990",
  });
  const [finishDate, setFinishDate] = useState({
    day: "1",
    month: "1",
    year: "1990",
  });
  const [cotizacion, setCotizacion] = useState("");
  const [estado, setEstado] = useState("En espera");
  const [orden, setOrden] = useState("")
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showFinishPicker, setShowFinishPicker] = useState(false);
  const [startDateToShow, setStartDateToShow] = useState(
    `${startDate.day} / ${startDate.month} / ${startDate.year}`
  );
  const [finishDateToShow, setFinishDateToShow] = useState(
    `${finishDate.day} / ${finishDate.month} / ${finishDate.year}`
  );

  const [putProject, result] = usePutProjectMutation();

  let project = {
    nombre,
    id: Date.now() + Math.floor(Math.random() + 1000 + 1),
    horas,
    monto,
    startDate,
    finishDate,
    cotizacion,
    estado,
    orden,
  };

  const toggleShowStartPicker = () => {
    setShowStartPicker(!showStartPicker);
  };

  const selectStartDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate1(selectedDate);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      setStartDate({ day, month, year });
      setStartDateToShow(`${day} / ${month} / ${year}`);
    }
    toggleShowStartPicker();
  };

  const toggleShowFinishPicker = () => {
    setShowFinishPicker(!showFinishPicker);
  };

  const selectFinishDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate2(selectedDate);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      setFinishDate({ day, month, year });
      setFinishDateToShow(`${day} / ${month} / ${year}`);
    }
    toggleShowFinishPicker();
  };

  const createProject = async () => {
    let projectArray = [];
    let projectsInDb = clients[uid][client].projects;

    projectsInDb.forEach((element) => {
      if (element != "") {
        projectArray.push(element);
      }
    });

    projectArray.push(project);

    if (client.nombre === "") {
      Alert.alert("Error de datos", "El nombre no puede estar en blanco", [
        {
          text: "OK",
          onPress: () => console.log("El nombre no puede estar en blanco"),
        },
      ]);
      return;
    }

    await putProject({ uid, client, project: projectArray });
    refetch();
    setNombre("");
    setHoras("");
    setMonto("");
    setStartDate({
      day: "1",
      month: "1",
      year: "1990",
    });
    setFinishDate({
      day: "1",
      month: "1",
      year: "1990",
    });
    setCotizacion("");
    setEstado("En espera");

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Header title={"Agergar Proyecto"} />
        <View style={styles.container}>
          <Text>Nombre</Text>
          <TextInput
            onChangeText={(value) => setNombre(value)}
            value={nombre}
            style={styles.text}
            placeholder="Ingrese nombre del proyecto"
          />
          <Text>N° Cotizacion</Text>
          <TextInput
            onChangeText={(value) => setCotizacion(value)}
            value={cotizacion}
            style={styles.text}
            placeholder="Ingrese numero de cotizacion"
          />
          <Text>N° de orden</Text>
          <TextInput
            onChangeText={(value) => setOrden(value)}
            value={orden}
            style={styles.text}
            placeholder="Ingrese numero de orden"
          />
          <Text>Horas</Text>
          <TextInput
            onChangeText={(value) => setHoras(value)}
            value={horas}
            style={styles.text}
            placeholder="Ingrese horas cotizadas"
          />
          <Text>Monto</Text>
          <TextInput
            onChangeText={(value) => setMonto(value)}
            value={monto}
            style={styles.text}
            placeholder="Ingrese monto cotizado"
          />
          <Text>Estado</Text>
          <TextInput
            onChangeText={(value) => setEstado(value)}
            value={estado}
            style={styles.text}
            placeholder="Ingrese estado del proyecto"
          />

          <Pressable onPress={toggleShowStartPicker}>
            <Text>Fecha de inicio</Text>
            <TextInput
              value={startDateToShow}
              style={styles.text}
              placeholder="Fecha estimada de inicio"
              placeholderTextColor="black"
              editable={false}
            />
          </Pressable>

          {showStartPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date1}
              onChange={selectStartDate}
            />
          )}

          <Pressable onPress={toggleShowFinishPicker}>
            <Text>Fecha de fin</Text>
            <TextInput
              value={finishDateToShow}
              style={styles.text}
              placeholder="Fecha estimada de finalizacion"
              placeholderTextColor="black"
              editable={false}
            />
          </Pressable>

          {showFinishPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date2}
              onChange={selectFinishDate}
            />
          )}

          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={() => createProject()}>
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
      </ScrollView>
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

export default AddProject;
