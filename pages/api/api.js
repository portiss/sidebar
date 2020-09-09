const axios = require('axios')
import json from './sidebar.json'

export const getData = async (url = URL) => {
    try {
        /* const response = await axios.get(url)  ---> option to use real server url data in the future */
        /*   return sorted data by name */
        return json
    }
    catch (error) {
        return error
    }
}
