import React from 'react';

import { Container } from 'react-bootstrap';

function PrincipalPage() {
    const isSession = sessionStorage.getItem("user");

    return (
        <div>
            <Container className='border'>
                <h1>Principal Page</h1>
                {isSession ? <h2>Usuario: {isSession}</h2> : <h2>Usuario: No hay usuario</h2>}
            </Container>
        </div>
    );
};

export default PrincipalPage;
