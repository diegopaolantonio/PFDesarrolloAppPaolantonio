import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import MainNav from "./src/navigation/MainNav";

export default function App() {
  const [fontsLoaded] = useFonts({
    Caveat: require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
    Satisfy: require("./assets/fonts/Satisfy-Regular.ttf"),
  });

  if (fontsLoaded === false) {
    return;
  }

  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  );
}
