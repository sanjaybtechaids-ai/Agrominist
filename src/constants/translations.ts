import { SupportedLanguage } from '@/types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  roles: {
    farmer: string;
    customer: string;
  };
  nav: {
    overview: string;
    myLand: string;
    cropSuggestions: string;
    fertilizerAdvisory: string;
    afterHarvesting: string;
    marketplace: string;
    analytics: string;
    notifications: string;
    profileSettings: string;
    logout: string;
    login: string;
    backToDashboard: string;
    viewCart: string;
  };
  dashboard: {
    welcome: string;
    goodMorning: string;
    demoNotice: string;
    temp: string;
    humidity: string;
    expectedRainfall: string;
    nextRainfall: string;
    registeredLand: string;
    currentCrop: string;
    soilStatus: string;
    upcomingTasks: string;
    weatherForecast7Days: string;
    todayAdvisory: string;
    recommendedCrops: string;
    farmingTimeline: string;
  };
  land: {
    title: string;
    subtitle: string;
    divisionPlanner: string;
    totalLand: string;
    allocatedLand: string;
    unallocatedLand: string;
    addPlot: string;
    removePlot: string;
    selectCrop: string;
    allocationPresets: string;
    singleCrop: string;
    twoCrop: string;
    threeCrop: string;
    custom: string;
    estimatedYield: string;
    estimatedRevenue: string;
    estimatedExpenses: string;
    estimatedProfit: string;
  };
  crops: {
    title: string;
    subtitle: string;
    seasonFilter: string;
    categoryFilter: string;
    compareTitle: string;
    compareButton: string;
    suitability: string;
    duration: string;
    waterRequirement: string;
    sowing: string;
    harvesting: string;
    disclaimer: string;
  };
  fertilizers: {
    title: string;
    subtitle: string;
    organic: string;
    chemical: string;
    calculator: string;
    schedule: string;
    precautions: string;
    disclaimer: string;
  };
  harvesting: {
    title: string;
    subtitle: string;
    previousCrop: string;
    soilRestoration: string;
    cropRotation: string;
    residueManagement: string;
    nextCropRecommendation: string;
    timeline: string;
  };
  marketplace: {
    title: string;
    subtitle: string;
    createListing: string;
    activeListings: string;
    pricePerUnit: string;
    quantity: string;
    contactFarmer: string;
    pickupDelivery: string;
    interestedBuyers: string;
    searchPlaceholder: string;
  };
  voice: {
    title: string;
    subtitle: string;
    listening: string;
    speakNow: string;
    typeQuery: string;
    askQuestion: string;
    playAudio: string;
    stopAudio: string;
  };
  common: {
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    loading: string;
    measured: string;
    estimated: string;
    unavailable: string;
    viewDetails: string;
    filter: string;
    search: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'Agronomist',
    tagline: 'Smart Farming. Better Decisions. Fair Markets.',
    roles: {
      farmer: 'Farmer',
      customer: 'Customer / Buyer',
    },
    nav: {
      overview: 'Overview',
      myLand: 'My Land',
      cropSuggestions: 'Crop Suggestions',
      fertilizerAdvisory: 'Fertilizer Advisory',
      afterHarvesting: 'After Harvesting',
      marketplace: 'Marketplace',
      analytics: 'Farming Analytics',
      notifications: 'Notifications',
      profileSettings: 'Profile & Settings',
      logout: 'Logout',
      login: 'Login',
      backToDashboard: 'Back to Dashboard',
      viewCart: 'View Items',
    },
    dashboard: {
      welcome: 'Welcome back',
      goodMorning: 'Good morning',
      demoNotice: 'Demonstration Mode: Values shown are realistic sample data for review and planning.',
      temp: 'Temperature',
      humidity: 'Humidity',
      expectedRainfall: 'Expected Rain',
      nextRainfall: 'Next Rain Forecast',
      registeredLand: 'Registered Land',
      currentCrop: 'Current Crop',
      soilStatus: 'Soil Health Status',
      upcomingTasks: 'Upcoming Agricultural Tasks',
      weatherForecast7Days: '7-Day Agro-Weather Forecast',
      todayAdvisory: "Today's Agricultural Advisory",
      recommendedCrops: 'AI Recommended Crops',
      farmingTimeline: 'Current Cultivation Timeline',
    },
    land: {
      title: 'Land & Soil Management',
      subtitle: 'Monitor parcel parameters, soil nutrients, and plan multi-plot crop divisions.',
      divisionPlanner: 'Smart Land Division Planner',
      totalLand: 'Total Land Area',
      allocatedLand: 'Allocated Area',
      unallocatedLand: 'Unallocated Area',
      addPlot: 'Add Plot',
      removePlot: 'Remove Plot',
      selectCrop: 'Select Crop',
      allocationPresets: 'Suggested Division Presets',
      singleCrop: 'Single Crop (100%)',
      twoCrop: 'Dual Crop (50% + 50%)',
      threeCrop: 'Tri-Crop (40% + 30% + 30%)',
      custom: 'Custom Allocation',
      estimatedYield: 'Est. Yield',
      estimatedRevenue: 'Est. Revenue',
      estimatedExpenses: 'Est. Expenses',
      estimatedProfit: 'Est. Net Profit',
    },
    crops: {
      title: 'Intelligent Crop Advisory',
      subtitle: 'Data-driven crop recommendations optimized for climate, soil type, and mandi prices.',
      seasonFilter: 'Filter by Season',
      categoryFilter: 'Filter by Category',
      compareTitle: 'Compare Crops',
      compareButton: 'Compare Selected',
      suitability: 'Suitability Match',
      duration: 'Duration',
      waterRequirement: 'Water Need',
      sowing: 'Sowing Window',
      harvesting: 'Harvesting',
      disclaimer: 'Notice: Projections are model estimates based on standard regional conditions, not guaranteed outcomes.',
    },
    fertilizers: {
      title: 'Fertilizer & Soil Nutrition',
      subtitle: 'Scientific dosage schedules for organic amendments and balanced chemical inputs.',
      organic: 'Organic Fertilizers',
      chemical: 'Chemical Fertilizers',
      calculator: 'Fertilizer Cost Calculator',
      schedule: 'Application Schedule',
      precautions: 'Safety & Environmental Precautions',
      disclaimer: 'Note: Dosage recommendations are provisional until verified by lab Soil Health Card test results.',
    },
    harvesting: {
      title: 'Post-Harvest & Soil Restoration',
      subtitle: 'Rejuvenate soil fertility, manage residues sustainably, and prepare for the next cycle.',
      previousCrop: 'Harvested Crop History',
      soilRestoration: 'Soil Restoration Steps',
      cropRotation: 'Recommended Crop Rotations',
      residueManagement: 'Residue Management (Zero Stubble Burning)',
      nextCropRecommendation: 'Recommended Next Crop',
      timeline: 'Post-Harvest Phase Timeline',
    },
    marketplace: {
      title: 'Direct Farmer Marketplace',
      subtitle: 'Connect farmers directly with buyers, retailers, and restaurants at fair market prices.',
      createListing: 'Create New Produce Listing',
      activeListings: 'Active Produce Listings',
      pricePerUnit: 'Price / Unit',
      quantity: 'Available Quantity',
      contactFarmer: 'Contact Farmer Directly',
      pickupDelivery: 'Fulfilment Options',
      interestedBuyers: 'Interested Buyer Enquiries',
      searchPlaceholder: 'Search fresh vegetables, fruits, grains...',
    },
    voice: {
      title: 'AI Agro Voice Assistant',
      subtitle: 'Speak in your regional language for instant agricultural advice and mandi prices.',
      listening: 'Listening to your question...',
      speakNow: 'Tap to speak your query',
      typeQuery: 'Or type your farming question...',
      askQuestion: 'Ask Advice',
      playAudio: 'Play Audio Response',
      stopAudio: 'Stop Audio',
    },
    common: {
      save: 'Save Changes',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      measured: 'Lab Measured',
      estimated: 'Regional Estimate',
      unavailable: 'Data Pending',
      viewDetails: 'View Details',
      filter: 'Filter',
      search: 'Search',
    },
  },
  ta: {
    appName: 'அக்ரானமிஸ்ட்',
    tagline: 'திறன்மிகு விவசாயம். சிறந்த முடிவுகள். நியாயமான சந்தை.',
    roles: {
      farmer: 'விவசாயி',
      customer: 'வாடிக்கையாளர் / வாங்குபவர்',
    },
    nav: {
      overview: 'கண்ணோட்டம்',
      myLand: 'என் நிலம்',
      cropSuggestions: 'பயிர் பரிந்துரைகள்',
      fertilizerAdvisory: 'உர ஆலோசனை',
      afterHarvesting: 'அறுவடைக்கு பின்',
      marketplace: 'நேரடி சந்தை',
      analytics: 'விவசாய பகுப்பாய்வு',
      notifications: 'அறிவிப்புகள்',
      profileSettings: 'சுயவிவரம் & அமைப்புகள்',
      logout: 'வெளியேறு',
      login: 'உள்நுழைவு',
      backToDashboard: 'முகப்புக்கு செல்',
      viewCart: 'பொருட்கள்',
    },
    dashboard: {
      welcome: 'மீண்டும் நல்வரவு',
      goodMorning: 'காலை வணக்கம்',
      demoNotice: 'மாதிரி முறை: காட்டப்படும் மதிப்புகள் திட்டமிடலுக்கான மாதிரி தரவுகள் ஆகும்.',
      temp: 'வெப்பநிலை',
      humidity: 'ஈரப்பதம்',
      expectedRainfall: 'எதிர்பார்க்கப்படும் மழை',
      nextRainfall: 'அடுத்த மழை முன்னறிவிப்பு',
      registeredLand: 'பதிவுசெய்த நிலம்',
      currentCrop: 'தற்போதைய பயிர்',
      soilStatus: 'மண் வளம் நிலை',
      upcomingTasks: 'வரவிருக்கும் விவசாய பணிகள்',
      weatherForecast7Days: '7-நாள் வானிலை முன்னறிவிப்பு',
      todayAdvisory: 'இன்றைய விவசாய ஆலோசனை',
      recommendedCrops: 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
      farmingTimeline: 'பயிர் வளர்ச்சி காலவரிசை',
    },
    land: {
      title: 'நிலம் மற்றும் மண் மேலாண்மை',
      subtitle: 'நில பரப்பளவு, ஊட்டச்சத்துக்கள் மற்றும் பல பயிர் பகிர்வு திட்டம்.',
      divisionPlanner: 'திறன்மிகு நில பகிர்வு திட்டமிடுநர்',
      totalLand: 'மொத்த நிலப்பரப்பு',
      allocatedLand: 'ஒதுக்கப்பட்ட நிலம்',
      unallocatedLand: 'ஒதுக்கப்படாத நிலம்',
      addPlot: 'புதிய பகுதி சேர்',
      removePlot: 'பகுதி நீக்கு',
      selectCrop: 'பயிர் தேர்வு',
      allocationPresets: 'பரிந்துரைக்கப்பட்ட பகிர்வு',
      singleCrop: 'ஒற்றைப் பயிர் (100%)',
      twoCrop: 'இரு பயிர் (50% + 50%)',
      threeCrop: 'முப்பயிர் (40% + 30% + 30%)',
      custom: 'விருப்ப பகிர்வு',
      estimatedYield: 'எதிர்பார்க்கப்படும் மகசூல்',
      estimatedRevenue: 'மதிப்பிடப்பட்ட வருவாய்',
      estimatedExpenses: 'மதிப்பிடப்பட்ட செலவு',
      estimatedProfit: 'மதிப்பிடப்பட்ட நிகர லாபம்',
    },
    crops: {
      title: 'அறிவார்ந்த பயிர் பரிந்துரை',
      subtitle: 'பருவநிலை, மண் வகை மற்றும் சந்தை விலை அடிப்படையில் பயிர் தேர்வு.',
      seasonFilter: 'பருவ வாரியாக வடிகட்டு',
      categoryFilter: 'வகை வாரியாக வடிகட்டு',
      compareTitle: 'பயிர்களை ஒப்பிடுக',
      compareButton: 'தேர்ந்தெடுத்ததை ஒப்பிடு',
      suitability: 'பொருத்தம்',
      duration: 'கால அளவு',
      waterRequirement: 'நீர் தேவை',
      sowing: 'விதைப்பு காலம்',
      harvesting: 'அறுவடை',
      disclaimer: 'குறிப்பு: கணிப்புகள் மாதிரி அடிப்படையிலானவை, உத்தரவாதம் அல்ல.',
    },
    fertilizers: {
      title: 'உரங்கள் மற்றும் ஊட்டச்சத்து',
      subtitle: 'இயற்கை மற்றும் ரசாயன உரங்களுக்கான துல்லியமான அட்டவணை.',
      organic: 'இயற்கை உரங்கள்',
      chemical: 'ரசாயன உரங்கள்',
      calculator: 'உரச் செலவு கணக்கீட்டாளர்',
      schedule: 'உரமிடும் கால அட்டவணை',
      precautions: 'முன்னெச்சரிக்கைகள்',
      disclaimer: 'மண் பரிசோதனை சான்றிதழ் முடிவுகள் வரும் வரை அளவுகள் தற்காலிகமானவை.',
    },
    harvesting: {
      title: 'அறுவடைக்கு பின் & மண் மறுசீரமைப்பு',
      subtitle: 'மண் வளத்தை மீட்டெடுத்து அடுத்த சாகுபடிக்கு நிலத்தை தயார் செய்யவும்.',
      previousCrop: 'முந்தைய பயிர் வரலாறு',
      soilRestoration: 'மண் சீரமைப்பு முறைகள்',
      cropRotation: 'சுழற்சி பயிர் பரிந்துரை',
      residueManagement: 'கழிவு மேலாண்மை (வைக்கோல் எரிப்பு தவிர்ப்பு)',
      nextCropRecommendation: 'அடுத்த பயிர் பரிந்துரை',
      timeline: 'அறுவடைக்கு பிந்தைய காலவரிசை',
    },
    marketplace: {
      title: 'விவசாயிகள் நேரடி சந்தை',
      subtitle: 'இடைத்தரகர் இன்றி நுகர்வோர் மற்றும் வணிகர்களிடம் நேரடியாக விற்பனை செய்யுங்கள்.',
      createListing: 'புதிய விளைபொருள் சேர்க்க',
      activeListings: 'விற்பனைக்கு உள்ளவை',
      pricePerUnit: 'விலை / அளவு',
      quantity: 'கிடைக்கும் அளவு',
      contactFarmer: 'விவசாயியை நேரடியாக தொடர்பு கொள்ளவும்',
      pickupDelivery: 'வழங்குதல் விருப்பங்கள்',
      interestedBuyers: 'விசாரணைகள்',
      searchPlaceholder: 'காய்கறிகள், பழங்கள், தானியங்கள் தேடுங்கள்...',
    },
    voice: {
      title: 'விவசாய குரல் உதவியாளர்',
      subtitle: 'உங்கள் விவசாய சந்தேகங்களை தமிழில் பேசி உடனடியாக தெரிந்து கொள்ளுங்கள்.',
      listening: 'கேட்கிறது...',
      speakNow: 'பேச தொடங்குங்கள்',
      typeQuery: 'அல்லது தட்டச்சு செய்யுங்கள்...',
      askQuestion: 'கேள்வி கேட்க',
      playAudio: 'பதிலை கேட்க',
      stopAudio: 'ஆடியோ நிறுத்து',
    },
    common: {
      save: 'சேமிக்க',
      cancel: 'ரத்து செய்',
      edit: 'திருத்து',
      delete: 'நீக்கு',
      loading: 'ஏற்றுகிறது...',
      measured: 'பரிசோதிக்கப்பட்டது',
      estimated: 'கணிக்கப்பட்டது',
      unavailable: 'கிடைக்கவில்லை',
      viewDetails: 'விவரங்கள் பார்க்க',
      filter: 'வடிகட்டு',
      search: 'தேடுக',
    },
  },
  hi: {
    appName: 'एग्रोनोमिस्ट',
    tagline: 'स्मार्ट खेती। बेहतर निर्णय। उचित बाजार।',
    roles: {
      farmer: 'किसान',
      customer: 'ग्राहक / खरीदार',
    },
    nav: {
      overview: 'अवलोकन',
      myLand: 'मेरी भूमि',
      cropSuggestions: 'फसल सुझाव',
      fertilizerAdvisory: 'उर्वरक सलाह',
      afterHarvesting: 'कटाई के बाद',
      marketplace: 'सीधा बाजार',
      analytics: 'कृषि विश्लेषण',
      notifications: 'सूचनाएं',
      profileSettings: 'प्रोफाइल व सेटिंग्स',
      logout: 'लॉगआउट',
      login: 'लॉग इन',
      backToDashboard: 'डैशबोर्ड पर लौटें',
      viewCart: 'उत्पाद देखें',
    },
    dashboard: {
      welcome: 'वापसी पर स्वागत है',
      goodMorning: 'शुभ प्रभात',
      demoNotice: 'डेमो मोड: दिखाई गई जानकारी समीक्षा एवं योजना हेतु नमूना डेटा है।',
      temp: 'तापमान',
      humidity: 'नमी',
      expectedRainfall: 'अपेक्षित वर्षा',
      nextRainfall: 'अगली बारिश का पूर्वानुमान',
      registeredLand: 'पंजीकृत भूमि',
      currentCrop: 'वर्तमान फसल',
      soilStatus: 'मृदा स्वास्थ्य स्थिति',
      upcomingTasks: 'आगामी कृषि कार्य',
      weatherForecast7Days: '7-दिवसीय कृषि मौसम पूर्वानुमान',
      todayAdvisory: 'आज की कृषि सलाह',
      recommendedCrops: 'अनुशंसित फसलें',
      farmingTimeline: 'फसल चक्र समयरेखा',
    },
    land: {
      title: 'भूमि एवं मृदा प्रबंधन',
      subtitle: 'खेत के क्षेत्र, पोषक तत्वों की निगरानी और बहु-फसल आवंटन योजना।',
      divisionPlanner: 'स्मार्ट भूमि विभाजन नियोजक',
      totalLand: 'कुल भूमि क्षेत्र',
      allocatedLand: 'आवंटित भूमि',
      unallocatedLand: 'अनावंटित भूमि',
      addPlot: 'नया प्लॉट जोड़ें',
      removePlot: 'हटाएं',
      selectCrop: 'फसल चुनें',
      allocationPresets: 'सुझाए गए आवंटन',
      singleCrop: 'एकल फसल (100%)',
      twoCrop: 'दोहरी फसल (50% + 50%)',
      threeCrop: 'त्रि-फसल (40% + 30% + 30%)',
      custom: 'कस्टम आवंटन',
      estimatedYield: 'अनुमानित उपज',
      estimatedRevenue: 'अनुमानित आय',
      estimatedExpenses: 'अनुमानित लागत',
      estimatedProfit: 'अनुमानित शुद्ध लाभ',
    },
    crops: {
      title: 'स्मार्ट फसल अनुशंसा',
      subtitle: 'जलवायु, मिट्टी व मंडी भाव के अनुसार सबसे उपयुक्त फसलों का चयन।',
      seasonFilter: 'मौसम अनुसार छांटें',
      categoryFilter: 'श्रेणी अनुसार छांटें',
      compareTitle: 'फसलों की तुलना करें',
      compareButton: 'तुलना करें',
      suitability: 'अनुकूलता',
      duration: 'अवधि',
      waterRequirement: 'जल आवश्यकता',
      sowing: 'बुवाई का समय',
      harvesting: 'कटाई',
      disclaimer: 'सूचना: अनुमान क्षेत्रीय मानकों पर आधारित हैं, वास्तविक परिणाम भिन्न हो सकते हैं।',
    },
    fertilizers: {
      title: 'उर्वरक एवं पोषक तत्व सलाह',
      subtitle: 'जैविक और संतुलित रासायनिक खादों का वैज्ञानिक समयबद्ध प्रयोग।',
      organic: 'जैविक खाद',
      chemical: 'रासायनिक उर्वरक',
      calculator: 'खाद लागत कैलकुलेटर',
      schedule: 'उपयोग की समय सारिणी',
      precautions: 'सुरक्षा सावधानियां',
      disclaimer: 'नोट: प्रयोगशाला मृदा परीक्षण रिपोर्ट मिलने तक खुराक अनुमानित है।',
    },
    harvesting: {
      title: 'कटाई के बाद व मृदा पुनर्जनन',
      subtitle: 'मिट्टी की उर्वरता पुनः स्थापित करें और अगली बुवाई की वैज्ञानिक तैयारी करें।',
      previousCrop: 'पिछली फसल का इतिहास',
      soilRestoration: 'मिट्टी सुधार के चरण',
      cropRotation: 'फसल चक्र सुझाव',
      residueManagement: 'पराली प्रबंधन (धुआं व आग रहित)',
      nextCropRecommendation: 'अगली फसल का सुझाव',
      timeline: 'कटाई उपरांत चरण समयरेखा',
    },
    marketplace: {
      title: 'सीधा किसान बाज़ार',
      subtitle: 'बिना बिचौलियों के अपनी उपज ग्राहकों और व्यापारियों को सीधे बेचें।',
      createListing: 'नई फसल सूची बनाएं',
      activeListings: 'उपलब्ध उत्पाद',
      pricePerUnit: 'मूल्य / इकाई',
      quantity: 'उपलब्ध मात्रा',
      contactFarmer: 'किसान से सीधा संपर्क करें',
      pickupDelivery: 'डिलिवरी विकल्प',
      interestedBuyers: 'खरीदार पूछताछ',
      searchPlaceholder: 'ताज़ी सब्ज़ियां, फल, अनाज खोजें...',
    },
    voice: {
      title: 'एआई कृषि वॉयस असिस्टेंट',
      subtitle: 'अपनी स्थानीय भाषा में बोलकर कृषि संबंधी सलाह और मंडी भाव जानें।',
      listening: 'सुन रहे हैं...',
      speakNow: 'बोलने के लिए टैप करें',
      typeQuery: 'या अपना प्रश्न टाइप करें...',
      askQuestion: 'सवाल पूछें',
      playAudio: 'उत्तर सुनें',
      stopAudio: 'रोकें',
    },
    common: {
      save: 'सहेजें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      loading: 'लोड हो रहा है...',
      measured: 'परीक्षित',
      estimated: 'अनुमानित',
      unavailable: 'अनुपलब्ध',
      viewDetails: 'विवरण देखें',
      filter: 'फ़िल्टर',
      search: 'खोजें',
    },
  },
  te: {
    appName: 'అగ్రోనమిస్ట్',
    tagline: 'స్మార్ట్ వ్యవసాయం. మెరుగైన నిర్ణయాలు. సరసమైన మార్కెట్లు.',
    roles: {
      farmer: 'రైతు',
      customer: 'వినియోగదారు / కొనుగోలుదారు',
    },
    nav: {
      overview: 'అవలోకనం',
      myLand: 'నా భూమి',
      cropSuggestions: 'పంట సూచనలు',
      fertilizerAdvisory: 'ఎరువుల సలహా',
      afterHarvesting: 'కోత తర్వాతి చర్యలు',
      marketplace: 'రైతు మార్కెట్',
      analytics: 'వ్యవసాయ విశ్లేషణ',
      notifications: 'నోటిఫికేషన్లు',
      profileSettings: 'ప్రొఫైల్ & సెట్టింగ్‌లు',
      logout: 'లాగౌట్',
      login: 'లాగిన్',
      backToDashboard: 'డ్యాష్‌బోర్డుకు తిరిగి వెళ్లు',
      viewCart: 'వస్తువులు',
    },
    dashboard: {
      welcome: 'తిరిగి స్వాగతం',
      goodMorning: 'శుభోదయం',
      demoNotice: 'డెమో మోడ్: చూపబడిన విలువలు ప్రణాళిక కోసం నమూనా డేటా మాత్రమే.',
      temp: 'ఉష్ణోగ్రత',
      humidity: 'తేమ',
      expectedRainfall: 'వర్షపాత అంచనా',
      nextRainfall: 'తదుపరి వర్ష సూచన',
      registeredLand: 'నమోదిత భూమి',
      currentCrop: 'ప్రస్తుత పంట',
      soilStatus: 'నేల ఆరోగ్య స్థితి',
      upcomingTasks: 'రాబోయే వ్యవసాయ పనులు',
      weatherForecast7Days: '7 రోజుల వాతావరణ సూచన',
      todayAdvisory: 'నేటి వ్యవసాయ సలహా',
      recommendedCrops: 'సిఫార్సు చేయబడిన పంటలు',
      farmingTimeline: 'పంట కాలక్రమం',
    },
    land: {
      title: 'భూమి మరియు నేల నిర్వహణ',
      subtitle: 'భూమి వివరాలు మరియు బహుళ పంట విభజన ప్రణాళిక.',
      divisionPlanner: 'స్మార్ట్ భూ విభజన ప్లానర్',
      totalLand: 'మొత్తం భూమి వైశాల్యం',
      allocatedLand: 'కేటాయించిన భూమి',
      unallocatedLand: 'కేటాయించని భూమి',
      addPlot: 'కొత్త ప్లాట్ చేర్చు',
      removePlot: 'ప్లాట్ తొలగించు',
      selectCrop: 'పంటను ఎంచుకోండి',
      allocationPresets: 'సిఫార్సు విభజనలు',
      singleCrop: 'ఒకే పంట (100%)',
      twoCrop: 'ద్వంద్వ పంట (50% + 50%)',
      threeCrop: 'మూడు పంటలు (40% + 30% + 30%)',
      custom: 'అనుకూల కేటాయింపు',
      estimatedYield: 'అంచనా దిగుబడి',
      estimatedRevenue: 'అంచనా ఆదాయం',
      estimatedExpenses: 'అంచనా ఖర్చులు',
      estimatedProfit: 'అంచనా నికర లాభం',
    },
    crops: {
      title: 'తెలివైన పంట సిఫార్సులు',
      subtitle: 'వాతావరణం మరియు నేల స్వభావానికి సరిపడే అనువైన పంటలు.',
      seasonFilter: 'సీజన్ వారీగా',
      categoryFilter: 'వర్గం వారీగా',
      compareTitle: 'పంటల పోలిక',
      compareButton: 'ఎంచుకున్నవి పోల్చండి',
      suitability: 'సరిపోలిక శాతం',
      duration: 'కాలపరిమితి',
      waterRequirement: 'నీటి అవసరం',
      sowing: 'విత్తే సమయం',
      harvesting: 'కోత సమయం',
      disclaimer: 'గమనిక: అంచనాలు ప్రాంతీయ పరిస్థితులపై ఆధారపడి ఉంటాయి.',
    },
    fertilizers: {
      title: 'ఎరువులు & పోషకాల సలహా',
      subtitle: 'సేంద్రీయ మరియు రసాయన ఎరువుల శాస్త్రీయ మోతాదు.',
      organic: 'సేంద్రీయ ఎరువులు',
      chemical: 'రసాయన ఎరువులు',
      calculator: 'ఎరువుల ఖర్చు కాలిక్యులేటర్',
      schedule: 'ఎరువులు వేసే సమయాలు',
      precautions: 'జాగ్రత్తలు',
      disclaimer: 'సాయిల్ టెస్ట్ రిపోర్ట్ వరకు ఈ మోతాదులు తాత్కాలికం.',
    },
    harvesting: {
      title: 'కోత తర్వాతి యాజమాన్యం',
      subtitle: 'నేల సారాన్ని పునరుద్ధరించి తదుపరి పంటకు సిద్ధం చేయండి.',
      previousCrop: 'గత పంట చరిత్ర',
      soilRestoration: 'నేల పునరుద్ధరణ పద్ధతులు',
      cropRotation: 'పంట మార్పిడి సిఫార్సు',
      residueManagement: 'వ్యర్థాల యాజమాన్యం',
      nextCropRecommendation: 'తదుపరి పంట సిఫార్సు',
      timeline: 'కోత తర్వాతి దశలు',
    },
    marketplace: {
      title: 'రైతుల ప్రత్యక్ష మార్కెట్',
      subtitle: 'దళారులు లేకుండా ఉత్పత్తులను నేరుగా విక్రయించండి.',
      createListing: 'కొత్త ఉత్పత్తి జాబితా',
      activeListings: 'అందుబాటులో ఉన్న పంటలు',
      pricePerUnit: 'ధర / యూనిట్',
      quantity: 'అందుబాటులో ఉన్న పరిమాణం',
      contactFarmer: 'రైతును నేరుగా సంప్రదించండి',
      pickupDelivery: 'డెలివరీ ఎంపికలు',
      interestedBuyers: 'విచారణలు',
      searchPlaceholder: 'కూరగాయలు, పండ్లు, ధాన్యాలు శోధించండి...',
    },
    voice: {
      title: 'ఏఐ అగ్రో వాయిస్ అసిస్టెంట్',
      subtitle: 'మీ ప్రాంతీయ భాషలో మాట్లాడి వ్యవసాయ సలహాలు పొందండి.',
      listening: 'వింటోంది...',
      speakNow: 'మాట్లాడటానికి నొక్కండి',
      typeQuery: 'లేదా ప్రశ్న టైప్ చేయండి...',
      askQuestion: 'ప్రశ్న అడగండి',
      playAudio: 'వినండి',
      stopAudio: 'ఆపండి',
    },
    common: {
      save: 'భద్రపరచు',
      cancel: 'రద్దు చేయి',
      edit: 'సవరించు',
      delete: 'తొలగించు',
      loading: 'లోడ్ అవుతోంది...',
      measured: 'పరీక్షించినది',
      estimated: 'అంచనా వేసినది',
      unavailable: 'అందుబాటులో లేదు',
      viewDetails: 'వివరాలు',
      filter: 'ఫిల్టర్',
      search: 'వెతకండి',
    },
  },
  kn: {
    appName: 'ಅಗ್ರೋನಮಿಸ್ಟ್',
    tagline: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. ಉತ್ತಮ ನಿರ್ಧಾರಗಳು. ನ್ಯಾಯಯುತ ಮಾರುಕಟ್ಟೆ.',
    roles: {
      farmer: 'ರೈತ',
      customer: 'ಗ್ರಾಹಕ / ಖರೀದಿದಾರ',
    },
    nav: {
      overview: 'ಅವಲೋಕನ',
      myLand: 'ನನ್ನ ಜಮೀನು',
      cropSuggestions: 'ಬೆಳೆ ಶಿಫಾರಸು',
      fertilizerAdvisory: 'ಗೊಬ್ಬರ ಸಲಹೆ',
      afterHarvesting: 'ಸುಗ್ಗಿ ನಂತರದ ನಿರ್ವಹಣೆ',
      marketplace: 'ರೈತ ಮಾರುಕಟ್ಟೆ',
      analytics: 'ಕೃಷಿ ವಿಶ್ಲೇಷಣೆ',
      notifications: 'ಸೂಚನೆಗಳು',
      profileSettings: 'ಪ್ರೊಫೈಲ್ & ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      logout: 'ಲಾಗ್‌ಔಟ್',
      login: 'ಲಾಗಿನ್',
      backToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
      viewCart: 'ವಸ್ತುಗಳು',
    },
    dashboard: {
      welcome: 'ಮತ್ತೆ ಸ್ವಾಗತ',
      goodMorning: 'ಶುಭ ಮುಂಜಾನೆ',
      demoNotice: 'ಡೆಮೊ ಮೋಡ್: ಪ್ರದರ್ಶಿಸಲಾದ ಮೌಲ್ಯಗಳು ಮಾದರಿ ಡೇಟಾ ಮಾತ್ರ.',
      temp: 'ತಾಪಮಾನ',
      humidity: 'ಆರ್ದ್ರತೆ',
      expectedRainfall: 'ಮಳೆ ಮುನ್ಸೂಚನೆ',
      nextRainfall: 'ಮುಂದಿನ ಮಳೆಯ ನಿರೀಕ್ಷೆ',
      registeredLand: 'ನೋಂದಾಯಿತ ಜಮೀನು',
      currentCrop: 'ಪ್ರಸ್ತುತ ಬೆಳೆ',
      soilStatus: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಥಿತಿ',
      upcomingTasks: 'ಮುಂದಿನ ಕೃಷಿ ಕೆಲಸಗಳು',
      weatherForecast7Days: '7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
      todayAdvisory: 'ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ',
      recommendedCrops: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು',
      farmingTimeline: 'ಬೆಳೆ ವೇಳಾಪಟ್ಟಿ',
    },
    land: {
      title: 'ಭೂಮಿ ಮತ್ತು ಮಣ್ಣು ನಿರ್ವಹಣೆ',
      subtitle: 'ಜಮೀನಿನ ವಿವರಗಳು ಮತ್ತು ಬಹು-ಬೆಳೆ ಹಂಚಿಕೆ ಯೋಜನೆ.',
      divisionPlanner: 'ಸ್ಮಾರ್ಟ್ ಭೂಮಿ ವಿಭಾಗ ಯೋಜನೆ',
      totalLand: 'ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ',
      allocatedLand: 'ಹಂಚಿಕೆಯಾದ ಭೂಮಿ',
      unallocatedLand: 'ಉಳಿದ ಭೂಮಿ',
      addPlot: 'ಹೊಸ ಪ್ಲಾಟ್ ಸೇರಿಸಿ',
      removePlot: 'ಪ್ಲಾಟ್ ತೆಗೆಯಿರಿ',
      selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ',
      allocationPresets: 'ಸೂಚಿಸಲಾದ ವಿಭಾಗಗಳು',
      singleCrop: 'ಒಂದೇ ಬೆಳೆ (100%)',
      twoCrop: 'ದ್ವಿ-ಬೆಳೆ (50% + 50%)',
      threeCrop: 'ತ್ರಿ-ಬೆಳೆ (40% + 30% + 30%)',
      custom: 'ಕಸ್ಟಮ್ ಹಂಚಿಕೆ',
      estimatedYield: 'ಅಂದಾಜು ಇಳುವರಿ',
      estimatedRevenue: 'ಅಂದಾಜು ಆದಾಯ',
      estimatedExpenses: 'ಅಂದಾಜು ವೆಚ್ಚ',
      estimatedProfit: 'ಅಂದಾಜು ಲಾಭ',
    },
    crops: {
      title: 'ಬುದ್ಧಿವಂತ ಬೆಳೆ ಸಲಹೆ',
      subtitle: 'ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ಪ್ರಕಾರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಬೆಳೆಗಳು.',
      seasonFilter: 'ಋತುಮಾನ ಫಿಲ್ಟರ್',
      categoryFilter: 'ವರ್ಗ ಫಿಲ್ಟರ್',
      compareTitle: 'ಬೆಳೆ ಹೋಲಿಕೆ',
      compareButton: 'ಆಯ್ಕೆ ಹೋಲಿಸಿ',
      suitability: 'ಹೊಂದಾಣಿಕೆ',
      duration: 'ಅವಧಿ',
      waterRequirement: 'ನೀರಿನ ಅಗತ್ಯ',
      sowing: 'ಬಿತ್ತನೆ ಸಮಯ',
      harvesting: 'ಕೊಯ್ಲು',
      disclaimer: 'ಸೂಚನೆ: ಅಂದಾಜುಗಳು ಮಾದರಿ ಆಧಾರಿತವಾಗಿವೆ.',
    },
    fertilizers: {
      title: 'ಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶ ಸಲಹೆ',
      subtitle: 'ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳ ಸಮತೋಲಿತ ಬಳಕೆ.',
      organic: 'ಸಾವಯವ ಗೊಬ್ಬರ',
      chemical: 'ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ',
      calculator: 'ಗೊಬ್ಬರದ ವೆಚ್ಚ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
      schedule: 'ಬಳಕೆಯ ವೇಳಾಪಟ್ಟಿ',
      precautions: 'ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು',
      disclaimer: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ ವರದಿ ಬರುವವರೆಗೆ ಈ ಪ್ರಮಾಣಗಳು ತಾತ್ಕಾಲಿಕ.',
    },
    harvesting: {
      title: 'ಕೊಯ್ಲು ನಂತರದ ಮಣ್ಣಿನ ಪುನಶ್ಚೇತನ',
      subtitle: 'ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸಿ ಮುಂದಿನ ಬಿತ್ತನೆಗೆ ತಯಾರಿ ನಡೆಸಿ.',
      previousCrop: 'ಹಿಂದಿನ ಬೆಳೆ ಇತಿಹಾಸ',
      soilRestoration: 'ಮಣ್ಣು ಸುಧಾರಣೆ ಕ್ರಮಗಳು',
      cropRotation: 'ಬೆಳೆ ಪರಿವರ್ತನೆ ಶಿಫಾರಸು',
      residueManagement: 'ಕೃಷಿ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ',
      nextCropRecommendation: 'ಮುಂದಿನ ಬೆಳೆ ಶಿಫಾರಸು',
      timeline: 'ಕೊಯ್ಲು ನಂತರದ ಹಂತಗಳು',
    },
    marketplace: {
      title: 'ನೇರ ರೈತ ಮಾರುಕಟ್ಟೆ',
      subtitle: 'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ಗ್ರಾಹಕರಿಗೆ ಮಾರಾಟ ಮಾಡಿ.',
      createListing: 'ಹೊಸ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ',
      activeListings: 'ಲಭ್ಯವಿರುವ ಬೆಳೆಗಳು',
      pricePerUnit: 'ಬೆಲೆ / ಯುನಿಟ್',
      quantity: 'ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ',
      contactFarmer: 'ರೈತರನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ',
      pickupDelivery: 'ವಿತರಣಾ ಆಯ್ಕೆಗಳು',
      interestedBuyers: 'ವಿಚಾರಣೆಗಳು',
      searchPlaceholder: 'ತರಕಾರಿಗಳು, ಹಣ್ಣುಗಳು, ಧಾನ್ಯ ಹುಡುಕಿ...',
    },
    voice: {
      title: 'ಕೃಷಿ ಧ್ವನಿ ಸಹಾಯಕ',
      subtitle: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ತಕ್ಷಣ ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      listening: 'ಆಲಿಸುತ್ತಿದೆ...',
      speakNow: 'ಮಾತನಾಡಲು ಒತ್ತಿ',
      typeQuery: 'ಅಥವಾ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...',
      askQuestion: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
      playAudio: 'ಉತ್ತರ ಕೇಳಿ',
      stopAudio: 'ನಿಲ್ಲಿಸಿ',
    },
    common: {
      save: 'ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      edit: 'ತಿದ್ದಿ',
      delete: 'ಅಳಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      measured: 'ಪರೀಕ್ಷಿಸಲ್ಪಟ್ಟಿದೆ',
      estimated: 'ಅಂದಾಜಿಸಲಾಗಿದೆ',
      unavailable: 'ಲಭ್ಯವಿಲ್ಲ',
      viewDetails: 'ವಿವರಗಳು',
      filter: 'ಫಿಲ್ಟರ್',
      search: 'ಹುಡುಕಿ',
    },
  },
  ml: {
    appName: 'അഗ്രോണമിസ്റ്റ്',
    tagline: 'സ്മാർട്ട് കൃഷി. മികച്ച തീരുമാനങ്ങൾ. ന്യായമായ വിപണി.',
    roles: {
      farmer: 'കർഷകൻ',
      customer: 'ഉപഭോക്താവ് / വാങ്ങുന്നയാൾ',
    },
    nav: {
      overview: 'അവലോകനം',
      myLand: 'എന്റെ കൃഷിഭൂമി',
      cropSuggestions: 'വിള നിർദ്ദേശങ്ങൾ',
      fertilizerAdvisory: 'വളപ്രയോഗ നിർദ്ദേശം',
      afterHarvesting: 'വിളവെടുപ്പിന് ശേഷം',
      marketplace: 'കർഷക ചന്ത',
      analytics: 'കാർഷിക വിശകലനം',
      notifications: 'അറിയിപ്പുകൾ',
      profileSettings: 'പ്രൊഫൈലും ക്രമീകരണങ്ങളും',
      logout: 'ലോഗ് ഔട്ട്',
      login: 'ലോഗിൻ',
      backToDashboard: 'ഡാഷ്‌ബോർഡിലേക്ക്',
      viewCart: 'ഇനങ്ങൾ',
    },
    dashboard: {
      welcome: 'സ്വാഗതം',
      goodMorning: 'സുപ്രഭാതം',
      demoNotice: 'ഡെമോ മോഡ്: കാണിച്ചിരിക്കുന്ന വിവരങ്ങൾ പരീക്ഷണ മാതൃക മാത്രമാണ്.',
      temp: 'താപനില',
      humidity: 'ഈർപ്പം',
      expectedRainfall: 'മഴ സാധ്യത',
      nextRainfall: 'അടുത്ത മഴ പ്രവചനം',
      registeredLand: 'രജിസ്റ്റർ ചെയ്ത ഭൂമി',
      currentCrop: 'നിലവിലെ വിള',
      soilStatus: 'മണ്ണ് ആരോഗ്യ സ്ഥിതി',
      upcomingTasks: 'വരാനിരിക്കുന്ന ജോലികൾ',
      weatherForecast7Days: '7 ദിവസത്തെ കാലാവസ്ഥാ പ്രവചനം',
      todayAdvisory: 'ഇന്നത്തെ കാർഷിക നിർദ്ദേശം',
      recommendedCrops: 'അനുയോജ്യമായ വിളകൾ',
      farmingTimeline: 'വിള വളർച്ചാ ഘട്ടം',
    },
    land: {
      title: 'ഭൂമിയും മണ്ണും പരിപാലനം',
      subtitle: 'ഭൂമി അളവുകളും പല വിളകൾക്കുള്ള പങ്കുവെപ്പും ആസൂത്രണം ചെയ്യുക.',
      divisionPlanner: 'സ്മാർട്ട് ഭൂമി വിഭജന പ്ലാനർ',
      totalLand: 'ആകെ ഭൂമി',
      allocatedLand: 'വിഭജിച്ച ഭൂമി',
      unallocatedLand: 'ബാക്കി ഭൂമി',
      addPlot: 'പ്ലോട്ട് ചേർക്കുക',
      removePlot: 'ഒഴിവാക്കുക',
      selectCrop: 'വിള തിരഞ്ഞെടുക്കുക',
      allocationPresets: 'നിർദ്ദേശിച്ച വിഭജനങ്ങൾ',
      singleCrop: 'ഒരു വിള (100%)',
      twoCrop: 'രണ്ട് വിളകൾ (50% + 50%)',
      threeCrop: 'മൂന്ന് വിളകൾ (40% + 30% + 30%)',
      custom: 'ഇഷ്‌ടാനുസൃത വിഭജനം',
      estimatedYield: 'പ്രതീക്ഷിക്കുന്ന വിളവ്',
      estimatedRevenue: 'പ്രതീക്ഷിക്കുന്ന വരുമാനം',
      estimatedExpenses: 'പ്രതീക്ഷിക്കുന്ന ചെലവ്',
      estimatedProfit: 'പ്രതീക്ഷിക്കുന്ന ലാഭം',
    },
    crops: {
      title: 'വിവേകപൂർണ്ണമായ വിള നിർദ്ദേശങ്ങൾ',
      subtitle: 'കാലാവസ്ഥയ്ക്കും മണ്ണിനും അനുയോജ്യമായ ഏറ്റവും മികച്ച വിളകൾ.',
      seasonFilter: 'സീസൺ അനുസരിച്ച്',
      categoryFilter: 'വിഭാഗം അനുസരിച്ച്',
      compareTitle: 'വിളകൾ താരതമ്യം ചെയ്യുക',
      compareButton: 'താരതമ്യം ചെയ്യുക',
      suitability: 'യോജ്യത',
      duration: 'കാലാവധി',
      waterRequirement: 'ജല ലഭ്യത',
      sowing: 'നടീൽ സമയം',
      harvesting: 'വിളവെടുപ്പ്',
      disclaimer: 'ശ്രദ്ധിക്കുക: കണക്കുകൾ പൊതുവായ കാലാവസ്ഥയെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.',
    },
    fertilizers: {
      title: 'വളങ്ങളും പോഷകങ്ങളും',
      subtitle: 'ജൈവ, രാസ വളങ്ങളുടെ ശാസ്ത്രീയമായ ഉപയോഗം.',
      organic: 'ജൈവ വളങ്ങൾ',
      chemical: 'രാസ വളങ്ങൾ',
      calculator: 'വളച്ചെലവ് കാൽക്കുലേറ്റർ',
      schedule: 'വളപ്രയോഗ സമയക്രമം',
      precautions: 'മുൻകരുതലുകൾ',
      disclaimer: 'മണ്ണ് പരിശോധനാ ഫലം വരുന്നതുവരെ ഈ അളവുകൾ താൽക്കാലികമാണ്.',
    },
    harvesting: {
      title: 'വിളവെടുപ്പിന് ശേഷം മണ്ണ് വീണ്ടെടുക്കൽ',
      subtitle: 'മണ്ണിന്റെ ഫലഭൂയിഷ്ഠത നിലനിർത്തി അടുത്ത കൃഷിക്ക് ഒരുങ്ങുക.',
      previousCrop: 'മുൻകാല വിള ചരിത്രം',
      soilRestoration: 'മണ്ണ് പുനരുദ്ധാരണ ഘട്ടങ്ങൾ',
      cropRotation: 'വിള പരിക്രമണം',
      residueManagement: 'കാർഷിക അവശിഷ്ട സംസ്കരണം',
      nextCropRecommendation: 'അടുത്ത വിള നിർദ്ദേശം',
      timeline: 'വിളവെടുപ്പാനന്തര ഘട്ടങ്ങൾ',
    },
    marketplace: {
      title: 'നേരിട്ടുള്ള കർഷക ചന്ത',
      subtitle: 'ഇടനിലക്കാരില്ലാതെ കർഷകർക്ക് ഉപഭോക്താക്കൾക്ക് നേരിട്ട് വിൽക്കാം.',
      createListing: 'പുതിയ ഉൽപ്പന്നം ചേർക്കുക',
      activeListings: 'ലഭ്യമായ ഉൽപ്പന്നങ്ങൾ',
      pricePerUnit: 'വില / യൂണിറ്റ്',
      quantity: 'ലഭ്യമായ അളവ്',
      contactFarmer: 'കർഷകനെ നേരിട്ട് വിളിക്കുക',
      pickupDelivery: 'വിതരണ രീതികൾ',
      interestedBuyers: 'അന്വേഷണങ്ങൾ',
      searchPlaceholder: 'പച്ചക്കറികൾ, പഴങ്ങൾ, ധാന്യങ്ങൾ തിരയുക...',
    },
    voice: {
      title: 'എഐ കാർഷിക വോയ്സ് അസിസ്റ്റന്റ്',
      subtitle: 'മലയാളത്തിൽ സംസാരിച്ച് കാർഷിക സംശയങ്ങൾക്ക് ഉത്തരം നേടുക.',
      listening: 'ശ്രദ്ധിക്കുന്നു...',
      speakNow: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക',
      typeQuery: 'അല്ലെങ്കിൽ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
      askQuestion: 'ചോദ്യം ചോദിക്കുക',
      playAudio: 'ശബ്ദം കേൾക്കുക',
      stopAudio: 'നിർത്തുക',
    },
    common: {
      save: 'സൂക്ഷിക്കുക',
      cancel: 'റദ്ദാക്കുക',
      edit: 'മാറ്റം വരുത്തുക',
      delete: 'നീക്കം ചെയ്യുക',
      loading: 'ലോഡ് ചെയ്യുന്നു...',
      measured: 'പരിശോധിച്ചത്',
      estimated: 'കണക്കാക്കിയത്',
      unavailable: 'ലഭ്യമല്ല',
      viewDetails: 'വിശദാംശങ്ങൾ',
      filter: 'ഫിൽട്ടർ',
      search: 'തിരയുക',
    },
  },
};
