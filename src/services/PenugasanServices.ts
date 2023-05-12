import client from "../res/api/client";

const PenugasanServices = {
  GetPenugasanById: async (id: string) => {
    return await client.get(`/penugasan/${id}`);
  },
  UpdatePenugasanStatus: async (id: string, status: number) => {
    return await client.put(`/penugasan/${id}`, { status });
  },
  CreatePenugasan: async (payload: any) => {
    return await client.post("/penugasan", payload);
  },
  ListPenugasan: async () => {
    return await client.get("/penugasan");
  },
};

export default PenugasanServices;
