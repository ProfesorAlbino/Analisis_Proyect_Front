export default function Home() {
    if (window.location.pathname !== "/") {
        window.location.replace("/");
    }
    return (
        <>
            {/* // <!-- Page Content--> */}
            <div className="container px-4 px-lg-5">
                {/* <!-- Heading Row--> */}
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7">{/* <img className="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." /> */}
                        <div id="carouselExample" class="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="/images/guapi1.jpg" srcSet="/images/guapi1.jpg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/images/guapi2.jpg" srcSet="/images/guapi2.jpg" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/images/guapi3.jpg" srcSet="/images/guapi3.jpg" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Recinto Guápiles</h1>
                        <h4>Inversión de ¢1 000 millones en el Recinto de Guápiles fortalece la regionalización universitaria</h4>
                        <p>Fue el 1 de setiembre del 2017 que las autoridades de la Universidad de Costa Rica se trasladaron al Recinto de Guápiles para el acto oficial de colocación de las primeras piedras del nuevo módulo de aulas y el edificio de Residencias Estudiantiles, que se unían a la inauguración, esa misma fecha, del Laboratorio Multimedia de idiomas, una cancha sintética de fútbol cinco, y un mural diseñado por estudiantes de la carrera de diseño gráfico..

                            Poco más de un año después, el Recinto de Guápiles de la UCR inaugura dicho pabellón de aulas y las tan esperadas Residencias Estudiantiles, el pasado 6 de diciembre durante una significativa ceremonia, a la que asistieron diferentes autoridades universitarias, autoridades de gobierno de la región de Pococí, así como estudiantes y funcionarios del Recinto. </p>
                        {/* <a className="btn btn-primary" href="#!">Call to Action!</a> */}
                    </div>
                </div>
                {/* <!-- Call to Action--> */}
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body"><p className="text-white m-0">Las Residencias estudiantiles cuentan con áreas de lavado, cocina, comedor, áreas de estudio y habitaciones para dos personas con el mobiliario incluido (mesas, sillas, armario) Estas residencias cuentan con áreas adecuadas al cumplimiento de la Ley 7600 (Ley de igualdad de oportunidades para las personas con discapacidad) y se ha acondicionado un dormitorio con esas características</p></div>
                </div>
                {/* <!-- Content Row--> */}
                <div className="row gx-4 gx-lg-5">
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Card One</h2>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                            </div>
                            <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Card Two</h2>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
                            </div>
                            <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h2 className="card-title">Card Three</h2>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                            </div>
                            <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}