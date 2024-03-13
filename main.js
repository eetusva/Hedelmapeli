const imagesPath = 'images/';
const images = [
    'seiska.png',
    'apple.png',
    'melon.png',
    'pear.png',
    'cherry.png'
];

var kuva1 = document.querySelectorAll('.ruutu img')[0];
var kuva2 = document.querySelectorAll('.ruutu img')[1];
var kuva3 = document.querySelectorAll('.ruutu img')[2];
var kuva4 = document.querySelectorAll('.ruutu img')[3];

const taulukko1Panos = [
    '10',
    '6',
    '5'
];
const taulukko2Panos =[
    '4',
    '3',
    '8'
];

const voittolinjat = new Map([
    ["0,0,0,0",10],
    ["1,1,1,1",6],
    ["2,2,2,2",5],
    ["3,3,3,3",4],
    ["4,4,4,4",3],
]);

let slots = [0,0,0,0];
const locks = [0,0,0,0];
let saaLukita = true;
var raha = 50; 
var panosNyt = 1;

document.getElementById("raha").innerHTML = raha;
document.getElementById("panos").innerHTML = panosNyt;

vaihdaKuva();

function arvonta(indevoittoteksti) {
    let num = Math.floor(Math.random() * 5);
    let image = imagesPath + images[num];
    slots[indevoittoteksti] = num;
    return image;
}

function pelaa() {
    if (raha <= 0) {
        document.getElementById("raha").innerHTML = "rahat loppu!";
    } else if (raha < panosNyt) {
        document.getElementById("raha").innerHTML = "pienennä panosta!";
    } else if (raha > 0) {
        rahaaPois();
        vaihdaKuva();
        lukituksenTarkistus();
        voitto();
    }
}

function rahaaPois() {
    raha -= panosNyt;
    document.getElementById("raha").innerHTML = raha;
}

function vaihdaKuva() {
    if (locks[0]==0) {kuva1.src = arvonta(0);}
    if (locks[1]==0) {kuva2.src = arvonta(1);}
    if (locks[2]==0) {kuva3.src = arvonta(2);}
    if (locks[3]==0) {kuva4.src = arvonta(3);}
}

function voitto() {
    let line = slots.toString();
    console.log(line)

    if (voittolinjat.has(line)) {
        let tulo = voittolinjat.get(line)*panosNyt;
        raha += tulo;
        voittotekstiNakyy(tulo);
        console.log(tulo)
    } else if (kuva2.isEqualNode(kuva3)&&kuva2.isEqualNode(kuva4)) {
        if (kuva2.src.lastIndexOf("seiska") >0) {
            raha += taulukko2Panos[2]*panosNyt;
            console.log(taulukko2Panos[2]*panosNyt)
            voittotekstiNakyy(taulukko2Panos[2]*panosNyt);
        }
    }
    document.getElementById("raha").innerHTML = raha;
}

function lukituksenTarkistus() {
    if (locks[0]+locks[1]+locks[2]+locks[3] > 0){
            
        for (let i=0; i < locks.length; i++) {
            if (locks[i] == 1){
                lukitse(i)
            }
        }

        saaLukita = false
    } else {
        saaLukita = true
    }
} 

function lukitse(indevoittoteksti){
    
    if (!saaLukita) {
        return
    }

    const lockButtons = document.querySelectorAll('.lukitse');

    if (locks[indevoittoteksti] == 0) {
        locks[indevoittoteksti] = 1
        lockButtons[indevoittoteksti].style.color = "white";
        lockButtons[indevoittoteksti].innerHTML = "LUKITTU";
    } else {
        locks[indevoittoteksti] = 0
        lockButtons[indevoittoteksti].style.color = "black";
        lockButtons[indevoittoteksti].innerHTML = "LUKITSE";
    }

}

function panos() {
    if (panosNyt >= 5) {
        panosNyt = 0;
    }
    panosNyt += 1;
    document.getElementById("panos").innerHTML = panosNyt;
    taulukonKerroin(panosNyt);
}

function taulukonKerroin(panosNyt) {
    for (let i = 0; i < 3; i++) {
        var tauluPanos1 = taulukko1Panos[i];
        tauluPanos1 *= panosNyt;
        document.getElementById("voittotaulu1").rows[i].cells.item(1).innerHTML = tauluPanos1;

        var tauluPanos2 = taulukko2Panos[i];
        tauluPanos2 *= panosNyt;
        document.getElementById("voittotaulu2").rows[i].cells.item(1).innerHTML = tauluPanos2;
    }
}

function voittotekstiNakyy(raha) {
    let voittoteksti = document.getElementById("voittoteksti");
    if (voittoteksti.style.visibility = "hidden") {
        voittoteksti.innerHTML = "VOITIT "+ raha;
        voittoteksti.style.visibility = "visible"
        setTimeout(() => {
            voittoteksti.style.visibility = "hidden";
        }, 2000);
    }
}
