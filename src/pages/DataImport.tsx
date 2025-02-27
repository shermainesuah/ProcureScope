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
import { useNavigate } from "react-router-dom";

const DataImport: React.FC = () => {
  const [uploadingDataScenario, setUploadingDataScenario] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invalidDataFormatScenario, setInvalidDataFormatScenario] =
    useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const navigate = useNavigate();

  const [recentImports] = useState([
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
  ]);

  const simulateUpload = async () => {
    setProgress(0);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
      if (i === 100) {
        setSuccessfullyUploaded(true);
      }
    }
  };

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
      <div className="gap-1 flex flex-col mb-10">
        <h1>Procurement Data Import</h1>
        <p className="text-textColor-secondary">
          Upload and manage your procurement data using a structured template to
          ensure consistency and accuracy.
        </p>
      </div>
      <button className="group w-fit flex items-center border-secondary border-2 font-medium text-textColor-primary px-4 py-2 rounded-lg hover:bg-secondary hover:border-secondary hover:text-white transition mb-6">
        Download Template
        <Download className="w-5 h-5 ml-2 text-primary group-hover:text-white" />
      </button>
      <p className="text-textColor-secondary mb-3 text-sm max-w-3xl">
        Preview of the required format for the template:
      </p>
      <div className="px-6 pt-6 border max-w-3xl">
        <table className="text-xs rounded-lg">
          <thead className="bg-gray">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Order Date</th>
              <th className="border p-2">Supplier</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Total Cost</th>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Region</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-textColor-primary">
              <td className="border p-2 border-l">PO-2024-00123</td>
              <td className="border p-2">2024-02-24</td>
              <td className="border p-2">ABC Agro Supplies</td>
              <td className="border p-2">Industrial Flour</td>
              <td className="border p-2">Raw Materials</td>
              <td className="border p-2">5000</td>
              <td className="border p-2">$2.50</td>
              <td className="border p-2">$12,500</td>
              <td className="border p-2">USD</td>
              <td className="border p-2">Philippines</td>
              <td className="border p-2 border-r">Asia</td>
            </tr>
            <tr>
              <td className="border p-2 border-l">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2">...</td>
              <td className="border p-2 border-r">...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10 w-full max-w-xl xl:max-w-2xl p-6 bg-white rounded-lg border relative">
        <button
          className="absolute text-white bottom-0"
          onClick={async () => {
            setUploadingDataScenario(true);
            await simulateUpload();
          }}
        >
          hi
        </button>
        <button
          className="absolute text-white right-0"
          onClick={async () => {
            setInvalidDataFormatScenario(true);
            await simulateFailUpload();
          }}
        >
          bye
        </button>
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Upload Procurement Data
        </h2>
        <div
          className="group border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-secondary"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 group-hover:text-secondary" />
          <p className="mt-4 text-textColor-secondary">
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
      {uploadingDataScenario && (
        <div className="mt-4 max-w-xl p-3 bg-gray rounded-md">
          <div className="flex  justify-between">
            <div className="flex gap-2">
              <File className="w-5 h-5 text-secondary" />
              <div className="flex flex-col">
                <p className="text-sm font-medium">
                  Asia-Wheat-T022-Data-12-02-2025.csv
                </p>
              </div>
            </div>
            {!successfullyUploaded && (
              <X className="w-5 h-5 text-primary hover:text-error hover:cursor-pointer" />
            )}
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
              <div className="mt-2 w-full rounded-full h-2.5 relative overflow-hidden bg-gray-200">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                ></motion.div>
              </div>
              <p className="ml-8 mr-1 text-sm text-textColor-secondary">
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
              <p className="ml-8 mr-1 text-sm text-textColor-secondary">
                {`${progress}%`}
              </p>
            </motion.div>
          )}
        </div>
      )}
      <h2 className="text-lg font-semibold mt-10 text-primary">
        Recently Uploaded
      </h2>
      <div className="mt-4 max-w-4xl">
        <div className="border overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray text-left text-sm text-textColor-primary">
                <th className="p-3">File Name</th>
                <th className="p-3">Date Uploaded</th>
                <th className="p-3">Total Records</th>
                <th className="p-3">File Owner</th>
              </tr>
            </thead>
            <tbody>
              {recentImports.map((importItem) => (
                <tr
                  key={importItem.id}
                  className="border-b text-textColor-primary text-sm"
                >
                  <td className="p-3">
                    <File className="w-4 h-4 inline-block mr-2" />
                    {importItem.fileName}
                  </td>
                  <td className="p-3">{importItem.date}</td>
                  <td className="p-3">{importItem.totalRecords}</td>
                  <td className="p-3">
                    <CircleUserRound className="w-4 h-4 inline-block mr-2" />
                    {importItem.owner}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="p-3 text-center">
                  <button
                    onClick={() => navigate("/files")}
                    className="text-textColor-primary hover:text-secondary text-sm font-medium"
                  >
                    View More
                    <ArrowRight className="w-4 h-4 inline-block ml-1" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataImport;
