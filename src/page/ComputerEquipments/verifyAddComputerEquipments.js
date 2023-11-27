import { getComputerEquipmentByPlate, getComputerEquipmentBySerialNumber } from "../../service/ComputerEquipment/ComputerEquipmentApi";

export function verifyComponent(){
    let verify = true;

    let plate = document.getElementById('licensePlate');
    let clas = document.getElementById('class');
    let name = document.getElementById('name');
    let brand = document.getElementById('brand');
    let model = document.getElementById('model');
    let state = document.getElementById('state');
    let serialNumber = document.getElementById('serialNumber');

    verify=verifyC(plate, verify);
    verify=verifyC(clas, verify);
    verify=verifyC(name, verify);
    verify=verifyC(brand, verify);
    verify=verifyC(model, verify);
    verify=verifyC(state, verify);
    verify=verifyC(serialNumber, verify);

    return verify;
}

function verifyC(component, verify) {
    if (component.value === '') {
        document.getElementById('label_' + component.id).innerHTML = 'Dato necesario';
        if(verify){
            return false;
        }
    } else {
        document.getElementById('label_' + component.id).innerHTML = '';
    }
    return verify;
}

// export function verifySerialNumber(serialNumber){
//     let verify;

//         getComputerEquipmentBySerialNumber(serialNumber).then((result) => {
//             //El serial number ya esta registrado
//             if(result !== ""){
//                 document.getElementById('label_serialNumber').innerHTML = 'Número de serie registrado';
//                 verify= true;
//             //El serial number no esta registrado
//             }else{
//                 document.getElementById('label_serialNumber').innerHTML = '';
//                 console.log("numero serial no registrado");
//                 verify= false;
//                 console.log(verify);
//             }
//         }).catch(() => {
//             console.log("Error al cargar los datos");
//         });

//         return verify;
// }

// export function verifyPlate(plate){
//     let verify;
//     getComputerEquipmentByPlate(plate).then((result) => {
//         //La placa ya esta registrada
//         if(result !== ""){
//             document.getElementById('label_licensePlate').innerHTML = 'Placa registrada';
//             verify=true;
//         //La placa no esta registrada
//         }else{
//             document.getElementById('label_licensePlate').innerHTML = '';
//             console.log("Placa no registrada");
//             verify=false;
//             console.log(verify);
//         }
//     }).catch(() => {
//         console.log("Error al cargar los datos");
//     });
//     return verify;
// }

export function verifyPlate(plate) {
    return getComputerEquipmentByPlate(plate).then((result) => {
        // La placa ya está registrada
        if (result !== "") {
            document.getElementById('label_licensePlate').innerHTML = 'Placa registrada';
            return true;
        // La placa no está registrada
        } else {
            document.getElementById('label_licensePlate').innerHTML = '';
            console.log("Placa no registrada");
            return false;
        }
    })
}

export function verifySerialNumber(serialNumber) {
    return getComputerEquipmentBySerialNumber(serialNumber).then((result) => {
        // La numero serial ya está registrado
        if (result !== "") {
            document.getElementById('label_serialNumber').innerHTML = 'Número de serie registrado';
            return true;
        // La placa no está registrada
        } else {
            document.getElementById('label_serialNumber').innerHTML = '';
            console.log("numero serial no registrado");
            return false;
        }
    })
}