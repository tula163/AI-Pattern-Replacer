
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import GlobalSnackbarQueue from './components/GlobalSnackbarQueue';



function App() {
  return (
    <>
      <GlobalSnackbarQueue />
      <Routes>

        {routes.map(({ path, component: Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}
      </Routes>
    </>

  );
}

export default App;
