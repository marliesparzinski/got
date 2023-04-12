import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Filters } from "./filters.interface";
import styles from './filter.module.css'

export default function Filters() {
  const { push, query } = useRouter();
  const [ searchParameters, setSearchParameters ] = useState({
    hasSeats: false, hasDiedOut: false, hasTitles: false
  });
  const filters: Filters[] = ['hasSeats', 'hasDiedOut', 'hasTitles'];

  const handleSetParameter = (queryName: Filters) => {
    if (!searchParameters[queryName]) {
      push({query: {...query, [queryName]: true}})
    } else {
      delete query[queryName]
      push({query: query})
    }

    setSearchParameters({
      ...searchParameters, 
      [queryName]: !searchParameters[queryName]
    })
  }

  useEffect(() => {
    setSearchParameters({
      hasSeats: (query.hasSeats === 'true'),
      hasDiedOut: (query.hasDiedOut === 'true'),
      hasTitles: (query.hasTitles === 'true')
    })
  }, [ query])


  return(
    <div className={ styles.filters }>
      { filters.map((filter: Filters) => 
        <div key={filter} className={ styles.filter }>
          <input type="checkbox" id={filter} checked={searchParameters[filter]} onChange={ () => handleSetParameter(filter)}/>
          <label htmlFor={filter}>{filter}</label>
        </div>
      ) }
    </div>);
  
}