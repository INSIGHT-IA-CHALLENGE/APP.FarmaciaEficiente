import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEditMedicamento from "../screens/Medicamentos/AddEditMedicamento";
import Medicamentos from "../screens/Medicamentos/Medicamentos";

const MedicamentosRoutes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Medicamentos'>
            <Stack.Screen name="Medicamentos" component={Medicamentos} />
            <Stack.Screen name="AddEditMedicamento" component={AddEditMedicamento} options={{ title: "Medicamento" }} />
        </Stack.Navigator>
    );
}

export default MedicamentosRoutes;