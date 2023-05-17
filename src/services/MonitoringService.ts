import client from "../res/api/client"

const MonitoringService = {
    getPenugasanAverageValue: async (penugasanId: string | number) => {
        return await client.get(`/monitoring/statistic/penugasan?penugasan_id=${penugasanId}`)
    },
    getAlarm: async() =>{
        return await client.get(`/alarm`)
    },
    getPenugasanOnGoing : async () => {
        return await client.get(`/statistic/data`)
    },
    getStatisticPersonels : async () => {
        return await client.get(`/statistic/personels`)
    },
    getStatisticHealth : async () => {
        return await client.get(`/statistic/anomali`)
    },
    getStatisticHealthbyTime : async() => {
        return await client.get(`/statistic/anomali?many=true`)
    },
}

export default MonitoringService