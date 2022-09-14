export const credentials = {
    isLoggedIn: false,
    sessionToken: undefined as string | undefined
}

export interface loginCredentials {
    username?: string
    email?: string
    password: string
}

export interface registrationCredentials {
    username: string
    email: string
    password: string
}

export const colors = {
    primaryColor: '',
    secondaryColor: '',
    backgroundColor: '',
    super: '',
}