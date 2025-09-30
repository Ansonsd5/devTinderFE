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
import PremiumPage from "./components/PremiumPage";
import Chat from "./components/Chat";
import NoAuthRoute from "./components/NoAuthRoute";
import EmailVeification from "./components/EmailVeification";


function App() {
  // const [open, setOpen] = useState(true);

  return (
    <Provider store={aapStore}>
      <BrowserRouter basename="/">
        
        <Routes>
            <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />

            <Route path="/premium" element={<PremiumPage />} />
            <Route element={<NoAuthRoute />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<NoAuthRoute />}>
              <Route path="verify-email" element={<EmailVeification />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/chat/:chatwithid" element={<Chat />} />

            {/* <Route path="/*" element={<Page404/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
