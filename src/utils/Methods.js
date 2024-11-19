export const GET_PROMPT_CATEGORIES = [
        { header: "Campaign", key: "2", icon: 'note' },
        { header: "Analytics", key: "3", icon: 'analytics' },
        { header: "Questions", key: "4", icon: 'question' },
        { header: "Help", key: "5", icon: 'help' },
        { header: "Copywriting", key: "6", icon: 'copywriting' },
        { header: "Recommendations", key: "7", icon: 'recommendations' },
        { header: "CRO", key: "8", icon: 'cro' },
        { header: "Funnels", key: "9", icon: 'funnels' },
        { header: "Marketing", key: "10", icon: 'marketing' },
        { header: "Strategy", key: "11", icon: 'strategy' },
        { header: "Offer", key: "12", icon: 'offer' },
        { header: "Competitors", key: "13", icon: 'competitor' },
        { header: "Charts", key: "14", icon: 'chart' }
      ];


      export const FILTER_PROMPTS_BY_CATEGORY = (dataArray, category)=> {
        console.log(dataArray)
        return dataArray.filter(item => item.category === category);
      }