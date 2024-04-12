import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// This page is for Timeseries data 
const TimeSeries = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState("")
    const navigate = useNavigate();

    // Here we call the api of Timeseries
    const handleSearch = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`http://localhost:7000/searchTimeSeries?searchText=${searchText}`);
            console.log(response.data);
            setData(response.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.error("Error fetching data:", error);
        }
    }


    return (
        <div className="container">
            <div className="search-wrapper">
                <h1 className="title">Stock Screener</h1>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Enter Company Name'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div className="default-stocks" style={{ maxHeight: '250px' }}>
                <h2 className="default-stocks-title">Default Stocks</h2>
                <div style={{ padding: '12px', maxHeight: '300px', overflowY: 'scroll' }}>
                    <table className="stock-table" >

                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Trading Day</th>
                                <th>Open</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Close</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 && data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.symbol}</td>
                                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                                    <td>{item.open}</td>
                                    <td>{item.high}</td>
                                    <td>{item.low}</td>
                                    <td>{item.close}</td>
                                    <td>{item.volume}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            {loader && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
        </div>
    );
}

export default TimeSeries;
