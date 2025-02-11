import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popup from "./pages/Popup";
import Dashboard from "./pages/Dashboard";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Popup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </>
    </>
  );
}

export default App;
