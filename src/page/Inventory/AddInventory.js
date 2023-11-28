import React, { useState, useEffect } from 'react';
import { createInventory, getInventory, updateInventory } from '../../service/InventoryApi/InventoryApi';

import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

import SuccessMessages from '../../enums/SuccessMessages';
import ErrorMessages from '../../enums/ErrorMessages';

function InventoryAdd() {
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const units = form.units.value;
        const description = form.description.value;

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea crear un inventario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            cancelButtonText: 'No, ¡cancelar!',
            confirmButtonText: 'Si, ¡crear!'
        });

        if (!result.isConfirmed) {
            return;
        }


        const newInventory = {
            units,
            description
        };

        try {
            if (!isEditing) {
                const response = await createInventory(newInventory);
                toast.success(SuccessMessages.CREATED);
            } else {
                newInventory.id = idE;
                const response = await updateInventory(newInventory);
                toast.success(SuccessMessages.UPDATED);
            }
        } catch (error) {
            toast.error(ErrorMessages.SOMETHING_WENT_WRONG);
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

    const onClick = () => {
        window.location.href = "/inventory";
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Registrar inventario</h2>
                <div className="container py-4">
                    <div className='row' >
                        {/* UNITS */}
                        <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                id='units'
                                required
                            />
                            <label className='ms-2 '>Unidades</label>
                        </div>
                        {/* DESCRIPTION */}
                        <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                id='description'
                                required />
                            <label className='ms-2 '>Descripción</label>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">{isEditing ? 'Actualizar' : 'Crear'}</button>
                </div>
            </form>
            <div className="my-4 col-lg-12 col-md-12 col-sm-6 col-xs-12">
                <button className="btn btn-primary" onClick={onClick}>
                    Regresar
                </button>
            </div>
            <Toaster richColors />
        </>
    );
}

export default InventoryAdd;