leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
song1=""
song2=""
rigthWristScore=0
leftWristScore=0
song1_status=""
song2_status=""


function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(1500,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        rightWristX = results[0].pose.rightWrist.x
        rigthWristY = results[0].pose.rightWrist.y

        leftWristScore=results[0].pose.keypoints[9].score
        rightWristScore=results[0].pose.keypoints[10].score
    }
}

function modelLoaded() {
    console.log("mode loaded")
}

function draw(){
    image(video,0,0,1500,500)
    fill("#72f26b")
    stroke("#eefdeb")

    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()

    if(leftWristScore>0.2){
        circle(leftWristX,leftWristY,20)
        song2.stop()
        if(song1_status == false){
            song1.play()
            document.getElementById("song").innerHTML = "Playing Harry Potter Remix Song 👓⚡"
        }
    }
}