import numeral from 'numeral'

export const sortItems = (data, type) => {
	const listSort = [...data];
	listSort.sort((a, b) => (a[type] > b[type] ? -1 : 1));
	return listSort;
};

export const drawData = {
	cases: {
		color: 'rgb(0, 0, 255)',
		fillColor: 'rgba(0, 0, 255, 0.5)',
		fillOpacity: 0.4,
		multiplier: 600,
		borderColor: 'rgb(0, 0, 255)',
		backgroundColor: 'rgba(0, 0, 255, 0.5)'
	},

	recovered: {
		color: 'rgb(0, 255, 0)',
		fillColor: 'rgba(0, 255, 0, 0.5)',
		fillOpacity: 0.4,
		multiplier: 800,
		borderColor: 'rgb(0, 255, 0)',
		backgroundColor: 'rgba(0, 255, 0, 0.5)'
	},

	deaths: {
		color: 'rgb(255, 0, 0)',
		fillColor: 'rgba(255, 0, 0, 0.5)',
		fillOpacity: 0.4,
		multiplier: 1000,
		borderColor: 'rgb(255, 0, 0)',
		backgroundColor: 'rgba(255, 0, 0, 0.5)'
	}
};

export const lineChartOptions = {
	legend: {
		display: false,
	},
	element: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					parser: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			}
		],
		yAxes: [
			{

				gridLine: {
					display: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			}
		],
	},
};

export const barChartOptions = {
	legend: {
		display: false,
	},
	element: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				stacked: true
			}
		],
		yAxes: [
			{

				gridLine: {
					display: true,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			}
		],
	},
};