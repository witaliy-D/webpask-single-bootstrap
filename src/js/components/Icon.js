import React, {Component} from 'react'



export default class Icon extends Component {

    render() {
        const {glyph = '', className = 'icon', ...props} = this.props;

        return (
            <svg className={className} {...props}>
                <use xlinkHref={`#${glyph}`} />
            </svg>
        )
    }
}

