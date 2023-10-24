import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, deleteCopy } from '../../service/CopysApi/CopyApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ListCopy() {
    const { idTitle } = useParams();
    const [copiesList, setCopiesList] = useState([]);
    useEffect(() => {
        getAll(idTitle)
            .then((result) => {
                setCopiesList(result);
                console.log(result);
            })
            .catch(() => {
                console.log("Error al obtener los libros");
            });
    }, [idTitle]);

    function handleDeleteCopy(id) {
        deleteCopy(id)
            .then((result) => {
                console.log(result + "Copia eliminada exitosamente");
                window.location.reload();
            })
            .catch(() => {
                console.log("Error al eliminar la copia");
            });
    }

    return (
        <div>

            <h1>Lista de Copias</h1>
            <a href={`/addCopy/${idTitle}`} className="btn btn-primary">Agregar Copia</a>

            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Secuencia</th>
                            <th>Código de Barras</th>
                            <th>Sub-Biblioteca</th>
                            <th>Descripción</th>
                            <th>Clasificación</th>
                            <th>Colección</th>
                            <th>Estado del Item</th>
                            <th>Notas</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {copiesList
                            .filter(element => element.active) // Filtra los elementos activos
                            .sort((a, b) => a.id - b.id) // Ordena por id
                            .map((element, index) => (
                                <tr key={element.id}>
                                    <td>{index + 1}</td>
                                    <td>{element.sequence}</td>
                                    <td>{element.barcode}</td>
                                    <td>{element.subLibrary}</td>
                                    <td>{element.description}</td>
                                    <td>{element.classification}</td>
                                    <td>{element.collection}</td>
                                    <td>{element.itemStatus}</td>
                                    <td>{element.notes}</td>

                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => handleDeleteCopy(element.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </OverlayTrigger>

                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip>Editar</Tooltip>}
                                        >
                                            <a href={`/editCopy/${element.id}`} className="btn btn-warning">
                                                <FaRegEdit />
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
