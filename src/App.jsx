import { Suspense, lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomePage />
    </Suspense>
  );
}

export default App;
