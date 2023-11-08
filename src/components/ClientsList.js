import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ClientItem from "./ClientItem";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";

const ClientsList = ({ clientListData, navigation }) => {
  const uid = useSelector((state) => state.authSlice.uid);
  const clientArray = [];

  if (clientListData != undefined && uid != undefined && uid != null) {
    if(clientListData[uid] != undefined) {
      for (const [key, value] of Object.entries(clientListData[uid])) {
        clientArray.push(key);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={clientArray}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <ClientItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles
    backgroundColor: colors.heavyGreen,
    paddingTop: 20,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ClientsList;
