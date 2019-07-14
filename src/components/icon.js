import React from 'react';
import Icons from '../assets/SVG/icons.svg';

export default function Icon(props) {
  return (
    <svg
      className={'piece_image'}
      fill= {props.fill}
      width='50'
      height='50'
    >
      <use xlinkHref={`${Icons}#${props.svg}`}/>
    </svg>
  )
}
