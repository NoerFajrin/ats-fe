import client from "../res/api/client"

const MonitoringService = {
    getPenugasanAverageValue: async (penugasanId: string | number) => {
        return await client.get(`/monitoring/statistic/penugasan?penugasan_id=${penugasanId}`)
    },
    getAlarm: async(status: string | number) =>{
        return await client.get(`/alarm?isRead=${status}`)
    },
    getPenugasanOnGoing : async () => {
        return await client.get(`/statistic/data`)
    },
    getStatisticPersonels : async () => {
        return await client.get(`/statistic/length`)
    },
}

export default MonitoringService