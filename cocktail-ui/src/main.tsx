import '@mantine/core/styles.css';

import { StrictMode, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { AlphabeticalCocktails } from './AlphabeticalCocktails.tsx';
import { CocktailView } from './Cocktail.tsx';
import { TitlePage } from './TitlePage.tsx';
import { CategorizedCocktails } from './CategorizedCocktails.tsx';
import { SearchResults } from './SearchResults.tsx';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  // useLayoutEffect runs synchronously *before* the browser paints the new route screen, 
  // preventing a jarring visual "flash" from the bottom of the page to the top.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component handles side effects and renders nothing visually
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TitlePage />} />
          <Route path="/alphabetical" element={<AlphabeticalCocktails />} />
          <Route path="/base-ingredients" element={<CategorizedCocktails onlyBaseIngredients={true} />} />
          <Route path="/all-ingredients" element={<CategorizedCocktails onlyBaseIngredients={false}/>} />
          <Route path="/cocktail/:cocktailSafeName" element={<CocktailView />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<span>NOT FOUND</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
