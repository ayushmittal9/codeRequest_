import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { legacy_createStore as createstore, applyMiddleware, compose } from 'redux';
import {thunk} from "redux-thunk"
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createstore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
    <GoogleOAuthProvider clientId="6653437834-ais27iei9grgd0r7vbpkdmvbq1mqau14.apps.googleusercontent.com">;
      <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);


reportWebVitals();
