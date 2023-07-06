import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { User } from "./components/User";
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function Tabs() {
  console.log("Tabs.js");
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
