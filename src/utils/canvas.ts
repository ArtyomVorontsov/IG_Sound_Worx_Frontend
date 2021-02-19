export const canvasFunc = (canvasId) => {

    debugger
    let c = document.getElementById(canvasId); // Grab canvas object

    debugger
    //@ts-ignore
    let ctx = c.getContext("2d"); // Define canvas context
    //@ts-ignore
    let w = c.width;
    //@ts-ignore
    let h = c.height / 2;
    let f = 1;
    function calcSineY(x) {
        return h - h * Math.sin(x * 2 * Math.PI * (f / w));
    }
    function drawSine(x) {
        ctx.clearRect(0, 0, w, h * 2);

        ctx.beginPath();
        ctx.strokeStyle = "#5361e0"
        for (let i = 0; i < x; i++) {
            if (i / 3 == Math.round(i / 3)) {
                let y = calcSineY(i);
                ctx.moveTo(i, h);
                ctx.lineTo(i, y);
            }
        }
        ctx.stroke();
    }

    let x = 0;

    let interval = setInterval(function () {
        drawSine(x);
        x++;
        if (x > w) {
            x = 0; f++;
        }
    }, 1);
}