import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()


const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "test123qqwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
  };

  

const intialState = {
	user:null,
	isAuthenticated:false
}

function reducer(state, action)
{
    switch(action.type)
	{
		case "login":
			return {...state, user:action.payload, isAuthenticated:true}

			case "logout":
				return {...state, user:null, isAuthenticated:false}

				default:
					throw new Error("unknown type received")
				
	}
	
}
function AuthProvider({children})
 {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, intialState) 

	function login(email,password)
	{
		console.log(email,password)
		if(email === FAKE_USER.email && password === FAKE_USER.password)
		{
			dispatch({type:"login", payload:FAKE_USER})
		}
      
	}

	function logout()
	{
		dispatch({type:"logout"})

	}
   return <AuthContext.Provider value = {{
	user, isAuthenticated, login,logout
  }}
  >{children}</AuthContext.Provider>
}


function useAuth()
{
  const context = useContext(AuthContext)
  if(context === undefined)
  throw new Error('Context has been used outside provider')
  return context
}
// eslint-disable-next-line react-refresh/only-export-components
export {AuthProvider, useAuth}
