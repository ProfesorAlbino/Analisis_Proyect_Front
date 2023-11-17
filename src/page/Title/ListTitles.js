import React, { useRef, useEffect, useState } from 'react';
import { getAll, deleteTitle } from '../../service/TitlesApi/TitleApi';
import { FormatterDate } from '../../scripts/FormatterDate';
import { FaList, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function ListTitles() {
    const bodyRef = useRef();
    const seach = useRef();
    const [titles, setTitles] = useState([]); // Utiliza useState para manejar titles
    const [show, setShow] = useState(true);
    const userAdmin = true;
    useEffect(() => {

        if (userAdmin) {
            setShow(true);
        } else {
            setShow(false);
        }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        console.log(value);
        const filteredTitles = titles.filter((element) => {
            return element.title1.toLowerCase().includes(value.toLowerCase());
        });
        console.log(filteredTitles);
        setTitles(filteredTitles);
    }

    const handleReset = (e) => {
        e.preventDefault();
        seach.current.value = "";
        getAll()
        .then((result) => {
            setTitles(result); // Actualiza el estado de titles
        })
        .catch(() => {
            console.log("Error al obtener los libros");
        });
    }

    return (
        <div className="container">

            <h1>Listado de libros</h1>
            {show ? <a href="/addTitle" className="btn btn-primary">Agregar Libro</a> : null}
            <nav class="navbar ">
                <div class="container-fluid">
                    <form class="d-flex" role="search" onSubmit={handleSubmit}>
                        <input class="form-control me-2 col-6" type="search" ref={seach} placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success me-2" type="submit">Buscar</button>
                        <button class="btn btn-outline-warning" onClick={handleReset}>Limpiar</button>
                    </form>
                </div>
            </nav>
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
                            {show ? <th colSpan={2}>Acciones</th> : null}
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
                                    {show ?
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

                                        : null}
                                    {show ?
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
                                        : null}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTitles;
