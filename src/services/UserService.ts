import client from "../res/api/client"

const UserServices = {
    findUser: async (pageNumber = 1, pageSize = 10, query = '') => {
        // let url = new URL('/user')
        let params = new URLSearchParams()
        params.set('page',pageNumber.toString())
        params.set('limit',pageSize.toString())
        if(query !== ''){
            params.set('search',query)
        }
        const urlParams = params.toString()
        return await client.get(`/user?${urlParams}`)
        
    }
}

export default UserServices