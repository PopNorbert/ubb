import { Button } from "react-bootstrap"
import { balls as constants} from "./constants"
import React, { useState } from "react"
import { Link } from "react-router-dom"

const MainPage = () =>
{
    const [balls,setBalls] = useState(constants)
    const [dummyBall, setDummyBall] = useState({ id: "", name: "", brand: "", color: "" })
    const handleDelete = (ball) =>
    {
        const updatedBalls = balls.filter(b => b.id!=ball.id)
        setBalls(updatedBalls)
    }
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
            </div>
            </div>
        </div>
    )
}

export default MainPage