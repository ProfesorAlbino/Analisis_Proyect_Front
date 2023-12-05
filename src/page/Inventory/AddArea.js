import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { createArea, updateArea, getArea } from '../../service/InventoryApi/AreaApi';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

import SuccessMessages from '../../enums/SuccessMessages';
import ErrorMessages from '../../enums/ErrorMessages';

function AreaAdd() {
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No es reversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            cancelButtonText: 'No, ¡cancelar!',
            confirmButtonText: 'Si'
        });

        if (!res.isConfirmed) return;

        const form = event.target;
        const area1 = form.area.value;

        const newArea = {
            inventoryId: localStorage.getItem("idInventory"),
            area1
        };

        try {
            if (!isEditing) {
                await createArea(newArea).then((res) => {
                    toast.success(SuccessMessages.CREATED);
                }).catch((error) => {
                    toast.error(ErrorMessages.SOMETHING_WENT_WRONG);
                });

            } else {
                newArea.id = idE;
                await updateArea(newArea).then((res) => {
                    toast.success(SuccessMessages.UPDATED);
                }).catch((error) => {
                    toast.error(ErrorMessages.SOMETHING_WENT_WRONG);
                });
            }
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            window.location.href = "/inventory/area";
        }, 1000);
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
        <>
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
            <Toaster richColors />
        </>
    );
}

export default AreaAdd;