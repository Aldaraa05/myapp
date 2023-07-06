import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Card } from "react-native-paper";

export function Home({ navigation }) {
  const [data, setData] = useState([]);

  console.log("Home.js");
  useEffect(() => {
    fetch("https://dev.to/api/articles?username=ben")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <ScrollView>
      {data.map((e) => {
        return (
          <Card
            style={{ marginVertical: 20 }}
            onPress={() => {
              navigation.navigate("Post", {
                id: e.id,
              });
            }}
          >
            <Card.Title title="Card Title" subtitle={e.title} />
            <Card.Cover
              source={{ uri: e.cover_image }}
              style={{ marginVertical: 20 }}
            />
            <Card.Content
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Card.Cover
                source={{ uri: e.user.profile_image_90 }}
                style={{ width: 50, height: 50, marginRight: 20 }}
              ></Card.Cover>
              <Text variant="bodyMedium"> {e.user.name}</Text>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
