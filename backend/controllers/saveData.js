const Report = require('../models/report');

const saveData = async (data) => {
  try {
    console.log('Saving data:', data);

    // Clear previous data
    await Report.deleteMany({});

    const currentApplication = data.INProfileResponse.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0] || {};
    const caisSummary = data.INProfileResponse.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0] || {};
    const totalOutstandingBalance = data.INProfileResponse.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0] || {};
    const caisAccountDetails = data.INProfileResponse.CAIS_Account?.[0]?.CAIS_Account_DETAILS || [];

    const report = new Report({
      name: `${currentApplication.First_Name?.[0] || ''} ${currentApplication.Last_Name?.[0] || ''}`,
      mobilePhone: currentApplication.MobilePhoneNumber?.[0] || '',
      PAN: currentApplication.IncomeTaxPan?.[0] || '',
      creditScore: 0,  
      reportSummary: {
        totalAccounts: caisSummary.CreditAccountTotal?.[0] || 0,
        activeAccounts: caisSummary.CreditAccountActive?.[0] || 0,
        closedAccounts: caisSummary.CreditAccountClosed?.[0] || 0,
        currentBalance: totalOutstandingBalance.Outstanding_Balance_All?.[0] || 0,
        securedAccounts: totalOutstandingBalance.Outstanding_Balance_Secured?.[0] || 0,
        unsecuredAccounts: totalOutstandingBalance.Outstanding_Balance_UnSecured?.[0] || 0,
        creditEnquiries: 0,  
      },
      creditAccounts: caisAccountDetails.map(account => ({
        creditCard: account.CreditAccountType?.[0] || '',
        bank: account.Subscriber_Name?.[0] || '',
        address: account.Current_Address?.[0] || '',  // Add correct address field from XML
        accountNumber: account.Account_Number?.[0] || '',
        amountOverdue: account.Amount_Past_Due?.[0] || 0,
        currentBalance: account.Current_Balance?.[0] || 0,
      })),
    });

    await report.save();
    console.log('Data successfully saved.');
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

module.exports = { saveData };
