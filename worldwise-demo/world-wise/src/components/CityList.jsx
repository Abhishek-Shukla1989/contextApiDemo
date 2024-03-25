import CityItem from './CityItem'
import Message  from './Message';
import styles from './CityList.module.css'
import { useCity } from '../contexts/CitiesContext';
export default function CityList() {

   const {cities,error} = useCity()
   //console.log("cities are", cities)
   if(error)
   return <Message message={error}/>
       if(!cities.length)
    return <Message message={'Add your city now'}/>

  return (
    <ul className={styles.cityList}>{
        cities.map(city=>
            {
               return <CityItem key = {city.id} city ={city}/>
            })
    }</ul>
  )
}


  
//   CityList.propTypes = {
//     cities: PropTypes.arrayOf(
//       PropTypes.shape({
//         city: PropTypes.string.isRequired,
//         // Add more PropTypes for other properties if necessary
//       })
//     ).isRequired,
//   };