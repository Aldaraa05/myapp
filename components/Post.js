import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

export function Post({ navigation, route }) {
  const { width } = useWindowDimensions();
  const { id } = route.params;
  const [article, setArticle] = useState();
  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`).then((res) =>
      res.json().then((data) => setArticle(data))
    );
  }, []);
  console.log(article);
  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else;
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.headline}>{article.title}</Text>
        <Image
          source={{ uri: article.cover_image }}
          style={{ width: "100%", height: 200 }}
        ></Image>
        <RenderHtml source={{ html: article.body_html }} contentWidth={width} />
        <Button
          icon="comment"
          mode="contained"
          textColor="white"
          style={{
            paddingLeft: 10,
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          {article.comments_count}
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
