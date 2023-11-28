import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLoanBooksByUser, getLoanBooks, rejectLoanBook, approveLoanBook } from '../../service/LoanBookApi/LoanBookApi'
import { deleteLoan } from '../../service/LoanApi/LoanApi';
import { FormatterDate } from '../../scripts/FormatterDate';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { encryptAES, decryptAES } from '../../scripts/AES-256';
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";


export default function ListLoanBook() {
    const { idUser } = useParams();
    const [loanBook, setLoanBook] = useState([]);
    const [show, setShow] = useState(true);
    const user = JSON.parse(sessionStorage.getItem("user"));

    function changeState(state) {
        let newState = "";
        switch (state) {
            case 0:
                newState = "Pendiente";
                break;
            case 1:
                newState = "Aprobado";
                break;
            case 2:
                newState = "Rechazado";
                break;
            default:
                newState = "Pendiente";
                break;
        }
        return newState;
    }



    useEffect(() => {

        if (user.role === "Admin_Library") {
            setShow(true);
            getLoanBooks()
                .then((response) => {
                    if (response.length === 0) {
                        toast.warning('Ooops,No hay prestamos registrados');
                        setTimeout(() => {
                            window.location.href = `/listTitles`;
                        }, 1000);
                    } else {
                        setLoanBook(response);
                    }
                })
                .catch((error) => {
                    toast.error('Ooops,Algo salió mal');
                });
        } else if (user.role === "Estudiante") {
            setShow(false);
            getLoanBooksByUser(user.idLibraryUser)
                .then((response) => {
                    if (response.length === 0) {
                        toast.warning('Ooops,No tienes prestamos registrados');
                        setTimeout(() => {
                            window.location.href = `/listTitles`;
                        }, 1000);
                    } else {
                        setLoanBook(response);
                    }
                })
                .catch((error) => {
                    toast.error('Ooops,Algo salió mal');
                });
        } else {
            window.location.href = "/";
        }



    }, [idUser]);

    const handleDeleteTitle = (id) => {
        Swal.fire({
            title: '¿Estás seguro de Eliminar el préstamo?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminalo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'El préstamo ha sido eliminado.',
                    'success'
                )
                deleteLoan(id).then(() => {
                    window.location.href = "/listLoanBook";
                });
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el préstamo.',
                        'error'
                    );
            }
        })
    }

    const handleApproveLoanBook = (id) => {

        Swal.fire({
            title: '¿Aprobar el préstamo?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Aprobar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Aprobado!',
                    'El préstamo ha sido aprobado.',
                    'success'
                )
                approveLoanBook(id).then(() => {
                    window.location.href = "/listLoanBook";
                });
            }
        })
    }
    const handleRejectLoanBook = (id) => {

        Swal.fire({
            title: '¿Rechazar el préstamo?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Rechazar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Rechazado!',
                    'El préstamo ha sido rechazado.',
                    'success'
                )
                rejectLoanBook(id).then(() => {
                    window.location.href = "/listLoanBook";
                });
            }
        })
    }

    return (
        <div>
            <h1>Listado de Prestamos</h1>

            <div className="col-4 ml-2">
                <a href="/" className="btn btn-primary float-left ">Regresar</a>
                {show ? null :
                    <a href={`/listTitles`} className="btn btn-primary ms-2">Generar Prestamo</a>}
            </div>
            <div className=" py-4 col-10 offset-1 row">
                <table className="table border shadow mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha de devolucion</th>
                            <th>Biblioteca</th>
                            <th>Estado</th>
                            <th colSpan={4}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanBook
                            .map((loanBook, index) => (
                                <tr key={loanBook.id}>
                                    <td>{index + 1}</td>
                                    <td>{loanBook.title}</td>
                                    <td>{FormatterDate(loanBook.idLoanNavigation.startDate)}</td>
                                    <td>{FormatterDate(loanBook.idLoanNavigation.endDate)}</td>
                                    <td>{loanBook.subLibrary}</td>
                                    <td>{changeState(loanBook.state)}</td>
                                    <td>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Modificar Prestamo</Tooltip>}
                                        >
                                            {(loanBook.state === 1 || loanBook.state === 2) ? (

                                                <button disabled className="btn btn-warning" >
                                                    <a>
                                                        <FaRegEdit />
                                                    </a>
                                                </button>
                                            ) : (
                                                <button className="btn btn-warning" >
                                                    <a href={`/ModifyLoanBook/${encryptAES(loanBook.id + "")}`} className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'>
                                                        <FaRegEdit />
                                                    </a>
                                                </button>
                                            )}

                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            {(loanBook.state === 1 || loanBook.state === 2) ? (
                                                <button disabled className="btn btn-danger" onClick={() => handleDeleteTitle(loanBook.idLoanNavigation.id)}>
                                                    <FaTrashAlt />
                                                </button>
                                            ) : (
                                                <button className="btn btn-danger" onClick={() => handleDeleteTitle(loanBook.idLoanNavigation.id)}>
                                                    <FaTrashAlt />
                                                </button>
                                            )}
                                        </OverlayTrigger>
                                    </td>
                                    {show ?
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Aprobar</Tooltip>}
                                            >

                                                {(loanBook.state === 1 || loanBook.state === 2) ? (
                                                    <button disabled className="btn btn-success" onClick={() => handleApproveLoanBook(loanBook.id)}>
                                                        <IoCheckmarkDone />
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-success" onClick={() => handleApproveLoanBook(loanBook.id)}>
                                                        <IoCheckmarkDone />
                                                    </button>
                                                )}

                                            </OverlayTrigger>
                                        </td> : null}
                                    {show ?
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Rechazar</Tooltip>}
                                            >

                                                {(loanBook.state === 1 || loanBook.state === 2) ? (
                                                    <button disabled className="btn btn-danger" onClick={() => handleRejectLoanBook(loanBook.id)}>
                                                        <IoCloseCircleSharp />
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-danger" onClick={() => handleRejectLoanBook(loanBook.id)}>
                                                        <IoCloseCircleSharp />
                                                    </button>
                                                )}


                                            </OverlayTrigger>
                                        </td> : null}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Toaster
                richColors
                position='bottom-center' />
        </div>
    )
}