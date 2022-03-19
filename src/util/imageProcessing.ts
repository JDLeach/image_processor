import { promises as fs } from 'fs';
import sharp from 'sharp';

export const doesExist = async (path: string) => {
	try {
		await fs.access(path);
		return true;
	} catch (err) {
		return false;
	}
};

export const resizeImage = async (path: string, height = 0, width = 0) => {
	if (height == 0) {
		return sharp(path)
			.resize({ width: width })
			.jpeg()
			.toBuffer()
			.then(data => {
				return data;
			});
	} else if (width == 0) {
		return sharp(path)
			.resize({ height: height })
			.jpeg()
			.toBuffer()
			.then(data => {
				return data;
			});
	} else {
		return sharp(path)
			.resize({ height: height, width: width })
			.jpeg()
			.toBuffer()
			.then(data => {
				return data;
			});
	}
};
