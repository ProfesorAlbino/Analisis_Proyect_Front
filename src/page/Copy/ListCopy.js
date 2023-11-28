import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, deleteCopy } from '../../service/CopysApi/CopyApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { PiHandCoinsDuotone } from "react-icons/pi";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { encryptAES, decryptAES } from '../../scripts/AES-256';
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";

export default function ListCopy() {
    const { idTitle } = useParams();
    const [copiesList, setCopiesList] = useState([]);
    const [show, setShow] = useState(true);
    const seach = useRef();
    const user = JSON.parse(sessionStorage.getItem("user")).role;
    const idTitles = parseInt(decryptAES(idTitle));


    useEffect(() => {
        if (user === "Estudiante") {
            setShow(false);
        } else if (user === "Admin_Library") {
            setShow(true);
        }

        getAll(idTitles)
            .then((result) => {
                if (result.length === 0) {
                    toast.warning('Ooops,No hay copias registradas');
                    setTimeout(() => {
                        window.location.href = `/addCopy/${idTitle}`;
                    }, 1000);
                } else {
                    setCopiesList(result); // Actualiza el estado de titles
                }
            })
            .catch(() => {
                console.log("Error al obtener los libros");
            });
    }, [idTitles]);

    function handleDeleteCopy(id) {

        Swal.fire({
            title: '¿Estás seguro de Eliminar la copia?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminala!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminada!',
                    'La copia ha sido eliminada.',
                    'success'
                )
                deleteCopy(id)
                    .then((result) => {
                        window.location.reload();
                    })
                    .catch(() => {
                        console.log("Error al eliminar la copia");
                    });
            }
        })
    }

    function handleLoanBook(id, subLibrary) {
        localStorage.setItem("idCopy", id);
        localStorage.setItem("idTitle", idTitle);
        localStorage.setItem("subLibrary", subLibrary);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        const filteredTitles = copiesList.filter((element) => {
            return element.subLibrary.toLowerCase().includes(value.toLowerCase());
        });
        setCopiesList(filteredTitles);
    }

    const handleReset = (e) => {
        e.preventDefault();
        seach.current.value = "";
        getAll(idTitles)
            .then((result) => {
                setCopiesList(result); // Actualiza el estado de titles
            })
            .catch(() => {
                console.log("Error al obtener los libros");
            });
    }

    return (
        <div className='container'>

            <h1>Lista de Copias</h1>
            <nav className="navbar ">
                <div className="container-fluid">
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input className="form-control me-2 col-6" type="search" ref={seach} placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success me-2" type="submit">Buscar</button>
                        <button className="btn btn-outline-warning" onClick={handleReset}>Limpiar</button>
                    </form>
                </div>
            </nav>

            <div className="row">
            <div className="col-4 mb-3">
                    <a href="/listTitles" className="btn btn-primary">Regresar</a>
            {show ? <a href={`/addCopy/${idTitle}`} className="btn btn-primary ms-2">Agregar Copia</a> : null}
                </div>
                <table className="table border shadow mb-5">
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
                                    {show ? <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => handleDeleteCopy(element.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </OverlayTrigger>

                                    </td> : null}
                                    {show ?
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>Editar</Tooltip>}
                                            >
                                                <a href={`/editCopy/${encryptAES(element.id + "")}`} className="btn btn-warning">
                                                    <FaRegEdit />
                                                </a>
                                            </OverlayTrigger>
                                        </td>
                                        : null}
                                    {show ? null :
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>Solicitar Prestamo</Tooltip>}
                                            >
                                                <a onClick={() => { handleLoanBook(encryptAES(element.id + ""), encryptAES(element.subLibrary)) }} href='/loanBook' className="btn btn-info">
                                                    <PiHandCoinsDuotone />
                                                </a>
                                            </OverlayTrigger>
                                        </td>}
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
