import axios from "axios";

//Create Quests
export const createQuests = async (token, values) =>{
    return await axios.post(import.meta.env.VITE_APP_API + `/createQuests`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get List Quest
export const getListQuests = async (token) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListQuests`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Quest By ID
export const getQuestByID = async (token, id) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getQuestById/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Update Quest
export const updateQuest = async (token, values) =>{
    return await axios.put(import.meta.env.VITE_APP_API + `/updateQuests`, values,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Remove Quest
export const removeQuest = async (token, id) =>{
    return await axios.delete(import.meta.env.VITE_APP_API + `/removeQuests/` + id,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}