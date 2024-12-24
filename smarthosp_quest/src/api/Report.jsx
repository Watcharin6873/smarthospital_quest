import axios from "axios";


export const listHospital = async () =>
    await axios.get(import.meta.env.VITE_APP_API_HOSP+ `/getListHospitals2`)