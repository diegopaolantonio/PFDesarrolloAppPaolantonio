import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clients from "../screens/Clients";
import Projects from "../screens/Projects";
import ClientDetail from "../screens/ClientDetail";
import ProjectDetail from "../screens/ProjectDetail";
import AddClient from "../screens/AddClient";
import AddProject from "../screens/AddProject";
import EditClient from "../screens/EditClient";
import EditProject from "../screens/EditProject";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="clients"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Clients} name="clients" />
      <Stack.Screen component={Projects} name="projects" />
      <Stack.Screen component={ClientDetail} name="clientDetail" />
      <Stack.Screen component={ProjectDetail} name="projectDetail" />
      <Stack.Screen component={AddClient} name="addClient" />
      <Stack.Screen component={AddProject} name="addProject" />
      <Stack.Screen component={EditClient} name="editClient" />
      <Stack.Screen component={EditProject} name="editProject" />
    </Stack.Navigator>
  );
};

export default RootNavigation;
