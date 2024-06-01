import { useState } from 'react'
import addNotification from 'react-push-notification'
import './App.css'
import logo from '/icons/192x192.png'

function App() {
  const [count, setCount] = useState(0)

  const clickToNotify = () => {
    setTimeout(() => {
      addNotification({
        title: 'To działa!',
        message: 'To jest treść naszego powiadomienia',
        duration: 4000,
        icon: logo,
        native: true,
      });
    }, 60000); // 60000 milisekund = 1 minuta
  }

  return (
    <>
      <div>
      </div>
      <h1>ReactPWA</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br></br>
        <br></br>
        <button onClick={clickToNotify}> Wyślij powiadomienie </button>
      </div>
    </>
  )
}

export default App
