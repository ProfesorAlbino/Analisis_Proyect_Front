import React, { useRef, useEffect, useState } from 'react';
import { getAll, deleteTitle } from '../../service/TitlesApi/TitleApi';

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
            <div className="py-4">
                <h1>Listado de libros</h1>
                <a href="/addTitle" className="btn btn-primary">Agregar Libro</a>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Nombre del Autor</th>
                            <th>Nombre del Editor</th>
                            <th>Fecha de Publicación</th>
                            <th>ISBN</th>
                            <th colSpan={3}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody ref={bodyRef}>
                        {titles
                            .filter(element => element.active)
                            .map(element => (
                                <tr key={element.id}> {/* Agrega una clave única para cada elemento */}
                                    <td>{element.id}</td>
                                    <td>{element.title1}</td>
                                    <td>{element.personName}</td>
                                    <td>{element.publisherName}</td>
                                    <td>{element.publicationDate}</td>
                                    <td>{element.isbn}</td>
                                    <td>
                                        <a href={`/listCopy/${element.id}`} className="btn btn-primary">
                                            Ver Ejemplares
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`/editTitle/${element.id}`} className="btn btn-warning">
                                            Editar
                                        </a>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDeleteTitle(element.id)}>
                                            Eliminar
                                        </button>
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
