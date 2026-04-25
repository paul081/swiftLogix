"use client";

import { useState, useEffect } from "react";
import { createShipment, getAllShipments, addTrackingUpdate, deleteShipment, updateShipment, updateTrackingUpdate, deleteTrackingUpdate } from "../actions";

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

  // Edit Shipment State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  // Edit Checkpoint State
  const [editingCheckpointId, setEditingCheckpointId] = useState<string | null>(null);
  const [editCheckpointForm, setEditCheckpointForm] = useState<any>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment? This action cannot be undone.")) return;
    const res = await deleteShipment(id);
    if (res.success) fetchShipments();
    else alert("Error: " + res.error);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateShipment(editingId!, editForm);
    if (res.success) {
      setEditingId(null);
      fetchShipments();
    } else alert("Error: " + res.error);
  };

  const handleSaveCheckpointEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateTrackingUpdate(editingCheckpointId!, editCheckpointForm);
    if (res.success) {
      setEditingCheckpointId(null);
      fetchShipments();
    } else alert("Error: " + res.error);
  };

  const handleDeleteCheckpoint = async (id: string) => {
    if (!confirm("Delete this checkpoint?")) return;
    const res = await deleteTrackingUpdate(id);
    if (res.success) fetchShipments();
    else alert("Error: " + res.error);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <header className="mb-10 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 font-outfit">SwiftLogix Admin</h1>
            <p className="text-slate-500 mt-1">Manage shipments and full tracking history</p>
          </div>
          <button className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-700 transition-colors">
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 space-y-2">
            <button onClick={() => setActiveTab("create")} className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all ${activeTab === 'create' ? 'bg-sky-500 text-white shadow-md shadow-sky-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
              <i className="fa-solid fa-plus mr-3"></i> Create Shipment
            </button>
            <button onClick={() => setActiveTab("manage")} className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all ${activeTab === 'manage' ? 'bg-sky-500 text-white shadow-md shadow-sky-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
              <i className="fa-solid fa-box-open mr-3"></i> Manage Shipments
            </button>
          </aside>

          <main className="md:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
            {activeTab === "create" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold text-slate-800">Register New Shipment</h2>
                </div>
                {successMessage && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 font-medium text-center">{successMessage}</div>}
                <form onSubmit={handleCreateShipment} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Sender Name</label>
                      <input type="text" value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Recipient Name</label>
                      <input type="text" value={formData.recipientName} onChange={e => setFormData({...formData, recipientName: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Origin Location</label>
                      <input type="text" value={formData.currentLocation} onChange={e => setFormData({...formData, currentLocation: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Weight (kg)</label>
                      <input type="text" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none" required />
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200 w-full md:w-auto">
                    {isSubmitting ? "Generating ID..." : "Create & Generate ID"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "manage" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8 flex justify-between items-center border-b pb-4">
                  <h2 className="text-2xl font-bold text-slate-800">Active Shipments</h2>
                  <div className="relative">
                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" placeholder="Search tracking ID..." className="pl-10 p-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                </div>

                {loadingShipments ? (
                  <div className="text-center py-10 text-slate-500"><i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading...</div>
                ) : (
                  <div className="space-y-8">
                    {shipments.map(s => (
                      <div key={s.id} className="border border-slate-200 rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-300 border-l-8 border-l-sky-500">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            {editingId === s.id ? (
                              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl mb-4">
                                <input className="p-2 border rounded" value={editForm.senderName} onChange={e => setEditForm({...editForm, senderName: e.target.value})} />
                                <input className="p-2 border rounded" value={editForm.recipientName} onChange={e => setEditForm({...editForm, recipientName: e.target.value})} />
                                <button onClick={handleSaveEdit} className="bg-emerald-500 text-white p-2 rounded font-bold">Save</button>
                                <button onClick={() => setEditingId(null)} className="bg-slate-300 p-2 rounded font-bold">Cancel</button>
                              </div>
                            ) : (
                              <>
                                <h3 className="font-bold text-2xl text-slate-800">#{s.trackingId}</h3>
                                <p className="text-slate-500 mt-1 font-medium">{s.senderName} → {s.recipientName}</p>
                              </>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <button onClick={() => { setEditingId(s.id); setEditForm({...s}); }} className="text-slate-400 hover:text-sky-500"><i className="fa-solid fa-pen"></i></button>
                            <button onClick={() => handleDelete(s.id)} className="text-slate-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                          </div>
                        </div>

                        {/* Full History Section */}
                        <div className="mb-8">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tracking History</p>
                          <div className="space-y-4">
                            {s.updates.map((update: any) => (
                              <div key={update.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-start group">
                                {editingCheckpointId === update.id ? (
                                  <div className="flex-1 space-y-2">
                                    <input className="w-full p-2 border rounded text-sm" value={editCheckpointForm.location} onChange={e => setEditCheckpointForm({...editCheckpointForm, location: e.target.value})} />
                                    <input className="w-full p-2 border rounded text-sm" value={editCheckpointForm.description} onChange={e => setEditCheckpointForm({...editCheckpointForm, description: e.target.value})} />
                                    <div className="flex gap-2">
                                      <button onClick={handleSaveCheckpointEdit} className="text-xs bg-emerald-500 text-white px-3 py-1 rounded font-bold">Save</button>
                                      <button onClick={() => setEditingCheckpointId(null)} className="text-xs bg-slate-300 text-white px-3 py-1 rounded font-bold">Cancel</button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex-1">
                                      <p className="font-bold text-slate-700 text-sm">{update.status} at {update.location}</p>
                                      <p className="text-slate-500 text-xs mt-1">{update.description}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => { setEditingCheckpointId(update.id); setEditCheckpointForm({...update}); }} className="text-slate-400 hover:text-sky-500 text-xs"><i className="fa-solid fa-pen-nib"></i></button>
                                      <button onClick={() => handleDeleteCheckpoint(update.id)} className="text-slate-400 hover:text-red-500 text-xs"><i className="fa-solid fa-trash-can"></i></button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
                          <p className="font-bold text-sky-800 mb-4 flex items-center gap-2"><i className="fa-solid fa-plus-circle"></i> Add New History Point</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Location" required className="p-3 rounded-xl border-white outline-none focus:ring-2 focus:ring-sky-500" value={updateForm.shipmentId === s.id ? updateForm.location : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, location: e.target.value})} />
                            <select className="p-3 rounded-xl border-white outline-none focus:ring-2 focus:ring-sky-500 bg-white" required value={updateForm.shipmentId === s.id ? updateForm.status : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, status: e.target.value})}>
                              <option value="" disabled>Select Status...</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="On Hold">On Hold</option>
                            </select>
                          </div>
                          <textarea placeholder="Description of this update..." required className="w-full p-3 rounded-xl border-white outline-none focus:ring-2 focus:ring-sky-500 mb-4 h-20" value={updateForm.shipmentId === s.id ? updateForm.description : ""} onChange={e => setUpdateForm({...updateForm, shipmentId: s.id, description: e.target.value})}></textarea>
                          <button type="submit" disabled={isUpdating && updateForm.shipmentId === s.id} className="bg-sky-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-600 transition-all w-full md:w-auto">
                            {isUpdating && updateForm.shipmentId === s.id ? "Adding..." : "Add Checkpoint"}
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
