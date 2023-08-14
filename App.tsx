import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import Theme from "./src/themes";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={Theme}>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={"transparent"}
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
