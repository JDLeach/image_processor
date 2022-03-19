import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';

import { doesExist, resizeImage } from '../util/imageProcessing';

const routes = express.Router();

// root path - /image

routes.get(
	'/',
	async (req: Request, res: Response): Promise<void> => {
		if (req.query.filename == undefined) {
			res.status(403);
			res.send('Filename missing!');
			return;
		}
		const fileName = req.query.filename + '.jpg';
		// check if the filename supplied exists in the full folder (image uploaded)
		if (await doesExist(`assets/full/${fileName}`)) {
			// check if the file already exists in the thumb folder
			if (!(await doesExist(`assets/thumb/${fileName}`))) {
				try {
					// copy the image from the full folder to the thumb folder
					await fs.copyFile(
						`assets/full/${fileName}`,
						`assets/thumb/${fileName}`
					);
				} catch (err) {
					console.error('Unable to copy file!');
				}
			}
			const options = {
				root: '.'
			};
			let height = req.query.height as string;
			let width = req.query.width as string;
			if (height == undefined && width == undefined) {
				return res.sendFile(`assets/thumb/${fileName}`, options);
			} else {
				if (height == undefined) height = '0';
				if (width == undefined) width = '0';
				if (
					isNaN(parseInt(height)) ||
					parseInt(height) < 0 ||
					isNaN(parseInt(width)) ||
					parseInt(width) < 0
				) {
					res
						.status(500)
						.send(
							'Width and/or height paramater is not a positive number. Please check and resubmit'
						);
					return;
				}
				if (height == '0' && width == '0') {
					res
						.status(500)
						.send(
							'Width and/or height paramater is not a positive number. Please check and resubmit'
						);
					return;
				}
				const image = await resizeImage(
					`assets/thumb/${fileName}`,
					parseInt(height),
					parseInt(width)
				);
				res.write(image);
				res.end();
			}
		} else {
			res.send('File does not exist!');
			return;
		}
	}
);

export default routes;
