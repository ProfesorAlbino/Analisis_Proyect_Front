import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center p-1">
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="secondary" />
        </div>
    );
}

export default Loader;