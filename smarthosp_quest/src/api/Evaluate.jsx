import axios from "axios";


//Get Evaluate all
export const getListEvaluateAll = async () =>{
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateAll`)
}

//Get List SubQuest
export const getListSubQuestsForEvaluate = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListSubQuestsForEvaluate/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Save Evaluate
export const saveEvaluates = async (token, values) => {
    return await axios.post(import.meta.env.VITE_APP_API + `/saveEvaluates`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}


//Get Evaluate by hcode
export const getListEvaluateByHosp = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByHosp/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by hcode
export const getEvaluateByHosp = async (token, questId, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateByHosp?questId=${questId}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Sum Evaluate by hcode
export const sumEvaluateByHosp = async (token, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/sumEvaluateByHosp?hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by pProvname
export const getListEvaluateByProv = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByProv/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by pProvname
export const getListEvaluateByZone = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getListEvaluateByZone/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Get Evaluate by id
export const getEvaluateById = async (token, values) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvaluateById/` + values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Get Evaluate by id
export const refreshEvaluate = async (token, category_questId, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/refreshEvaluate?category_questId=${category_questId}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Update point Evaluate
export const updateChoiceEvaluate = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/updateChoiceEvaluate`, values,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//Save documents for Evaluate
export const saveDocuments = async (token, values) => {
    return await axios.post(import.meta.env.VITE_APP_API + `/saveDocuments`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}


//get documents of evaluate
export const getDocumentsFromEvaluate = async (token) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getDocumentsFromEvaluate`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//get documents of evaluate
export const getDocumentByEvaluateByHosp = async (token,values, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getDocumentsByEvaluateByHosp?category_questId=${values}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}


//get Evidence of evaluate
export const getEvidenceFromEvaluate = async (token, id, hcode) => {
    return await axios.get(import.meta.env.VITE_APP_API + `/getEvidenceFromEvaluate?id=${id}&hcode=${hcode}`,
        {
            headers: {
                Authorization: `Bearer ` + token
            }
        }
    )
}

//Save documents for Evaluate
export const uploadFileById = async (token, id, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/uploadFileById/` + id, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
                "Content-Type": "multipart/form-data"
            }
        }
    )
}

//ssj approve 
export const ssjChangeStatusApprove = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/ssjChangeStatusApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}

//ssj approve 
export const zoneChangeStatusApprove = async (token, values) => {
    return await axios.put(import.meta.env.VITE_APP_API + `/zoneChangeStatusApprove`, values,
        {
            headers: {
                Authorization: `Bearer ` + token,
            }
        }
    )
}