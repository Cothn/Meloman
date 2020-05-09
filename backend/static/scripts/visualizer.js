var analyser= null;
var dataArray = [];
var canva = null;
var canvas_ctx = null;
var bufferLength = 0;
/**
 * check param
 */
validateParam = function (param) {
    if (!param) {
        throw new TypeError('error equalizer must have audio and input container params');
    }
    return true;
}

function drawGistograms(){

    requestAnimationFrame(drawGistograms);
    analyser.getByteFrequencyData(dataArray);
    canvas_ctx.fillStyle = 'rgb(0,0,0)';
    canvas_ctx.fillRect(0,0, canva.width, canva.height);
    var barWidth = (canva.width/ bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for( var i=0; i< bufferLength; i++){
        barHeight = dataArray[i]/2;
        canvas_ctx.fillStyle = 'rgb(' + (barHeight+100)+',50,50)';
        canvas_ctx.fillRect(x, canva.height - barHeight, barWidth, barHeight);
        x += barWidth +1;
    }

}

/**
 * main function
 */
getVisualizer = function (param) {

    if (validateParam(param)) {

        analyser = param.context.createAnalyser();

        analyser.fftSize = 1024;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array( bufferLength);

        canva = document.createElement('canvas');
        canvas_ctx = canva.getContext('2d');

		canva.className = "equalizer-canvas";

        canva.width = window.innerWidth/2;
        canva.height = window.innerHeight/3;

        document.getElementById(param.container).appendChild(canva);

        canvas_ctx.clearRect(0, 0, canva.width, canva.height);
        drawGistograms();

        return analyser;
    }
    window.analyser = analyser;

};