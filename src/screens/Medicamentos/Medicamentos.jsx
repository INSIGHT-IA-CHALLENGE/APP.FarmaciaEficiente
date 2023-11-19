import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";
import { useCallback, useEffect, useState } from "react";
import list from "../../styles/list";
import { useAuth } from "../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import alert from "../../components/Alert";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { deletar, listar } from "../../api/medicamentos";

const Medicamentos = () => {

    const auth = useAuth()
    const navigation = useNavigation()
    const isFocus = useIsFocused()
    const [erro, setErro] = useState(false)
    const [atualizar, setAtualizar] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [medicamentos, setMedicamentos] = useState(null)

    const fetchMedicamentos = useCallback(async () => {

        const reponse = await listar(auth.token)

        if (reponse.ok) {
            const json = await reponse.json()
            setMedicamentos(json ?? [])
        }
        else {
            setErro(true)
        }
    })

    const handleDelete = async (id) => {
        alert("Remover endereço", "Deseja realmente remover este medicamento?", [
            {
                text: "Confirmar",
                style: "default",
                onPress: () => apagarMedicamento(id)
            },
            {
                text: "Cancelar",
                onPress: () => { },
                style: "cancel"
            }
        ])
    }

    const apagarMedicamento = async (id) => {

        const response = await deletar(auth.token, id)

        if (response.ok) {
            alert('Sucesso', 'Medicamento deletado com sucesso!')
            setPesquisa('')
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao deletar medicamento!')
        }
    }

    useEffect(() => {
        fetchMedicamentos()
    }, [atualizar, isFocus])


    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input placeholder='Pesquisar' style={{ maxWidth: '80%' }} value={pesquisa} onChange={setPesquisa} />
                    <AddButton onPress={() => navigation.navigate('AddEditMedicamento', { medicamento: null })} />
                </View>

                {
                    medicamentos === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                medicamentos
                                .filter(medicamento => medicamento?.nome.toUpperCase().includes(pesquisa.toUpperCase().trim()))
                                .map(medicamento => (
                                    <View style={list.item} key={medicamento?.id}>
                                        <View>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemTitle}>
                                                {medicamento?.nome}, {medicamento?.dosagem}
                                            </Text>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemDescription}>
                                                {medicamento?.fabricante}
                                            </Text>
                                        </View>

                                        <View style={list.icons}>
                                            <Feather name="edit" style={list.edit} onPress={() => navigation.navigate("AddEditMedicamento", { medicamento: medicamento })} />
                                            <Feather name="trash" style={list.delete} onPress={() => handleDelete(medicamento?.id)} />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                }
                {
                    medicamentos?.length === 0
                    && <Text style={list.empty}>Nenhum medicamento encontrado</Text>
                }

            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        gap: 10,
        marginBottom: 10,
    },
})

export default Medicamentos;