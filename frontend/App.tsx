import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import RouterApp from "./components/RouterApp";
import ProviderQuickMeds from "./provider/ProviderQuickMeds";

export default function App() {
  return (
    <ProviderQuickMeds>
      <SafeAreaView style={styles.container}>
        <RouterApp />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ProviderQuickMeds>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
