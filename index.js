const express = require("express");

//räknevariabel för vår logger-funktion
let count = 0;

// middleware
function logger(req,res,next){

    count++;
    console.log("Request nr: "+count+" to "+req.url);
    // skicka vidare request till nästa middleware eller routens egen callback
    next();

}


// initiera en applikation
const app = express();

//lägg till middleware till alla routes
app.use(logger);

// Fixa så att vi kan läsa in data i post-requests
app.use(express.urlencoded({extended:false}));

// enkel route med response i form av text
app.get("/",function(req,res){
    res.send("my Express Home Page");
});

// route som skickar ett html-formulär i response
app.get("/contact",function(req,res){
    res.send(`
        <h1>${req.url}</h1>
        <form action = "/contact" method = "post">
            <input type = "text" name = "theMFName" placeholder = "Name">
            <input type = "submit">
        </form>
    `);
});

// post-route som skall ta emot data från formulär ovan.
app.post("/contact", function(req,res){

   res.send(req.body);
   console.log(req);

});
// enkel get-route
app.get("/about",function(req,res){
    res.sendFile("My About Page");
});

//default 404 route med middleware
app.get("/*",logger,function(req,res){
    res.status(404);
    res.end("Bad request");
});

// talar om att applikationen skall stanna och lyssna efter trafik på port 3030
// trafiken är via http://localhost:3030
app.listen(3030, function(){ console.log("App lyssnar på port: 3030")});