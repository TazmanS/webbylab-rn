import { Provider } from "react-redux";
import store from "./store/index";
import Wrappers from "./index";
import { SafeAreaView, StatusBar } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <Wrappers />
      </SafeAreaView>
    </Provider>
  );
}
