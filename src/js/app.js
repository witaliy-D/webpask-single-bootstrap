//import "normalize.css"
import "bootstrap";

import React from 'react'
import {render} from 'react-dom'
import Articles from './components/Articles'

import hello from './hello';

import "../scss/style.scss";

$(document).ready
	(function(){
		hello();

});





render(
<Articles />,
    document.getElementById('content')
);
