import React from 'react';

const CardStats = () => {
  return (
    <div className="stats shadow w-full">
      <div className="stat">
        <div className="stat-title">
          <a className="btn btn-ghost btn-active text-2xl">😍</a>
        </div>
        <div className="stat-value">31K</div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <a className="btn btn-ghost btn-active text-2xl">🤮</a>
        </div>
        <div className="stat-value">31K</div>
      </div>

      <div className="stat">
        <div className="stat-title">
          <a className="btn btn-ghost btn-active text-2xl">❤️‍🔥</a>
        </div>
        <div className="stat-value">31K</div>
      </div>
    </div>
  );
};

export default CardStats;
