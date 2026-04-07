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
          {/* Hamburger button - left side on mobile */}
          <button
            id="mobile-menu-btn"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          <a href="#" className="logo">swift<span>logix</span></a>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#track">Track Shipment</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
          <div className="nav-buttons">
            <button className="btn btn-outline">Log In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
            <li><a href="#track" onClick={() => setMobileMenuOpen(false)}>Track Shipment</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
          </ul>
          <div className="mobile-menu-buttons">
            <button className="btn btn-outline w-full">Log In</button>
            <button className="btn btn-primary w-full">Sign Up</button>
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
              <img src="/hero.png" alt="Logistics Delivery" className="w-full rounded-3xl" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl text-left border border-black/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-primary">
                <i className="fa-regular fa-clock fa-2x"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Track Every Shipment in Real Time</h3>
              <p>Stay updated on your cargo's exact location with instant tracking notifications.</p>
            </div>
            {/* Repeat for other service cards */}
          </div>
        </div>
      </section>

      <section className="track-section py-24 bg-white" id="track">
        <div className="container">
          <div className="max-w-3xl mx-auto p-16 bg-slate-50 rounded-[30px] text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-3">Track Your <span className="text-sky-500">Shipment</span></h2>
            <p className="mb-10">Enter your tracking number below to see the real-time status of your package.</p>
            <form onSubmit={handleTrack} className="flex gap-4 mb-10 justify-center">
              <div className="relative flex-grow max-w-md">
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
              <button type="submit" disabled={loading} className="btn btn-primary">
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
              <div className="text-left bg-white p-8 rounded-2xl animate-in slide-in-from-bottom-5 duration-500 mt-8">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                    shipmentData.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                    shipmentData.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                    'bg-sky-100 text-sky-800'
                  }`}>
                    {shipmentData.status}
                  </span>
                  <h3 className="font-bold text-lg">#{shipmentData.trackingId}</h3>
                </div>
                <div className="space-y-0">
                  {shipmentData.updates && shipmentData.updates.length > 0 ? (
                    shipmentData.updates.map((update: any, idx: number) => (
                      <div key={update.id} className="flex gap-6 relative opacity-100">
                        <div className="w-24 shrink-0 text-sm font-semibold text-slate-500 text-right pt-0.5">
                          {new Date(update.timestamp).toLocaleDateString()}<br/>
                          <span className="font-normal text-slate-400">{new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className={`relative pl-8 pb-8 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:rounded-full before:ring-4 ${
                          idx === 0 ? 'before:bg-sky-500 before:ring-sky-100 border-l-2 border-sky-200' : 'before:bg-slate-300 before:ring-slate-100 border-l-2 border-slate-100'
                        } last:border-transparent last:pb-0`}>
                          <p className="font-bold text-slate-800 text-base">{update.status}</p>
                          <p className="text-slate-500 mt-1 leading-relaxed">{update.location}<br/>{update.description && <span className="text-sm font-medium text-slate-400">{update.description}</span>}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-6 relative opacity-100">
                      <div className="w-24 shrink-0 text-sm font-semibold text-slate-500 text-right pt-0.5">Just now</div>
                      <div className="relative pl-8 pb-0 before:absolute before:left-[-5px] before:top-1.5 before:w-3 before:h-3 before:bg-slate-300 before:rounded-full before:ring-4 before:ring-slate-100 border-transparent">
                        <p className="font-bold text-slate-800">Pending Request</p>
                        <p className="text-slate-500 mt-1">Shipment created at origin facility: {shipmentData.currentLocation}</p>
                      </div>
                    </div>
                  )}
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
