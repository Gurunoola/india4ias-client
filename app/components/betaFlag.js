import React, { Component } from 'react'
import GlobalStyle from '../globalStyles';

function BetaFlag(props) {
    const { color = 'white', bgColor = "transparent", position = "absolute", fontSize = 'h10' } = props;
    const ret = props.betaFlag ? <>
        <div className='betaFlag'>
            BETA
        </div> <GlobalStyle/></> : undefined
    return ret;
}


export default BetaFlag;