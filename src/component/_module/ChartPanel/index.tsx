import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./styles.module.scss";
import { IFilteredData } from "../../../utils/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  cartData: IFilteredData[];
  dataSourceTitleList: string[];
  campaignDataList: string[];
};

const ChartPanel: React.FC<Props> = ({ cartData, dataSourceTitleList, campaignDataList }) => {
  const dataSourceTitle =
    dataSourceTitleList[0] === "All"
      ? "All Datasources;"
      : `Datasource ${dataSourceTitleList
          .map(
            (item, index) => `"${item}"${index !== dataSourceTitleList.length - 1 ? " and" : ";"}`
          )
          .join(" ")}`;
  const campaignTitle =
    campaignDataList[0] === "All"
      ? "All Campaigns;"
      : `Campaign ${campaignDataList
          .map((item, index) => `"${item}"${index !== campaignDataList.length - 1 ? " and" : ";"}`)
          .join(" ")}`;

  const chartData = {
    labels: cartData.map((item) =>
      moment(moment(item.Date, "DD.MM.YYYY").toDate()).format("D.MMM")
    ),
    datasets: [
      {
        label: "Clicks",
        data: cartData.map((item) => item.Clicks),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        yAxisID: "y",
      },
      {
        label: "Impression",
        data: cartData.map((item) => item.Impressions),
        backgroundColor: "rgba(33, 36, 228, 0.2)",
        borderColor: "rgba(43, 143, 236, 1)",
        borderWidth: 2,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        mode: "index" as "y" | "index" | "x" | "dataset" | "point" | "nearest" | undefined,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Clicks",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          callback: (value: string | number) => {
            const val = value as number;
            if (val >= 1000000) {
              return (val / 1000000).toFixed(1) + "M";
            } else if (val >= 1000) {
              return val / 1000 + "k";
            } else {
              return val.toString();
            }
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Impression",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          callback: (value: string | number) => {
            const val = value as number;
            if (val >= 1000000) {
              return val / 1000000 + "M";
            } else if (val >= 1000) {
              return val / 1000 + "k";
            } else {
              return val.toString();
            }
          },
        },
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{dataSourceTitle + " " + campaignTitle}</p>
      <div>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ChartPanel;
