"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNotes = exports.RemoveNotes = void 0;
const fs_1 = __importDefault(require("fs"));
const LoadNotes = () => {
    try {
        const dataBuffer = fs_1.default.readFileSync("notes.json").toString();
        return JSON.parse(dataBuffer);
    }
    catch (e) {
        return [];
    }
};
const SaveNotes = (note) => {
    fs_1.default.writeFileSync("notes.json", JSON.stringify(note));
};
const RemoveNotes = (noteTitle) => {
    const note = LoadNotes();
    const FilteredOutTitle = note.filter((notes) => notes.title !== noteTitle);
    SaveNotes(FilteredOutTitle);
};
exports.RemoveNotes = RemoveNotes;
const AddNotes = (title, body) => {
    const note = LoadNotes();
    const duplicatedTitle = note.filter((notes) => notes.title === title);
    if (duplicatedTitle.length > 0) {
        console.log("Note Title Taken");
    }
    else {
        note.push({
            title: title,
            body: body,
        });
        SaveNotes(note);
    }
};
exports.AddNotes = AddNotes;
//# sourceMappingURL=CommanLineUtils.js.map