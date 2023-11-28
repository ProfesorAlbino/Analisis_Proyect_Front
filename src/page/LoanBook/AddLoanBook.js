import { React, useState, useEffect, useRef } from "react";
import { createLoan } from "../../service/LoanApi/LoanApi";
import { createLoanBook } from "../../service/LoanBookApi/LoanBookApi";
import { getById } from '../../service/TitlesApi/TitleApi';
import { encryptAES, decryptAES } from '../../scripts/AES-256';
import { FormatterDateToForms } from '../../scripts/FormatterDate';
import { Toaster, toast } from 'sonner';

export default function LoanBook() {

    const idCopy = parseInt(decryptAES(localStorage.getItem("idCopy")));
    const idTitle = parseInt(decryptAES(localStorage.getItem("idTitle")));
    const subLibrary = decryptAES(localStorage.getItem("subLibrary"));
    const Initdate = useRef();
    const EndDate = useRef();

    const [loan, setLoans] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: new Date().toISOString().split('T')[0],
    });

    const [loanBook, setLoanBooks] = useState({
        id: 0,
        idLoan: 0, /*por la respuesta del endpoint del loan*/
        idCopy: idCopy, /*por localstorage*/
        idLibraryUser: JSON.parse(sessionStorage.getItem("user")).idLibraryUser, /*por localstorage*/
        title: "",
        photocopyCharge: 0,
        subLibrary: subLibrary,
        observation: "",
        limitFines: "",
        state: 0
    });

    if (Initdate.current) {
        Initdate.current.addEventListener("change", (e) => {
            if (EndDate.current.value < e.target.value) {
                EndDate.current.value = e.target.value;
            }
        });
    }

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        // setLoans({ ...loan, registerDate: formattedDate });
        setLoans({ ...loan, startDate: formattedDate });
        getById(idTitle).then((result) => {
            setLoanBooks({ ...loanBook, title: result.title1 });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        loan.endDate = EndDate.current.value;

console.log(loan);

        createLoan(loan)
            .then((response) => {
                loanBook.idLoan = response.id;
                createLoanBook(loanBook)
                    .then((response) => {
                        toast.success('Prestamo solicitado con éxito');
                        setTimeout(() => {
                            window.location.href = "/listLoanBook";
                        }, 1000);
                    }).catch((error) => {
                        toast.error('Ooops,Algo salió mal');
                    });
            }).catch((error) => {
                toast.error('Ooops,Algo salió mal');
            });
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Solicitar Prestamo</h2>
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
                                onChange={(e) => setLoanBooks({ ...loanBook, photocopyCharge: parseInt(e.target.value) })}
                            />
                            <label className="form-label ms-2">Cargo por Fotocopias</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                readOnly
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
                                onChange={(e) => setLoanBooks({ ...loanBook, limitFines: parseInt(e.target.value) })}
                            />
                            <label className="form-label ms-2">Limite de Multas</label>
                        </div>

                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                ref={Initdate}
                                type="date"
                                className="form-control border border-primary"
                                required
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
            <Toaster
                richColors
                position="bottom-center"
            />
        </div>
    );
}
