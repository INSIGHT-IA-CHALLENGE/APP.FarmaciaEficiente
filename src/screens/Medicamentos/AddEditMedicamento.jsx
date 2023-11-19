import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";
import { alterar, cadastrar } from "../../api/medicamentos";

const AddEditMedicamento = ({ navigation, route }) => {

    const { medicamento } = route.params

    const [nome, setNome] = useState(medicamento?.nome || '')
    const [fabricante, setFabricante] = useState(medicamento?.fabricante || '')
    const [dosagem, setDosagem] = useState(medicamento?.dosagem || '')
    const auth = useAuth()

    const handleCadastrar = async () => {
        if (validarCampos()) {

            const data = {
                nome,
                fabricante,
                dosagem,
            }

            const response = await cadastrar(auth.token, data)

            if (response.ok) {
                alert('Sucesso', 'Medicamento cadastrado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao cadastrar medicamento')
            }
        }
    }

    const handleEditar = async () => {
        if (validarCampos()) {
            const data = {
                id: medicamento.id,
                nome,
                fabricante,
                dosagem,
            }

            const response = await alterar(auth.token, data, medicamento.id)

            if (response.ok) {
                alert('Sucesso', 'Medicamento alterado com sucesso!')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao alterar medicamento!')
            }    
        }
    }

    function validarCampos() {
        if(nome === '') {
            alert('Erro', 'Campo nome é obrigatório')
            return false
        }
        else if(nome.length < 3) {
            alert('Erro', 'Campo nome deve ter no mínimo 3 caracteres')
            return false
        }

        if(fabricante === '') {
            alert('Erro', 'Campo fabricante é obrigatório')
            return false
        }
        else if(fabricante.length < 3) {
            alert('Erro', 'Campo fabricante deve ter no mínimo 3 caracteres')
            return false
        }

        if(dosagem === '') {
            alert('Erro', 'Campo dosagem é obrigatório')
            return false
        }
        else if(dosagem.length < 2) {
            alert('Erro', 'Campo dosagem deve ter no mínimo 2 caracteres')
            return false
        }

        return true
    }

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>{medicamento === null ? "Cadastro" : "Editar"}</Text>

                <View style={styles.container}>
                    <Input placeholder="Nome" value={nome} onChange={setNome}/>
                    <Input placeholder="Fabricante" value={fabricante} onChange={setFabricante}/>
                    <Input placeholder="Dosagem" value={dosagem} onChange={setDosagem}/>
                    <Button
                        text={medicamento === null ? "Cadastrar" : "Alterar"}
                        onPress={medicamento === null ? handleCadastrar : handleEditar}
                    />
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,

    },

    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
})

export default AddEditMedicamento;