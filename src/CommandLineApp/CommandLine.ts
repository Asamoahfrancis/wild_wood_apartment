import yargs from "yargs";
import {AddNotes, RemoveNotes} from "./CommanLineUtils";



 export const CommandMain =  ()=>{
    yargs.version('1.1.0')
    yargs.command({
        command : "add",
        describe: "Add a new note",
        builder:{
            title :{
                describe :"Note Title",
                demandOption : true,
                type: "string",
            },
            body : {
                describe :"Note Body",
                demandOption : true,
                type: "string",
            }
        },
        handler : function (argv){
            AddNotes(argv.title,argv.body)
        }
    })

    yargs.command({
        command : "remove",
        describe: "remove a new note",
        builder : {
            title : {
                describe : "Note Title",
                demandOption : true,
                type: "string",
            }
        },
        handler : function (argv){
            RemoveNotes(argv.title)
        }
    })
    yargs.parse();
}


