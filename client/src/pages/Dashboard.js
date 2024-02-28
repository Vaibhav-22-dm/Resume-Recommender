import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfilesTable from '../components/ProfilesTable';
import DetailsModal from '../components/DetailsModal';
import axios from 'axios';
import { baseURL } from "../utils/api"

const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = React.useState({})
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const handleOpen = (profile) => {
        setProfile(profile)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getData = () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        }
        axios
            .get(baseURL + "get-recommendations/", config)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }

    useEffect(() => {
        getData("", "")
    }, [])

    return (
        <>
            {data === null || error ?
                <Container sx={{ textAlign: "center", marginTop: "70px" }}>
                    <Typography variant="h3">{error ? error : "Some error occured. Restart Session"}</Typography>
                </Container>
                :
                <>
                    <Grid container sx={{ px: 8, py: 4 }}>
                        <Grid item xs={12} sx={{ textAlign: "left", py: 4 }}>
                            <Typography sx={{ fontSize: "24px", fontWeight: 600, color: "#101828" }}>{data.resume_files_recommended.length} Resumes filtered</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#475467" }}>Purpose Selection</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className="resume-recommendations-table">
                                <Grid item xs={3} sx={{ textAlign: "left" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#344054" }}>Recommended Profiles</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#475467" }}>Resumes fit for the job role</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <ProfilesTable handleOpen={handleOpen} profiles={data.resume_files_recommended} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className="non-resume-recommendations-table">
                                <Grid item xs={3} sx={{ textAlign: "left" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#344054" }}>Non Recommended Profiles</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#475467" }}>Resumes that don't fit for the job role</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <ProfilesTable handleOpen={handleOpen} profiles={data.resume_files_non_recommended} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {open && <DetailsModal open={open} handleClose={handleClose} profile={profile} />}
                </>
            }
        </>
    );
}

export default Dashboard;