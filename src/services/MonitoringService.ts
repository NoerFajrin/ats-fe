import client from "../res/api/client"

const MonitoringService = {
    getPenugasanAverageValue: async (penugasanId: string | number) => {
        return await client.get(`/monitoring/statistic/penugasan?penugasan_id=${penugasanId}`)
    }
}

export default MonitoringService