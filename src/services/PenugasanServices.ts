import client from "../res/api/client";

const PenugasanServices = {
  CreatePenugasan: async (payload: any) => {
    return await client.post("/penugasan", payload);
  },
};

export default PenugasanServices
