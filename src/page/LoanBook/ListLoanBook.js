import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLoanBooksByUser, getLoanBooks, rejectLoanBook, approveLoanBook } from '../../service/LoanBookApi/LoanBookApi'
import { deleteLoan } from '../../service/LoanApi/LoanApi';
import { FormatterDate } from '../../scripts/FormatterDate';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { encryptAES,decryptAES } from '../../scripts/AES-256';



export default function ListLoanBook() {
    const { idUser } = useParams();
    const [loanBook, setLoanBook] = useState([]);
    const [show, setShow] = useState(true);
    let userAdmin = null;

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
        // userAdmin = localStorage.getItem("userAdmin");
        userAdmin = false;
        console.log(userAdmin);

        if (userAdmin) {
            setShow(true);
            getLoanBooks()
                .then((response) => {
                    setLoanBook(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        } else {
            setShow(false);
            getLoanBooksByUser(idUser)
                .then((response) => {
                    setLoanBook(response);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });
        }



    }, [idUser]);

    const handleDeleteTitle = (id) => {
        deleteLoan(id).then(() => {
            window.location.href = "/listLoanBook/" + 3;
        });
    }

    const handleApproveLoanBook = (id) => {
        approveLoanBook(id).then(() => {
            window.location.href = "/listLoanBook/" + 3;
        });

    }
    const handleRejectLoanBook = (id) => {
        rejectLoanBook(id).then(() => {
            window.location.href = "/listLoanBook/" + 3;
        });
    }

    return (
        <div>
            <h1>Listado de Prestamos</h1>
            {show ? null :
                <a href={`/listTitles`} className="btn btn-primary">Generar Prestamo</a>}
            <div className=" py-4 col-6 offset-3 row justify-content-center">
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
                                            <a href={`/ModifyLoanBook/${encryptAES(loanBook.id+"")}`} className="btn btn-warning">
                                                <FaRegEdit />
                                            </a>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => handleDeleteTitle(loanBook.idLoanNavigation.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                    {show ?
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Aprobar</Tooltip>}
                                            >
                                                <button className="btn btn-success" onClick={() => handleApproveLoanBook(loanBook.id)}>
                                                    <IoCheckmarkDone />
                                                </button>
                                            </OverlayTrigger>
                                        </td> : null}
                                    {show ?
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip>Rechazar</Tooltip>}
                                            >
                                                <button className="btn btn-danger" onClick={() => handleRejectLoanBook(loanBook.id)}>
                                                    <IoCloseCircleSharp />
                                                </button>
                                            </OverlayTrigger>
                                        </td> : null}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}