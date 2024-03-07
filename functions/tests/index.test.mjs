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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../netlify/functions/actions/index");
describe('API Tests', () => {
    it('should return 200 OK when accessing /', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.handler).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, World!' });
    }));
    it('should return 404 Not Found when accessing unknown route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.handler).get('/unknown');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Route not found' });
    }));
    // Add more tests for other routes and functionality
});
//# sourceMappingURL=index.test.mjs.map