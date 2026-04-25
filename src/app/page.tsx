"use client";

import { useState } from "react";
import Image from "next/image";
import { fetchShipmentData } from "./actions";

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setShowResult(false);
    
    const response = await fetchShipmentData(trackingId);
    
    setLoading(false);
    if (response && response.success) {
      setShipmentData(response.data);
      setShowResult(true);
    } else {
      setErrorMsg(response?.error || "Error fetching tracking data.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav id="navbar">
        <div className="container">
          {/* Logo - always visible */}
          <a href="#" className="logo">swift<span>logix</span></a>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#track">Track Shipment</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>

          {/* Desktop buttons */}
          <div className="nav-buttons">
            <button className="btn btn-outline">Log In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>

          {/* Hamburger button - RIGHT side on mobile */}
          <button
            id="mobile-menu-btn"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open-top' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open-mid' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open-bot' : ''}`}></span>
          </button>
        </div>

        {/* Mobile dropdown menu - overlays content */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
            <li><a href="#track" onClick={() => setMobileMenuOpen(false)}>Track Shipment</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
          </ul>
          <div className="mobile-menu-buttons">
            <button className="btn btn-outline">Log In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </nav>

      <header className="hero pt-40 pb-24" id="home">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <div className="hero-content">
              <h1 className="text-6xl font-bold leading-tight mb-6">Effortless Logistics,<br />Every Step of the Way.</h1>
              <p className="text-lg mb-10 max-w-lg">Manage your shipments, track in real-time, and get the best rates—all from one platform.</p>
              <div className="flex gap-4">
                <button className="btn btn-primary">Get a Free Quote</button>
                <button className="btn btn-outline">Learn More</button>
              </div>
            </div>
            <div className="hero-image relative">
              <Image 
                src="/hero.png" 
                alt="Logistics Delivery" 
                width={1000} 
                height={800} 
                priority
                className="w-full h-auto rounded-3xl object-cover" 
              />
            </div>
          </div>
        </div>
      </header>

      <section className="services bg-slate-50 py-24" id="services">
        <div className="container text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Three main <span className="text-sky-500">services</span></h2>
            <p className="max-w-2xl mx-auto text-gray-500">Our app gives you unparalleled visibility into your entire logistics network. Whether you're managing a single delivery or overseeing thousands, you can track the exact location of every shipment in real time.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-10 rounded-2xl border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <i className="fa-regular fa-clock fa-2x"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Track Every Shipment in Real Time</h3>
                <p className="text-gray-600">Stay updated on your cargo's exact location with instant tracking notifications.</p>
              </div>
              
              <div className="bg-white p-10 rounded-2xl border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <i className="fa-solid fa-shield-halved fa-2x"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Secure & Reliable Transport</h3>
                <p className="text-gray-600">We ensure your packages are handled with the utmost care and highest security standards.</p>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm">
                <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <i className="fa-solid fa-globe fa-2x"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Global Network Reach</h3>
                <p className="text-gray-600">Ship anywhere in the world seamlessly with our extensive international partner network.</p>
              </div>
            </div>
            
            <div className="hidden lg:block relative h-full min-h-[600px] w-full">
              <Image 
                src="/truck.png" 
                alt="Delivery Truck" 
                fill
                className="rounded-3xl object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="track-section py-24 bg-white" id="track">
        <div className="container px-2 sm:px-6">
          <div className="max-w-3xl mx-auto p-4 sm:p-8 md:p-16 bg-slate-50 rounded-[30px] text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-3">Track Your <span className="text-sky-500">Shipment</span></h2>
            <p className="mb-10">Enter your tracking number below to see the real-time status of your package.</p>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <div className="relative flex-grow max-w-md w-full mx-auto">
                <i className="fa-solid fa-box-open absolute left-5 top-1/2 -translate-y-1/2 text-primary"></i>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Tracking Number (e.g. SLX12345678)"
                  className="w-full py-4 pl-14 pr-5 rounded-xl border-2 border-white bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                  required
                />
              </div>
                <button type="submit" disabled={loading} className="btn btn-primary whitespace-nowrap">
                {loading ? 'Searching...' : 'Track Package'}
              </button>
            </form>

            {errorMsg && (
              <div className="text-left mt-8 p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-4">
                <i className="fa-solid fa-circle-exclamation mt-1"></i>
                <p className="font-medium text-lg">{errorMsg}</p>
              </div>
            )}

            {showResult && shipmentData && (
              <div className="text-left bg-white p-6 sm:p-10 rounded-[32px] shadow-2xl shadow-sky-900/5 animate-in slide-in-from-bottom-8 duration-700 mt-12 border border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                  <div>
                    <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Shipment Status</p>
                    <h3 className="font-outfit text-2xl font-bold text-slate-800">#{shipmentData.trackingId}</h3>
                  </div>
                  <div className={`px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${
                    shipmentData.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                    shipmentData.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    shipmentData.status === 'On Hold' ? 'bg-red-50 text-red-600 border border-red-100' :
                    'bg-sky-50 text-sky-600 border border-sky-100'
                  }`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      shipmentData.status === 'Delivered' ? 'bg-emerald-500' : 
                      shipmentData.status === 'Pending' ? 'bg-amber-500' : 
                      shipmentData.status === 'On Hold' ? 'bg-red-500' :
                      'bg-sky-500'
                    }`}></span>
                    {shipmentData.status}
                  </div>
                </div>

                <div className="relative pl-4 sm:pl-0">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] sm:left-[111px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

                  <div className="space-y-10">
                    {shipmentData.updates && shipmentData.updates.length > 0 ? (
                      shipmentData.updates.map((update: any, idx: number) => (
                        <div key={update.id} className="flex flex-col sm:flex-row gap-6 sm:gap-12 relative group">
                          {/* Timestamp */}
                          <div className="w-full sm:w-24 shrink-0 text-left sm:text-right pt-1 pl-12 sm:pl-0">
                            <p className="text-sm font-bold text-slate-800">{new Date(update.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                            <p className="text-xs font-medium text-slate-400">{new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>

                          {/* Icon Node */}
                          <div className={`absolute left-0 sm:left-[100px] top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                            idx === 0 ? 'bg-sky-500 text-white ring-8 ring-sky-50 scale-110' : 'bg-white text-slate-300 border-2 border-slate-100 ring-4 ring-white'
                          }`}>
                            <i className={`text-[10px] sm:text-xs fa-solid ${
                              update.status === 'Delivered' ? 'fa-check' :
                              update.status === 'Out for Delivery' ? 'fa-truck-ramp-box' :
                              update.status === 'In Transit' ? 'fa-truck-fast' :
                              update.status === 'On Hold' ? 'fa-circle-pause' :
                              'fa-box-open'
                            }`}></i>
                          </div>

                          {/* Content */}
                          <div className="pl-12 sm:pl-0 flex-1">
                            <h4 className={`font-bold text-lg mb-1 transition-colors ${idx === 0 ? 'text-slate-800' : 'text-slate-500'}`}>
                              {update.status}
                            </h4>
                            <p className="text-slate-500 text-sm sm:text-base font-medium mb-1">{update.location}</p>
                            {update.description && (
                              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                                {update.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 relative">
                        <div className="w-full sm:w-24 shrink-0 text-left sm:text-right pt-1 pl-12 sm:pl-0">
                          <p className="text-sm font-bold text-slate-800">Just now</p>
                        </div>
                        <div className="absolute left-0 sm:left-[100px] top-0 w-6 h-6 sm:w-8 sm:h-8 bg-sky-500 text-white rounded-full flex items-center justify-center z-10 ring-8 ring-sky-50">
                          <i className="fa-solid fa-box-open text-[10px] sm:text-xs"></i>
                        </div>
                        <div className="pl-12 sm:pl-0 flex-1">
                          <h4 className="font-bold text-lg text-slate-800 mb-1">Pending Request</h4>
                          <p className="text-slate-500 text-sm sm:text-base font-medium">Origin: {shipmentData.currentLocation}</p>
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Your shipment request has been received and is waiting to be processed.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-16 border-t bg-white mt-12">
        <div className="container flex flex-wrap justify-between items-center gap-5">
          <a href="#" className="logo">swift<span>logix</span></a>
          <p>© 2026 SwiftLogix. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
