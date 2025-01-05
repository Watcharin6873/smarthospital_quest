import axios from "axios"


//Get Hospital All
export const getListHospitalAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListHospitalAll`)
}

//Get Hospital on province
export const getHospitalOnProv = async (token, province) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getHospitalOnProv/`+ province,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Hospital on Zone
export const getListHospitalOnZone = async (token, zone) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListHospitalOnZone/`+ zone,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}