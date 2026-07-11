import { cocktails_db } from './models'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  

  return (
    <MantineProvider>
    {Object.values(cocktails_db).map((c) => <div key={c.name}>{c.name}</div>)}
    </MantineProvider>
  )
}

export default App
