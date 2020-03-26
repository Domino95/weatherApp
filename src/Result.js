import React from 'react';
import './App.css';


const Result = (object) => {





    return (
        <>
            {object ?
                <div className="result">
                    <h1> {object.name} </h1>
                    <h2>{parseInt(object.main.temp - 273.15)} </h2>
                </div>
                : null}
        </>

    );
}

export default Result;