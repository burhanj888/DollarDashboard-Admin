import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import './savingStyle.css'

const ContributionTable = () => {
  const [data, setData] = useState([]);
  const [param, setParam] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [id, setId] = useState("");
  const [editData, setEditData] = useState(null);
const [showModal, setShowModal] = useState(false);
const [editedData, setEditedData] = useState([]);

const getGoal = async (id) => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const url = id ? `http://localhost:8000/api/contribution/${id}` : `http://localhost:8000/api/contribution`;
      const response = await axios.get(url);
      setData(response.data);
      setFilteredData(response.data);
      if (response.data.length === 0 && id) {
        alert('No data found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    
    // getGoal();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/contribution/${id}`);
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
      await axios.put(`http://localhost:8000/api/contribution/${editedData._id}`, editedData);
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
  };

  const handleContributionSearch = (e) => {
    e.preventDefault();
    getGoal(id);
  }

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.user.toLowerCase().includes(keyword) ||
        item._id.toLowerCase().includes(keyword) ||
        item.goalId.toLowerCase().includes(keyword)
    );
    setParam(keyword);
    setFilteredData(filtered);
  };

  return (
    <div className="search-table">
        <Form onSubmit={handleContributionSearch}>
  <Form.Group controlId="formUserId">
    <Form.Label>User ID</Form.Label>
    <Form.Control
      type="text"
      name="userId"
      value={id}
      onChange={(e) => setId(e.target.value)}
    />
  </Form.Group>
  <Button variant="primary" type="submit">
    Get Data
  </Button>
</Form>
    
      <Form.Group controlId="search">
      <Form.Control
          type="text"
          placeholder="Enter User Name"
          value={param}
          onChange={handleContributionSearch}
        />
        <Form.Control
          type="text"
          placeholder="Search by Goal Name or User ID"
          value={param}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
            <th>Goal Name</th>
            <th>User ID</th>
            <th>Goal ID</th>
            <th>Amount</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredData && filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.goalId}</td>
              <td>{item.user}</td>
              <td>{item._id}</td>
              <td>{item.amount}</td>
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
          <Modal.Title>Edit Contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="formAmount">
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
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContributionTable;





{/* <input type="text" placeholder="Enter parameter" value={param} onChange={(e) => setParam(e.target.value)} /> */}
