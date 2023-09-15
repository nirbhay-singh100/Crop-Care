import React from 'react';
import "./listcomponent.css"
export default function purchaseListComponent( {preserverName, price, typeOfPlan, preserverID, duration, startDate, Enddate, weight, totalPrice}){

    return (
        <div className='purchase-list-component'>
            <div>
                <div>
                {typeOfPlan}
                </div>
                <div>
                {preserverName}
                </div>
            </div>
            <div>
                <div>
                weight: {weight}
                </div>
                <div>
                    cost per kg: {price}
                </div>
            </div>
            <div>
                <div>
                    Total Cost: 
                </div>
                <div>
                    {totalPrice}
                </div>
            </div>
            <div>
                <div>
                Duration: 
                </div>
                <div>
                    {duration + " " + typeOfPlan==="Monthly"?"Months":"Weeks"} 
                </div>
            </div>
            <div>
                <div>
                    start date: {startDate}
                </div>
                <div>
                    end date: {Enddate}
                </div>
            </div>
            {/* <div className='list-plan'>
                <div className='list-plan-planname'>{typeOfPlan}</div>
                <div className='plan-max-time'>maximum time: 7 months</div>
            </div>
            <div className='list-name'>provider: {preserverName}</div>
            <div className='list-price'><span style={{fontWeight:"700"}}>Cost: </span>{price}$ per kg</div> */}
        </div>
    )
}

