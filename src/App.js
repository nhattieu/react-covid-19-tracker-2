import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core"
import "leaflet/dist/leaflet.css";

import { 
	Cards, 
	Chart, 
	Map, 
	CountryPicker, 
	Table 
} from "./components";

import { 
	fetchData, 
	fetchCountryData, 
	fetchHistory,
	fetchHistoryCountry
} from './api'

import styles from "./App.module.css";

function App() {

	const [data, setData] = useState({});
	const [history, setHistory] = useState({});
	const [center, setCenter] = useState({lat: 34.80746, lng: -40.4796});
	const [zoom, setZoom] = useState(3);
	const [type, setType] = useState("cases");
	const [countryName, setCountryName] = useState("Worldwide");


	useEffect(() => {
		const fetchAPI = async () => {
			setData(await fetchData());
			setHistory(await fetchHistory());
		}
		fetchAPI();
	}, [])

	const handleCountryChange = async (valueCountry) => {
		const country = await fetchCountryData(valueCountry);
		console.log(country);
		if(!valueCountry || valueCountry === 'worldwide') {
			setCenter({lat: 34.80746, lng: -40.4796});
			setData(await fetchData());
			setHistory(await fetchHistory());
			setZoom(3);
			setCountryName("Worldwide");
		} else {
			setCenter({lat: country.countryInfo.lat, lng: country.countryInfo.long});
			setData(await fetchCountryData(valueCountry));
			setHistory(await fetchHistoryCountry(valueCountry));
			setZoom(4);
			setCountryName(country.country);
		}
	}

	const handleGetType = async (type) => {
		setType(type);
	}


	return (
		<div className={styles.container}>
			<div className={styles.appLeft}>
				<div className={styles.header}>
					<div className={styles.logo}>
						<img src={process.env.PUBLIC_URL + '/logo.png'}  />
					</div>
					<CountryPicker handleCountryChange={handleCountryChange} />
				</div>
				<Cards data={data} handleGetType={handleGetType}/>
				<Map center={center} zoom={zoom} type={type}/>
			</div>
			<div className={styles.appRight}>
				<Card className={styles.card} variant="outlined">
					<CardContent>
						<Table type={type}/>
						<Chart history={history} type={type} countryName={countryName} data={data}/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default App;
