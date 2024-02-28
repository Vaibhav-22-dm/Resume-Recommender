import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, CardHeader, Link } from '@mui/material';
import { baseURL } from '../utils/api';

const columns = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 100
    },
    {
        id: 'relevance_score',
        label: 'Relevance Score',
        minWidth: 100
    },
    {
        id: 'resume_link',
        label: 'Resume Link',
        minWidth: 100,
    },
    {
        id: 'button',
        label: '',
        minWidth: 100
    },
];

// const rows = [
//     { 
//         "name": 'Prabhat Singh', 
//         "email": "prabhat@gmail.com" , 
//         "relevance_score": 100, 
//         "resume_link": "https://google.com", 
//         "projects": [
//             {
//                 "project_title": "Image classification with pytorch",
//                 "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
//                 "tech_stack": ["python", "pytorch"],
//                 "time_duration": {
//                     "start": "04-2020",
//                     "end": "05-2020",
//                     "duration_months": 2,
//                 },
//                 "relevancy": 5
//             },
//             {
//                 "project_title": "Stock price prediction with LSTM",
//                 "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
//                 "tech_stack": ["python", "pytorch", "SQL"],
//                 "time_duration": {
//                     "start": "10-2021",
//                     "end": "12-2021",
//                     "duration_months": 3,
//                 },
//                 "relevancy": 3
//             }
//         ],
//         "professional_experience": [
//             {
//                 "role": "Data Scientist",
//                 "organization": "Swiggy",
//                 "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
//                 "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
//                 "time_duration": {
//                     "start": "05-2022",
//                     "end": "07-2022",
//                     "duration_months": 3
//                 },
//                 "relevancy": 4
//             }
//         ],
//         "college": {
//             "name": "IIT Bombay",
//             "branch": "Electrical Engineering",
//             "degree": "Dual Degree",
//             "cgpa": 8.2,
//             "start": "07-2018",
//             "end": "05-2023"
//         }    
//     },
//     {
//         "name": 'Prabhat Singh',
//         "email": "prabhat@gmail.com",
//         "relevance_score": 100,
//         "resume_link": "https://google.com",
//         "projects": [
//             {
//                 "project_title": "Image classification with pytorch",
//                 "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
//                 "tech_stack": ["python", "pytorch"],
//                 "time_duration": {
//                     "start": "04-2020",
//                     "end": "05-2020",
//                     "duration_months": 2,
//                 },
//                 "relevancy": 5
//             },
//             {
//                 "project_title": "Stock price prediction with LSTM",
//                 "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
//                 "tech_stack": ["python", "pytorch", "SQL"],
//                 "time_duration": {
//                     "start": "10-2021",
//                     "end": "12-2021",
//                     "duration_months": 3,
//                 },
//                 "relevancy": 3
//             }
//         ],
//         "professional_experience": [
//             {
//                 "role": "Data Scientist",
//                 "organization": "Swiggy",
//                 "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
//                 "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
//                 "time_duration": {
//                     "start": "05-2022",
//                     "end": "07-2022",
//                     "duration_months": 3
//                 },
//                 "relevancy": 4
//             }
//         ],
//         "college": {
//             "name": "IIT Bombay",
//             "branch": "Electrical Engineering",
//             "degree": "Dual Degree",
//             "cgpa": 8.2,
//             "start": "07-2018",
//             "end": "05-2023"
//         }
//     },
//     {
//         "name": 'Prabhat Singh',
//         "email": "prabhat@gmail.com",
//         "relevance_score": 100,
//         "resume_link": "https://google.com",
//         "projects": [
//             {
//                 "project_title": "Image classification with pytorch",
//                 "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
//                 "tech_stack": ["python", "pytorch"],
//                 "time_duration": {
//                     "start": "04-2020",
//                     "end": "05-2020",
//                     "duration_months": 2,
//                 },
//                 "relevancy": 5
//             },
//             {
//                 "project_title": "Stock price prediction with LSTM",
//                 "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
//                 "tech_stack": ["python", "pytorch", "SQL"],
//                 "time_duration": {
//                     "start": "10-2021",
//                     "end": "12-2021",
//                     "duration_months": 3,
//                 },
//                 "relevancy": 3
//             }
//         ],
//         "professional_experience": [
//             {
//                 "role": "Data Scientist",
//                 "organization": "Swiggy",
//                 "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
//                 "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
//                 "time_duration": {
//                     "start": "05-2022",
//                     "end": "07-2022",
//                     "duration_months": 3
//                 },
//                 "relevancy": 4
//             }
//         ],
//         "college": {
//             "name": "IIT Bombay",
//             "branch": "Electrical Engineering",
//             "degree": "Dual Degree",
//             "cgpa": 8.2,
//             "start": "07-2018",
//             "end": "05-2023"
//         }
//     },
//     {
//         "name": 'Prabhat Singh',
//         "email": "prabhat@gmail.com",
//         "relevance_score": 100,
//         "resume_link": "https://google.com",
//         "projects": [
//             {
//                 "project_title": "Image classification with pytorch",
//                 "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
//                 "tech_stack": ["python", "pytorch"],
//                 "time_duration": {
//                     "start": "04-2020",
//                     "end": "05-2020",
//                     "duration_months": 2,
//                 },
//                 "relevancy": 5
//             },
//             {
//                 "project_title": "Stock price prediction with LSTM",
//                 "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
//                 "tech_stack": ["python", "pytorch", "SQL"],
//                 "time_duration": {
//                     "start": "10-2021",
//                     "end": "12-2021",
//                     "duration_months": 3,
//                 },
//                 "relevancy": 3
//             }
//         ],
//         "professional_experience": [
//             {
//                 "role": "Data Scientist",
//                 "organization": "Swiggy",
//                 "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
//                 "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
//                 "time_duration": {
//                     "start": "05-2022",
//                     "end": "07-2022",
//                     "duration_months": 3
//                 },
//                 "relevancy": 4
//             }
//         ],
//         "college": {
//             "name": "IIT Bombay",
//             "branch": "Electrical Engineering",
//             "degree": "Dual Degree",
//             "cgpa": 8.2,
//             "start": "07-2018",
//             "end": "05-2023"
//         }
//     },
//     {
//         "name": 'Prabhat Singh',
//         "email": "prabhat@gmail.com",
//         "relevance_score": 100,
//         "resume_link": "https://google.com",
//         "projects": [
//             {
//                 "project_title": "Image classification with pytorch",
//                 "short_description": "This PyTorch project trains an image classification model on the CIFAR-10 dataset. A CNN architecture with hyperparameters is modeled, trained and tested to categorize images into 10 classes with high accuracy.",
//                 "tech_stack": ["python", "pytorch"],
//                 "time_duration": {
//                     "start": "04-2020",
//                     "end": "05-2020",
//                     "duration_months": 2,
//                 },
//                 "relevancy": 5
//             },
//             {
//                 "project_title": "Stock price prediction with LSTM",
//                 "short_description": "The project develops an LSTM model to predict stock prices. Historical closing price data is used to train the recurrent neural network model. By analyzing sequential price patterns, the LSTM model makes multi-day ahead forecasts of a stock's future price.",
//                 "tech_stack": ["python", "pytorch", "SQL"],
//                 "time_duration": {
//                     "start": "10-2021",
//                     "end": "12-2021",
//                     "duration_months": 3,
//                 },
//                 "relevancy": 3
//             }
//         ],
//         "professional_experience": [
//             {
//                 "role": "Data Scientist",
//                 "organization": "Swiggy",
//                 "short_description": "Built restaurant recommendation model for Swiggy's landing page to provide personalized suggestions for users based on order data and user attributes using collaborative filtering techniques to increase orders and revenue.",
//                 "tech_stack": ["python", "Flask", "Hiroku", "MongoDB"],
//                 "time_duration": {
//                     "start": "05-2022",
//                     "end": "07-2022",
//                     "duration_months": 3
//                 },
//                 "relevancy": 4
//             }
//         ],
//         "college": {
//             "name": "IIT Bombay",
//             "branch": "Electrical Engineering",
//             "degree": "Dual Degree",
//             "cgpa": 8.2,
//             "start": "07-2018",
//             "end": "05-2023"
//         }
//     }
// ];

export default function ProfilesTable({ handleOpen, profiles }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, background: "#F9FAFB" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profiles
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell key={"personal"}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe">

                                                        {(JSON.parse(row.details).name.trim().split(' ')[0]?.[0] || 'N') + (JSON.parse(row.details).name.trim().split(' ')[1]?.[0] || 'A')}
                                                    </Avatar>
                                                }
                                                title={JSON.parse(row.details).name}
                                                subheader={JSON.parse(row.details).email}
                                                sx={{ p: 0 }}
                                            />
                                        </TableCell>
                                        <TableCell key={"relevance_score"}>
                                            {row.relevance_score}
                                        </TableCell>
                                        <TableCell key={"resume_link"}>
                                            <Link href={"http://localhost:8000"+row.file} underline="none" color="tertiary" target="_blank">Link</Link>
                                        </TableCell>
                                        <TableCell key={"button"} align={"left"}>
                                            <Button variant="outlined" color="secondary" onClick={() => handleOpen(JSON.parse(row.details))}>View Details</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={profiles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}