import * as fs from 'fs';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {shell} from 'electron';

/**
 * scope: a comma separated string
 */
interface authenticationParams {
    clientId: string,
    redirectUri: string,
    scope?: string,
    state?: Record<string, string>,
    prompt?: 'none' | 'consent' | 'select_account'
}

const phantasmClientId = '519486068354-9t2f5a66a3rtiuosfpb54v39j8aohh5c.apps.googleusercontent.com'

const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

const phantasmAddress = 'http://localhost:7000/phantasm';

const phantasmEndpoints = {
    youtube: `${phantasmAddress}/phantasm/youtubequery`
}

const phantasmVerificationRoute = `${phantasmAddress}/checkverification`;

const phantasmAuthRoute = `http%3A%2F%2Flocalhost%3A7000%2Fphantasm%2Facceptcode`

function generateUrlForAuthentication(params: authenticationParams) {
    
    let url = `
        ${authEndpoint}?
        ${params.scope ? `scope=${params.scope}` : ''}&
        include_granted_scopes=true&
        response_type=code&
        ${params.prompt ? `prompt=${params.prompt}&` : ''}
        state=${JSON.stringify(params.state)}&
        redirect_uri=${params.redirectUri}&
        client_id=${params.clientId}&
    `

    return url;
}

async function requiresAuth(sessionToken: string) {
    let req = await axios.get(phantasmVerificationRoute, {
        headers: {
            'nue_token': sessionToken
        },
        validateStatus: s => true
    })

    if (req.status === 200) return false;
    if (req.status === 401) return true;
    return undefined;
}

function promptUserAuthentication(sessionToken: string) {
    let url = generateUrlForAuthentication({
        redirectUri: phantasmVerificationRoute,
        clientId: phantasmClientId,
        state: {
            sessionToken: sessionToken
        }
    })

    shell.openExternal(url);
}

export async function getYoutubeVideoBySearchQuery(sessionToken: string, q: string) {

    let reqcheck = await requiresAuth(sessionToken);

    if (reqcheck === undefined) return [false, 'an unexpected error has occured, please try again later'];

    if (reqcheck) promptUserAuthentication(sessionToken);
}

//ytdl('url').pipe(fs.createWriteStream('hello.mp4'))