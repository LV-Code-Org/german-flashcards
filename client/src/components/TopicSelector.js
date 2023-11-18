import * as React from 'react';
import QuestionViewer from "./QuestionViewer"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function TopicSelector(props) {
    const [selected, setSelected] = React.useState('')
    const [disabled, setDisabled] = React.useState(false)
    const [data, setData] = React.useState([])

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const handleClick = () => {
        if (selected) {
            setDisabled(true)
            setData(props.translations[selected])
        }
    }

    const topicsList = props.topics.map(topic => {
        return <MenuItem value={topic} key={topic}>{topic}</MenuItem>
    })

    if (disabled) return <QuestionViewer topic={selected} data={data}/>
    return (
        <Stack spacing={2}>
            <Box sx={{ minWidth: "50vw" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose a topic</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Topic"
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        {topicsList}
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" onClick={handleClick} disabled={disabled}>Go!</Button>
        </Stack>
    );
}
