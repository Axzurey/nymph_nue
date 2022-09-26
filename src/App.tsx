import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import theme, { colors } from './shared/theme';
import { MainInterface } from './interface/main';

export default function App() {
  document.body.style.overflow = "hidden" //no more scrolly wolly
  document.body.style.height = '100%'

  const backgroundColor = useColorModeValue("gray.10", "blackAlpha.600");
  const primaryColor = useColorModeValue("orange.300", "orange.200");
  const secondaryColor = useColorModeValue("teal.300", "teal.300");
  const superColor = useColorModeValue('blackAlpha.800', 'blackAlpha.800');
  const weakSuperColor = useColorModeValue('blackAlpha.300', 'blackAlpha.300');
  const weakHoverColor = useColorModeValue('grey', 'grey');
  const hoverColor = useColorModeValue('gray.500', 'grey.500')

  colors.primary = primaryColor;
  colors.secondary = secondaryColor;
  colors.background = backgroundColor;
  colors.super = superColor;
  colors.weaksuper = weakSuperColor;
  colors.weakhover = weakHoverColor;
  colors.hover = hoverColor;

  return (
    <ChakraProvider theme={theme}>
      <MainInterface/>
    </ChakraProvider>
  )
}