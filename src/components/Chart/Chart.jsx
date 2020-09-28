import React from "react";
import { Line, Bar } from "react-chartjs-2";
import numeral from 'numeral'

import { 
	drawData,
	lineChartOptions,
	barChartOptions
} from "../../util";

import styles from "./Chart.module.css";

const Chart = ({ history, type, countryName, data }) => {

	const lineChart = () => {
		let result = "";
		let charData = [];
		let lastPoint;

		for (let date in history[type]) {
			if(lastPoint) {
				let newDataPoint = {
					x: date,
					y: history[type][date] - lastPoint,
				};
				charData.push(newDataPoint);
			}
			lastPoint = history[type][date];
        }
        

		if (charData.length > 0) {
			result = (
				<div>
					<Line
						data={{
							labels: charData.map((data) => data.x),
							datasets: [
								{
									data: charData.map((data) => data.y),
									label: "People",
									borderColor: `${drawData[type].borderColor}`,
									backgroundColor: `${drawData[type].backgroundColor}`,
								},
							],
						}}
						options={lineChartOptions}
					/>
				</div>
			);
		}
		return result;
	};

	const barChart = () => {
		let result = '';
		if(data) {
			result = (
				<div>
					<Bar
						data={{
							labels: ["Cases", "Recovered", "Deaths"],
							datasets: [{
								barPercentage: 0.5,
								barThickness: 20,
								maxBarThickness: 20,
								minBarLength: 2,
								label: "People",
								backgroundColor: [drawData['cases'].backgroundColor, drawData['recovered'].backgroundColor, drawData['deaths'].backgroundColor],
								data: [data.cases, data.recovered, data.deaths]
							}]
						}}
						options={barChartOptions}
					/>
				</div>
			);
		};
		return result;
	}


	return (
		<div className={styles.container}>
			<div className={styles.barChart}>
				<h3>{`Bar chart of ${countryName}`}</h3>
				<div className={styles.chart}>{history ? barChart() : 'No data timeline'}</div>
			</div>
			<div className={styles.lineChart}>
				<h3>{`Line chart ${type} of ${countryName} (30 days)`}</h3>
				<div className={styles.chart}>{history ? lineChart() : 'No data timeline'}</div>
			</div>
		</div>
	);
};

export default Chart;
