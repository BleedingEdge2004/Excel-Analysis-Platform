import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import "./ExcelVisualizer.css";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ExcelVisualizer() {
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  // Chart refs
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const donutRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      setExcelData(data);
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = () => {
    if (excelData.length === 0) {
      alert("Please upload a valid Excel file first.");
    } else {
      alert("File uploaded and data processed successfully!");
    }
  };

  const generateChartData = () => {
    if (!xAxis || !yAxis) return null;

    const labels = excelData.map((row) => {
      const value = row[xAxis];
      if (typeof value === "number" && value > 40000) {
        const date = new Date((value - 25569) * 86400 * 1000);
        return date.toISOString().split("T")[0];
      }
      return value;
    });

    const values = excelData.map((row) => {
      const val = Number(row[yAxis]);
      return isNaN(val) ? 0 : val;
    });

    return {
      labels,
      datasets: [
        {
          label: `${yAxis} vs ${xAxis}`,
          data: values,
      backgroundColor: [
        "rgba(192, 128, 75, 0.6)",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#C9CBCF",
        "#8ED1FC",
        "#FF8A65",
        "#BA68C8"
      ],
          borderColor: "rgba(58, 5, 248, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const downloadChart = (ref, name) => {
    if (ref.current) {
      const link = document.createElement("a");
      link.href = ref.current.toBase64Image();
      link.download = `${name}-${new Date().toISOString().split("T")[0]}.png`;
      link.click();
    }
  };

  const chartData = generateChartData();

  return (
    <div className="excel-visualizer">

      <div className="upload-section">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <span className="upload-text">Upload Excel File</span>
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {columns.length > 0 && (
        <div className="select-section">
          <label>
            X-Axis:
            <select
              onChange={(e) => setXAxis(e.target.value)}
              value={xAxis}
              className="dropdown"
            >
              <option value="">Select</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </label>

          <label>
            Y-Axis:
            <select
              onChange={(e) => setYAxis(e.target.value)}
              value={yAxis}
              className="dropdown"
            >
              <option value="">Select</option>
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {chartData && (
        <div className="chart-container">
          <div className="chart-box">
            <h4>📊 Bar Chart</h4>
            <Bar data={chartData} ref={barRef} />
            <button
              className="download-btn"
              onClick={() => downloadChart(barRef, "bar-chart")}
            >
              ⬇️ Download Bar Chart
            </button>
          </div>

          <div className="chart-box">
            <h4>📈 Line Chart</h4>
            <Line data={chartData} ref={lineRef} />
            <button
              className="download-btn"
              onClick={() => downloadChart(lineRef, "line-chart")}
            >
              ⬇️ Download Line Chart
            </button>
          </div>

          <div className="chart-box">
            <h4>🍩 Donut Chart</h4>
            <Doughnut data={chartData} ref={donutRef} />
            <button
              className="download-btn"
              onClick={() => downloadChart(donutRef, "donut-chart")}
            >
              ⬇️ Download Donut Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
