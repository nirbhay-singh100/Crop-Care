import React from 'react';
import "./listcomponent.css"
export default function ListComponent({selectPreserver, name}){
    function handleClick(){
        selectPreserver({
            name:name,
            email:"harshitbamotra.01@gmail.com",
            age:"69"
        })
    }
    return (
        <div className='list-component' onClick={handleClick}>
            <div className='list-plan'>
                <div className='list-plan-planname'>monthly plan</div>
                <div className='plan-max-time'>maximum time: 7 months</div>
            </div>
            <div className='list-name'>{name}</div>
            <div className='list-price'><span style={{fontWeight:"700"}}>Cost: </span>30$ per kg</div>
        </div>
    )
}



// const ListComponent = (props) => {
//     // function handleClick(){
//     //     selectPreserver({
//     //         // name:name,
//     //         // email:"harshitbamotra.01@gmail.com",
//     //         // age:"69"
//     //     })
//     // }

//     function handleClick() {
        
//     }
//     return (
//         <div className='list-component' onClick={handleClick}>
//             <div className='list-plan'>
//                 <div className='list-plan-planname'>{props.typeOfPlan}</div>
//                 <div className='plan-max-time'>maximum time: 7 months</div>
//             </div>
//             <div className='list-name'>{props.preserverName}</div>
//             <div className='list-price'><span style={{ fontWeight: "700" }}>Cost: </span>{ props.price}</div>
//         </div>
//     )
// }

// export default ListComponent;