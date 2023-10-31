import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import MapLoc from "../screens/MapLoc";
import UpdateUserData from "../screens/UpdateUserData";

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Profile} name="profile" />
      <Stack.Screen component={MapLoc} name="mapLoc" />
      <Stack.Screen component={UpdateUserData} name="updateUserData" />
    </Stack.Navigator>
  );
};

export default ProfileNav;
