import { SIGN_IN, INITIALIZE } from "../types/AuthType"

export const signIn = payload => ({
    type : SIGN_IN,
    payload
})

export const initialize = payload => ({
    type : INITIALIZE,
    payload
})