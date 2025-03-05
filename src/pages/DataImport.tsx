import { useEffect, useState } from "react";
import {
  Upload,
  Download,
  File,
  X,
  ArrowRight,
  CircleUserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileDataList } from "../types";
import { formatDate } from "../utils";

const recentImportData: FileDataList = [
  {
    id: 1,
    fileName: "procurement_jan.xlsx",
    date: "2025-02-25",
    owner: "Maria Gondalez",
    totalRecords: 1500,
  },
  {
    id: 2,
    fileName: "procurement_feb.csv",
    date: "2025-02-20",
    owner: "Maria Gondalez",
    totalRecords: 2000,
  },
  {
    id: 3,
    fileName: "procurement_mar.xlsx",
    date: "2025-02-15",
    owner: "Jones Brooke",
    totalRecords: 1800,
  },
  {
    id: 4,
    fileName: "procurement_apr.xlsx",
    date: "2025-02-10",
    owner: "Maria Gondalez",
    totalRecords: 2200,
  },
  {
    id: 5,
    fileName: "procurement_may.csv",
    date: "2025-02-05",
    owner: "James Young",
    totalRecords: 1700,
  },
];

const DataImport = () => {
  const [progress, setProgress] = useState(0);
  const [successUploadScenario, setSuccessUploadScenario] = useState(false);
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invalidDataFormatScenario, setInvalidDataFormatScenario] =
    useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  // For demo purposes to stimulate successfully uploaded scenario
  const simulateSuccessUpload = async () => {
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
      if (i === 100) {
        setSuccessfullyUploaded(true);
      }
    }
  };

  // For demo purposes to stimulate failed uploaded scenario
  const simulateFailUpload = async () => {
    setProgress(0);
    for (let i = 0; i <= 70; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
      if (i === 70) {
        setFailedUpload(true);
      }
    }
  };

  useEffect(() => {
    if (successfullyUploaded) {
      const delay = setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [successfullyUploaded]);

  useEffect(() => {
    if (failedUpload) {
      const delay = setTimeout(() => {
        setShowFailed(true);
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [failedUpload]);

  return (
    <div className="main-container">
      <div className="gap-1 flex flex-col">
        <h1>Procurement Data Import</h1>
        <p className="text-tertiary">
          Upload and manage your procurement data using a structured template to
          ensure consistency and accuracy.
        </p>
      </div>
      <div className="mt-10 space-y-10">
        <div>
          <button className="group w-fit flex items-center border-secondary border-2 font-medium text-primary px-4 py-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mb-6">
            Download Template
            <Download className="w-5 h-5 ml-2 text-primary group-hover:text-white" />
          </button>
          <p className="text-tertiary mb-3 text-sm max-w-3xl">
            Preview of the required format for the template:
          </p>
          <div className="px-6 pt-6 border max-w-3xl">
            <table className="text-xs rounded-lg text-primary">
              <thead className="bg-gray">
                <tr className="[&>th]:p-2 [&>th]:border">
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Supplier</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Cost</th>
                  <th>Currency</th>
                  <th>Country</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                <tr className="[&>td]:p-2 [&>td]:border">
                  <td className="border-l">PO-2024-00123</td>
                  <td>2024-02-24</td>
                  <td>ABC Agro Supplies</td>
                  <td>Industrial Flour</td>
                  <td>Raw Materials</td>
                  <td>5000</td>
                  <td>$2.50</td>
                  <td>$12,500</td>
                  <td>USD</td>
                  <td>Philippines</td>
                  <td className="border-r">Asia</td>
                </tr>
                <tr className="[&>td]:p-2 [&>td]:border">
                  <td className="border-l">...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td className="border-r">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="w-full max-w-xl xl:max-w-2xl p-6 rounded-lg border relative">
            {/* Hidden buttons for demo purposes*/}
            <button
              className="absolute text-white bottom-0"
              onClick={async () => {
                setSuccessUploadScenario(true);
                await simulateSuccessUpload();
              }}
            >
              success
            </button>
            <button
              className="absolute text-white right-0"
              onClick={async () => {
                setInvalidDataFormatScenario(true);
                await simulateFailUpload();
              }}
            >
              fail
            </button>
            <h2 className="mb-4">Upload Procurement Data</h2>
            <div
              className="group border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-secondary"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 group-hover:text-secondary" />
              <p className="mt-4 text-tertiary">
                Drag & drop a CSV or Excel file here
              </p>
              <p className="text-gray-500 text-sm">or click to select a file</p>
              <input
                id="fileInput"
                type="file"
                accept=".csv,.xls,.xlsx"
                className="hidden"
              />
            </div>
          </div>
          {successUploadScenario && (
            <div className="mt-4 max-w-xl p-3 bg-gray rounded-md">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <File className="w-5 h-5 text-secondary" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      Asia-Wheat-T022-Data-12-02-2025.csv
                    </p>
                  </div>
                </div>
              </div>
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-2 text-success mt-2"
                >
                  <p className="text-sm">File successfully uploaded.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: progress === 100 ? 0 : 1 }}
                  transition={{ duration: progress === 100 ? 1 : 0 }}
                  className="flex flex-row justify-between mt-2"
                >
                  <div className="mt-2 w-full rounded-full h-2.5 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <p className="ml-8 mr-1 text-sm text-tertiary">
                    {`${progress}%`}
                  </p>
                </motion.div>
              )}
            </div>
          )}
          {invalidDataFormatScenario && (
            <div className="mt-4 max-w-xl p-3 bg-gray rounded-md">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <File className="w-5 h-5 text-secondary" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      Asia-Wheat-T022-Data-12-02-2025.csv
                    </p>
                  </div>
                </div>
                {failedUpload && (
                  <X className="w-5 h-5 text-primary hover:text-error hover:cursor-pointer" />
                )}
              </div>
              {showFailed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-2 text-error mt-2"
                >
                  <p className="text-sm">
                    Upload failed: Invalid data format for Unit Price field.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: progress === 70 ? 0 : 1 }}
                  transition={{ duration: progress === 70 ? 1 : 0 }}
                  className="flex flex-row justify-between mt-2"
                >
                  <div className="mt-2 w-full rounded-full h-2.5 relative overflow-hidden bg-gray">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <p className="ml-8 mr-1 text-sm text-tertiary">
                    {`${progress}%`}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
        <div>
          <h2>Recently Uploaded</h2>
          <div className="mt-4 max-w-4xl">
            <table className="w-full border">
              <thead className="bg-gray text-left text-sm text-primary">
                <tr className="[&>th]:p-3">
                  <th>File Name</th>
                  <th>Date Uploaded</th>
                  <th>Total Records</th>
                  <th>File Owner</th>
                </tr>
              </thead>
              <tbody>
                {recentImportData.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b text-primary text-sm [&>td]:p-3"
                  >
                    <td>
                      <File className="w-4 h-4 inline-block mr-2" />
                      {data.fileName}
                    </td>
                    <td>{formatDate(data.date)}</td>
                    <td>{data.totalRecords}</td>
                    <td>
                      <CircleUserRound className="w-4 h-4 inline-block mr-2" />
                      {data.owner}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    <Link
                      to="/files"
                      className="text-primary hover:text-secondary text-sm font-medium"
                    >
                      View More
                      <ArrowRight className="w-4 h-4 inline-block ml-1" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataImport;
