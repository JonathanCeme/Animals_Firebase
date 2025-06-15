// formulario para registrar un animal en la base de datos de Firebase
// esta pantalla se muestra al hacer click en el boton de añadir animal en la pantalla homepage

import { Link } from "expo-router"; // Importa Link de expo-router
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"; // importa las funciones de firestore
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import app from "../credenciales/conf_firebase"; // importa la configuracion de firebase
export const db = getFirestore(app); // inicializa la base de datos

export default function AnimalsPage() {
  const [animal, setAnimal] = useState({
    tipo: "",
    raza: "",
    sexo: "",
    peso_actual_kg: "",
    estado_salud: "",
    ubicacion: "",
    fecha_ingreso: "",
    destinado_para: "",
  });

  const generarIdSecuencial = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "animales"));
      const totalAnimales = querySnapshot.size; // Número total de documentos en la colección
      const nuevoId = `A${(totalAnimales + 1).toString().padStart(3, "0",)}`; // Genera el ID secuencial
      return nuevoId;
    } catch (error) {
      console.error("Error al generar el ID secuencial:", error);
      throw new Error("No se pudo generar el ID del animal.");
    }
  };

  const guardarAnimal = async () => {
    try {
      const idAnimal = await generarIdSecuencial(); // Genera el ID secuencial
      await setDoc(doc(db, "animales", idAnimal), {
        ...animal,
        peso_actual_kg: parseFloat(animal.peso_actual_kg), // Convertir a número
      });
      Alert.alert("Éxito", "Animal guardado correctamente");
      setAnimal({
        tipo: "",
        raza: "",
        sexo: "",
        peso_actual_kg: "",
        estado_salud: "",
        ubicacion: "",
        fecha_ingreso: "",
        destinado_para: "",
      }); // Limpia el formulario
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el animal");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Animal</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={animal.tipo}
        onChangeText={(text) => setAnimal({ ...animal, tipo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Raza"
        value={animal.raza}
        onChangeText={(text) => setAnimal({ ...animal, raza: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={animal.sexo}
        onChangeText={(text) => setAnimal({ ...animal, sexo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={animal.peso_actual_kg}
        onChangeText={(text) => setAnimal({ ...animal, peso_actual_kg: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado de Salud"
        value={animal.estado_salud}
        onChangeText={(text) => setAnimal({ ...animal, estado_salud: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={animal.ubicacion}
        onChangeText={(text) => setAnimal({ ...animal, ubicacion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Ingreso (YYYY-MM-DD)"
        value={animal.fecha_ingreso}
        onChangeText={(text) => setAnimal({ ...animal, fecha_ingreso: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Destinado Para"
        value={animal.destinado_para}
        onChangeText={(text) => setAnimal({ ...animal, destinado_para: text })}
      />
      <Button title="Guardar Animal" onPress={guardarAnimal} />
      {/* Enlace para redirigir a la lista de animales */}
      <Link href="/pages/ReadAnimals" style={styles.link}>
        Ver listado
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  link: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});