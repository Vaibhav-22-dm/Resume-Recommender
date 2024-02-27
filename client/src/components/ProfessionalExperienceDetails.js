import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ProfessionalExperienceDetails({ experience }) {
    return (
        <Box sx={{ minWidth: 275, mb: 2 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: "12px" }} color="text.secondary" gutterBottom>
                        {experience.time_duration.start} to {experience.time_duration.end}, {experience.time_duration.duration_months} months
                    </Typography>
                    <Typography variant="h6" component="div">
                        {experience.role}, {experience.organization}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: "13px" }} color="text.secondary">
                        {experience.tech_stack.join(", ")}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "13px" }}>
                        {experience.short_description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}