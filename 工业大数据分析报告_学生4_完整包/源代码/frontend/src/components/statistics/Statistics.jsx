import React, { useState } from "react";
import css from "./Statistics.module.css";
import { BsArrowUpShort } from "react-icons/bs";
import { groupNumber } from "../../data";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import StatisticsChart from '../statisticschart/StatisticsChart'
const Statistics = () => {

  const [on , setOn] = useState(false)
  return (
    <div className={`${css.container} theme-container`}>

<div>

      <span className={css.title}>统计概览</span>
      <div onClick={()=>setOn(!on)}>

      {on? <ToggleOnIcon/> :  <ToggleOffIcon/>}
      </div>
    
</div>
      <div className={`${css.cards} grey-container`}>
        <div>
          <div className={css.arrowIcon}>
            <BsArrowUpShort />
          </div>

          <div className={css.card}>
            <span>本月热销</span>
             <span>办公设备</span>
          </div>
        </div>

        <div className={css.card}>
          <span>商品</span>
           <span>${groupNumber(3800000)}</span>
        </div>
        <div className={css.card}>
          <span>利润</span>
           <span>${groupNumber(3800000)}</span>
        </div>
        <div className={css.card}>
          <span>日均</span> 
          <span>${groupNumber(3800000)}</span>
        </div>

      </div>
  

<StatisticsChart on={on}/>
    </div>

  );
};

export default Statistics;
