import React, { useEffect, useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import OptionSelector from "../components/OptionSelector";

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
  const [coin, setCoin] = useState("USD");
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
  const [paymentStatus, setPaymentStatus] = useState("Sin facturar");
  const [orden, setOrden] = useState("");
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
  const [selectedCoinOption, setSelectedCoinOption] = useState(0);
  const [selectedStatusOption, setSelectedStatusOption] = useState(0);
  const [selectedPaymentStatusOption, setSelectedPaymentStatusOption] =
    useState(0);

  const [putProject, result] = usePutProjectMutation();

  const coinOption = ["Sin seleccion", "USD", "$", "E$", "R$"];

  const statusOption = [
    "Sin seleccion",
    "En espera",
    "En proceso",
    "Finalizado",
    "Cancelado",
  ];

  const paymentStatusOption = [
    "Sin seleccion",
    "Sin facturar",
    "Facturado",
    "Cobrado",
  ];

  const SelectedCoinProject = () => setCoin(coinOption[selectedCoinOption]);
  const SelectedStatusProject = () =>
    setEstado(statusOption[selectedStatusOption]);
  const SelectedPaymentProject = () =>
    setPaymentStatus(paymentStatusOption[selectedPaymentStatusOption]);

  let project = {
    nombre,
    id: Date.now() + Math.floor(Math.random() + 1000 + 1),
    horas,
    coin,
    monto,
    startDate,
    finishDate,
    cotizacion,
    estado,
    orden,
    paymentStatus,
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

  useEffect(() => {
    SelectedCoinProject();
    SelectedStatusProject();
    SelectedPaymentProject();
  }, [selectedCoinOption, selectedStatusOption, selectedPaymentStatusOption]);

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
    setCoin("USD");
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
    setPaymentStatus("Sin facturar");

    setSelectedCoinOption(0);
    setSelectedStatusOption(0);
    setSelectedPaymentStatusOption(0);

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Header title={"Agregar Proyecto"} />
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
          <Text>Tipo de moneda</Text>
          <View style={styles.selector}>
            <OptionSelector
              selectOptions={coinOption}
              selectedOption={selectedCoinOption}
              setSelectedOption={setSelectedCoinOption}
            />
          </View>

          <Text>Estado</Text>
          <View style={styles.selector}>
            <OptionSelector
              selectOptions={statusOption}
              selectedOption={selectedStatusOption}
              setSelectedOption={setSelectedStatusOption}
            />
          </View>

          <Pressable onPress={toggleShowStartPicker}>
            <View style={styles.datePicker}>
              <Text>Fecha de inicio</Text>
              <TextInput
                value={startDateToShow}
                style={styles.text}
                placeholder="     Fecha estimada de inicio     "
                placeholderTextColor="black"
                editable={false}
              />
            </View>
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
            <View style={styles.datePicker}>
              <Text>Fecha de fin</Text>
              <TextInput
                value={finishDateToShow}
                style={styles.text}
                placeholder="Fecha estimada de finalizacion"
                placeholderTextColor="black"
                editable={false}
              />
            </View>
          </Pressable>

          {showFinishPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date2}
              onChange={selectFinishDate}
            />
          )}

          <Text>Estado de pago</Text>
          <View style={styles.selector}>
            <OptionSelector
              selectOptions={paymentStatusOption}
              selectedOption={selectedPaymentStatusOption}
              setSelectedOption={setSelectedPaymentStatusOption}
            />
          </View>

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
    alignItems: "center",
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
  selector: {
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  datePicker: {
    alignItems: "center",
    width: "100%",
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

export default AddProject;
