import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Back from '../../components/Back';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { theme } from '../../styles/theme';
import InputMask from '../../components/InputMask';
import { listar } from '../../api/medicamentos';
import { useAuth } from '../../context/AuthContext';
import alert from '../../components/Alert';
import { cadastrar } from '../../api/estoque';

function AddEstoque({ navigation, route }) {

    const { posto, estoque } = route.params
    const auth = useAuth()

    const [quantidade, setQuantidade] = useState('')
    const [medicamentos, setMedicamentos] = useState([])
    const [medicamento, setMedicamento] = useState('')

    async function handleCadastrar() {
        if(validarCampos()){
            let data = {
                quantidade,
                posto: { id: posto.id },
                medicamento: { id: medicamento }
            }

            const response = await cadastrar(auth.token, data)

            if(response.ok){
                alert('Sucesso', 'Estoque cadastrado com sucesso')
                navigation.goBack()
            }
            else{
                alert('Erro', 'Erro ao cadastrar o estoque')
            }
        }
    }

    function validarCampos() {
        if(medicamento === ''){
            alert('Erro', 'Selecione um medicamento')
            return false
        }
        else if(isNaN(medicamento)){
            alert('Erro', 'Selecione um medicamento válido')
            return false
        }
        
        if(quantidade === ''){
            alert('Erro', 'Informe a quantidade inicial')
            return false
        }
        else if(isNaN(quantidade)){
            alert('Erro', 'Informe um valor válido para quantidade inicial')
            return false
        }

        return true
    }

    const fetchMedicamentos = useCallback(async () => {
        const response = await listar(auth.token)
        
        if(response.ok){
            const json = await response.json()
            const idsEstoque = estoque.map(item => item.medicamento.id)

            let data = []
            json.forEach(medicamento => {
                if(!idsEstoque.includes(medicamento.id)){
                    data.push({
                        text: `${medicamento.nome}, ${medicamento.dosagem} - ${medicamento.fabricante}`, 
                        value: medicamento.id
                    })
                }
            })

            setMedicamentos(data)
            setMedicamento(data[0]?.value ?? '')
        }
        else{
            alert('Erro', 'Erro ao listar medicamentos')
        }
    })

    useEffect(() => {
        fetchMedicamentos()
    }, [])

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>Cadastrar</Text>

                <View style={styles.inputs}>
                    <Select options={medicamentos} value={medicamento} setValue={setMedicamento}/>
                    <InputMask placeholder="Quantidade Inicial" value={quantidade} onChange={setQuantidade} mask="numeric"/>
                    <Button text="Cadastrar" onPress={handleCadastrar} />
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

export default AddEstoque;