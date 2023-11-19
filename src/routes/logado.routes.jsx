import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MedicamentosRoutes from "./medicamentos.routes";
import { useAuth } from "../context/AuthContext";
import ContaRoutes from "./conta.routes";
import PostosRoutes from "./postos.routes";

const Tab = createBottomTabNavigator();

const LogadoRoutes = () => {

    const auth = useAuth()

    return (
        <Tab.Navigator
            initialRouteName='TabAlimentos'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [getStyles(false).container, getStyles(false).shadow],
            }}
        >
            {
                auth?.user?.tipoUsuario === 'ADMIN' &&
                <Tab.Screen
                    name="TabEndereços"
                    component={MedicamentosRoutes}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[getStyles(focused).tab]}>
                                <Fontisto name="drug-pack" style={getStyles(focused).tabIcon} />
                                <Text style={getStyles(focused).tabText}>Medicamentos</Text>
                            </View>
                        )
                    }}
                />
            }
            {
                auth?.user?.tipoUsuario === 'PACIENTE' &&
                <Tab.Screen
                    name="TabEndereços"
                    component={MedicamentosRoutes}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[getStyles(focused).tab]}>
                                <AntDesign name="shoppingcart" style={getStyles(focused).tabIcon} />
                                <Text style={getStyles(focused).tabText}>Retiradas</Text>
                            </View>
                        )
                    }}
                />
            }

            <Tab.Screen
                name="TabPostos"
                component={PostosRoutes}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[getStyles(focused).tabButton]}>
                            <FontAwesome5 name="hospital" style={getStyles(focused).tabButtonIcon} />
                        </View>
                    )

                }}
            />

            <Tab.Screen
                name="TabConta"
                component={ContaRoutes}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={getStyles(focused).tab}>
                            <MaterialCommunityIcons name="account-circle" style={getStyles(focused).tabIcon} />
                            <Text style={getStyles(focused).tabText}>Conta</Text>
                        </View>
                    )
                }} />
        </Tab.Navigator>
    );
}

function getStyles(focused) {

    const styles = StyleSheet.create({

        container: {
            backgroundColor: theme.colors.secondary,
            borderColor: theme.colors.secondary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: 60,
            borderTopColor: theme.colors.secondary,
        },

        tab: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        tabIcon: {
            fontSize: 22,
            color: focused ? theme.colors.primary : theme.colors.white,
        },

        tabText: {
            fontSize: 12,
            color: focused ? theme.colors.primary : theme.colors.white,
            fontFamily: focused ? theme.fonts.roboto.bold : theme.fonts.roboto.regular,
        },

        tabButton: {
            backgroundColor: theme.colors.primary,
            height: 70,
            width: 70,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: theme.colors.secondary,
            transform: [{ translateY: -25 }],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        tabButtonIcon: {
            fontSize: 30,
            color: theme.colors.white,
        },

        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }
    })

    return styles;
}

export default LogadoRoutes;