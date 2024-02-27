import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FlagIcon from "../icons/FlagIcon";
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import ProjectDetails from "./ProjectDetails";
import ProfessionalExperienceDetails from "./ProfessionalExperienceDetails";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const DetailsModal = ({ open, handleClose, profile }) => {
    const { name, email, college, projects, professional_experience } = { ...profile }
   
    const [activeTab, setActiveTab] = useState("college")


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="backdrop"
        >
            <Grid sx={style} container className="details-modal">
                <Grid xs={12} sx={{ p: 1 }} className="details-modal-header">
                    <Box>
                        <Avatar aria-label="recipe">
                            {(name.trim().split(' ')[0]?.[0] || 'N') + (name.trim().split(' ')[1]?.[0] || 'A')}
                        </Avatar>
                    </Box>
                    <Button variant="tertiary" onClick={handleClose}>
                        <CloseIcon sx={{ color: "rgba(152, 162, 179, 1)" }} />
                    </Button>
                </Grid>
                <Grid xs={12} sx={{ p: 1 }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#344054" }}>{name}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "#475467" }}>{email}</Typography>
                </Grid>
                <Grid xs={12} sx={{ p: 1 }}>
                    <div className="details-tabs-box">
                        <button onClick={() => setActiveTab("college")} className={activeTab === "college" ? "active" : ""}>
                            College
                        </button>
                        <button onClick={() => setActiveTab("projects")} className={activeTab === "projects" ? "active" : ""}>
                            Project
                        </button>
                        <button onClick={() => setActiveTab("professional_experience")} className={activeTab === "professional_experience" ? "active" : ""}>
                            Professional Experience
                        </button>
                    </div>
                </Grid>
                <Grid xs={12} sx={{ p: 1, height: "215px", overflow: 'auto' }} >
                    {activeTab === "college" && Object.keys(college).map(attr => (
                        <div style={{ padding: "5px", color: "#475467"}}>
                            <strong style={{ textTransform: "capitalize", paddingRight: "20px", color: "#344054"}}>{attr}: </strong>
                            {college[attr]}
                        </div>
                    ))}
                    {activeTab === "projects" && projects.map(project => (
                        <ProjectDetails project={project} />
                    ))}
                    {activeTab === "professional_experience" && professional_experience.map(experience => (
                        <ProfessionalExperienceDetails experience={experience} />
                    ))}
                </Grid>
            </Grid>
        </Modal>
    );
}

export default DetailsModal;