import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Note from './components/Note'
import ViewNote from './components/ViewNote'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: 
      <>
        <Navbar />
        <Home />
      </>
    },
    {
      path:"/notes",
      element: 
      <>
        <Navbar />
        <Note />
      </>
    },
    {
      path:"/notes/:id",
      element: 
      <>
        <Navbar />
        <ViewNote />
      </>
    },
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
