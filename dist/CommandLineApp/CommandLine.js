"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMain = void 0;
const yargs_1 = __importDefault(require("yargs"));
const CommanLineUtils_1 = require("./CommanLineUtils");
const CommandMain = () => {
    yargs_1.default.version('1.1.0');
    yargs_1.default.command({
        command: "add",
        describe: "Add a new note",
        builder: {
            title: {
                describe: "Note Title",
                demandOption: true,
                type: "string",
            },
            body: {
                describe: "Note Body",
                demandOption: true,
                type: "string",
            }
        },
        handler: function (argv) {
            (0, CommanLineUtils_1.AddNotes)(argv.title, argv.body);
        }
    });
    yargs_1.default.command({
        command: "remove",
        describe: "remove a new note",
        builder: {
            title: {
                describe: "Note Title",
                demandOption: true,
                type: "string",
            }
        },
        handler: function (argv) {
            (0, CommanLineUtils_1.RemoveNotes)(argv.title);
        }
    });
    yargs_1.default.parse();
};
exports.CommandMain = CommandMain;
//# sourceMappingURL=CommandLine.js.map