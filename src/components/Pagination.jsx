import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../styles/theme";

const Pagination = ({number, totalPages, handleAnterior, handleProximo}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {opacity: number === 0 ? 0.5 : 1}]}
                activeOpacity={0.8}
                disabled={number === 0}
                onPress={handleAnterior}
            >
                <MaterialIcons name="keyboard-arrow-left" style={styles.icon} />
                <Text style={styles.text}>Anterior</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[styles.button, {opacity: number === totalPages - 1 || totalPages === 0 ? 0.5 : 1}]}
                activeOpacity={0.8}
                disabled={number === totalPages - 1 || totalPages === 0 }
                onPress={handleProximo}
            >
                <Text style={styles.text}>Próximo</Text>
                <MaterialIcons name="keyboard-arrow-right" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.lightGray,
    },

    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    text:{
        fontFamily: theme.fonts.poppins.bold,
        color: theme.colors.dark,
        fontSize: 14,
    },

    icon:{
        color: theme.colors.dark,
        fontSize: 18,
    }
})

export default Pagination;