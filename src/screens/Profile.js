import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { colors } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slice/authSlice";
import * as ImagePicker from "expo-image-picker";
import { useGetImageQuery, usePutImageMutation } from "../services/daApi";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [putImage, result] = usePutImageMutation();
  const [location, setLocation] = useState(null);
  const {
    data: image,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetImageQuery();

  const uid = useSelector((state) => state.authSlice.uid);
  const userData = useSelector((state) => state.authSlice.userData);

  const defaultProfileImage =
    "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png";

  const editUserData = () => {
    navigation.navigate("updateUserData", { userData: userData });
  };

  const userLogout = () => {
    dispatch(clearUser());
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
      await putImage({
        image: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
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
        await putImage({
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
        });
        refetch();
      }
    } else {
      alert("La app no tiene permiso para acceder a la camara.");
      return;
    }
  };

  const getCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permiso fue denegado");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    navigation.navigate("mapLoc", { location });
  };

  const changeProfileImage = () => {
    Alert.alert(
      "Cambiar foto de perfil",
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
    <SafeAreaView>
      <Header title="Perfil" />
      <View style={styles.container}>
        <Image
          style={styles.imagen}
          source={{
            uri: image ? image.image : defaultProfileImage,
          }}
        />
        {userData === null ? (
          <>
            <Text style={styles.text}>Nombre:</Text>
            <Text style={styles.text}>Pais:</Text>
            <Text style={styles.text}>Edad:</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>Nombre: {userData.nombre}</Text>
            <Text style={styles.text}>Pais: {userData.pais}</Text>
            <Text style={styles.text}>Edad: {userData.edad}</Text>
          </>
        )}
        <Pressable
          style={styles.button}
          onPress={() => {
            changeProfileImage();
          }}
        >
          <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            getCoords();
          }}
        >
          <Text style={styles.buttonText}>Posicion geografica</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            editUserData();
          }}
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => userLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
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
    color: colors.heavyGreen,
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
});

export default Profile;
