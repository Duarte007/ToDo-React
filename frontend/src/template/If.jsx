import React from 'react';

export default props => {
    if(!props.test){
        return false;
    } else {
        return props.children;
    }
};