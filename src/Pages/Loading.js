import React, {Component} from 'react';
import LoadingSVG from '../Assets/resolved/loadingsvg'

export default class Loading extends Component {
    render() {
        return( 
            <div className="LoadingContainer">
                <LoadingSVG/>
            </div> 
        )
    }
}
