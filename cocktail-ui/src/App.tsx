import { cocktails_db } from './models'

function App() {
  

  return (
    <>
    {Object.values(cocktails_db).map((c) => <div key={c.name}>{c.name}</div>)}
    </>
  )
}

export default App
