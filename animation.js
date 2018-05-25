"use strict";

// Linear interpolation calculation, using formula: v = v1 + (t - t1) / (t2 - t1) × (v2 - v1)
function lerp(lowerBoundKey, lowerBoundValue, higherBoundKey, higherBoundValue, key) {
    if(key === lowerBoundKey) return lowerBoundValue;
    else if(key === higherBoundKey) return higherBoundValue;
    else return lowerBoundValue +
            ((key - lowerBoundKey)/(higherBoundKey - lowerBoundKey)) * (higherBoundValue - lowerBoundValue);
}

// Enter a lower bound key and get the higher bound key
function findInterval(keys, keyToFind) {
    for(var index = 0; index < keys.length; index += 1) {
        if(keys[index] > keyToFind) {
            return keys[index];
        }
    }

    return 0;
}

// Main interpolator
function interpolator(keys, values, key) {
    var higherBoundKey = findInterval(keys, key);

    var lowerBoundValue = values[keys.indexOf(higherBoundKey) - 1];
    var higherBoundValue = values[keys.indexOf(higherBoundKey)];
    var lowerBoundKey = keys[keys.indexOf(higherBoundKey) - 1];

    return lerp(lowerBoundKey, lowerBoundValue, higherBoundKey, higherBoundValue, key);
}

function leftLegRotater(time) {
    var keys = [0, 0.25, 0.5, 1, 1.25, 1.5]; // time keys
    var values = [2.5, 2.75, 3, 3, 2.75, 2.5]; // position (rotation) values

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("leftLeg_hip")) {
            object.rotation.y = resultValue;
        }
    });
}

function rightLegRotater(time) {
    var keys = [0, 0.25, 0.5, 1, 1.25, 1.5]; // time keys
    var values = [-2.5, -2.75, -3, -3, -2.75, -2.5]; // position (rotation) values

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("rightLeg_hip")) {
            object.rotation.y = resultValue;
        }
    });
}

function armHipRotater(time) {
    var keys = [0, 0.25, 0.5, 1, 1.25, 1.5]; // time keys
    var values = [0, -0.25, -0.5, -0.5, -0.25, 0]; // position (rotation) values

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("hip") && object.name.includes("Arm")) {
            object.rotation.z = resultValue;
        }
    });
}

function ankleRotater(time) {
    var keys = [0, 0.25, 0.5, 1, 1.25, 1.5]; // time keys
    var values = [-1, -0.75, -0.5, -0.5, -0.75, -1]; // position (rotation) values

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("ankle")) {
            object.rotation.z = resultValue;
        }
    });
}

function anklePawMover(time) {
    var keys = [0, 0.25, 0.5, 1, 1.25, 1.5];
    var values = [0.5, 1, 1, 1, 1, 0.5];

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("ankle") || object.name.includes("paw")) {
            object.position.x = resultValue;
        }
    })
}

function headMover(time) {
    var keys = [0, 0.25, 0.75, 1, 1.15, 1.5];
    var values = [0, 0.1, 0.3, 0.5, 0.3, 0];

    var resultValue = interpolator(keys, values, time);
    scene.traverse(function (object) {
        if (object.name.includes("lowerHead")) {
            object.rotation.z = resultValue;
        }
    })
}

function bodyMover(time) {
    var horizontalKeys = [0, 0.25, 0.75, 1, 1.35, 1.5];
    var horizontalValues = [0, 0.5, 1, 0.75, 0.5, 0];

    var horizontalValue = interpolator(horizontalKeys, horizontalValues, time);
    scene.traverse(function (object) {
        if(object.name.includes("torso")) {
            object.position.x += bodyXOffset;

            object.position.y = horizontalValue;

            // Turn to a random direction if the distance is longer than 20
            if(object.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 30 && horizontalValue < 0.05) {

                var rotationAngle = Math.random() * 3.14;

                object.rotation.y = rotationAngle;
                object.position.z = Math.tan(rotationAngle);
                bodyXOffset = -bodyXOffset;
            }
        }
    })
}
