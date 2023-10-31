import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNav from "./TabNav";
import { useSelector } from "react-redux";

const MainNav = () => {
  const user = useSelector((state) => state.authSlice.user);

  return (
    <NavigationContainer>
      {user ? <TabNav /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNav;
