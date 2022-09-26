import { Box, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

interface inputFieldProps {
    label: string,
    id: string,
    placeholder: string,
    validate: () => string | void
}

export function InputField(props: inputFieldProps) {
    return (
        <Field>
            {
                ({field, form}: {field: any, form: any}) => (
                    <FormControl>
                        <FormLabel>
                            {props.label}
                        </FormLabel>
                        <Input {...field} placeholder={props.placeholder} />
                        <FormErrorMessage>{form.errors[props.id]}</FormErrorMessage>
                    </FormControl>
                )
            }
        </Field>
    )
}

export function RegistrationPage() {
    return (
        <Formik 
        initialValues={{}}
        onSubmit={(values, actions) => {

        }}>
            {(props) => (
                <Form>
                    <InputField id="username" label="username" validate={() => {}} />
                </Form>
            )}
        </Formik>
    )
}