import React, { useEffect } from 'react';
import UploadForm from '../components/UploadForm';
import { Container } from '@mui/material';
import { createSession } from '../utils/api';

const Home = () => {

    useEffect(() => {
        createSession()
    }, [])
    
    return (
        <>
            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 8
            }}>
                <UploadForm />
            </Container>
        </>
    );
}

export default Home;