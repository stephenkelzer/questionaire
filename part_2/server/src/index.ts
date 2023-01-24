import 'reflect-metadata';
import express from 'express';
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { SubmissionController } from './submission.controller';
import cors from 'cors';

export let OrmEntityManager: EntityManager;

export const app = express();
const port = process.env.PORT || 3100;

export const init = (async () => {
    const orm = await MikroORM.init();
    OrmEntityManager = orm.em;

    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => RequestContext.create(OrmEntityManager, next));
    app.get('/', (req, res) => res.json({ message: 'Hello, World!' }));
    app.use('/submissions', SubmissionController);

    app.listen(port, () => console.log(`server started at http://localhost:${port}`));
})();