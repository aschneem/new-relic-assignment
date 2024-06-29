import CustomerSearch from './components/CustomerSearch.jsx'
import CompanyFilter from  './components/CompanyFilter.jsx'
import ResultGrid from './components/ResultGrid.jsx'
import React, { useState } from 'react';

function App() {
  const [queryParams, setQueryParams] = useState(new URL(window.location.href).searchParams.toString());

  const onQueryChange = (newParams) => {
    setQueryParams(newParams);
    const url = window.location.href;
    const newUrl = new URL(url.split("?")[0] + '?' + newParams);
    history.pushState({}, '', newUrl.toString());
  }

  return (
    <>
      <div className='header'>
        <h1>Customers</h1>
        <div className='actionContainer'>
          <div className='action'>
            <CustomerSearch onQueryChange={onQueryChange}/>
          </div>
          <div className='action'>
            <CompanyFilter onQueryChange={onQueryChange}  />
          </div>
        </div>
      </div>
      <div className='body'>
        <ResultGrid query={queryParams} />
      </div>
    </>
  )
}

export default App
