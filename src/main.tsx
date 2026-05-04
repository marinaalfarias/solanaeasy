import { createRoot } from ';
import App from './app/App.tsx';
import './styles/index.css';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}