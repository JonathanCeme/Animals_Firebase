// se le asigna una venta al animal seleccionado 

import { Link, useLocalSearchParams } from "expo-router"; // Importa Link para navegación
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import app from "../credenciales/conf_firebase";

export const db = getFirestore(app);

export default function SalesScreen() {
  const { id } = useLocalSearchParams();
  const [animal, setAnimal] = useState<any>(null);
  const [venta, setVenta] = useState({
    id_animal: id || "",
    fecha_venta: "",
    comprador: "",
    precio_venta: "",
    forma_pago: "",
  });

  useEffect(() => {
    if (id) {
      if (typeof id === "string") {
        fetchAnimal(id);
      } else {
        console.error("El ID no es una cadena válida.");
      }
    }
  }, [id]);

  const fetchAnimal = async (animalId: string) => {
    try {
      const docRef = doc(db, "animales", animalId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAnimal({ id: docSnap.id, ...docSnap.data() });
      } else {
        Alert.alert("Error", "Animal no encontrado.");
      }
    } catch (error) {
      console.error("Error al cargar el animal:", error);
    }
  };

  const generarIdVentaSecuencial = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ventas"));
      const totalVentas = querySnapshot.size;
      const nuevoId = `V${(totalVentas + 1).toString().padStart(3, "0")}`;
      return nuevoId;
    } catch (error) {
      console.error("Error al generar el ID secuencial de la venta:", error);
      throw new Error("No se pudo generar el ID de la venta.");
    }
  };

  const handleAddVenta = async () => {
    if (!venta.fecha_venta || !venta.comprador || !venta.precio_venta || !venta.forma_pago) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const idVenta = await generarIdVentaSecuencial();
      await setDoc(doc(db, "ventas", idVenta), {
        ...venta,
        precio_venta: parseFloat(venta.precio_venta),
      });
      Alert.alert("Éxito", "Venta añadida correctamente.");
      setVenta({
        id_animal: id || "",
        fecha_venta: "",
        comprador: "",
        precio_venta: "",
        forma_pago: "",
      });
    } catch (error) {
      console.error("Error al añadir la venta:", error);
      Alert.alert("Error", "No se pudo añadir la venta.");
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
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {animal && (
            <>
              <Text style={styles.animalName}>Código: {animal.id}</Text>
              <Text style={styles.animalName}>Animal: {animal.tipo}</Text>
            </>
          )}
          <Text style={styles.title}>Registrar Venta</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha de Venta (YYYY-MM-DD)"
            value={venta.fecha_venta}
            onChangeText={(text) => setVenta({ ...venta, fecha_venta: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Comprador"
            value={venta.comprador}
            onChangeText={(text) => setVenta({ ...venta, comprador: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de Venta"
            keyboardType="numeric"
            value={venta.precio_venta}
            onChangeText={(text) => setVenta({ ...venta, precio_venta: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Forma de Pago"
            value={venta.forma_pago}
            onChangeText={(text) => setVenta({ ...venta, forma_pago: text })}
          />
          <Button title="Añadir Venta" onPress={handleAddVenta} />
          <Link href="/pages/Readsales" style={styles.link}>
            Ver listado de ventas
          </Link>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.92)",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  animalName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  link: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});