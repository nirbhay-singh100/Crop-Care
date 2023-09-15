import React from 'react';
import "./listcomponent.css"
export default function ListComponent({selectPreserver, preserverName, price, typeOfPlan, preserverID}){
    function handleClick(){
        selectPreserver({
            preserverName:preserverName,
            price:price,
            typeOfPlan:typeOfPlan,
            preserverID:preserverID,
        })
    }
    return (
        <div className='list-component' onClick={handleClick}>
            <div className='list-plan'>
                <div className='list-plan-planname'>{typeOfPlan}</div>
                <div className='plan-max-time'>Maximum Time: 7 Months</div>
            </div>
            <div className='list-name'>Provider: {preserverName}</div>
            <div className='list-price'><span style={{fontWeight:"700"}}>Cost: </span>{price} rs per kg</div>
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