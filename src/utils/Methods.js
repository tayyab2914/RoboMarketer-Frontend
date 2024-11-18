export const UTILS_COMBINE_DATA = (
    FormValues,
) => {
    // console.log('UTILS_COMBINE_DATA',FormValues)
  // Get form values
  const combinedData = {
    industry_type: FormValues.industryType,
    max_daily_budget: FormValues.maxDailyBudget,
    clickthrough_rate_percentage: FormValues.ctr,
    cost_per_click_cpc: FormValues.cpc,
    cost_per_lead_cpl: FormValues.cpl,
    cost_per_appointment: FormValues.cpa,
    cost_per_sale_cpa: FormValues.cts,
    leads: FormValues.leads,
    appointments: FormValues.appointments,
    sales: FormValues.sales,
    revenue: FormValues.revenue,
    preferences: FormValues.preferences,
    file_group: FormValues.fileList,
    
  };

  return combinedData;
};
