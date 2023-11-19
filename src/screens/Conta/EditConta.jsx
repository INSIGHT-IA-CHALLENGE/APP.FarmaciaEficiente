import { StyleSheet, Text, View } from "react-native";
import Back from "../../components/Back";
import Container from "../../components/Container";
import Content from "../../components/Content";
import InputMask from "../../components/InputMask";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../styles/theme";
import { useState } from "react";
import ImagePerfil from "../../components/ImagePerfil";
import Select from "../../components/Select";
import { atualizar } from "../../api/usuario";
import alert from "../../components/Alert";
import { buscaCep } from "../../api/endereco";

const EditConta = ({ navigation }) => {

    const auth = useAuth()

    const [nome, setNome] = useState(auth.user.nome || '')
    const [telefone, setTelefone] = useState(auth.user.telefone || '')
    const [email, setEmail] = useState(auth.user.email || '')
    const [senha, setSenha] = useState('')
    const [cep, setCep] = useState(auth.user.endereco?.cep || '')
    const [numero, setNumero] = useState(auth.user.endereco?.numero || '')
    const [logradouro, setLogradouro] = useState(auth.user.endereco?.logradouro || '')
    const [bairro, setBairro] = useState(auth.user.endereco?.bairro || '')
    const [cidade, setCidade] = useState(auth.user.endereco?.cidade || '')
    const [uf, setUf] = useState(auth.user.endereco?.uf || '')
    const [complemento, setComplemento] = useState(auth.user.endereco?.complemento || '')


    const handleEditar = async () => {
        
        if (validaCampos()) {
            const data = {
                nome,
                telefone,
                email,
                senha,
                tipoUsuario: auth.user.tipoUsuario,
                endereco: {
                    id: auth.user.endereco?.id,
                    cep,
                    numero,
                    logradouro,
                    bairro,
                    cidade,
                    uf,
                    complemento,
                }
            }
            
            console.log(data)
            const response = await atualizar(auth.token, data);

            if (response.ok) {
                auth.fetchUsuario()
                alert('Sucesso', 'Cadastro alterado com sucesso')
                navigation.navigate('Conta')
            }
            else if (response.status === 409) {
                alert('Erro', 'Email ou Telefone já cadastrado')
            }
            else {
                alert('Erro', 'Erro ao atualizar o cadastro')
            }
        }
    }

    const validaCampos = () => {
        console.log(telefone)

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

        if (senha.length > 0 && senha.length < 5){
            alert('Erro', 'A nova senha deve ter no mínimo 5 caracteres')
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

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>Editar</Text>

                <View style={styles.inputs}>
                    <Input placeholder='Nome' value={nome} onChange={setNome} />
                    <InputMask value={telefone} onChange={setTelefone} mask="telefone" />
                    <Input placeholder='Email' value={email} onChange={setEmail} keyboard="email-address" />
                    <Input placeholder='Senha' password value={senha} onChange={setSenha} />
                    <InputMask mask="cep" onChange={handleCep} value={cep} />
                    <Input placeholder="Logradouro" disabled value={logradouro} />
                    <Input placeholder="Bairro" disabled value={bairro} />
                    <Input placeholder="Cidade" disabled value={cidade} />
                    <Input placeholder="Estado" disabled value={uf} />
                    <Input placeholder="Numero" value={numero} onChange={setNumero} />
                    <Input placeholder="Complemento" value={complemento} onChange={setComplemento} />
                    <Button
                        text="Alterar"
                        onPress={handleEditar}
                    />
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    inputs: {
        display: 'flex',
        gap: 30,
        marginBottom: 60,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
})

export default EditConta;