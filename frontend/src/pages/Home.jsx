
import React, { useContext, useState } from 'react';
import withAuth from '../utils/WithAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, TextField, Tooltip, IconButton } from '@mui/material';
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from '../contexts/AuthContext';

function Home() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [roomLink, setRoomLink] = useState(""); // State to store the generated room link
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message
    const { addToUserHistory, createRoom, joinRoom } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        try {
            const roomId = meetingCode.split('/').pop(); // Extract roomId from the link or code
            await joinRoom(roomId); // Validate the room ID with the backend
            await addToUserHistory(roomId); // Add to user history
            navigate(`/room/${roomId}`); // Navigate to Lobby Page
        } catch (err) {
            setErrorMessage("Invalid Room ID. Please check the link or code."); // Show error message
        }
    };

    const handleCreateRoom = async () => {
        try {
            const generatedRoomLink = await createRoom(); // Call createRoom API
            setRoomLink(generatedRoomLink); // Store the generated room link
            setErrorMessage(""); // Clear any previous error messages
        } catch (err) {
            console.error("Failed to create room", err);
        }
    };

    const handleShareRoomLink = () => {
        if (navigator.share) {
            // Use Web Share API if supported
            navigator.share({
                title: "Join my video call on ConnectTo",
                text: "Click the link below to join my video call:",
                url: roomLink,
            })
                .then(() => console.log("Link shared successfully!"))
                .catch((err) => console.error("Error sharing link:", err));
        } else {
            alert("Sharing is not supported on this device. Please copy the link manually.");
        }
    };

    return (
        <>
            {/* NavBar */}
            <div className="navBar" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ddd'
            }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '600', margin: 0, color: '#1976d2' }}>ConnectTo</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Tooltip title="View History">
                        <IconButton onClick={() => navigate("/history")}>
                            <RestoreIcon color="action" /> 
                            <span style={{ fontSize: '1rem', color: '#555' }}>History</span>
                        </IconButton>
                    </Tooltip>
                    

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        variant="outlined"
                        color="error"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Connect Container */}
            <div className="connectContainer" style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '64px 10%',
                flexWrap: 'wrap',
                gap: '32px'
            }}>
                {/* Left Panel */}
                <div className="leftPanel" style={{ flex: '1', minWidth: '280px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>
                        Providing Quality Video Calls Just Like Quality Education
                    </h2>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: 'wrap' }}>
                        <TextField
                            onChange={(e) => {
                                setMeetingCode(e.target.value);
                                setErrorMessage(""); // Clear error message when user types
                            }}
                            label="Enter Meeting Code"
                            variant="outlined"
                            fullWidth
                            sx={{ maxWidth: '300px' }}
                            error={!!errorMessage} // Highlight input field if there's an error
                            helperText={errorMessage} // Show error message below the input field
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            color="primary"
                            disabled={!meetingCode.trim()}
                            sx={{ height: '56px' }}
                        >
                            Connect
                        </Button>
                    </div>

                    {/* Create Room Section */}
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            onClick={handleCreateRoom}
                            variant="contained"
                            color="secondary"
                            sx={{ height: '56px' }}
                        >
                            Create Room
                        </Button>
                        
                        {roomLink && (
                            <div style={{ marginTop: '10px' }}>
                                <h4>Click the to join</h4>
                                <p
                                    style={{ color: '#1976d2', cursor: 'pointer' }}
                                    onClick={() => navigate(`/room/${roomLink.split('/').pop()}`)} // Navigate to the correct link
                                >
                                    Room Link: {roomLink}
                                </p>
                                <Button
                                    onClick={handleShareRoomLink}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ marginTop: '10px' }}
                                >
                                    Share Link
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="rightPanel" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px' }}>
                    <img
                        src="/logo3.png"
                        alt="ConnectTo App Logo"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default withAuth(Home);