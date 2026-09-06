import React, { useState, useEffect } from "react";
import { X, Upload, XCircle } from "lucide-react";
import Image from "next/image";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "event" | "patent" | "publication" | "project" | "product" | "research" | "funding";
  initialData?: any;
  onSave?: (data: any) => void;
}

export default function AddContentModal({ isOpen, onClose, title, type, initialData, onSave }: AddContentModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setImages(initialData.images || []);
      } else {
        setFormData({ category: "Organized Program" }); // default category
        setImages([]);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const remainingSlots = 3 - images.length;
      const filesToProcess = files.slice(0, remainingSlots);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, images: images.length > 0 ? images : undefined };
    
    if (type === "product" && typeof finalData.tech === "string") {
      finalData.tech = finalData.tech.split(",").map((t: string) => t.trim());
    }
    
    if (type === "patent" && typeof finalData.inventors === "string") {
      finalData.inventors = finalData.inventors.split(",").map((t: string) => t.trim());
    }
    
    if (onSave) {
      onSave(finalData);
    } else {
      alert("This will save to Firebase once the configuration is added!");
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-border">
        <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5 text-foreground/70" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Common Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {type === "product" ? "Product Name" : "Title"}
            </label>
            <input 
              type="text" 
              name={type === "product" ? "name" : "title"}
              value={type === "product" ? (formData.name || "") : (formData.title || "")}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder={`Enter ${type} ${type === "product" ? "name" : "title"}`}
            />
          </div>

          {/* Type Specific Fields */}
          {type === "event" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input 
                  type="text" 
                  name="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. Oct 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. MKCE Campus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select 
                  name="category"
                  value={formData.category || "Organized Program"}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                >
                  <option>Organized Program</option>
                  <option>Workshop</option>
                  <option>FDP / STC / ISRO Course</option>
                  <option>Seminar & Training</option>
                </select>
              </div>
            </>
          )}

          {type === "product" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <input 
                  type="text" 
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. Healthcare Diagnostic Tool"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <input 
                    type="text" 
                    name="status"
                    value={formData.status || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. Commercialized"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Year</label>
                  <input 
                    type="number" 
                    name="year"
                    value={formData.year || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. 2024"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  name="tech"
                  value={Array.isArray(formData.tech) ? formData.tech.join(", ") : (formData.tech || "")}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, tech: e.target.value }))}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. React, Python, AI"
                />
              </div>
            </>
          )}

          {type === "patent" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Inventors (comma separated)</label>
                <input 
                  type="text" 
                  name="inventors"
                  value={Array.isArray(formData.inventors) ? formData.inventors.join(", ") : (formData.inventors || "")}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, inventors: e.target.value }))}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. Dr. John Doe, Jane Smith"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Patent Number</label>
                  <input 
                    type="text" 
                    name="patentNumber"
                    value={formData.patentNumber || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. US1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. India"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status || "Filed"}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    <option>Granted</option>
                    <option>Published</option>
                    <option>Filed</option>
                    <option>Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                  <input 
                    type="text" 
                    name="grantDate"
                    value={formData.grantDate || formData.filingDate || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. Jan 2024"
                  />
                </div>
              </div>
            </>
          )}

          {type === "funding" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Organization</label>
                <input 
                  type="text" 
                  name="organization"
                  value={formData.organization || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. DRDO"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Principal Investigator</label>
                  <input 
                    type="text" 
                    name="investigator"
                    value={formData.investigator || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. Dr. Meivel S"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Years Applied</label>
                  <input 
                    type="text" 
                    name="yearsApplied"
                    value={formData.yearsApplied || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. 2021, 2022"
                  />
                </div>
              </div>
            </>
          )}

          {type === "project" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                  <input 
                    type="text" 
                    name="role"
                    value={formData.role || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. Principal Investigator"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Funding Agency</label>
                  <input 
                    type="text" 
                    name="fundingAgency"
                    value={formData.fundingAgency || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. DST / DRDO"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Amount</label>
                  <input 
                    type="text" 
                    name="amount"
                    value={formData.amount || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. Rs. 5,00,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Duration</label>
                  <input 
                    type="text" 
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. 2023 - 2025"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status || "Ongoing"}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Domain</label>
                  <input 
                    type="text" 
                    name="domain"
                    value={formData.domain || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="e.g. IoT / Drones"
                  />
                </div>
              </div>
            </>
          )}

          {/* Image Upload for Events and Products */}
          {(type === "event" || type === "product") && (
            <div className="pt-2">
              <label className="block text-sm font-medium text-foreground mb-2 flex justify-between">
                <span>Images (Max 3)</span>
                <span className="text-xs text-foreground/50">{images.length}/3 uploaded</span>
              </label>
              
              <div className="flex gap-3 mb-3">
                {images.map((imgSrc, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group">
                    <Image src={imgSrc} alt="Preview" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XCircle className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
                
                {images.length < 3 && (
                  <label className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                    <Upload className="w-5 h-5 text-foreground/50 mb-1" />
                    <span className="text-[10px] text-foreground/50">Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description / Details</label>
            <textarea 
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none resize-none"
              placeholder="Enter details..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6 sticky bottom-0 bg-card">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-foreground bg-accent hover:bg-accent/80 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
