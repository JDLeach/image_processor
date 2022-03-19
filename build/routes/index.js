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
const fs_1 = require("fs");
const imageProcessing_1 = require("../util/imageProcessing");
const routes = express_1.default.Router();
// root path - /image
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.filename == undefined) {
        res.status(403);
        res.send('Filename missing!');
        return;
    }
    const fileName = req.query.filename + '.jpg';
    // check if the filename supplied exists in the full folder (image uploaded)
    if (yield (0, imageProcessing_1.doesExist)(`assets/full/${fileName}`)) {
        // check if the file already exists in the thumb folder
        if (!(yield (0, imageProcessing_1.doesExist)(`assets/thumb/${fileName}`))) {
            try {
                // copy the image from the full folder to the thumb folder
                yield fs_1.promises.copyFile(`assets/full/${fileName}`, `assets/thumb/${fileName}`);
            }
            catch (err) {
                console.error('Unable to copy file!');
            }
        }
        const options = {
            root: '.'
        };
        let height = req.query.height;
        let width = req.query.width;
        if (height == undefined && width == undefined) {
            return res.sendFile(`assets/thumb/${fileName}`, options);
        }
        else {
            if (height == undefined)
                height = '0';
            if (width == undefined)
                width = '0';
            if (isNaN(parseInt(height)) ||
                parseInt(height) < 0 ||
                isNaN(parseInt(width)) ||
                parseInt(width) < 0) {
                res
                    .status(500)
                    .send('Width and/or height paramater is not a positive number. Please check and resubmit');
                return;
            }
            if (height == '0' && width == '0') {
                res
                    .status(500)
                    .send('Width and/or height paramater is not a positive number. Please check and resubmit');
                return;
            }
            const image = yield (0, imageProcessing_1.resizeImage)(`assets/thumb/${fileName}`, parseInt(height), parseInt(width));
            res.write(image);
            res.end();
        }
    }
    else {
        res.send('File does not exist!');
        return;
    }
}));
exports.default = routes;
