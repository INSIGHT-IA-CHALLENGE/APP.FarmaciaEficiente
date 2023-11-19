import react, { useState } from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import Input from "../components/Input";
import Button from "../components/Button";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";
import { login } from "../api/usuario";
import { useAuth } from "../context/AuthContext";
import alert from "../components/Alert";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const auth = useAuth()

    const handleLogin = async () => {

        if(validaCampos()){
            const usuario = {
                email,
                senha
            }

            const response = await login(usuario);

            if(response.ok){
                const json = await response.json()
                auth.login(json)
            }

            else if(response.status === 403){
                alert('Erro', 'Conta está desativada')
            }

            else if(response.status === 404){
                alert('Erro', 'Email ou senha incorretos')
            }

            else{
                alert('Erro', 'Erro ao realizar o login')
            }
        }
    }

    const validaCampos = () => {
       
        if(!email){
            alert('Erro', 'Digite seu email')
            return false
        }

        else if((/\S+@\S+\.\S+/).test(email) === false){
            alert('Erro', 'Digite um email válido')
            return false
        }

        if(!senha){
            alert('Erro', 'Digite sua senha')
            return false
        }
        else if (senha.length < 5){
            alert('Erro', 'A senha deve ter no mínimo 5 caracteres')
            return false
        }

        return true
    }

    return (
        <Container background>
            <Content>
                <View style={styles.head}>
                    <Image source={require('../../assets/images/logo-128.png')} style={styles.logo} />
                    <Text style={styles.title}>Farmácia Eficiente</Text>
                </View>

                <View style={styles.form}>
                    <Input placeholder="Email" value={email} onChange={setEmail} keyboard="email-address"/>
                    <Input placeholder="Senha" password value={senha} onChange={setSenha}/>
                    <Button text="Entrar" onPress={handleLogin}/>
                </View>


                <Text style={styles.link} onPress={() => navigation.navigate('Cadastrar')}>
                    Desejo me cadastrar
                </Text>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({

    head: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    logo: {
        width: 128,
        height: 128,
    },

    title: {
        fontFamily: theme.fonts.montserrat.bold,
        color: theme.colors.dark,
        fontSize: 24,
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 50,
        marginBottom: 20,
        width: '100%',
    },

    link: {
        textAlign: 'center',
        color: theme.colors.dark,
        fontFamily: 'Roboto-Regular',
        textDecorationLine: 'underline',
        marginTop: 20,
    }
});