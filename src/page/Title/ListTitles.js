import React, { useRef, useEffect, useState } from 'react';
import { getAll, deleteTitle } from '../../service/TitlesApi/TitleApi';
import { FormatterDate } from '../../scripts/FormatterDate';
import { FaList, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { decryptAES, encryptAES } from '../../scripts/AES-256';
import Swal from "sweetalert2";
import { Toaster, toast } from 'sonner';


function ListTitles() {
    const bodyRef = useRef();
    const seach = useRef();
    const [titles, setTitles] = useState([]); // Utiliza useState para manejar titles
    const [show, setShow] = useState(true);

    const user = sessionStorage.getItem("user") && JSON.parse(decryptAES(sessionStorage.getItem("user"))).role;
    useEffect(() => {

        if (user === "Estudiante") {
            setShow(false);
        } else if (user === "Admin_Library") {
            setShow(true);
        }else{
            window.location.href = `/`;
        }

        getAll()
            .then((result) => {
                if (result.length === 0) {
                    toast.warning('Ooops,No hay libros registrados');
                    setTimeout(() => {
                        window.location.href = `/addTitle`;
                    }, 1000);
                } else {
                    setTitles(result); // Actualiza el estado de titles
                }
            })
            .catch(() => {
                toast.error('Ooops,Algo salió mal');
            });
    }, []); // Pasa un arreglo vacío como segundo argumento para que useEffect se ejecute solo una vez

    function handleDeleteTitle(id) {
        Swal.fire({
            title: '¿Estás seguro de Eliminar el Libro?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'El Libro ha sido eliminado.',
                    'success'
                )
                deleteTitle(id)
                    .then((result) => {
                        window.location.reload();
                    })
                    .catch(() => {
                        toast.error('Ooops,Algo salió mal');
                    });
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el Libro.',
                        'error'
                    );
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        const filteredTitles = titles.filter((element) => {
            return element.title1.toLowerCase().includes(value.toLowerCase());
        });
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
                toast.error('Ooops,Algo salió mal');
            });
    }

    return (
        <div className="container">

            <h1>Listado de libros</h1>
            <nav className="navbar ">
                <div className="container-fluid">
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input className="form-control me-2 col-6" type="search" ref={seach} placeholder="Título" aria-label="Search" />
                        <button className="btn btn-outline-success me-2" type="submit">Buscar</button>
                        <button className="btn btn-outline-warning" onClick={handleReset}>Limpiar</button>
                    </form>
                </div>
            </nav>
            <div className="row mb-2">
                <div className="col-4 mb-3">
                    <a href="/" className="btn btn-primary float-left">Regresar</a>
                    {show ? <a href="/addTitle" className="btn btn-primary ms-2 float-rigth">Agregar Libro</a> : null}
                </div>
                <table className="table border shadow py-4 mb-5">
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
                                            <a href={`/listCopy/${encryptAES(element.id + "")}`} className="btn btn-primary">
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
                                                <a href={`/editTitle/${encryptAES(element.id + "")}`} className="btn btn-warning">
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
            <Toaster
                richColors
                position='bottom-center' />
        </div>
    );
}

export default ListTitles;
