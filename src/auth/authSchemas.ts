import { object, string } from 'yup'

const containsWhitespace = (str: string) => /\s/.test(str);
const startsWithNumber = (str: string) => str ? isNaN(str.charAt(0) as unknown as number) : true;

export const userSignupSchema = object({
    username: string().min(3, 'username length must be greater than 2 characters').max(15, 'username length must be less than 16 characters').test('username', 'username may not contain any whitespace characters', (value) => !containsWhitespace(value!)).test('teststartsnum', 'username may not start with a number', (v) => startsWithNumber(v!)).required('This is a required field'),
    email: string().email('email is malformed or invalid').test('email', 'email may not contain any whitespace characters', (value) => !containsWhitespace(value!)).required('This is a required field'),
    password: string().min(8, 'password length must be greater than 7 characters').max(24, 'password length must be less than 25 characters').test('password', 'password may not contain any whitespace characters', (value) => !containsWhitespace(value!)).test('teststartsnum', 'password may not start with a number', (v) => startsWithNumber(v!)).required('This is a required field'),
    confirmPassword: string().required('This is a required field')
})