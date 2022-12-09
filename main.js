function preaload(){

}
function setup(){
 canvas = createCanvas(400,400)
 canvas.center()
 video = createCapture(VIDEO)
 video.hide()
 classifier= ml5.imageClassifier("MobileNet",modelLoaded)

}
function modelLoaded(){
    console.log("modelo carregado")
}
function draw(){
    image(video,0,0,400,400)      
    classifier.classify(video,gotresult)              
} 


function gotresult(error,results){
    if(error){
        console.error("ta errado bro")
    }
    else{
        if((results[0].confidence>0.5) && (previsiusResult != results[0].label)){
            previsiusResult=results[0].label
            var synth=window.speechSynthesis
            speakData="o objeto e"+results[0].label
            var utterthis=new SpeechSynthesisUtterance(speakData)
            synth.speak(utterthis)
            document.getElementById("objectname").innerHTML=results[0].label
            document.getElementById("confidence").innerHTML=results[0].confidence.toFixed(3)

        }
    }
}