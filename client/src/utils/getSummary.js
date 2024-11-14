import axios from "axios"

export const getSummarization = async (payload) => {
    try{
        const data = await axios.post("http://127.0.0.1:5000/getSummary", {"structure": payload})
        return data.data
    }catch(error){
        console.log(error)
    }
}