import fs from "fs";

interface  NotesUi  {title:string , body:string}
const LoadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataBuffer);
    }catch (e){
        return [];
    }
}

const SaveNotes = (note:NotesUi)=>{
    fs.writeFileSync("notes.json", JSON.stringify(note));
}

export const RemoveNotes = (noteTitle:string)=>{
    const note = LoadNotes();
    const FilteredOutTitle = note.filter((notes:NotesUi)=>notes.title !== noteTitle);
    SaveNotes(FilteredOutTitle);
}

export const AddNotes = (title:string,body:string)=>{
    const note = LoadNotes();
    const duplicatedTitle = note.filter((notes:NotesUi)=>notes.title === title);
    if(duplicatedTitle.length > 0){
        console.log("Note Title Taken")
    }else {
        note.push({
            title: title,
            body: body,
        })
        SaveNotes(note);
    }

}
