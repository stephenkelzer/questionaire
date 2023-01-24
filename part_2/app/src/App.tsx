import { Fab } from '@mui/material';
import React, { useState } from 'react';
import { AgeSummary } from './AgeSummary';
import './App.css';
import { Form } from './Form';
import { FormComplete } from './FormComplete';
import { PostSubmissionResponse } from './postSubmissionResponse';

export const App = () => {
  const [viewingAgeSummary, setViewingAgeSummary] = useState(false);
  const [submissionResults, setSubmissionResults] = useState<PostSubmissionResponse | null>(null);

  const handleGoBackRequest = () => setSubmissionResults(null);


  return <>
    {viewingAgeSummary
      ? <AgeSummary />
      : submissionResults
          ? <FormComplete results={submissionResults} goBack={handleGoBackRequest} />
          : <Form onSubmissionSuccess={setSubmissionResults} />}

    <Fab variant="extended" sx={{position:"fixed", bottom:20, right:20 }} onClick={()=>setViewingAgeSummary(!viewingAgeSummary)}>{viewingAgeSummary ? 'Hide' : 'View'} Age Summary</Fab>
  </>
}