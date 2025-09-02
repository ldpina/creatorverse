import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/showCreators'
import AddCreator from './pages/addCreator'
import EditCreator from './pages/editCreator'
import ViewCreator from './pages/viewCreator'
import './App.css'
import { Link } from 'react-router-dom';


const App = () => {

  const [creators, setCreators] = useState([])

  useEffect(() => {
  const load = async () => {
    const base = process.env.REACT_APP_SUPABASE_URL;
    const key  = process.env.REACT_APP_SUPABASE_ANON_KEY;

    const res = await fetch(`${base}/rest/v1/creators?select=*`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch creators', await res.text());
      return;
    }

    const data = await res.json();
    setCreators(data);
  };

  load();
}, []);


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
