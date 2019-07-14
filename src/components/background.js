import React from 'react';
import Icon from './icon.js';

export default function Background (props) {
    if ( props.squareValue === 0 ) return null;
    let svg = props.squareValue==='escape' ? 'gates' : 'throne';

    return (
      <div>
        <div className ={'piece_base'}></div>
        <Icon fill={'white'} svg={svg} />
      </div>
  );
}
