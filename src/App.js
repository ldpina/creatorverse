import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/showCreators'
import AddCreator from './pages/addCreator'
import EditCreator from './pages/editCreator'
import ViewCreator from './pages/viewCreator'
import { supabase } from './client'
import './App.css'
import { Link } from 'react-router-dom';


const App = () => {

  const [creators, setCreators] = useState([])

  useEffect(() => {
    
    const fetchCreators = async () => {
      const {data} = await supabase
      .from('creators')
      .select()
      .order('created_at', { ascending: true })

      setCreators(data)
    }

    fetchCreators()
  }, [])


 let element = useRoutes([
   { path: "/", element: <ShowCreators data={creators} /> },
   { path: "/creators/:id/edit", element: <EditCreator data={creators} /> },
   { path: "/new", element: <AddCreator /> },
   { path: "/creators/:id", element: <ViewCreator data={creators} /> }
 ])

  
  return ( 

    <div className="App">

      <header>
        <h1>Creatorverse</h1>
        <nav>
          <ul>
            <li><Link to="/" role="button">View All Creators</Link></li>
            <li><Link to="/new" role="button">Add a Creator</Link></li>
          </ul>
        </nav>
      </header>
      
      <main> {element} </main>

    </div>

  )
}

export default App
