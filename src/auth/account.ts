import axios from "axios";
import { loginCredentials, registrationCredentials } from "../client/global";
/**
 * 
 * @returns [isOK, errorMessage, pointOfError]
 */
export async function attemptLogin(creds: loginCredentials, callback: (loggedIn: boolean) => void): Promise<[boolean, string, string]> {

    let res = await axios.post('http://localhost:7000/auth/login', creds, {
        headers: {
            "Content-Type": "application/json"
        },
        validateStatus: (status: number) => status < 500
    })

    if (res.status === 200) {
        localStorage.setItem('nue_token', res.headers['nue-token']);
        callback(true);
        return [true, 'OK', 'OK'];
    }
    else if (res.status === 400) {
        return [false, res.data.errorMsg, res.data.pointOfError];
    }
    else {
        throw new Error(`unhandled status code ${res.status}`)
    }
}

export async function attemptRegister(creds: registrationCredentials): Promise<[boolean, string, string]> {
    
    let res = await axios.post('http://localhost:7000/auth/register', creds, {
        headers: {
            "Content-Type": "application/json"
        },
        validateStatus: status => true
    })

    if (res.status === 200) {
        return [true, 'OK', 'OK']
    }
    else if (res.status === 400) {
        console.log(res.data)
        return [false, res.data.errorMsg, res.data.pointOfError]
    }
    else {
        throw new Error(`unhandled status code ${res.status}`)
    }
}