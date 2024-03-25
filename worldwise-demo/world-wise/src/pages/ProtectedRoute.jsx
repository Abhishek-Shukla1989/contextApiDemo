import React, { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

	const navigate = useNavigate()
	const {isAuthenticated} = useAuth()
	useEffect(function()
	{
		if(!isAuthenticated) navigate('/')
	},[ isAuthenticated,navigate])

	return isAuthenticated?children:null
}
