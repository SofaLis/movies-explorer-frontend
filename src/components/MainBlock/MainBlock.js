import React from 'react';
import './MainBlock.css';

export default function MainBlock(props) {
    return (
        <section className={`main-block main-block_${props.color}`}>
            <div className="main-block__conteiner" id={props.name}>
                <h3 className="main-block__header">{props.header}</h3>
                {props.children}
            </div>
        </section >
    );
}