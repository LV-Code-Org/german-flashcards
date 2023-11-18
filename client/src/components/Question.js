import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { purple } from '@mui/material/colors';

const questionBoxStyle = {
    padding: 3,
    textAlign: "center",
    borderRadius: 4,
    background: "#202020",
    minWidth: "50vw",
    minHeight: "30vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const titleStyle = {
    fontWeight: 500,
    color: "#fff",
    marginBottom: "4vh",
};

const inputStyle = {
    '& .MuiInputBase-input': {
        textAlign: 'center',
        color: 'yellow',
    },
};

const messageStyle = {
    marginTop: "2vh",
    color: "white",
    fontSize: "18px",
    backgroundColor: purple[500],
    padding: "10px",
    borderRadius: "4px",
};

export default function Question(props) {
    const english = props.english;
    const showMessage = props.showMessage;
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    }, []);

    return (
        <Box component="span" sx={questionBoxStyle}>
            <Typography variant="h4" sx={titleStyle}>{english}</Typography>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onInputChange}
                InputProps={{
                    readOnly: showMessage ? true : false,
                }}
                sx={inputStyle}
                placeholder="Enter your answer"
                inputRef={inputRef}
            />
            {showMessage && <div style={messageStyle}>{showMessage}</div>}
        </Box>
    );
}
