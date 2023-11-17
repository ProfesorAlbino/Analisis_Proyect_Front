import { React, useState, useEffect } from "react";

export default function ReserveLoanComputerEquipment() {
    let idUser = localStorage.getItem("idUser");
    let idComputerEquipment = localStorage.getItem("idComputerEquipment");

    const [loan, setLoans] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });

    const [loanComputerEquipment, setLoanComputerEquipment] = useState({
        id: 0,
        idLoan: 0,
        idComputerEquipment: idComputerEquipment, 
        idLibraryUser: idUser,
        assets: "",
        assetEvaluation: 0,
        destinationPlace: "",
        state: "",
        dependence: "",
        requestActivity: ""
    });

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setLoans({ ...loan, registerDate: formattedDate });
        
    }, []);

    return (
        <div>
            
        </div>
    )
}