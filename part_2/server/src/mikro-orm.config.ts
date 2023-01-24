import { Options } from '@mikro-orm/core';
import { Submission } from './submission';

const options: Options = {
    type: 'sqlite',
    entities: [Submission],
    dbName: 'questionaire.db',
    debug: true,
};

export default options;