var playground = document.getElementById("playground");

var z1_canvas = document.getElementById("z1");
var z2_canvas = document.getElementById("z2");
var ze_canvas = document.getElementById("re");
var canvas_rect = z1_canvas.getBoundingClientRect();

var ctx_z1 = z1_canvas.getContext("2d");
var ctx_z2 = z2_canvas.getContext("2d");
var ctx_ze = ze_canvas.getContext("2d");

var size = { w: canvas_rect.width, h: canvas_rect.width };
var center = { x: size.w / 2, y: size.h / 2 };

var mouse_is_down = false;

var z1 = Complex(0 ,0);
var z2 = Complex(0 ,0);
var ze = Complex(0 ,0);

const division_line = 25;

var opbtn = document.getElementById("opbtn");

var z1_html = document.getElementById("z1t");
var z2_html = document.getElementById("z2t");
var ze_html = document.getElementById("zet");

const update_canvas = (ctx, canvas, e, c) => {
    ctx.clearRect(0, 0, z1_canvas.width, z1_canvas.height);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 3;

    
    var box = canvas.getBoundingClientRect();
    var offset = { x: box.x, y: box.y };
    var mouse_pos = { x: e.pageX - offset.x, y: e.pageY - offset.y};
    if ((mouse_pos.x >= 0 && mouse_pos.x <= size.w) && (mouse_pos.y >= 0 && mouse_pos.y <= size.h) ) {
        if (mouse_is_down) {
            var grid_pos = { x: (mouse_pos.x - center.x) / division_line, y: (mouse_pos.y - center.y) / division_line };
            c.re = grid_pos.x;
            c.im = grid_pos.y;
        }
    }

    draw_axis_lines(ctx);

    // Red dot
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.beginPath();
    ctx.arc(center.x + (c.re * division_line), center.y + (c.im * division_line), 10, 0, Math.PI * 2, true);
    ctx.fill();
    
}

const draw_axis_lines = (ctx) => {
    // X axis
    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(size.w, center.y);
    ctx.closePath();
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(center.x, 0);
    ctx.lineTo(center.x, size.h);
    ctx.closePath();
    ctx.stroke();


    for (let i = center.x + division_line; i < size.w; i += division_line) {
        ctx.beginPath();
        ctx.moveTo(i, center.y + 10);
        ctx.lineTo(i, center.y - 10);
        ctx.stroke();
        ctx.font = "12px serif";
        ctx.fillText(Math.floor(i / division_line) - 12, i - 3, center.y - 22);
    }

    for (let i = center.x - division_line; i > 0; i -= division_line) {
        ctx.beginPath();
        ctx.moveTo(i, center.y + 10);
        ctx.lineTo(i, center.y - 10);
        ctx.stroke();
        ctx.fillText(Math.floor(i / division_line) - 12, i - 8, center.y - 22);
    }

    for (let i = center.y + division_line; i < size.h; i += division_line) {
        ctx.beginPath();
        ctx.moveTo(center.x + 10, i);
        ctx.lineTo(center.x - 10, i);
        ctx.stroke();
        ctx.fillText(-(Math.floor(i / division_line) - 12), center.x - 33, i + 4);
    }

    for (let i = center.y - division_line; i > 0; i -= division_line) {
        ctx.beginPath();
        ctx.moveTo(center.x + 10, i);
        ctx.lineTo(center.x - 10, i);
        ctx.stroke();
        ctx.fillText(-(Math.floor(i / division_line) - 12), center.x - 29, i + 4);
    }

    ctx.font = "24px serif";
    ctx.fillText("Re(z)", size.w - 74, center.y + 32);
    ctx.fillText("Im(z)", center.x + 14, 0 + 24);
}


window.addEventListener("load", () => {
    z1_canvas.width  = canvas_rect.width;
    z1_canvas.height = canvas_rect.height;
    z2_canvas.width  = canvas_rect.width;
    z2_canvas.height = canvas_rect.height;
    ze_canvas.width  = canvas_rect.width;
    ze_canvas.height = canvas_rect.height;

    size = { w: canvas_rect.width, h: canvas_rect.width };
    center = { x: size.w / 2, y: size.h / 2 };
});

window.addEventListener("resize", () => {
    z1_canvas.width  = canvas_rect.width;
    z1_canvas.height = canvas_rect.height;
    z2_canvas.width  = canvas_rect.width;
    z2_canvas.height = canvas_rect.height;
    ze_canvas.width  = canvas_rect.width;
    ze_canvas.height = canvas_rect.height;

    size = { w: canvas_rect.width, h: canvas_rect.width };
    center = { x: size.w / 2, y: size.h / 2 };
});

window.addEventListener("mousedown", () => { mouse_is_down = true;  });
window.addEventListener("mouseup",   () => { mouse_is_down = false; });

window.addEventListener("mousemove", (e) => {
    var selected_op = opbtn.options[opbtn.selectedIndex].value;
    var op = "";
    switch (selected_op) {
        case "add": ze = z1.add(z2); op = "+"; break;
        case "sub": ze = z1.sub(z2); op = "-"; break;
        case "mul": ze = z1.mul(z2); op = "*"; break;
        case "div": ze = z1.div(z2); op = "/"; break;
    }

    update_canvas(ctx_z1, z1_canvas, e, z1);
    update_canvas(ctx_z2, z2_canvas, e, z2);
    update_canvas(ctx_ze, ze_canvas, e, ze);

    z1_html.textContent = "z1 = " + Math.ceil(z1.re * 100) / 100 + " + " + Math.ceil(z1.im * 100) / 100;
    z2_html.textContent = "z2 = " + Math.ceil(z2.re * 100) / 100 + " + " + Math.ceil(z2.im * 100) / 100;
    ze_html.textContent = "z1 " + op + " z2 = " + Math.ceil(ze.re * 100) / 100 + " + " + Math.ceil(ze.im * 100) / 100;
});
