import AppRoutes from "./routes";
import './index.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <AppRoutes></AppRoutes>
      <Analytics />
    </>
  );
}

export default App;
