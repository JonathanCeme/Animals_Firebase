// esta vista muestra la lista de ventas
// se puede accedesde desde salesAnimals al hacer click en el lick de ver listado de ventas
// o desde la pagina homepage al hacer click en ver ventas

import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import app from "../credenciales/conf_firebase";

const db = getFirestore(app);

export default function ReadSales() {
  const [ventas, setVentas] = useState<{ id: string; [key: string]: any }[]>([]);

  // Función para obtener las ventas desde Firestore
  const fetchVentas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ventas"));
      const ventasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVentas(ventasData);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  // Ejecuta fetchVentas cada vez que la página es enfocada
  useFocusEffect(
    React.useCallback(() => {
      fetchVentas();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Ventas</Text>
      {ventas.length > 0 ? (
        ventas.map((venta) => (
          <View key={venta.id} style={styles.card}>
            <Text style={styles.cardTitle}>ID Venta: {venta.id}</Text>
            <Text>ID Animal: {venta.id_animal}</Text>
            <Text>Fecha de Venta: {venta.fecha_venta}</Text>
            <Text>Comprador: {venta.comprador}</Text>
            <Text>Precio de Venta: ${venta.precio_venta}</Text>
            <Text>Forma de Pago: {venta.forma_pago}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No hay ventas registradas.</Text>
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
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});