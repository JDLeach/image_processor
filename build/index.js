"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/image', index_1.default);
app.get('/', (req, res) => {
    res.send('Root path');
});
//start express server
app.listen(port, () => {
    console.log(`Server started. Port: ${port}`);
});
exports.default = app;
