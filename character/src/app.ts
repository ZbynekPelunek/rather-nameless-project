import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@minuslevel/common';

import { createCharacterRouter } from './routes/create';
import { listCharactersRouter } from './routes/list';
import { showCharacterRouter } from './routes/show';
import { updateCharacterRouter } from './routes/update';
import { deleteCharacterRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);
app.use(currentUser);

app.use(createCharacterRouter);
app.use(listCharactersRouter);
app.use(showCharacterRouter);
app.use(updateCharacterRouter);
app.use(deleteCharacterRouter);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };