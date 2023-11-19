import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Postos from "../screens/Postos/Postos";
import AddEditPosto from "../screens/Postos/AddEditPosto";
import DetalhesPosto from "../screens/Postos/DetalhesPosto";
import AddEstoque from "../screens/Postos/AddEstoque";

const AlimentosRoutes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Postos'>
            <Stack.Screen name="Postos" component={Postos} />
            <Stack.Screen name="AddEditPosto" component={AddEditPosto} options={{ title: "Postos" }} />
            <Stack.Screen name="DetalhesPosto" component={DetalhesPosto} options={{ title: "Postos" }} />
            <Stack.Screen name="Estoque" component={AddEstoque} />
        </Stack.Navigator>
    );
}

export default AlimentosRoutes;