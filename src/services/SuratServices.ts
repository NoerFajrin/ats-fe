import client from "../res/api/client"

const SuratServices = {
    CreateSurat: async (payload: any) => {
        return await client.post('/surat', payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export default SuratServices