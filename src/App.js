import { Analytics } from '@vercel/analytics/react';
import AppRoutes from "./routes";
import './index.css';

function App() {
  return (
    <>
      <AppRoutes></AppRoutes>
      <Analytics />
    </>
  );
}

export default App;
