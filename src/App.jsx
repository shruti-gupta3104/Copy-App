import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Copy from './components/Copy'
import ViewCopy from './components/ViewCopy'

const router =  createBrowserRouter(
  [
    {
      path: "/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: "/copies",
      element:
      <div>
        <Navbar />
        <Copy />
      </div>
    },
    {
      path: "/copies/:id",
      element:
      <div>
        <Navbar />
        <ViewCopy />
      </div>
    },
    {
      path: "*",
      element:
      <div>
        
      </div>
    }
  ]
)




function App() {
 
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
