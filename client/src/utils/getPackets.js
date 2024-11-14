import axios from "axios"

export const getPacket = async () => {
    try{
        const data = await axios.get("http://127.0.0.1:5000/getPackages")
        return data.data
    }catch(error){
        console.log(error)
    }
}