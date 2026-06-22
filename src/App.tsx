import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Check, AlertCircle, Sparkles, Send, FileText, BarChart2, MessageSquare, 
  Bell, Heart, Plus, Award, LogOut, CheckCircle2, X, Star, ArrowRight, BookOpen, 
  Volume2, ShieldCheck, HelpCircle, RefreshCw, SendHorizontal, LayoutGrid, CheckSquare, Dumbbell
} from 'lucide-react';
import { 
  UserProfile, Scheme, SchemeCategory, ChatMessage, SchemeFeedback, 
  SchemeNotification, EnrollmentRoadmap, VerificationResult
} from './types';
import { TRANSLATIONS, getLocalizedSchemes } from './translations';

// Supported interface tabs
type ActiveTab = 'dashboard' | 'navigator' | 'verifier' | 'chatbot' | 'feedback' | 'admin' | 'profile';

export default function App() {
  // Authentication & Profile States
  const [sessionUser, setSessionUser] = useState<UserProfile | null>(null);
  const [profileForm, setProfileForm] = useState<Partial<UserProfile>>({
    name: "Ravi Kumar",
    email: "ravi.kumar@gmail.com",
    age: 34,
    gender: 'Male',
    state: "Telangana",
    district: "Hyderabad",
    annualIncome: 180000,
    category: "OBC",
    education: "Graduate",
    occupation: "Farmer",
    isPhysicallyChallenged: false,
    isMinority: false,
    isWidowOrSingleMother: false
  });
  
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'authenticated'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupPassword, setSignupPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Primary Platform States
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory | 'All'>('All');
  const [roadmaps, setRoadmaps] = useState<EnrollmentRoadmap[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<EnrollmentRoadmap | null>(null);
  
  // Dynamic AI Recommendations from Gemini with cache / loading tracking
  const [aiRecs, setAiRecs] = useState<Record<string, { matchScore: number, recommendationReason: string, actionTip: string }>>({});
  const [loadingAiRecs, setLoadingAiRecs] = useState(false);

  // Document verification states
  const [selectedVerifySchemeId, setSelectedVerifySchemeId] = useState<string>('');
  const [verifyDocName, setVerifyDocName] = useState<string>('');
  const [verifyTextContent, setVerifyTextContent] = useState<string>('');
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Multilingual chat bot states
  const [currentLanguage, setCurrentLanguage] = useState<'English' | 'Hindi' | 'Telugu'>('English');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [voicedMessageId, setVoicedMessageId] = useState<string | null>(null);

  // Feedback, notifications & Admin states
  const [feedbacks, setFeedbacks] = useState<SchemeFeedback[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    schemeId: '',
    rating: 5,
    issueType: 'General Feedback' as any,
    comment: ''
  });
  const [notifications, setNotifications] = useState<SchemeNotification[]>([]);
  const [adminMetrics, setAdminMetrics] = useState<any>(null);
  const [simulateAlertForm, setSimulateAlertForm] = useState({
    title: 'Upcoming PM-KISAN Enrollment Deadline',
    message: 'All enrolled food producers are requested to seed their land registration details before the upcoming end-of-month review.',
    type: 'SMS' as 'SMS' | 'WhatsApp' | 'Deadline',
    sentTo: 'Registered Farmers'
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Offline physical checklist state
  const [offlineDocsStates, setOfflineDocsStates] = useState<Record<string, { enabled: boolean; step1: boolean; step2: boolean; step3: boolean; step4: boolean; step5: boolean }>>({});

  const t = (key: string): string => {
    return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['English']?.[key] || key;
  };

  // Auto scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Initial Fetching
  useEffect(() => {
    fetchSchemes();
    fetchNotifications();
    fetchFeedbacks();
    fetchAdminAnalytics();
    
    // Auto-login or register our default custom citizen Ravi Kumar first so the application loads instantly
    handleDemoSetup();
  }, []);

  // Fetch match details whenever user changes
  useEffect(() => {
    if (sessionUser) {
      fetchSchemes(sessionUser.email);
      fetchRoadmaps(sessionUser.id);
      fetchAiRecommendations(sessionUser);
    }
  }, [sessionUser]);

  const handleDemoSetup = async () => {
    try {
      // Seed Ravi Kumar into the in-memory database on mount as a background process,
      // but do NOT trigger sessionUser of the frontend, keeping the login page visible first!
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileForm,
          password: 'password123'
        })
      });
    } catch (e) {
      console.warn("Could not setup background demo citizen seed.", e);
    }
  };

  const fetchSchemes = async (email?: string) => {
    try {
      const url = email ? `/api/schemes?email=${encodeURIComponent(email)}` : '/api/schemes';
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSchemes(data);
        if (data.length > 0 && !selectedScheme) {
          setSelectedScheme(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      setAdminMetrics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoadmaps = async (userId: string) => {
    try {
      const res = await fetch(`/api/enrollment?userId=${userId}`);
      const data = await res.json();
      setRoadmaps(data);
      if (data.length > 0) {
        setActiveRoadmap(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAiRecommendations = async (user: UserProfile) => {
    setLoadingAiRecs(true);
    try {
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        const mapped: Record<string, any> = {};
        data.recommendations.forEach((item: any) => {
          mapped[item.schemeId || ''] = item;
        });
        setAiRecs(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAiRecs(false);
    }
  };

  // Auth Operations
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setSessionUser(data.user);
        setProfileForm(data.user);
        setAuthMode('authenticated');
        setSuccessMessage("Successfully logged back in!");
      } else {
        setErrorMessage(data.error || "Invalid username or password");
      }
    } catch (err) {
      setErrorMessage("Network error connecting to verification system.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profileForm,
          password: signupPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setSessionUser(data.user);
        setAuthMode('authenticated');
        setSuccessMessage("Citizen account initialized successfully!");
      } else {
        setErrorMessage(data.error || "Could not register details.");
      }
    } catch (err) {
      setErrorMessage("Network error.");
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser) return;
    setSuccessMessage('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sessionUser,
          ...profileForm
        })
      });
      const data = await res.json();
      if (data.success) {
        setSessionUser(data.user);
        setSuccessMessage("Socio-demographic profile updated. Recalculating AI eligibility...");
        fetchSchemes(data.user.email);
        fetchAiRecommendations(data.user);
        fetchAdminAnalytics();
      }
    } catch (err) {
      setErrorMessage("Failed to update profile statistics.");
    }
  };

  // Enrollment operations
  const initiateEnrollment = async (schemeId: string, name: string) => {
    if (!sessionUser) {
      setErrorMessage("Please login or update your demographic profile to enroll.");
      return;
    }
    try {
      const res = await fetch('/api/enrollment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId,
          userId: sessionUser.id,
          schemeName: name
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchRoadmaps(sessionUser.id);
        setSuccessMessage(`Initiated step-by-step roadmap for ${name}`);
        setActiveTab('dashboard'); // Redirect to dashboard to track it
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (schemeId: string, taskId: string, currentStatus: string) => {
    if (!sessionUser) return;
    const nextStatus = currentStatus === 'Completed' ? 'Pending' : currentStatus === 'Pending' ? 'In Progress' : 'Completed';
    try {
      const res = await fetch('/api/enrollment/update-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: sessionUser.id,
          schemeId,
          taskId,
          status: nextStatus
        })
      });
      if (res.ok) {
        fetchRoadmaps(sessionUser.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Document Verification AI
  const handleVerifyDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyDocName || (!verifyTextContent && !selectedVerifySchemeId)) {
      setErrorMessage("Please select a valid document class and submit information.");
      return;
    }
    setVerificationLoading(true);
    setVerificationResult(null);
    try {
      const activeObj = schemes.find(s => s.id === selectedVerifySchemeId);
      const res = await fetch('/api/ai/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: verifyDocName,
          documentText: verifyTextContent,
          mockDetails: activeObj ? `Citizen verification request for scheme "${activeObj.name}". Expected: ${activeObj.requiredDocuments.join(', ')}` : "Indian identity system"
        })
      });
      const data = await res.json();
      if (data.success) {
        setVerificationResult({
          docName: verifyDocName,
          ...data.result
        });

        // If enrolled in this scheme, update the roadmap status
        if (sessionUser && selectedVerifySchemeId) {
          await fetch('/api/enrollment/verify-doc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: sessionUser.id,
              schemeId: selectedVerifySchemeId,
              docName: verifyDocName,
              success: data.result.success,
              notes: data.result.notes,
              readinessScore: data.result.readinessScore
            })
          });
          fetchRoadmaps(sessionUser.id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerificationLoading(false);
    }
  };

  const selectMockTemplateForDoc = (doc: string) => {
    setVerifyDocName(doc);
    if (doc === 'Aadhaar Card') {
      setVerifyTextContent("UNIQUE IDENTIFICATION AUTHORITY OF INDIA\nGOVT OF INDIA\nNAME: Ravi Kumar\nDOB: 12/04/1992\nGENDER: Male\nAADHAAR NO: 4578 9012 3456\nADDRESS: H.No 5-4-101, Chikkadpally, Hyderabad, Telangana - 500020");
    } else if (doc.includes('Income')) {
      setVerifyTextContent("GOVERNMENT OF TELANGANA\nDEPARTMENT OF REVENUE\nINCOME CERTIFICATE\nCertificate No: IC-2026-908234\nCertified that Family Income of Ravi Kumar of Hyderabad district is Rs. 1,80,000 (One Lakh Eighty Thousand Only)\nValid until: 31/03/2027\nDigital Signature Valid: YES");
    } else if (doc.includes('Caste')) {
      setVerifyTextContent("OFFICE OF THE TAHSILDAR\nCOMMUNITY, NATIVITY AND DATE OF BIRTH CERTIFICATE\nThis is to certify that Ravi Kumar belongs to OBC class group category of state list.\nCaste: Yadav (Bc-D Group)\nIssued on: 14/02/2024");
    } else if (doc.includes('Land')) {
      setVerifyTextContent("RECORD OF RIGHTS (PATTADAR PASSBOOK)\nState of Telangana - Agricultural Land holding\nSurvey Number: 45/A\nExtent: 1.5 Acres\nOwner Name: Ravi Kumar");
    } else {
      setVerifyTextContent(`OFFICIAL CREDENTIAL\nApplicant Name: Ravi Kumar\nDeclaration: Verified and approved by local Gram Panchayat Social Welfare officer.\nDocument Identifier: PR-773-${Date.now().toString().slice(-4)}`);
    }
  };

  const handleMarkSubmittedOffline = async (schemeId: string, docName: string) => {
    if (!sessionUser) return;
    try {
      const receiptCode = `OFL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const res = await fetch('/api/enrollment/verify-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: sessionUser.id,
          schemeId,
          docName,
          success: true,
          notes: `Submitted offline (Manual Verification Acknowledged. Receipt Code: ${receiptCode})`,
          readinessScore: 100
        })
      });
      if (res.ok) {
        setSuccessMessage(`Document "${docName}" successfully registered as offline submission! Receipt: ${receiptCode}`);
        fetchRoadmaps(sessionUser.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Multilingual Chatbot Agent
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      language: currentLanguage
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          userProfile: sessionUser,
          currentLanguage: currentLanguage
        })
      });
      const data = await response.json();
      if (data.success) {
        const botMsg: ChatMessage = {
          id: `chat-${Date.now() + 1}`,
          sender: 'bot',
          text: data.text,
          language: data.language,
          voice: data.voice
        };
        setChatMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleVoiceSimulate = (msgId: string, text: string) => {
    // Simulated Speech synthesis browser-safe
    if (voicedMessageId === msgId) {
      setVoicedMessageId(null);
      window.speechSynthesis.cancel();
      return;
    }
    
    setVoicedMessageId(msgId);
    const audioSynth = new SpeechSynthesisUtterance(text);
    // Attempt appropriate locale voices
    if (currentLanguage === 'Hindi') {
      audioSynth.lang = 'hi-IN';
    } else if (currentLanguage === 'Telugu') {
      audioSynth.lang = 'te-IN';
    } else {
      audioSynth.lang = 'en-IN';
    }
    
    audioSynth.onend = () => {
      setVoicedMessageId(null);
    };
    audioSynth.onerror = () => {
      setVoicedMessageId(null);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(audioSynth);
  };

  // Feedback Submission
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.comment.trim()) return;
    try {
      const activeObj = schemes.find(s => s.id === newFeedback.schemeId) || selectedScheme;
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: activeObj?.id,
          schemeName: activeObj?.name,
          userName: sessionUser?.name || 'Citizen User',
          rating: newFeedback.rating,
          issueType: newFeedback.issueType,
          comment: newFeedback.comment
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewFeedback({ schemeId: '', rating: 5, issueType: 'General Feedback', comment: '' });
        fetchFeedbacks();
        fetchAdminAnalytics();
        setSuccessMessage("Thank you! Feedback logged securely for service improvement reports.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Broadcast Alert Simulated by admin or officer (Smart notifications)
  const handleBroadCastAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: simulateAlertForm.title,
          message: simulateAlertForm.message,
          type: simulateAlertForm.type,
          sentTo: simulateAlertForm.sentTo
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchNotifications();
        setSuccessMessage(`Successfully broadcasted simulated ${simulateAlertForm.type} alert notification!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Localized schemes list depending on selected language
  const localizedSchemesList = getLocalizedSchemes(schemes, currentLanguage);

  // Localized currently-selected scheme detail object
  const localizedSelectedScheme = selectedScheme 
    ? localizedSchemesList.find(s => s.id === selectedScheme.id) || selectedScheme 
    : null;

  // Filter schemes based on category
  const filteredSchemes = selectedCategory === 'All' 
    ? localizedSchemesList 
    : localizedSchemesList.filter(s => s.category === selectedCategory);

  // Quick categories metadata list
  const categoryMetas = [
    { title: 'Education', icon: '🎓', color: 'bg-blue-50 text-blue-700 border-blue-100', cat: 'Education' as const },
    { title: 'Agriculture', icon: '🚜', color: 'bg-green-50 text-green-700 border-green-100', cat: 'Agriculture' as const },
    { title: 'Women Welfare', icon: '🚺', color: 'bg-pink-50 text-pink-700 border-pink-100', cat: 'Women Welfare' as const },
    { title: 'Employment', icon: '💼', color: 'bg-yellow-50 text-yellow-700 border-yellow-10 border-yellow-200', cat: 'Employment' as const },
    { title: 'Health', icon: '⚕️', color: 'bg-red-50 text-red-700 border-red-10 border-red-100', cat: 'Health' as const },
    { title: 'Social Welfare', icon: '🤝', color: 'bg-purple-50 text-purple-700 border-purple-100', cat: 'Social Welfare' as const },
  ];

  if (!sessionUser || authMode !== 'authenticated') {
    return (
      <div id="auth-root-container" className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient glowing radial light effects in background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Floating Language Selector */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold px-2 uppercase tracking-widest flex items-center gap-1">
            🌐 Interface:
          </span>
          <button 
            onClick={() => {
              setCurrentLanguage('English');
              setSuccessMessage("Interface configured to English support.");
              setErrorMessage("");
            }}
            className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
              currentLanguage === 'English' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button 
            onClick={() => {
              setCurrentLanguage('Hindi');
              setSuccessMessage("इंटरफ़ेस को हिंदी सहायता में बदला गया।");
              setErrorMessage("");
            }}
            className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
              currentLanguage === 'Hindi' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HI
          </button>
          <button 
            onClick={() => {
              setCurrentLanguage('Telugu');
              setSuccessMessage("ఇంటర్ఫేస్ తెలుగు సహాయానికి మార్చబడింది.");
              setErrorMessage("");
            }}
            className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
              currentLanguage === 'Telugu' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            TE
          </button>
        </div>

        {/* Central Auth Container */}
        <div className="w-full max-w-4xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-2xl relative z-10 flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Left panel - Branding illustration */}
          <div className="w-full md:w-5/12 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 p-6 rounded-2xl border border-slate-800/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Logo details */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
                  <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-[1px]" />
                  </div>
                </div>
                <div>
                  <span className="text-white font-black text-lg tracking-tight block">
                    {t('logoTitle')}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">
                    {t('logoSubtitle')}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-bold">Smart Demographics Matching</strong>
                    <span className="text-slate-450 text-slate-400 text-[11px] leading-relaxed block mt-0.5">Verifies matching schemes with up to 99% accuracy across standard records.</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-bold">Varta Multi-AI Bot</strong>
                    <span className="text-slate-450 text-slate-400 text-[11px] leading-relaxed block mt-0.5">Generative conversational assistant ready to answer questions in English, Telugu & Hindi.</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center font-bold">✓</span>
                  <div>
                    <strong className="text-white block font-bold">Direct Benefit Transfer Integration</strong>
                    <span className="text-slate-450 text-slate-400 text-[11px] leading-relaxed block mt-0.5">Simulates direct bank benefits matching upon profile status changes.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Status bar */}
            <div className="pt-8 border-t border-slate-800/80">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Secure National Portal</span>
              </div>
              <p className="text-[10px] text-slate-500 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 font-mono">
                PORT 3000 • India National System Registry
              </p>
            </div>
          </div>

          {/* Right panel - Forms Container */}
          <div className="flex-1 flex flex-col justify-center">
            
            {/* Form Mode Tabs Selector */}
            <div className="flex bg-slate-950 p-1 rounded-2xl mb-6 border border-slate-800">
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${
                  authMode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🔐 {t('signInTab')}
              </button>
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${
                  authMode === 'signup' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📝 {t('signUpTab')}
              </button>
            </div>

            {/* Alerts displaying system warning or successes */}
            {errorMessage && (
              <div className="mb-4 bg-red-950/30 border border-red-900/50 p-3 rounded-xl flex items-center gap-3 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-450" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 bg-emerald-950/30 border border-emerald-950/50 p-3 rounded-xl flex items-center gap-3 text-emerald-250 text-xs text-emerald-200">
                <Check className="w-4 h-4 shrink-0 text-emerald-450" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* SIGN IN VIEW */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    {t('loginEmailLabel')}
                  </label>
                  <input 
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. ravi.kumar@gmail.com"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-650 rounded-xl text-xs text-white focus:outline-none transition-all font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    {t('loginPasswordLabel')}
                  </label>
                  <input 
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-650 rounded-xl text-xs text-white focus:outline-none transition-all font-medium"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-950/30"
                >
                  🚀 {t('loginBtn')}
                </button>

                {/* Quick demo entrance */}
                <div className="pt-5 border-t border-slate-800/80 flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">
                    ✨ {t('quickDemoLogin')}
                  </span>
                  <button 
                    type="button"
                    onClick={async () => {
                      setLoginEmail('ravi.kumar@gmail.com');
                      setLoginPassword('password123');
                      setErrorMessage('');
                      setSuccessMessage('');
                      // Automatically fetch user & login
                      try {
                        const res = await fetch('/api/auth/login', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: 'ravi.kumar@gmail.com', password: 'password123' })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setSessionUser(data.user);
                          setProfileForm(data.user);
                          setAuthMode('authenticated');
                          setSuccessMessage("Successfully logged in as Ravi Kumar!");
                        } else {
                          // Try creating first if missing, then log in
                          const signupRes = await fetch('/api/auth/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: "Ravi Kumar",
                              email: "ravi.kumar@gmail.com",
                              age: 34,
                              gender: 'Male',
                              state: "Telangana",
                              district: "Hyderabad",
                              annualIncome: 180000,
                              category: "OBC",
                              education: "Graduate",
                              occupation: "Farmer",
                              isPhysicallyChallenged: false,
                              isMinority: false,
                              isWidowOrSingleMother: false,
                              password: 'password123'
                            })
                          });
                          const signupData = await signupRes.json();
                          if (signupData.success) {
                            setSessionUser(signupData.user);
                            setProfileForm(signupData.user);
                            setAuthMode('authenticated');
                            setSuccessMessage("Citizen account initialized successfully!");
                          }
                        }
                      } catch (err) {
                        setErrorMessage("Demo setup connection issue. Try creating custom profile.");
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                  >
                    <span>👤 Ravi Kumar (Demo Citizen)</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md font-mono">Auto Login</span>
                  </button>
                </div>
              </form>
            )}

            {/* SIGN UP VIEW - Complete Onboarding Profile setup */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Form introduction */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                  Configure custom demographics options below. GovIntel AI compares this configuration with active welfare rules dynamically to establish target matching index metrics.
                </div>

                {/* Primary Credentials */}
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Citizen Name</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                    <input 
                      type="email"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Choose Password</label>
                    <input 
                      type="password"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Gender</label>
                    <select 
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value as any }))}
                    >
                      <option value="Male" className="bg-slate-900">Male</option>
                      <option value="Female" className="bg-slate-900">Female</option>
                      <option value="Transgender" className="bg-slate-900">Transgender</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
                </div>

                {/* Demographics Parameters */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Age (Years)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, age: Number(e.target.value) }))}
                      min={1}
                      max={120}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Social Caste</label>
                    <select 
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.category}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, category: e.target.value as any }))}
                    >
                      <option value="General" className="bg-slate-900">General</option>
                      <option value="OBC" className="bg-slate-900">OBC (Other Backwards)</option>
                      <option value="SC" className="bg-slate-900">SC (Scheduled Caste)</option>
                      <option value="ST" className="bg-slate-900">ST (Scheduled Tribe)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Annual Income (₹)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.annualIncome}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, annualIncome: Number(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                {/* Sub Jurisdiction States and Area */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Jurisdiction State</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.state}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, state: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">District Area</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.district}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, district: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Education and Occupation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Education level</label>
                    <select 
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.education}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, education: e.target.value as any }))}
                    >
                      <option value="Illiterate" className="bg-slate-900">Illiterate</option>
                      <option value="Primary" className="bg-slate-900">Primary (till class 5)</option>
                      <option value="High School" className="bg-slate-900">High School (till class 10)</option>
                      <option value="Graduate" className="bg-slate-900">Graduate (Degree)</option>
                      <option value="Post Graduate" className="bg-slate-900">Post Graduate</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Occupation Profession</label>
                    <select 
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-600"
                      value={profileForm.occupation}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, occupation: e.target.value as any }))}
                    >
                      <option value="Farmer" className="bg-slate-900">Farmer / Agriculturalist</option>
                      <option value="Student" className="bg-slate-900">Student</option>
                      <option value="Unemployed" className="bg-slate-900">Unemployed</option>
                      <option value="Salaried" className="bg-slate-900">Salaried (Govt/Private Sector)</option>
                      <option value="Self-employed" className="bg-slate-900">Self-employed Business owner</option>
                      <option value="Artisan" className="bg-slate-900">Local Artisan / Handicrafts</option>
                    </select>
                  </div>
                </div>

                {/* Yes/No priority checkmarks */}
                <div className="space-y-2 bg-slate-950 p-3 border border-slate-800">
                  <p className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-wider mb-1.5 font-sans">Priority Socio-Demographics statuses</p>
                  
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={profileForm.isPhysicallyChallenged}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, isPhysicallyChallenged: e.target.checked }))}
                      className="rounded border-slate-800 text-indigo-600 bg-slate-950 focus:ring-indigo-500 w-4.5 h-4.5"
                    />
                    <span>Physically Challenged (Divyangjan Disability class)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={profileForm.isMinority}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, isMinority: e.target.checked }))}
                      className="rounded border-slate-800 text-indigo-600 bg-slate-950 focus:ring-indigo-500 w-4.5 h-4.5"
                    />
                    <span>Belong to official Minority Community (Buddhist, Muslim, Parsi etc)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={profileForm.isWidowOrSingleMother}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, isWidowOrSingleMother: e.target.checked }))}
                      className="rounded border-slate-800 text-indigo-600 bg-slate-950 focus:ring-indigo-500 w-4.5 h-4.5"
                    />
                    <span>Widow or Single Mother priority class</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    📝 {t('signupBtn')}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* SIDEBAR NAVIGATION - Rich Slate Styled */}
      <aside id="sidebar-nav" className="w-72 bg-slate-900 flex flex-col shrink-0 text-slate-300">
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
                <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-indigo-600 rounded-[1px]" />
                </div>
              </div>
              <div>
                <span className="text-white font-black text-base tracking-tight block">{t('logoTitle')}</span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest -mt-1 block">{t('logoSubtitle')}</span>
              </div>
            </div>

            {/* Quick stats on active user */}
            {sessionUser && (
              <div className="bg-slate-800/60 rounded-2xl p-4 mb-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold">
                    {sessionUser.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{sessionUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{sessionUser.occupation} • {sessionUser.category}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                  <span>Income: <b className="text-white">₹{sessionUser.annualIncome.toLocaleString('en-IN')}</b></span>
                  <span>Age: <b className="text-white">{sessionUser.age} y/o</b></span>
                </div>
              </div>
            )}

            {/* Navigation Menus */}
            <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{t('mainNav')}</h4>
            <nav className="space-y-1">
              <button 
                id="nav-dash"
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>{t('navDash')}</span>
              </button>

              <button 
                id="nav-navigator"
                onClick={() => setActiveTab('navigator')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'navigator' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('navNavigator')}</span>
              </button>

              <button 
                id="nav-verifier"
                onClick={() => setActiveTab('verifier')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'verifier' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('navVerifier')}</span>
              </button>

              <button 
                id="nav-chatbot"
                onClick={() => {
                  setActiveTab('chatbot');
                  // Seed initial message if chat is empty
                  if (chatMessages.length === 0) {
                    setChatMessages([
                      { id: '1', sender: 'bot', text: t('chatBotGreet'), language: currentLanguage }
                    ]);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'chatbot' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('navChatbot')}</span>
              </button>

              <button 
                id="nav-feedback"
                onClick={() => setActiveTab('feedback')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'feedback' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>{t('navFeedback')}</span>
              </button>

              <button 
                id="nav-admin"
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>{t('navAdmin')}</span>
              </button>
            </nav>

            {/* Custom controls / Profile edit */}
            <h4 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-6 mb-2">{t('socioStatus')}</h4>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'profile' 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t('navConfigureProfile')}</span>
              </button>
            </div>
          </div>

          {/* Bottom logout / current info */}
          <div className="border-t border-slate-800 pt-4 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400">{t('gatewayActive')}</span>
              </div>
              <span className="bg-slate-800 text-[9px] text-slate-300 px-2 py-0.5 rounded font-mono">PORT 3000</span>
            </div>
            
            {sessionUser ? (
              <div className="flex items-center justify-between bg-slate-800/40 p-3 rounded-xl">
                <div className="overflow-hidden">
                  <p className="text-[11px] text-slate-400 truncate">{t('loggedInAs')}:</p>
                  <p className="text-[11px] text-white font-bold truncate">{sessionUser.email}</p>
                </div>
                <button 
                  onClick={() => {
                    setSessionUser(null);
                    setAuthMode('login');
                    setActiveTab('profile');
                  }} 
                  title="Logout"
                  className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  setActiveTab('profile');
                }}
                className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all text-center block"
              >
                Connect account
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN MAIN AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{activeTab === 'dashboard' && t('headerDash')}</span>
              <span>{activeTab === 'navigator' && t('headerNavigator')}</span>
              <span>{activeTab === 'verifier' && t('headerVerifier')}</span>
              <span>{activeTab === 'chatbot' && t('headerChatbot')}</span>
              <span>{activeTab === 'feedback' && t('headerFeedback')}</span>
              <span>{activeTab === 'admin' && t('headerAdmin')}</span>
              <span>{activeTab === 'profile' && t('headerProfile')}</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                {t('dbtReady')}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">
                {t('activeYear')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Multi-language Selector widget */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => {
                  setCurrentLanguage('English');
                  setSuccessMessage("Interface configured to English support.");
                }}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-lg transition-all ${
                  currentLanguage === 'English' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => {
                  setCurrentLanguage('Hindi');
                  setSuccessMessage("इंटरफ़ेस को हिंदी सहायता में बदला गया।");
                }}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-lg transition-all ${
                  currentLanguage === 'Hindi' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी (HI)
              </button>
              <button 
                onClick={() => {
                  setCurrentLanguage('Telugu');
                  setSuccessMessage("ఇంటర్ఫేస్ తెలుగు సహాయానికి మార్చబడింది.");
                }}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-lg transition-all ${
                  currentLanguage === 'Telugu' 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు (TE)
              </button>
            </div>

            <div className="w-px h-6 bg-slate-200" />

            {/* Smart Alerts Count with Mini-popup toggler */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-sm">🔔</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white border-2 border-white rounded-full flex items-center justify-center text-[9px] font-extrabold">
                    {notifications.length}
                  </span>
                )}
              </div>
              
              {/* Notifications Hover Dropdown Panel */}
              <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 hidden group-hover:block z-50">
                <div className="flex justify-between items-center mb-3 pb-2 border-b">
                  <h5 className="font-extrabold text-xs text-slate-800 flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Real-time Broadcasts</span>
                  </h5>
                  <span className="text-[10px] text-slate-400 font-mono">2026 Live Updates</span>
                </div>
                <div className="space-y-3.5 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 text-xs">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-bold text-slate-950 block">{n.title}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${
                          n.type === 'Deadline' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'
                        }`}>{n.type}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed mb-1">{n.message}</p>
                      {n.deadline && (
                        <p className="text-[10px] text-red-600 font-extrabold">⚠️ Limit Date: {n.deadline}</p>
                      )}
                      <span className="text-[9px] text-slate-400 block pt-1">{new Date(n.sentAt).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MESSAGES SYSTEM ALERT DISPLAY */}
        {(successMessage || errorMessage) && (
          <div className="px-8 pt-4">
            {successMessage && (
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-2xl flex items-center justify-between text-xs font-bold animate-fade-in">
                <span className="flex items-center gap-2.5">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                  <span>{successMessage}</span>
                </span>
                <button onClick={() => setSuccessMessage('')} className="text-indigo-400 hover:text-indigo-900 cursor-pointer text-lg">×</button>
              </div>
            )}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-2.5">
                  <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </span>
                <button onClick={() => setErrorMessage('')} className="text-red-400 hover:text-red-950 cursor-pointer text-lg">×</button>
              </div>
            )}
          </div>
        )}

        {/* MAIN BODY SCENE CONTEXT */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* VIEW: DASHBOARD HUD (Bento Grid Theme) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* BENTO GRID ROW 1 - Stats Overview Banner Cards */}
              <div className="grid grid-cols-12 gap-5">
                
                {/* Dashboard Intro Hero Card */}
                <div className="col-span-12 md:col-span-5 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 font-bold text-9xl pointer-events-none select-none">AI</div>
                  <div>
                    <span className="px-2.5 py-0.5 bg-indigo-500/30 text-indigo-200 text-[10px] font-bold rounded-full uppercase tracking-wider block w-max mb-3">
                      Citizen Hub Entry
                    </span>
                    <h2 className="text-2xl font-black mb-2 leading-tight">Welcome to Government Intelligence</h2>
                    <p className="text-xs text-indigo-200 leading-relaxed max-w-sm mb-4">
                      Real-time demographics validation and AI match score processing. Modify your status below to recalculate system rewards.
                    </p>
                  </div>
                  <div>
                    <button 
                      onClick={() => setActiveTab('navigator')}
                      className="px-5 py-2.5 bg-white text-indigo-950 hover:bg-slate-100 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Explore {schemes.length} Active Schemes</span>
                      <ArrowRight className="w-4 h-4 text-indigo-900" />
                    </button>
                  </div>
                </div>

                {/* AI Document Verification Score Card */}
                <div className="col-span-12 md:col-span-4 bg-emerald-600 text-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center relative">
                  <div className="w-20 h-20 border-4 border-emerald-400 border-t-white rounded-full flex items-center justify-center text-2xl font-black mb-3">
                    85%
                  </div>
                  <h4 className="font-black text-sm mb-1 uppercase tracking-wider">Document Readiness Score</h4>
                  <p className="text-[11px] text-emerald-100 opacity-90 px-3 max-w-xs">
                    Your baseline details (Aadhaar & Income Certificate) are currently scanned and calculated as match-ready!
                  </p>
                  <button 
                    onClick={() => setActiveTab('verifier')}
                    className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-[11px] font-bold border border-emerald-400 cursor-pointer"
                  >
                    Launch Smart verification
                  </button>
                </div>

                {/* Mini Admin Insights Stats Box */}
                <div className="col-span-12 md:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Live Statistics</h3>
                    <p className="text-xl font-black text-slate-900">Mewat District Rank</p>
                  </div>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-indigo-600">#04</span>
                    <span className="text-[11px] text-green-600 font-bold">▲ Improved (+12%)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Rank is generated continuously based on regional Direct Benefit Transfer success percentages.
                  </p>
                </div>
              </div>

              {/* BENTO GRID ROW 2 - Core App Area */}
              <div className="grid grid-cols-12 gap-5">
                
                {/* AI Recommendation Engine Card */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col shadow-sm">
                  <div className="flex justify-between items-start mb-5 pb-4 border-b">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MODULE 5: MATCH ENGINE</span>
                      <h3 className="text-xl font-black text-slate-900">Personalized Scheme Recommendations</h3>
                    </div>
                    <div className="text-right">
                      {loadingAiRecs ? (
                        <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>AI evaluating...</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-2xl font-black text-indigo-600">92%</p>
                          <p className="text-[9px] font-bold text-slate-400">Avg eligibility accuracy</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Schemes with Match Score badges and reasons */}
                  <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                    {filteredSchemes.map((scheme) => {
                      const aiMatch = aiRecs[scheme.id];
                      const score = aiMatch ? aiMatch.matchScore : (scheme.matchScore || 0);
                      const reasons = aiMatch ? [aiMatch.recommendationReason] : (scheme.matchReasons || []);
                      const tip = aiMatch?.actionTip;

                      return (
                        <div key={scheme.id} className={`p-4 border rounded-2xl flex flex-col justify-between transition-all ${
                          score >= 80 
                            ? 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50' 
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        }`}>
                          <div className="flex justify-between items-start gap-3 mb-2.5">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl pt-0.5">
                                {scheme.category === 'Education' && '🎓'}
                                {scheme.category === 'Agriculture' && '🚜'}
                                {scheme.category === 'Women Welfare' && '🚺'}
                                {scheme.category === 'Employment' && '💼'}
                                {scheme.category === 'Health' && '⚕️'}
                                {scheme.category === 'Housing' && '🏠'}
                                {scheme.category === 'Social Welfare' && '🤝'}
                              </span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-900">{scheme.name}</h4>
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                                  Category: {scheme.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right shrink-0">
                              <span className={`px-2.5 py-1 text-xs font-black rounded-lg ${
                                score >= 80 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {score}% Match
                              </span>
                            </div>
                          </div>

                          <div className="text-xs text-slate-600 pl-9 space-y-1">
                            <p className="leading-relaxed mb-2">{scheme.description}</p>
                            
                            {/* Validation Reasons */}
                            <div className="bg-white/70 p-2.5 border border-slate-100 rounded-xl space-y-1">
                              <span className="text-[10px] font-bold text-indigo-950 block">AI Validation Logs:</span>
                              {reasons.map((reason, index) => (
                                <p key={index} className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 leading-relaxed">
                                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span>{reason}</span>
                                </p>
                              ))}
                              {tip && (
                                <p className="text-[10px] text-indigo-600 font-extrabold mt-1">
                                  💡 AI Recommended Next Action: {tip}
                                </p>
                              )}
                            </div>

                            {/* Actions buttons */}
                            <div className="flex gap-2 pt-2.5">
                              <button 
                                onClick={() => initiateEnrollment(scheme.id, scheme.name)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black cursor-pointer shadow-sm"
                              >
                                Initiate Process Roadmap
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedScheme(scheme);
                                  setActiveTab('navigator');
                                }}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-bold cursor-pointer"
                              >
                                Review Scheme Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Categories Quick Access & Current Progress Card */}
                <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-slate-400" />
                      <span>Scheme Categories</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {categoryMetas.map((catMeta) => (
                        <div 
                          key={catMeta.title} 
                          onClick={() => {
                            setSelectedCategory(catMeta.cat);
                            setActiveTab('navigator');
                          }}
                          className={`p-3.5 border rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:scale-[1.02] transition-all ${catMeta.color}`}
                        >
                          <span className="text-2xl mb-1.5">{catMeta.icon}</span>
                          <span className="text-[11px] font-black leading-snug">{catMeta.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Roadmaps Trackers */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 block">
                      Enrollment Progress Tracker
                    </h4>
                    
                    {roadmaps.length > 0 ? (
                      <div className="space-y-4">
                        {roadmaps.slice(0, 2).map((rm) => (
                          <div key={rm.id} className="p-3 bg-slate-900 text-white rounded-2xl">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[10px] font-extrabold truncate w-[70%]">{rm.schemeName}</span>
                              <span className="text-[10px] bg-indigo-500 px-1.5 py-0.5 rounded font-black">{rm.progress}%</span>
                            </div>
                            
                            <div className="h-1.5 bg-slate-800 rounded-full mb-2">
                              <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${rm.progress}%` }} />
                            </div>
                            
                            {/* Next pending task */}
                            {rm.tasks.find(t => t.status !== 'Completed') ? (
                              <p className="text-[9px] text-slate-300 font-semibold truncate">
                                Next: {rm.tasks.find(t => t.status !== 'Completed')?.title}
                              </p>
                            ) : (
                              <p className="text-[9px] text-emerald-400 font-extrabold">
                                ✓ Fully Ready! Ready to receive DBT credits.
                              </p>
                            )}

                            {/* View steps */}
                            <button 
                              onClick={() => {
                                setActiveRoadmap(rm);
                                setActiveTab('dashboard'); // Keeps on dashboard, scrolling down to tracking area
                              }}
                              className="text-[9px] text-indigo-300 font-extrabold hover:underline mt-1 pt-1.5 border-t border-slate-800 block w-full text-left"
                            >
                              Expand tasks checklist ➔
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-500 mb-2">No active enrollments initiated yet.</p>
                        <button 
                          onClick={() => setActiveTab('navigator')}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold"
                        >
                          Select Scheme To Enroll
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ROADMAP ROADMAP SECTION IN DASHBOARD */}
              {activeRoadmap && (
                <div id="active-roadmap-section" className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
                  <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest block mb-1">
                        MODULE 11: ROADMAP CHECKLIST
                      </span>
                      <h3 className="text-xl font-black text-white">Enrollment Roadmap: {activeRoadmap.schemeName}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-indigo-400">{activeRoadmap.progress}%</p>
                      <p className="text-[9px] text-slate-400 font-bold">Overall Progress Percentage</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    {/* Step-by-Step interactive guide */}
                    <div className="col-span-12 md:col-span-7 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Interactive tasks checklist</h4>
                      {activeRoadmap.tasks.map((task, index) => (
                        <div 
                          key={task.id} 
                          onClick={() => handleToggleTask(activeRoadmap.schemeId, task.id, task.status)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                            task.status === 'Completed' 
                              ? 'bg-indigo-800/20 border-indigo-500/50 text-white' 
                              : task.status === 'In Progress' 
                              ? 'bg-slate-800 border-yellow-500/50 text-white'
                              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-5 h-5 bg-slate-700 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-xs font-extrabold text-white">{task.title}</p>
                              <p className="text-[10px] text-slate-400 leading-normal">{task.description}</p>
                            </div>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            task.status === 'Completed' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Associated documents uploaded checklist */}
                    <div className="col-span-12 md:col-span-5 bg-slate-800/40 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">{t('requiredDocsChecklist')}</h4>
                        <div className="space-y-3">
                          {activeRoadmap.uploadedDocuments.map((doc, i) => {
                            const docKey = `${activeRoadmap.schemeId}-${doc.docName}`;
                            const offlineState = offlineDocsStates[docKey] || {
                              enabled: false,
                              step1: false,
                              step2: false,
                              step3: false,
                              step4: false,
                              step5: false
                            };
                            
                            return (
                              <div key={i} className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/50 space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="truncate pr-2 font-black text-slate-200">{doc.docName}</span>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {doc.verified ? (
                                      <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider">
                                        ✓ Verified
                                      </span>
                                    ) : (
                                      <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[8px] font-bold uppercase">
                                        Pending Action
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {doc.verified && doc.verificationNotes && (
  <p>
    {doc.verificationNotes}
  </p>
)}

                                {/* If not verified, offer both AI check and Offline Submissions options */}
                                {!doc.verified && (
                                  <div className="pt-1.5 space-y-2">
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => {
                                          setSelectedVerifySchemeId(activeRoadmap.schemeId);
                                          selectMockTemplateForDoc(doc.docName);
                                          setActiveTab('verifier');
                                        }}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer text-center"
                                      >
                                        🚀 {t('verifyByAIBtn')}
                                      </button>
                                      
                                      <button 
                                        onClick={() => {
                                          setOfflineDocsStates(prev => ({
                                            ...prev,
                                            [docKey]: {
                                              ...offlineState,
                                              enabled: !offlineState.enabled
                                            }
                                          }));
                                        }}
                                        className={`flex-1 py-1.5 rounded-xl text-[10px] font-black transition-all cursor-pointer text-center border ${
                                          offlineState.enabled 
                                            ? 'bg-amber-600 border-amber-500 text-white hover:bg-amber-500' 
                                            : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                                        }`}
                                      >
                                        📂 {offlineState.enabled ? t('digitalVerificationRestore') : t('enableOfflineSubToggle')}
                                      </button>
                                    </div>

                                    {/* Physical submission requirement checklist */}
                                    {offlineState.enabled && (
                                      <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-600/30 space-y-2.5 transition-all">
                                        <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wide">
                                          📋 {t('offlineChecklistHeader')}
                                        </p>
                                        
                                        <div className="space-y-2">
                                          {/* Step 1 */}
                                          <label className="flex items-start gap-2 cursor-pointer select-none">
                                            <input 
                                              type="checkbox" 
                                              checked={offlineState.step1} 
                                              onChange={() => setOfflineDocsStates(prev => ({
                                                ...prev,
                                                [docKey]: { ...offlineState, step1: !offlineState.step1 }
                                              }))}
                                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <span className="text-[10px] text-slate-300 leading-normal font-medium">{t('offlineStep1')}</span>
                                          </label>

                                          {/* Step 2 */}
                                          <label className="flex items-start gap-2 cursor-pointer select-none">
                                            <input 
                                              type="checkbox" 
                                              checked={offlineState.step2} 
                                              onChange={() => setOfflineDocsStates(prev => ({
                                                ...prev,
                                                [docKey]: { ...offlineState, step2: !offlineState.step2 }
                                              }))}
                                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <span className="text-[10px] text-slate-300 leading-normal font-medium">{t('offlineStep2')}</span>
                                          </label>

                                          {/* Step 3 */}
                                          <label className="flex items-start gap-2 cursor-pointer select-none">
                                            <input 
                                              type="checkbox" 
                                              checked={offlineState.step3} 
                                              onChange={() => setOfflineDocsStates(prev => ({
                                                ...prev,
                                                [docKey]: { ...offlineState, step3: !offlineState.step3 }
                                              }))}
                                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <span className="text-[10px] text-slate-300 leading-normal font-medium">{t('offlineStep3')}</span>
                                          </label>

                                          {/* Step 4 */}
                                          <label className="flex items-start gap-2 cursor-pointer select-none">
                                            <input 
                                              type="checkbox" 
                                              checked={offlineState.step4} 
                                              onChange={() => setOfflineDocsStates(prev => ({
                                                ...prev,
                                                [docKey]: { ...offlineState, step4: !offlineState.step4 }
                                              }))}
                                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <span className="text-[10px] text-slate-300 leading-normal font-medium">{t('offlineStep4')}</span>
                                          </label>

                                          {/* Step 5 */}
                                          <label className="flex items-start gap-2 cursor-pointer select-none">
                                            <input 
                                              type="checkbox" 
                                              checked={offlineState.step5} 
                                              onChange={() => setOfflineDocsStates(prev => ({
                                                ...prev,
                                                [docKey]: { ...offlineState, step5: !offlineState.step5 }
                                              }))}
                                              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                                            />
                                            <span className="text-[10px] text-slate-300 leading-normal font-medium">{t('offlineStep5')}</span>
                                          </label>
                                        </div>

                                        <button 
                                          disabled={!(offlineState.step1 && offlineState.step2 && offlineState.step3 && offlineState.step4 && offlineState.step5)}
                                          onClick={() => handleMarkSubmittedOffline(activeRoadmap.schemeId, doc.docName)}
                                          className={`w-full py-2 rounded-xl text-[10px] font-black transition-all cursor-pointer text-center text-white ${
                                            (offlineState.step1 && offlineState.step2 && offlineState.step3 && offlineState.step4 && offlineState.step5)
                                              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/30'
                                              : 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                                          }`}
                                        >
                                          📝 {t('markAsSubmittedOfflineBtn')}
                                        </button>
                                        
                                        {!(offlineState.step1 && offlineState.step2 && offlineState.step3 && offlineState.step4 && offlineState.step5) && (
                                          <p className="text-[9px] text-amber-500/80 text-center leading-normal">
                                            ⚠️ Complete all checklist items to register physical file submission.
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800/80">
                        <p className="text-[10px] text-slate-400 leading-normal">
                          💡 <b>Pro-Tip:</b> {t('proTipText')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW: SCHEMES NAVIGATOR */}
          {activeTab === 'navigator' && (
            <div className="space-y-6">
              
              {/* Filter controls */}
              <div className="flex flex-wrap gap-2.5 p-1 bg-white border border-slate-200 rounded-2xl w-max">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4.5 py-2 hover:bg-slate-50 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    selectedCategory === 'All' ? 'bg-slate-900 text-white hover:bg-slate-900' : 'text-slate-600'
                  }`}
                >
                  🌐 Clear Filter (Show All)
                </button>
                {categoryMetas.map((catMeta) => (
                  <button 
                    key={catMeta.title}
                    onClick={() => setSelectedCategory(catMeta.cat)}
                    className={`px-4.5 py-2 hover:bg-slate-50 text-xs font-black rounded-xl transition-all cursor-pointer ${
                      selectedCategory === catMeta.cat ? 'bg-indigo-600 text-white hover:bg-indigo-600 font-extrabold' : 'text-slate-600'
                    }`}
                  >
                    {catMeta.icon} {catMeta.title}
                  </button>
                ))}
              </div>

              {/* Main schemes grid and details block split */}
              <div className="grid grid-cols-12 gap-6">
                
                {/* Schemes list container */}
                <div className="col-span-12 md:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Available Schemes List ({filteredSchemes.length})</h3>
                  {filteredSchemes.map((scheme) => (
                    <div 
                      key={scheme.id}
                      onClick={() => setSelectedScheme(scheme)}
                      className={`p-4 border rounded-3xl cursor-pointer hover:border-indigo-400 transition-all ${
                        selectedScheme?.id === scheme.id 
                          ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-100' 
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h4 className="font-extrabold text-sm text-slate-950 leading-snug">{scheme.name}</h4>
                        <span className="text-xl">
                          {scheme.category === 'Education' && '🎓'}
                          {scheme.category === 'Agriculture' && '🚜'}
                          {scheme.category === 'Women Welfare' && '🚺'}
                          {scheme.category === 'Employment' && '💼'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mb-2">{scheme.description}</p>
                      
                      <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-100">
                        <span className="text-indigo-600 font-bold">{scheme.category} Category</span>
                        <span className="text-slate-400">FAQS: {scheme.faqs.length} listed</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Scheme detailed display card */}
                <div className="col-span-12 md:col-span-7">
                  {localizedSelectedScheme ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                      
                      {/* Title block */}
                      <div className="flex justify-between items-start pb-4 border-b">
                        <div>
                          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase">
                            {localizedSelectedScheme.category} Scheme
                          </span>
                          <h2 className="text-xl font-black text-slate-950 mt-1">{localizedSelectedScheme.name}</h2>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{localizedSelectedScheme.description}</p>
                        </div>
                        <span className="text-4xl">
                          {localizedSelectedScheme.category === 'Education' && '🎓'}
                          {localizedSelectedScheme.category === 'Agriculture' && '🚜'}
                          {localizedSelectedScheme.category === 'Women Welfare' && '🚺'}
                          {localizedSelectedScheme.category === 'Employment' && '💼'}
                          {localizedSelectedScheme.category === 'Health' && '⚕️'}
                          {localizedSelectedScheme.category === 'Housing' && '🏠'}
                          {localizedSelectedScheme.category === 'Social Welfare' && '🤝'}
                        </span>
                      </div>

                      {/* Benefits & Details */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t('keyBenefitsLabel')}</h4>
                        <ul className="space-y-2">
                          {localizedSelectedScheme.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-slate-800 flex items-start gap-2.5">
                              <span className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                              <span className="font-medium">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eligibility block */}
                      <div className="bg-slate-50 rounded-2xl p-4 border text-xs">
                        <h4 className="font-extrabold text-slate-950 flex items-center gap-2 mb-1.5">
                          <AlertCircle className="w-4.5 h-4.5 text-indigo-600" />
                          <span>{t('viewEligibilityDetails')}</span>
                        </h4>
                        <p className="text-slate-600 font-medium leading-relaxed mb-3">{localizedSelectedScheme.eligibilityDescription}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-200">
                          <div>{t('minAgeReq')}: <b className="text-slate-900">{localizedSelectedScheme.minAge || 'Any'} y/o</b></div>
                          <div>{t('incomeLimitLabel')}: <b className="text-slate-900">{localizedSelectedScheme.maxIncome ? `₹${localizedSelectedScheme.maxIncome.toLocaleString('en-IN')}` : 'No limit'}</b></div>
                          <div>Allowed Castes: <b className="text-slate-900">{localizedSelectedScheme.allowedCategories?.join(', ') || t('unrestrictedCategory')}</b></div>
                          <div>Allowed Genders: <b className="text-slate-900">{localizedSelectedScheme.allowedGenders?.join(', ') || t('unrestrictedGender')}</b></div>
                        </div>
                      </div>

                      {/* Steps to apply */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t('applicationSteps')}</h4>
                        <div className="space-y-3">
                          {localizedSelectedScheme.applicationProcess.map((step, i) => (
                            <div key={i} className="flex gap-3 text-xs leading-normal">
                              <span className="w-5 h-5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <p className="text-slate-700 font-medium">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Required Documents list */}
                      <div className="p-4 bg-slate-900 text-white rounded-2xl relative overflow-hidden">
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-3">{t('requiredDocumentsLabel')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {localizedSelectedScheme.requiredDocuments.map((doc, i) => (
                            <span 
                              key={i} 
                              onClick={() => {
                                selectMockTemplateForDoc(doc);
                                setSelectedVerifySchemeId(localizedSelectedScheme.id);
                                setActiveTab('verifier');
                              }}
                              className="text-[10px] bg-slate-800 hover:bg-indigo-600 transition-colors text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
                            >
                              📁 {doc}
                            </span>
                          ))}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2 block italic">Click any document type to select for AI pre-testing scanner.</p>
                      </div>

                      {/* Frequently Asked Questions */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t('faqsHeader')}</h4>
                        <div className="space-y-3">
                          {localizedSelectedScheme.faqs.map((faq, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                              <p className="font-extrabold text-slate-900 mb-1">Q: {faq.question}</p>
                              <p className="text-slate-600 leading-normal">A: {faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enroll roadmap command */}
                      <div className="pt-4 border-t flex gap-3">
                        <button 
                          onClick={() => initiateEnrollment(localizedSelectedScheme.id, localizedSelectedScheme.name)}
                          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-md hover:bg-indigo-500 cursor-pointer"
                        >
                          🚀 {t('initiateRoadmapBtn')}
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400">
                      Please select an Indian welfare scheme from the listing column.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* VIEW: AI DOCUMENT VERIFIER */}
          {activeTab === 'verifier' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-12 gap-6">
                
                {/* Controller inputs form */}
                <div className="col-span-12 md:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest block">MODULE 9: AI VERIFICATION SYSTEM</span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Check Document Readiness for Schemes</h3>
                    <p className="text-xs text-slate-500 leading-normal mt-1.5">
                      Verify if your scanned card parameters match correct rules, detect potential typos, missing components, or mismatch values.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyDocument} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Select Scheme Target context</label>
                      <select 
                        value={selectedVerifySchemeId}
                        onChange={(e) => {
                          setSelectedVerifySchemeId(e.target.value);
                          // Auto select first document of that scheme
                          const target = schemes.find(s => s.id === e.target.value);
                          if (target && target.requiredDocuments.length > 0) {
                            selectMockTemplateForDoc(target.requiredDocuments[0]);
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 focus:outline-none"
                      >
                        <option value="">-- General Verification (No Scheme context) --</option>
                        {schemes.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Document Class Type</label>
                      <select 
                        value={verifyDocName}
                        onChange={(e) => selectMockTemplateForDoc(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="">-- Select Document Category --</option>
                        <option value="Aadhaar Card">Aadhaar Card (UIDAI)</option>
                        <option value="Income Certificate (under 2.5 LPA)">Income Certificate</option>
                        <option value="Caste Certificate (OBC/EBC/DNT)">Caste Certificate (Caste OBC/SC/ST)</option>
                        <option value="Land Ownership Records (Khatauni/Patta)">Land Passbook / Khatauni Records</option>
                        <option value="Bank Account Passbook (Aadhar-seeded)">Bank Passbook Cover (Aadhar seeded)</option>
                      </select>
                    </div>

                    {/* Pre-fill mock suggestions templates buttons */}
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Try template presets (Demo OCR contents)</span>
                      <div className="flex flex-wrap gap-1.5">
                        <button 
                          type="button"
                          onClick={() => selectMockTemplateForDoc("Aadhaar Card")}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-200"
                        >
                          Aadhaar Sample
                        </button>
                        <button 
                          type="button"
                          onClick={() => selectMockTemplateForDoc("Income Certificate (under 2.5 LPA)")}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-200"
                        >
                          Income Sample
                        </button>
                        <button 
                          type="button"
                          onClick={() => selectMockTemplateForDoc("Caste Certificate (OBC/EBC/DNT)")}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-200"
                        >
                          Caste Sample
                        </button>
                        <button 
                          type="button"
                          onClick={() => selectMockTemplateForDoc("Land Ownership Records (Khatauni/Patta)")}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-200"
                        >
                          Land Sample
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Scanned text OCR Data / Description content</label>
                      <textarea 
                        rows={6}
                        value={verifyTextContent}
                        onChange={(e) => setVerifyTextContent(e.target.value)}
                        placeholder="Paste document text extracts here. Ensure name values and income integers are legibly described for analysis."
                        className="w-full px-3 py-2 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={verificationLoading}
                      className="w-full py-3 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400 rounded-xl text-xs font-black transition-all cursor-pointer shadow flex items-center justify-center gap-2"
                    >
                      {verificationLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>AI Scanning Content...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Run Document Analysis Checklist</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Return Result display panel wrapper */}
                <div className="col-span-12 md:col-span-6">
                  {verificationResult ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                      
                      <div className="flex justify-between items-center pb-4 border-b">
                        <div>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                            Tested: {verificationResult.docName}
                          </span>
                          <h4 className="font-black text-lg text-slate-950 mt-1">Verification Report</h4>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1.5 rounded-xl font-black text-xs ${
                            verificationResult.success ? 'bg-emerald-150 text-emerald-800 bg-emerald-50' : 'bg-red-50 text-red-800'
                          }`}>
                            {verificationResult.success ? "✓ READY" : "⚠️ WARNING"}
                          </span>
                        </div>
                      </div>

                      {/* Score metrics bento tile */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                          <p className="text-3xl font-black text-indigo-400">{verificationResult.readinessScore}%</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Readiness Score</p>
                        </div>
                        <div className="p-4 bg-slate-50 border rounded-2xl flex flex-col justify-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Status Check</p>
                          <p className="text-xs font-extrabold text-slate-900 mt-1">
                            {verificationResult.success ? "All vital indices matches." : "Mismatch/missing key indices."}
                          </p>
                        </div>
                      </div>

                      {/* Status Check Note text */}
                      <div>
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Verification Notes</h5>
                        <p className="bg-slate-50 p-4 border rounded-2xl text-xs text-slate-700 leading-relaxed font-medium">
                          {verificationResult.notes}
                        </p>
                      </div>

                      {/* Missing credentials list */}
                      {verificationResult.missingDocuments && verificationResult.missingDocuments.length > 0 && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                          <h5 className="text-[10px] font-bold text-red-900 uppercase tracking-widest mb-1.5">
                            Associated / Missing Documents Checklist Recommendations:
                          </h5>
                          <ul className="space-y-1.5">
                            {verificationResult.missingDocuments.map((m, i) => (
                              <li key={i} className="text-[11px] text-red-800 flex items-start gap-1.5 font-medium leading-relaxed">
                                <AlertCircle className="w-3.5 h-3.5 text-red-650 shrink-0 mt-0.5" />
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="bg-slate-100 p-3 rounded-xl border text-[10px] text-slate-500 leading-normal">
                        ℹ️ <b>Security Disclaimer:</b> AI Verifications are pre-evaluative helpers to ease offline processing. Direct authority offices make all final validation calls.
                      </div>

                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400 h-full flex flex-col items-center justify-center space-y-3">
                      <ShieldCheck className="w-12 h-12 text-slate-350" />
                      <p className="text-xs font-bold">Please complete and run the scanning form to display results.</p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-normal">
                        Our dynamic system processes credentials under the official Ministry specifications (e.g. Income tax limit checks).
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* VIEW: MULTILINGUAL CHATBOT */}
          {activeTab === 'chatbot' && (
            <div className="space-y-6">
              
              {/* Info panel */}
              <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl flex justify-between items-center shadow-md">
                <div>
                  <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest block">MODULE 6 & 10: VARTA HELPDESK</span>
                  <h3 className="text-lg font-black mt-0.5">Varta Multilingual AI Assistant</h3>
                  <p className="text-[11px] text-slate-300">
                    Get answers in English, Hindi, and Telugu. Fully personalized to your demographic status.
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-indigo-300">
                  Model: Gemini-3.5-flash
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                
                {/* Chat window interface box */}
                <div className="col-span-12 md:col-span-8 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 p-5 flex flex-col h-[520px]">
                  
                  {/* Message History display overflow */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3.5 mb-4 pr-1">
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 max-w-[85%] ${
                          msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                          msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-900'
                        }`}>
                          {msg.sender === 'user' ? 'C' : '🤖'}
                        </div>

                        {/* Content text */}
                        <div className={`p-4 rounded-3xl text-xs leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-650 text-white rounded-tr-none bg-indigo-600' 
                            : 'bg-white text-slate-900 rounded-tl-none border shadow-sm'
                        }`}>
                          <p className="font-semibold whitespace-pre-wrap">{msg.text}</p>
                          
                          {/* Audio TTS toggle simulation */}
                          {msg.sender === 'bot' && (
                            <button 
                              onClick={() => handleVoiceSimulate(msg.id, msg.text)}
                              className={`mt-2.5 flex items-center gap-1.5 px-3 py-1 border rounded-lg text-[9px] font-extrabold cursor-pointer transition-all ${
                                voicedMessageId === msg.id 
                                  ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse' 
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{voicedMessageId === msg.id ? "Playing simulation voice..." : "Click to play simulated voice (TTS)"}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {chatLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-white font-bold text-xs">
                          🤖
                        </div>
                        <div className="p-3 bg-white border rounded-2xl rounded-tl-none border-slate-100 flex items-center gap-2">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form line */}
                  <form onSubmit={handleChatSubmit} className="relative mt-auto">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={`Ask about schemes in ${currentLanguage}... (e.g. Eligibility for PM-KISAN, educational grants)`}
                      className="w-full px-5 py-3.5 rounded-2xl border-none ring-1 ring-slate-200 text-xs shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 pr-16"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 px-4 py-2 bg-slate-950 text-white rounded-xl text-[10px] font-black cursor-pointer hover:bg-indigo-600 transition-colors"
                    >
                      SEND
                    </button>
                  </form>
                </div>

                {/* Direct quick guidance questions panel */}
                <div className="col-span-12 md:col-span-4 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Welfare Queries</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Click any pre-tested prompt to instantly ask the AI chatbot:
                  </p>

                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        setChatInput("What are the exact benefits of PM-KISAN Samman Nidhi and how does DBT register?");
                        setTimeout(() => handleChatSubmit(), 100);
                      }}
                      className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl border text-[11px] font-bold text-slate-800 cursor-pointer block"
                    >
                      🚜 Benefits of PM-KISAN funds?
                    </button>
                    <button 
                      onClick={() => {
                        setChatInput("Am I eligible as an OBC student studying class 11 for the PM YASASVI Scholarship?");
                        setTimeout(() => handleChatSubmit(), 100);
                      }}
                      className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl border text-[11px] font-bold text-slate-800 cursor-pointer block"
                    >
                      🎓 Eligibility for PM YASASVI scholarship?
                    </button>
                    <button 
                      onClick={() => {
                        setChatInput("What documents do I need to prepare to open a Sukanya Samriddhi Yojana account?");
                        setTimeout(() => handleChatSubmit(), 100);
                      }}
                      className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl border text-[11px] font-bold text-slate-800 cursor-pointer block"
                    >
                      🚺 Documents for Sukanya Samriddhi girl child saving?
                    </button>
                    <button 
                      onClick={() => {
                        setChatInput("Does Ayushman Bharat support pre-existing health issues immediately from registration date?");
                        setTimeout(() => handleChatSubmit(), 100);
                      }}
                      className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl border text-[11px] font-bold text-slate-800 cursor-pointer block"
                    >
                      ⚕️ Health pre-existing cover rules?
                    </button>
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl text-[10px] text-indigo-900 leading-normal">
                    🔊 <b>Voice Interaction:</b> Simply click the "Click to play simulated voice (TTS)" button beneath bot replies to hear them aloud in regional accents.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW: RATINGS AND FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-12 gap-6">
                
                {/* Form to submit feedback */}
                <div className="col-span-12 md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <span className="text-[10px] text-pink-600 font-bold uppercase tracking-widest block">MODULE 7: FEEDBACK MANAGEMENT</span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Submit Ratings & Issue Reports</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">
                      Share your experience on scheme application timelines or report any administrative issues.
                    </p>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Select Welfare Scheme</label>
                      <select 
                        value={newFeedback.schemeId}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, schemeId: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        required
                      >
                        <option value="">-- Choose Scheme --</option>
                        {schemes.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Rating Score</label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map((stars) => (
                          <button 
                            key={stars}
                            type="button"
                            onClick={() => setNewFeedback(prev => ({ ...prev, rating: stars }))}
                            className={`w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer text-sm font-bold ${
                              newFeedback.rating >= stars 
                                ? 'bg-indigo-650 border-indigo-600 text-amber-500 bg-indigo-50 border-2' 
                                : 'text-slate-400'
                            }`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Issue Classification</label>
                      <select 
                        value={newFeedback.issueType}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, issueType: e.target.value as any }))}
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="General Feedback">General Feedback</option>
                        <option value="Technical Issue">Technical / Server Issue</option>
                        <option value="Information Mismatch">Information Mismatch</option>
                        <option value="Application Help Needed">Direct Application Help Needed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Your Testimony / Comments</label>
                      <textarea 
                        rows={4}
                        value={newFeedback.comment}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Write detailed testimony or complain logs here..."
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow"
                    >
                      Log Official Feedback Report
                    </button>
                  </form>
                </div>

                {/* Existing testimonies column */}
                <div className="col-span-12 md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Public Feedback Reports ({feedbacks.length})</h3>
                  
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto">
                    {feedbacks.map((fb) => (
                      <div key={fb.id} className="p-4 bg-white border border-slate-200 rounded-3xl shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-extrabold text-xs text-slate-950 block">{fb.userName}</span>
                            <span className="text-[9px] text-slate-400 block">{new Date(fb.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={`text-xs ${i < fb.rating ? 'text-amber-500' : 'text-slate-200'}`}>★</span>
                            ))}
                          </div>
                        </div>

                        {fb.schemeName && (
                          <span className="inline-block text-[9px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full mb-2">
                            Scheme: {fb.schemeName}
                          </span>
                        )}

                        <p className="text-slate-700 text-xs font-medium leading-relaxed mb-3">"{fb.comment}"</p>
                        
                        <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-100">
                          <span className="text-slate-500">Category: <b className="text-slate-700">{fb.issueType}</b></span>
                          <span className={`px-2 py-0.5 rounded font-black uppercase text-[8px] ${
                            fb.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>{fb.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VIEW: ADMIN INSIGHTS PLATFORM */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              
              {/* Alert broadcaster header widget (Module 8) */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg space-y-4 border border-slate-800">
                <div>
                  <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest block">ADMIN ACCESS: MODULE 8 BROADCAST</span>
                  <h3 className="text-lg font-black mt-0.5">Push Smart Notifications (SMS, WhatsApp, Deadlines)</h3>
                  <p className="text-[11px] text-slate-300">
                    Broadcasting details automatically generates real-time timeline notifications on citizens' notifications bell icon! 
                  </p>
                </div>

                <form onSubmit={handleBroadCastAlert} className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-3">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Alert Title</label>
                    <input 
                      type="text"
                      value={simulateAlertForm.title}
                      onChange={(e) => setSimulateAlertForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-800 border-none ring-1 ring-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:ring-indigo-500"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Broadcasting Message Content</label>
                    <input 
                      type="text"
                      value={simulateAlertForm.message}
                      onChange={(e) => setSimulateAlertForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-slate-800 border-none ring-1 ring-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Medium Channel</label>
                    <select
                      value={simulateAlertForm.type}
                      onChange={(e) => setSimulateAlertForm(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full bg-slate-800 border-none ring-1 ring-slate-700 text-white rounded-xl px-2 py-2 text-xs"
                    >
                      <option value="SMS">SMS Alerts</option>
                      <option value="WhatsApp">WhatsApp Alerts</option>
                      <option value="Deadline">Deadline Warnings</option>
                    </select>
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Target Group</label>
                    <input 
                      type="text"
                      value={simulateAlertForm.sentTo}
                      onChange={(e) => setSimulateAlertForm(prev => ({ ...prev, sentTo: e.target.value }))}
                      className="w-full bg-slate-800 border-none ring-1 ring-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex items-end">
                    <button 
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl cursor-pointer shadow text-center"
                    >
                      PUSH
                    </button>
                  </div>
                </form>
              </div>

              {/* Statistical Metrics Cards */}
              {adminMetrics ? (
                <div className="space-y-6">
                  
                  {/* BENTO STATISTICS ROW */}
                  <div className="grid grid-cols-12 gap-5">
                    
                    {/* Metrics 1 */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Active Beneficiaries</p>
                      <p className="text-4xl font-black text-slate-900 mt-2">{adminMetrics.metrics.totalUsers}</p>
                      <p className="text-[10px] text-green-600 font-extrabold mt-1">✓ Live SECC-2011 synced</p>
                    </div>

                    {/* Metrics 2 */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hosted Welfare Schemes</p>
                      <p className="text-4xl font-black text-indigo-600 mt-2">{adminMetrics.metrics.totalSchemes}</p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">7 Central • 5 State level</p>
                    </div>

                    {/* Metrics 3 */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Platform Rating</p>
                      <p className="text-4xl font-black text-amber-500 mt-2">⭐ {adminMetrics.metrics.averageRating}</p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">Based on citizen reviews</p>
                    </div>

                    {/* Metrics 4 */}
                    <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Support Tickets Solved</p>
                      <p className="text-4xl font-black text-emerald-600 mt-2">
                        {adminMetrics.metrics.resolvedIssues} / {adminMetrics.metrics.resolvedIssues + adminMetrics.metrics.pendingIssues}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">Resolved automatically</p>
                    </div>

                  </div>

                  {/* BENTO GRAPHICS DISPLAY */}
                  <div className="grid grid-cols-12 gap-5">
                    
                    {/* Scheme Enrollment counts */}
                    <div className="col-span-12 md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Beneficiary Enrollment Counts by Scheme (Module 12)
                      </h4>
                      
                      <div className="space-y-3">
                        {adminMetrics.schemeEnrollmentStats.map((stat: any, i: number) => {
                          // Calculate mock width ratio
                          const maxVal = 30;
                          const perc = Math.min(100, Math.round((stat.enrollments / maxVal) * 100));

                          return (
                            <div key={i} className="space-y-1 text-xs">
                              <div className="flex justify-between items-center text-[11px] font-bold">
                                <span className="text-slate-900 truncate pr-4">{stat.name}</span>
                                <span className="text-indigo-650 shrink-0 font-extrabold">{stat.enrollments}k registrations</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full">
                                <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${perc}%` }} />
                              </div>
                              <span className="text-[9px] text-slate-400 font-semibold">{stat.category} Scheme Welfare</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Category Distribution details */}
                    <div className="col-span-12 md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                          Registered District Adoption Statistics
                        </h4>
                        
                        <div className="space-y-3.5">
                          {adminMetrics.districtDistribution.map((dist: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-xs pb-2.5 border-b last:border-0">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-[9px]">
                                  {idx + 1}
                                </span>
                                <span className="font-extrabold text-slate-900">{dist.district} District</span>
                              </div>
                              
                              <div className="text-right">
                                <span className="font-extrabold text-slate-900">{dist.count}k matches</span>
                                <span className="text-[9px] text-slate-400 block font-mono">SECC priority rank</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t mt-4 bg-slate-50 p-3 rounded-2xl border">
                        <p className="text-[10px] text-slate-500 leading-normal">
                          📊 <b>Analytics Methodology:</b> Data feeds reflect socio-demographic statistics compiled dynamically from the Indian Census databases and platform feedback reports.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border text-center text-slate-450">
                  Loading system analytical parameters...
                </div>
              )}

            </div>
          )}

          {/* VIEW: USER PROFILE CONFIGURATION */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="mb-6 pb-4 border-b">
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest block">MODULE 1: PROFILE MANAGEMENT</span>
                <h3 className="text-xl font-black text-slate-950 mt-1">Configure Demographic Data Parameters</h3>
                <p className="text-xs text-slate-500 leading-normal mt-1 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>These status variables feed directly into the AI Eligibility Recommendation metrics.</span>
                </p>
              </div>

              <form onSubmit={updateProfile} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input 
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email ID</label>
                    <input 
                      type="email"
                      value={profileForm.email}
                      disabled={!!sessionUser}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. user@gmail.com"
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 disabled:text-slate-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Age (Years)</label>
                    <input 
                      type="number"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, age: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                      min={1}
                      max={120}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Gender</label>
                    <select 
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Social Group Category</label>
                    <select 
                      value={profileForm.category}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="General">General (Unreserved)</option>
                      <option value="OBC">OBC (Other Backward Classes)</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">State of Jurisdiction</label>
                    <input 
                      type="text"
                      value={profileForm.state}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">District Area</label>
                    <input 
                      type="text"
                      value={profileForm.district}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Annual Family Income (INR)</label>
                    <input 
                      type="number"
                      value={profileForm.annualIncome}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, annualIncome: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Education level</label>
                    <select 
                      value={profileForm.education}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, education: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    >
                      <option value="Illiterate">Illiterate</option>
                      <option value="Primary">Primary (till class 5)</option>
                      <option value="High School">High School (till class 10)</option>
                      <option value="Graduate">Graduate (Degree)</option>
                      <option value="Post Graduate">Post Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Occupation</label>
                    <select 
                      value={profileForm.occupation}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, occupation: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    >
                      <option value="Farmer">Farmer / Agriculturalist</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Salaried">Salaried (Govt/Private Sector)</option>
                      <option value="Self-employed">Self-employed Business owner</option>
                      <option value="Artisan">Local Artisan / Handicrafts worker</option>
                    </select>
                  </div>
                </div>

                {/* Checklist variables */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Special Priority Demographics statuses</label>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border">
                    <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.isPhysicallyChallenged}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, isPhysicallyChallenged: e.target.checked }))}
                        className="w-4 h-4 text-indigo-650 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span>Physically Challenged (Divyangjan class categories)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.isMinority}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, isMinority: e.target.checked }))}
                        className="w-4 h-4 text-indigo-650 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span>Belong to official Minority Community (Buddhist, Muslim, Parsi etc)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={profileForm.isWidowOrSingleMother}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, isWidowOrSingleMother: e.target.checked }))}
                        className="w-4 h-4 text-indigo-650 rounded border-slate-300"
                      />
                      <span>Widow or Single Mother / Guardian</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-[10px] text-slate-400">Values save securely into in-memory platform cache.</span>
                  
                  {sessionUser ? (
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow transition-all cursor-pointer"
                    >
                      Save & Re-evaluate Welfare Matches
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={handleSignup}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black cursor-pointer"
                      >
                        Create Citizen Profile
                      </button>
                    </div>
                  )}
                </div>

              </form>

              {/* Explicit logout option */}
              {sessionUser && (
                <div className="mt-8 pt-5 border-t border-slate-100 flex justify-between items-center bg-red-50/50 p-4 rounded-2xl border border-red-100">
                  <div>
                    <h5 className="text-xs font-bold text-red-900">Configure simulated new citizen account?</h5>
                    <p className="text-[10px] text-red-700 leading-normal">
                      Disconnect current profile and login or sign up with different configurations.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSessionUser(null);
                      setAuthMode('signup');
                      setProfileForm({
                        name: "",
                        email: "",
                        age: 25,
                        gender: 'Male',
                        state: "Telangana",
                        district: "Hyderabad",
                        annualIncome: 150000,
                        category: "General",
                        education: "High School",
                        occupation: "Farmer",
                        isPhysicallyChallenged: false,
                        isMinority: false,
                        isWidowOrSingleMother: false
                      });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[10px] font-black cursor-pointer shadow"
                  >
                    Disconnect Profile
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
        
        {/* REAL-TIME SYSTEM CONTEXT FOOTER */}
        <footer className="h-10 border-t bg-white px-8 flex items-center justify-between text-[11px] text-slate-400 shrink-0 select-none">
          <div>
            <span>India National Welfare Registry System • 2026 FY Smart Platform</span>
          </div>
          <div className="flex gap-4">
            <span>Server Health: <b className="text-emerald-600">ONLINE (PORT 3000)</b></span>
            <span>AI: <b className="text-indigo-600">Gemini-3.5-flash Active</b></span>
          </div>
        </footer>

      </main>

    </div>
  );
}
