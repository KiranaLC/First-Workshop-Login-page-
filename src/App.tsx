import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import LoginSignup from "./components/LoginSignup";
import "./index.css"

function App() {
  const AppRoute = createBrowserRouter([
    {
      path:"/",
      element:< LoginSignup/>
    }
  ])
return (<RouterProvider router={AppRoute}></RouterProvider>);
}

export default App
