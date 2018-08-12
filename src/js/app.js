//import "normalize.css"
import "bootstrap";
import 'font-awesome/css/font-awesome.css'
svg4everybody();

import main from './main'

import React from 'react'
import {render} from 'react-dom'
import Articles from './components/Articles'
import Sprite from './components/Sprite'

import "../scss/style.scss";

render(
  <div>
      <Sprite />
      <Articles />
  </div>,
    document.getElementById('content')
);
