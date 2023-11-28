import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getInventoryType, createInventoryType, updateInventoryType } from '../../service/InventoryApi/InventoryTypeApi';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

function InventoryTypeAdd() {
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea crear un tipo de inventario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            cancelButtonText: 'No, ¡cancelar!',
            confirmButtonText: 'Si, ¡crear!'
        });

        if (!confirm.isConfirmed) {
            return;
        }

        const form = event.target;
        const type = form.type.value;

        const newInventoryType = {
            inventoryId: localStorage.getItem("idInventory"),
            type
        };

        try {
            if (!isEditing) {
                const response = await createInventoryType(newInventoryType);
                console.log(response);
                alert('Tipo de inventario creado exitosamente');
            } else {
                newInventoryType.id = idE;
                const response = await updateInventoryType(newInventoryType);
                console.log(response);
                alert('Tipo de inventario actualizado exitosamente');
            }
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/inventory/inventoryType";
    }

    const getInventoryTypeE = async (id) => {
        const res = await getInventoryType(id);
        if (res) {
            setForm(res);
        }
    }

    const setForm = (inventoryType) => {
        document.getElementById("type").value = inventoryType.type;
    }

    useEffect(() => {
        if (localStorage.getItem("id")) {
            getInventoryTypeE(localStorage.getItem("id"));
            setIsEditing(true);
            setIdE(localStorage.getItem("id"));
            localStorage.removeItem("id");
        }
    }, []);

    return (
        <div className='container pt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="type">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" placeholder="Tipo" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {
                        isEditing ? 'Editar' : 'Crear'
                    }
                </Button>
            </Form>
        </div>
    );
}

export default InventoryTypeAdd;