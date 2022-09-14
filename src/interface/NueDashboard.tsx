import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import {NueSignup} from '../components/auth/NueSignup';

export default function NueDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log('rendering dashboard');
    
    return isLoggedIn ? null : (<NueSignup callback={setIsLoggedIn} ></NueSignup>)
}