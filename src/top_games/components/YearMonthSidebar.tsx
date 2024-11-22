import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAvailableMonths } from "../utils/dataLoader";
import "./YearMonthSidebar.css";

interface YearMonthData {
  [year: string]: string[];
}

const YearMonthSidebar: React.FC = () => {
  const [yearMonthData, setYearMonthData] = useState<YearMonthData>({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadMonths = async () => {
      try {
        setLoading(true);
        const months = await getAvailableMonths();
        setYearMonthData(months);
      } catch (error) {
        console.error("Error loading months:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMonths();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="year-month-sidebar">
      <h3>Top Games</h3>
      {Object.entries(yearMonthData)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, months]) => (
          <div key={year} className="year-section">
            <h4>{year}</h4>
            <ul className="months-list">
              {months.map((month) => (
                <li key={`${year}-${month}`}>
                  <Link
                    to={`/top-games/${year}/${month}`}
                    className={
                      location.pathname === `/top-games/${year}/${month}`
                        ? "active"
                        : ""
                    }
                  >
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default YearMonthSidebar;
