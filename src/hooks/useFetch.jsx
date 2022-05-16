import React from "react";
import axios from "axios";

/** //* ()=> useAxios
 * UseFetchAxios es una función que devuelve un 
 * objeto con una propiedad llamada datos, que es una
 * matriz de objetos.
 */
const useFetchAxios =(endpoint)=> {
  const [data, setData] = React.useState([]);

  async function fetchData(){
    const res = await axios.get(endpoint);
    setData(res.data);
  }

  React.useEffect(()=> { 
    try { fetchData() } 
    catch (error) { console.log("[!]\t"+error) } //todo
  },[endpoint])

  return data;

}; export { useFetchAxios, makeFetch };


/** //! ()=> makeFetch
 * Esta función realiza una solicitud de recuperación 
 * al servidor y devuelve la respuesta.
 * @returns Una función que toma 3 parámetros.
 */
const makeFetch =( 
   path="", method="GET", body={} 
)=> {
  const access_token = Cookies.get("access_token");
  const options = { method,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  if (method !== "GET") {
      options.body = JSON.stringify(body);
  }
  if (access_token) {
    options.headers.Authorization = `bearer ${access_token}`;
  }
  return fetch(path, options);
};