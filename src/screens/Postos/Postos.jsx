import { Image, StyleSheet, Text, View } from "react-native";
import { deletar, listar } from "../../api/postos";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useIsFocused  } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import list from "../../styles/list";
import Container from "../../components/Container";
import Content from "../../components/Content";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import alert from "../../components/Alert";
import { AntDesign } from '@expo/vector-icons';


const Postos = () => {

    const auth = useAuth()
    const navigation = useNavigation()
    const isFocus = useIsFocused()
    const [erro, setErro] = useState(false)
    const [atualizar, setAtualizar] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [postos, setPostos] = useState(null)

    const fetchPostos = useCallback(async () => {

        const reponse = await listar(auth.token)

        if (reponse.ok) {
            const json = await reponse.json()
            setPostos(json ?? [])
        }
        else {
            setErro(true)
        }
    })

    const handleDelete = async (id) => {

        const reponse = await deletar(auth.token, id)

        if (reponse.ok) {
            alert('Sucesso', 'Posto excluído com sucesso')
            setPesquisa('')
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao excluir posto')
        }
    }

    useEffect(() => {
        fetchPostos()
    }, [atualizar, isFocus])

    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input
                        placeholder='Pesquisar'
                        style={{ maxWidth: auth.user.tipoUsuario === 'ADMIN' ? '80%' : '100%' }}
                        value={pesquisa}
                        onChange={setPesquisa} />

                    {
                        auth.user.tipoUsuario === 'ADMIN' &&
                        <AddButton onPress={() => navigation.navigate('AddEditPosto', { posto: null })} />
                    }
                </View>

                {
                    postos === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                postos.filter(posto => posto?.nome.toUpperCase().includes(pesquisa.trim().toUpperCase()))
                                .map(posto => (
                                    <View style={list.item} key={posto?.id}>
                                        <View style={list.itemContent}>
                                            <View style={{width: "100%"}}>
                                                <Text numberOfLines={1} ellipsizeMode="tail" style={list.itemTitle}>
                                                    {posto?.nome}
                                                </Text>
                                                <Text numberOfLines={3} ellipsizeMode="tail" style={list.itemDescription}>
                                                    {posto?.descricao}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={list.icons}>
                                            <AntDesign name="eye" style={list.view} onPress={() => navigation.navigate("DetalhesPosto", { posto: posto })} />
                                            {
                                                auth.user.tipoUsuario === 'ADMIN' &&
                                                <>
                                                    <Feather name="edit" style={list.edit} onPress={() => navigation.navigate("AddEditPosto", { posto: posto })} />
                                                    <Feather name="trash" style={list.delete} onPress={() => handleDelete(posto?.id)} />
                                                </>

                                            }
                                        </View>
                                    </View>
                                ))
                            }
                            {
                                postos?.length === 0
                                && <Text style={list.empty}>Nenhum posto disponivel</Text>
                            }
                        </View>
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

export default Postos;