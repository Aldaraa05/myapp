import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Button, TextInput } from "react-native-paper";
import { signContext } from "../App";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signedUp, setSignedUp] = React.useContext(signContext);
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 35, marginVertical: 10 }}>Нэвтрэх</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.input}
      />

      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <Button onPress={onSignInPress} style={{ marginVertical: 10 }}>
        Sign in
      </Button>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>dont have an account</Text>
        <Button
          onPress={() => {
            setSignedUp(!signedUp);
          }}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 10,
    width: 300,
    borderRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
});
