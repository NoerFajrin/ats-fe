import client from "../res/api/client"

const PersonelServices = {
    AvailablePersonel : async (start_date : string, end_date : string)=>{ 
        return await client.get(`/personel?start_date=${start_date}&end_date=${end_date}`)
    },
}
export default PersonelServices