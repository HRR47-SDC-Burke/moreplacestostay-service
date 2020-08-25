import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rootElement = document.getElementById('app');

render(<App />, rootElement);