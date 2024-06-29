import React, { useState, useEffect } from "react";

const CompanyFilter = (props) => {
    const DefaultValue = 'All Companies';
    const DefaultEntry = {'key': DefaultValue, 'doc_count': 0}
    const initialFilterValue = new URL(window.location.href).searchParams.get('filter_by_company_name') ?? DefaultValue
    const [filterValue, setFilterValue] = useState(initialFilterValue)
    const [companies, setCompanies] = useState([DefaultEntry]);
    
    useEffect(() => {
        let ignore = false;
        const fetchCompanies = async () => {
            try{
                const response = await fetch('http://localhost:5000/companies');
                if (!ignore){
                    const jsonData = await response.json();
                    await setCompanies((prevState) => {
                        return [DefaultEntry, ...jsonData]
                    });
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            return () => ignore = true;
        };
        fetchCompanies();
    }, []);

    const updateSearchParam = (event) => {
        const value =event.target.value;
        setFilterValue(value);
        const newUrl = new URL(window.location.href);
        if (value == DefaultValue) {
            newUrl.searchParams.delete('filter_by_company_name');
        } else {
            newUrl.searchParams.set('filter_by_company_name', value);
        }
        props.onQueryChange(newUrl.searchParams.toString());
    }

    return (
        <div>
            <label htmlFor="companyFilter">Company Filter:</label>
            <select id="companyFilter" value={filterValue} onChange={(e) => updateSearchParam(e)}>
                {companies.map((company) => {
                    return (
                        <option key={company['key']} value={company['key']} >{company['key']} {company['doc_count'] > 0 ? '('+ company['doc_count'] +')' : '' }</option>
                    );
                })}
            </select>
        </div>
    );
};

export default CompanyFilter;
