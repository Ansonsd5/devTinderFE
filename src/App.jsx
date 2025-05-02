import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Page404 from "./components/Page404";
import { Provider } from "react-redux";
import aapStore from "./utils/appStore";

function App() {
  return (
    <Provider store={aapStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/*" element={<Page404/>}/>
      
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
