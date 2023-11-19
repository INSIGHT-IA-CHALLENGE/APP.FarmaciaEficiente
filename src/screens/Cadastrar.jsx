import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Back from "../components/Back";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import Input from "../components/Input";
import ImagePerfil from "../components/ImagePerfil";
import Select from "../components/Select";
import alert from "../components/Alert";
import InputMask from "../components/InputMask";
import { cadastrar } from "../api/usuario";
import { theme } from "../styles/theme";
import { buscaCep } from "../api/endereco";

const Cadastrar = ({navigation}) => {

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cep, setCep] = useState('')
    const [numero, setNumero] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [complemento, setComplemento] = useState('')

    const handleCadastrar = async () => {
        if(validaCampos()){
            const usuario = {
                nome,
                telefone,
                email,
                senha,
                tipoUsuario: "PACIENTE",
                endereco: {
                    cep,
                    numero,
                    logradouro,
                    bairro,
                    cidade,
                    uf,
                    complemento,
                }
            }

            const response = await cadastrar(usuario);

            if(response.ok){
                alert('Sucesso', 'Cadastro realizado com sucesso')
                navigation.navigate('Login')
            }
            else if(response.status === 409){
                alert('Erro', 'Email ou Telefone já cadastrado')
            }
            else{
                alert('Erro', 'Erro ao realizar o cadastro')
            }
        }
    }

    const handleCep = async (cep) => {
        setCep(cep)
        if (cep.length === 9) {
            const response = await buscaCep(cep)

            if (response.ok) {
                const json = await response.json()

                if (json?.cep) {
                    setLogradouro(json.logradouro)
                    setBairro(json.bairro)
                    setCidade(json.localidade)
                    setUf(json.uf)
                }
                else {
                    alert('Erro', 'Cep não encontrado')
                }
            }
            else {
                alert('Erro', 'Erro ao buscar cep')
            }
        }
    }

    const validaCampos = () => {

        if(!nome){
            alert('Erro', 'Digite seu nome')
            return false
        }
        else if (nome.length < 3){
            alert('Erro', 'O nome deve ter no mínimo 3 caracteres')
            return false
        }

        if(!telefone){
            alert('Erro', 'Digite seu telefone')
            return false
        }
        else if(telefone.length < 14){
            alert('Erro', 'Digite um telefone válido')
            return false
        }

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

        if (cep.length !== 9) {
            alert('Erro', 'Cep inválido')
            return false
        }
        else if (numero.length === 0) {
            alert('Erro', 'Número inválido')
            return false
        }
        else if (logradouro.length < 2) {
            alert('Erro', 'Logradouro inválido')
            return false
        }
        else if (bairro.length < 2) {
            alert('Erro', 'Bairro inválido')
            return false
        }
        else if (cidade.length < 2) {
            alert('Erro', 'Cidade inválida')
            return false
        }
        else if (uf.length !== 2) {
            alert('Erro', 'Estado inválido')
            return false
        }

        return true
    }

    return (
        <Container background>
            <Content>
                <Back onPress={() => navigation.goBack()} />

                <Text style={styles.title}>Cadastro</Text>

                <View style={styles.inputs}>
                    <Input placeholder='Nome' value={nome} onChange={setNome}/>
                    <InputMask value={telefone} onChange={setTelefone} mask="telefone"/>
                    <Input placeholder='Email' value={email} onChange={setEmail} keyboard="email-address"/>
                    <Input placeholder='Senha' password value={senha} onChange={setSenha}/>
                    <InputMask mask="cep" onChange={handleCep} value={cep} />
                    <Input placeholder="Logradouro" disabled value={logradouro} />
                    <Input placeholder="Bairro" disabled value={bairro} />
                    <Input placeholder="Cidade" disabled value={cidade} />
                    <Input placeholder="Estado" disabled value={uf} />
                    <Input placeholder="Numero" value={numero} onChange={setNumero} />
                    <Input placeholder="Complemento" value={complemento} onChange={setComplemento} />
                    <Button text="Cadastrar" onPress={handleCadastrar}/>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.white,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },

    inputs: {
        display: 'flex',
        gap: 30,
        marginBottom: 60,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Cadastrar;