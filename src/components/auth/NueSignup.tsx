import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Spacer } from '@chakra-ui/react';
import {Field, Form, Formik} from 'formik';
import { userSignupSchema } from '../../auth/authSchemas';
import { attemptLogin, attemptRegister } from '../../auth/account';
import { colors, registrationCredentials } from '../../client/global';
import { fieldType, PhormDoc } from './phorm';
import { MdDriveFileRenameOutline, MdEmail, MdPassword } from 'react-icons/md';

const NueForm: React.FC<{callback: (isLoggedIn: boolean) => void}> = (props) => {
    return (
        <Formik
            validationSchema={userSignupSchema}
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            onSubmit={ async (values, actions) => {
                if (values.password !== values.confirmPassword) {
                    actions.setFieldError('confirmPassword', 'passwords do not match')
                }
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
            }}
        >
            {(props: any) => (
                <Form >
                    <Field name='email'>
                        {
                            (x: {field: any, form: any}) => (
                                <FormControl isInvalid={x.form.errors.email}>
                                    <FormLabel>email</FormLabel>
                                        <Input {...x.field} placeholder='input email'></Input>
                                    <FormErrorMessage>{x.form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )
                        }
                    </Field>
                    <Spacer height={'2vh'}/>
                    <Field name='username'>
                        {
                            (x: {field: any, form: any}) => (
                                <FormControl isInvalid={x.form.errors.username}>
                                    <FormLabel>username</FormLabel>
                                    <Input {...x.field} placeholder='input username'></Input>
                                    <FormErrorMessage>{x.form.errors.username}</FormErrorMessage>
                                </FormControl>
                            )
                        }
                    </Field>
                    <Spacer height={'4vh'}/>
                    <Field name='password'>
                        {
                            (x: {field: any, form: any}) => (
                                <FormControl isInvalid={x.form.errors.password}>
                                    <FormLabel>password</FormLabel>
                                    <Input {...x.field} placeholder='input password'></Input>
                                    <FormErrorMessage>{x.form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )
                        }
                    </Field>
                    <Spacer height={'4vh'}/>
                    <Field name='confirmPassword'>
                        {
                            (x: {field: any, form: any}) => (
                                <FormControl isInvalid={x.form.errors.confirmPassword}>
                                    <FormLabel>confirm password</FormLabel>
                                    <Input {...x.field} placeholder='confirm password'></Input>
                                    <FormErrorMessage>{x.form.errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                            )
                        }
                    </Field>
                    <Spacer height={'15vh'}/>
                    <Center>
                        <Button type='submit' isLoading={props.isSubmitting}>Register</Button>
                    </Center>
                </Form>
            )}
        </Formik>
    )
}

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