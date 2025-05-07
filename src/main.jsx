import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import './App.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error('Root element not found!');
} else {
    createRoot(rootElement).render(
        <StrictMode>
            <Router> {/* Wrap App in Router */}
                <App />
            </Router>
        </StrictMode>
    );
}