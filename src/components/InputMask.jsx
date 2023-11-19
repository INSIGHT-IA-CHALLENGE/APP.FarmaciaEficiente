import { TextInputMask } from "react-native-masked-text";
import { theme } from "../styles/theme";
import { StyleSheet } from "react-native";

const InputMask = (props) => {

    const getConfig = (mask) => {
        if (mask === 'telefone') {
            return {
                type: 'cel-phone',
                options: {
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                },
                placeholder: 'Telefone',
            }
        }

        if (mask === 'cep') {
            return {
                type: 'zip-code',
                placeholder: 'CEP',
            }
        }

        if(mask === 'money'){
            return {
                type: 'money',
                options: {
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                    suffixUnit: ''
                },
                placeholder: 'Valor (Deixe vazio se for doação)',
            }
        }

        if(mask === 'date'){
            return {
                type: 'datetime',
                options: {
                    format: 'DD/MM/YYYY'
                },
                placeholder: 'Data',
            }
        }

        if(mask === 'numeric'){
            return {
                type: 'only-numbers',
                placeholder: 'Quantidade',
            }
        }
    }

    return (
        <TextInputMask
            {...getConfig(props.mask)}
            value={props.value}
            onChangeText={props.onChange}
            style={styles.input}
            placeholderTextColor={theme.colors.gray}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
        fontFamily: theme.fonts.roboto.regular,
        fontSize: 16,
        color: theme.colors.black,
        width: '100%',
    }
})

export default InputMask;