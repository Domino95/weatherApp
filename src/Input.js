import React from 'react';
import './App.css';

const Input = (keyPressed, setcity, city) => {

    return (
        < div className="inputWrapper" >
            <input
                onKeyPress={keyPressed}
                value={city ? city : ""}
                onChange={(e) => setcity(e.target.value)}
                type="text"
                placeholder="Search city...">
            </input>
        </div >
    );
}

export default Input;