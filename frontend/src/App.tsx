// import './index.css';

import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, component: Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
