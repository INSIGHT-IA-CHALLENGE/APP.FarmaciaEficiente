import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { theme } from '../styles/theme'

// type Props = {
//   children?: React.ReactNode,
//   text: string,
//   variation?: 'primary' | 'secondary' | 'transparent',
//   onPress: () => void
// }

export default function Button(props) {
  return (
    <TouchableOpacity
      style={getStyle(props).button}
      activeOpacity={0.8}
      onPress={props.onPress}
    >

      <Text style={getStyle(props).text}>
        {props.children}
      </Text>

      <Text style={[getStyle(props).text, {marginBottom: Platform.OS === 'android' ? -5 : 0}]}>
        {props.text}
      </Text>

    </TouchableOpacity>
  )
}

const stylesGenerics = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    textAlignVertical: 'center',
    width: "100%"
  },
  
  text: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    textTransform: 'uppercase',
    fontFamily: theme.fonts.poppins.black,
    fontSize: 18,
    letterSpacing: 1.3,
  }
})

function getStyle(props) {


  const primary = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      ...stylesGenerics.button
    },

    text: {
      color: theme.colors.white,
      ...stylesGenerics.text
    }
  })

  const secundary = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.dark,
      ...stylesGenerics.button
    },

    text: {
      color: theme.colors.white,
      ...stylesGenerics.text
    }
  })

  const danger = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.danger,
      ...stylesGenerics.button
    },

    text: {
      color: theme.colors.white,
      ...stylesGenerics.text
    }
  })

  const transparent = StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      ...stylesGenerics.button
    },

    text: {
      color: theme.colors.gray,
      ...stylesGenerics.text
    }
  })

  if (props.variation === 'primary') return primary
  if (props.variation === 'secondary') return secundary
  if (props.variation === 'danger') return danger
  if (props.variation === 'transparent') return transparent

  return primary
}

