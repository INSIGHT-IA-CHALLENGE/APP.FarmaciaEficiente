import { Image, StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import { alterar, deletar, listarPorPosto } from "../../api/estoque";
import list from "../../styles/list";
import { useIsFocused } from "@react-navigation/native";
import alert from "../../components/Alert";
import ModalStyled from "../../components/Modal";
import InputMask from "../../components/InputMask";
import { AntDesign } from '@expo/vector-icons';
import { retirar } from "../../api/retirada";

const DetalhesPosto = ({ navigation, route }) => {

    const { posto } = route.params
    const auth = useAuth()
    const [estoque, setEstoque] = useState([])
    const isFocus = useIsFocused()
    const [estoqueEdit, setEstoqueEdit] = useState(null)
    const [quantidade, setQuantidade] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [atualizar, setAtualizar] = useState(false)
    const [modalRetirada, setModalRetirada] = useState(false)
    const [confirmarRetirada, setConfirmarRetirada] = useState(false)
    const [retirada, setRetirada] = useState(null)

    const fetchEstoque = useCallback(async () => {

        const reponse = await listarPorPosto(auth.token, posto?.id)

        if (reponse.ok) {
            const json = await reponse.json()
            setEstoque(json ?? [])
        }
        else {
            setEstoque([])
        }
    })

    const handleDelete = async (id) => {
        alert("Remover estoque", "Deseja realmente remover este estoque?", [
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

    const handleEditar = async () => {
        if (quantidade === '') {
            alert('Erro', 'Informe a quantidade do estoque')
            return
        } else if (isNaN(quantidade)) {
            alert('Erro', 'Informe um valor válido para a quantidade do estoque')
            return
        }

        const data = {
            id: estoqueEdit,
            quantidade: parseInt(quantidade),
            posto: { id: posto.id },
            medicamento: { id: 0 }
        }
        const response = await alterar(auth.token, data)

        if (response.ok) {
            alert('Sucesso', 'Estoque atualizado com sucesso!')
            setModalVisible(false)
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao atualizar estoque!')
        }
    }

    const apagarMedicamento = async (id) => {

        const response = await deletar(auth.token, id)

        if (response.ok) {
            alert('Sucesso', 'Estoque deletado com sucesso!')
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao deletar estoque!')
        }
    }

    const handleRetirada = async () => {
        let data ={
            usuario: { id: auth.user.id },
            estoque: { id: retirada }
        }

        const response = await retirar(auth.token, data)

        if (response.ok) {
            setConfirmarRetirada(true)
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao retirar medicamento!')
        }
    }

    useEffect(() => {
        fetchEstoque()
    }, [isFocus, atualizar])

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>Posto de Saúde</Text>
                <View style={styles.container}>
                    <Text style={styles.textBold}>{posto?.nome}</Text>
                    <Text style={styles.text}>{posto?.descricao}</Text>

                    <Text style={styles.textBold}>Endereço</Text>
                    <Text style={styles.text}>{posto?.endereco.logradouro}, {posto?.endereco.numero}</Text>
                    <Text style={styles.text}>
                        {posto?.endereco.bairro}, {posto?.endereco.cidade} - {posto?.endereco.uf}
                    </Text>
                    <Text style={styles.text}>{posto?.endereco.cep}</Text>
                    <Text style={styles.text}>{posto?.endereco.complemento}</Text>
                </View>

                <Text style={styles.title}>Medicamentos</Text>
                {
                    auth.user.tipoUsuario === 'ADMIN' &&
                    <Button
                        onPress={() => navigation.navigate("Estoque", { posto, estoque })}
                        text="ADICIONAR  ESTOQUE"
                        variation="secondary"
                    />
                }

                <View style={list.container}>
                    {estoque?.map((item) => (
                        <View key={item?.id} style={list.item}>
                            <View style={list.itemContent}>
                                <View style={{ width: "100%" }}>
                                    <Text style={list.itemTitle}>{item.medicamento.nome}, {item.medicamento.dosagem}</Text>
                                    <Text style={list.itemDescription}>{item.medicamento.fabricante}</Text>
                                    <Text numberOfLines={1} style={list.itemDescription}>Quantidade disponível: {item.quantidade}</Text>
                                </View>
                            </View>

                            {
                                auth.user.tipoUsuario === 'ADMIN' &&
                                <View style={list.icons}>
                                    <Feather name="edit" style={list.edit} onPress={() => {
                                        setQuantidade(item.quantidade.toString())
                                        setEstoqueEdit(item.id)
                                        setModalVisible(true)
                                    }} />
                                    <Feather name="trash" style={list.delete} onPress={() => handleDelete(item?.id)} />
                                </View>
                            }
                            {
                                auth.user.tipoUsuario === 'PACIENTE' &&
                                <View style={list.icons}>
                                    <AntDesign
                                        name="shoppingcart"
                                        style={list.view}
                                        onPress={() => {
                                            setModalRetirada(true);
                                            setConfirmarRetirada(false);
                                            setRetirada(item.id);
                                        }}
                                    />
                                </View>
                            }
                        </View>
                    ))}
                </View>
            </Content>

            <ModalStyled setVisible={setModalVisible} visible={modalVisible} title={"Editar quantidade do estoque"}>
                <InputMask mask="numeric" value={quantidade} onChange={setQuantidade} />
                <Button text="Atualizar" onPress={handleEditar} />
            </ModalStyled>

            <ModalStyled setVisible={setModalRetirada} visible={modalRetirada} title={"Retirada de medicamento"} >
                {
                    confirmarRetirada ? (
                        <View style={styles.retirada}>
                            <Image source={require('../../../assets/images/qrcode.png')} style={styles.imagem} />
                            <Text style={[styles.text, {textAlign: 'center'}]}>Use o QR Code para realizar sua retirada</Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.text}>Deseja realmente confirmar a retirada do medicamento?</Text>
                            <Button text="Confirmar" onPress={handleRetirada} />
                        </>
                    )
                }
            </ModalStyled>
        </Container>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },

    container: {
        display: 'flex',
        gap: 10,
        marginBottom: 30,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },

    buttons: {
        paddingBottom: 80
    },

    imagem: {
        width: 200,
        height: 200,
        borderRadius: 5
    },

    text: {
        fontFamily: theme.fonts.roboto.regular,
        color: theme.colors.dark,
        fontSize: 16,
        textAlign: 'left',
        width: '100%',
    },

    textBold: {
        fontFamily: theme.fonts.poppins.bold,
        color: theme.colors.black,
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
    },

    retirada: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        width: '100%',
    }
})

export default DetalhesPosto;