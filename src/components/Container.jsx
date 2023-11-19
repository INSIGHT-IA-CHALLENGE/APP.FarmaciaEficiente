import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { theme } from '../styles/theme';

// type Props = {
//     background?: boolean
//     children: React.ReactNode
// }

export default function Container(props) {
    return (
        <View style={getStyle(props).container}>
            {props.children}
        </View>
    )
}

function getStyle(props) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: props.background ? theme.colors.secondary : theme.colors.lightGray,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            paddingTop: StatusBar.currentHeight,
        }
    })
}