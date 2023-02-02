import { useEffect, useState } from 'react'
import axios from "axios";


// custom hook

const UserFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    setLoading(true)
    axios.get(url).then((response) => {
      if (!response.statusText == "OK" && response.status === 200)
        throw Error("could not fetch the data ")

      setdata(response?.data)
    }).catch((err) => {
      setError(err.message)
    }).finally(() => {
      setLoading(false)
    })

  }, [url]);
  return { data, loading, error }
}

export default UserFetch
