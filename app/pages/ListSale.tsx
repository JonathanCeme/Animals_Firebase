// listado de los animales en la base de datos en donde puedes vender un animal
// esta pantalla se muestra al hacer click en el boton de añadir venta en la pantalla homepage

import { useFocusEffect } from "@react-navigation/native"; // Importa useFocusEffect
import { useRouter } from "expo-router"; // Importa el router de Expo Router
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import app from "../firebase/conf_firebase";

const db = getFirestore(app);

export default function ReadAnimals() {
  const [animales, setAnimales] = useState<{ id: string; [key: string]: any }[]>([]);
  const router = useRouter(); // Inicializa el router

  // Función para obtener los animales desde Firestore
  const fetchAnimales = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "animales"));
      const animalesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnimales(animalesData);
    } catch (error) {
      console.error("Error al obtener los animales:", error);
    }
  };

  // Ejecuta fetchAnimales cada vez que la página es enfocada
  useFocusEffect(
    React.useCallback(() => {
      fetchAnimales();
    }, [])
  );

 

  // Función para manejar la acción de vender
  const venderAnimal = (id: string) => {
    Alert.alert(
      "Confirmar venta",
      "¿Estás seguro de que deseas vender este animal?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Vender",
          onPress: () => {
            // Redirige a la página de ventas con el ID del animal
            router.push({ pathname: "/pages/salesAnimals", params: { id } });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Animales</Text>
      {animales.length > 0 ? (
        animales.map((animal) => (
          <View key={animal.id} style={styles.card}>
            <Text style={styles.cardTitle}>ID: {animal.id}</Text>
            <Text>Tipo: {animal.tipo}</Text>
            <Text>Raza: {animal.raza}</Text>
            <Text>Sexo: {animal.sexo}</Text>
            <Text>Peso Actual (kg): {animal.peso_actual_kg}</Text>
            <Text>Estado de Salud: {animal.estado_salud}</Text>
            <Text>Ubicación: {animal.ubicacion}</Text>
            <Text>Fecha de Ingreso: {animal.fecha_ingreso}</Text>
            <Text>Destinado Para: {animal.destinado_para}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Vender"
                color="green"
                onPress={() => venderAnimal(animal.id)}
              />
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No hay animales registrados.</Text>
      )}
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
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});