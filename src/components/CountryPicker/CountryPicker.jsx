import React, { useState, useEffect } from 'react'
import { Select, MenuItem } from '@material-ui/core'

import { fetchCountriesData } from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange }) => {

    const [countries, setCountries] = useState([]);
    const [valueCountry, setValueCountry] = useState("worldwide");


    
    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountriesData());
        }
        fetchAPI();
    }, []);
    
    const listCountry = () => {
        let result = '';
        if(countries.length > 0) {
            result = countries.map((country, i) => <MenuItem key={i} value={country.countryInfo.iso2}>{country.country}</MenuItem>);
        }
        return result;
    }

    const handleChange = async (event) => {
        const { value } = event.target;
        setValueCountry(value);
        handleCountryChange(value);

    }

    return (
        <div className={styles.container}>
            <Select className={styles.select} variant="outlined" onChange={handleChange} value={valueCountry}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {listCountry()}
            </Select>
        </div>
    )
}

export default CountryPicker
