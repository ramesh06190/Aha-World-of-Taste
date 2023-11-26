import React, { useState } from "react";

const options = {
  elementType: ["line", "area", "bar"],
  primaryAxisType: ["linear", "time", "log", "band"],
  secondaryAxisType: ["linear", "time", "log", "band"],
  primaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  interactionMode: ["primary", "closest"],
  tooltipGroupingMode: ["single", "primary", "secondary", "series"],
  tooltipAnchor: [
    "closest",
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "gridTop",
    "gridBottom",
    "gridLeft",
    "gridRight",
    "gridCenter",
    "pointer",
  ],
  tooltipAlign: [
    "auto",
    "top",
    "bottom",
    "left",
    "right",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center",
  ],
  snapCursor: [true, false],
  timeInterval: ["today", "week", "month"],
};

const optionKeys = Object.keys(options);

export default function useChartConfig({
  series,
  selectedInterval,
  orderCount,
  reserveCount,
  reviewCount,
  useR,
  show = [],
  count = 1,
  resizable = true,
  canRandomize = true,
  dataType = "time",
  elementType = "line",
  primaryAxisType = "time",
  secondaryAxisType = "linear",
  primaryAxisPosition = "bottom",
  secondaryAxisPosition = "left",
  primaryAxisStack = false,
  secondaryAxisStack = true,
  primaryAxisShow = true,
  secondaryAxisShow = true,
  tooltipAnchor = "closest",
  tooltipAlign = "auto",
  interactionMode = "primary",
  tooltipGroupingMode = "primary",
  snapCursor = true,
  timeInterval = "today",
}) {
  let datums;

  switch (selectedInterval) {
    case "7":
      datums = 7;
      break;
    case "30":
      datums = 30;
      break;
    default:
      datums = 30;
  }

  const convertedData = [];
const convertedReservationCountData = [];
const convertedReviewCountData = [];
for (const date in orderCount) {
  convertedData.push({
    day: date,
    orderCount: orderCount[date],
    reservationCount: reserveCount[date],
    ratingCount: reviewCount[date]
  });
}
console.log(convertedData , "convertedData")
for (const date in reserveCount) {
  convertedReservationCountData.push({
    day: date,
    orderCount: 0,
    reservationCount: reserveCount[date],
    ratingCount: 0
  });
}

for (const date in reviewCount) {
    convertedReviewCountData.push({
      day: date,
      orderCount: 0,
      reservationCount: 0,
      ratingCount: reviewCount[date]
    });
  }

  const [state, setState] = React.useState({
    count,
    resizable,
    canRandomize,
    dataType,
    elementType,
    primaryAxisType,
    secondaryAxisType,
    primaryAxisPosition,
    secondaryAxisPosition,
    primaryAxisStack,
    secondaryAxisStack,
    primaryAxisShow,
    secondaryAxisShow,
    tooltipAnchor,
    tooltipAlign,
    interactionMode,
    tooltipGroupingMode,
    snapCursor,
    datums,
    data: makeDataFrom(dataType, series, datums, useR, timeInterval, convertedData),
    timeInterval,
  });

  const [activeTab, setActiveTab] = useState(timeInterval);

  React.useEffect(() => {
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, useR, timeInterval, convertedData),
    }));
  }, [count, dataType, datums, series, useR, timeInterval, convertedData]);

  const randomizeData = (timeInterval) => {
    setActiveTab(timeInterval);
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, useR, timeInterval, convertedData),
    }));
  };

  const Options = optionKeys
    .filter((option) => show.indexOf(option) > -1)
    .map((option) => (
      <div key={option}>
        {option}: &nbsp;
        <div>
          <div>
            {options[option].map((interval) => (
              <button
                key={interval}
                className={activeTab === interval ? "active" : ""}
                onClick={() => randomizeData(interval)}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>
        <select
          value={state[option]}
          onChange={({ target: { value } }) =>
            setState((old) => ({
              ...old,
              [option]:
                typeof options[option][0] === "boolean"
                  ? value === "true"
                  : value,
            }))
          }
        >
          {options[option].map((d) => (
            <option value={d} key={d}>
              {d}
            </option>
          ))}
        </select>
        <br />
      </div>
    ));

  return {
    ...state,
    randomizeData,
    Options,
    selectedInterval,
  };
}

function makeDataFrom(dataType, series, datums, useR, timeInterval, convertedData) {
  const labels = ["Order Count", "Reservation Count", "Rating Count"];
  const data = makeSeries(labels, dataType, datums, useR, convertedData);

  return data;
}

function makeSeries(labels, dataType, datums, useR, convertedData) {
  const start = 0;
  const length = datums;

  // Ensure the labels array has at least 3 elements
  if (labels.length < 3) {
    throw new Error("You must provide at least 3 label names.");
  }

  const data = [];

  for (let i = 0; i < length; i++) {
    const item = convertedData[i] || {};
  

    let x = item.day || `Day ${start + i + 1}`;
    let yOrderCount = item.orderCount || 0;
    let yReservationCount = item.reservationCount || 0;
    let yRatingCount = item.ratingCount || 0;
    if (dataType === "ordinal") {
      // x = `Day ${start + i + 1}`;
    if (item.day !== undefined) {
      let x = item.date || `${item.day}`;
      let yOrderCount = item.orderCount || 0;
      let yReservationCount = item.reservationCount || 0;
      let yRatingCount = item.ratingCount || 0;
  
      if (dataType === "ordinal") {
        x = `${item.day}`;
      }
  
      data.push({
        primary: x,
        secondary: [yOrderCount, yReservationCount, yRatingCount],
      });
    }

    data.push({
      primary: x,
      secondary: [yOrderCount, yReservationCount, yRatingCount],
    });
  }}
  

  return labels.map((label, i) => {
    return {
      label: label,
      data: data.map((item) => ({
        primary: item.primary,
        secondary: item.secondary[i],
      })),
    };
  });
}