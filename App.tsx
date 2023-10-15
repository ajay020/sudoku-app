import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigation from "./navigators/AppNavigation";
import HomeNavigation from "./navigators/HomeNavigation";
import { ThemeProvider } from "./themes/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

// import { AntDesign } from '@expo/vector-icons';
/* <AntDesign name="barschart" size={24} color="black" /> */
//   <Feather name="sun" size={24} color="black" />
