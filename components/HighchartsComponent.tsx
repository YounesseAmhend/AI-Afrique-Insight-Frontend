'use client';

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Optional: Import additional modules if needed
// import Exporting from 'highcharts/modules/exporting';
// Exporting(Highcharts);

const HighchartsComponent: React.FC = () => {
  const options: Highcharts.Options = {
    title: {
      text: 'Sample Chart',
    },
    series: [
      {
        type: 'line',
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HighchartsComponent;
