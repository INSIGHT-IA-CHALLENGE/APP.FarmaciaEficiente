import { Picker } from "@react-native-picker/picker";
import { Platform, StyleSheet, View } from "react-native";
import { theme } from "../styles/theme";

const Select = ({ value, setValue, options }) => {
    
    const numberOfLines = Platform.OS === 'web' ? {} : {numberOfLines: 2};   

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={value}
                onValueChange={(itemValue) => setValue(itemValue)}
                style={styles.select}
                {...numberOfLines}
            >
                {
                    options.map((option) => (
                        <Picker.Item
                            key={option.value}
                            label={option.text}
                            value={option.value}
                        />
                    ))
                }
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        overflow: "hidden",
        borderRadius: 5,
    },

    select: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
        fontFamily: theme.fonts.roboto.regular,
        fontSize: 16,
        color: theme.colors.black,
        width: '100%',
        borderColor: theme.colors.transparent,
    }
})

export default Select;