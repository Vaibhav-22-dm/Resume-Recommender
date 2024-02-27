import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FlagIcon from "../icons/FlagIcon";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { baseURL } from "../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const DescriptionForm = ({ open, handleClose }) => {

    const [role, setRole] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSave = () => {
        const res = getData(role, description)
    }

    const getData = async (role, description) => {
        setLoading(true)
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        }
        await axios
            .post(baseURL + "generate-recommendations/", { role, description }, config)
            .then(res => {
                console.log("res generated: ", res)
                setLoading(false)
                navigate("/dashboard")
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="backdrop"
        >
            {
                loading ? <CircularProgress sx={{ height: "70px !important", width: "70px !important" }} /> :
                    <Grid sx={style} container className="description-form">
                        <Grid xs={12} sx={{ p: 1 }} className="description-form-header">
                            <Box className="flag-icon-box">
                                <FlagIcon />
                            </Box>
                            <Button variant="tertiary" onClick={handleClose}>
                                <CloseIcon sx={{ color: "rgba(152, 162, 179, 1)" }} />
                            </Button>
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} >
                            <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "rgba(16, 24, 40, 1)" }}>Add Role</Typography>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "rgba(71, 84, 103, 1)" }}>Add the job description</Typography>
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} >
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "rgba(52, 64, 84, 1)", padding: "5px 0" }}>Role*</Typography>
                            <TextField
                                sx={{
                                    width: '90%',
                                    fontSize: "13px",
                                }}
                                inputProps={{
                                    style: {
                                        padding: 10
                                    }
                                }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder='e.g. Full Stack Developer'
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} >
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "rgba(52, 64, 84, 1)", padding: "5px 0" }}>Job Description</Typography>
                            <TextField
                                sx={{
                                    width: '90%',
                                    fontSize: "13px",
                                }}
                                inputProps={{
                                    style: {
                                        padding: 10
                                    }
                                }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='e.g. I joined Crux’s Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints.'
                                multiline
                                maxRows={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={12} sx={{ pt: 4, pl: 2, pr: 2, pb: 2 }}>
                            <Button variant="outlined" color="tertiary" sx={{ mr: 1, textTransform: 'none', width: "49%", p: 1 }}>Cancel</Button>
                            <Button variant="contained" color="secondary" sx={{ textTransform: 'none', width: "49%", p: 1 }} onClick={handleSave}>Submit</Button>
                        </Grid>
                    </Grid>
            }
        </Modal>
    );
}

export default DescriptionForm;