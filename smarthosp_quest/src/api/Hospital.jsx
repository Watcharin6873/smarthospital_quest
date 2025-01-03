import axios from "axios"


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