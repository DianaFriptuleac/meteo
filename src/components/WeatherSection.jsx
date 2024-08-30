import { useEffect } from "react";

const WeatherSection = ({weather}) =>{
    const [mymeteo, setMymeteo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [meteoSelected, setMeteoselected] = useState(null);
   


const mycities = [
    "Roma,it", "Milano,it", "Napoli,it", "Torino,it", "Palermo,it", "Genova,it", "Bologna,it", "Firenze,it", "Bari,it", 
    "Catania,it", "Verona,it", "Venezia,it", "Messina,it", "Padova,it", "Trieste,it", "Taranto,it", "Brescia,it", 
    "Parma,it", "Prato,it", "Modena,it", "Reggio Calabria,it", "Reggio Emilia,it", "Perugia,it", "Livorno,it", 
    "Ravenna,it", "Cagliari,it", "Foggia,it", "Rimini,it", "Salerno,it", "Ferrara,it"
];

useEffect(() =>{
 fetchMyCities()
},[weather])

    const fetchMyCities = (city) =>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0e171e2bcceba5ec1cddb1c98216ec8`)
        .then((response) =>{
            if (response.ok) {
                return response.json();
              } else {
                throw new Error("LA CHIAMATA NON È ANDATA A BUON FINE!");
              }
        })
        .then((data) => {
            console.log("MY Meteo", data);
            setMymeteo(data.Search || []); 
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("ERRORE NEL RECUPERO DATI", error);
            setIsLoading(false);
            setIsError(true);
          });
    }

    function fetchAllMyCities() {
        const promiseCity = mycities.map(city => fetchMyCities(city));
        Promise.all(promiseCity)
            .then((resp) => {
                console.log("Dati meteo per tutte le città:", resp);
            })
            .catch(error => {
                console.error("Errore nel recuperare i dati meteo:", error);
            });
    }
    fetchAllMyCities()
}
export default WeatherSection