var canvas = document.getElementById("mandelbrot");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var minX = -2.5;
var maxX = 1;
var minY = -1.5;
var maxY = 1.5;

var maxIterations = 1000;

function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    function hueToRgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function drawMandelbrot() {
  var image = ctx.createImageData(width, height);
  var data = image.data;

  for (var py = 0; py < height; py++) {
    for (var px = 0; px < width; px++) {
      var x0 = minX + (px / width) * (maxX - minX);
      var y0 = minY + (py / height) * (maxY - minY);

      var x = 0;
      var y = 0;

      var iteration = 0;

      while (x * x + y * y <= 4 && iteration < maxIterations) {
        var xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        iteration++;
      }

      var index = (py * width + px) * 4;

      if (iteration === maxIterations) {
        data[index] = 0;
        data[index + 1] = 0;
        data[index + 2] = 0;
        data[index + 3] = 255;
      } else {
        var modulus = Math.sqrt(x * x + y * y);
        var smoothIteration = iteration + 1 - Math.log2(Math.log(modulus));
        var t = smoothIteration / maxIterations;
        var hue = (0.95 + 10 * t) % 1;
        var saturation = 0.85;
        var lightness = 0.5;
        var rgb = hslToRgb(hue, saturation, lightness);

        data[index] = rgb[0];
        data[index + 1] = rgb[1];
        data[index + 2] = rgb[2];
        data[index + 3] = 255;
      }
    }
  }

  ctx.putImageData(image, 0, 0);
}

canvas.addEventListener("click", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  var clickedX = minX + (mouseX / width) * (maxX - minX);
  var clickedY = minY + (mouseY / height) * (maxY - minY);

  var zoomFactor = 0.5;

  var rangeX = (maxX - minX) * zoomFactor;
  var rangeY = (maxY - minY) * zoomFactor;

  minX = clickedX - rangeX / 2;
  maxX = clickedX + rangeX / 2;
  minY = clickedY - rangeY / 2;
  maxY = clickedY + rangeY / 2;

  drawMandelbrot();
});

document.getElementById("zoomOutBtn").addEventListener("click", function () {
  var centerX = (minX + maxX) / 2;
  var centerY = (minY + maxY) / 2;

  var zoomOutFactor = 2;

  var rangeX = (maxX - minX) * zoomOutFactor;
  var rangeY = (maxY - minY) * zoomOutFactor;

  minX = centerX - rangeX / 2;
  maxX = centerX + rangeX / 2;
  minY = centerY - rangeY / 2;
  maxY = centerY + rangeY / 2;

  drawMandelbrot();
});

document.getElementById("resetBtn").addEventListener("click", function () {
  minX = -2.5;
  maxX = 1;
  minY = -1.5;
  maxY = 1.5;
  drawMandelbrot();
});

drawMandelbrot();
