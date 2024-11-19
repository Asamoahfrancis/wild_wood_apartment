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
exports.ServerSide = void 0;
const https_1 = __importDefault(require("https"));
const ServerSide = () => {
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpRequest = https_1.default.request('https://jsonplaceholder.typicode.com/posts/1', (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    try {
                        const body = JSON.parse(data);
                        console.log(body);
                    }
                    catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                });
            });
            httpRequest.on('error', (error) => {
                console.error('Request error:', error);
            });
            httpRequest.end();
        });
    }
    fetchData();
};
exports.ServerSide = ServerSide;
//# sourceMappingURL=ServerSide.js.map