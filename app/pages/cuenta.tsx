import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import app from "../credenciales/conf_firebase";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const RegistrarseScreen = () => {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const registrarUsuario = async () => {
        try {
      const auth = getAuth(app);
      const crearcuenta = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      console.log("Usuario registrado:", crearcuenta.user.email);
    } catch (error: any) {
      Alert.alert(
        "Registro exitoso",
        "",
        [
          {
            text: "Ir a login",
            onPress: () => router.replace("/pages/login"),
          },
        ]
      );
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/616/616440.png",
              }}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Crear Cuenta</Text>
          </View>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={(text)=>setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={(text)=>setPassword(text)}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
              <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 30,
    borderRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#3b7d4f",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default RegistrarseScreen;
