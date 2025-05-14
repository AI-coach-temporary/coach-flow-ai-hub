
// Utility functions for generating different content styles and hashtags

export const generateProfessionalContent = (description: string, keywords: string[]): string => {
  const industryTerms = ['strategy', 'growth', 'leadership', 'success', 'productivity', 'business', 'coaching'];
  const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'professional';
  const randomTerm = industryTerms[Math.floor(Math.random() * industryTerms.length)];
  
  return `Unlock your full potential with these evidence-based ${usedKeyword} strategies that drive results. In my latest coaching session, we explored how implementing structured approaches can increase ${randomTerm} by 37%.\n\nThe key insight? Success leaves clues. By analyzing the patterns of high-performers in your industry, you can adapt their frameworks to your unique situation.\n\nWant to transform your results? Book a discovery call (link in bio) and let's create your customized ${randomTerm} roadmap.`;
};

export const generateInspiringContent = (description: string, keywords: string[]): string => {
  const inspiringTerms = ['journey', 'transformation', 'breakthrough', 'dream', 'vision', 'passion', 'purpose'];
  const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'journey';
  const randomTerm = inspiringTerms[Math.floor(Math.random() * inspiringTerms.length)];
  
  return `✨ Your ${usedKeyword} to greatness begins with a single brave decision! Today I witnessed a client achieve an incredible ${randomTerm} after committing to their vision despite all the doubts.\n\nRemember: the universe rewards courage. The path might not be clear yet, but that first step changes everything.\n\nWhat bold step will YOU take today? Comment below and let's inspire each other!`;
};

export const generatePlayfulContent = (description: string, keywords: string[]): string => {
  const playfulTerms = ['chaos', 'adventure', 'laughs', 'reality', 'struggle', 'journey', 'plot twist'];
  const usedKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : 'adventure';
  const randomTerm = playfulTerms[Math.floor(Math.random() * playfulTerms.length)];
  
  return `Okay let's be real... who else's ${usedKeyword} looks like complete ${randomTerm} with a side of "I'll figure it out tomorrow"? 🙋‍♀️😂\n\nNo judgment here! In today's coaching session we tackled the mess with some actually-fun strategies that won't make you want to throw your planner out the window!\n\nPro tip: Sometimes the most productive thing you can do is take a nap. Seriously. Science backs me up on this one. ✨`;
};

export const generateProfessionalHashtags = (keywords: string[]): string[] => {
  const baseHashtags = ['#ExecutiveCoaching', '#BusinessGrowth', '#LeadershipDevelopment', '#SuccessStrategies'];
  
  if (keywords.length > 0) {
    const additionalTags = keywords
      .slice(0, 3)
      .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}`);
    
    return [...baseHashtags, ...additionalTags];
  }
  
  return baseHashtags;
};

export const generateInspiringHashtags = (keywords: string[]): string[] => {
  const baseHashtags = ['#PersonalGrowth', '#TransformationJourney', '#MindsetShift', '#DreamBigger'];
  
  if (keywords.length > 0) {
    const additionalTags = keywords
      .slice(0, 3)
      .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}Journey`);
    
    return [...baseHashtags, ...additionalTags];
  }
  
  return baseHashtags;
};

export const generatePlayfulHashtags = (keywords: string[]): string[] => {
  const baseHashtags = ['#KeepingItReal', '#CoachHumor', '#EntrepreneurLife', '#ThatsHowWeRoll'];
  
  if (keywords.length > 0) {
    const additionalTags = keywords
      .slice(0, 3)
      .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}Problems`);
    
    return [...baseHashtags, ...additionalTags];
  }
  
  return baseHashtags;
};
