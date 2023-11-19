import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    useState,
    createContext,
    useContext,
    useEffect,
    useCallback
} from "react";
import alert from "../components/Alert";
import { detalhes } from "../api/usuario";

export const AuthContext = createContext({
    token: null,
    login: () => { },
    logout: () => { },
    user: null,
    fetchUsuario: () => { }
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipoUsuario: "",
        ativo: true,
        foto: ""
    });


    useEffect(() => {
        async function getUser() {
            let token = await AsyncStorage.getItem('@token');
            if (token)
                setToken(JSON.parse(token));
            else
                setToken(null);
        }

        getUser()

    }, []);

    useEffect(() => {
        if (token) {
            fetchUsuario()
        }
    }, [token])

    const fetchUsuario = useCallback(async () => {
        const response = await detalhes(token)
        if (response.ok) {
            const json = await response.json()
            setUser(json)
        }
    })

    async function login(token) {
        try {
            await AsyncStorage.setItem('@token', JSON.stringify(token));
            setToken(token);
        } catch (error) {
            setToken(null);
            alert('Erro', 'Erro ao efetuar login')
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem('@token');
            setToken(null);
        } catch (error) {
            alert('Erro', 'Erro ao efetuar logout')
        }
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, user, fetchUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);