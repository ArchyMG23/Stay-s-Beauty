/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { defaultAppContent } from './defaultData';
import { AppContent, GalleryItem, PricingItem } from './types';

const isMediaVideo = (url?: string): boolean => {
  if (!url) return false;
  if (url.startsWith('data:video/')) return true;
  const lowercase = url.toLowerCase();
  return (
    lowercase.includes('.mp4') || 
    lowercase.includes('.webm') || 
    lowercase.includes('.ogg') || 
    lowercase.includes('.mov') ||
    lowercase.startsWith('data:video/')
  );
};

const StayBeautyLogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer circle for luxury framing */}
    <circle cx="50" cy="50" r="44" stroke="url(#goldGradientLogo)" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="41" stroke="url(#goldGradientLogo)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
    
    {/* Hair Waves & Side Face Profile - Professional Vector Contours */}
    <g stroke="url(#goldGradientLogo)" strokeLinecap="round" strokeLinejoin="round">
      {/* Face profile facing right: forehead, nose, lips, chin, neck */}
      <path 
        d="M54 30 C55.5 32 56 34.5 56.5 36.5 C57 38.5 58.5 39.5 59.5 40 C60.2 40.5 61.2 40.8 61.2 41.5 C61.2 42 60 42.5 59.5 42.8 C59 43.2 59.5 43.5 60 43.8 C60.5 44 60 44.8 59 45.2 C58 45.5 57.5 46.5 57.8 47.5 C58 48.5 57 49.5 56 50.5 C54.5 52 53.5 54.5 53 58" 
        strokeWidth="2.2" 
      />
      {/* Elegant eyelash */}
      <path d="M57.5 38.2 C58.2 38.5 58.8 38.5 59.2 38" strokeWidth="1.2" />

      {/* Behind the neck / shoulder curve */}
      <path d="M47 62 C48.5 64 51.5 65.5 54.5 64 C57 62.8 58 59 62 58" strokeWidth="2" />

      {/* Main luxurious wavy hair strands flowing on the left and behind her */}
      <path d="M48 24 C38.5 24 33 29.5 33 39.5 C33 47.5 36.5 52.5 34.5 56.5 C33 59.5 34.8 63 37 62 C39 61 38 55.5 41 55.5 C43 55.5 42.5 61.5 39.5 63.5 C37.5 65 39.5 69 42 63.5 C44.5 58 45.5 51 47 51" strokeWidth="2" />
      <path d="M44 26.5 C37.5 29.5 35 34.5 35.5 42 C36 49.5 38 53.5 37.5 57" strokeWidth="1.5" />
      <path d="M51.5 24.5 C46.5 27 44.5 32 44.5 37.5 C44.5 43 45.5 47 47 51 C48 51 51 53 52.5 51 C53.5 49.5 52.5 46.5 52.5 44.5 C52.5 43.5 53.5 42.5 54.2 43.5 C55 44.5 57 44.8 58.5 44 C59.5 43.5 59.5 41.5 61.5 41.5" strokeWidth="1.6" />
      <path d="M50.5 33.5 C47.5 35.5 46.5 39 46.5 42.5" strokeWidth="1.2" />
      <path d="M41 40 C41.5 45 43.5 48.5 45 52" strokeWidth="1" />
    </g>
    
    <defs>
      <linearGradient id="goldGradientLogo" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#DFBA5A" />
        <stop offset="25%" stopColor="#FFF6CC" />
        <stop offset="50%" stopColor="#C99F3B" />
        <stop offset="75%" stopColor="#FFF2A3" />
        <stop offset="100%" stopColor="#9C751F" />
      </linearGradient>
    </defs>
  </svg>
);

// Unsplash Preset choices to make the "No-Code image replacement" super easy and fast
const IMAGE_PRESETS = [
  {
    category: "Onglerie",
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    label: "Manucure Rose & French tips"
  },
  {
    category: "Onglerie",
    url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600",
    label: "Nail Art Marbré & Or"
  },
  {
    category: "Onglerie",
    url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600",
    label: "Nude Chrome Intemporel"
  },
  {
    category: "Coiffure",
    url: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600",
    label: "Box Braids Premium"
  },
  {
    category: "Coiffure",
    url: "https://images.unsplash.com/photo-1647897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    label: "Nattes collées graphiques"
  },
  {
    category: "Coiffure",
    url: "https://images.unsplash.com/photo-1595959183075-c1d945103580?auto=format&fit=crop&q=80&w=600",
    label: "Goddess Braids Protectrices"
  },
  {
    category: "Lace Frontals",
    url: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=600",
    label: "Lace Install Lisse Miroir"
  },
  {
    category: "Lace Frontals",
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
    label: "Pose Lace Lisse Naturelle"
  },
  {
    category: "Lace Frontals",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    label: "Perruque Bouclée Couture"
  },
  {
    category: "Ambiance",
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200",
    label: "Salon de coiffure de luxe - Hero"
  },
  {
    category: "Ambiance",
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    label: "Accueil - Intérieur Chic"
  }
];

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackType: 'hero' | 'nails' | 'hair' | 'lace' | 'salon') => {
  const fallbacks = {
    hero: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200", 
    nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600", 
    hair: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600", 
    lace: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=600", 
    salon: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
  };
  
  const target = e.currentTarget;
  if (!target.dataset.hasFailed) {
    target.dataset.hasFailed = "true";
    target.src = fallbacks[fallbackType];
  } else if (target.dataset.hasFailed === "true") {
    target.dataset.hasFailed = "twice";
    target.src = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500";
  }
};

export default function App() {
  // Page content state backed by localStorage
  const [content, setContent] = useState<AppContent>(defaultAppContent);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passError, setPassError] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // UI filter and navigation states
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'all' | 'nails' | 'hair' | 'lace'>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  
  // CMS status notification / modal
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imagePickerActive, setImagePickerActive] = useState<{
    type: 'hero' | 'service' | 'gallery' | 'about';
    index?: number;
  } | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');

  // Load content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('stays_beauty_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AppContent;
        
        // Auto-heal known broken or low-quality Unsplash IDs from previous sessions
        if (parsed.hero && parsed.hero.imageUrl && (parsed.hero.imageUrl.includes("photo-1560066984-138dadb4c035") || !parsed.hero.imageUrl)) {
          parsed.hero.imageUrl = "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200";
        }
        if (parsed.services) {
          parsed.services.forEach(s => {
            if (s.imageUrl && s.imageUrl.includes("photo-1605497746444-ac9dbd324ce8")) {
              s.imageUrl = "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600";
            }
            if (s.imageUrl && s.imageUrl.includes("photo-1492106087820-71f1a00d2b11")) {
              s.imageUrl = "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=600";
            }
          });
        }
        if (parsed.gallery) {
          parsed.gallery.forEach(g => {
            if (g.imageUrl && g.imageUrl.includes("photo-1519014816548-bf5fe059798b")) {
              g.imageUrl = "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600";
            }
            if (g.imageUrl && g.imageUrl.includes("photo-1582095133179-bdfb51201554")) {
              g.imageUrl = "https://images.unsplash.com/photo-1647897903246-719242758050?auto=format&fit=crop&q=80&w=600";
            }
          });
        }
        
        // Ensure facebook and updated instagram handles are correctly merged and healed
        if (parsed.contact) {
          if (!parsed.contact.facebookName || parsed.contact.facebookName.includes("alta_")) {
            parsed.contact.facebookName = "stacy.altamira";
            parsed.contact.facebookUrl = "https://www.facebook.com/stacy.altamira";
          }
          if (!parsed.contact.instagramName || parsed.contact.instagramName.includes("alta_")) {
            parsed.contact.instagramName = "stacy.altamira";
            parsed.contact.instagramUrl = "https://www.instagram.com/stacy.altamira";
          }
        }
        
        setContent(parsed);
      } catch (e) {
        console.error("Erreur de lecture du localStorage :", e);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // CMS login handler
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsEditMode(true);
      setIsAdminModalOpen(false);
      setPassword('');
      setPassError('');
      showToast("🔐 Mode Édition No-Code activé ! Vous pouvez éditer les textes et modifier les images.");
    } else {
      setPassError("Mot de passe incorrect. Astuce : utilisez 'admin123'");
    }
  };

  // Save changes to localStorage
  const handleSaveChanges = () => {
    try {
      localStorage.setItem('stays_beauty_content', JSON.stringify(content));
      showToast("💾 Les modifications ont été sauvegardées avec succès dans votre navigateur !");
    } catch (e: any) {
      console.error("Quota exceeded or error setting localStorage:", e);
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        showToast("⚠️ Le fichier importé est trop lourd pour la sauvegarde permanente du navigateur (>5 Mo). Réduisez sa taille ou utilisez une URL.");
      } else {
        showToast("❌ Erreur lors de la sauvegarde : " + e.message);
      }
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser tout le site ? Tous vos changements seront perdus.")) {
      localStorage.removeItem('stays_beauty_content');
      setContent(defaultAppContent);
      showToast("🔄 Le design original a été restauré avec succès !");
    }
  };

  // Text edits update handlers
  const handleFieldChange = (path: string, val: string) => {
    setContent(prev => {
      const updated = { ...prev };
      const parts = path.split('.');
      let current: any = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = val;
      return updated;
    });
  };

  const handleServiceChange = (index: number, field: 'title' | 'category' | 'description', val: string) => {
    setContent(prev => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: val };
      return { ...prev, services };
    });
  };

  const handlePricingItemChange = (catIndex: number, itemIndex: number, field: keyof PricingItem, val: string) => {
    setContent(prev => {
      const pricing = [...prev.pricing];
      const items = [...pricing[catIndex].items];
      items[itemIndex] = { ...items[itemIndex], [field]: val };
      pricing[catIndex] = { ...pricing[catIndex], items };
      return { ...prev, pricing };
    });
  };

  const handlePricingCategoryNameChange = (catIndex: number, val: string) => {
    setContent(prev => {
      const pricing = [...prev.pricing];
      pricing[catIndex] = { ...pricing[catIndex], name: val };
      return { ...prev, pricing };
    });
  };

  const handleGalleryItemChange = (index: number, field: 'title' | 'description', val: string) => {
    setContent(prev => {
      const gallery = [...prev.gallery];
      gallery[index] = { ...gallery[index], [field]: val };
      return { ...prev, gallery };
    });
  };

  const handleAboutStatChange = (statIndex: number, field: 'label' | 'value', val: string) => {
    setContent(prev => {
      const stats = [...prev.about.stats];
      stats[statIndex] = { ...stats[statIndex], [field]: val };
      return { ...prev, about: { ...prev.about, stats } };
    });
  };

  // Add / Delete pricing items for robust CMS feel
  const handleAddPricingItem = (catIndex: number) => {
    setContent(prev => {
      const pricing = [...prev.pricing];
      const newItem: PricingItem = {
        id: `custom-price-${Date.now()}`,
        name: "Nouveau Service",
        description: "Description courte de la prestation royale.",
        price: "10 000 FCFA"
      };
      pricing[catIndex] = {
        ...pricing[catIndex],
        items: [...pricing[catIndex].items, newItem]
      };
      return { ...prev, pricing };
    });
    showToast("✨ Prestation ajoutée au menu ! Cliquez pour personnaliser.");
  };

  const handleDeletePricingItem = (catIndex: number, itemIndex: number) => {
    setContent(prev => {
      const pricing = [...prev.pricing];
      const items = [...pricing[catIndex].items];
      items.splice(itemIndex, 1);
      pricing[catIndex] = { ...pricing[catIndex], items };
      return { ...prev, pricing };
    });
    showToast("🗑️ Prestation supprimée du menu.");
  };

  // Image editing handler
  const triggerImageChange = (type: 'hero' | 'service' | 'gallery' | 'about', index?: number) => {
    setImagePickerActive({ type, index });
    // Initialize input with current image url
    let currentUrl = '';
    if (type === 'hero') currentUrl = content.hero.imageUrl;
    else if (type === 'about') currentUrl = content.about.imageUrl;
    else if (type === 'service' && index !== undefined) currentUrl = content.services[index].imageUrl;
    else if (type === 'gallery' && index !== undefined) currentUrl = content.gallery[index].imageUrl;
    
    setCustomImageUrl(currentUrl);
  };

  const saveImageChange = (urlToSave: string) => {
    if (!urlToSave) {
      showToast("⚠️ Veuillez spécifier ou sélectionner une URL.");
      return;
    }

    setContent(prev => {
      const updated = { ...prev };
      if (imagePickerActive) {
        const { type, index } = imagePickerActive;
        if (type === 'hero') {
          updated.hero.imageUrl = urlToSave;
        } else if (type === 'about') {
          updated.about.imageUrl = urlToSave;
        } else if (type === 'service' && index !== undefined) {
          updated.services[index].imageUrl = urlToSave;
        } else if (type === 'gallery' && index !== undefined) {
          updated.gallery[index].imageUrl = urlToSave;
        }
      }
      return updated;
    });

    setImagePickerActive(null);
    setCustomImageUrl('');
    showToast("📸 Image mise à jour avec succès dans l'interface !");
  };

  const handleFileRead = (file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      showToast("⚠️ Ce fichier dépasse la limite recommandée de 25 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        saveImageChange(result);
        showToast(`📲 Fichier "${file.name}" importé ! N'oubliez pas de sauvegarder.`);
      }
    };
    reader.onerror = () => {
      showToast("❌ Impossible de lire ce fichier.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  // Filtered gallery items
  const filteredGallery = content.gallery.filter(item => {
    if (activeGalleryFilter === 'all') return true;
    return item.category === activeGalleryFilter;
  });

  return (
    <div id="top-view" className="min-h-screen selection:bg-gold-200 selection:text-gold-900 leading-normal scroll-smooth">
      
      {/* HEADER BAR FOR CMS STATUS */}
      {isEditMode && (
        <div id="cms-top-banner" className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-white text-center py-2.5 px-4 text-xs font-medium uppercase tracking-wider sticky top-0 z-50 shadow-md flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
            <i className="fa-solid fa-lock-open mr-1"></i> Mode Édition No-Code Actif
          </span>
          <span className="hidden md:inline font-sans font-normal normal-case">
            Cliquez directement sur n'importe quel texte ou prix pour le modifier. Au survol d'une image, cliquez sur le bouton <strong class="underline">"Changer"</strong>.
          </span>
          <div className="flex gap-2">
            <button 
              id="cms-save-btn-top"
              onClick={handleSaveChanges} 
              className="bg-neutral-900 border border-gold-300 hover:bg-neutral-800 text-gold-300 px-3 py-1 rounded font-bold cursor-pointer transition-all uppercase text-[10px]"
            >
              Sauvegarder
            </button>
            <button 
              id="cms-exit-btn-top"
              onClick={() => {
                setIsEditMode(false);
                showToast("🔒 Mode aperçu client activé.");
              }} 
              className="bg-white/20 hover:bg-white/35 text-white px-3 py-1 rounded font-semibold cursor-pointer transition-all text-[10px]"
            >
              Fermer l'Admin
            </button>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <header id="main-header" className={`w-full z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-rose-brand-100 shadow-sm ${isEditMode ? 'top-[42px]' : 'sticky top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <StayBeautyLogoIcon className="w-11 h-11 shrink-0" />
            <div 
              onDoubleClick={() => setIsAdminModalOpen(true)}
              className="group cursor-pointer relative flex flex-col justify-center text-left"
              title="Double-cliquez pour activer le Mode Édition"
            >
              <h1 
                id="header-logo-text"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('logoName', e.currentTarget.textContent || '')}
                className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-gold-600 outline-none leading-none"
              >
                {content.logoName}
              </h1>
              <span className="text-[9px] font-mono tracking-[0.25em] text-gold-600 uppercase leading-none mt-1 select-none font-bold">
                feel beautiful
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300"></span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#specialités" className="hover:text-gold-500 transition-colors uppercase text-xs">Services</a>
            <a href="#tarifs" className="hover:text-gold-500 transition-colors uppercase text-xs">Tarifs</a>
            <a href="#galerie" className="hover:text-gold-500 transition-colors uppercase text-xs">Galerie</a>
            <a href="#notre-histoire" className="hover:text-gold-500 transition-colors uppercase text-xs">L'Institut</a>
            <a href="#contact" className="hover:text-gold-500 transition-colors uppercase text-xs">Moyens d'accès</a>
          </nav>

          {/* CTA & ACCÈS GÉRANT */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              id="header-whatsapp-cta"
              href={content.contact.whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <i className="fa-brands fa-whatsapp mr-2 text-sm"></i> Prendre RDV
            </a>
          </div>

          {/* MOBILE BURGER */}
          <button 
            id="mobile-menu-burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-800 p-2 text-xl focus:outline-none transition-colors"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* MOBILE DRAWER MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-rose-brand-100 overflow-hidden"
            >
              <div className="px-5 py-6 flex flex-col gap-4 text-sm font-medium text-slate-700">
                <a href="#specialités" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-500 transition-all">Nos Prestations Signatures</a>
                <a href="#tarifs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-500 transition-all">Menu des Tarifs</a>
                <a href="#galerie" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-500 transition-all">Galerie de Réalisations</a>
                <a href="#notre-histoire" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-500 transition-all">Notre Philosophie</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-500 transition-all">Horaires & Contact</a>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a 
                    id="mobile-drawer-whatsapp-btn"
                    href={content.contact.whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="bg-gold-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm uppercase text-xs"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Réserver via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-b from-rose-brand-100/40 via-gold-50/10 to-transparent py-14 lg:py-24 overflow-hidden">
        {/* Abstract luxury accent background */}
        <div className="absolute right-0 top-0 w-96 h-[400px] bg-gradient-to-bl from-gold-100/30 to-rose-brand-200/20 blur-3xl rounded-full -z-10"></div>
        <div className="absolute left-1/4 bottom-10 w-80 h-80 bg-gold-200/10 blur-3xl rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Special Badge wrapper */}
              <div className="inline-flex items-center gap-2 bg-white border border-rose-brand-200 px-3.5 py-1.5 rounded-full shadow-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <span 
                  id="hero-badge-interactive"
                  contentEditable={isEditMode}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleFieldChange('hero.badge', e.currentTarget.textContent || '')}
                  className="text-[10px] sm:text-xs font-bold tracking-widest text-gold-600 uppercase font-sans"
                >
                  {content.hero.badge}
                </span>
              </div>
              
              <h2 
                id="hero-title-interactive"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('hero.title', e.currentTarget.textContent || '')}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1] mb-6 outline-none"
              >
                {content.hero.title}
              </h2>
              
              <p 
                id="hero-subtitle-interactive"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('hero.subtitle', e.currentTarget.textContent || '')}
                className="text-slate-600 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed max-w-2xl font-sans"
              >
                {content.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a 
                  id="hero-primary-cta-btn"
                  href={content.contact.whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase shadow-lg text-center flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5"
                >
                  <i className="fa-brands fa-whatsapp text-lg text-green-400"></i>
                  <span
                    contentEditable={isEditMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      e.stopPropagation();
                      handleFieldChange('hero.ctaPrimary', e.currentTarget.textContent || '');
                    }}
                  >
                    {content.hero.ctaPrimary}
                  </span>
                </a>

                <a 
                  id="hero-secondary-cta-btn"
                  href="#tarifs" 
                  className="bg-white hover:bg-gold-50/50 border border-gold-300 text-slate-800 px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase text-center transition-all hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <span
                    contentEditable={isEditMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      e.stopPropagation();
                      handleFieldChange('hero.ctaSecondary', e.currentTarget.textContent || '');
                    }}
                  >
                    {content.hero.ctaSecondary}
                  </span>
                </a>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative retro square gold overlay */}
                <div className="absolute -inset-1.5 border-2 border-gold-400 rounded-3xl translate-x-3 translate-y-3 -z-10"></div>
                
                {/* Image Wrap */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl group border border-rose-brand-100 aspect-[4/5]">
                  {isMediaVideo(content.hero.imageUrl) ? (
                    <video 
                      id="hero-image-display"
                      src={content.hero.imageUrl} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      id="hero-image-display"
                      src={content.hero.imageUrl} 
                      alt="Salon de coiffure et onglerie de prestige" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'hero')}
                    />
                  )}
                  
                  {/* Overlay shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>

                  {/* CMS image picker button */}
                  {isEditMode && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        id="cms-change-hero-img-btn"
                        onClick={() => triggerImageChange('hero')}
                        className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-4 rounded-full text-xs shadow-lg uppercase transition-all flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-camera"></i> Changer l'image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION SERVICES */}
      <section id="specialités" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title Center */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Prestations Signatures</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              Des rituels de beauté exclusifs conçus pour vous magnifier
            </h3>
            <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service, index) => {
              // Custom icons to support beauty salon visual guidelines
              const iconClass = index === 0 ? "fa-solid fa-wand-magic-sparkles" : index === 1 ? "fa-solid fa-scissors" : "fa-solid fa-gem";
              return (
                <div 
                  id={`service-card-${index}`}
                  key={service.id} 
                  className="bg-rose-brand-50/10 border border-rose-brand-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Photo wrapper */}
                    <div className="relative rounded-xl overflow-hidden aspect-video mb-5 shadow-xs bg-slate-100">
                      {isMediaVideo(service.imageUrl) ? (
                        <video 
                          src={service.imageUrl} 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img 
                          src={service.imageUrl} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, service.category === 'ONGLERIE' ? 'nails' : service.category === 'LACE FRONTALS' ? 'lace' : 'hair')}
                        />
                      )}
                      {/* Edit image trigger */}
                      {isEditMode && (
                        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            id={`cms-change-service-img-${index}`}
                            onClick={() => triggerImageChange('service', index)}
                            className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-1.5 px-3 rounded-full text-[10px] shadow-md uppercase transition-all"
                          >
                            <i className="fa-solid fa-camera mr-1"></i> Changer
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-xs">
                        <i className={iconClass}></i>
                      </span>
                      <span 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleServiceChange(index, 'category', e.currentTarget.textContent || '')}
                        className="text-[10px] font-bold uppercase tracking-wider text-gold-600 outline-none"
                      >
                        {service.category}
                      </span>
                    </div>

                    <h4 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleServiceChange(index, 'title', e.currentTarget.textContent || '')}
                      className="font-serif text-lg sm:text-xl font-bold text-slate-950 mb-3 outline-none"
                    >
                      {service.title}
                    </h4>

                    <p 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleServiceChange(index, 'description', e.currentTarget.textContent || '')}
                      className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 outline-none"
                    >
                      {service.description}
                    </p>
                  </div>

                  <a 
                    id={`service-booking-link-${index}`}
                    href={content.contact.whatsappUrl} 
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-xs font-bold text-slate-900 hover:text-gold-600 uppercase tracking-wide flex items-center gap-1 transition-colors mt-2"
                  >
                    Demander ce service <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION TARIFS & MENU DES PRIX */}
      <section id="tarifs" className="py-20 bg-rose-brand-50/40 relative">
        {/* Background designs */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold-200/5 blur-3xl -z-10"></div>
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-rose-brand-200/10 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">La Carte de l'Institut</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              Nos Tarifs & Formules Créations
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Des tarifs tout doux, affichés en Francs CFA (FCFA) pour des prestations haut de gamme sans compromis.
            </p>
            <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4 animate-pulse"></div>
          </div>

          {/* Pricing categories cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {content.pricing.map((category, catIdx) => (
              <div 
                id={`pricing-card-cat-${catIdx}`}
                key={category.id} 
                className="bg-white border border-rose-brand-100 rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Visual elegant gold ribbon */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400"></div>

                {/* Pricing category title */}
                <div className="flex items-center justify-between mb-8">
                  <h4 
                    contentEditable={isEditMode}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handlePricingCategoryNameChange(catIdx, e.currentTarget.textContent || '')}
                    className="font-serif text-lg lg:text-xl font-bold text-slate-950 uppercase tracking-wide outline-none"
                  >
                    {category.name}
                  </h4>
                  <span className="w-7 h-7 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center text-xs">
                    <i className={catIdx === 0 ? "fa-solid fa-hands" : catIdx === 1 ? "fa-solid fa-scissors" : "fa-solid fa-crown"}></i>
                  </span>
                </div>

                {/* Items pricing list */}
                <div className="flex flex-col gap-6">
                  {category.items.map((item, itemIdx) => (
                    <div id={`pricing-item-entry-${catIdx}-${itemIdx}`} key={item.id} className="group relative pr-6">
                      <div className="flex items-baseline justify-between gap-2">
                        {/* Title & Name */}
                        <span 
                          contentEditable={isEditMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handlePricingItemChange(catIdx, itemIdx, 'name', e.currentTarget.textContent || '')}
                          className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-gold-600 transition-colors font-sans outline-none"
                        >
                          {item.name}
                        </span>
                        
                        {/* Dotted separator line */}
                        <span className="grow border-b border-dashed border-slate-200 h-1"></span>

                        {/* Price */}
                        <span 
                          contentEditable={isEditMode}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handlePricingItemChange(catIdx, itemIdx, 'price', e.currentTarget.textContent || '')}
                          className="font-bold text-xs sm:text-sm text-gold-600 font-sans tracking-wide shrink-0 outline-none"
                        >
                          {item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handlePricingItemChange(catIdx, itemIdx, 'description', e.currentTarget.textContent || '')}
                        className="text-slate-500 text-[11px] sm:text-xs mt-1 leading-relaxed max-w-[85%] outline-none"
                      >
                        {item.description}
                      </p>

                      {/* Deletion button if CMS active */}
                      {isEditMode && (
                        <button 
                          id={`cms-delete-price-item-${catIdx}-${itemIdx}`}
                          onClick={() => handleDeletePricingItem(catIdx, itemIdx)}
                          className="absolute -right-2 top-0 text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          title="Supprimer cette prestation"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add new entry button for CMS mode */}
                {isEditMode && (
                  <div className="mt-8 pt-4 border-t border-slate-100 text-center">
                    <button 
                      id={`cms-add-price-item-${catIdx}`}
                      onClick={() => handleAddPricingItem(catIdx)}
                      className="bg-gold-50 hover:bg-gold-100 text-gold-700 text-[11px] font-bold uppercase tracking-wider py-2 px-4 rounded-xl border border-dashed border-gold-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus font-bold"></i> Ajouter une prestation
                    </button>
                  </div>
                )}

                {/* Small CTA at the bottom */}
                <div className="mt-8 pt-4 border-t border-slate-50 text-center">
                  <a 
                    id={`pricing-whatsapp-link-${catIdx}`}
                    href={content.contact.whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-[10px] font-bold text-slate-500 hover:text-gold-600 uppercase tracking-widest transition-colors flex items-center justify-center gap-1"
                  >
                    <i className="fa-brands fa-whatsapp text-green-500 text-xs"></i> Réserver cette catégorie
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION PORTFOLIO / GALERIE */}
      <section id="galerie" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Le Book Stay's Beauty</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              Nos Réalisations & Inspirations
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3">
              Découvrez les créations de nos expertes. Des ongles scintillants, des nattes protectrices graphiques et des lace frontals indétectables.
            </p>
            <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4"></div>
          </div>

          {/* Filtering tabs */}
          <div id="gallery-taps-container" className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button 
              id="gallery-tab-all"
              onClick={() => setActiveGalleryFilter('all')}
              className={`px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${activeGalleryFilter === 'all' ? 'bg-gold-500 text-white shadow-md' : 'bg-rose-brand-50 hover:bg-gold-100 text-slate-700'}`}
            >
              Tous
            </button>
            <button 
              id="gallery-tab-nails"
              onClick={() => setActiveGalleryFilter('nails')}
              className={`px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${activeGalleryFilter === 'nails' ? 'bg-gold-500 text-white shadow-md' : 'bg-rose-brand-50 hover:bg-gold-100 text-slate-700'}`}
            >
              Onglerie
            </button>
            <button 
              id="gallery-tab-hair"
              onClick={() => setActiveGalleryFilter('hair')}
              className={`px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${activeGalleryFilter === 'hair' ? 'bg-gold-500 text-white shadow-md' : 'bg-rose-brand-50 hover:bg-gold-100 text-slate-700'}`}
            >
              Tresses & Coiffures
            </button>
            <button 
              id="gallery-tab-lace"
              onClick={() => setActiveGalleryFilter('lace')}
              className={`px-5 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${activeGalleryFilter === 'lace' ? 'bg-gold-500 text-white shadow-md' : 'bg-rose-brand-50 hover:bg-gold-100 text-slate-700'}`}
            >
              Lace Frontals
            </button>
          </div>

          {/* Grid of gallery assets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => {
                // Find actual index in the original array to preserve state editing binds
                const originalIndex = content.gallery.findIndex(g => g.id === item.id);
                return (
                  <motion.div
                    id={`gallery-item-card-${item.id}`}
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-rose-brand-50/5 border border-rose-brand-100/60 rounded-2xl overflow-hidden group shadow-xs hover:shadow-lg transition-transform duration-300 cursor-pointer aspect-square flex flex-col justify-end"
                  >
                    {/* Real asset image block */}
                    {isMediaVideo(item.imageUrl) ? (
                      <video 
                        src={item.imageUrl} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, item.category === 'nails' ? 'nails' : item.category === 'lace' ? 'lace' : 'hair')}
                      />
                    )}
                    
                    {/* Gradient shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="relative p-5 z-10 flex flex-col items-start text-left text-white w-full">
                      <span className="bg-gold-500/90 text-[9px] font-bold px-2 py-0.5 rounded-full text-white tracking-widest uppercase mb-1.5">
                        {item.category === 'nails' ? 'Onglerie' : item.category === 'hair' ? 'Tresses' : 'Lace Frontal'}
                      </span>
                      
                      <h5 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          e.stopPropagation();
                          handleGalleryItemChange(originalIndex, 'title', e.currentTarget.textContent || '');
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="font-serif text-lg font-bold leading-snug outline-none text-white hover:text-gold-200"
                      >
                        {item.title}
                      </h5>

                      <p 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          e.stopPropagation();
                          handleGalleryItemChange(originalIndex, 'description', e.currentTarget.textContent || '');
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-200 text-xs mt-1 font-sans line-clamp-2 outline-none hover:text-gold-100"
                      >
                        {item.description}
                      </p>

                      {/* Zoom Trigger Button */}
                      <button 
                        id={`gallery-zoom-trigger-${item.id}`}
                        onClick={() => setActiveLightboxItem(item)}
                        className="mt-3 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 text-xs transition-colors self-end flex items-center justify-center h-8 w-8 z-20"
                        title="Zoomer sur la photo"
                      >
                        <i className="fa-solid fa-expand"></i>
                      </button>
                    </div>

                    {/* CMS mode Image Changer */}
                    {isEditMode && (
                      <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button 
                          id={`cms-change-gallery-img-${originalIndex}`}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            triggerImageChange('gallery', originalIndex);
                          }}
                          className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-4 rounded-full text-[11px] shadow-lg uppercase transition-all"
                        >
                          <i className="fa-solid fa-camera mr-1"></i> Remplacer Photo
                        </button>
                      </div>
                    )}

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SECTION L'INSTITUT - NOTRE HISTOIRE */}
      <section id="notre-histoire" className="py-20 bg-rose-brand-50/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* TEXT COLUMN */}
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">La Maison de Beauté</span>
              
              <h3 
                id="about-title-interactive"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('about.title', e.currentTarget.textContent || '')}
                className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-950 outline-none mb-6"
              >
                {content.about.title}
              </h3>

              <div className="w-16 h-[2px] bg-gold-400 mb-6"></div>

              <p 
                id="about-desc1-interactive"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('about.description1', e.currentTarget.textContent || '')}
                className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 outline-none font-sans"
              >
                {content.about.description1}
              </p>

              <p 
                id="about-desc2-interactive"
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleFieldChange('about.description2', e.currentTarget.textContent || '')}
                className="text-slate-600 text-sm sm:text-base leading-relaxed outline-none font-sans mb-8"
              >
                {content.about.description2}
              </p>

              {/* Stats bento rows */}
              <div className="grid grid-cols-2 gap-4">
                {content.about.stats.map((stat, sIndex) => (
                  <div id={`about-stat-item-${sIndex}`} key={sIndex} className="bg-white border border-rose-brand-100/50 rounded-2xl p-4 shadow-xs text-left">
                    <p 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleAboutStatChange(sIndex, 'value', e.currentTarget.textContent || '')}
                      className="font-serif text-2xl font-black text-gold-600 tracking-tight outline-none"
                    >
                      {stat.value}
                    </p>
                    <p 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleAboutStatChange(sIndex, 'label', e.currentTarget.textContent || '')}
                      className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1 outline-none"
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ART WORK / BEAUTIFUL IMAGE */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Vintage decorative border accent */}
                <div className="absolute -inset-2 border border-gold-300 rounded-[2.5rem] rotate-1 translate-x-1 translate-y-1 -z-10"></div>
                
                {/* Main rounded graphic frame */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-square border-4 border-white bg-slate-100 group">
                  {isMediaVideo(content.about.imageUrl) ? (
                    <video 
                      src={content.about.imageUrl} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={content.about.imageUrl} 
                      alt="Salons de soins esthétiques de prestige" 
                      className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, 'salon')}
                    />
                  )}

                  {/* CMS image picker button */}
                  {isEditMode && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        id="cms-change-about-img-btn"
                        onClick={() => triggerImageChange('about')}
                        className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-4 rounded-full text-xs shadow-lg uppercase transition-all"
                      >
                        <i className="fa-solid fa-camera mr-1"></i> Remplacer l'image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION TESTIMONIALS (Avis de nos Reines) */}
      <section id="testimonials-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Témoignages</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900">
              L'Expérience Stay's Beauty racontée par nos Reines
            </h3>
            <div className="w-16 h-[2px] bg-gold-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((test, tIndex) => (
              <div 
                id={`testimonial-card-${tIndex}`}
                key={test.id} 
                className="bg-rose-brand-100/10 border border-rose-brand-100/60 p-6 rounded-2xl flex flex-col justify-between text-left relative"
              >
                {/* Quote decoration */}
                <span className="absolute top-4 right-6 text-rose-brand-300 text-6xl font-serif leading-none select-none opacity-40">“</span>
                
                <div>
                  {/* Rating Stars */}
                  <div className="flex text-gold-500 gap-1 mb-4 select-none">
                    {[...Array(test.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-xs"></i>
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-sans italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-rose-brand-100/40">
                  <div className="w-8 h-8 rounded-full bg-gold-250 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-slate-900">{test.name}</h5>
                    <p className="text-[10px] text-slate-500 font-medium">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION ACCÈS & CONTACT */}
      <section id="contact" className="py-20 bg-rose-brand-50/10 border-t border-rose-brand-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* ADDRESS & DETAILS */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">Nous Trouver & Réserver</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-slate-900 mb-6">
                  Prenez Soin de Vous Dès Aujourd'hui
                </h3>
                <div className="w-16 h-[2px] bg-gold-400 mb-8"></div>
              </div>

              {/* Custom styled contact points */}
              <div className="flex flex-col gap-6">
                
                {/* Adresse */}
                <div className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-map-location-dot"></i>
                  </span>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Adresse</h5>
                    <p 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleFieldChange('contact.address', e.currentTarget.textContent || '')}
                      className="text-xs sm:text-sm text-slate-800 font-sans mt-0.5 outline-none font-medium leading-relaxed"
                    >
                      {content.contact.address}
                    </p>
                  </div>
                </div>

                {/* Téléphone & Réservation */}
                <div className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Téléphone & WhatsApp</h5>
                    <a 
                      href={`tel:${content.contact.phone}`} 
                      className="block text-xs sm:text-sm text-slate-900 font-bold hover:text-gold-600 transition-colors mt-0.5"
                    >
                      {content.contact.phoneFormatted}
                    </a>
                    <p className="text-[10px] text-slate-400 font-medium">Recommandé : Réservez directement par message WhatsApp</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Adresse Email</h5>
                    <a 
                      href={`mailto:${content.contact.email}`} 
                      className="block text-xs sm:text-sm text-slate-800 hover:text-gold-600 transition-colors mt-0.5 font-medium"
                    >
                      {content.contact.email}
                    </a>
                  </div>
                </div>

                {/* Réseaux Sociaux */}
                <div className="flex gap-4">
                  <span className="w-10 h-10 shrink-0 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-hashtag"></i>
                  </span>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">Réseaux Sociaux</h5>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <a 
                        href={content.contact.instagramUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="text-xs sm:text-sm text-slate-800 hover:text-gold-600 transition-colors font-semibold flex items-center gap-1.5"
                      >
                        <i className="fa-brands fa-instagram text-rose-500"></i> Instagram : @{content.contact.instagramName}
                      </a>
                      <a 
                        href={content.contact.facebookUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="text-xs sm:text-sm text-slate-800 hover:text-gold-600 transition-colors font-semibold flex items-center gap-1.5"
                      >
                        <i className="fa-brands fa-facebook text-blue-600"></i> Facebook : {content.contact.facebookName}
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* CTA button contact footer action */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a 
                  id="contact-whatsapp-big-cta"
                  href={content.contact.whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-md hover:-translate-y-0.5 transition-transform uppercase text-xs tracking-wider"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i> Discuter sur WhatsApp pour votre pose
                </a>
              </div>
            </div>

            {/* HORAIRES CARD */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-rose-brand-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/20 rounded-full translate-x-12 -translate-y-12 blur-xl"></div>
                
                <div className="text-left">
                  <span className="text-[10px] font-bold tracking-widest text-gold-600 uppercase flex items-center gap-1.5 mb-2">
                    <i className="fa-solid fa-clock"></i> Horaires d'Ouverture
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                    Venez vous faire chouchouter
                  </h4>

                  <div className="flex flex-col gap-5">
                    
                    {/* Mardi au Vendredi */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="font-semibold text-xs sm:text-sm text-slate-700">Mardi au Vendredi</span>
                      <span 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleFieldChange('contact.hoursWeekdays', e.currentTarget.textContent || '')}
                        className="font-bold text-xs sm:text-sm text-gold-600 tracking-wide outline-none"
                      >
                        {content.contact.hoursWeekdays}
                      </span>
                    </div>

                    {/* Samedi */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="font-semibold text-xs sm:text-sm text-slate-700">Samedi (Journée continue)</span>
                      <span 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleFieldChange('contact.hoursSaturday', e.currentTarget.textContent || '')}
                        className="font-bold text-xs sm:text-sm text-gold-600 tracking-wide outline-none"
                      >
                        {content.contact.hoursSaturday}
                      </span>
                    </div>

                    {/* Dimanche */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="font-semibold text-xs sm:text-sm text-slate-700">Dimanche</span>
                      <span 
                        contentEditable={isEditMode}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleFieldChange('contact.hoursSunday', e.currentTarget.textContent || '')}
                        className="font-bold text-xs sm:text-sm text-gold-600 tracking-wide outline-none"
                      >
                        {content.contact.hoursSunday}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 italic text-left mt-2 block">
                      * Note : Le salon est fermé le lundi pour la désinfection complète des équipements et l'affûtage des outils d'onglerie et coiffure.
                    </p>

                  </div>
                </div>

                {/* Simulated booking fast form widget (non-db to avoid crash, directly opens WhatsApp with details) */}
                <div id="quick-form-widget" className="mt-8 bg-rose-brand-100/20 p-5 rounded-2xl text-left border border-rose-brand-100/40">
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-3">Estimation Rapide de Rendez-Vous</h5>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const nom = (form.elements.namedItem('form-nom') as HTMLInputElement).value;
                      const presta = (form.elements.namedItem('form-presta') as HTMLSelectElement).value;
                      const dateVal = (form.elements.namedItem('form-date') as HTMLInputElement).value;
                      const msg = `Bonjour Stay's Beauty ! Je souhaite prendre RDV pour une prestation de : ${presta}. Je m'appelle ${nom} et je serais disponible vers le ${dateVal}. Merci !`;
                      window.open(`${content.contact.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <input 
                      id="form-nom"
                      name="form-nom"
                      type="text" 
                      placeholder="Votre nom" 
                      required 
                      className="bg-white border border-rose-brand-100 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    />
                    <select 
                      id="form-presta"
                      name="form-presta"
                      required
                      className="bg-white border border-rose-brand-100 px-3 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    >
                      <option value="Onglerie / Manucure">Onglerie / Manucure</option>
                      <option value="Tresses / Coiffure Africaine">Tresses & Coiffures</option>
                      <option value="Pose Lace Frontal / Perruque">Pose de Lace Frontal</option>
                      <option value="Soin complet">Soin Royal Complet</option>
                    </select>
                    <button 
                      id="form-submit-booking-btn"
                      type="submit" 
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wide transition-colors cursor-pointer"
                    >
                      Envoyer <i className="fa-solid fa-paper-plane text-[9px] ml-1"></i>
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="main-footer" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Salon Intro */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-4">
                <StayBeautyLogoIcon className="w-8 h-8 shrink-0" />
                <div className="flex flex-col text-left">
                  <h4 className="font-serif text-lg font-bold text-white tracking-wide leading-none">{content.logoName}</h4>
                  <span className="text-[8px] font-mono tracking-wider text-gold-500 uppercase leading-none mt-1">feel beautiful</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans mb-4">
                La référence de l'onglerie d'art, des tresses protectrices soignées et de la pose de perruques invisibles de haute qualité.
              </p>
              
              {/* Social Channels */}
              <div className="flex gap-4 mt-2">
                <a 
                  id="social-instagram-link"
                  href={content.contact.instagramUrl} 
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all text-xs"
                  title="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a 
                  id="social-facebook-link"
                  href={content.contact.facebookUrl} 
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all text-xs"
                  title="Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a 
                  id="social-tiktok-link"
                  href={content.contact.tiktokUrl} 
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all text-xs"
                  title="TikTok"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
                <a 
                  id="social-whatsapp-footer-link"
                  href={content.contact.whatsappUrl} 
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all text-xs"
                  title="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Quick Navigation links */}
            <div className="text-left">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white mb-4">Navigation</h5>
              <ul className="flex flex-col gap-2.5 text-xs">
                <li><a href="#specialités" className="hover:text-gold-400 transition-colors">Nos Services</a></li>
                <li><a href="#tarifs" className="hover:text-gold-400 transition-colors">La Carte de Prix (FCFA)</a></li>
                <li><a href="#galerie" className="hover:text-gold-400 transition-colors">Le Book d'Inspirations</a></li>
                <li><a href="#notre-histoire" className="hover:text-gold-400 transition-colors">L'Histoire de Stay's Beauty</a></li>
              </ul>
            </div>

            {/* Category rapid links */}
            <div className="text-left">
              <h5 className="font-bold text-xs uppercase tracking-widest text-white mb-4">Créations</h5>
              <ul className="flex flex-col gap-2.5 text-xs">
                <li><a href="#galerie" className="hover:text-gold-400 transition-colors">Ongles Marbrés & Gel</a></li>
                <li><a href="#galerie" className="hover:text-gold-400 transition-colors">Box Braids & Cornrows</a></li>
                <li><a href="#galerie" className="hover:text-gold-400 transition-colors">Lace Frontal Indétectable</a></li>
                <li><a href="#galerie" className="hover:text-gold-400 transition-colors">Formule Royale Luxe</a></li>
              </ul>
            </div>

            {/* Legal Access info */}
            <div className="text-left flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs uppercase tracking-widest text-white mb-4">Réservations</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Pour garantir un niveau d'écoute optimal, toutes les prestations en Pose Lace et Tresses complexes se font uniquement sur rendez-vous.
                </p>
              </div>
              <button
                id="footer-admin-trigger-link"
                onClick={() => {
                  if (isEditMode) {
                    setIsEditMode(false);
                    showToast("🔒 Mode aperçu client activé.");
                  } else {
                    setIsAdminModalOpen(true);
                  }
                }}
                className="text-xs font-semibold text-slate-500 hover:text-gold-400 flex items-center gap-1 mt-2 text-left self-start"
              >
                <i className="fa-solid fa-cog"></i> 
                {isEditMode ? "Désactiver le Mode Édition" : "⚜️ Gérant — Administrer le site"}
              </button>
            </div>

          </div>

          <div id="footer-cooyright-row" className="pt-8 border-t border-slate-900 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-slate-500 font-sans">
              &copy; 2026 Stay's Beauty. Tous droits réservés. Yaoundé, Cameroun.
            </p>
            <p className="text-slate-600 font-sans flex items-center gap-1">
              <span>Fait avec amour pour les Reines</span>
              <span className="text-red-500">♥</span>
              <span>• Yaoundé Prestige &amp; Déplacements</span>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING DIRECT WHATSAPP ACTION BUTTON FOR CLIENT PREVIEWS */}
      <div id="floating-whatsapp-action" className="fixed bottom-6 right-6 z-35 flex flex-col gap-3">
        <a 
          href={content.contact.whatsappUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          className="bg-green-500 hover:bg-green-600 active:scale-95 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all outline-none"
          title="Prendre RDV sur WhatsApp"
        >
          <i className="fa-brands fa-whatsapp text-2xl"></i>
        </a>
      </div>

      {/* LIGHTBOX POPUP MODAL FOR PORTFOLIO DETAIL ZOOM */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div 
            id="lightbox-outer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              id="lightbox-content-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                id="lightbox-close-btn"
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full h-9 w-9 flex items-center justify-center text-sm transition-colors z-10 focus:outline-none cursor-pointer"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              {/* Picture Display */}
              <div className="aspect-[4/3] w-full bg-slate-950 relative">
                {isMediaVideo(activeLightboxItem.imageUrl) ? (
                  <video 
                    src={activeLightboxItem.imageUrl} 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={activeLightboxItem.imageUrl} 
                    alt={activeLightboxItem.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, activeLightboxItem.category === 'nails' ? 'nails' : activeLightboxItem.category === 'lace' ? 'lace' : 'hair')}
                  />
                )}
              </div>

              {/* Description Body */}
              <div className="p-6 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gold-500/90 text-[10px] font-bold tracking-widest text-white px-3 py-1 rounded-full uppercase">
                    {activeLightboxItem.category === 'nails' ? 'Onglerie' : activeLightboxItem.category === 'hair' ? 'Coiffure' : 'Lace Frontal'}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">Inspiration Book</span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  {activeLightboxItem.title}
                </h4>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {activeLightboxItem.description}
                </p>

                {/* Direct CTA Action */}
                <div className="flex gap-3">
                  <a 
                    id="lightbox-direct-whatsapp-booking"
                    href={`${content.contact.whatsappUrl}?text=${encodeURIComponent(`Bonjour Stay's Beauty ! J'ai adoré le modèle de votre galerie : "${activeLightboxItem.title}" (${activeLightboxItem.category === 'nails' ? 'Onglerie' : activeLightboxItem.category === 'hair' ? 'Coiffure' : 'Lace Frontal'}). Est-il possible de réserver un créneau pour ce modèle ?`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wide transition-all shadow-md flex-1 text-center flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp text-lg"></i> Je veux ce modèle !
                  </a>
                  <button 
                    id="lightbox-cancel-btn"
                    onClick={() => setActiveLightboxItem(null)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wide transition-colors"
                  >
                    Retour
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN PASSWORD MODAL (ADMIN123) */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div 
            id="admin-login-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              id="admin-login-modal"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-brand-100 text-left relative"
            >
              {/* Close login */}
              <button 
                id="admin-login-close-btn"
                onClick={() => {
                  setIsAdminModalOpen(false);
                  setPassword('');
                  setPassError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              <div className="text-center mb-6">
                <span className="w-12 h-12 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-xl mx-auto mb-3">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-950">
                  Accès Administrateur No-Code
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Saisissez le mot de passe pour passer en mode édition et modifier visuels, textes et tarifs.
                </p>
              </div>

              <form onSubmit={handleAdminVerify} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-password-input" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Mot de passe d'administration</label>
                  <input 
                    id="admin-password-input"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Saisissez le mot de passe..."
                    required
                    autoFocus
                    className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 w-full"
                  />
                  
                  {/* Password hint to help user test instantly */}
                  <span className="text-[10px] text-gold-600 bg-gold-50 p-2 rounded-lg font-medium mt-1">
                    💡 <strong>Secret :</strong> Le mot de passe requis est <strong className="underline">admin123</strong>
                  </span>
                </div>

                {passError && (
                  <p className="text-xs text-red-500 font-medium">
                    {passError}
                  </p>
                )}

                <button 
                  id="admin-login-submit"
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-900 border border-slate-900 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest transition-transform active:scale-98 cursor-pointer mt-2 text-center"
                >
                  Déverrouiller le CMS <i className="fa-solid fa-arrow-right ml-1"></i>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT NO-CODE CMS ACTION MANAGER PANEL ACTIVE */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div 
            id="cms-floating-action-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-neutral-800 text-white px-5 py-4 rounded-3xl shadow-2xl z-40 max-w-lg w-[calc(100%-2rem)] flex flex-col gap-3 font-sans"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <div>
                  <h6 className="font-bold text-xs uppercase tracking-wide text-white flex items-center gap-1">
                    <span>⚜️ CMS Stay's Beauty</span>
                  </h6>
                  <p className="text-[10px] text-neutral-400">Modifications temporaires en cours d'édition...</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  id="cms-save-btn-bottom"
                  onClick={handleSaveChanges}
                  className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold text-[10px] px-3.5 py-2 rounded-xl uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Sauvegarder
                </button>
                <button 
                  id="cms-reset-btn-bottom"
                  onClick={handleResetToDefault}
                  className="bg-transparent hover:bg-white/10 text-neutral-300 font-bold text-[10px] px-3 py-2 rounded-xl uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                  title="Revenir au site original"
                >
                  Réinitialiser
                </button>
                <button 
                  id="cms-exit-btn-bottom"
                  onClick={() => {
                    setIsEditMode(false);
                    showToast("🔒 Mode aperçu client activé.");
                  }}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[10px] px-3 py-2 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
                >
                  Quitter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REUSABLE PREMIUM IMAGE PICKER DRAWER / PROMPT MODAL */}
      <AnimatePresence>
        {imagePickerActive && (
          <motion.div 
            id="cms-image-picker-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImagePickerActive(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              id="cms-image-picker-modal"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-rose-brand-100 text-left relative max-h-[85vh] flex flex-col"
            >
              {/* Close */}
              <button 
                id="cms-image-picker-close-btn"
                onClick={() => setImagePickerActive(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              <div className="mb-4">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-950">
                  <i className="fa-solid fa-photo-film text-gold-500 mr-2"></i> Remplacer l'Image ou la Vidéo
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Importez un fichier (photo de vos poses, vidéo de coiffure) depuis votre téléphone / ordinateur, ou entrez une URL web.
                </p>
              </div>

              {/* Upload area */}
              <div className="mb-4">
                <input 
                  id="cms-file-upload-input"
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={handleFileUpload} 
                  className="hidden"
                />
                <div 
                  id="cms-upload-dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('cms-file-upload-input')?.click()}
                  className="border-2 border-dashed border-rose-brand-200 hover:border-gold-400 rounded-2xl p-5 text-center cursor-pointer bg-rose-brand-50/10 hover:bg-gold-50/20 transition-all flex flex-col items-center justify-center gap-1.5 group"
                >
                  <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </span>
                  <div>
                    <p className="font-bold text-xs text-slate-800">Sélectionner ou Glisser-Déposer</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Images (JPG, PNG, WEBP) ou Vidéos (MP4, WEBM)</p>
                  </div>
                </div>
              </div>

              {/* Paste URL block */}
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ou spécifier une URL existante</label>
                <div className="flex gap-2">
                  <input 
                    id="cms-image-custom-url-input"
                    type="url" 
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none w-full font-mono"
                  />
                  <button 
                    id="cms-image-url-submit-btn"
                    onClick={() => saveImageChange(customImageUrl)}
                    className="bg-slate-950 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase"
                  >
                    Valider
                  </button>
                </div>
              </div>

              {/* Presets library block */}
              <div className="flex-1 overflow-y-auto pr-1">
                <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-gold-600 mb-2">Photothèque Haut de Gamme Stay's Beauty</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {IMAGE_PRESETS.map((preset, pIdx) => (
                    <button 
                      id={`preset-img-btn-${pIdx}`}
                      key={pIdx}
                      onClick={() => saveImageChange(preset.url)}
                      className="group border border-slate-100 hover:border-gold-300 rounded-2xl p-1 text-left hover:shadow-sm transition-all focus:outline-none cursor-pointer bg-slate-50/50"
                    >
                      <div className="aspect-video w-full rounded-xl overflow-hidden mb-1 relative">
                        <img 
                          src={preset.url} 
                          alt={preset.label} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, preset.category === 'Onglerie' ? 'nails' : preset.category === 'Lace Frontals' ? 'lace' : preset.category === 'Coiffure' ? 'hair' : 'salon')}
                        />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded-sm">
                          {preset.category}
                        </span>
                      </div>
                      <p className="font-semibold text-[9px] text-slate-800 line-clamp-1 truncate group-hover:text-gold-600 transition-colors">
                        {preset.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TOAST NOTIFICATION FOR ACTIONS */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            id="cms-action-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-950 border border-neutral-800 text-white px-5 py-4 rounded-2xl shadow-xl max-w-sm flex items-start gap-3"
          >
            <span className="text-xl text-gold-500 shrink-0">⚜️</span>
            <div>
              <p className="text-xs text-slate-100 font-semibold text-left">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-500 hover:text-slate-300 ml-auto shrink-0 text-xs focus:outline-none"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
