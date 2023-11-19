import {createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../screens/Login'
import Cadastrar from '../screens/Cadastrar'


function DeslogadoRoutes() {
    const Stack = createNativeStackNavigator()
    
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login}  />
            <Stack.Screen name="Cadastrar" component={Cadastrar}/>
        </Stack.Navigator>
    )
}

export default DeslogadoRoutes;