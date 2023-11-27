export default function Home() {
    return (
        <>
        {/* // <!-- Page Content--> */}
            <div className="container px-4 px-lg-5">
                {/* <!-- Heading Row--> */}
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." /></div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Recinto Guápiles</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        <a className="btn btn-primary" href="#!">Call to Action!</a>
                    </div>
                </div>
                {/* <!-- Call to Action--> */}
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body"><p className="text-white m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p></div>
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