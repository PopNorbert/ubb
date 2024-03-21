import { Button } from "react-bootstrap"
import { balls as constants} from "./constants"
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

function split(array, n)
{
    const groups = [];
    for (let i = 0; i < array.length; i += n) {
        groups.push(array.slice(i, i + n));
    }
    return groups;
}
const MainPage = () =>
{
    const [showed, setShowed] = useState(3)
    const [groups, setGroups] = useState(split(constants, showed))
    const [page, setPage] = useState(0)
    const [balls,setBalls] = useState(groups[page])
    const [sorted, setSorted] = useState(true)
    const [dummyBall, setDummyBall] = useState({ id: "", name: "", brand: "", color: "" })
    const handleDelete = (ball) =>
    {
        const updatedBalls = balls.filter(b => b.id!=ball.id)
        setBalls(updatedBalls)
    }
    const handleNext = () =>
    {
        if (page<groups.length-1)
        {
            setPage(prevPage => prevPage+1)
            setBalls(groups[page+1])
        }
        
    }
    const handlePrev = () =>
    {
        if (page>0)
        {
            setPage(prevPage => prevPage-1)
            setBalls(groups[page-1])
        }



    }
    const SimpleChart = ({ dataValues }) => {
        const chartData = {
            labels: dataValues.map(e=>e.name),
            datasets: [{
                label: 'Amount',
                data: dataValues.map(e=>e.amount),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    
        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    
        return (
            <div>
                <Bar data={chartData} options={chartOptions} />
            </div>
        );
    };
    const handleAdd = (e) =>
    {
        e.preventDefault()

        const name = e.target.name.value.trim();
        const brand = e.target.brand.value.trim();
        const color = e.target.color.value.trim();
        const newBall = {
            name,
            brand,
            color,
            id: Math.random().toString(36).substring(2, 15), // Generate unique ID
        };
        setBalls([...balls, newBall])
        e.target.name.value = '';
        e.target.brand.value = '';
        e.target.color.value = '';
    }
    const handleEdit = (e) =>
    {
        e.preventDefault()
        
        const id = e.target.id.value.trim();
        const name = e.target.name.value.trim();
        const brand = e.target.brand.value.trim();
        const color = e.target.color.value.trim();
        const thatBall = balls.find(e=>e.id===id)
        setBalls(prevBalls=>{
            const newBalls = prevBalls.slice()
            const ind = prevBalls.indexOf(thatBall)
            if (ind!==-1)
            {
                newBalls[ind] = {id,name,brand,color}
            }
            return newBalls
        })
        e.target.id.value='';
        e.target.name.value = '';
        e.target.brand.value = '';
        e.target.color.value = '';
    }
    const handleDetails = (ball) => 
    {
        setDummyBall(ball)
    }
    const handleSort = () =>
    {
        let sBalls = []
        if(sorted)
        {
            sBalls = [...balls].sort((a,b) => b.id - a.id)
        }
        else{
            sBalls = [...balls].sort((a,b) => a.id - b.id)
        }
        setSorted(!sorted)
        setBalls(sBalls)
    }
    return (
        <div class="container">
            <div class="row">
            <div class="col">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>
                    {balls.map((ball)=> (
                    <tr>
                        <td>{ball.id}</td>
                        <td>{ball.name}</td>
                        <td><button class="btn btn-danger" onClick={() => handleDelete(ball)}>Delete</button></td>
                        <td><button class="btn btn-success" onClick={() => handleDetails(ball)}>Details</button></td>
                    
                    </tr>))}
                </tbody>
            </table>
            <button class="btn btn-warning" onClick={()=>handleSort()}>Sort</button>
            <button class="button" onClick={()=>handlePrev()}>Prev</button>
            <button class="button" onClick={()=>handleNext()}>Next</button>
            <h3>Showing max: {showed}</h3>
            <h3>Page: {page+1}</h3>
            <hr></hr>
            
            
            </div>
            <div class='col'></div>
            <div class="col">
            <div class="row">
                <h1>ID: {dummyBall.id}'s Details</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Color</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{dummyBall.name}</td>
                            <td>{dummyBall.brand}</td>
                            <td>{dummyBall.color}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col w-75">
            <form onSubmit={handleAdd} class="d-flex ">
                <div className="me-2">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter product name" />
                </div>
                <div className="me-2">
                <label htmlFor="brand">Brand:</label>
                <input type="text" id="brand" name="brand" placeholder="Enter brand name" />
                </div>
                <div className="me-2">
                <label htmlFor="color">Color:</label>
                <input type="text" id="color" name="color" placeholder="Enter color" />
                </div>
                <button type="submit" class="btn btn-primary">Add Product</button>
            </form>
            </div>
            <div class="row">
            <form onSubmit={handleEdit} class="d-flex">
            <div className="me-2">
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" name="id" placeholder="Enter product id" />
                </div>
                <div className="me-2">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter product name" />
                </div>
                <div className="me-2">
                <label htmlFor="brand">Brand:</label>
                <input type="text" id="brand" name="brand" placeholder="Enter brand name" />
                </div>
                <div className="me-2">
                <label htmlFor="color">Color:</label>
                <input type="text" id="color" name="color" placeholder="Enter color" />
                </div>
                <button type="submit" class="btn btn-primary">Edit Product</button>
            </form>
            </div>
            <div class="row">
                <SimpleChart dataValues={balls} />
            </div>
            
            </div>
            </div>
        </div>
    )
}

export default MainPage