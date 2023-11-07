import React from "react";
import Header from "../components/Header";
import ClientsList from "../components/ClientsList";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useGetClientsQuery } from "../services/daApi";
import { setUserClients } from "../redux/slice/authSlice";

const Clients = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    data: userClients,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientsQuery();

  const uid = useSelector((state) => state.authSlice.uid);
  let clientsArray = [];

  if (userClients != undefined) {
    dispatch(setUserClients(userClients));
    for (const [key, value] of Object.entries(userClients[uid])) {
      clientsArray.push(key);
    }
  }

  const goToAddClient = () => {
    navigation.navigate("addClient", { uid: uid, clientsArray: clientsArray });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Clientes" navigation={navigation} />
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : (
        <>
          <ClientsList navigation={navigation} />
        </>
      )}
      <Pressable style={styles.addButton} onPress={() => goToAddClient()}>
        <AntDesign name="addfolder" size={24} color="black" />
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
  addButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    right: 10,
  },
});

export default Clients;
