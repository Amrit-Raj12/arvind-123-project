import React, { useState } from "react";
import "./style.css";
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Header = () => {
    const [displayClick, setDisplayClick] = useState(false)
    return (
        <div className="header">
            <div className="display-dropdown-box">
                <CgMenuLeftAlt />
                <div onClick={() => setDisplayClick(!displayClick)} className="display-container">
                    <p>Display</p>
                    <div>

                        <MdOutlineKeyboardArrowDown />
                    </div>
                    <div className={`${displayClick ? "display-open" : "display-hide"}`}>
                        <div className="grouping">
                            <div>
                                Grouping
                            </div>
                            <div>
                                <select className='select'>
                                    <option>Status</option>
                                </select>
                            </div>
                        </div>
                        <div className="ordering">
                            <div>
                                Ordering
                            </div>
                            <div>
                                <select className='select'>
                                    <option>Status</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <select className='select'>
                    <option>Display</option>
                </select> */}
            </div>
        </div>
    );
};

export default Header;
