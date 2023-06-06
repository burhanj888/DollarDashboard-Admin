import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import './savingStyle.css'
import Header from './Header';

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [param, setParam] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [editData, setEditData] = useState(null);
const [showModal, setShowModal] = useState(false);
const [editedData, setEditedData] = useState([]);


  useEffect(() => {
    const getGoal = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("On saving")
        const response = await axios.get(`http://localhost:8000/api/transaction/getAll`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getGoal();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:8000/api/transaction/admin/${id}`);
    console.log(response);
    const filtered = filteredData.filter((item) => item._id !== id);
    setFilteredData(filtered);
  };

  const handleEdit = (item) => {
    setEditedData(item);
    console.log(item, editedData)
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.put(`http://localhost:8000/api/transaction/admin/${editedData._id}`, editedData);
      const index = data.findIndex((item) => item._id === editedData._id);
      const newData = [...data];
      newData[index] = editedData;
      setData(newData);
      setFilteredData(newData);
    //   setEditedData(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setEditedData({
      ...editedData,
      [event.target.name]: event.target.value
    });
    console.log(editedData)
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.category.toLowerCase().includes(keyword) ||
        item._id.toLowerCase().includes(keyword)
    );
    setParam(keyword);
    setFilteredData(filtered);
  };

  return (
<div>
    <Header></Header>

    <div className="search-table">
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by Category or ID"
          value={param}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>User ID</th>
            <th>Expense ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.category}</td>
              <td>{item.user}</td>
              <td>{item._id}</td>
              <td>{item.amount}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(item)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGoalName">
              <Form.Label>Expense Name</Form.Label>
              <Form.Control
                type="text"
                name="goalName"
                value={editedData.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTarget">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={editedData.amount}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group controlId="formProgress">
              <Form.Label>Progress</Form.Label>
              <Form.Control
                type="number"
                name="progress"
                value={editedData.progress}
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editedData.date}
                // value={new Date(editedData.date).toLocaleDateString()}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
  );
};

export default ExpenseTable;





{/* <input type="text" placeholder="Enter parameter" value={param} onChange={(e) => setParam(e.target.value)} /> */}
