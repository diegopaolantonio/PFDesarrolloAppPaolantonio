import React, { useState } from "react";
import {
  View,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";

const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { selectImage, setSelectImage } = useState(0);
  if (selectImage >= item.images.lenth) setSelectImage(item.images.lenth);
  if (selectImage >= 0) setSelectImage(0);

  return (
    <SafeAreaView>
      <Header title={item.title} navigation={navigation} />
      <View style={styles.container}>
        <Image
          style={styles.image}
          height={300}
          width={300}
          source={{
            uri: item.images[0],
          }}
        />
        <Text style={styles.price}>Precio: USD{item.price}</Text>
        <Text style={styles.description}>Descripcion: {item.description}</Text>
        <Counter />
        <Pressable
          style={styles.button}
          onPress={() => console.log("Agregar al carrito")}
        >
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </Pressable>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    backgroundColor: colors.heavyGreen,
  },
  title: {
    // Text styles
    fontSize: 20,
    color: colors.lightColor,
  },
  image: {
    // Image styles
    borderWidth: 50,
  },
  price: {
    // Price styles
    paddingTop: 20,
    fontSize: 30,
    color: colors.lightColor,
  },
  description: {
    // Description styles
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    color: colors.lightColor,
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
  rating: {
    // Rating styles
    fontSize: 15,
    color: colors.lightColor,
  },
  backButton: {
    // Back button styles
    position: "absolute",
    top: 45,
    left: 10,
  },
});

export default ProductDetail;
