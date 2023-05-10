import client from "../res/api/client"

const PersonelServices = {
    AvailablePersonel : async (start_date : string, end_date : string)=>{ 
        return await client.get(`/personel?start_date=${start_date}&end_date=${end_date}`)
    },
    ListPersonel: async () => {
        return await client.get('/personel')
    },
    PersonelById : async (id_personel : number | string)=>{ 
        return await client.get(`/surat/${id_personel}`)
    },
}

export default PersonelServices