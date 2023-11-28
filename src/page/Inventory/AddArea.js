import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { createArea, updateArea, getArea } from '../../service/InventoryApi/AreaApi';

function AreaAdd() {
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const area1 = form.area.value;

        const newArea = {
            inventoryId: localStorage.getItem("idInventory"),
            area1
        };

        try {
            if (!isEditing) {
                const response = await createArea(newArea);
                console.log(response);
                alert('Area creado exitosamente');
            } else {
                newArea.id = idE;
                const response = await updateArea(newArea);
                console.log(response);
                alert('Area actualizado exitosamente');
            }
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/inventory/area";
    }

    const getAreaE = async (id) => {
        const res = await getArea(id);
        if (res) {
            setForm(res);
        }
    }

    function setForm(area) {
        document.getElementById("area").value = area.area1;
    }

    useEffect(() => {
        if (localStorage.getItem("id")) {
            getAreaE(localStorage.getItem("id"));
            setIsEditing(true);
            setIdE(localStorage.getItem("id"));
            localStorage.removeItem("id");
        }
    }, []);

    return (
        <div className='container pt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="area">
                    <Form.Label>Area</Form.Label>
                    <Form.Control type="text" placeholder="Area" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </Form>
        </div>
    );
}

export default AreaAdd;