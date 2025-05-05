import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Page404 from "./components/Page404";
import { Provider } from "react-redux";
import aapStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import RequestPage from "./components/RequestPage";

function App() {
  return (
    <Provider store={aapStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={<Feed/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/request" element={<RequestPage/>}/>

          <Route path="/*" element={<Page404/>}/>
      
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
