import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import './Gallery.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<div>
		<ToastContainer autoClose={2000}/> 
		<Gallery />
	</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
