import React, { useCallback, useEffect, useState } from 'react';
import Container from '../../components/Container';
import Content from '../../components/Content';
import { Image, StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { listarPorUsuario } from '../../api/retirada';
import Loading from '../../components/Loading';
import list from '../../styles/list';
import { AntDesign } from '@expo/vector-icons';
import ModalStyled from '../../components/Modal';
import { useIsFocused } from '@react-navigation/native';

function Retiradas() {

    const auth = useAuth()
    const [pesquisa, setPesquisa] = useState('')
    const [retiradas, setRetiradas] = useState(null)
    const [erro, setErro] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const isFocus = useIsFocused()

    const fetchRetiradas = useCallback(async () => {

        const response = await listarPorUsuario(auth.token, auth.user.id)

        if (response.ok) {
            const json = await response.json()
            setRetiradas(json ?? [])
        }
        else {
            setRetiradas([])
            setErro(true)
        }
    })

    useEffect(() => {
        fetchRetiradas()
    }, [isFocus])

    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input placeholder='Pesquisar' style={{ maxWidth: '100%' }} value={pesquisa} onChange={setPesquisa} />
                </View>

                {
                    retiradas === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                retiradas
                                    .filter(r => r?.estoque?.medicamento?.nome.toUpperCase().includes(pesquisa.toUpperCase().trim()))
                                    .map((r) => (
                                        <View style={list.item} key={r.id}>
                                            <View style={list.itemContent}>
                                                <View>
                                                    <Text style={list.itemTitle}>
                                                        {r.estoque.medicamento.nome}, {r.estoque.medicamento.dosagem}
                                                    </Text>
                                                    <Text style={list.itemDescription}>
                                                        Local: {r.estoque.posto.nome}
                                                    </Text>
                                                    <Text style={list.itemDescription}>
                                                        Data: {new Date(r.dataCadastro).toLocaleString()}
                                                    </Text>
                                                    <Text style={list.itemDescription}>
                                                        Identificador: {r.id.toString().padStart(5, '0')}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={list.icons}>
                                                <AntDesign name="qrcode" style={list.view} onPress={() => setModalVisible(true)} />
                                            </View>
                                        </View>
                                    ))
                            }
                        </View>
                }
                {
                    retiradas?.length === 0
                    && <Text style={list.empty}>Nenhuma retirada encontrada</Text>
                }
            </Content>

            <ModalStyled setVisible={setModalVisible} visible={modalVisible} title={"Retirada"}>
                <View style={styles.retirada}>
                    <Image source={require('../../../assets/images/qrcode.png')} style={styles.imagem} />
                    <Text style={[styles.text, { textAlign: 'center' }]}>Use o QR Code para realizar sua retirada</Text>
                </View>
            </ModalStyled>
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

    retirada: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        width: '100%',
    },

    imagem: {
        width: 200,
        height: 200,
        borderRadius: 5
    },
})


export default Retiradas;