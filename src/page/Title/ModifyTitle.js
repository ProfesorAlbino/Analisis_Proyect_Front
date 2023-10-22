import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById, updateTitle } from '../../service/TitlesApi/TitleApi';


export default function ModifyTitle() {

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth()).toString().padStart(2, '0');
        const year = d.getFullYear();

        return `${year}-${month}-${day}`;
    };
    
    const { idTitle } = useParams();

    const [title, setTitle] = useState({
        id: 0,
        publisherName: '',
        header: '',
        termSubject: '',
        associatedDate: '',
        publicationDate: '',
        number: 0,
        restTitle: '',
        personName: '',
        isbn: '',
        title1: '',
        mentionResponsibility: '',
        information: '',
        generalSubjectSubdivision: '',
        copies: []
    });

    useEffect(() => {
        getById(idTitle)
            .then((result) => {
                result.associatedDate = formatDate(result.associatedDate);
                result.publicationDate = formatDate(result.publicationDate);
                setTitle(result);
            })
            .catch(() => {
                console.log("Error al obtener el libro");
            });
    }, [idTitle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);

        updateTitle(title)
            .then((result) => {
                console.log(result + "Libro actualizado exitosamente");
            })
            .catch(() => {
                console.log("Error al actualizar el libro");
                console.log(title);
            });

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
                        value={title.personName}
                        onChange={(e) => setTitle({ ...title, personName: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Fecha asociada al nombre</label>
                    <input type="date"
                        className="form-control"
                        required
                        value={title.associatedDate}
                        onChange={(e) => setTitle({ ...title, associatedDate: e.target.value })} />
                </div>
                {/* TITULO */}
                <div className="mb-4">
                    <label className="form-label">Título del Libro</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.title1}
                        onChange={(e) => setTitle({ ...title, title1: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Resto del título</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.restTitle}
                        onChange={(e) => setTitle({ ...title, restTitle: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Mención de Responsabilidad</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.mentionResponsibility}
                        onChange={(e) => setTitle({ ...title, mentionResponsibility: e.target.value })} />
                </div>
                {/* PUBLICACION */}
                <div className="mb-4">
                    <label className="form-label">Nombre del Editor</label>
                    <input type="Text"
                        className="form-control"
                        required
                        value={title.publisherName}
                        onChange={(e) => setTitle({ ...title, publisherName: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Fecha de Publicación</label>
                    <input type="date"
                        className="form-control"
                        required
                        value={title.publicationDate}
                        onChange={(e) => setTitle({ ...title, publicationDate: e.target.value })} />
                </div>
                {/* MATERIA */}
                <div className="mb-4">
                    <label className="form-label">Término de Materia</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.termSubject}
                        onChange={(e) => setTitle({ ...title, termSubject: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Subdivición de Materia General</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.generalSubjectSubdivision}
                        onChange={(e) => setTitle({ ...title, generalSubjectSubdivision: e.target.value })} />
                </div>
                {/* ISBN */}
                <div className="mb-4">
                    <label className="form-label">ISBN</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.isbn}
                        onChange={(e) => setTitle({ ...title, isbn: e.target.value })} />
                </div>
                {/* CABECERA */}
                <div className="mb-4">
                    <label className="form-label">Cabecera</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.header}
                        onChange={(e) => setTitle({ ...title, header: e.target.value })} />
                </div>
                {/* NUMERO */}
                <div className="mb-4">
                    <label className="form-label">Número</label>
                    <input type="number"
                        className="form-control"
                        required
                        value={title.number}
                        onChange={(e) => setTitle({ ...title, number: e.target.value })} />
                </div>
                {/* INFORMACION */}
                <div className="mb-4">
                    <label className="form-label position-relative start-0">Información</label>
                    <input type="text"
                        className="form-control"
                        required
                        value={title.information}
                        onChange={(e) => setTitle({ ...title, information: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="reset" className="btn btn-warning">Limpiar</button>
            </form>
        </div>
    );
};
