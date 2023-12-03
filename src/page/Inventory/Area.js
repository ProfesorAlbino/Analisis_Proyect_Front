import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import { deleteArea, getAreasByIdInventory } from '../../service/InventoryApi/AreaApi';

import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

function Area() {
    const [area, setArea] = useState([]);

    const getArea = async () => {
        await getAreasByIdInventory(localStorage.getItem("idInventory")).then(res => {
            setArea(res);
        }).catch((error) => {
            toast.error('Error al cargar las areas');
            setTimeout(() => {
                window.location.href = "/inventory";
            }, 1000);
        });
    }

    useEffect(() => {
        getArea();
    }, []);

    function deleteAreaS(id) {
        const result = Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el area?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            cancelButtonText: 'No, ¡cancelar!',
            confirmButtonText: 'Si, ¡eliminar!'
        });

        if (!result.isConfirmed) return;

        deleteArea(id);
        getArea();
        window.location.reload();
        toast.success('Area eliminada correctamente');
    }

    function editArea(id) {
        localStorage.setItem("id", id);
        window.location.href = "/inventory/area/create/";
    }

    return (
        <>
            <Button variant="primary" href="/inventory">Regresar</Button>
            <div className='container pt-5'>
                <Button variant="primary" href="/inventory/area/create">Crear area</Button>
                <Table className='border shadow'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Area</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            area.map((area, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{area.area1}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => editArea(area.id)}>Editar</Button>
                                        <Button variant="danger" onClick={() => deleteAreaS(area.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Toaster richColors />
            </div>
        </>
    );
}

export default Area;