import './App.css'
import Landing from '../pages/landing'
import Show from '../pages/show'
import Add from '../pages/add'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing/>
    },
    {
      path: '/show',
      element: <Show/>
    },
    {
      path: '/add',
      element: <Add/>
    }
  ])

  return (
        <>
        <RouterProvider router = {router}/>
        </>
  )
}

export default App
