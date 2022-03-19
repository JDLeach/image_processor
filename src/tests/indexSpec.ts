import { doesExist, resizeImage } from '../util/imageProcessing';
import supertest from 'supertest';
import app from '../index';

const height = 100;
const width = 50;

const badPath = 'assets/full/badNamesdfsdfsdf.jpg';
const goodPath = 'assets/full/test.jpg';

describe('doesExist tests', () => {
	it('doesExist should return true', async () => {
		expect(await doesExist(goodPath)).toBeTruthy();
	});
	it('doesExist should return false', async () => {
		expect(await doesExist(badPath)).toBeFalsy();
	});
});

describe('resizeImage tests', () => {
	it('resizeImage should return not undefined', () => {
		expect(resizeImage(goodPath, height, width)).not.toBeUndefined();
	});
});

const request = supertest(app);
describe('endpoint tests', () => {
	it('empty api call, expects 403', async () => {
		const response = await request.get('/image');
		expect(response.status).toBe(403);
	});

	it('non empty api call, expects 200', async () => {
		const response = await request.get('/image?filename=test');
		expect(response.status).toBe(200);
	});
});
