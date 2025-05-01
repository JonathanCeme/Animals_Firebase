import { Text, View } from "react-native";
import AnimalsPage from "./pages/animals";
import ReadAnimals from "./pages/ReadAnimals";
import HomePage  from "./pages/homepage";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    
      <HomePage></HomePage>

    </View>
  );
}
