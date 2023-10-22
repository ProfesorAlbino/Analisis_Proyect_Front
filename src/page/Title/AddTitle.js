import React, { useState } from 'react';
import {createTitle} from '../../service/TitlesApi/TitleApi';

export default function AddTitle(){

    const [title, setTitle] = useState({
        Id: 0, PublisherName: '', Header: '', TermSubject: '',
        AssociatedDate: '', PublicationDate: '', Number: 0, RestTitle: '', PersonName: '', Isbn: '',
        Title1: '', MentionResponsibility: '', Information: '', GeneralSubjectSubdivision: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createTitle(title)
            .then((result) => {
                console.log(result + "Libro creado exitosamente");
            })
            .catch(() => {
                console.log("Error al crear el libro");
            });
        console.log(title);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* AUTOR */}
                <div className="mb-4">
                    <label className="form-label">Nombre del Autor</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, PersonName: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Fecha asociada al nombre</label>
                    <input type="date"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, AssociatedDate: e.target.value })} />
                </div>
                {/* TITULO */}
                <div className="mb-4">
                    <label className="form-label">Título del Libro</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, Title1: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Resto del título</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, RestTitle: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Mención de Responsabilidad</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, MentionResponsibility: e.target.value })} />
                </div>
                {/* PUBLICACION */}
                <div className="mb-4">
                    <label className="form-label">Nombre del Editor</label>
                    <input type="Text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, PublisherName: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Fecha de Publicación</label>
                    <input type="date"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, PublicationDate: e.target.value })} />
                </div>
                {/* MATERIA */}
                <div className="mb-4">
                    <label className="form-label">Término de Materia</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, TermSubject: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Subdivición de Materia General</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, GeneralSubjectSubdivision: e.target.value })} />
                </div>
                {/* ISBN */}
                <div className="mb-4">
                    <label className="form-label">ISBN</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, Isbn: e.target.value })} />
                </div>
                {/* CABECERA */}
                <div className="mb-4">
                    <label className="form-label">Cabecera</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, Header: e.target.value })} />
                </div>
                {/* NUMERO */}
                <div className="mb-4">
                    <label className="form-label">Número</label>
                    <input type="number"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, Number: e.target.value })} />
                </div>
                {/* INFORMACION */}
                <div className="mb-4">
                    <label className="form-label position-relative start-0">Información</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setTitle({ ...title, Information: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="reset" className="btn btn-warning">Limpiar</button>
            </form>
        </div>
    );
};
