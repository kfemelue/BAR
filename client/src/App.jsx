import { useState, useEffect, useContext } from 'react'
import logo from '/reshot-icon-harp-AXFRBY69DW.svg'
//import oops from './assets/Image_fx.jpg'
import './App.css'

function App() {
  const [albums, setAlbums] = useState([]);
  const [showError, setShowError] = useState(false);
  let error_html;
  
  async function getAlbums(){
    try {
      const response = await fetch('http://localhost:3000/');
      const body = await response.json();
      setAlbums(body)
    } catch (error){
      next(error)
    }
  }

  useEffect(()=>{
    getAlbums();
  }, [])

  console.log(albums)

  return (
    <div>
      {(<h1>Hello World</h1>)}
    </div>
  )
}

export default App
