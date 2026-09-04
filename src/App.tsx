/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  ShieldAlert, 
  Compass, 
  Award, 
  Bot, 
  Scale,
  Info,
  ExternalLink,
  ShieldCheck,
  PhoneCall,
  User,
  Heart,
  Flame,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Map,
  Lock,
  Unlock,
  Key,
  Home,
  Timer
} from "lucide-react";
import BookDictionary from "./components/BookDictionary";
import MarineInsurance from "./components/MarineInsurance";
import EarCarInsurance from "./components/EarCarInsurance";
import BookHelplineHub from "./components/BookHelplineHub";
import PolicyPlanner from "./components/PolicyPlanner";
import BimaIconLogo from "./components/BimaIconLogo";
import FireMarineHandbook from "./components/FireMarineHandbook";
import LegalSafeguards from "./components/LegalSafeguards";
import RetailHealthHandbook from "./components/RetailHealthHandbook";
import SitemapPage from "./components/SitemapPage";
import HomeDashboard from "./components/HomeDashboard";
import PyrametricTab from "./components/PyrametricTab";
import ParametricRepository from "./components/ParametricRepository";

interface ReleaseLogItem {
  label: string;
  desc: string;
  version: string;
  modifiedTime: number;
  dateStr: string;
}

type TabId = "home" | "dictionary" | "handbook" | "retail_health" | "marine" | "ear_car" | "helplines" | "planner" | "legal" | "sitemap" | "pyrametric" | "parametric";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [securityToast, setSecurityToast] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [showAdminEntry, setShowAdminEntry] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<string>("");
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = localStorage.getItem("bima_sec_failed_attempts");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutTime, setLockoutTime] = useState<number>(() => {
    const saved = localStorage.getItem("bima_sec_lockout_until");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Automated release logging telemetry state (SF-TMI client receiver)
  const [releaseLogs, setReleaseLogs] = useState<ReleaseLogItem[]>([]);
  const [currentAppVersion, setCurrentAppVersion] = useState<string>("1.9.0");
  const [lastBuildHash, setLastBuildHash] = useState<number | null>(null);

  useEffect(() => {
    const fetchLatestReleases = async () => {
      try {
        const response = await fetch("/api/release");
        let fetchedLogs: ReleaseLogItem[] = [];
        let currentVer = "1.0.0";
        if (response.ok) {
          const data = await response.json();
          fetchedLogs = data.releases || [];
          if (data.currentVersion) {
            currentVer = data.currentVersion;
            setCurrentAppVersion(data.currentVersion);
          }
          setLastBuildHash(data.lastBuildHash);
        }

        // Merge custom releases written in Administrator dashboard
        const savedCustom = localStorage.getItem("bima_custom_releases");
        if (savedCustom) {
          try {
            const parsedCustom: ReleaseLogItem[] = JSON.parse(savedCustom);
            // Prefix custom releases to show them at the very top
            fetchedLogs = [...parsedCustom, ...fetchedLogs];
            if (parsedCustom.length > 0 && parsedCustom[0].version) {
              setCurrentAppVersion(parsedCustom[0].version);
            }
          } catch (e) {
            console.warn("Telemetry warning: Error parsing custom releases.", e);
          }
        }
        setReleaseLogs(fetchedLogs);
      } catch (err) {
        console.warn("Telemetry warning: Fetching dynamic release log aborted.", err);
      }
    };

    fetchLatestReleases();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bima_dark_mode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("bima_dark_mode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("bima_dark_mode", "false");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const checkAdminSession = () => {
      const token = sessionStorage.getItem("bima_sec_session_token");
      setIsAdminLoggedIn(!!token);
    };
    checkAdminSession();
    const interval = setInterval(checkAdminSession, 1500);
    return () => clearInterval(interval);
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime <= 0) return;
    const interval = setInterval(() => {
      const remaining = lockoutTime - Date.now();
      if (remaining <= 0) {
        setLockoutTime(0);
        setFailedAttempts(0);
        localStorage.removeItem("bima_sec_lockout_until");
        localStorage.removeItem("bima_sec_failed_attempts");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime]);

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutTime > Date.now()) {
      const rem = Math.ceil((lockoutTime - Date.now()) / 1000);
      setAdminError(`Lockout is active. Try again in ${rem}s.`);
      return;
    }

    const cleanPass = passcode.trim();
    const lcPass = cleanPass.toLowerCase();
    let obfuscatedInput = "";
    try {
      obfuscatedInput = btoa(lcPass);
    } catch {
      obfuscatedInput = "";
    }

    const savedOverride = localStorage.getItem("bima_sec_pass_override");
    const isMatched = savedOverride 
      ? cleanPass === savedOverride 
      : obfuscatedInput === "YWRtaW5rYWxiaW1h";

    if (isMatched) {
      setIsAdminLoggedIn(true);
      setShowAdminEntry(false);
      setAdminError("");
      setFailedAttempts(0);
      localStorage.removeItem("bima_sec_failed_attempts");
      localStorage.removeItem("bima_sec_lockout_until");

      const ephemeralToken = `bima-signed-sig-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
      sessionStorage.setItem("bima_sec_session_token", ephemeralToken);
      window.dispatchEvent(new Event("storage"));
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      localStorage.setItem("bima_sec_failed_attempts", nextFailed.toString());

      if (nextFailed >= 3) {
        const deadline = Date.now() + 60 * 1000;
        setLockoutTime(deadline);
        localStorage.setItem("bima_sec_lockout_until", deadline.toString());
        setAdminError("Too many credentials failures. Authenticator locked for 60 seconds.");
      } else {
        setAdminError(`Access Denied: Invalid administrator passcode. (${3 - nextFailed} attempts remaining)`);
      }
    }
  };

  const handleLogOutAdmin = () => {
    setIsAdminLoggedIn(false);
    setPasscode("");
    sessionStorage.removeItem("bima_sec_session_token");
    window.dispatchEvent(new Event("storage"));
  };

  const displaySecurityToast = (msg: string) => {
    setSecurityToast(msg);
    // Clear toast after 4 seconds
    setTimeout(() => {
      setSecurityToast(current => current === msg ? null : current);
    }, 4000);
  };

  const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  const [sessionRemaining, setSessionRemaining] = useState<number>(0);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      setSessionRemaining(0);
      return;
    }

    const updateTimer = () => {
      const token = sessionStorage.getItem("bima_sec_session_token");
      if (!token) {
        setIsAdminLoggedIn(false);
        setSessionRemaining(0);
        return;
      }
      const parts = token.split("-");
      const timestamp = parseInt(parts[parts.length - 1], 10);
      if (isNaN(timestamp)) {
        setSessionRemaining(0);
        return;
      }

      const elapsed = Date.now() - timestamp;
      const remaining = SESSION_DURATION - elapsed;

      if (remaining <= 0) {
        handleLogOutAdmin();
        displaySecurityToast("🔒 Security Shield: Admin session expired due to inactivity.");
      } else {
        setSessionRemaining(Math.max(0, remaining));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isAdminLoggedIn]);

  const formatTime = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Client-side Security & Anti-Copy Keybind Handlers
  useEffect(() => {
    // 1. Block Context Menu (Right-Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      displaySecurityToast("🔒 Dynamic Integrity Shield: Right-click context menus are restricted to safeguard proprietary advisor scripts.");
    };

    // 2. Block Inspect/Source Hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      
      // F12 key
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        displaySecurityToast("🔒 System Shield: F12 Inspector is locked on this sandbox node.");
        return;
      }

      // Ctrl+Shift+I / Cmd+Opt+I
      if ((e.ctrlKey || (isMac && e.metaKey)) && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        displaySecurityToast("🔒 System Shield: Developer inspection console is restricted.");
        return;
      }

      // Ctrl+Shift+J / Cmd+Opt+J
      if ((e.ctrlKey || (isMac && e.metaKey)) && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        displaySecurityToast("🔒 System Shield: Console logging viewport is locked.");
        return;
      }

      // Ctrl+Shift+C / Cmd+Opt+C
      if ((e.ctrlKey || (isMac && e.metaKey)) && e.shiftKey && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
        e.preventDefault();
        displaySecurityToast("🔒 System Shield: Element Inspector target selection bypassed.");
        return;
      }

      // Ctrl+U / Cmd+Opt+U (View Source)
      if ((e.ctrlKey || (isMac && e.metaKey)) && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
        e.preventDefault();
        displaySecurityToast("🔒 System Shield: Technical source indexing is protected under fair-use code seals.");
        return;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || (isMac && e.metaKey)) && (e.key === "S" || e.key === "s" || e.keyCode === 83)) {
        e.preventDefault();
        displaySecurityToast("🔒 Page Protection: Offline serialization is restricted. Standard print template downloads are available directly in advisors.");
        return;
      }

      // Ctrl+C / Cmd+C (Prevent Copying)
      if ((e.ctrlKey || (isMac && e.metaKey)) && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
        displaySecurityToast("🔒 Anti-Extract Protocol: Text replication is protected.");
      }
    };

    // 3. High-frequency anti-debugging loop
    const antiDebuggerInterval = setInterval(() => {
      try {
        (function() {
          (function a() {
            try {
              (function b(i) {
                if (("" + i / i).length !== 1 || i % 20 === 0) {
                  (function() {}).constructor("debugger")();
                } else {
                  debugger;
                }
                b(++i);
              })(0);
            } catch (e) {
              // Fail silently
            }
          })();
        })();
      } catch {}
    }, 150);

    // Bind event listeners to document
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(antiDebuggerInterval);
    };
  }, []);





  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased relative overflow-hidden" id="app-container">
      
      {/* Minimalist Corporate Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-[#09090B]/95 border-b border-zinc-200 dark:border-zinc-800 py-3.5 px-6 shadow-xs transition-all duration-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between animate-fade-in relative z-10">
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-3.5">
              <BimaIconLogo className="w-12 h-12 transition duration-200" />
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans flex flex-col sm:flex-row sm:items-center gap-1.5">
                  <span>BimaCompass:</span>
                  <span className="text-zinc-600 dark:text-zinc-400 font-bold text-base md:text-lg">Your Shield in the Fine Print</span>
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Making Insurance Simple • No Jargon • Honest Guides for Everyone
                </p>
              </div>
            </div>
          </div>

          {/* Theme Switcher and Project Credit Container */}
          <div className="flex items-center gap-3 self-stretch md:self-auto shrink-0 justify-between md:justify-end">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition flex items-center justify-center cursor-pointer shadow-xs"
              style={{ minWidth: "40px", minHeight: "40px" }}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="theme-mode-toggle"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-zinc-200 transition duration-200" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-zinc-700 transition duration-200" />
              )}
            </button>

            <div className="bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 px-4 flex items-center justify-between md:justify-start gap-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block">Project Credit</span>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-normal font-semibold">
                  A free to use non profit tool created by <a href="https://www.linkedin.com/in/kalyanjit-naik/" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-zinc-100 hover:underline font-extrabold inline-flex items-center gap-0.5 transition">Kalyanjit Naik <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0" /></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6 relative z-10">
        
        {/* Dynamic Display Workspace Panels (Main Page Container) */}
        <div className="w-full space-y-5">
          
          {activeTab !== "home" && (
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 px-4 flex items-center justify-between gap-4 text-xs shadow-xs"
            >
              <span className="text-zinc-600 dark:text-zinc-400 font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
                Active Section: <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                  {activeTab === "retail_health" 
                    ? "Retail Health Insurance" 
                    : activeTab === "marine" 
                    ? "Marine Cargo & Transit Insurance" 
                    : activeTab === "ear_car" 
                    ? "EAR & CAR Engineering Insurance" 
                    : activeTab === "helplines" 
                    ? "Redressal Helplines" 
                    : activeTab === "planner" 
                    ? "Need-Based Matchmaker" 
                    : activeTab === "dictionary" 
                    ? "Policy Glossary" 
                    : activeTab === "legal" 
                    ? "Legal & Privacy Policy" 
                    : activeTab === "sitemap" 
                    ? "PWA Sitemap" 
                    : activeTab === "pyrametric"
                    ? "PyraMetric™ Actuarial Underwriter"
                    : activeTab === "parametric"
                    ? "Parametric Policy Repository (Swiss Re)"
                    : "Commercial Lines Handbook"}
                </strong>
              </span>
              <button
                onClick={() => setActiveTab("home")}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer text-[11px]"
              >
                ← Back to Dashboard
              </button>
            </motion.div>
          )}

          <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xs min-h-[500px] transition-all duration-200">
            {activeTab === "home" && <HomeDashboard setActiveTab={setActiveTab} isAdminLoggedIn={isAdminLoggedIn} />}
            {activeTab === "dictionary" && <BookDictionary isAdminLoggedIn={isAdminLoggedIn} />}
            {activeTab === "handbook" && <FireMarineHandbook />}
            {activeTab === "retail_health" && <RetailHealthHandbook />}
            {activeTab === "marine" && <MarineInsurance />}
            {activeTab === "ear_car" && <EarCarInsurance />}
            {activeTab === "helplines" && <BookHelplineHub />}
            {activeTab === "planner" && <PolicyPlanner />}
            {activeTab === "legal" && <LegalSafeguards />}
            {activeTab === "sitemap" && <SitemapPage setActiveTab={setActiveTab} currentAppVersion={currentAppVersion} />}
            {activeTab === "pyrametric" && <PyrametricTab />}
            {activeTab === "parametric" && <ParametricRepository />}
          </div>

          {/* Bottom Utility Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            
            {/* Secure Admin Hub Sidebar Card */}
            <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3 transition duration-200 flex flex-col justify-between" id="sidebar-admin-secure-hub">
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block flex items-center gap-1.5 font-sans border-b border-zinc-100 dark:border-zinc-800/80 pb-2 text-xs">
                  <Lock className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0" />
                  <span>🔐 Admin Settings Hub</span>
                </span>

                {!isAdminLoggedIn ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-[10px] text-zinc-500 leading-normal font-sans">
                      Unlock dictionary edit mode, simple stats, and check app releases safely.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-1">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-700 dark:text-zinc-300 font-extrabold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-pulse"></span>
                        <span>Session Verified Active</span>
                      </div>
                      <p className="text-[11px] text-zinc-800 dark:text-zinc-200 font-semibold font-sans truncate font-sans">
                        🤵 Kalyanjit Naik
                      </p>
                      <p className="text-[9px] text-zinc-500 font-medium font-sans">
                        Advocate / Creator
                      </p>
                    </div>

                    {/* Visual Session Countdown Timer */}
                    {(() => {
                      const sessionPct = (sessionRemaining / SESSION_DURATION) * 100;
                      return (
                        <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                            <span className="flex items-center gap-1 uppercase font-mono tracking-wider">
                              <Timer className="w-3.5 h-3.5 shrink-0" />
                              <span>Session Time Left</span>
                            </span>
                            <span className="font-mono font-extrabold text-xs text-zinc-900 dark:text-zinc-100">
                              {formatTime(sessionRemaining)}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-zinc-800 dark:bg-zinc-200 transition-all duration-1000 ease-linear"
                              style={{ width: `${sessionPct}%` }}
                            />
                          </div>
                          <p className="text-[8.5px] font-medium text-zinc-500 block leading-tight text-right font-sans">
                            Session auto-expires after 15 mins
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div className="pt-2">
                {!isAdminLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminEntry(true);
                      setAdminError("");
                    }}
                    className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 font-bold text-[10px] uppercase font-mono rounded-lg tracking-wider transition text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <span>Admin Passcode Login</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("legal");
                        setTimeout(() => {
                          const element = document.getElementById("legal-sub-navigation");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="flex-1 py-1.5 px-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-[10px] rounded-lg transition text-center cursor-pointer select-none font-sans flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3 h-3 text-zinc-700 dark:text-zinc-300 shrink-0" />
                      <span>Manage Tools</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogOutAdmin}
                      className="py-1.5 px-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] rounded-lg transition text-center cursor-pointer select-none font-sans"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Advocacy Disclaimer Box */}
            <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-2 text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300 shadow-xs flex flex-col justify-between" id="sidebar-global-advocacy-disclaimer">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-sans">
                  <Scale className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0" />
                  <span>Important Notice</span>
                </div>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 font-sans leading-normal">
                  This platform is made to help consumers learn. Before buying any real insurance policy, please read the official documents of the insurance company carefully.
                </p>
              </div>
              <p className="text-zinc-500 font-sans font-medium text-[10.5px]">
                This is a helper tool. Always check with an insurance agent or support team before making final decisions or purchasing.
              </p>
            </div>

            {/* Useful Consumer Portals Link Reference Box */}
            <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3.5 text-xs text-zinc-600 dark:text-zinc-400 flex flex-col justify-between">
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block flex items-center gap-1.5 font-sans border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <Info className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
                  Official Handbook Portals
                </span>
                
                <div className="space-y-2.5 pt-2">
                  <a
                    href="https://www.irda.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-800 dark:text-zinc-200 hover:underline flex items-center justify-between font-semibold transition text-[11px]"
                  >
                    <span>IRDAI Regulatory Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </a>
                  <a
                    href="https://www.policyholder.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-800 dark:text-zinc-200 hover:underline flex items-center justify-between font-semibold transition text-[11px]"
                  >
                    <span>Policyholder Education</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </a>
                  <a
                    href="https://www.igms.irda.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-800 dark:text-zinc-200 hover:underline flex items-center justify-between font-semibold transition text-[11px]"
                  >
                    <span>Grievance Central Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  </a>
                </div>
              </div>
              <div className="text-[10px] text-zinc-400 pt-2 font-sans font-medium">
                References are direct Indian government resources.
              </div>
            </div>

            {/* Latest App Updates Widget */}
            <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3 text-xs text-zinc-700 dark:text-zinc-300 flex flex-col justify-between" id="sidebar-app-updates-widget">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 font-sans">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                    </span>
                    <span>System Release Log</span>
                  </span>
                  <span className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-extrabold px-1.5 py-0.5 rounded">
                    v{currentAppVersion}
                  </span>
                </div>
                
                <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-0.5 relative pt-1.5" id="release-log-container">
                  {releaseLogs.length === 0 ? (
                    <div className="text-[10px] text-zinc-400 py-4 text-center font-sans tracking-wide">
                      Querying server-side telemetry registry...
                    </div>
                  ) : (
                    releaseLogs.slice(0, 3).map((log, idx) => (
                      <div key={log.label} className={`text-[10px] space-y-1 ${idx > 0 ? "pt-2 border-t border-zinc-100 dark:border-zinc-800" : ""}`}>
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-zinc-900 dark:text-zinc-100 font-bold font-sans leading-tight">{log.label}</span>
                          <span className="text-[8px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1 py-0.2 rounded shrink-0">
                            {log.version}
                          </span>
                        </div>
                        <p className="text-zinc-500 leading-tight font-normal text-[9px]">
                          {log.desc}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1.5 text-[8px] text-zinc-400 leading-relaxed font-sans">
                ⚖️ Sourced under Sec 43A of India's IT Act.
              </div>
            </div>

          </div>

          {/* Clean Minimalist Footer Block */}
          <footer className="space-y-5 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="bg-white dark:bg-[#121215] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 md:p-6 text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed space-y-4">
              <div className="text-center space-y-1">
                <p className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm">BimaCompass — Consumer Advocacy Project</p>
                <p className="max-w-2xl mx-auto text-zinc-500 leading-normal">
                  Directly synthesized in alignment with regulatory advice in public interest from the official IRDA handbook.
                </p>
              </div>

              {/* Two-Column Legal Desk and Sources Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-left">
                
                {/* Column 1: Lawyer's Copyright & Fair Use Statement */}
                <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold font-sans text-[11px] uppercase tracking-wider">
                    <Scale className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0" />
                    <span>Legal Disclosures & Privacy Statement</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    This platform is a 100% free, non-monetized consumer literacy index operating with a serverless static architecture. All calculations, choices, and definitions are compiled completely on-device. No PII is collected.
                  </p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-normal font-sans">
                    Guarded under <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">Section 52 of the Indian Copyright Act, 1957</strong> and <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">17 U.S. Code § 107</strong>. View our Legal tab for full details.
                  </p>
                </div>

                {/* Column 2: Sources of the Tool */}
                <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold font-sans text-[11px] uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0" />
                    <span>Official Sources of Information</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Sourced directly from authenticated public-domain documents:
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-zinc-400 shrink-0 select-none">•</span>
                      <span><strong className="text-zinc-800 dark:text-zinc-200 font-bold font-sans">IRDAI Handbook:</strong> Consumer Education Series booklets.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-zinc-400 shrink-0 select-none">•</span>
                      <span><strong className="text-zinc-800 dark:text-zinc-200 font-bold font-sans">Corporate Policy Downloads:</strong> Standard commercial policy wordings and SFSP clauses.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-zinc-400 shrink-0 select-none">•</span>
                      <span><strong className="text-zinc-800 dark:text-zinc-200 font-bold font-sans">Consumer Precedents:</strong> Official judicial orders and reports from consumer forums.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Sub-footer note */}
              <div className="pt-2 text-center text-[10px] text-zinc-400 font-mono font-semibold tracking-wider">
                NON-PROFIT CIVIL INITIATIVE • OPEN ACCESS CONSUMER PROJECT
              </div>
            </div>
          </footer>

        </div>

      </main>

      {/* Dynamic Security Integrity Floating Alert */}
      {securityToast && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-20 left-6 z-50 bg-zinc-950 border border-zinc-700 text-white rounded-xl shadow-2xl p-3.5 max-w-xs sm:max-w-sm font-sans flex items-start gap-2.5 overflow-hidden"
          id="security-integrity-toast"
        >
          <div className="text-zinc-300 font-extrabold text-base shrink-0 select-none">🛡️</div>
          <div className="space-y-0.5">
            <span className="text-[9px] font-extrabold font-mono text-zinc-400 uppercase tracking-widest leading-none block">System Shield</span>
            <p className="text-[10.5px] text-zinc-200 leading-normal font-medium font-sans">
              {securityToast}
            </p>
          </div>
        </motion.div>
      )}

      {/* Dynamic Immersive Admin Login Overlay */}
      {showAdminEntry && !isAdminLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" id="admin-login-overlay-backdrop">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl relative overflow-hidden p-6 sm:p-7 space-y-5"
            id="admin-login-overlay-modal"
          >
            {/* Header Lock Icon & Titles */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">ADMINISTRATOR AUTHENTICATION</h3>
                <span className="text-[9px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full inline-block">
                  Protected Sandbox
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto font-sans leading-relaxed">
                Enter your administrative passcode to unlock editing modes and tool settings.
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleAdminVerify} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-mono">
                    Passcode:
                  </label>
                  <span className="text-[9px] text-zinc-400 font-mono">(default: adminbima)</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder={lockoutTime > Date.now() ? "SYSTEM ACCESS INHIBITED" : "••••••••"}
                  disabled={lockoutTime > Date.now()}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`w-full p-2.5 border rounded-lg text-xs font-mono outline-hidden tracking-widest transition-colors ${
                    lockoutTime > Date.now()
                      ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 text-zinc-400 select-none cursor-not-allowed"
                      : "bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100"
                  }`}
                  autoFocus
                />
              </div>

              {/* Countdown lock representation */}
              {lockoutTime > Date.now() && (
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-700 dark:text-zinc-300">
                    <span className="font-bold uppercase">Lockout Active</span>
                    <span>Remaining: {Math.max(0, Math.ceil((lockoutTime - Date.now()) / 1000))}s</span>
                  </div>
                </div>
              )}

              {/* Password credentials reject warning */}
              {adminError && !lockoutTime && (
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono text-center font-bold tracking-wide rounded-lg">
                  {adminError}
                </div>
              )}

              {/* Verification Buttons */}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminEntry(false);
                    setAdminError("");
                    setPasscode("");
                  }}
                  className="px-3.5 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={lockoutTime > Date.now()}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 select-none ${
                    lockoutTime > Date.now()
                      ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white cursor-pointer"
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Authorize</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
