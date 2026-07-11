import '@mantine/core/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AlphabeticalCocktails } from './AlphabeticalCocktails.tsx'
import { CocktailView } from './Cocktail.tsx'
import { TitlePage } from './TitlePage.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TitlePage />} />
          <Route path="/alphabetical" element={<AlphabeticalCocktails />} />
          <Route path="/cocktail/:cocktailSafeName" element={<CocktailView />} />
          <Route path="*" element={<span>NOT FOUND</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
