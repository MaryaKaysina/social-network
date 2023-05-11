import React from 'react';
import { TrendData } from '@core/data/TrendData';

import "./trendCard.css";

const TrendCard = () => {
  return (
    <div className='trendCard'>
      <h3 className="trendCardTitile">Trends for you</h3>
      {TrendData.map((trend) => (
        <div className="trend" key={trend.id}>
          <span className="trendName">#{trend.name}</span>
          <span className="trendShare">{trend.shares}k shares</span>
        </div>
      ))}
    </div>
  )
}

export default TrendCard;