import React from "react";
import Header from "../components/Header";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { colors } from "../theme/colors";
import * as ImagePicker from "expo-image-picker";
import { useGetImageQuery, usePutImageMutation } from "../services/daApi";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ClientDetail = ({ navigation, route }) => {
  const { uid, item, userClient } = route.params;
  const [putImage, result] = usePutImageMutation();
  const { data, isLoading, error, isError, refetch } = useGetImageQuery();
  const diego = `${uid}/${item}`;
  let profileImage = { image: "" };

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png";

  const goToEditClient = () => {
    navigation.navigate("editClient", {
      uid: uid,
      selectedClient: item,
      selectedClientData: userClient,
    });
  };

  const verifyCamaraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const chooseImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      profileImage.image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      await putImage({ uid: diego, profileImage });
      refetch();
    }
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCamaraPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
      });

      if (!result.canceled) {
        profileImage.image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        await putImage({ uid: diego, profileImage });
        refetch();
      }
    } else {
      alert("La app no tiene permiso para acceder a la camara.");
      return;
    }
  };

  const changeProfileImage = () => {
    Alert.alert(
      "Cambiar imagen de cliente",
      "Seleccione de donde va a tomar la foto",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Camara",
          onPress: () => pickImage(),
        },
        {
          text: "Galeria",
          onPress: () => chooseImageFromGallery(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalle de proyecto" />
      {data[uid][item] === null || data[uid][item] === undefined ? (
        <>
          <Image
            style={styles.imagen}
            source={{
              uri: defaultProfileImage,
            }}
          />
        </>
      ) : (
        <>
          <Image
            style={styles.imagen}
            source={{
              uri:
                data[uid][item] != null
                  ? data[uid][item].image
                  : defaultProfileImage,
            }}
          />
        </>
      )}
      <Text style={styles.text}>Id: {userClient[item].id}</Text>
      <Text style={styles.text}>Nombre: {item}</Text>
      <Text style={styles.text}>Rubro: {userClient[item].rubro}</Text>
      <Text style={styles.text}>Ciudad: {userClient[item].ciudad}</Text>
      <Text style={styles.text}>Pais: {userClient[item].pais}</Text>
      <Text style={styles.text}>CUIT: {userClient[item].cuit}</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          changeProfileImage();
        }}
      >
        <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
      </Pressable>

      <Pressable style={styles.addButton} onPress={goToEditClient}>
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
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    marginTop: 20,
    fontFamily: "Satisfy",
    fontSize: 20,
    fontWeight: "600",
  },
  button: {
    // Button styles
    margin: 10,
    padding: 5,
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

export default ClientDetail;
