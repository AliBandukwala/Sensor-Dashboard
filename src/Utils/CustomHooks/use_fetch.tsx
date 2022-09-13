import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../Assets/consts"


export default function useFetch(url: string){

    const [data,setData] = useState<any>(null)
    const [error,setError] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(BASE_URL+url)
                    setData(response.data)
                }catch(err){
                    setError(true)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, loading, error, setData }
}