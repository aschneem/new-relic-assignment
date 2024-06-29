import React from 'react';

const Customer = (props) => {
  return (
    <div className='customer'>
        <div>
            <span>Name: </span> {props.data['_source']['name']}
        </div>
        <div>
            <span>Company: </span> {props.data['_source']['company']}
        </div>
        <div>
            <span>First name: </span> {props.data['_source']['first_name']}
        </div>
        <div>
            <span>Last name: </span> {props.data['_source']['last_name']}
        </div>
    </div>
  );
}

export default Customer;
