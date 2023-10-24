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
                setTimeout(() => {
                    window.location.href = `/listTitles`;
                }, 1000);
            })

            .catch(() => {
                console.log("Error al crear el libro");
            });
        console.log(title);
    };

    return (
        <div>
            <h2 className="text-center">Registrar Libro</h2>
            <div className="container col-6 py-4">
                <form onSubmit={handleSubmit}>
                    {/* AUTOR */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            id='personName'
                            required
                            onChange={(e) => setTitle({ ...title, PersonName: e.target.value })} />
                        <label htmlFor='personName'>Nombre del Autor</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input type="date"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, AssociatedDate: e.target.value })} />
                        <label className="form-label">Fecha asociada al nombre</label>

                    </div>
                    {/* TITULO */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, Title1: e.target.value })} />
                        <label className="form-label">Título del Libro</label>

                    </div>
                    <div className="mb-4 form-floating">
                        <input type="text" className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, RestTitle: e.target.value })} />
                        <label className="form-label">Resto del título</label>

                    </div>
                    <div className="mb-4 form-floating">
                        <input type="text" className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, MentionResponsibility: e.target.value })} />
                        <label className="form-label">Mención de Responsabilidad</label>

                    </div>
                    {/* PUBLICACION */}
                    <div className="mb-4 form-floating">
                        <input type="Text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, PublisherName: e.target.value })} />
                        <label className="form-label">Nombre del Editor</label>

                    </div>
                    <div className="mb-4 form-floating">
                        <input type="date" className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, PublicationDate: e.target.value })} />
                        <label className="form-label">Fecha de Publicación</label>
                    </div>
                    {/* MATERIA */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, TermSubject: e.target.value })} />
                        <label className="form-label">Término de Materia</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input type="text" className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, GeneralSubjectSubdivision: e.target.value })} />
                        <label className="form-label">Subdivición de Materia General</label>
                    </div>
                    {/* ISBN */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, Isbn: e.target.value })} />
                        <label className="form-label">ISBN</label>
                    </div>
                    {/* CABECERA */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, Header: e.target.value })} />
                        <label className="form-label">Cabecera</label>
                    </div>
                    {/* NUMERO */}
                    <div className="mb-4 form-floating">
                        <input type="number"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, Number: e.target.value })} />
                        <label className="form-label">Número</label>
                    </div>
                    {/* INFORMACION */}
                    <div className="mb-4 form-floating">
                        <input type="text"
                            className="form-control"
                            required
                            onChange={(e) => setTitle({ ...title, Information: e.target.value })} />
                        <label className="form-label form-floating">Información</label>
                    </div>

                    <div className="mb-4 ml-4">
                        <button type="submit" className="btn btn-primary me-5">Agregar</button>
                        <button type="reset" className="btn btn-warning">Limpiar</button>
                    </div>
                </form>
            </div>
            <Toaster
                position='button-center'
                richColors />
        </div>
    );
};
