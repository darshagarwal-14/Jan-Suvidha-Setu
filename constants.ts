import { 
  Question, 
  Scheme, 
  Gender, 
  Residence, 
  Caste, 
  RationCard, 
  Occupation, 
  HouseType 
} from './types';

// --- Text Resources ---
export const APP_TEXT = {
  title: { en: "Jan Suvidha Setu", hi: "जन सुविधा सेतु" },
  startBtn: { en: "Check My Eligibility", hi: "अपनी पात्रता जांचें" },
  nextBtn: { en: "Next", hi: "अगला" },
  backBtn: { en: "Back", hi: "पीछे" },
  submitBtn: { en: "See Results", hi: "परिणाम देखें" },
  loading: { en: "Calculating...", hi: "गणना हो रही है..." },
  eligibleTitle: { en: "You are likely eligible for:", hi: "आप इनके लिए पात्र हो सकते हैं:" },
  notEligibleTitle: { en: "Other schemes checked:", hi: "अन्य योजनाएं:" },
  whyEligible: { en: "Why you qualify:", hi: "आप क्यों पात्र हैं:" },
  whyNotEligible: { en: "Why you don't qualify:", hi: "आप पात्र क्यों नहीं हैं:" },
  documentsNeeded: { en: "Documents Needed:", hi: "आवश्यक दस्तावेज:" },
  askAiBtn: { en: "Ask Assistant about Documents", hi: "दस्तावेजों के बारे में सहायक से पूछें" },
  howToApply: { en: "How to Apply:", hi: "आवेदन कैसे करें:" },
  applyOnlineBtn: { en: "Open Application Website", hi: "आवेदन वेबसाइट खोलें" },
  disclaimer: { 
    en: "Note: This is an informational tool. Final eligibility is decided by the government officer.", 
    hi: "नोट: यह केवल जानकारी के लिए है। अंतिम निर्णय सरकारी अधिकारी द्वारा लिया जाएगा।" 
  }
};

// --- Question Sequence ---
export const QUESTIONS: Question[] = [
  {
    id: 'age',
    type: 'number',
    text: { en: "What is your age?", hi: "आपकी उम्र क्या है?" },
    subText: { en: "Enter completed years", hi: "पूरे किए गए वर्ष दर्ज करें" },
    min: 14,
    max: 100
  },
  {
    id: 'gender',
    type: 'select',
    text: { en: "Select Gender", hi: "लिंग चुनें" },
    options: [
      { value: Gender.Male, label: { en: "Male", hi: "पुरुष" }, icon: "User" },
      { value: Gender.Female, label: { en: "Female", hi: "महिला" }, icon: "UserCheck" },
      { value: Gender.Other, label: { en: "Other", hi: "अन्य" }, icon: "Users" }
    ]
  },
  {
    id: 'residence',
    type: 'select',
    text: { en: "Where do you live?", hi: "आप कहाँ रहते हैं?" },
    options: [
      { value: Residence.Rural, label: { en: "Village (Rural)", hi: "गाँव (ग्रामीण)" }, icon: "Trees" },
      { value: Residence.Urban, label: { en: "City (Urban)", hi: "शहर (शहरी)" }, icon: "Building2" }
    ]
  },
  {
    id: 'caste',
    type: 'select',
    text: { en: "Social Category", hi: "सामाजिक श्रेणी" },
    subText: { en: "As per your certificate", hi: "आपके प्रमाण पत्र के अनुसार" },
    options: [
      { value: Caste.SC, label: { en: "Scheduled Caste (SC)", hi: "अनुसूचित जाति (SC)" } },
      { value: Caste.ST, label: { en: "Scheduled Tribe (ST)", hi: "अनुसूचित जनजाति (ST)" } },
      { value: Caste.OBC, label: { en: "OBC", hi: "अन्य पिछड़ा वर्ग (OBC)" } },
      { value: Caste.General, label: { en: "General", hi: "सामान्य" } }
    ]
  },
  {
    id: 'rationCard',
    type: 'select',
    text: { en: "Ration Card Type", hi: "राशन कार्ड का प्रकार" },
    subText: { en: "Check the color of your card", hi: "अपने कार्ड का रंग देखें" },
    options: [
      { value: RationCard.BPL, label: { en: "BPL (Red/Pink)", hi: "बीपीएल (लाल/गुलाबी)" }, icon: "CreditCard" },
      { value: RationCard.AAY, label: { en: "Antyodaya (Yellow)", hi: "अंत्योदय (पीला)" }, icon: "CreditCard" },
      { value: RationCard.APL, label: { en: "APL (White)", hi: "एपीएल (सफेद)" }, icon: "CreditCard" },
      { value: RationCard.None, label: { en: "No Card", hi: "कोई कार्ड नहीं" }, icon: "XCircle" }
    ]
  },
  {
    id: 'occupation',
    type: 'select',
    text: { en: "Main source of income", hi: "आय का मुख्य स्रोत" },
    options: [
      { value: Occupation.Farmer, label: { en: "Farming", hi: "खेती" }, icon: "Wheat" },
      { value: Occupation.Laborer, label: { en: "Daily Labor", hi: "दिहाड़ी मजदूर" }, icon: "Hammer" },
      { value: Occupation.Student, label: { en: "Student", hi: "छात्र" }, icon: "GraduationCap" },
      { value: Occupation.Salaried, label: { en: "Salaried Job", hi: "वेतनभोगी नौकरी" }, icon: "Briefcase" },
      { value: Occupation.Unemployed, label: { en: "Unemployed", hi: "बेरोजगार" }, icon: "UserMinus" }
    ]
  },
  {
    id: 'landOwner',
    type: 'boolean',
    text: { en: "Do you own agricultural land?", hi: "क्या आपके पास खेती की जमीन है?" },
    options: [
      { value: true, label: { en: "Yes", hi: "हाँ" }, icon: "CheckCircle" },
      { value: false, label: { en: "No", hi: "नहीं" }, icon: "XCircle" }
    ]
  },
  {
    id: 'houseType',
    type: 'select',
    text: { en: "Type of current house", hi: "वर्तमान घर का प्रकार" },
    options: [
      { value: HouseType.Kutcha, label: { en: "Kutcha (Mud/Thatch)", hi: "कच्चा (मिट्टी/फूस)" }, icon: "Tent" },
      { value: HouseType.Pucca, label: { en: "Pucca (Brick/Cement)", hi: "पक्का (ईंट/सीमेंट)" }, icon: "Home" },
      { value: HouseType.Homeless, label: { en: "Homeless", hi: "बेघर" }, icon: "CloudRain" }
    ]
  },
  {
    id: 'annualIncome',
    type: 'select', // Simplified to ranges for UX, mapped to number in logic
    text: { en: "Annual Family Income", hi: "वार्षिक पारिवारिक आय" },
    options: [
      { value: 45000, label: { en: "Less than ₹50,000", hi: "₹50,000 से कम" } },
      { value: 90000, label: { en: "₹50,000 - ₹1 Lakh", hi: "₹50,000 - ₹1 लाख" } },
      { value: 150000, label: { en: "₹1 Lakh - ₹2 Lakhs", hi: "₹1 लाख - ₹2 लाख" } },
      { value: 300000, label: { en: "More than ₹2.5 Lakhs", hi: "₹2.5 लाख से अधिक" } }
    ]
  }
];

// --- Scheme Rules (The Brain) ---
export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: { en: "PM Kisan Samman Nidhi", hi: "पीएम किसान सम्मान निधि" },
    benefitShort: { en: "₹6,000 per year for Farmers", hi: "किसानों के लिए ₹6,000 प्रति वर्ष" },
    description: { en: "Income support for land-holding farmer families.", hi: "भूमि रखने वाले किसान परिवारों के लिए आय सहायता।" },
    applicationMode: 'both',
    applicationUrl: 'https://pmkisan.gov.in/',
    applicationInstructions: { 
      en: "Register online on the PM Kisan portal or visit your local Common Service Centre (CSC) / Patwari.",
      hi: "पीएम किसान पोर्टल पर ऑनलाइन पंजीकरण करें या अपने स्थानीय जन सेवा केंद्र (CSC) / पटवारी से संपर्क करें।"
    },
    documents: [
      { name: { en: "Aadhaar Card", hi: "आधार कार्ड" }, description: { en: "Identity Proof", hi: "पहचान प्रमाण" } },
      { name: { en: "Land Record (Khasra/Khatauni)", hi: "भूमि रिकॉर्ड (खसरा/खतौनी)" }, description: { en: "Proof of ownership", hi: "स्वामित्व का प्रमाण" } },
      { name: { en: "Bank Passbook", hi: "बैंक पासबुक" }, description: { en: "For money transfer", hi: "पैसे ट्रांसफर के लिए" } }
    ],
    requirements: [
      { field: 'occupation', operator: 'eq', value: Occupation.Farmer, description: { en: "Must be a Farmer", hi: "किसान होना चाहिए" } },
      { field: 'landOwner', operator: 'eq', value: true, description: { en: "Must own land", hi: "जमीन होनी चाहिए" } },
      { field: 'annualIncome', operator: 'lt', value: 250000, description: { en: "Income below tax limit", hi: "आय कर सीमा से कम" } } // Simplified check
    ]
  },
  {
    id: 'pmay-g',
    name: { en: "PMAY Gramin (Rural Housing)", hi: "प्रधानमंत्री आवास योजना (ग्रामीण)" },
    benefitShort: { en: "Money to build a Pucca house", hi: "पक्का घर बनाने के लिए पैसा" },
    description: { en: "Subsidy to build a concrete house for rural poor.", hi: "ग्रामीण गरीबों के लिए पक्का घर बनाने के लिए सब्सिडी।" },
    applicationMode: 'offline',
    applicationInstructions: { 
      en: "Contact your Gram Panchayat or Block Development Officer (BDO). They will register you on the AwaasApp.",
      hi: "अपनी ग्राम पंचायत या खंड विकास अधिकारी (BDO) से संपर्क करें। वे आवास ऐप पर आपका पंजीकरण करेंगे।"
    },
    documents: [
      { name: { en: "Aadhaar Card", hi: "आधार कार्ड" }, description: { en: "Identity Proof", hi: "पहचान प्रमाण" } },
      { name: { en: "MGNREGA Job Card", hi: "मनरेगा जॉब कार्ड" }, description: { en: "For labour linkage", hi: "श्रम लिंक के लिए" } },
      { name: { en: "Bank Account", hi: "बैंक खाता" }, description: { en: "For subsidy", hi: "सब्सिडी के लिए" } }
    ],
    requirements: [
      { field: 'residence', operator: 'eq', value: Residence.Rural, description: { en: "Must live in a village", hi: "गाँव में रहना चाहिए" } },
      { field: 'houseType', operator: 'neq', value: HouseType.Pucca, description: { en: "Must not have a Pucca house", hi: "पक्का घर नहीं होना चाहिए" } },
      // Simplified SECC logic: Assuming BPL or SC/ST qualifies loosely for this MVP logic
      { field: 'rationCard', operator: 'neq', value: RationCard.APL, description: { en: "Priority for BPL/Antyodaya", hi: "बीपीएल/अंत्योदय को प्राथमिकता" } } 
    ]
  },
  {
    id: 'nsap-pension',
    name: { en: "Old Age Pension (NSAP)", hi: "वृद्धावस्था पेंशन" },
    benefitShort: { en: "Monthly Pension for Elderly", hi: "बुजुर्गों के लिए मासिक पेंशन" },
    description: { en: "Financial assistance for elderly below poverty line.", hi: "गरीबी रेखा से नीचे के बुजुर्गों के लिए वित्तीय सहायता।" },
    applicationMode: 'both',
    applicationUrl: 'https://nsap.nic.in/',
    applicationInstructions: { 
      en: "Submit application at District Social Welfare Office or apply online via Umang App.",
      hi: "जिला समाज कल्याण कार्यालय में आवेदन जमा करें या उमंग ऐप के माध्यम से ऑनलाइन आवेदन करें।"
    },
    documents: [
      { name: { en: "Age Proof", hi: "आयु प्रमाण" }, description: { en: "Voter ID/Aadhaar", hi: "वोटर आईडी/आधार" } },
      { name: { en: "BPL Ration Card", hi: "बीपीएल राशन कार्ड" }, description: { en: "Poverty proof", hi: "गरीबी का प्रमाण" } }
    ],
    requirements: [
      { field: 'age', operator: 'gte', value: 60, description: { en: "Age must be 60+", hi: "आयु 60+ होनी चाहिए" } },
      { field: 'rationCard', operator: 'includes', value: [RationCard.BPL, RationCard.AAY], description: { en: "Must be BPL family", hi: "बीपीएल परिवार होना चाहिए" } }
    ]
  },
  {
    id: 'ujjwala',
    name: { en: "PM Ujjwala Yojana", hi: "प्रधानमंत्री उज्ज्वला योजना" },
    benefitShort: { en: "Free Gas Connection", hi: "मुफ्त गैस कनेक्शन" },
    description: { en: "LPG connection for women in poor households.", hi: "गरीब परिवारों की महिलाओं के लिए एलपीजी कनेक्शन।" },
    applicationMode: 'offline',
    applicationInstructions: { 
      en: "Visit your nearest LPG Distributor (Indane, Bharat Gas, HP) and fill the KYC form.",
      hi: "अपने निकटतम एलपीजी वितरक (इंडेन, भारत गैस, एचपी) पर जाएं और केवाईसी फॉर्म भरें।"
    },
    documents: [
      { name: { en: "Aadhaar of Woman", hi: "महिला का आधार" }, description: { en: "Applicant", hi: "आवेदक" } },
      { name: { en: "Ration Card", hi: "राशन कार्ड" }, description: { en: "Family details", hi: "परिवार का विवरण" } }
    ],
    requirements: [
      { field: 'gender', operator: 'eq', value: Gender.Female, description: { en: "Applicant must be female", hi: "आवेदक महिला होनी चाहिए" } },
      { field: 'rationCard', operator: 'includes', value: [RationCard.BPL, RationCard.AAY], description: { en: "Must be BPL/Antyodaya", hi: "बीपीएल/अंत्योदय होना चाहिए" } },
      { field: 'age', operator: 'gte', value: 18, description: { en: "Must be adult", hi: "वयस्क होना चाहिए" } }
    ]
  },
  {
    id: 'ayushman',
    name: { en: "Ayushman Bharat", hi: "आयुष्मान भारत" },
    benefitShort: { en: "Free Treatment up to ₹5 Lakhs", hi: "₹5 लाख तक का मुफ्त इलाज" },
    description: { en: "Health insurance for poor and vulnerable families.", hi: "गरीब और कमजोर परिवारों के लिए स्वास्थ्य बीमा।" },
    applicationMode: 'both',
    applicationUrl: 'https://beneficiary.nha.gov.in/',
    applicationInstructions: { 
      en: "Visit any Empanelled Hospital or Common Service Centre (CSC) to get your card made.",
      hi: "अपना कार्ड बनवाने के लिए किसी भी सूचीबद्ध अस्पताल या जन सेवा केंद्र (CSC) पर जाएं।"
    },
    documents: [
      { name: { en: "Aadhaar Card", hi: "आधार कार्ड" }, description: { en: "Identity", hi: "पहचान" } },
      { name: { en: "Ration Card", hi: "राशन कार्ड" }, description: { en: "Family proof", hi: "परिवार का प्रमाण" } }
    ],
    requirements: [
       // Simplified logic: BPL or SC/ST usually qualifies in most states (simplified SECC data)
       { field: 'rationCard', operator: 'includes', value: [RationCard.BPL, RationCard.AAY], description: { en: "Based on economic status", hi: "आर्थिक स्थिति के आधार पर" } }
    ]
  }
];
