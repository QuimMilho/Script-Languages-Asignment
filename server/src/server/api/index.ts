import { Router } from 'express';
import index, { APIGame, APIResults } from '../..';

const apiRouter = Router();

apiRouter.get('/pontos', async (req, res) => {
    const data: APIResults[] = [];
    const games = (await index.database.select(
        ['*'],
        ['gameHistory']
    )) as APIGame[];
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        let player: APIResults = data.find((d) => d.name === game.jog1);
        let player2: APIResults = data.find((d) => d.name === game.jog2);
        if (!player) {
            data.push({
                lostNormal: 0,
                lostUltimate: 0,
                name: game.jog1,
                wonNormal: 0,
                wonUltimate: 0,
            });
            player = data.find((d) => d.name === game.jog1);
        }
        if (!player2) {
            data.push({
                lostNormal: 0,
                lostUltimate: 0,
                name: game.jog2,
                wonNormal: 0,
                wonUltimate: 0,
            });
            player2 = data.find((d) => d.name === game.jog2);
        }
        if (game.result === 1) {
            if (game.type === 'hard') {
                player.wonUltimate++;
                player2.lostUltimate++;
            } else {
                player.wonNormal++;
                player2.lostNormal++;
            }
        } else {
            if (game.type === 'hard') {
                player2.wonUltimate++;
                player.lostUltimate++;
            } else {
                player2.wonNormal++;
                player.lostNormal++;
            }
        }
    }
    index.logger.info('Got points!');
    res.status(200).send(data);
});

apiRouter.post('/game', async (req, res) => {
    const game: APIGame = req.body as APIGame;
    index.logger.info('Inserted new game!');
    try {
        await index.database
            .insert(
                'gameHistory',
                ['result', 'jog1', 'jog2', 'type'],
                ['?', '?', '?', '?'],
                [game.result, game.jog1, game.jog2, game.type]
            )
            .catch(() => res.sendStatus(400));
    } catch (err) {
        return res.sendStatus(400);
    }
    return res.sendStatus(200);
});

export default apiRouter;
