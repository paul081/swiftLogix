"use client";

import { useState, useEffect } from "react";
import { createShipment, getAllShipments, addTrackingUpdate } from "../actions";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    currentLocation: "",
    weight: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [shipments, setShipments] = useState<any[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    shipmentId: "", location: "", status: "", description: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (activeTab === "manage") fetchShipments();
  }, [activeTab]);

  const fetchShipments = async () => {
    setLoadingShipments(true);
    const res = await getAllShipments();
    if (res.success) setShipments(res.data || []);
    setLoadingShipments(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const res = await addTrackingUpdate(updateForm);
    setIsUpdating(false);
    if (res.success) {
      alert("Checkpoint added successfully!");
      setUpdateForm({ shipmentId: "", location: "", status: "", description: "" });
      fetchShipments();
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    
    const response = await createShipment(formData);
    
    setIsSubmitting(false);
    if (response && response.success) {
      setSuccessMessage(`Success! Shipment created with tracking ID: #${response.trackingId}`);
      setFormData({ senderName: "", recipientName: "", currentLocation: "", weight: "" });
    } else {
      alert("Error: " + (response?.error || "Failed to create shipment"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="mb-10 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">SwiftLogix Admin</h1>
            <p className="text-slate-500 mt-1">Manage shipments and update tracking statuses</p>
          </div>
          <button className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition-colors">
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab("create")}
              className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all ${activeTab === 'create' ? 'bg-sky-500 text-white shadow-md shadow-sky-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <i className="fa-solid fa-plus mr-3"></i> Create Shipment
            </button>
            <button 
              onClick={() => setActiveTab("manage")}
              className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all ${activeTab === 'manage' ? 'bg-sky-500 text-white shadow-md shadow-sky-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <i className="fa-solid fa-box-open mr-3"></i> Manage Shipments
            </button>
          </aside>

          <main className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
            {activeTab === "create" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold text-slate-800">Register New Shipment</h2>
                  <p className="text-slate-500">Generate a tracking number and input origin/destination details.</p>
                </div>

                {successMessage && (
                  <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 font-medium text-center">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={handleCreateShipment} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Sender Name</label>
                      <input type="text" value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. Acme Corp" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Recipient Name</label>
                      <input type="text" value={formData.recipientName} onChange={e => setFormData({...formData, recipientName: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. John Doe" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Origin / Current Location</label>
                      <input type="text" value={formData.currentLocation} onChange={e => setFormData({...formData, currentLocation: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. New York Facility" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Weight (kg)</label>
                      <input type="text" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. 5.5" required />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200 flex items-center justify-center gap-2">
                      {isSubmitting ? "Generating ID..." : <><i className="fa-solid fa-paper-plane"></i> Create & Generate ID</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "manage" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 flex justify-between items-center border-b pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Active Shipments</h2>
                    <p className="text-slate-500">Update tracking locations and status codes.</p>
                  </div>
                  <div className="relative">
                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" placeholder="Search tracking ID..." className="pl-10 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>

                {/* Active Shipments List */}
                {loadingShipments ? (
                  <div className="text-center py-10 font-medium text-slate-500">
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading shipments...
                  </div>
                ) : shipments.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-sky-500">
                      <i className="fa-solid fa-box-archive fa-lg"></i>
                    </div>
                    <h3 className="font-semibold text-slate-700 text-lg">No Shipments Found</h3>
                    <p className="text-slate-500">Create a shipment to start tracking.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {shipments.map(s => (
                      <div key={s.id} className="border border-slate-200 rounded-xl p-6 bg-white hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-sky-500">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-slate-800">#{s.trackingId}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">
                              <i className="fa-solid fa-truck-fast text-slate-400 mr-2"></i> 
                              {s.senderName} <i className="fa-solid fa-arrow-right mx-1 text-slate-300"></i> {s.recipientName}
                            </p>
                          </div>
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
                            {s.status}
                          </span>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="bg-slate-50 p-5 rounded-lg mt-4 border border-slate-200 text-sm">
                          <p className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-thumbtack text-sky-500"></i> Add New Checkpoint
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Location (e.g. Miami Port)" required className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" value={updateForm.shipmentId === s.id ? updateForm.location : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, location: e.target.value})} />
                            <select className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white" required value={updateForm.shipmentId === s.id ? updateForm.status : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, status: e.target.value})}>
                              <option value="" disabled>Select Status...</option>
                              <option value="Pending">Pending</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <input type="text" placeholder="Description (e.g. Package arrived at local sorting facility and is being processed)" required className="p-3 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" value={updateForm.shipmentId === s.id ? updateForm.description : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, description: e.target.value})} />
                          </div>
                          <button type="submit" disabled={isUpdating || updateForm.shipmentId !== s.id} className="bg-slate-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50">
                            {isUpdating && updateForm.shipmentId === s.id ? "Pushing Update..." : "Push Update"}
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
