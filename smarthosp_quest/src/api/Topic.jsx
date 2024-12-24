import axios from "axios";

//Create Topic
export const createTopic = async (token, values) =>{
    return await axios.post(import.meta.env.VITE_APP_API + `/createCategory`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get List Topic
export const getListTopic = async (token) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListCategory`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get List Topic By ID
export const getTopicByID = async (token, id) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getCategoryById/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Create Topic
export const updateTopic = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/updateCategory`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get List Topic By ID
export const removeTopic = async (token, id) =>{
    return await axios.delete(import.meta.env.VITE_APP_API + `/removeCategory/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}