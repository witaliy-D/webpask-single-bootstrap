import style from "../scss/style.scss";
import "bootstrap";


import hello from './hello';

$(document).ready
	(function(){
		hello();
	
});


import React from 'react'
import {render} from 'react-dom'
import Articles from './components/Articles'


render(
<Articles />,
    document.getElementById('content')
);