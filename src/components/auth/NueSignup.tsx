import { Box, Center} from '@chakra-ui/react';
import { attemptLogin, attemptRegister } from '../../auth/account';
import { colors, registrationCredentials } from '../../client/global';
import { fieldType, PhormDoc } from './phorm';
import { MdDriveFileRenameOutline, MdEmail, MdPassword } from 'react-icons/md';

export const NueSignup: React.FC<{callback: (isLoggedIn: boolean) => void}> = (props) => {

    return (
        <Box
        bgColor={colors.super}
        width='100%'
        height='100vh'
        overflow='auto'
        >
            <Center>
                <Box color={colors.secondaryColor} maxWidth='60%' minWidth={'45%'}>
                    <PhormDoc doc={{
                        fields: [
                            {
                                name: 'email',
                                identifier: 'email',
                                placeholderText: 'please enter your email',
                                icon: MdEmail,
                                required: true
                            },
                            {
                                name: 'username',
                                identifier: 'username',
                                placeholderText: 'please enter your desired username',
                                icon: MdDriveFileRenameOutline,
                                required: true
                            },
                            {
                                name: 'password',
                                identifier: 'password',
                                placeholderText: 'please create a password',
                                icon: MdPassword,
                                fieldType: fieldType.password,
                                required: true
                            }
                        ],
                        async onSubmit(_values, actions) {
                            let values = _values as unknown as registrationCredentials;

                            console.log(values)

                            let [isOk, msg, pointOfError] = await attemptRegister(values);
                            
                            if (isOk) {
                                let [ok, err, poe] = await attemptLogin(values, props.callback);
                                if (!ok) {
                                    throw new Error(`temporary error management: ${err}, ${poe}`);
                                }
                            }
                            else {
                                actions.setFieldError(pointOfError, msg)
                            }
                        },
                    }}/>
                </Box>
            </Center>
        </Box>
    )
}

//<NueForm callback={props.callback}></NueForm>