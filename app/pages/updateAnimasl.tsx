// aqui se se actuliza la informacion de un animal en la base de datos



import { useLocalSearchParams, useRouter } from "expo-router"; // Cambia a useLocalSearchParams
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, TextInput, View } from "react-native";
import app from "../credenciales/conf_firebase";

const db = getFirestore(app);

export default function EditAnimalScreen() {
  const { id } = useLocalSearchParams(); // Obtén el parámetro 'id' de la URL
  const router = useRouter(); // Para manejar la navegación
  const [animal, setAnimal] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const docRef = doc(db, "animales", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAnimal(docSnap.data());
        } else {
          Alert.alert("Error", "Animal no encontrado.");
          router.back(); // Regresa a la pantalla anterior si no se encuentra el animal
        }
      } catch (error) {
        console.error("Error al cargar el animal:", error);
        Alert.alert("Error", "No se pudo cargar el animal.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAnimal();
    }
  }, [id]);

  async function handleUpdate() {
    try {
      const docRef = doc(db, "animales", id as string);
      await updateDoc(docRef, animal);
      Alert.alert("Éxito", "Animal actualizado correctamente.");
      router.back(); // Regresa a la pantalla anterior
    } catch (error) {
      console.error("Error al actualizar el animal:", error);
      Alert.alert("Error", "No se pudo actualizar el animal.");
    }
  }

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Button title="Cargando..." disabled />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Tipo"
        value={animal.tipo}
        onChangeText={(text) => setAnimal({ ...animal, tipo: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Raza"
        value={animal.raza}
        onChangeText={(text) => setAnimal({ ...animal, raza: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Sexo"
        value={animal.sexo}
        onChangeText={(text) => setAnimal({ ...animal, sexo: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Peso Actual (kg)"
        value={animal.peso_actual_kg?.toString()}
        onChangeText={(text) =>
          setAnimal({ ...animal, peso_actual_kg: parseFloat(text) })
        }
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Estado de Salud"
        value={animal.estado_salud}
        onChangeText={(text) => setAnimal({ ...animal, estado_salud: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Ubicación"
        value={animal.ubicacion}
        onChangeText={(text) => setAnimal({ ...animal, ubicacion: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Fecha de Ingreso"
        value={animal.fecha_ingreso}
        onChangeText={(text) => setAnimal({ ...animal, fecha_ingreso: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Destinado Para"
        value={animal.destinado_para}
        onChangeText={(text) => setAnimal({ ...animal, destinado_para: text })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Actualizar" onPress={handleUpdate} />
    </ScrollView>
  );
}