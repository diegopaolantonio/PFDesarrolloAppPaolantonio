import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "../redux/slice/counterSlice";
import { colors } from "../theme/colors";

const Counter = () => {
  const count = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();
  const [inputToAdd, setInputToAdd] = useState(0);

  const confirmAdd = () => {
    dispatch(incrementByAmount(inputToAdd));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerIncrement}>
        <Pressable
          style={styles.buttonAdd}
          onPress={() => dispatch(decrement())}
        >
          <Text>-</Text>
        </Pressable>
        <Text style={styles.buttonAdd}>{count}</Text>
        <Pressable
          style={styles.buttonAdd}
          onPress={() => dispatch(increment())}
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          style={styles.button}
          placeholder="Cantidad"
          value={inputToAdd}
          onChangeText={(text) => setInputToAdd(Number(text))}
        ></TextInput>
        <Pressable style={styles.button} onPress={confirmAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={() => dispatch(reset())}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerIncrement: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonAdd: {
    // Button styles
    marginVertical: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    width: 70,
    alignItems: "center",
    backgroundColor: colors.mediumGreen,
  },
  button: {
    // Button styles
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    alignItems: "center",
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

export default Counter;
