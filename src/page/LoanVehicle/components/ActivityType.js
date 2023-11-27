

function ActivityType (props){
    console.log(props);
    let activity=props.activity;

    const getTypeActivity = ()=>{
        let typeActivity="";
//Investigación
let types=['Investigación','Docente',' Acción Social','Administrativa','Vida Estudiantil','Dirección'];
typeActivity=types[activity-1]; 
        return typeActivity
    }
    return(
        <div>{getTypeActivity()}</div>
        );
}
export default ActivityType;