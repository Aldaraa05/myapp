import { createDrawerNavigator } from "@react-navigation/drawer";
import SignUpScreen from "./components/SignUp";
import SignInScreen from "./components/Login";
import { User } from "./components/User";
import { Settings } from "./components/Settings";
import { Home } from "./components/Home";
import { Tabs } from "./Tab";
const Drawer = createDrawerNavigator();

export function Draw() {
  console.log("Draw.js");
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Tab"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="User" component={User} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
