import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { Header, MainContent, NoMatch } from "./components";

const Home = loadable(() => import('./pages/Home'));
const Admin = loadable(() => import('./pages/Admin'));
const Logout = loadable(() => import('./pages/Logout'));

const App = () => {
  return (
    <>
      <Header />
      <MainContent>
        <Routes>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MainContent>
    </>
  );
};

export default App;