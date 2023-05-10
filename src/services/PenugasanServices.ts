import client from "../res/api/client";

const PenugasanServices = {
  CreatePenugasan: async (payload: any) => {
    return await client.post("/penugasan", payload);
  },
  ListPenugasan: async () => {
    return await client.get('/penugasan')
  },
};

export default PenugasanServices
