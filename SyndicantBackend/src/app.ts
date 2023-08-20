import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import neo4j from 'neo4j-driver';
import bodyParser from 'body-parser';

const {
  DB_LINK = '',
  DB_USER = '',
  DP_PASS = '',
  PORT = 3001,
} = process.env;

const driver = neo4j.driver(DB_LINK, neo4j.auth.basic(DB_USER, DP_PASS))
const session = driver.session();

const app: Application = express();
app.use(bodyParser.json());

// Create Syndicate node
app.post('/syndicate', async (req: Request, res: Response): Promise<void> => {
  const { name, levelUp } = req.body;

  try {
    const result = await session.run(
      'CREATE (s:Syndicate {name: $name, levelUp: $levelUp}) RETURN t',
      { name, levelUp }
    );

    res.json(result.records[0].get('s'));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the syndicate.', extras: { error } });
  }
});

// Create Grad node
app.post('/grad', async (req: Request, res: Response): Promise<void>  => {
  const { name, email } = req.body;

  try {
    const result = await session.run(
      'CREATE (g:Grad {name: $name, email: $email}) RETURN g',
      { name, email }
    );

    res.json(result.records[0].get('g'));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the grad.', extras: { error } });
  }
});

// Create relationship between Team and Grad (Individual)
app.post('/link', async (req: Request, res: Response): Promise<void>  => {
  const { syndicateId, gradEmail } = req.body;

  try {
    const result = await session.run(
      'MATCH (s:Syndicate), (g:Grad) WHERE ID(s) = $syndicateId AND g.email = $gradEmail ' +
      'CREATE (s)-[r:WORKED_ON]->(g) RETURN r',
      { syndicateId: neo4j.int(syndicateId), gradEmail }
    );

    res.json(result.records[0].get('r'));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the relationship.', extras: { error } });
  }
});

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});