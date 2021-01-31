import React from 'react';
import ReactDOM from 'react-dom';
import '@elastic/eui/dist/eui_theme_light.css';
import App from './core/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
