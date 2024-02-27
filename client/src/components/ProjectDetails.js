import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ProjectDetails({ project }) {
    return (
        <Box sx={{ minWidth: 275, mb: 2 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: "12px" }} color="text.secondary" gutterBottom>
                        {project.time_duration.start} to {project.time_duration.end}, {project.time_duration.duration_months} months
                    </Typography>
                    <Typography variant="h6" component="div">
                        {project.project_title}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: "13px" }} color="text.secondary">
                        {project.tech_stack.join(", ")}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize: "13px"}}>
                        {project.short_description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}