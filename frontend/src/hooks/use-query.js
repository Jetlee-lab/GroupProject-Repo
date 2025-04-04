import { useMemo, useState } from "react"

export default function useQuery(fn, ...args) {
    const [isFetching, setIsFetching] = useState(false)
    const [data, setData] = useState(undefined)
    const [error, setError] = useState(null)
    
    useMemo(async () => {
        try {
            setIsFetching(true)
            // setData(await fn())
            setData(await fn(...args))
        } catch (e) {
            setError(e)
        }
        setIsFetching(false)
    }, [fn, ...args]);

    return { isFetching, error, data }
}