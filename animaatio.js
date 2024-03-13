const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
viivat();

const images = document.querySelectorAll(".slotti");

const w = 150;
const h = 150;

function pelaa() {
    animate();
}

function animate() {
    update();
}

function viivat() {
    ctx.strokeStyle="black";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, 160, 200);
    ctx.strokeRect(160, 0, 310, 200);
    ctx.strokeRect(310, 0, 460, 200);
    ctx.strokeRect(620, 0, 620, 200);
}

function arvonta() {
    let num = Math.floor(Math.random() * 5);
    let image = images[num];
    return image;
}

const slot1 = {
    x: 5,
    y: 20
}
const slot2 = {
    x: 155,
    y: 20
}
const slot3 = {
    x: 315,
    y: 20
}
const slot4 = {
    x: 465,
    y: 20
}

function drawSlot() {
    ctx.drawImage(arvonta(), slot1.x, slot1.y, w, h);
    ctx.drawImage(arvonta(), slot2.x, slot2.y, w, h);
    ctx.drawImage(arvonta(), slot3.x, slot3.y, w, h);
    ctx.drawImage(arvonta(), slot4.x, slot4.y, w, h);
    viivat();

}



function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function update() {
    clear();
    drawSlot();
    requestAnimationFrame(update);
        
}
