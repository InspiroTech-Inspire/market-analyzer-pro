import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Analysis from '@/pages/Analysis';
import Scanner from '@/pages/Scanner';
import Watchlist from '@/pages/Watchlist';
import Settings from '@/pages/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analysis/:symbol" element={<Analysis />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;