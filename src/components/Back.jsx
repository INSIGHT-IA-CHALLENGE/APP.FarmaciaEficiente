import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function Back(props) {
  return (
    <Pressable style={getStyles(props).button} onPress={props.onPress}>
        <MaterialIcons name="keyboard-arrow-left" style={getStyles(props).icon} />
        <Text style={getStyles(props).text}>Voltar</Text>
    </Pressable>
  )
}

function getStyles(props){
    return StyleSheet.create({

        button:{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 30,
        },
    
        text: {
            fontFamily: theme.fonts.poppins.bold,
            color: props.dark ? theme.colors.dark : theme.colors.white,
            fontSize: 12,
        },
    
        icon:{
            color: props.dark ? theme.colors.dark : theme.colors.white,
            fontSize: 18,
        }
    })
}