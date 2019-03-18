//https://github.com/simmoe/api_p5_speech/blob/master/sketch.js

let words = [];
let sentence = "";
let resultP;
let leftDiv;
let counter;
let cnv, myRec, btn, txt;
let slideCount;

let StartSlide;
let StartText, NoteText;
let Ready;
let TextToSlide, Text;

function setup() {
    StartSlide = false;
    Ready = false;
    slideCount = 1;
    
    //Jeg sætter en kommentar her 
    let SpeechRecognition = window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition || window.SpeechRecognition;

    cnv = createCanvas(800, 800);
    background('black');
    txt = createElement("h5", "Say something..").position(40,200).style("color:black;").hide();

    resultP = createP("").position(40, 220).parent(txt);
    //Check browser comp
    if (SpeechRecognition !== undefined) {
        btn = createButton("Klik for at aktivere mikrofon").position(225, 200).style("font-size:1em;background-color:black;border-color:black;border-radius:8px;color:white;cursor:pointer;").mousePressed(function () {
                btn.hide();
                //txt.show();
                myRec = new p5.SpeechRec();
                myRec.continuous = true;
                myRec.interimResults = true;
                myRec.onResult = showResult;
                myRec.start();
            
                Ready = true;
            });
    }
    StartText = createP("For at starte sliden, sig et af nøgleordne eller udtal: (Next)").position(140, 300).addClass("slideText");
    StartText.hide();
    NoteText = createP("Note: Dette program er sat til at forstå Engelsk").position(190,350).addClass("slideText");
    NoteText.hide();
    
    Text = " ";
    TextToSlide = createP(Text).addClass("slideText").position(width/2, height/2);
    TextToSlide.hide();
}

function draw() {
    slideTemplate();

    if(!StartSlide && Ready){
        StartText.show();
        NoteText.show();
        TextToSlide.hide();
    } else if(StartSlide && Ready){
        StartText.hide();
        NoteText.hide();
        TextToSlide.show();
    }
    
    if(slideCount > 0){
       StartSlide = true;
    }
}

function slideTemplate(){
    background('black');
    fill(255);
    let a = 50;
    rect(a/2, a/2, width - a, height - a);
}

function showResult() {
    if (myRec.resultValue == true) {
        sentence = myRec.resultString.split(' ').pop();
        resultP.html(sentence);
        
        if (sentence.includes("Next")) {
                slideCount += 1;    
        }
        if(StartSlide == true){
            if (sentence.includes("Introduction") || slideCount == 1) {
                switchImage("url", "Introduction");
            }
        
            if (sentence.includes("Blocks") || slideCount == 2) {
                switchImage("url", "Blocks");
            }
        
            if (sentence.includes("Materials") || slideCount == 3) {
                switchImage("url", "Materials");
            }
        
            if (sentence.includes("Animations") || slideCount == 4) {
                switchImage("url", "Animations");
            }
        }
    }
}

function switchImage(url, TextToImage){
    if(img == undefined){
        img = createImg(url).position(width/2 - img.width/2, height/2 - img.height/2).style("width:50px;height:50px");
        TextToSlide.attribute(TextToImage, ).position(width/2 - img.width/2, height/2 - img.height/2 + img.height);
    }else{
        img.attribute('src', url)
    }
}