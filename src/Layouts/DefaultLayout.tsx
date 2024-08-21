import React from 'react';
import Navbar from '../Components/Navbar';

function DefaultLayout(props) {
    const children = props.children;

    return  <div>
            <Navbar></Navbar>
            {children}
        </div>
    
}

export default DefaultLayout;