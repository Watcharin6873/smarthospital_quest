import axios from "axios";

export const getListUsers = async(token)=>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListUsers`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

export const getListUsersByProv = async(token, province)=>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListUsersByProv?province=${province}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

export const getListUsersByZone = async(token, zone)=>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListUsersByZone?zone=${zone}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

export const changeRole = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/changeRole`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


export const changeStatus = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/changeStatus`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


export const changeObjective = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/changeObjective`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


export const removeUser = async (token, id) =>{
    return await axios.delete(import.meta.env.VITE_APP_API + `/removeUser/`+ id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


export const sumApproveUserOnProv = async (token, province) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/sumApproveUserOnProv/`+ province,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

export const sumNotApproveUserOnProv = async (token, province) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/sumNotApproveUserOnProv/`+ province,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}