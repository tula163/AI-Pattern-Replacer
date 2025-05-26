
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';


function App() {
  return (

      <Routes>
        {routes.map(({ path, component: Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}
      </Routes>
  
  );
}

export default App;
