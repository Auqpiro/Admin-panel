import axios from "axios";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, defer } from "react-router-dom";
import { Menu } from "./conponents/Menu";
import { CMDB } from "./pages/CMDB";
import { Servers } from "./pages/Servers";
import { Notfound } from "./pages/Notfound";
import { Homepage } from "./pages/Homepage";

const itemsLoader = async () => {
  const { data } = await axios.get('http://localhost:3001/items');
  return defer({
    items: data,
  })
};

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Menu />}>
    <Route path="cmdb" element={<CMDB />}>
      <Route path="servers" element={<Servers />} loader={itemsLoader}/>
    </Route>
    <Route path="*" element={<Notfound />}></Route>
    <Route index element={<Homepage />}/>
  </Route>
));

function App() {
  return <RouterProvider router={router} />
}

export default App
