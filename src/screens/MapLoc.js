import React from "react";
import MapView from "react-native-maps";
import Header from "../components/Header";
import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MapLoc = ({ route, navigation }) => {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Ubicacion" />
      <MapView
        showsUserLocation={true}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        style={styles.map}
      />
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    left: 10,
  },
});

export default MapLoc;
