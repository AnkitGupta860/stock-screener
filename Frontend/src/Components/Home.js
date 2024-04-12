// Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// This page is for Quote Endpoint Page (Real time)
const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState({});
    const [loader, setLoader] = useState("");
    const navigate = useNavigate();


    // Here we call the api of Quote Endpoint
    const handleSearch = async () => {
        try {
            setLoader(true);
            const response = await axios.get(`http://localhost:7000/search?searchText=${searchText}`);
            console.log(response.data);
            setLoader(false);
            setData(response.data);
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
            <div className="default-stocks">
                <h2 className="default-stocks-title">Default Stocks</h2>
                <table className="stock-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Trading Day</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Price</th>
                            <th>Volume</th>
                            <th>Previous Close</th>
                            <th>Change</th>
                            <th>Change Percent</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {data && Object.keys(data).length > 0 && (
                                <tr>
                                    <td>{data.symbol}</td>
                                    <td>{data.latestTradingDay}</td>
                                    <td>{data.open}</td>
                                    <td>{data.high}</td>
                                    <td>{data.low}</td>
                                    <td>{data.price}</td>
                                    <td>{data.volume}</td>
                                    <td>{data.previousClose}</td>
                                    <td>{data.change}</td>
                                    <td>{data.changePercent}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            {loader && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
        </div>
    );
}

export default Home;
