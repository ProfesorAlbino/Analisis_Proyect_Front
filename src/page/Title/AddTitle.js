import React, { useState } from 'react';
import { createTitle } from '../../service/TitlesApi/TitleApi';
import { Toaster, toast } from "sonner";

export default function AddTitle() {
    const [title, setTitle] = useState({
        Id: 0,
        PublisherName: '',
        Header: '',
        TermSubject: '',
        AssociatedDate: '',
        PublicationDate: '',
        Number: 0,
        RestTitle: '',
        PersonName: '',
        Isbn: '',
        Title1: '',
        MentionResponsibility: '',
        Information: '',
        GeneralSubjectSubdivision: '',
        active: true
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        createTitle(title)
            .then((result) => {
                toast.success('Libro creado exitosamente');
                console.log(result);
                setTimeout(() => {
                    window.location.href = `/listTitles`;
                }, 1000);
            })

            .catch(() => {
                toast.error('Ooops,Algo salió mal');
            });
    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Registrar Libro</h2>
                <div className="col-4 mb-3">
                    <a href="/listTitles" className="btn btn-primary float-left">Regresar</a>
                </div>
                <div className="container py-4">
                    <div className='row' >
                        {/* AUTOR */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                id='personName'
                                required
                                onChange={(e) => setTitle({ ...title, PersonName: e.target.value })} />
                            <label className='ms-2 '>Nombre del Autor</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="date"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, AssociatedDate: e.target.value })} />
                            <label className="ms-2 form-label">Fecha asociada al nombre</label>

                        </div>
                        {/* TITULO */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, Title1: e.target.value })} />
                            <label className="ms-2 form-label">Título del Libro</label>

                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, RestTitle: e.target.value })} />
                            <label className="ms-2 form-label">Resto del título</label>

                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, MentionResponsibility: e.target.value })} />
                            <label className="ms-2 form-label">Mención de Responsabilidad</label>

                        </div>
                        {/* PUBLICACION */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="Text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, PublisherName: e.target.value })} />
                            <label className="ms-2 form-label">Nombre del Editor</label>

                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="date"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, PublicationDate: e.target.value })} />
                            <label className="ms-2 form-label">Fecha de Publicación</label>
                        </div>
                        {/* MATERIA */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, TermSubject: e.target.value })} />
                            <label className="ms-2 form-label">Término de Materia</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, GeneralSubjectSubdivision: e.target.value })} />
                            <label className="ms-2 form-label">Subdivición de Materia General</label>
                        </div>
                        {/* ISBN */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, Isbn: e.target.value })} />
                            <label className="ms-2 form-label">ISBN</label>
                        </div>
                        {/* CABECERA */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, Header: e.target.value })} />
                            <label className="ms-2 form-label">Cabecera</label>
                        </div>
                        {/* NUMERO */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input type="number"
                                className="form-control border border-primary"
                                required
                                min="1"
                                pattern='/^[0-9]+$/'
                                onChange={(e) => setTitle({ ...title, Number: e.target.value })} />
                            <label className="ms-2 form-label">Número</label>
                        </div>
                        {/* INFORMACION */}
                        <div className="mb-4 form-floating col-12">
                            <input type="text"
                                className="form-control border border-primary"
                                required
                                onChange={(e) => setTitle({ ...title, Information: e.target.value })} />
                            <label className="ms-2 form-label form-floating">Información</label>
                        </div>

                        <div className="mb-4 ml-4">
                            <button type="submit" className="btn btn-primary me-5">Agregar</button>
                            <button type="reset" className="btn btn-warning">Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>
            <Toaster
                richColors
                position='botton-center'
            />
        </>
    );
};
