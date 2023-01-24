import { FilterQuery } from '@mikro-orm/core';
import dayjs from 'dayjs';
import Router from 'express-promise-router';
import { OrmEntityManager } from '.';
import { Aggregates } from './aggregates';
import { ByAgeGroupResponse } from './ByAgeGroupResponse';
import { ageGroups } from './constants';
import { PostSubmissionResponse } from './postSubmissionResponse';
import { Submission, SubmissionCreateRequest } from './submission';

const router = Router();

router.get<null, ByAgeGroupResponse>('/by-age-groups', async (req, res) => {
    const response: ByAgeGroupResponse = {};

    const ageGroupPromises: { name: string, promise: Promise<Aggregates | null> }[] = [];
    ageGroups.forEach(({ name, min, max }) => {
        ageGroupPromises.push({
            name: name, promise: getComparableSubmissionsByAge(min, max)
        });
    });

    const promiseResults = await Promise.allSettled(ageGroupPromises.map(p => p.promise));

    ageGroups.forEach(({ name }, index) => {
        const prom = promiseResults[index];
        if (prom.status === 'fulfilled') {
            response[name] = prom.value;
        } else {
            response[name] = null;
        }
    })


    return res.json(response);
})

router.post<SubmissionCreateRequest, PostSubmissionResponse>('/', async ({ body: createRequest }, res) => {
    const repo = OrmEntityManager.getRepository(Submission);
    const submission = repo.create(new Submission(createRequest));

    repo.persistAndFlush(submission);

    const comparedToSelf = await getPreviousSubmissionsByMe(submission.fullName);
    const comparedToAge = await getComparableSubmissionsByAge(submission.age, submission.age);

    return res.json({ submission, comparedToSelf, comparedToAge });
});

async function getPreviousSubmissionsByMe(fullName: string): Promise<Aggregates | null> {
    const repo = OrmEntityManager.getRepository(Submission);
    const results = await repo.find({ fullName });
    return parseIntoAggregates(results);
}

async function getComparableSubmissionsByAge(minAge: number | undefined, maxAge: number | undefined): Promise<Aggregates | null> {
    const repo = OrmEntityManager.getRepository(Submission);

    const $and: FilterQuery<Submission>[] = [];
    if (minAge) {
        $and.push({ age: { $gte: minAge } });
    }
    if (maxAge) {
        $and.push({ age: { $lte: maxAge } });
    }

    const results = await repo.find({ $and });

    return parseIntoAggregates(results);
}

function parseIntoAggregates(input: Submission[]): Aggregates | null {
    const count = input.length;
    if (count === 0) return null;

    const sums = input.reduce((acc, curr) => {
        acc.happiness += curr.happiness;
        acc.energy += curr.energy;
        acc.hopefulness += curr.hopefulness;
        acc.hoursSleptLastNight += curr.hoursSleptLastNight;
        return acc;
    }, { happiness: 0, energy: 0, hopefulness: 0, hoursSleptLastNight: 0 });

    return {
        averageHappiness: sums.happiness / count,
        averageEnergy: sums.energy / count,
        averageHopefulness: sums.hopefulness / count,
        averageHoursSleptAtNight: sums.hoursSleptLastNight / count,
    }
}

export const SubmissionController = router;