(function () {
    const POSITIVE_COLOR = '#69dd8c';
    const NEGATIVE_COLOR = '#fb6e6e';
    const colors = ['#fbad47', '#43b05d', '#59a7ff'];

    const MIN_DATE = new Date(-8640000000000000);
    const NAV_CHART_ITEM_COUNT = 500;
    const setInterval = (chart, start, end) => chart.xAxis[0].setExtremes(start, end);

    const getAverrage = (array) => array.reduce((res, item) => {
        for (let i = 0; i < item.length; i++) {
            res[i] += item[i] / array.length;
        }
        return res;
    }, new Array(array[0].length).fill(0));

    const getTrendColor = (prev, current) => {
        if (prev === null || prev === undefined || prev <= current) return POSITIVE_COLOR;
        return NEGATIVE_COLOR;
    }

    const formatCurrency = (num, fraction = 2) => num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: fraction,
        minimumFractionDigits: fraction
    });

    const dayToUTCTimestamp = (date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    const convertData = (data) => {
        const navData = [];
        const step = Math.round(data.length / NAV_CHART_ITEM_COUNT);
        let partitialSum = 0;
        for (let i = 0; i < data.length; i++) {
            if (i && (i === data.length - 1 || !(i % step))) {
                const slice = data.slice(i % step && i - step % i || i - step, i);
                const avgData = getAverrage(slice);
                const x = avgData[0];
                const y = avgData[1];
                navData.push({
                    x,
                    y,
                    color: getTrendColor(navData.length > 0 && navData[navData.length - 1].y, y)
                });
            }
        }
        return {
            navData,
            average: Math.floor(navData.reduce((res, value) => res + value.y, 0) / navData.length * 100) / 100
        };
    };

    const onChangeNav = (evt) => {
        console.log('change', evt);
    };

    const createChart = (data) => {
        const meta = convertData(data);
        const chart = Highcharts.stockChart('chart', {
            chart: {
                zoomType: 'x'
            },
            navigator: {
                series: {
                    data: meta.navData,
                    type: 'column',
                    lineWidth: 2
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    events: {
                        setExtremes: onChangeNav
                    }
                }
            },
            tooltip: {
                split: false,
                shared: true,
                useHTML: true,
                backgroundColor: null,
                borderWidth: 0,
                shadow: false,
                valueDecimals: 2,
                headerFormat: `<div class="coinpage-chart-hover-popup">
                                <strong>{point.key}</strong>`,
                pointFormat: '<span><i style="background-color: {point.color}"></i>Market Cap: <b>{point.y} USD</b></span>',
                footerFormat: '</div>',
                positioner: function (boxWidth, boxHeight, point) {
                    return {
                        x: point.plotX - 260,
                        y: point.plotY - 20
                    };
                }
            },
            rangeSelector: {
                enabled: false
            },
            yAxis: {
                opposite: true,
                gridLineColor: 'rgba(0, 0, 0, 0.05)',
                lineColor: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1,
                labels: {
                    format: '${value}',
                    align: 'left',
                    x: 15,
                    style: {
                        fontSize: '9px'
                    }
                },
                plotLines: [{
                    color: 'rgba(0, 0, 0, 0.2)',
                    dashStyle: 'dash',
                    value: meta.average,
                    width: 2,
                    zIndex: 2,
                    label: {
                        useHTML: true,
                        text: `<span class="average-label">$${meta.average}</span>`,
                        align: 'right',
                        y: 0,
                        x: 45
                    }
                }]
            },
            xAxis: {
                lineColor: 'rgba(0, 0, 0, 0.05)',
                minorTickColor: 'rgba(0, 0, 0, 0.05)',
                tickColor: 'rgba(0, 0, 0, 0.05)',
                alternateGridColor: 'rgba(0, 0, 0, 0.015)',
                tickLength: 7,
                labels: {
                    y: 20,
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            series: [{
                name: 'Price',
                color: colors[0],
                data: data
            }]
        });

        document.querySelector('.js-range-selector').addEventListener('change', (evt) => {
            const value = evt.target.value;
            const currentDay = new Date();
            switch (value) {
                case "1d":
                    {
                        const start = new Date(currentDay);
                        start.setDate(currentDay.getDate() - 1);
                        setInterval(
                            chart,
                            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }
                case "7d":
                    {
                        const start = new Date(currentDay);
                        start.setDate(currentDay.getDate() - 7);
                        setInterval(
                            chart,
                            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }
                case "1m":
                    {
                        const start = new Date(currentDay);
                        start.setMonth(currentDay.getMonth() - 1);
                        setInterval(
                            chart,
                            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }
                case "3m":
                    {
                        const start = new Date(currentDay);
                        start.setMonth(currentDay.getMonth() - 3);
                        setInterval(
                            chart,
                            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }
                case "1y":
                    {
                        const start = new Date(currentDay);
                        start.setFullYear(currentDay.getFullYear() - 1);
                        setInterval(
                            chart,
                            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }
                case "ytd":
                    {
                        const start = data[0][0];
                        setInterval(
                            chart,
                            start,
                            Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate())
                        );
                        break;
                    }

            }
        });
    };

    const setGeneralInfo = (data) => {
        document.querySelector('.js-coin-price').textContent = formatCurrency(data.price);
       
        const diffElement = document.querySelector('.js-coin-24diff');
        diffElement.classList.add(`coinpage-info-price${data.price24diff > 0 ? 'up' : 'down'}`);
        diffElement.textContent = data.price24diff.toLocaleString('en-US', {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });

        document.querySelector('.js-market-cap-usd').textContent = formatCurrency(data.marketCap.usd, 0);
        document.querySelector('.js-market-cap-btc').textContent = `${data.marketCap.btc.toFixed(0)} BTC`;

        document.querySelector('.js-volume-usd').textContent = formatCurrency(data.volume.usd, 0);
        document.querySelector('.js-volume-btc').textContent = `${data.volume.btc.toFixed(0)} BTC`;

        document.querySelector('.js-circulating-supply').textContent = `${data.circulating_supply.toFixed(0)} BTC`;
    };

    const extractGeneralInfo = (data) => {
        return {
            marketCap: {
                usd: data.market_cap_by_available_supply[data.market_cap_by_available_supply.length - 1][0],
                btc: data.market_cap_by_available_supply[data.market_cap_by_available_supply.length - 1][1]
            },
            volume: {
                usd: data.volume_usd[data.volume_usd.length - 1][0],
                btc: data.volume_usd[data.volume_usd.length - 1][1]
            },
            circulating_supply: data.market_cap_by_available_supply[data.market_cap_by_available_supply.length - 1][1],
            price: data.price_usd[data.price_usd.length - 1][1],
            price24diff: (data.price_usd[data.price_usd.length - 1][1] / data.price_usd[data.price_usd.length - 2][1]) - 1
        };
    };

    const init = () => {
        const currentDay = new Date();
        const endDay = new Date(currentDay);
        endDay.setFullYear(currentDay.getFullYear() - 1);
        getData(
            'bitcoin',
            dayToUTCTimestamp(currentDay),
            dayToUTCTimestamp(endDay)
        ).then(data => {
            setGeneralInfo(extractGeneralInfo(data));
            createChart(data.price_usd);
        });
    };

    init();
})();