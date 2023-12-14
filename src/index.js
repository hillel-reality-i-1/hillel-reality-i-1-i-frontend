import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.scss';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</Provider>
	// </React.StrictMode>
);
