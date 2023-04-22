import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import './savingStyle.css'

const UserTable = () => {
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
        const response = await axios.get(`http://localhost:8000/api/user/getAll`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getGoal();
  }, []);

  const handleDelete = async (item) => {
    console.log(item)
    const response = await axios.delete(`http://localhost:8000/api/user/delete`, item);
    console.log(response)
    const filtered = filteredData.filter((item) => item._id !== response.data._id);
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
      await axios.put(`http://localhost:8000/api/user/${editedData._id}`, editedData);
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

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.goalName.toLowerCase().includes(keyword) ||
        item._id.toLowerCase().includes(keyword)
    );
    setParam(keyword);
    setFilteredData(filtered);
  };

  return (
    <div className="search-table">
      <Form.Group controlId="search">
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
          <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
            <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.isAdmin}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(item)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGoalName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="goalName"
                value={editedData.name}
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
  );
};

export default UserTable;





