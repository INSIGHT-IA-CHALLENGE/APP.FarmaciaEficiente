import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../styles/theme";

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.button}
        >
            <MaterialIcons name="add" style={styles.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        width: 50,
        borderRadius: 5,
        padding: 10,
    },

    icon:{
        color: theme.colors.white,
        fontSize: 25,
    }
})

export default AddButton;