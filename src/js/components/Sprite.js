import React, {Component} from 'react'
import Icon from './Icon';


import alert from './../../img/svg-inline/alert.svg'
import adult from './../../img/svg-inline/adult.svg'





export default class Sprite extends Component {
   render() {
        return (
            <div>
                <Icon glyph={alert.id} {...this.props} />
                <Icon glyph={adult.id} {...this.props} />
            </div>
        )
   }
}




