import React, { useState } from "react";

export default (props) => {
    const initialSearch = new URL(window.location.href).searchParams.get('search') ?? '';

    const onChange = (event) => {
        const value = event.target.value;
        const newUrl = new URL(window.location.href);
        if (value == '') {
            newUrl.searchParams.delete('search');
        } else {
            newUrl.searchParams.set('search', value);
        }
        props.onQueryChange(newUrl.searchParams.toString());
    };

    return (
        <div>
            <label htmlFor='searchBox'>Customer Search:</label>
            <input type='text' id='searchBox' onChange={onChange} value={initialSearch}/>
        </div>
    );
};