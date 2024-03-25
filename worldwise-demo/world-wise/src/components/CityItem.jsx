import React from 'react'
import { Link } from "react-router-dom";
import styles from './CityItem.module.css'
import { useCity } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));


export default function CityItem({city}) {
    const {cityName, emoji, date,id,position} = city
    const {selectedCity, deleteCity} = useCity()

    async function handleDeleteAction(e)
    {
       e.preventDefault()
        deleteCity(id)
    }
  //  console.log("currentcity is--",selectedCity)
  return (
    <li>
      <Link className={`${styles.cityItem} ${id === selectedCity.id?styles['cityItem--active']:""}`}  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}> {cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className= {styles.deleteBtn} onClick={handleDeleteAction}>&times;</button>
      </Link>
    </li>
  )
}
