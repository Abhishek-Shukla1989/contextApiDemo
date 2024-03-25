import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react"
import axios from 'axios'

const CityContext = createContext()
const baseURL = "http://localhost:9000/cities"

const initialState = {
  cities:[],
  selectedCity:{},
  isLoading:false,
  error:""
}

function reducer(state, action)
{
  switch(action.type)
  {
     case 'loading':
     return {...state, isLoading:true}

      case 'cities/loaded':
      return {...state, cities:action.payload, isLoading:false }

      case 'city/loaded':
        return {...state, selectedCity:action.payload, isLoading:false }

        case 'city/created':
          return {...state, cities:[...state.cities,action.payload], isLoading:false }
          case 'city/deleted':
            return {...state, cities:state.cities.filter(city=> city.id !== action.payload), isLoading:false }
            case 'error':
              return {...state, isLoading:false}
              case "rejected":
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload,
                }
            default:
              throw new Error("unknown type received")

  }

}
function CitiesProvider({children})
 {
   const [{cities, isLoading, selectedCity,error}, dispatch] = useReducer(reducer, initialState)
   useEffect(function()
   {
   dispatch({type:"loading"})
    axios.get(baseURL).then((response) => {
      if(response?.data)
      {
       dispatch({type:"cities/loaded", payload:response.data})
      }
    }).catch(dispatch({
      type: "rejected",
      payload: "There was an error loading cities...",
    }))
   }, [])
   
const getCity = useCallback( function getCity(id)
{
 // console.log(`${baseURL}/${id}`)
 if(Number(id)=== selectedCity.id) return
  axios.get(`${baseURL}/${id}`).then((response) => {
    if(response?.data)
    {
     // console.log(" is", response)
      dispatch({type:"city/loaded", payload:response.data})

    }
  }).catch(dispatch({
    type: "rejected",
    payload: "There was an error loading city...",
  }))
},[selectedCity.id])

   
async function createCity(data)
{
 // console.log(`${baseURL}/${id}`)
 //send city to server and return success in response
 dispatch({type:"city/created", payload:data})

}

   
async function deleteCity(id)
{
  console.log("ID is", id)
 // console.log(`${baseURL}/${id}`)
 //send city to server and return success in response
 dispatch({type:"city/deleted", payload:id})
}


   return <CityContext.Provider value = {{
   cities, selectedCity, getCity:getCity, isLoading,createCity, deleteCity:deleteCity,error
  }}
  >{children}</CityContext.Provider>
}

function useCity()
{
  const context = useContext(CityContext)
  return context
}
// eslint-disable-next-line react-refresh/only-export-components
export {CitiesProvider, useCity}