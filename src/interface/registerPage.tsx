import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

interface inputFieldProps {
    label: string,
    id: string,
    placeholder: string,
    validate: () => string | void,
    fieldType?: 'raw' | 'password'
}

export function InputField(props: inputFieldProps) {

    const ftype = props.fieldType || 'raw';
    
    return (
        <Field name={props.id} validate={props.validate}>
            {
                ({field, form}: {field: any, form: any}) => {
                    return (
                        <FormControl isInvalid={form.errors[props.id] && form.touched[props.id]}>
                            <FormLabel>
                                {props.label}
                            </FormLabel>
                            <Input {...field} placeholder={props.placeholder} />
                            <FormErrorMessage>{form.errors[props.id]}</FormErrorMessage>
                        </FormControl>
                    )
                }
            }
        </Field>
    )
}

export function RegistrationPage() {
    return (
        <Formik 
            initialValues={{}}
            onSubmit={(values, actions) => {

            }}
        >
            {(props) => (
                <Form>
                    <InputField placeholder="enter your email" id="email" label="email" validate={() => {}} />
                    <InputField placeholder="enter your username" id="username" label="username" validate={() => {}} />
                    <InputField placeholder="enter your password" id="password" label="password" validate={() => {}} />
                    <Button type="submit">
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    )
}