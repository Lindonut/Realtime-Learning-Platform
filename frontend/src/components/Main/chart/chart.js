import React from 'react'
import { useParams } from 'react-router-dom'
import '../../../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from "react-apexcharts";


const MyChart = () => {
    const [state, setState] = useState({
        options: {
            colors: ["#E91E63"],
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: [1991, 1992, 1993],
            },
        },
        series: [
            {
                name: "People Born",
                data: [30, 40, 45],
            },
        ],
    });
    return (
        <div>
            <h1>ABC</h1>
            <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="80%"
                height="200%"
            />
        </div>
    );
}

export default MyChart