import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conta from "../screens/Conta/Conta";
import EditConta from "../screens/Conta/EditConta";


const ContaRoutes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Conta'>
            <Stack.Screen name="Conta" component={Conta} />
            <Stack.Screen name="AddEditConta" component={EditConta} options={{ title: "Conta" }} />
        </Stack.Navigator>
    );
}

export default ContaRoutes;