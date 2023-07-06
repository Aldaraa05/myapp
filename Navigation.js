import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Post } from "./components/Post";
import { Comment } from "./components/Comment";
import { Draw } from "./Draw";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  console.log("Navigation.js");
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Draw">
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen
            name="Draw"
            component={Draw}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
