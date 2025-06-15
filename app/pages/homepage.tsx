import { Link } from 'expo-router'; // Importa Link de expo-router
import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

const HomePage = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://us.123rf.com/450wm/marinavorontsova/marinavorontsova1607/marinavorontsova160700015/59642497-vaca-caballo-oveja-cabra-cerdo-ganso-gallo-pollo-ilustraci%C3%B3n-vectorial-de-los-animales-de.jpg?ver=6' }}
      style={styles.background}
    >      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://us.123rf.com/450wm/vladklok/vladklok1803/vladklok180300571/98252537-ilustraci%C3%B3n-de-siluetas-de-animales-de-granja-de-vector-iconos-de-ganado-y-aves-de-corral.jpg?ver=6' }}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Inventario de Animales</Text>
        <Text style={styles.subtitle}>Granja Moderna y Eficiente</Text>
        <Link href="/pages/animals" style={styles.button}>
          <Text style={styles.buttonText}>añadir animal</Text>
        </Link>
        <Link href="/pages/ListSale" style={styles.button}>
          <Text style={styles.buttonText}>añadir venta</Text>
        </Link>
        <Link href="/pages/ReadAnimals" style={styles.button}>
          <Text style={styles.buttonText}>ver animales</Text>
        </Link>
        <Link href="/pages/Readsales" style={styles.button}>
          <Text style={styles.buttonText}>ver ventas</Text>
        </Link>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '111%',
  },
  container: {
    backgroundColor: 'rgba(240, 244, 248, 0.5)', // Fondo semitransparente para mejor visibilidad
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 0,
    resizeMode: 'cover',
  },
  logoContainer: {
    marginTop: -90,
    marginBottom: 30,
    borderRadius: 100,
    overflow: 'hidden',
    width: 190,
    height: 190,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'white', // Color blanco para el botón
    height: 55,
    borderRadius: 30, // Bordes redondeados
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido verticalmente
    width: '60%', // Botón más ancho
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Sombra para Android
    marginVertical: 10, // Separación entre botones
  },
  buttonText: {
    color: 'black', // Texto negro para contraste
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto horizontalmente
    lineHeight: 55, // Asegura que el texto esté perfectamente centrado verticalmente
  },
});

export default HomePage;