import { Aggregates } from './aggregates';
import { Submission } from './submission';

export interface PostSubmissionResponse {
    submission: Submission;
    comparedToSelf: Aggregates | null;
    comparedToAge: Aggregates | null;
}