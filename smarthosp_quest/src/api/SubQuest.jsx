import axios from "axios";

//Create SubQuests
export const createSubQuest = async (token, values) =>{
    return await axios.post(import.meta.env.VITE_APP_API + `/createSubQuest`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get List SubQuest
export const getListSubQuests = async (token) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListSubQuests`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get SubQuest By ID
export const getSubQuestByID = async (token, id) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getSubQuestById/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Update SubQuest
export const updateSubQuest = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/updateSubQuest`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Remove SubQuest
export const removeSubQuest = async (token, id) =>{
    return await axios.delete(import.meta.env.VITE_APP_API + `/removeSubQuest/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}