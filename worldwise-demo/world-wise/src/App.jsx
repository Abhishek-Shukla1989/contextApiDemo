import { useEffect,useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'

import Product from './pages/product'
import Pricing from './pages/Pricing'
import Homepage from './pages/homepage'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import Form from './components/Form'
import City from './components/City'
import CountryList from './components/CountryList'
import PageNotFound from './pages/PageNotFound'
import { CitiesProvider } from './contexts/CitiesContext'
import {AuthProvider}  from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

export default function App() {


  return (
    <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route path='product' element={<Product/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='app' element={
      <ProtectedRoute><AppLayout/></ProtectedRoute>}>
      <Route index element={<Navigate replace to ='cities'/>}/>
      <Route path='cities' element={<CityList />}/>
      <Route path='countries' element={<CountryList />}/>
      <Route path='cities/:id' element={<City />}/>
      <Route path='form' element={<Form/>}/>
      </Route>
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
      </BrowserRouter>
    </CitiesProvider>
      </AuthProvider>
    
  )
}
