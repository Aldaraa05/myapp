import * as React from "react";
import { useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import { signContext } from "../App";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp({ signUp });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  // start the sign up process.
  const [signedUp, setSignedUp] = React.useContext(signContext);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!pendingVerification && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 35, marginVertical: 10 }}>Бүртгүүлэх</Text>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
              style={styles.input}
            />

            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
            />
            <Button onPress={onSignUpPress} style={{ marginVertical: 10 }}>
              SignUp
            </Button>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>already signed up</Text>
              <Button
                onPress={() => {
                  setSignedUp(!signedUp);
                }}
              >
                Sign in
              </Button>
            </View>
          </View>
        )}
        {pendingVerification && (
          <View>
            <View>
              <TextInput
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity onPress={onPressVerify}>
              <Text>Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PaperProvider>
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
