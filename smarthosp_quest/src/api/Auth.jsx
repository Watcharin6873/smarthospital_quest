import axios from "axios";


//Register
export const registerByProviderID = async (values) =>
    await axios.post(import.meta.env.VITE_APP_API + '/registerByProviderID', values)


//Login
export const loginByProviderID = async (values) =>
    await axios.post(import.meta.env.VITE_APP_API + `/loginByProviderID`, values)


//CurrentUser
export const currentUser = async (token) =>
    await axios.post(import.meta.env.VITE_APP_API + '/current-user',
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })


//CurrentAdmin
export const currentAdmin = async (token) =>
    await axios.post(import.meta.env.VITE_APP_API + '/current-admin',
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })


//Get Token HealthID
export const getTokenHealthID = async (values) => {
    return await axios.post(`https://moph.id.th/api/v1/token`, {
        grant_type: values.grant_type,
        code: values.code,
        redirect_uri: values.redirect_uri,
        client_id: values.client_id,
        client_secret: values.client_secret
    },
        {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )
}

//Get token ProviderID
export const getTokenProviderID = async (values) =>{
    return await axios.post(`https://provider.id.th/api/v1/services/token`, values)
}

//Get Provider profile
export const getProviderProfile = async(access_token, client_id, secret_key)=>{
    return await axios.get(`https://provider.id.th/api/v1/services/profile`,
        {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token,
                "client-id": client_id,
                "secret-key": secret_key
            }
        }
    )
}