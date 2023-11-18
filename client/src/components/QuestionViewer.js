import * as React from 'react';
import Question from './Question';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function QuestionViewer(props) {
    const [index, setIndex] = React.useState(0);
    const [current, setCurrent] = React.useState(props.data[index]);
    const [input, setInputValue] = React.useState('');
    const [isCorrect, setIsCorrect] = React.useState(null);
    const [showMessage, setShowMessage] = React.useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleClick = () => {
        // Check correctness of the answer
        const correct = input.toLowerCase() === props.data[index][0].toLowerCase();
        setIsCorrect(correct);

        if (correct) {
            showMessageForSeconds("Correct!", 1000, moveToNextCard);
        } else {
            showMessageForSeconds("Incorrect!", 1000, moveToNextCard);
        }
    }

    const showMessageForSeconds = (message, milliseconds, callback) => {
        setShowMessage(message);
        setTimeout(() => {
            setShowMessage(false);
            callback(); // Move on to the next question after showing the message
        }, milliseconds);
    }

    const moveToNextCard = () => {
        // Move on to the next question
        setCurrent(props.data[index + 1]);
        setIndex(index + 1);
        setInputValue('');
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Stack spacing={2} sx={{ width: '100%', minWidth: 500 }}>
                <Question
                    german={current[0]}
                    english={current[1]}
                    value={input}
                    onInputChange={handleInputChange}
                    isCorrect={isCorrect}
                    showMessage={showMessage}
                />
                <Button variant="contained" onClick={handleClick}>Submit</Button>
            </Stack>
        </Box>
    );
}



