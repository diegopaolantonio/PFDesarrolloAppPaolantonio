import React from "react";
import { useGetClientsQuery } from "../services/daApi";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ClientItem from "./ClientItem";
import { colors } from "../theme/colors";
import { useSelector } from "react-redux";

const ClientsList = ({ navigation }) => {
  const uid = useSelector((state) => state.authSlice.uid);
  const clientArray = [];

  const {
    data: clientList,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientsQuery();

  if (clientList != undefined) {
    for (const [key, value] of Object.entries(clientList[uid])) {
      clientArray.push(key);
    }
  }
  console.log(clientArray);

  return (
    <View>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={clientArray}
            keyExtractor={(key) => key}
            renderItem={({ item }) => (
              <ClientItem item={item} navigation={navigation} />
            )}
          />
        </View>
      )}
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
