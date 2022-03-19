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
const imageProcessing_1 = require("../util/imageProcessing");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const height = 100;
const width = 50;
const badPath = 'assets/full/badNamesdfsdfsdf.jpg';
const goodPath = 'assets/full/test.jpg';
describe('doesExist tests', () => {
    it('doesExist should return true', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, imageProcessing_1.doesExist)(goodPath)).toBeTruthy();
    }));
    it('doesExist should return false', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, imageProcessing_1.doesExist)(badPath)).toBeFalsy();
    }));
});
describe('resizeImage tests', () => {
    it('resizeImage should return not undefined', () => {
        expect((0, imageProcessing_1.resizeImage)(goodPath, height, width)).not.toBeUndefined();
    });
});
const request = (0, supertest_1.default)(index_1.default);
describe('endpoint tests', () => {
    it('empty api call, expects 403', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image');
        expect(response.status).toBe(403);
    }));
    it('non empty api call, expects 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image?filename=test');
        expect(response.status).toBe(200);
    }));
});
