import { Scheme, SchemeCategory } from './types';

export const TRANSLATIONS: Record<'English' | 'Hindi' | 'Telugu', Record<string, string>> = {
  English: {
    // Navigation/Sidebar
    logoTitle: 'GovIntel AI',
    logoSubtitle: 'Welfare Platform',
    mainNav: 'MAIN NAVIGATION',
    navDash: 'Dashboard Hub',
    navNavigator: 'Schemes Navigator',
    navVerifier: 'AI Document Verifier',
    navChatbot: 'Varta Multi-AI Bot',
    navFeedback: 'Ratings & Feedback',
    navAdmin: 'Insights Dashboard',
    socioStatus: 'SOCIO STATUS',
    navConfigureProfile: 'Configure Profile Info',
    gatewayActive: 'Gateway Active',
    loggedInAs: 'Logged in as',
    connectAccount: 'Connect Account',
    logout: 'Logout',
    loginTitle: 'GovIntel Citizen Identity Portal',
    loginSubtitle: 'National Welfare & Direct Benefit Transfer System',
    signInTab: 'Sign In (Existing Citizen)',
    signUpTab: 'Register (New Custom Profile)',
    loginEmailLabel: 'Registered Email Address',
    loginPasswordLabel: 'Secure Password',
    loginBtn: 'Sign In to Citizen Hub',
    signupBtn: 'Register and View Schemes',
    quickDemoLogin: 'Quick Demo Access',

    // Top Header
    headerDash: 'Citizen Intelligence Dashboard',
    headerNavigator: 'Indian Schemes Navigator',
    headerVerifier: 'AI Automated Credentials Verifier',
    headerChatbot: 'Varta Multilingual AI Helpdesk',
    headerFeedback: 'Citizen Feedback Center',
    headerAdmin: 'Platform Insights & Analytics',
    headerProfile: 'Socio-Demographic Account Management',
    dbtReady: 'Direct Benefit Transfer (DBT) READY',
    activeYear: 'Active 2026-FY',

    // Dashboard Info & Bento
    welcomeTitle: 'Welcome to Government Intelligence',
    welcomeDesc: 'Real-time demographics validation and AI match score processing. Modify your status below to recalculate system rewards.',
    exploreSchemesBtn: 'Explore Active Schemes',
    docScoreTitle: 'Document Readiness Score',
    docScoreDesc: 'Your baseline details (Aadhaar & Income Certificate) are currently scanned and calculated as match-ready!',
    launchVerifierBtn: 'Launch Document Verifier',
    liveStats: 'Live Statistics',
    districtRank: 'Mewat District Rank',
    improvedStat: '▲ Improved (+12%)',
    rankDesc: 'Rank is generated continuously based on regional Direct Benefit Transfer success percentages.',

    // Match Engine Block
    matchEngineTitle: 'MODULE 5: MATCH ENGINE',
    personalRecsTitle: 'Personalized Scheme Recommendations',
    evaluatingText: 'AI evaluating...',
    avgAccuracy: 'Avg eligibility accuracy',
    categoryLabel: 'Category',
    matchBadge: 'Match',
    aiValLogs: 'AI Validation Logs:',
    aiNextAction: 'AI Recommended Next Action:',
    initiateRoadmapBtn: 'Initiate Process Roadmap',
    reviewDetailsBtn: 'Review Scheme Details',
    schemeCatsTitle: 'Scheme Categories',
    enrollProgressTitle: 'Enrollment Progress Tracker',
    noEnrollmentsYet: 'No active enrollments initiated yet.',
    selectSchemeToEnroll: 'Select Scheme To Enroll',
    expandRoadmapChecklist: 'Expand tasks checklist ➔',

    // Roadmap Tracker - Offline Submissions Integration
    roadmapModuleTitle: 'MODULE 11: ROADMAP CHECKLIST',
    roadmapTitle: 'Enrollment Roadmap',
    overallProgress: 'Overall Progress Percentage',
    interactiveTasksChecklist: 'Interactive Tasks Checklist',
    requiredDocsChecklist: 'Required Documents Checklist',
    verifyByAIBtn: 'Verify by AI',
    proTipText: 'Complete your AI verification metrics or choose Offline Submissions below to speed up your Direct Benefit Transfer credit release!',

    // Offline Submission Layout texts
    offlineModeTitle: 'Physical / Offline Submission Option',
    offlineModeDesc: 'If you do not want to use digital AI scanning, you can submit your paperwork manually at the local administrative welfare counter.',
    enableOfflineSubToggle: 'Enable Offline Physical Submission Workflow',
    offlineChecklistHeader: 'Physical Document Checklist',
    offlineStep1: 'Verify print document copies have high legibility and are self-attested',
    offlineStep2: 'Affix a recent passport size photograph and sign the margins',
    offlineStep3: 'Assemble a folder with original credentials for local visual verification',
    offlineStep4: 'Physically submit the paper files at Gram Panchayat or Taluka Block Office',
    offlineStep5: 'Secure a countersigned printed acknowledgement receipt with transaction seal',
    markAsSubmittedOfflineBtn: 'Mark as Submitted Offline',
    submittedOfflineLabel: '✓ Submitted Offline (Manual Review)',
    digitalVerificationRestore: 'Re-enable Digital AI Scanning Mode',

    // Schemes Navigator View
    availableSchemesList: 'Available Schemes List',
    faqsLabel: 'FAQs',
    clearFilter: '🌐 Clear Filter (Show All)',
    faqsHeader: 'Frequently Asked Questions (FAQ)',
    noFaqsListed: 'No FAQs listed for this scheme.',
    applyOnlineBtn: 'Apply Online official site link ↗',
    viewEligibilityDetails: 'Check Eligibility Demographics Requirements',
    applicationSteps: 'Step-by-step Standard Application Walkthrough',
    requiredDocumentsLabel: 'Required Official Certificates List',
    keyBenefitsLabel: 'Welfare Group Core Benefits',
    minAgeReq: 'Minimum Age Requirement',
    maxAgeReq: 'Maximum Age Requirement',
    incomeLimitLabel: 'Maximum Annual Family Income Limit',
    unrestrictedCategory: 'Unrestricted / All Castes',
    unrestrictedGender: 'All Genders Welcome',

    // Document Verification View
    selectDocVerifyPrompt: '1. Select Nodal Scheme and Required Document to Verify',
    selectSchemePlaceholder: '-- Choose Active Welfare Scheme --',
    selectDocumentPlaceholder: '-- Choose Required Document Target --',
    ocrTextInputPrompt: '2. Input Extracted OCR Text Copy or Scan Details below',
    ocrPlaceholder: 'Paste Aadhaar number details, scanned Income certificate seal ID, Caste registry lines, or Bank account numbers here to simulate AI audit diagnostics...',
    ocrQuickActionTitle: 'Or utilize quick test details template below',
    useMockDataBtn: 'Fill Mock Test Document',
    runAiAnalysisBtn: 'Run AI Credential Analysis',
    analysisWait: 'Parsing credentials data securely...',
    verifyResultHeader: 'AI Automated Verification Audit Logs',
    readinessRating: 'Readiness Rating Accuracy Score',
    missingDocsHeader: 'Missing details / Corrective Actions Needed',
    certifiedAcceptLabel: '✓ Certified matching standard format',
    rejectAcceptLabel: '⚠️ Refused: Rectification actions necessary',

    // Multi-AI Chat View
    chatBotGreet: 'Namaste! I am Varta, your Multilingual Schemes Assistant. I support Hindi, Telugu, and English. How can I assist you with housing, welfare pension, and agricultural benefits today?',
    chatInputPlaceholder: 'Type your question about schemes or eligibility requirements here...',
    hearVoiceBtn: '🔊 Speak Aloud Voice Reply',
    stopVoiceBtn: '🔇 Stop Voice Mode',
    sendMessageBtn: 'Send Message',

    // Ratings & Feedback View
    logFeedbackHeader: 'Log Service Quality & Scheme Feedback',
    selectWelfareScheme: 'Select Nodal Welfare Scheme',
    ratingCategory: 'Issue/Feedback Category',
    feedbackCommentPlaceholder: 'Detail any grievances or technical issues faced while trying to claim Direct Benefit Transfers...',
    submitFeedbackBtn: 'Submit Grievance to Welfare Committee',
    recentGrievancesTitle: 'Public Grievance and Service Reviews',
    grievanceStatusLabel: 'Review Status',

    // Insights/Admin View
    realtimeSystemMetrics: 'Real-time System Welfare Performance Profile',
    welfareUsersCount: 'Active Certified Portal Users',
    supportedSchemesCount: 'Registered Central/State Schemes',
    avgWelfareRating: 'Portal Quality Satisfaction Score',
    resolvedGrievancesLabel: 'Successfully Resolved Grievances',
    pendingGrievancesLabel: 'Pending Reviews',
    enrollDistributionTitle: 'Scheme Category Enrollment Distributions',
    analyticsPopularSchemes: 'Popular Registered Schemes Metrics',
    analyticsRegionCount: 'District Level Beneficiary Distributions',
    simulateAlertTitle: 'Broadcasting Portal (Emergency / Scheme Notifications)',
    alertSubjectInput: 'Notification Alert Subject Title',
    alertMessageContent: 'Broadcasting Message Body',
    alertTargetAudience: 'Target Audience Profile Group',
    alertTypeSelect: 'Alert System Type (SMS/WhatsApp/Push)',
    broadcastSubmitBtn: 'Broadcast Live System push',

    // Profile Page Settings
    profileConfigHeader: 'Verify Demographic status profiles',
    citizenName: 'Full Registered Citizen Name',
    citizenEmail: 'Contact Email Identifier',
    citizenAge: 'Current Age (Years)',
    annualFamilyIncome: 'Verified Family Annual Income (INR)',
    categoryCaste: 'Social Classification Category',
    occupationProfession: 'Primary Profession',
    educationLevel: 'Highest Education Level attained',
    physicallyChallengedLabel: 'Physically Challenged (Divyangjan Disability status)',
    minorityStatusLabel: 'Minority Social Category Status',
    widowSingleMotherLabel: 'Widow or Single Mother priority status',
    recalculateMatchesBtn: 'Save and Recalculate match weights',
    profileSavedText: 'Your demographic profiles have been registered. Matching percentages recalculated.'
  },
  Hindi: {
    // Navigation/Sidebar
    logoTitle: 'गोवइंटेल एआई',
    logoSubtitle: 'कल्याण मंच',
    mainNav: 'मुख्य नेविगेशन',
    navDash: 'डैशबोर्ड हब',
    navNavigator: 'योजनाएं नेविगेटर',
    navVerifier: 'एआई दस्तावेज़ सत्यापनकर्ता',
    navChatbot: 'वार्ता मल्टी-एआई बॉट',
    navFeedback: 'रेटिंग और फीडबैक',
    navAdmin: 'इनसाइट डैशबोर्ड',
    socioStatus: 'सामाजिक स्थिति',
    navConfigureProfile: 'प्रोफ़ाइल जानकारी कॉन्फ़िगर करें',
    gatewayActive: 'गेटवे सक्रिय',
    loggedInAs: 'लॉग इन किया है:',
    connectAccount: 'खाता कनेक्ट करें',
    logout: 'लॉग आउट',
    loginTitle: 'गोवइंटेल नागरिक पहचान पोर्टल',
    loginSubtitle: 'राष्ट्रीय कल्याण एवं प्रत्यक्ष लाभ हस्तांतरण प्रणाली',
    signInTab: 'साइन इन (सक्रिय नागरिक)',
    signUpTab: 'पंजीकरण (नई प्रोफ़ाइल)',
    loginEmailLabel: 'पंजीकृत ईमेल का पता',
    loginPasswordLabel: 'सुरक्षित पासवर्ड',
    loginBtn: 'सिटीजन हब में साइन इन करें',
    signupBtn: 'पंजीकरण करें और योजनाएं देखें',
    quickDemoLogin: 'त्वरित डेमो एक्सेस',

    // Top Header
    headerDash: 'नागरिक खुफिया डैशबोर्ड',
    headerNavigator: 'भारतीय योजनाएं नेविगेटर',
    headerVerifier: 'एआई स्वचालित क्रेडेंशियल सत्यापनकर्ता',
    headerChatbot: 'वार्ता बहुभाषी एआई सहायता डेस्क',
    headerFeedback: 'नागरिक प्रतिक्रिया केंद्र',
    headerAdmin: 'प्लेटफ़ॉर्म अंतर्दृष्टि और विश्लेषण',
    headerProfile: 'सामाजिक-जनसांख्यिकीय खाता प्रबंधन',
    dbtReady: 'प्रत्यक्ष लाभ हस्तांतरण (DBT) तैयार',
    activeYear: 'सक्रिय वर्ष 2026',

    // Dashboard Info & Bento
    welcomeTitle: 'सरकारी खुफिया मंच में आपका स्वागत है',
    welcomeDesc: 'वास्तविक समय जनसांख्यिकी सत्यापन और एआई मिलान स्कोर प्रसंस्करण। कल्याणी पुरस्कारों की पुनर्गणना करने के लिए अपनी स्थिति बदलें।',
    exploreSchemesBtn: 'सक्रिय योजनाओं का पता लगाएं',
    docScoreTitle: 'दस्तावेज़ तत्परता स्कोर',
    docScoreDesc: 'आपके मुख्य विवरण (आधार और आय प्रमाण पत्र) वर्तमान में स्कैन किए गए हैं और मिलान-योग्य हैं!',
    launchVerifierBtn: 'दस्तावेज़ सत्यापनकर्ता प्रारंभ करें',
    liveStats: 'सजीव आँकड़े',
    districtRank: 'मेवात जिला रैंक',
    improvedStat: '▲ सुधरा हुआ (+12%)',
    rankDesc: 'रैंक क्षेत्रीय प्रत्यक्ष लाभ हस्तांतरण सफलता प्रतिशत के आधार पर लगातार उत्पन्न होती है।',

    // Match Engine Block
    matchEngineTitle: 'मॉड्यूल 5: मैच इंजन',
    personalRecsTitle: 'व्यक्तिगत योजना अनुशंसाएं',
    evaluatingText: 'एआई मूल्यांकन कर रहा है...',
    avgAccuracy: 'औसत पात्रता सटीकता',
    categoryLabel: 'श्रेणी',
    matchBadge: 'मिलान',
    aiValLogs: 'एआई सत्यापन लॉग:',
    aiNextAction: 'एआई अनुशंसित अगली कार्रवाई:',
    initiateRoadmapBtn: 'प्रक्रिया रोडमैप शुरू करें',
    reviewDetailsBtn: 'योजना विवरण की समीक्षा करें',
    schemeCatsTitle: 'योजना श्रेणियां',
    enrollProgressTitle: 'नामांकन प्रगति ट्रैकर',
    noEnrollmentsYet: 'अभी तक कोई सक्रिय नामांकन शुरू नहीं हुआ है।',
    selectSchemeToEnroll: 'नामांकन के लिए योजना चुनें',
    expandRoadmapChecklist: 'कार्य चेकलिस्ट का विस्तार करें ➔',

    // Roadmap Tracker - Offline Submissions Integration
    roadmapModuleTitle: 'मॉड्यूल 11: रोडमैप चेकलिस्ट',
    roadmapTitle: 'नामांकन रोडमैप',
    overallProgress: 'कुल प्रगति प्रतिशत',
    interactiveTasksChecklist: 'इंटरैक्टिव कार्य चेकलिस्ट',
    requiredDocsChecklist: 'आवश्यक दस्तावेज चेकलिस्ट',
    verifyByAIBtn: 'एआई द्वारा सत्यापित करें',
    proTipText: 'अपने प्रत्यक्ष लाभ हस्तांतरण क्रेडिट रिलीज को तेज करने के लिए अपने एआई सत्यापन मेट्रिक्स को पूरा करें या नीचे ऑफ़लाइन सबमिशन चुनें!',

    // Offline Submission Layout texts
    offlineModeTitle: 'भौतिक / ऑफ़लाइन जमा करने का विकल्प',
    offlineModeDesc: 'यदि आप डिजिटल एआई स्कैनिंग का उपयोग नहीं करना चाहते हैं, तो आप स्थानीय प्रशासनिक कल्याण काउंटर पर मैन्युअल रूप से अपने दस्तावेज जमा कर सकते हैं।',
    enableOfflineSubToggle: 'ऑफ़लाइन भौतिक सबमिशन वर्कफ़्लो सक्षम करें',
    offlineChecklistHeader: 'भौतिक दस्तावेज़ चेकलिस्ट',
    offlineStep1: 'सत्यापित करें कि मुद्रित दस्तावेज़ प्रतियों में उच्च सुपाठ्यता है और वे स्व-सत्यापित हैं',
    offlineStep2: 'हालिया पासपोर्ट आकार का फोटो लगाएं और हाशिये पर हस्ताक्षर करें',
    offlineStep3: 'स्थानीय विज़ुअल सत्यापन के लिए मूल क्रेडेंशियल्स के साथ एक फ़ोल्डर तैयार करें',
    offlineStep4: 'ग्राम पंचायत या तालुका ब्लॉक कार्यालय में भौतिक रूप से कागजी फाइलें जमा करें',
    offlineStep5: 'लेन-देन सील के साथ एक काउंटर-हस्ताक्षरित मुद्रित पावती रसीद सुरक्षित करें',
    markAsSubmittedOfflineBtn: 'ऑफ़लाइन जमा के रूप में चिह्नित करें',
    submittedOfflineLabel: '✓ ऑफ़लाइन सबमिट किया गया (मैन्युअल समीक्षा)',
    digitalVerificationRestore: 'डिजिटल एआई स्कैनिंग मोड फिर से सक्षम करें',

    // Schemes Navigator View
    availableSchemesList: 'उपलब्ध योजनाओं की सूची',
    faqsLabel: 'सामान्य प्रश्न',
    clearFilter: '🌐 फ़िल्टर साफ़ करें (सभी दिखाएं)',
    faqsHeader: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    noFaqsListed: 'इस योजना के लिए कोई अक्सर पूछे जाने वाले प्रश्न सूचीबद्ध नहीं हैं।',
    applyOnlineBtn: 'आधिकारिक साइट लिंक पर ऑनलाइन आवेदन करें ↗',
    viewEligibilityDetails: 'पात्रता जनसांख्यिकी आवश्यकताओं की जांच करें',
    applicationSteps: 'चरण-दर-चरण मानक अनुप्रयोग पूर्वावलोकन',
    requiredDocumentsLabel: 'आवश्यक आधिकारिक प्रमाणपत्रों की सूची',
    keyBenefitsLabel: 'कल्याण समूह के प्रमुख लाभ',
    minAgeReq: 'न्यूनतम आयु आवश्यकता',
    maxAgeReq: 'अधिकतम आयु आवश्यकता',
    incomeLimitLabel: 'अधिकतम वार्षिक पारिवारिक आय सीमा',
    unrestrictedCategory: 'अप्रतिबंधित / सभी जातियां',
    unrestrictedGender: 'सभी लिंगों का स्वागत है',

    // Document Verification View
    selectDocVerifyPrompt: '1. सत्यापित करने के लिए नोडल योजना और आवश्यक दस्तावेज़ चुनें',
    selectSchemePlaceholder: '-- सक्रिय कल्याण योजना चुनें --',
    selectDocumentPlaceholder: '-- आवश्यक दस्तावेज़ लक्ष्य चुनें --',
    ocrTextInputPrompt: '2. नीचे एक्सट्रैक्टेड ओसीआर टेक्स्ट कॉपी या स्कैन विवरण इनपुट करें',
    ocrPlaceholder: 'एआई ऑडिट डायग्नोस्टिक्स का अनुकरण करने के लिए यहां आधार नंबर विवरण, स्कैन किए गए आय प्रमाण पत्र सील आईडी, जाति रजिस्ट्री लाइनें, या बैंक खाता संख्या पेस्ट करें...',
    ocrQuickActionTitle: 'या नीचे दिए गए त्वरित परीक्षण विवरण टेम्पलेट का उपयोग करें',
    useMockDataBtn: 'मॉक टेस्ट दस्तावेज़ भरें',
    runAiAnalysisBtn: 'एआई दस्तावेज़ विश्लेषण चलाएं',
    analysisWait: 'क्रेडेंशियल डेटा सुरक्षित रूप से पार्स किया जा रहा है...',
    verifyResultHeader: 'एआई स्वचालित सत्यापन ऑडिट लॉग्स',
    readinessRating: 'तत्परता रेटिंग सटीकता स्कोर',
    missingDocsHeader: 'लापता विवरण / सुधारात्मक कार्रवाई आवश्यक',
    certifiedAcceptLabel: '✓ प्रमाणित मिलान मानक प्रारूप',
    rejectAcceptLabel: '⚠️ अस्वीकृत: सुधारात्मक कार्रवाई आवश्यक',

    // Multi-AI Chat View
    chatBotGreet: 'नमस्ते! मैं संजना (वार्ता), आपकी बहुभाषी योजना सहायक हूँ। मैं हिंदी, तेलुगु और अंग्रेजी का समर्थन करती हूँ। आज मैं आवास, कल्याण पेंशन और कृषि लाभों के बारे में आपकी कैसे सहायता कर सकती हूँ?',
    chatInputPlaceholder: 'योजनाओं या पात्रता आवश्यकताओं के बारे में अपना प्रश्न यहाँ टाइप करें...',
    hearVoiceBtn: '🔊 उत्तर ज़ोर से सुनें (आवाज)',
    stopVoiceBtn: '🔇 वॉयस मोड बंद करें',
    sendMessageBtn: 'संदेश भेजें',

    // Ratings & Feedback View
    logFeedbackHeader: 'सेवा गुणवत्ता और योजना प्रतिक्रिया दर्ज करें',
    selectWelfareScheme: 'नोडल कल्याण योजना का चयन करें',
    ratingCategory: 'समस्या/प्रतिक्रिया श्रेणी',
    feedbackCommentPlaceholder: 'प्रत्यक्ष लाभ हस्तांतरण का दावा करने का प्रयास करते समय सामना की जाने वाली किसी भी शिकायत या तकनीकी समस्याओं का विवरण दें...',
    submitFeedbackBtn: 'कल्याण समिति को शिकायत दर्ज करें',
    recentGrievancesTitle: 'सार्वजनिक शिकायत और सेवा समीक्षाएं',
    grievanceStatusLabel: 'समीक्षा स्थिति',

    // Insights/Admin View
    realtimeSystemMetrics: 'वास्तविक समय प्रणाली कल्याण प्रदर्शन प्रोफ़ाइल',
    welfareUsersCount: 'सक्रिय प्रमाणित पोर्टल उपयोगकर्ता',
    supportedSchemesCount: 'पंजीकृत केंद्रीय/राज्य योजनाएं',
    avgWelfareRating: 'पोर्टल गुणवत्ता संतुष्टि स्कोर',
    resolvedGrievancesLabel: 'सफलतापूर्वक हल की गईं शिकायतें',
    pendingGrievancesLabel: 'लंबित समीक्षाएं',
    enrollDistributionTitle: 'योजना श्रेणी नामांकन वितरण',
    analyticsPopularSchemes: 'लोकप्रिय पंजीकृत योजनाओं के मेट्रिक्स',
    analyticsRegionCount: 'जिला स्तरीय लाभार्थी वितरण',
    simulateAlertTitle: 'प्रसारण पोर्टल (आपातकालीन / योजना सूचनाएं)',
    alertSubjectInput: 'अधिसूचना चेतावनी विषय शीर्षक',
    alertMessageContent: 'प्रसारण संदेश मुख्य भाग',
    alertTargetAudience: 'लक्षित दर्शक प्रोफ़ाइल समूह',
    alertTypeSelect: 'अलर्ट सिस्टम का प्रकार (SMS/WhatsApp/Push)',
    broadcastSubmitBtn: 'लाइव सिस्टम पुश प्रसारित करें',

    // Profile Page Settings
    profileConfigHeader: 'जनसांख्यिकीय स्थिति प्रोफ़ाइल सत्यापित करें',
    citizenName: 'पूर्ण पंजीकृत नागरिक का नाम',
    citizenEmail: 'संपर्क ईमेल पहचानकर्ता',
    citizenAge: 'वर्तमान आयु (वर्ष)',
    annualFamilyIncome: 'सत्यापित पारिवारिक वार्षिक आय (INR)',
    categoryCaste: 'सामाजिक वर्गीकरण श्रेणी',
    occupationProfession: 'प्राथमिक पेशा',
    educationLevel: 'उच्चतम शैक्षणिक स्तर',
    physicallyChallengedLabel: 'शारीरिक रूप से विकलांग (दिव्यांगता स्थिति)',
    minorityStatusLabel: 'अल्पसंख्यक वर्ग की स्थिति',
    widowSingleMotherLabel: 'विधवा या एकल माता प्राथमिकता स्थिति',
    recalculateMatchesBtn: 'सहेजें और मिलान भार की पुनर्गणना करें',
    profileSavedText: 'आपकी जनसांख्यिकीय प्रोफ़ाइल पंजीकृत कर ली गई है। मिलान क्रेडेंशियल्स की पुनर्गणना की गई।'
  },
  Telugu: {
    // Navigation/Sidebar
    logoTitle: 'గోవఇంటెల్ ఏఐ',
    logoSubtitle: 'కల్యాణ వేదిక',
    mainNav: 'ప్రధాన నావిగేషన్',
    navDash: 'డ్యాష్‌బోర్డ్ హబ్',
    navNavigator: 'పథకాల నావిగేటర్',
    navVerifier: 'ఏఐ పత్రాల వెరిఫైయర్',
    navChatbot: 'వార్తా మల్టీ-ఏఐ బాట్',
    navFeedback: 'రేటింగ్‌లు & ఫీడ్‌బ్యాక్',
    navAdmin: 'ఇన్‌సైట్ డ్యాష్‌బోర్డ్',
    socioStatus: 'సామాజిక స్థితి',
    navConfigureProfile: 'ప్రొఫైల్ సమాచారాన్ని మార్చండి',
    gatewayActive: 'గేట్‌వే యాక్టివ్',
    loggedInAs: 'లాగిన్ అయిన యూజర్:',
    connectAccount: 'ఖాతాను అనుసంధానించండి',
    logout: 'లాగౌట్',
    loginTitle: 'గోవఇంటెల్ పౌర గుర్తింపు పోర్టల్',
    loginSubtitle: 'జాతీయ సంక్షేమం & ప్రత్యక్ష ప్రయోజన బదిలీ వేదిక',
    signInTab: 'లాగిన్ (పాత సిటిజన్)',
    signUpTab: 'నమోదు (కొత్త ప్రొఫైల్)',
    loginEmailLabel: 'నమోదిత ఈమెయిల్ విలాసము',
    loginPasswordLabel: 'రహస్య కోడ్ (పాస్‌వర్డ్)',
    loginBtn: 'సిటిజన్ హబ్‌కు లాగిన్ అవ్వండి',
    signupBtn: 'నమోదు చేసుకుని పథకాలను చూడండి',
    quickDemoLogin: 'త్వరిత డెమో యాక్సెస్',

    // Top Header
    headerDash: 'పౌర మేధో డ్యాష్‌బోర్డ్',
    headerNavigator: 'భారతీయ పథకాల నావిగేటర్',
    headerVerifier: 'ఏఐ స్వయంచాలక ముందస్తు పత్రాల వెరిఫైయర్',
    headerChatbot: 'వార్తా బహుభాషా ఏఐ సహాయ కేంద్రం',
    headerFeedback: 'పౌరుల ఫీడ్‌బ్యాక్ కేంద్రం',
    headerAdmin: 'వేదిక విశ్లేషణలు & గణాంకాలు',
    headerProfile: 'సామాజిక-జనగణన ఖాతా నిర్వహణ',
    dbtReady: 'డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ (DBT) సిద్ధంగా ఉంది',
    activeYear: 'సక్రియ సంవత్సరం 2026',

    // Dashboard Info & Bento
    welcomeTitle: 'ప్రభుత్వ సంక్షేమ ఏఐ డ్యాష్‌బోర్డుకు స్వాగతం',
    welcomeDesc: 'నిజ-సమయ సామాజిక స్థితిగతుల ధృవీకరణ మరియు ఏఐ మ్యాచ్ స్కోర్ ప్రాసెసింగ్. సంక్షేమ ఫలాల లెక్కింపు కోసం మీ ప్రొఫైల్ వివరాలను మార్చండి.',
    exploreSchemesBtn: 'సక్రియ పథకాలను అన్వేషించండి',
    docScoreTitle: 'పత్రాల సంసిద్ధత స్కోరు',
    docScoreDesc: 'మీ ప్రాథమిక ఆధారాలు (ఆధార్ మరియు ఆదాయ ధృవీకరణ పత్రాలు) ప్రస్తుతం స్కాన్ చేయబడ్డాయి మరియు సరిపోలేందుకు సిద్ధంగా ఉన్నాయి!',
    launchVerifierBtn: 'పత్రాల వెరిఫైయర్ ప్రారంభించండి',
    liveStats: 'ప్రత్యక్ష గణాంకాలు',
    districtRank: 'మేవాట్ జిల్లా ర్యాంక్',
    improvedStat: '▲ మెరుగైనది (+12%)',
    rankDesc: 'ప్రాంతీయ డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ విజయవంతమైన శాతం ఆధారంగా ర్యాంక్ నిరంతరం లెక్కించబడుతుంది.',

    // Match Engine Block
    matchEngineTitle: 'మాడ్యూల్ 5: మ్యాచ్ ఇంజిన్',
    personalRecsTitle: 'వ్యక్తిగతీకరించిన పథకం సిఫార్సులు',
    evaluatingText: 'ఏఐ మూల్యాంకనం చేస్తోంది...',
    avgAccuracy: 'సగటు అర్హత ఖచ్చితత్వం',
    categoryLabel: 'వర్గం',
    matchBadge: 'సరిపోలిక',
    aiValLogs: 'ఏఐ ధృవీకరణ లాగ్‌లు:',
    aiNextAction: 'ఏఐ సిఫార్సు చేసిన తదుపరి చర్య:',
    initiateRoadmapBtn: 'ప్రక్రియ రోడ్‌మ్యాప్ ప్రారంభించండి',
    reviewDetailsBtn: 'పథకం వివరాలను సమీక్షించండి',
    schemeCatsTitle: 'పథకాల విభాగాలు',
    enrollProgressTitle: 'నమోదు పురోగతి ట్రాకర్',
    noEnrollmentsYet: 'ఇంకా ఎటువంటి యాక్టివ్ నమోదులు ప్రారంభం కాలేదు.',
    selectSchemeToEnroll: 'నమోదు చేయడానికి పథకాన్ని ఎంచుకోండి',
    expandRoadmapChecklist: 'పనుల చెక్‌లిస్ట్‌ను విస్తరించండి ➔',

    // Roadmap Tracker - Offline Submissions Integration
    roadmapModuleTitle: 'మాడ్యూల్ 11: రోడ్‌మ్యాప్ చెక్‌లిస్ట్',
    roadmapTitle: 'నమోదు రోడ్‌మ్యాప్',
    overallProgress: 'మొత్తం పురోగతి శాతం',
    interactiveTasksChecklist: 'ఇంటరాక్టివ్ పనుల చెక్‌లిస్ట్',
    requiredDocsChecklist: 'అవసరమైన పత్రాల చెక్‌లిస్ట్',
    verifyByAIBtn: 'ఏఐ ద్వారా ధృవీకరించండి',
    proTipText: 'మీ డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ క్రెడిట్ విడుదలను వేగవంతం చేయడానికి మీ ఏఐ ధృవీకరణ వివరాలను పూర్తి చేయండి లేదా క్రింద ఆఫ్‌లైన్ సమర్పణను ఎంచుకోండి!',

    // Offline Submission Layout texts
    offlineModeTitle: 'భౌతిక / ఆఫ్‌లైన్ సమర్పణ ఎంపిక',
    offlineModeDesc: 'మీరు డిజిటల్ ఏఐ స్కానింగ్‌ ఉపయోగించకూడదనుకుంటే, మీ పత్రాలను స్థానిక పరిపాలనా సంక్షేమ కౌంటర్ వద్ద మాన్యువల్‌గా సమర్పించవచ్చు.',
    enableOfflineSubToggle: 'ఆఫ్‌లైన్ భౌతిక సమర్పణ వర్క్‌ఫ్లోను ప్రారంభించండి',
    offlineChecklistHeader: 'భౌతిక పత్రాల చెక్‌లిస్ట్',
    offlineStep1: 'ముద్రించిన పత్రాల నకళ్ళు స్పష్టంగా ఉన్నాయని మరియు స్వయం-ధృవీకరించబడ్డాయని నిర్ధారించుకోండి',
    offlineStep2: 'ఇటీవలి పాస్‌పోర్ట్ సైజు ఫోటోను అతికించి, అంచులలో సంతకం చేయండి',
    offlineStep3: 'స్థానిక దృశ్య ధృవీకరణ కోసం అసలు పత్రాలు మరియు సర్టిఫికెట్లతో కూడిన ఫైలును సిద్ధం చేయండి',
    offlineStep4: 'గ్రామ పంచాయతీ లేదా తాలూకా బ్లాక్ ఆఫీసులో భౌతికంగా కాగితపు ఫైళ్లను సమర్పించండి',
    offlineStep5: 'ట్రాన్సాక్షన్ సీల్‌తో కూడిన కౌంటర్-సంతకం చేసిన ముద్రిత రసీదును పొందండి',
    markAsSubmittedOfflineBtn: 'ఆఫ్‌లైన్‌లో సమర్పించినట్లుగా గుర్తించు',
    submittedOfflineLabel: '✓ ఆఫ్‌లైన్‌లో సమర్పించబడింది (మాన్యువల్ సమీక్ష)',
    digitalVerificationRestore: 'డిజిటల్ ఏఐ స్కానింగ్ మోడ్‌ను తిరిగి ప్రారంభించండి',

    // Schemes Navigator View
    availableSchemesList: 'అందుబాటులో ఉన్న పథకాల జాబితా',
    faqsLabel: 'తరచుగా అడిగే ప్రశ్నలు',
    clearFilter: '🌐 ఫిల్టర్ క్లియర్ చేయి (అన్నీ చూపించు)',
    faqsHeader: 'తరచుగా అడిగే ప్రశ్నలు (FAQ)',
    noFaqsListed: 'ఈ పథకానికి సంబంధించి తరచుగా అడిగే ప్రశ్నలు ఏవీ లేవు.',
    applyOnlineBtn: 'అధికారిక సైట్ లింక్‌లో ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి ↗',
    viewEligibilityDetails: 'అర్హత కావలసిన నిబంధనలను తనిఖీ చేయండి',
    applicationSteps: 'దశలవారీగా ప్రామాణిక దరఖాస్తు ప్రదర్శన',
    requiredDocumentsLabel: 'అవసరమైన అధికారిక సర్టిఫికెట్ల జాబితా',
    keyBenefitsLabel: 'సంక్షేమ పథకం యొక్క ప్రధాన ప్రయోజనాలు',
    minAgeReq: 'కనీస వయస్సు పరిమితి',
    maxAgeReq: 'గరిష్ట వయస్సు పరిమితి',
    incomeLimitLabel: 'గరిష్ట వార్షిక కుటుంబ ఆదాయ పరిమితి',
    unrestrictedCategory: 'అన్ని సామాజిక వర్గాల వారికి అర్హత ఉంది',
    unrestrictedGender: 'లింగ భేదం లేకుండా అందరికీ అర్హత కలదు',

    // Document Verification View
    selectDocVerifyPrompt: '1. ధృవీకరించడానికి నోడల్ పథకం మరియు అవసరమైన పత్రాన్ని ఎంచుకోండి',
    selectSchemePlaceholder: '-- యాక్టివ్ సంక్షేమ పథకాన్ని ఎంచుకోండి --',
    selectDocumentPlaceholder: '-- అవసరమైన పత్రాన్ని ఎంచుకోండి --',
    ocrTextInputPrompt: '2. క్రింద సేకరించిన OCR టెక్స్ట్ నకలు లేదా స్కాన్ వివరాలను నమోదు చేయండి',
    ocrPlaceholder: 'ఏఐ ఆడిట్ విశ్లేషణను అనుకరించడానికి ఇక్కడ ఆధార్ నంబర్ వివరాలు, స్కాన్ చేసిన ఆదాయ ధృవీకరణ పత్రం సీల్ ఐడి, సామాజిక వర్గ రిజిస్ట్రీ పంక్తులు లేదా బ్యాంక్ ఖాతా సంఖ్యలను అతికించండి...',
    ocrQuickActionTitle: 'లేదా క్రింది మోడల్ టెస్ట్ డాక్యుమెంట్ వివరాల నమూనాను ఉపయోగించండి',
    useMockDataBtn: 'మోడల్ టెస్ట్ డాక్యుమెంట్ వివరాలను పూరించు',
    runAiAnalysisBtn: 'ఏఐ క్రెడెన్షియల్ విశ్లేషణను ప్రారంభించండి',
    analysisWait: 'ధృవీకరణ పత్రాల డేటా సురక్షితంగా విశ్లేషించబడుతోంది...',
    verifyResultHeader: 'ఏఐ స్వయంచాలక ధృవీకరణ ఆడిట్ నివేదికలు',
    readinessRating: 'పత్ర సన్నద్ధత ఖచ్చితత్వ స్కోరు',
    missingDocsHeader: 'తప్పిపోయిన వివరాలు / సరిదిద్దవలసిన చర్యలు అవసరం',
    certifiedAcceptLabel: '✓ సర్టిఫైడ్ సరిపోలే ప్రామాణిక చిత్రం',
    rejectAcceptLabel: '⚠️ తిరస్కరించబడింది: సరిదిద్దే చర్యలు అవసరం',

    // Multi-AI Chat View
    chatBotGreet: 'నమస్కారం! నేను సంజన (వార్తా), మీ బహుభాషా పథక సహాయకురాలిని. నేను హిందీ, తెలుగు మరియు ఇంగ్లీష్ భాషలకు మద్దతు ఇస్తాను. గృహనిర్మాణం, సామాజిక పెన్షన్ మరియు వ్యవసాయ ప్రయోజనాల గురించి మీ ప్రశ్నలను ఇక్కడ అడగండి!',
    chatInputPlaceholder: 'పథకాలు లేదా అర్హత అవసరాల గురించి మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...',
    hearVoiceBtn: '🔊 సమాధానాన్ని గట్టిగా వినండి (వాయిస్)',
    stopVoiceBtn: '🔇 వాయిస్ మోడ్ నిలిపివేయి',
    sendMessageBtn: 'సందేశం పంపించు',

    // Ratings & Feedback View
    logFeedbackHeader: 'సేవా నాణ్యత మరియు పథకం ఫీడ్‌బ్యాక్ నమోదు చేయండి',
    selectWelfareScheme: 'నోడల్ సంక్షేమ పథకాన్ని ఎంచుకోండి',
    ratingCategory: 'సమస్య/ఫీడ్‌బ్యాక్ వర్గం',
    feedbackCommentPlaceholder: 'ప్రత్యక్ష సంక్షేమ ప్రయోజనాలు (DBT) పొందే ప్రయత్నంలో ఎదుర్కొన్న ఏవైనా సమస్యలు లేదా సాంకేతిక లోపాలను ఇక్కడ వివరించండి...',
    submitFeedbackBtn: 'సంక్షేమ కమిటీకి గిరిజనాన్ని నివేదించండి',
    recentGrievancesTitle: 'ప్రజా ఫిర్యాదులు మరియు సేవా సమీక్షలు',
    grievanceStatusLabel: 'సమీక్ష స్థితి',

    // Insights/Admin View
    realtimeSystemMetrics: 'నిజ-సమయ సిస్టమ్ సంక్షేమ పనితీరు ప్రొఫైల్',
    welfareUsersCount: 'యాక్టివ్ సర్టిఫైడ్ పోర్టల్ వినియోగదారులు',
    supportedSchemesCount: 'నమోదైన కేంద్ర/రాష్ట్ర పథకాలు',
    avgWelfareRating: 'పోర్టల్ గుణాత్మక సంతృప్తి స్కోరు',
    resolvedGrievancesLabel: 'విజయవంతంగా పరిష్కరించబడిన ఫిర్యాదులు',
    pendingGrievancesLabel: 'పెండింగ్ సమీక్షలు',
    enrollDistributionTitle: 'పథకం కేటగిరీల రిజిస్ట్రేషన్ పురోగతి',
    analyticsPopularSchemes: 'ప్రజాదరణ పొందిన నమోదిత పథకాల విశ్లేషణలు',
    analyticsRegionCount: 'జిల్లా స్థాయి లబ్ధిదారుల పంపిణీ',
    simulateAlertTitle: 'ప్రసార పోర్టల్ (అత్యవసర / పథకం నోటిఫికేషన్లు)',
    alertSubjectInput: 'నోటిఫికేషన్ హెచ్చరిక శీర్షిక',
    alertMessageContent: 'ప్రసార సందేశం ముఖ్య భాగం',
    alertTargetAudience: 'లక్ష్య ప్రేక్షకుల ప్రొఫైల్ సమూహం',
    alertTypeSelect: 'అలర్ట్ సిస్టమ్ రకం (SMS/WhatsApp/Push)',
    broadcastSubmitBtn: 'లైవ్ సిస్టమ్ పుష్ ప్రసారం చేయి',

    // Profile Page Settings
    profileConfigHeader: 'జనగణన ఆధారిత అర్హత ప్రొఫైల్స్ తనిఖీ చేయండి',
    citizenName: 'పూర్తి నమోదిత పౌరుడి పేరు',
    citizenEmail: 'ఈమెయిల్ చిరునామా',
    citizenAge: 'ప్రస్తుత వయస్సు (సంవత్సరాలు)',
    annualFamilyIncome: 'ధృవీకరించబడిన కుటుంబ వార్షिक ఆదాయం (INR)',
    categoryCaste: 'సామాజిక వర్గం (కేటగిరీ)',
    occupationProfession: 'ప్రధాన వృత్తి',
    educationLevel: 'అత్యున్నత విద్యా అర్హత',
    physicallyChallengedLabel: 'శారీరక వికలాంగత్వ స్థితి (దివ్యాంగులు)',
    minorityStatusLabel: 'మైనారిటీ సామాజిక వర్గ స్థితి',
    widowSingleMotherLabel: 'వితంతువు లేదా ఒంటరి తల్లి ప్రాధాన్యత స్థితి',
    recalculateMatchesBtn: 'సేవ్ చేసి అర్హతను తిరిగి లెక్కించండి',
    profileSavedText: 'మీ జనగణన ప్రొఫైల్ వివరాలు విజయవంతంగా నమోదయ్యాయి. పథక సరిపోలిక శాతాలు తిరిగి లెక్కించబడ్డాయి.'
  }
};

// Fully translated static schemes details matching the localized dictionaries
export const SCHEMES_TRANSLATIONS: Record<'Hindi' | 'Telugu', Record<string, Partial<Scheme>>> = {
  Hindi: {
    'educ-pm-yashasvi': {
      name: 'पीएम यशस्वी छात्रवृत्ति योजना (PM YASASVI)',
      description: 'अन्य पिछड़ा वर्ग (OBC), आर्थिक रूप से पिछड़े वर्ग (EBC), और गैर-अधिसूचित, खानाबदोश और अर्ध-खानाबदोश जनजातियों (DNT) के कक्षा 9 या कक्षा 11 में पढ़ने वाले छात्रों के लिए अत्यधिक केंद्रित छात्रवृत्ति योजना।',
      benefits: [
        'कक्षा 9/10 के छात्रों के लिए 75,000 रुपये प्रति वर्ष की छात्रवृत्ति।',
        'कक्षा 11/12 के छात्रों के लिए 1,25,000 रुपये प्रति वर्ष की छात्रवृत्ति।',
        'शिक्षण शुल्क, छात्रावास व्यय और पुस्तकों के लिए विशेष भत्ता शामिल है।'
      ],
      eligibilityDescription: 'OBC, EBC या DNT श्रेणी से संबंधित होना चाहिए। सभी स्रोतों से पारिवारिक आय 2,50,000 रुपये प्रति वर्ष से अधिक नहीं होनी चाहिए। चिन्हित शीर्ष स्कूलों में अध्ययनरत होना चाहिए।',
      applicationProcess: [
        'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर पंजीकरण करें।',
        'अनुशंसित प्रवेश परीक्षा या स्कूल-विशिष्ट शैक्षणिक रिकॉर्ड इनपुट करें।',
        'आय, जाति और अंकपत्र दस्तावेज अपलोड करें।',
        'स्थानीय ब्लॉक/जिला अधिकारी को स्कूल सत्यापन फॉर्म जमा करें।'
      ],
      requiredDocuments: [
        'छात्र का आधार कार्ड',
        'आय प्रमाण पत्र (2.5 लाख से कम)',
        'जाति प्रमाण पत्र (OBC/EBC/DNT)',
        'पिछली उत्तीर्ण परीक्षा की मार्कशीट',
        'वर्तमान शैक्षणिक कक्षा की शुल्क रसीद'
      ],
      faqs: [
        {
          question: 'क्या पीएम यशस्वी के लिए कोई प्रवेश परीक्षा होती है?',
          answer: 'हां, राष्ट्रीय परीक्षण एजेंसी (NTA) यशस्वी प्रवेश परीक्षा आयोजित करती है, हालांकि शैक्षणिक वर्षों के आधार पर मेरिट लिस्ट का उपयोग किया जा सकता है।'
        },
        {
          question: 'क्या सामान्य वर्ग के छात्र आवेदन कर सकते हैं?',
          answer: 'नहीं, यह विशेष रूप से सामाजिक न्याय मंत्रालय द्वारा परिभाषित OBC, EBC और DNT श्रेणियों के लिए आरक्षित है।'
        }
      ]
    },
    'agri-pm-kisan': {
      name: 'पीएम-किसान सम्मान निधि योजना',
      description: 'भारत सरकार द्वारा एक अनूठी पहल जिसके तहत देश भर के सभी भूमिधारक किसान परिवारों को प्रति वर्ष 6,000 रुपये तीन समान किश्तों में सीधे बैंक खातों में प्रदान किए जाते हैं।',
      benefits: [
        'प्रति वर्ष 6000 रुपये सीधे बैंक खातों में स्थानांतरित (प्रत्यक्ष लाभ हस्तांतरण)।',
        'हर 4 महीने में 2000 रुपये की 3 समान किश्तों में भुगतान।',
        'कृषि आदानों, उर्वरकों, बीजों और संबद्ध कृषि खर्चों के लिए वित्तीय सहायता।'
      ],
      eligibilityDescription: 'कृषि योग्य भूमि वाला एक सक्रिय भूमिधारक किसान परिवार होना चाहिए। इसमें संस्थागत भूमिधारक, करदाता और उच्च पदस्थ पेशेवर शामिल नहीं हैं।',
      applicationProcess: [
        'पीएम-किसान पोर्टल पर जाएं या स्थानीय सामान्य सेवा केंद्र (CSC) से संपर्क करें।',
        'भूमि स्वामित्व विवरण, खाता संख्या और आधार नंबर दर्ज करें।',
        'बैंक खाता लिंकिंग और भूमि सत्यापन प्रक्रिया पूर्ण करें।',
        'ओटीपी या बायोमेट्रिक स्कैन के माध्यम से ई-केवाईसी सत्यापन पूर्ण करें।'
      ],
      requiredDocuments: [
        'आधार कार्ड',
        'भूमि स्वामित्व रिकॉर्ड (खतौनी/पट्टा दस्तावेज)',
        'बैंक खाता पासबुक (आधार से लिंक)',
        'ओटीपी सत्यापन के लिए सक्रिय मोबाइल नंबर'
      ],
      faqs: [
        {
          question: 'क्या कृषि मजदूर पीएम-किसान के लिए पंजीकरण कर सकते हैं?',
          answer: 'नहीं, यह योजना केवल भूमि-स्वामित्व रखने वाले किसानों के लिए है। कृषि भूमिहीन मजदूरों को इसमें शामिल नहीं किया गया है।'
        },
        {
          question: 'क्या ई-केवाईसी अनिवार्य है?',
          answer: 'हां, आगामी किश्तों का लाभ प्राप्त करने के लिए ई-केवाईसी अत्यंत अनिवार्य है।'
        }
      ]
    },
    'ep-mgnrega': {
      name: 'मनरेगा (MGNREGA) - राष्ट्रीय ग्रामीण रोजगार गारंटी',
      description: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम प्रत्येक वित्तीय वर्ष में कम से कम 100 दिनों के गारंटीकृत मजदूरी रोजगार प्रदान करता है, जो अकुशल शारीरिक श्रम करने के इच्छुक ग्रामीण वयस्कों के लिए है।',
      benefits: [
        'प्रति वर्ष 100 दिनों का गारंटीकृत ग्रामीण शारीरिक श्रम रोजगार।',
        'यदि आवेदन करने के 15 दिनों के भीतर काम आवंटित नहीं होता है, तो बेरोजगारी भत्ता दिया जाएगा।',
        'पुरुष और महिला श्रमिकों के लिए समान मजदूरी। संवितरण सीधे बैंक खाते में।'
      ],
      eligibilityDescription: 'भारत का नागरिक होना चाहिए जो ग्रामीण स्थानीय क्षेत्र में निवास करता हो। अकुशल शारीरिक श्रम रोजगार के लिए इच्छुक होना चाहिए। उम्र 18 वर्ष से ऊपर होनी चाहिए।',
      applicationProcess: [
        'पंजीकरण के लिए स्थानीय ग्राम पंचायत कार्यालय में आवेदन जमा करें।',
        '15 दिनों के भीतर परिवार के वयस्क सदस्यों के विवरण के साथ अद्वितीय जॉब कार्ड प्राप्त करें।',
        'काम की मांग करते हुए ग्राम पंचायत को लिखित आवेदन जमा करें।',
        'ग्राम पंचायत 5 किमी की सीमा के भीतर काम आवंटित करती है।'
      ],
      requiredDocuments: [
        'आधार कार्ड',
        'परिवार के सभी वयस्क सदस्यों की हालिया पासपोर्ट आकार की तस्वीरें',
        'बैंक खाता विवरण',
        'ग्रामीण क्षेत्राधिकार का पता प्रमाण (राशन कार्ड/मतदाता पहचान पत्र)'
      ],
      faqs: [
        {
          question: 'मनरेगा जॉब कार्ड कितने वर्षों के लिए वैध होता है?',
          answer: 'मनरेगा जॉब कार्ड 5 वर्षों के लिए वैध होता है और स्थानीय पंचायत प्रशासन द्वारा इसका नवीनीकरण कराया जा सकता है।'
        },
        {
          question: 'यदि ग्राम पंचायत काम प्रदान करने में विफल रहती है तो क्या होता है?',
          answer: 'यदि मांग के 15 दिनों के भीतर काम नहीं दिया जाता है, तो आप कानूनी रूप से दैनिक बेरोजगारी भत्ता पाने के हकदार हैं।'
        }
      ]
    },
    'women-sukanya-samriddhi': {
      name: 'सुकन्या समृद्धि योजना (SSY)',
      description: 'बेटी बचाओ बेटी पढ़ाओ अभियान के तहत बालिकाओं के उज्जवल भविष्य के लिए प्रचारित एक छोटी बचत योजना। बेटियों की शिक्षा और विवाह के लिए उच्च ब्याज दर पर कर-मुक्त बचत प्रदान करती है।',
      benefits: [
        'अत्यधिक उच्च चक्रवृद्धि ब्याज दरें (वर्तमान में 8.2 प्रतिशत)।',
        'धारा 80C के तहत जमा राशि और अर्जित ब्याज दोनों पर पूर्ण आयकर छूट।',
        'उच्च शिक्षा या विवाह खर्चों के लिए बेटी को बड़ी वित्तीय सुरक्षा।'
      ],
      eligibilityDescription: 'जैविक माता-पिता या कानूनी अभिभावकों द्वारा किसी बालिका के लिए जन्म से लेकर 10 वर्ष की आयु तक खाता खोला जा सकता है। प्रति परिवार अधिकतम दो खाते।',
      applicationProcess: [
        'किसी भी स्थानीय डाकघर या अधिकृत बैंक शाखा में जाएं।',
        'सुकन्या समृद्धि खाता खोलने का आवेदन पत्र भरें।',
        'बालिका का जन्म प्रमाण पत्र और अभिभावक के दस्तावेज जमा करें।',
        'न्यूनतम 250 रुपये (अधिकतम 1.5 लाख रुपये) जमा करके खाता शुरू करें।'
      ],
      requiredDocuments: [
        'बालिका का जन्म प्रमाण पत्र',
        'अभिभावक का आधार कार्ड और पैन कार्ड',
        'पते का प्रमाण (बिजली बिल, पासपोर्ट या राशन कार्ड)',
        'अभिभावक की पासपोर्ट आकार की तस्वीरें'
      ],
      faqs: [
        {
          question: 'सुकन्या समृद्धि खाता कब परिपक्व होता है?',
          answer: 'खाता खोलने की तारीख से 21 वर्ष बाद या बालिका के 18 वर्ष की होने के बाद विवाह के समय खाता परिपक्व होता है।'
        },
        {
          question: 'क्या शिक्षा के लिए आंशिक निकासी की जा सकती है?',
          answer: 'हां, बालिका के 18 वर्ष की होने या कक्षा 10 उत्तीर्ण करने के बाद उच्च शिक्षा के लिए 50% तक राशि की निकासी की अनुमति है।'
        }
      ]
    },
    'health-ayushman-bharat': {
      name: 'आयुष्मान भारत पीएम-जय स्वास्थ्य बीमा (PM-JAY)',
      description: 'दुनिया की सबसे बड़ी सरकारी वित्त पोषित स्वास्थ्य आश्वासन योजना, जिसके तहत प्रति परिवार प्रति वर्ष 5 लाख रुपये तक का कैशलेस माध्यमिक और तृतीयक अस्पताल उपचार प्रदान किया जाता है।',
      benefits: [
        'प्रति वर्ष प्रति परिवार 5,00,000 रुपये का मुफ्त चिकित्सा कवर।',
        'संबद्ध सरकारी और निजी अस्पतालों में कैशलेस और पेपरलेस उपचार।',
        'अस्पताल में भर्ती होने से पहले और बाद की दवाएं, निदान और डॉक्टर परामर्श शामिल हैं।'
      ],
      eligibilityDescription: 'SECC 2011 डेटाबेस या 1.2 लाख रुपये प्रति वर्ष से कम वार्षिक आय के आधार पर चिन्हित गरीब ग्रामीण और शहरी वंचित परिवारों के लिए पात्र।',
      applicationProcess: [
        'पीएम-जय पोर्टल पर अपनी पात्रता जांचें या पास के जन सेवा केंद्र से संपर्क करें।',
        'संबद्ध अस्पताल में आयुष्मान मित्र डेस्क से संपर्क करें।',
        'पीएम-जय आईडी कार्ड प्राप्त करने के लिए आधार कार्ड या राशन कार्ड स्कैन कराएं।',
        'उपचार के समय कैशलेस आयुष्मान गोल्डन कार्ड प्रस्तुत करें।'
      ],
      requiredDocuments: [
        'आधार कार्ड या मतदाता पहचान पत्र',
        'पूरे परिवार की सूची वाला राशन कार्ड',
        'आय प्रमाण पत्र (1.2 लाख से कम)',
        'SECC-2011 परिवार रिकॉर्ड सूची की प्रति'
      ],
      faqs: [
        {
          question: 'क्या आयुष्मान भारत में पहले से मौजूद बीमारियां शामिल हैं?',
          answer: 'हां, सभी पहले से मौजूद बीमारियां कार्ड प्राप्त करने के पहले दिन से ही इसके दायरे में शामिल होती हैं।'
        },
        {
          question: 'क्या नया पैदा हुआ बच्चा स्वतः पात्र हो जाता है?',
          answer: 'हां, नवजात शिशु बिना किसी डेटा अपडेट की प्रतीक्षा किए जन्म के पहले दिन से ही उपचार पाने का हकदार है।'
        }
      ]
    },
    'house-pmay-g': {
      name: 'प्रधानमंत्री आवास योजना ग्रामीण (PMAY-G)',
      description: 'ग्रामीण क्षेत्रों के बेघर और जर्जर मकानों में रहने वाले परिवारों को बुनियादी सुविधाओं से युक्त 25 वर्ग मीटर का पक्का मकान प्रदान करने की सामाजिक आवास सहायता योजना।',
      benefits: [
        'मैदानी क्षेत्रों में 1,20,000 रुपये और पहाड़ी/दुर्गम क्षेत्रों में 1,30,000 रुपये की सीधी वित्तीय सहायता।',
        'मनरेगा के तहत शौचालय निर्माण या श्रम के लिए अतिरिक्त वित्तीय दैनिक मजदूरी लाभ।',
        'स्वच्छ भारत मिशन के तहत शौचालय के लिए अतिरिक्त 12,000 रुपये।'
      ],
      eligibilityDescription: 'कच्ची दीवारों और छत वाले शून्य/एक/दो कमरों के कच्चे मकानों में रहने वाले ग्रामीण परिवार। दोपहिया/चार पहिया वाहन या सरकारी नौकरी रखने वाले परिवार अपवर्जित हैं।',
      applicationProcess: [
        'सामाजिक-आर्थिक जाति जनगणना के आधार पर ग्राम सभा लाभार्थियों का चयन करती है।',
        'अवासासॉफ्ट पोर्टल पर पंचायत लाभार्थियों का नाम और डेटा अपलोड करती है।',
        'पुराने कच्चे मकान के जियो-टैगिंग के बाद निर्माण के लिए पहली किस्त सीधे बैंक में स्थानांतरित की जाती है।'
      ],
      requiredDocuments: [
        'परिवार के सदस्यों का आधार कार्ड विवरण',
        'आधार से लिंक बैंक पासबुक',
        'मनरेगा जॉब कार्ड नंबर',
        'शपथ पत्र कि आवेदक के पास भारत में कोई पक्का घर नहीं है'
      ],
      faqs: [
        {
          question: 'प्रधानमंत्री आवास का निर्माण कौन करता है?',
          answer: 'मकान का निर्माण करना स्वयं लाभार्थी की जिम्मेदारी है। ठेकेदारों द्वारा निर्माण कराना सख्त वर्जित है।'
        }
      ]
    },
    'social-pension': {
      name: 'इदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
      description: 'गरीबी रेखा से नीचे (BPL) जीवन यापन करने वाले बुजुर्ग भारतीय नागरिकों के लिए एक प्रत्यक्ष मासिक वित्तीय सहायता पेंशन योजना।',
      benefits: [
        '60-79 वर्ष के बुजुर्ग नागरिकों के लिए 200 रुपये प्रति माह की पेंशन।',
        '80 वर्ष या उससे अधिक उम्र के नागरिकों के लिए पेंशन बढ़कर 500 रुपये प्रति माह हो जाती है।',
        'सीधे बैंक खातों या डाकघर बचत खातों में संवितरण।'
      ],
      eligibilityDescription: 'उम्र 60 वर्ष या उससे अधिक होनी चाहिए। अधिकृत अधिकारियों द्वारा सत्यापित गरीबी रेखा से नीचे (BPL) श्रेणी का मान्य राशन कार्ड होना चाहिए।',
      applicationProcess: [
        'स्थानीय ब्लॉक विकास कार्यालय या सामाजिक कल्याण डेस्क से आवेदन पत्र प्राप्त करें।',
        'आयु प्रमाण प्रमाण पत्र संलग्न करें, BPL कार्ड की प्रति संलग्न करें।',
        'फॉर्म को ग्राम पंचायत या नगर निगम कार्यालय में जमा करें।',
        'कल्याण अधिकारी की समीक्षा के बाद पेंशन आदेश पत्र जारी किए जाते हैं।'
      ],
      requiredDocuments: [
        'आधार कार्ड',
        'आयु प्रमाण पत्र (जन्म प्रमाण पत्र, स्कूल मार्कशीट या सरकारी चिकित्सा आयु प्रमाणपत्र)',
        'मान्य बीपीएल राशन कार्ड',
        'बैंक खाता विवरण'
      ],
      faqs: [
        {
          question: 'क्या राज्य सरकार अतिरिक्त सहायता देती है?',
          answer: 'हां, कई राज्य सरकारें केंद्रीय आधार पेंशन राशि में अपनी तरफ से अतिरिक्त पूरक राशि (500 से 1500 रुपये तक) जोड़ती हैं।'
        }
      ]
    }
  },
  Telugu: {
    'educ-pm-yashasvi': {
      name: 'పీఎం యశస్వి స్కాలర్‌షిప్ పథకం (PM YASASVI)',
      description: '9వ లేదా 11వ తరగతి చదువుతున్న ఇతర వెనుకబడిన తరగతులు (OBC), ఆర్థికంగా వెనుకబడిన వర్గాలు (EBC), మరియు సంచార జాతులకు (DNT) చెందిన విద్యార్థుల కోసం ఉద్దేశించిన ప్రతిష్టాత్మక స్కాలర్‌షిప్ పథకం.',
      benefits: [
        '9/10 తరగతి విద్యార్థులకు సంవత్సరానికి రూ. 75,000 స్కాలర్‌షిప్ సహాయం.',
        '11/12 తరగతి విద్యార్థులకు సంవత్సరానికి రూ. 1,25,000 స్కాలర్‌షిప్ సహాయం.',
        'ట్యూషన్ ఫీజు, హాస్టల్ ఖర్చులు మరియు పుస్తకాల కొనుగోలుకు అయ్యే అలవెన్సులను కవర్ చేస్తుంది.'
      ],
      eligibilityDescription: 'OBC, EBC లేదా DNT సామాజिक వర్గానికి చెందినవారై ఉండాలి. కుటుంబ వార్షిక ఆదాయం రూ. 2,50,000 మించకూడదు. ఎంపిక చేయబడిన అగ్రశ్రేణి పాఠశాలల్లో చదువుతుండాలి.',
      applicationProcess: [
        'నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (NSP) లో నమోదు చేసుకోండి.',
        'యశస్వి ప్రవేశ పరీక్ష లేదా పాఠశాల విద్యా అర్హత మార్కులను నమోదు చేయండి.',
        'ఆదాయ, కుల మరియు విద్యా సర్టిఫికెట్ల నకళ్లను అప్‌లోడ్ చేయండి.',
        'పాఠశాల ధృవీకరణ పత్రాన్ని స్థానిక బ్లాక్/జిల్లా అధికారికి సమర్పించండి.'
      ],
      requiredDocuments: [
        'విద్యార్థి యొక్క ఆధార్ కార్డ్',
        'ఆదాయ ధృవీకరణ పత్రం (రూ. 2.5 లక్ష లోపు)',
        'కుల ధృవీకరణ పత్రం (OBC/EBC/DNT)',
        'మునుపటి తరగతి మార్కుల జాబితా',
        'ప్రస్తుత విద్యా సంవత్సరం ఫీజు రసీదు'
      ],
      faqs: [
        {
          question: 'పీఎం యశస్వి కొరకు ప్రవేశ పరీక్ష ఉంటుందా?',
          answer: 'అవును, నేషనल టెస్టింగ్ ఏజెన్సీ (NTA) ప్రతి సంవత్సరం యశస్వి ప్రవేశ పరీక్షను నిర్వహిస్తుంది, మెరిట్ ఆధారంగా ఎంపిక చేయబడుతుంది.'
        },
        {
          question: 'జనరల్ కేటగిరీ విద్యార్థులు దరఖాస్తు చేసుకోవచ్చా?',
          answer: 'లేదు, ఇది సామాజిక న్యాయ మంత్రిత్వ శాఖచే నిర్దేశించబడిన OBC, EBC మరియు DNT కేటగిరీలకు మాత్రమే పరిమితం.'
        }
      ]
    },
    'agri-pm-kisan': {
      name: 'పీఎం-కిసాన్ సమ్మాన్ నిధి యోజన',
      description: 'భారతదేశ వ్యాప్తంగా సాగు భూమి గల రైతు కుటుంబాలకు సంవత్సరానికి రూ. 6,000 ఆర్థిక సహాయం అందించే కేంద్ర ప్రభుత్వ విశిష్ట విప్లవాత్మక కార్యక్రమం.',
      benefits: [
        'సంవత్సరానికి రూ. 6,000 నేరుగా రైతుల బ్యాంక్ ఖాతాలకు బదిలీ (DBT).',
        'రూ. 2000 చొప్పున మూడు సమాన వాయిదాల్లో ప్రతి నాలుగు నెలలకు ఒకసారి చెల్లింపు.',
        'ఎరువులు, విత్తనాలు మరియు వ్యవసాయ ఖర్చులకు ఆర్థిక సహాయం.'
      ],
      eligibilityDescription: 'సాగు చేయదగిన భూమి కలిగి ఉన్న క్రియాశీల రైతు కుటుంబాలు అర్హులు. సంస్థాగత భూస్వాములు, ఉద్యోగులు మరియు ఆదాయపు పన్ను చెల్లించేవారు అనర్హులు.',
      applicationProcess: [
        'పీఎం-కిసాన్ అధికారిక పోర్టల్ సందర్శించండి లేదా స్థానిక సేవా కేంద్రం (CSC) ని సంప్రదించండి.',
        'భూమి పట్టాదారు యాజమాన్య వివరాలు, సర్వే నంబర్, మరియు ఆధార్ నంబర్ నమోదు చేయండి.',
        'బ్యాంక్ ఖాతా అనుసంధానం మరియు వ్యవసాయ భూమి ధృవీకరణ పూర్తి చేయండి.',
        'OTP లేదా బయోమెట్రిక్ ఉపయోగించి తప్పనిసరిగా ఇ-KYC పూర్తి చేయండి.'
      ],
      requiredDocuments: [
        'ఆధార్ కార్డ్',
        'భూమి యాజమాన్య పత్రాలు (పట్టాదారు పాస్ బుక్/ఖतौनी నకలు)',
        'ఆధార్ అనుసంధానించబడిన బ్యాంక్ ఖాతా పాస్ బుక్',
        'ఓటిపి వెరిఫికేషన్ కొరకు క్రియాశీల మొబైల్ నంబర్'
      ],
      faqs: [
        {
          question: 'వ్యవసాయ కూలీలు పీఎం-కిసాన్ కి దరఖాస్తు చేసుకోవచ్చా?',
          answer: 'లేదు. ఈ పథకం కేవలం సొంతంగా వ్యవసాయ భూమి కలిగి ఉన్న రైతులకు మాత్రమే వర్తిస్తుంది. కేవలం వ్యవసాయ కూలీలుగా పని చేసే వారికి వర్తించదు.'
        },
        {
          question: 'ఇ-KYC ఖచ్చితంగా అవసరమా?',
          answer: 'అవును, రాబోయే వాయిదాల ఆర్థిక సహాయం పొందడానికి ప్రతి రైతు ఇ-KYC పూర్తి చేయడం ఖచ్చితంగా తప్పనిసరి.'
        }
      ]
    },
    'ep-mgnrega': {
      name: 'మహాత్మా గాంధी జాతీయ గ్రామీణ ఉపాధి హామీ పథకం (MGNREGA)',
      description: 'గ్రామీణ ప్రాంతాల్లో శారీరక శ్రమతో కూడిన పని చేయడానికి సిద్ధంగా ఉన్న వయోజనులకు ప్రతి ఆర్థిక సంవత్సరంలో కనీసం 100 రోజుల పాటు కల్పించే చట్టబద్ధమైన ఉపాధి హామీ పథకం.',
      benefits: [
        'సంవత్సరానికి కనీసం 100 రోజుల పాటు ఖచ్చితమైన శారీరక ఉపాధి కల్పన.',
        'దరఖాస్తు చేసిన 15 రోజుల్లోగా పని చూపించని యెడల చట్ట ప్రకారం నిरुద్యోగ భృతి అందజేత.',
        'పురుషులకు, స్త్రీలకు సమాన వేతనం. నేరుగా బ్యాంక్ ద్వారా నిధుల జమ.'
      ],
      eligibilityDescription: 'గ్రామీణ ప్రాంతంలో నివసించే భారతీయ పౌరుడై ఉండాలి. శారీరక శ్రమ పనులు చేయడానికి సిద్ధంగా ఉండాలి. వయస్సు 18 సంవత్సరాలు నిండి ఉండాలి.',
      applicationProcess: [
        'నమోదు ప్రక్రియ కొరకు స్థానిక గ్రామ పంచాయతీ కార్యాలయంలో దరఖాస్తు చేయండి.',
        'దరఖాస్తు అందిన 15 రోజుల్లోగా కుటుంబ సభ్యుల వివరాలతో కూడిన ప్రత్యేక ఈ యునిక్ జాబ్ కార్డ్ పొందండి.',
        'పని కావాలని కోరుతూ గ్రామ పంచాయతీ కార్యాలయానికి ఒక సాధారణ రాతపూర్వక అభ్యర్థన సమర్పించండి.',
        'గ్రామ పంచాయతీ 5 కిలోమీటర్ల పరిధిలోనే పనిని కేటాయిస్తుంది.'
      ],
      requiredDocuments: [
        'ఆధార్ కార్డ్',
        'కుటుంబంలోని పెద్దల అందరి ఇటీవలి పాస్‌పోర్ట్ సైజు ఫోటోలు',
        'బ్యాంక్ ఖాతా వివరాలు',
        'గ్రామీణ ప్రాంత నివాస ధృవీకరణ పత్రం (రేషన్ కార్డు/ఓటరు గుర్తింపు కార్డు)'
      ],
      faqs: [
        {
          question: 'మహాత్మా గాంధీ ఉపాధి జాబ్ కార్డ్ ఎన్ని సంవత్సరాలు చెల్లుతుంది?',
          answer: 'జాబ్ కార్డ్ జారీ చేసిన నాటి నుండి 5 సంవత్సరాల పాటు చెల్లుతుంది. దీనిని స్థానిక పంచాయతీ కార్యాలయం ద్వారా పునరుద్ధరించుకోవచ్చు.'
        },
        {
          question: 'గ్రామ పంచాయతీ నిర్ణీత సమయంలో పని ఇవ్వలేకపోతే ఏమవుతుంది?',
          answer: 'దరఖాస్తు చేసిన 15 రోజుల్లోగా మీకు పని కల్పించలేకపోతే, చట్ట ప్రకారం మీరు దినసరి నిరుద్యోగ భృతి పొందే చట్టబద్ధమైన హక్కును కలిగి ఉన్నారు.'
        }
      ]
    },
    'women-sukanya-samriddhi': {
      name: 'సుకన్య సమృద్ధి యోజన (SSY)',
      description: 'ఆడపిల్లల ఉజ్వల భవిष्यత్ కోసం ‘బేటీ బచావో బేటీ పడావో’ ప్రచారంలో భాగంగా రూపొందించిన చిన్న మొత్తాల పొదుపు పథకం. అత్యధిక వడ్డీ రేటుతో పన్ను రహిత పెట్టుబడి ప్రయోజనాన్ని అందిస్తుంది.',
      benefits: [
        'చాలా ఎక్కువ వడ్డీ రేట్లు అందించే ప్రభుత్వ పథకం (ప్రస్తుతం 8.2%).',
        'సెక్షన్ 80C కింద మొత్తం పెట్టుబడి మరియు పొందే వడ్డీపై ఆదాయ పన్ను మినహాయింపు.',
        'కుమార్తె యొక్క విద్యా అవసరాలు మరియు వివాహ ఖర్చుల కొరకు దీర్ఘకాలిక ఆర్థిక రక్షణ.'
      ],
      eligibilityDescription: 'ఆడపిల్ల పుట్టినప్పటి నుండి 10 సంవత్సరాల వయస్సు లోపు తల్లిదండ్రులు లేదా చట్టబద్ధమైన సంరక్షకులు ఖాతా తెరవవచ్చు. ఒక కుటుంబంలో గరిష్టంగా ఇద్దరు పిల్లలకు వర్తిస్తుంది.',
      applicationProcess: [
        'సమీపంలోని పోస్టాఫీసు లేదా ప్రభుత్వ వాణిజ్య బ్యాంక్ బ్రాంచ్‌ను సందర్శించండి.',
        'సుకన్య సమృద్ధి ఖాతా తెరిచే దరఖాస్తు ఫారమ్‌ను సమర్పించండి.',
        'ఆడపిల్ల పుట్టిన తేదీ ధృవీకరణ పత్రం మరియు సంరక్షకుడి ఆధార్ సమర్పించండి.',
        'కనీస ప్రారంభ డిపాజిట్ రూ. 250 (సంవత్సరానికి గరిష్టంగా రూ. 1.5 లక్షలు) చెల్లించి ప్రారంభించండి.'
      ],
      requiredDocuments: [
        'ఆడపిల్ల యొక్క జనన ధృవీకరణ పత్రం (బర్త్ సర్టిఫికెట్)',
        'తల్లిదండ్రుల/సంరక్షకుల ఆధార్ కార్డ్ మరియు పాన్ కార్డ్',
        'చిరునామా ధృవీకరణ పత్రం (కరెంట్ బిల్లు లేదా రేషన్ కార్డు)',
        'సంరక్షకుడి ఫోటోలు'
      ],
      faqs: [
        {
          question: 'సుకన్య సమృద్ధి ఖాతా ఎప్పుడు మెచ్యూర్ అవుతుంది?',
          answer: 'ఖాతా తెరిచిన నాటి నుండి 21 సంవత్సరాల తర్వాత లేదా ఆడపిల్లకు 18 సంవత్సరాలు నిండిన తర్వాత వివాహ సమయంలో ఈ ఖాతా మెచ్యूर అవుతుంది.'
        },
        {
          question: 'ఉన్నత చదువుల కోసం మధ్యలో నగదు విత్‌డ్రా చేసుకోవచ్చా?',
          answer: 'అవును, ఆడపిల్లకు 10వ తరగతి లేదా 18 సంవత్సరాల వయస్సు నిండిన తర్వాత ఉన్నత విద్యా అవసరాల కొరకు ఖాతా మొత్తంలో 50% వరకు విత్‌డ్రా చేసుకోవచ్చు.'
        }
      ]
    },
    'health-ayushman-bharat': {
      name: 'ఆయుష్మాన్ భారత్ పీఎం-జేఏవై (PM-JAY) ఆరోగ్య కవరేజ్',
      description: 'ప్రపంచంలోనే అతి పెద్ద ప్రభుత్వ నిధులతో నడుస్తున్న ఆరోగ్య భీమా పథకం, ఇది ప్రతి కుటుంబానికి సంవత్సరానికి రూ. 5 లక్షల వరకు ఉచిత క్యాష్‌less వైద్య సదుపాయాన్ని అందిస్తుంది.',
      benefits: [
        'ప్రతి కుటుంబానికి సంవత్సరానికి రూ. 5,00,000 ఉచిత వైద్య భీమా కవరేజ్.',
        'గుర్తింపు పొందిన ప్రైవేట్ మరియు ప్రభుత్వ ఆసుపత్రులలో ఉచిత క్యాష్‌less పరీక్షలు మరియు చికిత్స.',
        'ఆసుపత్రిలో చేరడానికి ముందు 3 రోజులు మరియు డిశ్చార్జ్ అయిన తర్వాత 15 రోజుల పాటు మందులు, డయాగ్నొస్టిక్స్ ఖర్చులు లభిస్తాయి.'
      ],
      eligibilityDescription: 'దారిद्र్య రేఖకు దిగువున ఉన్న మరియు సామాజిక-ఆర్థిక సర్వే-2011 లో గుర్తింపు పొందిన గ్రామీణ/పట్టణ పేద కుటుంబాలు అర్హులు. వార్షిక ఆదాయం రూ. 1.2 లక్షల లోపు ఉండాలి.',
      applicationProcess: [
        'ఆయుష్మాన్ భారత్ పోర్టల్ ద్వారా మీ అర్హత తనిఖీ చేసుకోండి లేదా సమీప సేవా కేంద్రాన్ని అడగండి.',
        'నిర్ణీత ఆసుపత్రిలోని ‘ఆయుష్మాన్ మిత్ర’ డెస్క్‌ను సంప్రదించండి.',
        'ఐడీ కార్డు కోసం ఆధార్ కార్డ్ లేదా రేషన్ కార్డును స్కాన్ చేయించండి.',
        'వైద్యం పొందే సమయంలో ఉచిత చికిత్స కొరకు ఆయుష్మాన్ గోల్డెన్ కార్డు సమర్పించండి.'
      ],
      requiredDocuments: [
        'ఆధార్ కార్డ్ లేదా ఓటరు గుర్తింపు కార్డు',
        'కుటుంబ సభ్యుల పేర్లతో కూడిన రేషన్ కార్డు',
        'ఆదాయ ధృవీకరణ పత్రం (రూ. 1.2 లక్షల లోపు)',
        'SECC-2011 సర్వే గుర్తింపు పత్రం నకలు'
      ],
      faqs: [
        {
          question: 'ఆయుష్మాన్ భారత్‌లో పాత రోగాలకు చికిత్స లభిస్తుందా?',
          answer: 'అవును, మీకు కార్డు లభించిన మొదటి రోజు నుండి పాత ఆరోగ్య సమస్యలు మరియు దీర్ఘకాలిక సమస్యలన్నింటికీ చికిత్స లభిస్తుంది.'
        },
        {
          question: 'కుటుంబంలో కొత్తగా పుట్టిన శిశువును వెంటనే చేర్చుకోవచ్చా?',
          answer: 'అవును, కొత్తగా పుట్టిన పిల్లలకు ఎటువంటి ప్రత్యేక అప్‌డేట్ కోసం వేచి చూడకుండా పుట్టిన రోజు నుండే ఈ ఆరోగ్య హామీ వర్తిస్తుంది.'
        }
      ]
    },
    'house-pmay-g': {
      name: 'ప్రధాన మంత్రి ఆవాస్ యోజన గ్రామీణ (PMAY-G)',
      description: 'గ్రామీణ ప్రాంతాల్లో ఇళ్లు లేని పేద ప్రజలకు మరియు శిథిలావస్థలో ఉన్న ఇళ్లల్లో జీవిస్తున్న వారికి కనీసం 25 చదరపు మీటర్ల విస్తీర్ణం గల పక్కా ఇళ్లను నిర్మించి ఇచ్చే ఉచిత నివాస సౌకర్య పథకం.',
      benefits: [
        'మైదాన ప్రాంతాల లబ్ధిదారులకు రూ. 1,20,000 మరియు పర్వత ప్రాంతాల వారికి రూ. 1,30,000 ఆర్థిక సహాయం.',
        'ఉపాధి హామీ కింద ఇల్లు కట్టుకునేందుకు అదనంగా 90/95 రోజుల ఉపాధి కూలి అందజేత.',
        'స్వచ్ఛ భారత్ ద్వారా మరుగుదొడ్డి నిర్మించుకునేందుకు అదనంగా రూ. 12,000 అలవెన్స్.'
      ],
      eligibilityDescription: 'గ్రామీణ ప్రాంతాల్లో నివసిస్తూ మట్టి గోడలు మరియు కడప ఇళ్లతో కూడిన గుడిసెల్లో నివసించే పేద కుటుంబాలు అర్హులు. వాహనాలు మరియు ప్రభుత్వ ఉద్యోగం ఉన్నవారు అనర్హులు.',
      applicationProcess: [
        'గ్రామ సభ సామాజిక జనగణన ఆధారంగా అర్హుల వివరాలను సేకరించి ఎంపిక చేస్తుంది.',
        'పంచాయతీ రాజ్ విభాగం Beneficiaries జాబితాలను అవాస్‌సాఫ్ట్‌ పోర్టల్‌లో అప్‌లోड చేస్తుంది.',
        'నిర్మాణ స్థలాన్ని జియోట్యాగింగ్ చేసిన తరువాత మూడు విడతల్లో నిధులు నేరుగా లబ్ధిదారుని బ్యాంక్ ఖాతాకు బదిలీ అవుతాయి.'
      ],
      requiredDocuments: [
        'కుటుంబ సభ్యుల అందరి ఆధార్ కార్డ్ వివరాలు',
        'ఆధార్ అనుసంధానించబడిన బ్యాంక్ ఖాతా పాస్ బుక్',
        'ఉపాధి హామీ (MGNREGA) జాब్ కార్డ్ నంబర్',
        'సొంత పక్కా ఇల్లు లేదని నిరూపించే అఫिడవిట్'
      ],
      faqs: [
        {
          question: 'ప్రధాన మంత్రి ఇల్లు ఎవరు నిర్మించాలి?',
          answer: 'ఇంటి నిర్మాణాన్ని లబ్ధిదారులే స్వయంగా నిర్మించాలి. కాంట్రాక్టర్లకు పనులు అప్పగించడం చట్టరీత్యా నేరం.'
        }
      ]
    },
    'social-pension': {
      name: 'ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పెన్షన్ పథకం',
      description: 'దారిద్య్ర రేఖకు దిగువున ఉన్న గ్రామీణ మరియు పట్టణ పేద వృద్ధ పౌరులకు బతుకుదెరువు కొరకు నెలకు అందజేసే కేంద్ర పెన్షన్ ఆర్థిక సహాయం.',
      benefits: [
        '60 సంవత్సరాల నుండి 79 సంవత్సరాల వయస్సు రైతులకు/పేదలకు నెలకు రూ. 200 పెన్షన్.',
        '80 సంవత్సరాల పైబడిన అతి పెద్ద వృద్ధులకు పెన్షన్ మొత్తం నెలకు రూ. 500 కు పెంచబడుతుంది.',
        'నేరుగా బ్యాంక్ ఖాతాల్లోకి లేదా స్థానిక పోస్టాఫీసులో ప్రతి నెలా బదిలీ.'
      ],
      eligibilityDescription: 'పౌరుడికి 60 లేదా అంతకంటే ఎక్కువ సంవత్సరాలు నిండి ఉండాలి. దారిద్య్ర రేఖకు దిగువన (BBL/BPL) నివసిస్తున్న పేద కుటుంబాల గుర్తింపు రేషన్ కార్డు కలిగి ఉండాలి.',
      applicationProcess: [
        'స్థానిక ఎంపీడీవో (MPDO) కార్యాలయంలో దరఖాస్తు పత్రాన్ని ఉచితంగా తీసుకోండి.',
        'వయస్సు ధృవీకరణ పత్రం మరియు BPL రేషన్ కార్డు కాపీని జతపరచండి.',
        'దరఖాस्तीను గ్రామ పంచాయతీ లేదా స్థానిక సామాజిక అధికారికి సమర్పించండి.',
        'కల్యాణ అధికారి పరిశీలించిన అనంతరం ప్రతి నెలా పెన్షన్ మంజూరు ఆదేశాలు జారీ అవుతాయి.'
      ],
      requiredDocuments: [
        'ఆధార్ కార్ड',
        'వయస్సు ధృవీకరణ పత్రం (పుట్టిన తేదీ పత్రం లేదా ప్రభుత్వం నిర్దేశించిన వైద్యుని ధృవీకరణ పత్రం)',
        'చెల్లుబాటులో ఉన్న BPL రేషన్ కార్డ్',
        'బ్యాంక్ ఖాతా వివరాలు'
      ],
      faqs: [
        {
          question: 'రాష్ట్ర ప్రభుత్వ పెన్షన్ అదనపు సహాయం ఉందా?',
          answer: 'అవును, అనేక రాష్ట్రాలు కేంద్ర పెన్షన్ మొత్తానికి అదనంగా అదనపు మొత్తాన్ని (ఉదాహరణకు రూ. 1000 - రూ. 2500) జోడించి చెల్లిస్తున్నాయి.'
        }
      ]
    }
  }
};

// Takes original server loaded schemes and swaps content with translated info if available
export function getLocalizedSchemes(schemes: Scheme[], currentLanguage: 'English' | 'Hindi' | 'Telugu'): Scheme[] {
  if (currentLanguage === 'English') {
    return schemes;
  }

  const translations = SCHEMES_TRANSLATIONS[currentLanguage];
  if (!translations) {
    return schemes;
  }

  return schemes.map(scheme => {
    const matchedTranslation = translations[scheme.id];
    if (matchedTranslation) {
      return {
        ...scheme,
        name: matchedTranslation.name || scheme.name,
        description: matchedTranslation.description || scheme.description,
        benefits: matchedTranslation.benefits || scheme.benefits,
        eligibilityDescription: matchedTranslation.eligibilityDescription || scheme.eligibilityDescription,
        applicationProcess: matchedTranslation.applicationProcess || scheme.applicationProcess,
        requiredDocuments: matchedTranslation.requiredDocuments || scheme.requiredDocuments,
        faqs: matchedTranslation.faqs || scheme.faqs
      };
    }
    return scheme;
  });
}
