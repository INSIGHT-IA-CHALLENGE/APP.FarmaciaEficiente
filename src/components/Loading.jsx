import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated, Easing, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function Loading({ isError }) {

    const [rotate] = useState(new Animated.Value(0));
    const [deg] = useState(rotate.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }))

    Animated.loop(
        Animated.timing(rotate, {
            toValue: 360,
            duration: 800,
            isInteraction: false,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'web' ? false : true,

        }), { iterations: -1 }
    ).start();

    return (
        !isError ?
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ rotate: deg }] }}>
                    <AntDesign name="loading1" style={styles.icon} />
                </Animated.View>
                <Text style={styles.text}>Carregando...</Text>
            </View>
            :
            <View style={styles.container}>
                <MaterialIcons name="dangerous" style={styles.icon} />
                <Text style={styles.text}>Ocorreu um erro</Text>
            </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        backgroundColor: theme.colors.lightGray,
    },

    icon: {
        fontSize: 50,
        color: theme.colors.primary,
        backgroundColor: theme.colors.secondary,
        borderRadius: 120,
        height: 80,
        width: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },

    text: {
        fontSize: 16,
        color: theme.colors.gray,
    }
})