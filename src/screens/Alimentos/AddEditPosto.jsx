import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import Button from "../../components/Button";
import { useCallback, useEffect, useState } from "react";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import { buscaCep, listarTodosPorUsuario } from "../../api/medicamento";
import alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";
import ImagePerfil from "../../components/ImagePerfil";
import Select from "../../components/Select";
import { alterar, cadastrar } from "../../api/postos";

const AddEditPosto = ({ navigation, route }) => {

    const { posto } = route.params
    const auth = useAuth()

    
    const [nome, setNome] = useState(posto?.nome || '')
    const [descricao, setDescricao] = useState(posto?.descricao || '')
    const [cep, setCep] = useState(posto?.endereco?.cep || '')
    const [numero, setNumero] = useState(posto?.endereco?.numero || '')
    const [logradouro, setLogradouro] = useState(posto?.endereco?.logradouro || '')
    const [bairro, setBairro] = useState(posto?.endereco?.bairro || '')
    const [cidade, setCidade] = useState(posto?.endereco?.cidade || '')
    const [uf, setUf] = useState(posto?.endereco?.uf || '')
    const [complemento, setComplemento] = useState(posto?.endereco?.complemento || '')


    const handleCadastrar = async () => {

        if (validarCampos()) {

            const data = {
                nome,
                descricao,
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

            const response = await cadastrar(auth.token, data)

            if (response.ok) {
                alert('Sucesso', 'Posto cadastrado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao cadastrar o posto')
            }
        }
    }

    const handleEditar = async () => {
        if (validarCampos()) {
           
            const data = {
                id: posto.id,
                nome,
                descricao,
                endereco: {
                    id: posto.endereco.id,
                    cep,
                    numero,
                    logradouro,
                    bairro,
                    cidade,
                    uf,
                    complemento,
                }
            }

            const response = await alterar(auth.token, data, posto.id)

            if (response.ok) {
                alert('Sucesso', 'Posto alterado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao alterar o posto')
            }
        }
    }

    function validarCampos() {

        if (!nome) {
            alert('Erro', 'Informe o nome do posto')
            return false
        }

        else if (nome.length < 3) {
            alert('Erro', 'O nome do posto deve ter no mínimo 3 caracteres')
            return false
        }

        if (!descricao) {
            alert('Erro', 'Informe a descrição')
            return false
        }

        else if (descricao.length < 3) {
            alert('Erro', 'Descrição deve ter no mínimo 3 caracteres')
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

    useEffect(() => {
    }, [])

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>{posto === null ? "Cadastro" : "Editar"}</Text>

                <View style={styles.inputs}>
                    <Input placeholder="Nome" value={nome} onChange={setNome} />
                    <Input placeholder="Descrição" value={descricao} onChange={setDescricao} />
                    <InputMask mask="cep" onChange={handleCep} value={cep} />
                    <Input placeholder="Logradouro" disabled value={logradouro} />
                    <Input placeholder="Bairro" disabled value={bairro} />
                    <Input placeholder="Cidade" disabled value={cidade} />
                    <Input placeholder="Estado" disabled value={uf} />
                    <Input placeholder="Numero" value={numero} onChange={setNumero} />
                    <Input placeholder="Complemento" value={complemento} onChange={setComplemento} />
                    <Button
                        text={posto === null ? "Cadastrar" : "Alterar"}
                        onPress={posto === null ? handleCadastrar : handleEditar}
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

export default AddEditPosto;