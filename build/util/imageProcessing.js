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
exports.resizeImage = exports.doesExist = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const doesExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(path);
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.doesExist = doesExist;
const resizeImage = (path, height = 0, width = 0) => __awaiter(void 0, void 0, void 0, function* () {
    if (height == 0) {
        return (0, sharp_1.default)(path)
            .resize({ width: width })
            .jpeg()
            .toBuffer()
            .then(data => {
            return data;
        });
    }
    else if (width == 0) {
        return (0, sharp_1.default)(path)
            .resize({ height: height })
            .jpeg()
            .toBuffer()
            .then(data => {
            return data;
        });
    }
    else {
        return (0, sharp_1.default)(path)
            .resize({ height: height, width: width })
            .jpeg()
            .toBuffer()
            .then(data => {
            return data;
        });
    }
});
exports.resizeImage = resizeImage;
