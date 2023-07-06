import React, { createContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignUpScreen from "./components/SignUp";
import Navigation from "./Navigation";
import SignInScreen from "./components/Login";
const CLERK_PUBLISHABLE_KEY =
  "pk_test_YnVzeS11bmljb3JuLTc4LmNsZXJrLmFjY291bnRzLmRldiQ";
export const signContext = createContext();
export default function App() {
  const [signedUp, setSignedUp] = useState(false);
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <signContext.Provider value={[signedUp, setSignedUp]}>
        <SafeAreaView style={styles.container}>
          <SignedIn>
            <View style={{ flex: 1, width: "100%" }}>
              <Navigation />
            </View>
          </SignedIn>
          <SignedOut>
            {!signedUp && <SignUpScreen />}
            {signedUp && <SignInScreen />}
          </SignedOut>
        </SafeAreaView>
      </signContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
