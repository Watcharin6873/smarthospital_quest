import axios from "axios";

//Get Pdf by hcode and category_questId
export const getDocumentsByEvaluateByHosp = async (token, category_questId, hcode) =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getDocumentsByEvaluateByHosp?category_questId=${category_questId}&hcode=${hcode}`,
        {
            headers:{
                Authorization: `Bearer ` + token
            }
        }
    )
}
