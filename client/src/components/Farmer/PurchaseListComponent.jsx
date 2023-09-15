import React from 'react';
import "./purchaseList.css"
export default function purchaseListComponent({ preserverName, price, typeOfPlan, preserverID, duration, startDate, endDate, weight, totalPrice }) {

    return (
        <div className='purchase-list-component'>
            <div className='purchase-list-box'>
                <div className='type-of-plan'>
                    <div>
                        {typeOfPlan}
                    </div>
                    <div>
                        {preserverName}
                    </div>
                </div>
                <div className='purchase-list-weight'>
                    <div>
                        weight: {weight}
                    </div>
                    <div>
                        cost per kg: {price}
                    </div>
                </div>
                <div className='purchase-list-cost'>
                    <div>
                        Total Cost:
                    </div>
                    <div>
                        {totalPrice}
                    </div>
                </div>
                <div className='purchase-list-duration'>
                    <div>
                        Duration: {duration}
                    </div>
                    <div>
                        {duration + " " + typeOfPlan === "Monthly" ? "Months" : "Weeks"}
                    </div>
                </div>
                <div className='purchase-list-date'>
                    <div>
                        start date: {startDate}
                    </div>
                    <div>
                        end date: {endDate}
                    </div>
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

