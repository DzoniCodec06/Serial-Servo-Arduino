const { SerialPort, ReadlineParser } = require("serialport");

const VENDOR_ID = 2341;
const CH340_VENDOR_ID = "1A86";

const slideBar1 = document.getElementById("slider-1");
const slideBar2 = document.getElementById("slider-2");

const servoVal1 = document.getElementById("servo-1-value");
const servoVal2 = document.getElementById("servo-2-value");

const servo1Buttons = document.getElementById("serv-1-btn");
const servo2Buttons = document.getElementById("serv-2-btn");

const portName = document.getElementById("port-path");

window.onload = () => {
    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
    servoVal2.innerText = `Servo 2: ${slideBar2.value} °`;
}

SerialPort.list().then(boards => {
    console.log(boards[0]);

    if (boards[0].vendorId == VENDOR_ID || boards[0].vendorId == CH340_VENDOR_ID) {
        const port = new SerialPort({
            path: boards[0].path,
            baudRate: 9600,
            dataBits: 8,
            parity: "none",
            stopBits: 1,
            autoOpen: false
        });

        portName.innerHTML = port.path;
        
        const parser = new ReadlineParser({ delimiter: "\r\n" });
        port.pipe(parser);

        port.open((err) => {
            if (err) console.log("Error oppeinng port: ", err.message);
            else console.log(`Port is open ${port.path} at baud: ${port.baudRate}`);
        })

        slideBar1.oninput = () => {
            servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
            port.write(`1: ${slideBar1.value}\n`);
            //console.log(`Servo 1: ${slideBar1.value}`);
        }
        
        slideBar2.oninput = () => {
            servoVal2.innerText = `Servo 2: ${slideBar2.value} °`;
            port.write(`2: ${slideBar2.value}\n`);
            //console.log(`Servo 2: ${slideBar2.value}`);
        }

        servo1Buttons.addEventListener("click", e => {
            switch(e.target.value) {
                case "0":
                    slideBar1.value = e.target.value;
                    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
                    port.write(`1: ${e.target.value}\n`);
                    break;
                case "45":
                    slideBar1.value = e.target.value;
                    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
                    port.write(`1: ${e.target.value}\n`);
                    break;
                case "90":
                    slideBar1.value = e.target.value;
                    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
                    port.write(`1: ${e.target.value}\n`);
                    break;
                case "135":
                    slideBar1.value = e.target.value;
                    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
                    port.write(`1: ${e.target.value}\n`);
                    break;
                case "180":
                    slideBar1.value = e.target.value;
                    servoVal1.innerText = `Servo 1: ${slideBar1.value} °`;
                    port.write(`1: ${e.target.value}\n`);
                    break;
                default:
                    return;
            }
        });

        servo2Buttons.addEventListener("click", e => {
            switch(e.target.value) {
                case "0":
                    slideBar2.value = e.target.value;
                    servoVal2.innerText = `Servo 1: ${slideBar2.value} °`;
                    port.write(`2: ${e.target.value}\n`);
                    break;
                case "45":
                    slideBar2.value = e.target.value;
                    servoVal2.innerText = `Servo 1: ${slideBar2.value} °`;
                    port.write(`2: ${e.target.value}\n`);
                    break;
                case "90":
                    slideBar2.value = e.target.value;
                    servoVal2.innerText = `Servo 1: ${slideBar2.value} °`;
                    port.write(`2: ${e.target.value}\n`);
                    break;
                case "135":
                    slideBar2.value = e.target.value;
                    servoVal2.innerText = `Servo 1: ${slideBar2.value} °`;
                    port.write(`2: ${e.target.value}\n`);
                    break;
                case "180":
                    slideBar2.value = e.target.value;
                    servoVal2.innerText = `Servo 1: ${slideBar2.value} °`;
                    port.write(`2: ${e.target.value}\n`);
                    break;
                default:
                    return;
            }
        });

        parser.on("data", data => console.log(data));

    } else console.error("There is not any mcu board connected!");
    
});
