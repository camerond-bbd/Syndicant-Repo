"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const { DB_LINK = '', DB_USER = '', DB_PASS = '', PORT = 3001, } = process.env;
const driver = neo4j_driver_1.default.driver(DB_LINK, neo4j_driver_1.default.auth.basic(DB_USER, DB_PASS));
const session = driver.session();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(body_parser_1.default.json());
app.get('/health', (req, res) => {
    res.sendStatus(200);
});
// Create Syndicate node
app.post('/syndicate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, levelUp } = req.body;
    try {
        const result = yield session.run('CREATE (s:Syndicate {name: $name, levelUp: $levelUp}) RETURN s', { name: name, levelUp: levelUp });
        res.json(result.records[0].get('s'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the syndicate.', extras: { error } });
    }
}));
// Create Grad node
app.post('/grad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    console.log(req.body);
    try {
        const result = yield session.run('CREATE (g:Grad {name: $name, email: $email}) RETURN g', { name, email });
        res.json(result.records[0].get('g'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the grad.', extras: { error } });
    }
}));
app.post('/link_to_syndicate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { syndicate, gradEmail } = req.body;
    try {
        const result = yield session.run('MATCH (s:Syndicate {levelUp:$syndicate.levelUp, name:$syndicate.name}), (g:Grad WHERE g.email = $gradEmail) ' +
            'CREATE (s)-[r:WORKED_ON]->(g) RETURN r', { syndicate, gradEmail });
        console.log(result);
        res.json(result.records[0].get('r'));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the relationship.', extras: { error } });
    }
}));
// Create relationship between Team and Grad (Individual)
app.post('/link', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { syndicateId, gradEmail } = req.body;
    try {
        const result = yield session.run('MATCH (s:Syndicate), (g:Grad) WHERE ID(s) = $syndicateId AND g.email = $gradEmail ' +
            'CREATE (s)-[r:WORKED_ON]->(g) RETURN r', { syndicateId: neo4j_driver_1.default.int(syndicateId), gradEmail });
        res.json(result.records[0].get('r'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the relationship.', extras: { error } });
    }
}));
// get all syndicates
app.get('/syndicate/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield session.run('Match (s:Syndicate) RETURN s');
        res.json(result.records.map(record => record.get('s').properties));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving all syndicates.', extras: { error } });
    }
}));
//get syndicates in levelup
app.post('/syndicate/for-levelup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const levelUp = req.body;
    try {
        const result = yield session.run('Match (s:Syndicate {levelUp:$levelUp}) RETURN s', levelUp);
        res.json(result.records.map(record => record.get('s').properties));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving syndicates for this levelUp.', extras: { error } });
    }
}));
app.get('/levelups/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield session.run('MATCH (s:Syndicate) RETURN COLLECT(DISTINCT s.levelUp) as levelups');
        res.json(result.records[0].get('levelups'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving all levelUps.', extras: { error } });
    }
}));
// Retrieve all Grads with their Syndicates
app.get('/grad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield session.run('MATCH (g:Grad)-[:WORKED_ON]->(s:Syndicate) ' +
            'RETURN g.name AS gradName, g.email AS gradEmail, s.name AS syndicateName, s.levelUp AS syndicateLevelUp');
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
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching grads with syndicates.', extras: { error } });
    }
}));
app.get('/grad/all', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield session.run('Match (g:Grad) RETURN g');
        res.json(result.records.map(record => record.get('g').properties));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving all grads.', extras: { error } });
    }
}));
app.get('/grad/in-syndicate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const syndicate = req.body;
    try {
        const result = yield session.run('Match (g:Grad)-[WORKED_ON]->(s:Syndicate {name:$syndicate.name, levelUp:$syndicate.levelUp}) RETURN g', { syndicate: syndicate });
        res.json(result.records.map(record => record.get('g').properties));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving grads in that syndicate.', extras: { error } });
    }
}));
app.get('/grad/by_email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body;
    console.log(email);
    try {
        const result = yield session.run('Match (g:Grad {email:$email}) RETURN g', email);
        res.json(result.records[0].get('g').properties);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving that grad.', extras: { error } });
    }
}));
app.get('/worked_with', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gradListString = JSON.stringify(req.body.grad_list);
        const gradList = req.body.grad_list;
        const workedWithDict = {};
        gradList.forEach(email => workedWithDict[email] = []);
        console.log(gradList);
        const query = 'MATCH (grad_one: Grad WHERE grad_one.email IN $grad_list)' +
            '-[r:WORKED_ON]->' +
            '(s:Syndicate)<-[WORKED_ON]-(grad_two: Grad WHERE grad_one.email IN $grad_list)' +
            'RETURN grad_one, grad_two';
        console.log(query);
        const result = yield session.run(query, { grad_list: gradList });
        result.records.forEach(record => {
            let grad1 = record.get("grad_one").properties.email;
            let grad2 = record.get("grad_two").properties.email;
            workedWithDict[grad1].push(grad2);
        });
        res.json(workedWithDict);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occured" });
    }
}));
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
