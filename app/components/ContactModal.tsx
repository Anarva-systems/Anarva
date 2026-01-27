"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[40px] p-12 shadow-2xl z-[101]"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-2">Let's create.</h2>
            <p className="text-slate-500 mb-8">Briefly describe your vision below.</p>
            
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              <textarea placeholder="Tell us about your project" rows={4} className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              <button className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}