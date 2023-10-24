import React, { useRef, useEffect, useState, Button } from 'react';
import { getAll, deleteTitle } from '../../service/TitlesApi/TitleApi';
import { FormatterDate } from '../../scripts/FormatterDate';
import { FaList, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function ListTitles() {
    const bodyRef = useRef();
    const [titles, setTitles] = useState([]); // Utiliza useState para manejar titles

    useEffect(() => {
        getAll()
            .then((result) => {
                setTitles(result); // Actualiza el estado de titles
            })
            .catch(() => {
                console.log("Error al obtener los libros");
            });
    }, []); // Pasa un arreglo vacío como segundo argumento para que useEffect se ejecute solo una vez

    function handleDeleteTitle(id) {
        deleteTitle(id)
            .then((result) => {
                console.log(result + "Titulo eliminada exitosamente");
                window.location.reload();
            })
            .catch(() => {
                console.log("Error al eliminar la titulo");
            });
    }


    return (
        <div className="container">

            <h1>Listado de libros</h1>
            <a href="/addTitle" className="btn btn-primary">Agregar Libro</a>
            <div className="py-4">
                <table className="table border shadow py-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Nombre del Autor</th>
                            <th>Nombre del Editor</th>
                            <th>Fecha de Publicación</th>
                            <th>ISBN</th>
                            <th>Ver Ejemplares</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody ref={bodyRef}>
                        {titles
                            .filter(element => element.active)
                            .sort((a, b) => a.title1 - b.title1)
                            // .reverse() esto es interesante
                            .map((element, index) => (
                                <tr key={element.id}> {/* Agrega una clave única para cada elemento */}
                                    <td>{index + 1}</td>
                                    <td>{element.title1}</td>
                                    <td>{element.personName}</td>
                                    <td>{element.publisherName}</td>
                                    <td>{FormatterDate(element.publicationDate)}</td>
                                    <td>{element.isbn}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Ejemplares de {element.title1}</Tooltip>}
                                        >
                                            <a href={`/listCopy/${element.id}`} className="btn btn-primary">
                                                <FaList />
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Eliminar</Tooltip>}
                                            >
                                                <button className="btn btn-danger" onClick={() => handleDeleteTitle(element.id)}>
                                                    <FaTrashAlt />
                                                </button>
                                            </OverlayTrigger>
                                        </td>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Editar</Tooltip>}
                                        >
                                            <a href={`/editTitle/${element.id}`} className="btn btn-warning">
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

export default ListTitles;
