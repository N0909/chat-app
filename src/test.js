import {createMessage, findClientsMessage} from './models/messageModel.js';

const main = async () =>{
    try{
        const data = await createMessage(1,9,"hello");
        console.log(data);
        console.log("Done");
    }catch(err){
        console.error(err);
    }
}

main();