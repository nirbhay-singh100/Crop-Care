import React from "react";
import "./split.css";
export default function Split() {
    // const left = document.querySelector(".left");
    // const right = document.querySelector(".right");
    // const container = document.querySelector(".container");

    function mouseEnterLeft(){
        const l = document.getElementById("left");
        l.classList.add("hover-left");
    }
    function mouseLeaveLeft(){
        const l = document.getElementById("left");
        l.classList.remove("hover-left");
    }
    function mouseEnterRight(){
        const l = document.getElementById("right");
        l.classList.add("hover-right");
    }
    function mouseLeaveRight(){
        const l = document.getElementById("right");
        l.classList.remove("hover-right");
    }
    // left.addEventListener("mouseenter", () => {
    //     container.classList.add("hover-left");
    // });

    // left.addEventListener("mouseleave", () => {
    //     container.classList.remove("hover-left");
    // });

    // right.addEventListener("mouseenter", () => {
    //     container.classList.add("hover-right");
    // });

    // right.addEventListener("mouseleave", () => {
    //     container.classList.remove("hover-right");
    // });

    return (
        <div>
            <div className="container">
                <div className="split left" id="left" onMouseEnter={mouseEnterLeft} onMouseLeave={mouseLeaveLeft}>
                    <h1>Farmer</h1>
                    <a href="/register" className="button">Click Here</a>
                </div>
                <div className="split right" id="right" onMouseEnter={mouseEnterRight} onMouseLeave={mouseLeaveRight}>
                    <h1>Preserver</h1>
                    <a href="/register" className="button">Click Here</a>
                </div>
            </div>
        </div>
    )
}