
import React, { Component } from "react";
import Chart from "react-apexcharts";
import './App.css'

let title = "Customer Factors by SHAP (Influence)"
    let rawData = [{ data: [{category: 'No Dependents', value: -0.00001938942293076092}, { category: 'Female', value: -0.00026717189427143714}, {category: 'Male', value:  -0.0005232907930875493}, {category: 'Not Mailed Check Payee', value:  -0.0005487220199103432}, {category: 'Not Automatic Bank Transfer Payee', value: -0.0006245505282694173}, {category: 'Streams Movies', value: 0.0013647225463014638}, {category: 'Senior Citizen', value: 0.0017367287156557672}, {category: 'Streams TV', value: 0.0030285714470199214}, {category: 'Multiple Connections', value: 0.0031680384213858335}, {category: 'No Online Backup', value: -0.004111888843431638},{category: 'No Partner', value: -0.004719870960006737}, {category: 'Has Paperless Billing', value: 0.005488219197300191}, {category: 'No Device Protection', value: -0.005565946242091495}, {category: 'Not on a One Year Contract', value: -0.006838339139292652}, {category: 'High Monthly Charges', value: 0.011209298464709989}, {category: 'Electronic Check Payee', value: 0.014005256289228123}, {category: 'Has Not Online Security', value: -0.014860346270283079}, {category: 'Tech-Support Not Received	', value: -0.01949099969246843}, {category: 'Fibre-optic Internet Service', value: 0.02013372924682085}, {category: 'No DSL', value: -0.03796634059362966}, {category: 'Not on a Two Year Contract', value: -0.03963292478571879}, {category: 'Low Tenure', value: -0.04537876534008959}, {category: 'Low Total Charges', value: -0.05328149552478987}, {category: 'Month-to-Month Contract	', value: 0.056811212452705456}]}]
    let absoluteData = []
    let dataArray = []
    let categoriesArray = [] 
    let positiveArray = []

    //maps original data, converts to absolute values, and assigns boolean value to weather original value was negative or positive.
    rawData.map((item) =>{
      item.data.map((i) =>{
        let val = i.value
        if (val > 0){
         i.positive = true
        } else i.positive = false
        let absVal = Math.abs(val)
        let object = {category: i.category, value: absVal, positive: i.positive}
        absoluteData.push(object)
        return null
      })
      return null
    })


    //sorts data into descending order based on value
let sortedData = absoluteData.sort(function(a, b){return b.value-a.value})

let finalData = [{data: dataArray}]

//separates data out into necessary arrays for apexcharts to plot
sortedData.map((sort) =>{
 dataArray.push(sort.value)
 categoriesArray.push(sort.category)
 positiveArray.push(sort.positive)
 return null
})

class ApexChart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      options: {
        chart: {
          type: 'bar',
          fontFamily: 'Poppins',
        },
        //defines colour of bars depending on whether original value was negative or positive.
      colors: [function({ value }) {
        const index = dataArray.findIndex((e) => e === value);
          if (positiveArray[index] === true) {
              return '#5AC7B6'
          } else {
              return '#DE1E33'
          }
        }],
      plotOptions: {
        bar: {
            horizontal: true,
          }
      },
      dataLabels: {
        enabled: false
      },
      grid:{
        show: false
      },
      yaxis: {
        decimalsInFloat: 4
      },
      xaxis: {
        title: {
          text: 'Level Of Influence',
          style: {
            fontSize: '20px'
          },
        },
        tickAmount: 4,
        categories: categoriesArray,
      },
      legend: {
        show: true,
        style: {
        containerMargin: {
          left: 35,
          right: 60
          }
        },
        showForSingleSeries: true,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'center', 
        floating: true,
        fontSize: '14px',
        fontFamily: 'Poppins',
        fontWeight: 400,
        inverseOrder: false,
        width: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: ['Colour Guide', 'Positive Influence', 'Negative Influence'],
        offsetX: 0,
        offsetY: 0,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: ['#fff', '#5AC7B6', '#DE1E33'],
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      title: {
        text: title,
        align: 'left',
        margin: 50,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '20px',
          fontWeight:  'bold',
          color:  '#263238'
        },
      }
      } 
    };
  }
  render() {
    return (
      <>     
      <div id="chart">
      <Chart options={this.state.options} series={finalData} type="bar" />
      </div>
      </> 
    );
  }
}
export default ApexChart


