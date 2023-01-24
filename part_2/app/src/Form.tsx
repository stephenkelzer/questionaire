import { Box, Button, Container, Rating, Slider, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { PostSubmissionResponse } from './postSubmissionResponse';
import { SubmissionCreateRequest } from './submission';

export const Form: React.FunctionComponent<{ onSubmissionSuccess: (results: PostSubmissionResponse) => void }> = ({ onSubmissionSuccess })  => {
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState<Date | null>(null);
    const [happiness, setHappiness] = useState<number>(3);
    const [energy, setEnergy] = useState<number>(3);
    const [hopefulness, setHopefulness] = useState<number>(3);
    const [hoursSleptLastNight, setHoursSleptLastNight] = useState<number>(8);

    const disableForm = useMemo(()=> fullName === null || fullName === '' || dob === null, [fullName, dob])

    const handleSubmit = () => {
        if (disableForm) {
            alert('Please fill out all fields');
        }

        const payload: SubmissionCreateRequest = {
            fullName,
            dob: dob!,
            happiness, 
            energy,
            hopefulness,
            hoursSleptLastNight
        }

        // This should obviously be passed via environment variables or configuration
        axios.post<PostSubmissionResponse>('http://localhost:3100/submissions', payload)
            .then(results => onSubmissionSuccess(results.data))
            .catch(err => alert(err));
    };

  return (
    <Container maxWidth="md">
      <Typography variant="h3">State of mind questionaire</Typography>
      <Box>

        <TextField label="Full Name" variant="standard" fullWidth value={fullName} onChange={({ target: { value }}) => setFullName(value)} />

        <Box marginTop={3}>
            <MobileDatePicker label="Date of Birth" value={dob} onChange={setDob} renderInput={(p) => <TextField {...p} />} />
        </Box>

        <Box marginTop={3}>
            <Typography component="legend">On a scale from 1-5, how happy do you feel?</Typography>
            <Rating value={happiness} onChange={(_, newValue) => setHappiness(newValue as number)} precision={1}  max={5} />
        </Box>

        <Box marginTop={3}>
            <Typography component="legend">On a scale from 1-5, how energetic do you feel?</Typography>
            <Rating value={energy} onChange={(_, newValue) => setEnergy(newValue as number)} precision={1}  max={5} />
        </Box>

        <Box marginTop={3}>
            <Typography component="legend">On a scale from 1-5, how hopeful do you feel about the future?</Typography>
            <Rating value={hopefulness} onChange={(_, newValue) => setHopefulness(newValue as number)} precision={1}  max={5} />
        </Box>

        <Box marginTop={3}>
            <Typography component="legend" marginBottom={5}>How many hours did you sleep last night?</Typography>
            <Slider
                aria-label="Always visible"
                value={hoursSleptLastNight}
                onChange={(_, newValue) => setHoursSleptLastNight(newValue as number)}
                min={0}
                step={1}
                max={16}
                valueLabelDisplay="on"
                />
        </Box>

        <Box marginTop={3}>
            <Button variant='contained' onClick={handleSubmit} disabled={disableForm}>Submit</Button>
        </Box>
      </Box>
    </Container>
  );
}
