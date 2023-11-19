import { NavigationContainer } from '@react-navigation/native';
import DeslogadoRoutes from "./deslogado.routes";
import { useAuth } from '../context/AuthContext';
import LogadoRoutes from './logado.routes';

function Routes() {
    const { token } = useAuth();

    return (
        <NavigationContainer>
            {
                token ?
                <LogadoRoutes/> :
                <DeslogadoRoutes/>
            }
        </NavigationContainer>
    )
}

export default Routes;