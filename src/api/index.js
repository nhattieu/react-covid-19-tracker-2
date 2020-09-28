import axios from 'axios';
import { sortItems } from '../util'

const url = 'https://disease.sh/v3/covid-19';

export const fetchCountriesData = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountryData = async (country) => {
    try {
        const { data } = await axios.get(`${url}/countries/${country}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const fetchData = async () => {
    try {
        const { data } = await axios.get(`${url}/all`);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const fetchHistory = async () => {
    try {
        const { data } = await axios.get(`${url}/historical/all?lastdays=120`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchHistoryCountry = async (country) => {
    try {
        const { data } = await axios.get(`${url}/historical/${country}`);
        return data.timeline;
    } catch (error) {
        console.log(error);
    }
}