

import React, { useContext, useState, createContext } from 'react';
import httpStatus from "http-status";
import { useNavigate } from 'react-router-dom';
import server from '../environment';

import axios from 'axios';

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
});

const roomClient = axios.create({
    baseURL: `connecttofrontend.onrender.com/api/v1/rooms` // Added for room-related API calls
});

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);

                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });

            return request.data;
        } catch (e) {
            throw e;
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request;
        } catch (e) {
            throw e;
        }
    };

    // New function to create a room
    const createRoom = async () => {
        try {
            let request = await roomClient.post("/create");
            return request.data.roomLink; // Return the generated room link
        } catch (err) {
            throw err;
        }
    };

    // New function to join a room
    const joinRoom = async (roomId) => {
        try {
            let request = await roomClient.get(`/join/${roomId}`);
            return request.data; // Return room details if successful
        } catch (err) {
            throw err;
        }
    };

    const data = {
        userData,
        setUserData,
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin,
        createRoom, // Added createRoom to the context
        joinRoom // Added joinRoom to the context
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};