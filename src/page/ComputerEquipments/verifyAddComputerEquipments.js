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

    console.log(verify);

    return verify;
}

function verifyC(component){
    let verify=true;
    if(component.value === ''){
        document.getElementById('label_'+component.id).innerHTML = 'Dato necesario';
        if(verify===true){
            verify = false;
        }
    }
    return verify;
}

export function verifySerialNumber(serialNumber){
        getComputerEquipmentBySerialNumber(serialNumber).then((result) => {
            //El serial number ya esta registrado
            if(result.data !== undefined){
                document.getElementById('label_serialNumber').innerHTML = 'Número de serie registrado';
                console.log(result.data);
                return true;
            //El serial number no esta registrado
            }else{
                document.getElementById('label_serialNumber').innerHTML = '';
                return false;
            }
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
}

export function verifyPlate(plate){
    getComputerEquipmentByPlate(plate).then((result) => {
        //La placa ya esta registrada
        if(result !== undefined){
            document.getElementById('label_licensePlate').innerHTML = 'Placa registrada';
            return true;
        //La placa no esta registrada
        }else{
            document.getElementById('label_licensePlate').innerHTML = '';
            return false;
        }
    }).catch(() => {
        console.log("Error al cargar los datos");
    });
}