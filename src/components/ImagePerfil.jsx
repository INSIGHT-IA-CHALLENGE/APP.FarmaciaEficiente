import { Image, StyleSheet, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { theme } from "../styles/theme";
import GalleryImage from "../../assets/images/gallery.png"
import { FontAwesome5 } from '@expo/vector-icons';

const ImagePerfil = (props) => {
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true
        });

        if (!result.canceled) {
            props.setFoto('data:image/jpeg;base64,' + result.assets[0].base64);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={props.foto ? { uri: props.foto } : GalleryImage}
                style={[styles.foto]}
            />

            <FontAwesome5 name="exchange-alt" style={styles.icon} onPress={pickImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
    },

    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.white,
        resizeMode: "cover"
    },

    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        borderRadius: 50,
        color: theme.colors.lightGray,
        padding: 10,
        fontSize: 15
    }
})

export default ImagePerfil;