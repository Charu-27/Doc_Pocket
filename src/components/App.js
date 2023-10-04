import { Container } from "react-bootstrap";
import { AuthProvider } from "../Contexts/Authcontext";
import Signup from "./Signup/Signup"
import Dashboard from "./gdrive/Dashboard"
import Login from "./Login/Login"
import ForgetPassword from "./ForgetPassword/ForgetPassword"
//import Privateroute from "./Privateroute";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import SplashScreen from "./SplashScreen/SplashScreen";


function App() {
  return (<>
   <Container width="50px">
    <AuthProvider>
      <BrowserRouter>
      <Routes>
       <Route index element={<SplashScreen />}></Route>
        <Route path="Signup" element={<Signup />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Dashboard" element={<Dashboard />}></Route>
        <Route path="/folder/:folderId" element={<Dashboard />}></Route>
        <Route path="ForgetPassword" element={<ForgetPassword/>}></Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  
    </Container>

   
  </>
  );
}

export default App;
