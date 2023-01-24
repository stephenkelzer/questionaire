import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PostSubmissionResponse } from './postSubmissionResponse';

export const FormComplete: React.FunctionComponent<{ results: PostSubmissionResponse, goBack: () => void }> = ({ results, goBack }) => {
  return (
    <Container maxWidth="lg" style={{padding:10}}>
        <Button onClick={goBack} variant="contained">Go back</Button>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Happiness</TableCell>
                        <TableCell>Energy</TableCell>
                        <TableCell>Hopefulness</TableCell>
                        <TableCell>Hours of sleep</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>This submission</TableCell>
                        <TableCell>{results.submission.happiness}</TableCell>
                        <TableCell>{results.submission.energy}</TableCell>
                        <TableCell>{results.submission.hopefulness}</TableCell>
                        <TableCell>{results.submission.hoursSleptLastNight}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Compared to your previous submissions</TableCell>
                        <TableCell>{results.comparedToSelf?.averageHappiness ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToSelf?.averageEnergy ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToSelf?.averageHopefulness ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToSelf?.averageHoursSleptAtNight ?? "N/A"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Compared to others your age</TableCell>
                        <TableCell>{results.comparedToAge?.averageHappiness ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToAge?.averageEnergy ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToAge?.averageHopefulness ?? "N/A"}</TableCell>
                        <TableCell>{results.comparedToAge?.averageHoursSleptAtNight ?? "N/A"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}
