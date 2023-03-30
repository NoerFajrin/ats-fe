import client from "../res/api/client"

const SuratServices = {
    CreateSurat: async (payload: any) => {
        return await client.post('/surat', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    ListSurat: async () => {
        return await client.get('/surat')
    },
    SuratById : async (id_surat : number | string)=>{ 
        return await client.get(`/surat/${id_surat}`)
    },
}

export default SuratServices