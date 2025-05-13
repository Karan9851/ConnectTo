


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";

function History() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (e) {
                console.log(e);
            }
        };
        fetchHistory();
    }, []);

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <IconButton onClick={() => routeTo("/")} sx={{ mb: 3 }}>
                <HomeIcon />
            </IconButton>

            {
                (meetings.length !== 0) ? meetings.map((e, i) => {
                    return (
                        <Card key={i} variant="outlined" sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                    Meeting Code: {e.meetingCode}
                                </Typography>

                                <Typography sx={{ mb: 1.5, color: 'text.primary' }} variant="body2">
                                    Date: {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }) : <Typography variant="body1" color="text.secondary">No meeting history available</Typography>
            }
        </Box>
    );
}

export default History;
