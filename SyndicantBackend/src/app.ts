import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import neo4j, { Result } from 'neo4j-driver';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';

const {
  DB_LINK = '',
  DB_USER = '',
  DB_PASS = '',
  PORT = 3001,
} = process.env;

const driver = neo4j.driver(DB_LINK, neo4j.auth.basic(DB_USER, DB_PASS))
const session = driver.session();

const app: Application = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

app.get('/health', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

// Create Syndicate node
app.post('/syndicate', async (req: Request, res: Response): Promise<void> => {
  const { name, levelUp } = req.body;

  try {
    const result = await session.run(
      'CREATE (s:Syndicate {name: $name, levelUp: $levelUp}) RETURN s',
      { name: name, levelUp: levelUp }
    );

    res.json(result.records[0].get('s'));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the syndicate.', extras: { error } });
  }
});

// Create Grad node
app.post('/grad', async (req: Request, res: Response): Promise<void>  => {
  const { name, email } = req.body;
  console.log(req.body);
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

app.post('/link_to_syndicate', async(req: Request, res: Response): Promise<void> => {
  const {syndicate, gradEmail} = req.body;
  try {
    const result = await session.run(
      'MATCH (s:Syndicate {levelUp:$syndicate.levelUp, name:$syndicate.name}), (g:Grad WHERE g.email = $gradEmail) ' +
      'CREATE (g)-[r:WORKED_ON]->(s) RETURN r',
      { syndicate, gradEmail }
    );

    console.log(result);

    res.json(result.records[0].get('r'));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while creating the relationship.', extras: { error } });
  }
})

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

// get all syndicates
app.get('/syndicate/all', async (req: Request, res: Response): Promise<void> => {

  try {
    const result = await session.run(
      'Match (s:Syndicate) RETURN s'
    );

    res.json(result.records.map(record => record.get('s').properties));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving all syndicates.', extras: { error } });
  }
  
});

//get syndicates in levelup
app.post('/syndicate/for-levelup', async (req: Request, res: Response): Promise<void> => {

  const levelUp = req.body
  try {
    const result = await session.run(
      'Match (s:Syndicate {levelUp:$levelUp}) RETURN s', levelUp
    );

    res.json(result.records.map(record => record.get('s').properties));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while retrieving syndicates for this levelUp.', extras: { error } });
  }
});

app.get('/levelups/all',async (req:Request, res: Response): Promise<void> => {
  try {
    const result = await session.run(
      'MATCH (s:Syndicate) RETURN COLLECT(DISTINCT s.levelUp) as levelups'
    )

    res.json(result.records[0].get('levelups'));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving all levelUps.', extras: { error } });
  }
})


// Retrieve all Grads with their Syndicates
app.get('/grad', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await session.run(
      'MATCH (g:Grad)-[:WORKED_ON]->(s:Syndicate) ' +
      'RETURN g.name AS gradName, g.email AS gradEmail, s.name AS syndicateName, s.levelUp AS syndicateLevelUp'
    );

    const gradsWithSyndicates = result.records.map(record => ({
      grad: {
        name: record.get('gradName'),
        email: record.get('gradEmail'),
      },
      syndicate: {
        name: record.get('syndicateName'),
        levelUp: record.get('syndicateLevelUp'),
      },
    }));

    res.json(gradsWithSyndicates);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching grads with syndicates.', extras: { error } });
  }
});

app.get('/grad/all', async (_: Request, res: Response): Promise<void> => {

  try {
    const result = await session.run(
      'Match (g:Grad) RETURN g'
    );

    res.json(result.records.map(record => record.get('g').properties));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving all grads.', extras: { error } });
  }
});


app.post('/grad/in-syndicate', async (req: Request, res: Response): Promise<void> => {
  const syndicate = req.body;

  try {
    const result = await session.run(
      'Match (g:Grad)-[WORKED_ON]->(s:Syndicate {name:$syndicate.name, levelUp:$syndicate.levelUp}) RETURN g', {syndicate: syndicate}
    );

    res.json(result.records.map(record => record.get('g').properties));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving grads in that syndicate.', extras: { error } });
  }
});

app.post('/grad/by_email', async (req: Request, res: Response): Promise<void> => {
  const email = req.body;
  console.log(email);
  try {
    const result = await session.run(
      'Match (g:Grad {email:$email}) RETURN g', email
    );

    res.json(result.records[0].get('g').properties);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving that grad.', extras: { error } });
  }
});

app.post('/worked_with', async (req: Request, res:Response): Promise<void> => {

  try {
    const gradListString = JSON.stringify (req.body.grad_list);
    const gradList: string[] = req.body.grad_list; 
    const workedWithDict: any = {}

    gradList.forEach(email => workedWithDict[email] = []);

    console.log(gradList)

    const query = 'MATCH (grad_one: Grad WHERE grad_one.email IN $grad_list)' +
      '-[r:WORKED_ON]->(s:Syndicate)<-[WORKED_ON]-' +
      '(grad_two: Grad WHERE grad_two.email IN $grad_list) ' + 
      'RETURN grad_one, grad_two';

    
    const result = await session.run(
      query, {grad_list: gradList}
    );

    result.records.forEach(record => {
      let grad1 = record.get("grad_one").properties.email;
      let grad2 = record.get("grad_two").properties.email;

      workedWithDict[grad1].push(grad2);
    })
    

    res.json(workedWithDict)

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occured"} )
  }

});

app.listen(PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', PORT);
});