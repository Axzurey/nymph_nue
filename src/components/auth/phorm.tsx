import { Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spacer } from "@chakra-ui/react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import { IconType } from "react-icons"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { OptionalObjectSchema } from "yup/lib/object"
import { spreadNestedKey } from "../../client/phi"

export enum fieldType {
    text='text',
    password='password',
    radio='radio',
    dropdown='dropdown',
    date='date',
    checkbox='checkbox',
    color='color'
}

interface fieldOut {
    [fieldType.text]: string,
    [fieldType.password]: string,
    [fieldType.radio]: number //the index of the item that got clicked, maybe use string?
    [fieldType.dropdown]: number //^
    [fieldType.date]: Date,
    [fieldType.checkbox]: boolean,
    [fieldType.color]: string //a hex string
}

interface formField {
    name: string
    identifier: string
    placeholderText: string
    required?: boolean
    icon?: IconType,
    fieldType?: fieldType
}

interface formDoc<T extends formField[]> {
    validationSchema?: OptionalObjectSchema<any, any, any>
    onSubmit: (
        values: {[key in spreadNestedKey<T, 'identifier'>]: string}, 
        actions: FormikHelpers<{[key in spreadNestedKey<T, 'identifier'>]: string}>)
         => void
    fields: T
}

interface phormProps<T extends formField[]> {
    doc: formDoc<T>
}

export function PhormDoc<T extends formField[]>(props: phormProps<T>) {

    const doc = props.doc;

    type spreadT = {[key in spreadNestedKey<typeof doc.fields, 'identifier'>]: string}

    const spr = doc.fields.map((v) => {
        return v.identifier
    }) as spreadNestedKey<typeof props.doc.fields, 'identifier'>[];

    let initialV = {} as spreadT
    
    spr.forEach((v) => {
        initialV[v] = ''
    })

    return (
        <Formik
            validationSchema={doc.validationSchema}
            initialValues={
                initialV
            }
            onSubmit={ async (values, actions) => {
                doc.onSubmit(values, actions);
            }}
        >
            <Form>
                <Spacer height={'2vh'}/>
                {
                    doc.fields.map((v) => {
                        return (
                        <>
                            <PhormField field={v}></PhormField>
                            <Spacer height={'4vh'}/>
                        </>
                        )
                    })
                }
                <Spacer height={'15vh'}/>
                <Center>
                    <Button type='submit' isLoading={(props as any).isSubmitting}>Register</Button>
                </Center>
            </Form>
        </Formik>
    )
}

function GetJsxFromFieldType(props: {field: formField, x: any}) {
    if (!props.field.fieldType) props.field.fieldType = fieldType.text;

    const [show, setShow] = React.useState(false);

    const handleClick = () => setShow(!show);

    switch (props.field.fieldType) {
        case 'password':

            return (
                <InputGroup>
                    {props.field.icon ? 
                        <InputLeftElement
                            pointerEvents='none'
                            children={
                                (<Icon as={props.field.icon}></Icon>)
                            }
                        /> : undefined}
                        <Input type={show ? 'text' : 'password'} {...props.x.field} placeholder={props.field.placeholderText}/>
                        <InputRightElement>
                            <Button size='sm' onClick={handleClick}>
                                <Icon as={show ? BsFillEyeSlashFill : BsFillEyeFill}></Icon>
                            </Button>
                        </InputRightElement>
                </InputGroup>
            )
        case 'text':
            return (
                <InputGroup>
                    {props.field.icon ? 
                        <InputLeftElement
                            pointerEvents='none'
                            children={
                                (<Icon as={props.field.icon}></Icon>)
                            }
                        /> : undefined}
                        <Input {...props.x.field} placeholder={props.field.placeholderText}/>
                </InputGroup>
            )
        default:
            throw new Error(`unhandled fieldType ${fieldType}`)
    }
}

const PhormField: React.FC<{field: formField}> = (props) => {
    return ( 
        <>
        <Field name={props.field.name}>
            {
                (x: any) => (
                    <FormControl isRequired={props.field.required} isInvalid={x.form.errors[props.field.identifier]}> 
                        <FormLabel>{props.field.name}</FormLabel>
                            <InputGroup>
                                <GetJsxFromFieldType field={props.field} x={x}></GetJsxFromFieldType>
                            </InputGroup>
                        <FormErrorMessage>{x.form.errors[props.field.identifier]}</FormErrorMessage>
                        <FormHelperText></FormHelperText>
                    </FormControl>
                )
            }
        </Field>
        </>
    )
}