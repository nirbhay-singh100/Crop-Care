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
                <div className='plan-max-time'>maximum time: 7 months</div>
            </div>
            <div className='list-name'>provider: {preserverName}</div>
            <div className='list-price'><span style={{fontWeight:"700"}}>Cost: </span>{price}$ per kg</div>
        </div>
    )
}