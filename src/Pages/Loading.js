import React, {Component} from 'react';
import LoadingSVG from '../Assets/resolved/loadingsvg'
import {Redirect} from 'react-router-dom';

export default class Loading extends Component {
    render() {
        return( 
            <div className="LoadingContainer"> s
                <LoadingSVG/>
            </div> 
        )
    }
}
