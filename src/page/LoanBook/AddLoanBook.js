import { React, useState, useEffect } from "react";
import { createLoan } from "../../service/LoanApi/LoanApi";
import { createLoanBook } from "../../service/LoanBookApi/LoanBookApi";
import { getById } from '../../service/TitlesApi/TitleApi';

export default function LoanBook() {

    const idCopy = parseInt(localStorage.getItem("idCopy"));
    const idTitle = localStorage.getItem("idTitle");

    const [loan, setLoans] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });

    const [loanBook, setLoanBooks] = useState({
        id: 0,
        idLoan: 0, /*por la respuesta del endpoint del loan*/
        idCopy: idCopy, /*por localstorage*/
        idLibraryUser: 3, /*por localstorage*/
        title: "",
        photocopyCharge: 0,
        subLibrary: "",
        observation: "",
        limitFines: ""
    });

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        setLoans({ ...loan, registerDate: formattedDate });
        getById(idTitle).then((result) => {
            setLoanBooks({ ...loanBook, title: result.title1 });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createLoan(loan)
            .then((response) => {
                loanBook.idLoan = response.id;
                createLoanBook(loanBook)
                    .then((response) => {
                        console.log(loanBook);
                    }).catch((error) => {
                        console.log("error al crear el loanBook");
                    });
            });
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Solicitar Prestamo</h2>
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
                                onChange={(e) => setLoanBooks({ ...loanBook, photocopyCharge: e.target.value })}
                            />
                            <label className="form-label ms-2">Cargo por Fotocopias</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setLoanBooks({ ...loanBook, subLibrary: e.target.value })}
                            />
                            <label className="form-label ms-2">Sub Biblioteca</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setLoanBooks({ ...loanBook, limitFines: e.target.value })}
                            />
                            <label className="form-label ms-2">Limite de Multas</label>
                        </div>

                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="date"
                                className="form-control border border-primary"
                                required
                                min={loan.registerDate}
                                onChange={(e) => setLoans({ ...loan, startDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha inicio</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="date"
                                className="form-control border border-primary"
                                required
                                min={loan.startDate}
                                onChange={(e) => setLoans({ ...loan, endDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha de devolución</label>
                        </div>
                        <div className="mb-4 form-floating col-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setLoanBooks({ ...loanBook, observation: e.target.value })}
                            />
                            <label className="form-label ms-2">Observaciones</label>
                        </div>
                        <div className="mb-4 ml-4">
                            <input type="submit" className="btn btn-primary me-5" value="Generar Prestamo" />
                            <button type="reset" className="btn btn-warning">Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
