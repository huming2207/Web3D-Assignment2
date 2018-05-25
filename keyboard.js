"use strict";

// Register key stroke event handlers
document.onkeyup = onKeyUp;
document.onkeydown = onKeyDown;

// Handle key up event (restore status)
function onKeyUp(event) {
    switch (event.keyCode) {

        // #77, key M, wire frame mode
        case 77: {
            mainMaterial.wireframe = false;
            torsoMaterial.wireframe = false;
            eyeMaterial.wireframe = false;
            break;
        }

        // #76, key L, basic debug mode
        case 76: {
            mainMaterial.color.setHex(0x378015); // Set back to white
            break;
        }

        // #80, key P, enable/disable simple animation
        case 80: {
            enableAnimation = !enableAnimation;
            break;
        }

        // Default: log it in console...
        default: {
            console.log("Key Up event: key #" + String(event.keyCode) + " is up.");
        }
    }

}

// Handle key down event (apply status)
// Key code reference from MDN: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
function onKeyDown(event) {
    switch (event.keyCode) {

        // #77, key M, wire frame mode
        case 77: {
            mainMaterial.wireframe = true;
            torsoMaterial.wireframe = true;
            eyeMaterial.wireframe = true;
            break;
        }

        // #76, key L, basic debug mode
        case 76: {
            mainMaterial.color.setHex(0xff9966);
            break;
        }

        // #72, key H, hip move
        case 72: {
            selectedNodes = "hip";
            console.log("Set selected node type to " + selectedNodes);
            break;
        }

        // #75, key K, knee move
        case 75: {
            selectedNodes = "knee";
            console.log("Set selected node type to " + selectedNodes);
            break;
        }

        // #65, key A, ankle move
        case 65: {
            selectedNodes = "ankle";
            console.log("Set selected node type to " + selectedNodes);
            break;
        }

        // #84, key T, toe (paw) move
        case 84: {
            selectedNodes = "paw";
            console.log("Set selected node type to " + selectedNodes);
            break;
        }

        // #37, left arrow key
        case 37: {
            selectedLeftRight = "left";
            console.log("Set selected left/right type to " + selectedLeftRight);
            break;
        }

        // #38, up arrow key
        case 38: {
            selectedArmLeg = "Arm";
            console.log("Set selected arm/leg type to " + selectedArmLeg);
            break;
        }

        // #37, right arrow key
        case 39: {
            selectedLeftRight = "right";
            console.log("Set selected left/right type to " + selectedLeftRight);
            break;
        }

        // #37, down arrow key
        case 40: {
            selectedArmLeg = "Leg";
            console.log("Set selected arm/leg type to " + selectedArmLeg);
            break;
        }

        // #107, plus key
        case 187: {
            increaseJointZ();
            break;
        }

        // #109, minus key
        case 189: {
            decreaseJointZ();
            break;
        }

        // Default: log it in console...
        default: {
            console.log("Key Down event: key #" + String(event.keyCode) + " is down.");
        }
    }
}