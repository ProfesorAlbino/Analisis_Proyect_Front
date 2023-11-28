import { React, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getLoanBookById, updateLoanBook } from "../../service/LoanBookApi/LoanBookApi";
import { updateLoan } from "../../service/LoanApi/LoanApi";
import { getLoanById } from "../../service/LoanApi/LoanApi";
import { FormatterDateToForms } from '../../scripts/FormatterDate';
import { decryptAES } from '../../scripts/AES-256';
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";

export default function ModifyLoanBook() {

    const { idLoanBook } = useParams();
    const Initdate = useRef();
    const EndDate = useRef();

    const [loan, setLoans] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });

    const [loanBook, setLoanBooks] = useState({
        id: 0,
        idLoan: 0, /*por la respuesta del endpoint del loan*/
        idCopy: 0, /*por localstorage*/
        idLibraryUser: 3, /*por localstorage*/
        title: "",
        photocopyCharge: 0,
        subLibrary: "",
        observation: "",
        limitFines: "",
        state: false
    });

    if (Initdate.current) {
        Initdate.current.addEventListener("change", (e) => {
            if (EndDate.current.value < e.target.value) {
                EndDate.current.value = e.target.value;
            }
        });
    }

    useEffect(() => {
        getLoanBookById(parseInt(decryptAES(idLoanBook)))
            .then((response) => {
                setLoanBooks(response);
                getLoanById(response.idLoan)
                    .then((response) => {
                        setLoans(response);
                    })
            })
    }, [idLoanBook]);

    const handleSubmit = (e) => {
        e.preventDefault();

        loan.endDate = EndDate.current.value;

        Swal.fire({
            title: '¿Estás seguro de Modificar el prestamo?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Modifícalo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                updateLoan(loan);
                updateLoanBook(loanBook)
                    .then(() => {
                        toast.success('Prestamo actualizado exitosamente');
                        setTimeout(() => {
                            window.location.href = "/listLoanBook";
                        }, 1000);
                    });
            }
        })
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Modificar Prestamo</h2>
                <div className="col-4">
                    <a href="/listLoanBook" className="btn btn-primary float-left">Regresar</a>
                </div>
                <div className="container py-4">
                    <div className='row'>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                readOnly
                                required
                                value={loanBook.title}
                                onChange={(e) => setLoanBooks({ ...loanBook, title: e.target.value })}
                            />
                            <label className="form-label ms-2">Título</label>
                        </div>

                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                value={loanBook.photocopyCharge}
                                onChange={(e) => setLoanBooks({ ...loanBook, photocopyCharge: e.target.value })}
                            />
                            <label className="form-label ms-2">Cargo por Fotocopias</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={loanBook.subLibrary}
                                onChange={(e) => setLoanBooks({ ...loanBook, subLibrary: e.target.value })}
                            />
                            <label className="form-label ms-2">Sub Biblioteca</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                max={9999}
                                value={loanBook.limitFines}
                                onChange={(e) => setLoanBooks({ ...loanBook, limitFines: e.target.value })}
                            />
                            <label className="form-label ms-2">Limite de Multas</label>
                        </div>

                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                ref={Initdate}
                                type="date"
                                className="form-control border border-primary"
                                required
                                id="startDate"
                                min={FormatterDateToForms(loan.registerDate)}
                                value={FormatterDateToForms(loan.startDate)}
                                onChange={(e) => setLoans({ ...loan, startDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha inicio</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                ref={EndDate}
                                type="date"
                                id="endDate"
                                className="form-control border border-primary"
                                required
                                min={FormatterDateToForms(loan.startDate)}
                                value={FormatterDateToForms(loan.endDate)}
                                onChange={(e) => setLoans({ ...loan, endDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha de devolución</label>
                        </div>
                        <div className="mb-4 form-floating col-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={loanBook.observation}
                                onChange={(e) => setLoanBooks({ ...loanBook, observation: e.target.value })}
                            />
                            <label className="form-label ms-2">Observaciones</label>
                        </div>
                        <div className="mb-4 ml-4">
                            <input type="submit" className="btn btn-primary me-5" value="Modificar Prestamo" />
                            <button type="reset" className="btn btn-warning">Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>
            <Toaster
                richColors
                position="bottom-center"
            />
        </div>
    );
}
