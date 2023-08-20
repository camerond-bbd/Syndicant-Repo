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
const { DB_LINK = '', DB_USER = '', DP_PASS = '', PORT = 3001, } = process.env;
const driver = neo4j_driver_1.default.driver(DB_LINK, neo4j_driver_1.default.auth.basic(DB_USER, DP_PASS));
const session = driver.session();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Create Syndicate node
app.post('/syndicate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, levelUp } = req.body;
    try {
        const result = yield session.run('CREATE (s:Syndicate {name: $name, levelUp: $levelUp}) RETURN t', { name, levelUp });
        res.json(result.records[0].get('s'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the syndicate.', extras: { error } });
    }
}));
// Create Grad node
app.post('/grad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const result = yield session.run('CREATE (g:Grad {name: $name, email: $email}) RETURN g', { name, email });
        res.json(result.records[0].get('g'));
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the grad.', extras: { error } });
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
        res.status(500).json({ error: 'An error occurred while creating the relationship.' });
    }
}));
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
