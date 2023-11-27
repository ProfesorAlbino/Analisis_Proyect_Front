import { getLoanComputerEquipmentsByIdComputerEquipment } from "../../service/LoanComputerEquipment/LoanComputerEquipmentApi";

export function verifyLoanComputerEquipment(idComputerEquipment, idUser) {
    return getLoanComputerEquipmentsByIdComputerEquipment(idComputerEquipment, idUser).then((result) => {
        // El equipo ya está prestado
        console.log("Result: ");
        console.log(result);

        if (result.length > 0) {
            console.log("El equipo ya está prestado");
            return true;
        // El equipo no está prestado
        } else {
            console.log("El equipo no está prestado");
            return false;
        }
    })
}