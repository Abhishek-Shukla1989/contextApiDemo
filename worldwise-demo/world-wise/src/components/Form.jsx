// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import {useURLPosition} from "../hooks/useURLPosition";
import axios from "axios";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCity } from "../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate()
  const [lat,lng]= useURLPosition()
  const [loading, setIsLoading] = useState(false)
  const [geoCodingErr, setgeoCodingErr] = useState("")
  const {createCity} = useCity()

  async function handleSubmitEvent(e)
  {
    e.preventDefault()
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    //craeate city and insert data in state and navigate to main page of cities
    //we also need to await the method here.
    await createCity(newCity)
    navigate('/app/cities')

  }
useEffect(function()
{
  if(!lat && !lng) return 
  setgeoCodingErr('')
  setIsLoading(true)
  axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`).then((response) => {
   
     console.log(response.data)
     if (!response.data.countryCode)
     throw new Error(
       "That doesn't seem to be a city. Click somewhere else 😉"
     );
     setCityName(response.data.city || response.data.locality)
     setCountry(response.data.country)
     setIsLoading(false)

  }).catch(error=>setgeoCodingErr(error.message));
},[lat,lng])

if(loading) return <Spinner/>
if(!lat && !lng) return <Message message={'Start by clicking somewhere in map'}/> 

if(geoCodingErr) return <Message message={geoCodingErr}/>
  return (
    <form className={styles.form} onSubmit={handleSubmitEvent}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
       <DatePicker selected={date} onChange={(date) => setDate(date)}   dateFormat="dd/MM/yyyy"
/>

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type= 'primary'>Add</Button>
        <Button type= 'back' onClick={(e)=>
          {
            e.preventDefault()
            navigate(-1)
        }}>Back</Button>

      </div>
    </form>
  );
}

export default Form;
