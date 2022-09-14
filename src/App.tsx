import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import theme from './theme';
import NueDashboard from './interface/NueDashboard';
import {NueLink} from './interface/NueLink';
import NueSettings from './interface/NueSettings';

import { BsGearFill } from "react-icons/bs";
import { FaChalkboard, FaDatabase } from 'react-icons/fa';
import { Navbar } from './components/nav/Navbar';
import { colors } from './client/global';

const tabIds = [
    {
        name: 'Dashboard',
        map: (<NueDashboard></NueDashboard>),
		icon: FaChalkboard
    },
    {
        name: 'NueLink',
        map: (<NueLink></NueLink>),
		icon: FaDatabase
    },
    {
        name: 'Settings',
        map: (<NueSettings></NueSettings>),
		icon: BsGearFill
    },
]

function App() {

    document.body.style.overflow = "hidden" //no more scrolly wolly
    document.body.style.height = '100%'

    const backgroundColor = useColorModeValue("gray.10", "blackAlpha.600");
    const primaryColor = useColorModeValue("orange.300", "orange.200");
    const secondaryColor = useColorModeValue("lime", "lime");
    const superColor = useColorModeValue('grey.700', 'grey.50');

    colors.primaryColor = primaryColor;
    colors.secondaryColor = secondaryColor;
    colors.backgroundColor = backgroundColor;
    colors.super = superColor;

	return (
        <>
            <ChakraProvider theme={theme}>
                
                <Navbar tabs={tabIds}/>
            </ChakraProvider>
        </>
	);
}

export default App;