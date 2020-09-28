import React, { useState, useEffect } from 'react'
import { Map as LeafletMap, Popup, TileLayer, Circle } from 'react-leaflet'

import { fetchCountriesData } from '../../api'
import { drawData } from '../../util'

import styles from './Map.module.css'

const Map = ({ center, zoom, type }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountriesData());
        }
        fetchAPI();
    }, []);

    const showCircle = () => {
        let result = "";
        if(countries.length > 0) {
            result = countries.map(country => (
                <Circle
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={drawData[type].fillOpacity}
                    color={drawData[type].color}
                    fillColor={drawData[type].fillColor}
                    radius={ Math.sqrt(country.cases) * drawData[type].multiplier }
                >
                    <Popup>
                        <div className={styles.popup}>
                            <div className={styles.flag} style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                            <div className={styles.name}>{country.country}</div>
                            <div className={styles.cases}>Cases: {country.cases}</div>
                            <div className={styles.recovered}>Recovered: {country.recovered}</div>
                            <div className={styles.deaths}>Deaths: {country.deaths}</div>
                        </div>
                    </Popup>
                </Circle>
            ));
        }
        return result;
    }

    return (
        <div className={styles.container}>
            <LeafletMap center={center} zoom={zoom} id={styles.leaflet}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {showCircle()}
            </LeafletMap>
        </div>
    )
}

export default Map

