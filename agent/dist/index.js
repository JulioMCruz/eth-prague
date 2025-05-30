"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const readline = __importStar(require("node:readline/promises"));
const ai_1 = require("ai");
const groq_1 = require("@ai-sdk/groq");
dotenv_1.default.config();
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//TODO
// 1. cron job to call the ai funcitons on period
// 2. AI looks at thje coins data and the portfolio to decide wheter to buy sell / hold
// 3. ai calls the contract to buy / sell /hold
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting AI Agent...");
        node_cron_1.default.schedule("*/5 * * * * *", () => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            console.log("Running AI decision-making process...");
            const decision = "hold";
            console.log(`AI decision: ${decision}`);
            const userQuery = yield terminal.question(`Ask the houdini:`);
            const results = (0, ai_1.streamText)({
                model: (0, groq_1.groq)("gemma2-9b-it"),
                prompt: `You are a helpful AI assistant. The user has asked: "${userQuery}". Provide a concise and informative response.`,
                system: `You are a helpful AI assistant that provides information based on user queries.`,
                maxTokens: 250,
                temperature: 0.7,
            });
            try {
                for (var _d = true, _e = __asyncValues(results.textStream), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const chunk = _c;
                    process.stdout.write(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log((yield results.text).split("</think>")[-1]);
            process.stdout.write("\n\n");
        }));
    });
}
main().catch((error) => {
    console.error("Error in AI Agent:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map