import React from 'react';
import './Links.css';

export default function Links(props) {
    return (
        <a className={`link link_${props.name}`} href={`${props.link}`}>
            {props.children}
        </a>
    );
}