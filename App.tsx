import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { ActivityIndicator } from "react-native";
import Theme from "./src/themes";
import { Players } from "@screens/Players";
import { Loading } from "@components/Loading";

export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={Theme}>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={"transparent"}
      />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  );
}
