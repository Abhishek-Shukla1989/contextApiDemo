import React from 'react'
import styles from './CountryList.module.css'
import Message  from './Message';
import CountryItem from './CountryItem'
import { useCity } from '../contexts/CitiesContext';

function removeDuplicates(array) {
  return array.filter((item, index, self) => 
    index === self.findIndex((t) => (
      t.id === item.id // Customize this condition based on your object properties
    ))
  );
}

export default function CountryList() {

  const {cities} = useCity()
    if(!cities.length)
    return <Message message={'Add your city now'}/>

    const uniqueCities = removeDuplicates(cities)
    console.log('unique contries are', uniqueCities)
    console.log('total countries are ', cities.length)
  return (
    <ul className={styles.countryList}>{
      uniqueCities.map(city=>
            {
               return <CountryItem key = {city.id} country ={city}/>
            })
    }</ul>
  )
}
