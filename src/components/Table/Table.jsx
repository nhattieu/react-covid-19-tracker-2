import React, { useState, useEffect } from 'react'

import { fetchCountriesData } from '../../api'
import { sortItems } from '../../util'

import styles from './Table.module.css'

const Table = ({ type }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountriesData());
        };
        fetchAPI();
    }, []);

    const listCountries = () => {
        let result = "";
        if(countries.length > 0) {
            result = sortItems(countries, type).map((country, i) => 
                <tr key={i}>
                    <td>{country.country}</td>
                    <td><strong>{country[type]}</strong></td>
                </tr>)
        };
        return result;
    };



    return (
        <div>
            <h3>{`Live ${type} of countries`}</h3>
            <div className={styles.table}>
                {listCountries()}
            </div>
        </div>
    )
}

export default Table
