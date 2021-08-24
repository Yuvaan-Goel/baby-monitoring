objects = [];
status = "";
alarm = "";

function preload() {
    alarm = loadSound("alarm_alarm_alarm.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}


function draw() {
    image(video, 0, 0, 600, 400);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

            if (objects[i].label == "person") {
                alarm.play();
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                document.getElementById("baby-found").innerHTML = "Baby Found!";
                fill(r, g, b);
                noFill();
                stroke(r, g, b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

                rect(objects[i].x + 20, objects[i].y + 20, objects[i].width + 20, objects[i].height + 20);
            }
            else {
                alarm.stop();
                document.getElementById("baby-found").innerHTML = "Baby Not Found";
            }

        }
    }

}