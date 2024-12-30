const { log } = require('console');
const express=require('express');
const fs=require('fs');
const app =express();

const path=require('path')

const PORT =4000;

//config EJS 
app.set('view engine','ejs');

//parsers

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connecting all the static files ::
app.use(express.static(path.join(__dirname,'public')));



app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        try{
            // console.log(files);
            res.render('index.ejs',{files:files})
            
        }
        catch(err){
            // console.log (err);
        }
        

    })
    
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(path.join(__dirname, 'files', req.params.filename), "utf-8", (err, filedata) => {
        
        res.render("show", {
            filename: req.params.filename,
            filedata: filedata
        });    
    })
})


app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.head.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/');

    })
})

app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`);
})