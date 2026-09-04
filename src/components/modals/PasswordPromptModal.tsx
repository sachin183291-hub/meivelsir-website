import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PasswordPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasswordPromptModal({ isOpen, onClose, onSuccess }: PasswordPromptModalProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(pin);
    if (success) {
      setPin("");
      setError("");
      onSuccess();
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-border relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-accent rounded-full transition-colors">
          <X className="w-5 h-5 text-foreground/70" />
        </button>
        
        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Admin Access</h2>
            <p className="text-foreground/60 text-sm">Enter the PIN to modify content.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center text-xl tracking-[0.5em]"
                maxLength={4}
                autoFocus
              />
              {error && <p className="text-destructive text-sm text-center font-medium">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
