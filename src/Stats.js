import { useState, useEffect } from 'react';
import axios from "axios";
import { db } from './firebase';

import './Stats.css';
import StatsRow from './StatsRow';


const key = 'c9b6gqiad3idfn1spgm0';

// "https://finnhub.io/api/v1/quote?symbol=AAPL&token=c9b6gqiad3idfn1spgm0"

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;


const Stats = () => {
    const [stockData, setStockData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);

    const getMyStocks = () => {
        db
            .collection('myStocks')
            .onSnapshot(snapshot => {
                let promises = [];
                let tempData = [];
                snapshot.docs.map((doc) => {
                    promises.push(getStocksData(doc.data().ticker)
                        .then(res => {
                            tempData.push({
                                id: doc.id,
                                data: doc.data(),
                                info: res.data
                            })
                        })
                    )
                })
                Promise.all(promises).then(() => {
                    setMyStocks(tempData);
                })
            })
    }


    const getStocksData = (stock) => {
        return axios
            .get(`${BASE_URL}${stock}${KEY_URL}`)
            .catch((error) => {
                console.error("Error", error.message);
            });
    };

    useEffect(() => {
        let tempStocksData = [];
        const stocksList = ['AAPL', 'MFST', 'INFY', 'BABA', 'TSLA', 'META', 'UBER', 'HOOD'];
        getMyStocks();
        let promises = [];
        stocksList.map((stock) => {
            promises.push(
                getStocksData(stock).then((res) => {
                    tempStocksData.push({
                        name: stock,
                        ...res.data
                    });
                })
            );
        })

        Promise.all(promises).then(() => {
            setStockData(tempStocksData);
        });

    }, [])

    return (
        <div className='stats'>
            <div className='stats__container'>
                <div className='stats__header'>
                    <p>Stocks</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__row'>
                        {myStocks.map((stock) => (
                            <StatsRow
                                key={stock.data.ticker}
                                name={stock.data.ticker}
                                share={stock.data.shares}
                                openPrice={stock.info.o}
                                price={stock.info.c}
                            />)
                        )}
                    </div>
                </div>
                <div className='stats__header stats__lists'>
                    <p>Lists</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__row'>
                        {stockData.map((stock) => (
                            <StatsRow
                                key={stock.name}
                                name={stock.name}
                                openPrice={stock.o}
                                price={stock.c}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;