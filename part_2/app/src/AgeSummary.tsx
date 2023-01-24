import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ByAgeGroupResponse } from './byAgeGroupResponse';

export const AgeSummary: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ByAgeGroupResponse | null>(null);

    useEffect(() => {
        // This should obviously be passed via environment variables or configuration
        axios.get<ByAgeGroupResponse>('http://localhost:3100/submissions/by-age-groups')
            .then(results => setData(results.data))
            .catch(err => alert(err))
            .finally(() => setLoading(false));
    }, [])

    if (loading || !data) {
        return <Container maxWidth="lg" style={{ padding: 10 }}>Loading...</Container>
    }

  return (
    <Container maxWidth="lg" style={{padding:10}}>
        <Typography variant="h4">Summary by age group</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Age Group</TableCell>
                        <TableCell>Happiness</TableCell>
                        <TableCell>Energy</TableCell>
                        <TableCell>Hopefulness</TableCell>
                        <TableCell>Hours of sleep</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value?.averageHappiness ?? "N/A"}</TableCell>
                            <TableCell>{value?.averageEnergy ?? "N/A"}</TableCell>
                            <TableCell>{value?.averageHopefulness ?? "N/A"}</TableCell>
                            <TableCell>{value?.averageHoursSleptAtNight ?? "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}
