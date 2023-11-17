import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createInventory, getInventory, updateInventory } from '../../service/InventoryApi/InventoryApi';

function InventoryAdd() {
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const units = form.units.value;
        const description = form.description.value;


        const newInventory = {
            units,
            description
        };

        try {
            if (!isEditing) {
                const response = await createInventory(newInventory);
                console.log(response);
                alert('Inventario creado exitosamente');
            } else {
                newInventory.id = idE;
                const response = await updateInventory(newInventory);
                console.log(response);
                alert('Inventario actualizado exitosamente');
            }
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/inventory";
    }

    const getInventorys = async (id) => {
        const res = await getInventory(id);
        if (res) {
            setForm(res);
        }
    }

    const setForm = (inventory) => {
        document.getElementById("units").value = inventory.units;
        document.getElementById("description").value = inventory.description;
    }

    useEffect(() => {
        if (localStorage.getItem("id")) {
            getInventorys(localStorage.getItem("id"));
            setIsEditing(true);
            setIdE(localStorage.getItem("id"));
            localStorage.removeItem("id");
        }
    }, []);

    return (
        <div className='container pt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="units">
                    <Form.Label>Unidades</Form.Label>
                    <Form.Control type="number" placeholder="Unidades" required />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Descripción" required />
                </Form.Group> 
                <Button variant="primary" type="submit">
                    {isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </Form>
        </div>
    );
}

export default InventoryAdd;