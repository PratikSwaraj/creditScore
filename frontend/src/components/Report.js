import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css';

const Report = ({ uploadTrigger }) => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upload/data');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchData();
  }, [uploadTrigger]);

  if (reportData === null) return <div>No data available</div>;

  return (
    <div className='report'>
      <h1>Credit Report</h1>
      {reportData.map((report, index) => (
        <div key={index} className='all'>
          <section className='basic-details'>
            <h2>Basic Details</h2>
            <p>Name: {report.name}</p>
            <p>Mobile Phone: {report.mobilePhone}</p>
            <p>PAN: {report.PAN}</p>
            <p>Credit Score: {report.creditScore}</p>
          </section>

          <section className='account'>
            <h2>Report Summary</h2>
            <p>Total Accounts: {report.reportSummary.totalAccounts}</p>
            <p>Active Accounts: {report.reportSummary.activeAccounts}</p>
            <p>Closed Accounts: {report.reportSummary.closedAccounts}</p>
            <p>Current Balance: {report.reportSummary.currentBalance}</p>
            <p>Secured Accounts: {report.reportSummary.securedAccounts}</p>
            <p>Unsecured Accounts: {report.reportSummary.unsecuredAccounts}</p>
            <p>Last 7 Days Credit Enquiries: {report.reportSummary.creditEnquiries}</p>
          </section>

          <section className='account'>
            <h2>Credit Accounts Information</h2>
            {report.creditAccounts.map((account, accountIndex) => (
              <div key={accountIndex} className='account'>
                <p>Bank: {account.bank}</p>
                <p>Account Number: {account.accountNumber}</p>
                <p>Amount Overdue: {account.amountOverdue}</p>
                <p>Current Balance: {account.currentBalance}</p>
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default Report;
