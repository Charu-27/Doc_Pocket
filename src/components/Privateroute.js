import react from 'react'
import {Route,Navigate} from 'react-router-dom'
import { useAuth } from '../../Contexts/Authcontext'


function Privateroute({component:Component, ...rest})
{   const {currentUser,login}=useAuth();
    return (
        <Route {...rest}
            render={props=>{
             currentUser?<Component {...props} /> :<Navigate to={login} />
            }}
        ></Route>
    );
}

export default Privateroute