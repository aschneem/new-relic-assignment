import React, { useState, useEffect } from 'react';
import Customer from './Customer.jsx';

const ResultGrid = (props) => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        let ignore = false;
        const fetchCustomers = async () => {
            try{
                const response = await fetch('http://localhost:5000/customers?'+props.query);
                if (!ignore){
                    const jsonData = await response.json();
                    await setCustomers((prevState) => {
                        return jsonData
                    });
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            return () => ignore = true;
        };
        fetchCustomers();
    }, [props.query]);

  return (
    <div>
        {customers.map(customer => {
            return (<Customer key={customers['_id']} data={customer} />);
        })}
    </div>
  );
}

export default ResultGrid;
