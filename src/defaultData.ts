import { AppContent } from './types';

export const defaultAppContent: AppContent = {
  logoName: "Stay's Beauty",
  hero: {
    badge: "SALON DE BEAUTÉ DE PRESTIGE",
    title: "Révélez votre éclat naturel et sublimez votre style",
    subtitle: "Votre havre de paix haut de gamme spécialisé en soins d'onglerie d'exception, coiffures africaines créatives et poses professionnelles de lace frontals.",
    ctaPrimary: "Prendre RDV via WhatsApp",
    ctaSecondary: "Découvrir nos tarifs",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200"
  },
  services: [
    {
      id: "srv-1",
      category: "ONGLERIE",
      title: "Manucure & Pédicure d'Exception",
      description: "Soins des mains et des pieds attentionnés, pose de vernis semi-permanent, rallongement au chablon ou capsule gel. Des designs uniques et une tenue longue durée irréprochable.",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-2",
      category: "COIFFURE AFRICAINE",
      title: "Tresses & Tissages Créatifs",
      description: "Spécialistes des coiffures africaines traditionnelles et modernes. Box braids ultra-propres, cornrows raffinés, passion twists ou sénégalaises, réalisés avec douceur pour préserver votre cuir chevelu.",
      imageUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-3",
      category: "LACE FRONTALS",
      title: "Pose Lace & Perruques Haute Couture",
      description: "Customisation méticuleuse (blanchiment des nœuds, plucking naturel) et pose haut de gamme avec colles médicales hypoallergéniques. Effet cuir chevelu invisible et naturel garanti.",
      imageUrl: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=600"
    }
  ],
  pricing: [
    {
      id: "cat-nails",
      name: "Onglerie Prestige",
      items: [
        { id: "nail-1", name: "Manucure Simple & Soin express", description: "Mise en forme, soin des cuticules, gommage et vernis fortifiant.", price: "8 000 FCFA" },
        { id: "nail-2", name: "Pose de Semi-Permanent", description: "Vernis gel longue tenue de haute qualité sous lampe UV/LED.", price: "12 000 FCFA" },
        { id: "nail-3", name: "Rallongement Capsules & Gel", description: "Rallongement élégant et modelage gel acrylique pour une longueur parfaite.", price: "25 000 FCFA" },
        { id: "nail-4", name: "Remplissage Gel (3-4 semaines)", description: "Entretien du rallongement, restructuration et changement de couleur.", price: "15 000 FCFA" },
        { id: "nail-5", name: "Nail Art sur mesure (par ongle)", description: "Dessin fait main, strass, paillettes ou effets chrome élégants.", price: "1 500 FCFA" }
      ]
    },
    {
      id: "cat-hair",
      name: "Tresses & Coiffures Africaines",
      items: [
        { id: "hair-1", name: "Box Braids Premium (Taille moyenne)", description: "Tresses soignées avec mèches de qualité supérieure incluses.", price: "25 000 FCFA" },
        { id: "hair-2", name: "Cornrows / Nattes Collées", description: "Motifs géométriques fins, personnalisés et protecteurs.", price: "15 000 FCFA" },
        { id: "hair-3", name: "Passion / Spring Twists", description: "Torsades légères à effet ultra naturel et texturé.", price: "28 000 FCFA" },
        { id: "hair-4", name: "Soins Capillaires Profonds", description: "Bain d'huiles chaudes bio, masque nourrissant et massage relaxant.", price: "10 000 FCFA" }
      ]
    },
    {
      id: "cat-lace",
      name: "Pose Lace Frontal & Customisation",
      items: [
        { id: "lace-1", name: "Customisation Seule (Wig complète)", description: "Blanchiment des nœuds de la tulle + décoloration et plucking de la ligne frontale.", price: "12 000 FCFA" },
        { id: "lace-2", name: "Pose Lace Frontale Simple", description: "Instal de perruque avec colle spéciale invisible haute performance.", price: "20 000 FCFA" },
        { id: "lace-3", name: "Formule Royale: Customisation + Pose complète", description: "Le nec plus ultra : shampoing, tresse de base protectrice, customisation complète et pose parfaite.", price: "35 000 FCFA" },
        { id: "lace-4", name: "Dépose Pro + Soin Cuir Chevelu", description: "Retraits de la colle avec solvant spécialisé et nettoyage doux de la peau.", price: "8 000 FCFA" }
      ]
    }
  ],
  gallery: [
    {
      id: "gal-1",
      category: "nails",
      title: "Marbré Doré Chic",
      imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=600",
      description: "Nail art marbré rose et or pour un effet moderne et luxueux."
    },
    {
      id: "gal-2",
      category: "hair",
      title: "Goddess Braids Volumineuses",
      imageUrl: "https://images.unsplash.com/photo-1595959183075-c1d945103580?auto=format&fit=crop&q=80&w=600",
      description: "Tresses de déesse réalisées avec des boucles ondulées de haute qualité."
    },
    {
      id: "gal-3",
      category: "lace",
      title: "Sleek Custom Wig Install",
      imageUrl: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?auto=format&fit=crop&q=80&w=600",
      description: "Pose parfaite d'un frontal 13x4 avec un lissage parfait effet miroir."
    },
    {
      id: "gal-4",
      category: "nails",
      title: "Nude Royal & Chrome",
      imageUrl: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600",
      description: "Teinte nude intemporelle agrémentée d'un effet chrome dorée subtil."
    },
    {
      id: "gal-5",
      category: "hair",
      title: "Nattes collées graphiques",
      imageUrl: "https://images.unsplash.com/photo-1647897903246-719242758050?auto=format&fit=crop&q=80&w=600",
      description: "Design géométrique minimaliste pour une coiffure protectrice moderne."
    },
    {
      id: "gal-6",
      category: "lace",
      title: "Wavy Hair Invisible Lace",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      description: "Mise en plis ondulée fluide avec délimitation de dentelle HD indétectable."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Fatou Diop",
      role: "Cliente fidèle",
      comment: "La meilleure pose de lace frontal de ma vie ! La tulle est vraiment indétectable et les cheveux d'une douceur absolue. L'équipe est attentionnée et très professionnelle.",
      rating: 5
    },
    {
      id: "test-2",
      name: "Marie-Louise K.",
      role: "Passionnée de Nail Art",
      comment: "Mes ongles tiennent plus de 4 semaines sans s'écailler ! Les détails en nail art marbré or sont sublimes. Félicitations pour ce standing haut de gamme.",
      rating: 5
    },
    {
      id: "test-3",
      name: "Amina Touré",
      role: "Cliente Tresses Protectrices",
      comment: "Le salon est propre, l'accueil chaleureux et les tresses sont faites sans douleur. Les finitions de mes box braids sont impeccables.",
      rating: 5
    }
  ],
  about: {
    title: "L'Art de magnifier votre Beauté unique",
    description1: "Situé au cœur de la ville, Stay's Beauty est plus qu'un simple institut de beauté : c'est un sanctuaire dédié à la sublimation de votre chevelure, de vos mains et de votre visage. Notre équipe d'expertes passionnées combine un savoir-faire artisanal de pointe et des produits cosmétiques haut de gamme.",
    description2: "Chaque cliente bénéficie d'une attention sur-mesure dans une ambiance chic, feutrée et bienveillante. Que vous veniez pour des tresses protectrices soignées, un nail art créatif ou une pose de lace frontale invisible, nous nous engageons à offrir une expérience holistique inoubliable.",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Clientes Ravies", value: "3 000 +" },
      { label: "Années d'Expertise", value: "8 Ans" },
      { label: "Coiffeuses & Prothésistes", value: "6 Expertes" },
      { label: "Satisfaction", value: "99.8%" }
    ]
  },
  contact: {
    address: "Yaoundé, Cameroun (Disponible en salon et sur déplacement à domicile)",
    phone: "+237696423556",
    phoneFormatted: "+237 696 42 35 56",
    email: "stacysewa87@gmail.com",
    hoursWeekdays: "Mardi au Vendredi : 09:00 – 19:30",
    hoursSaturday: "Samedi : 08:30 – 20:00",
    hoursSunday: "Dimanche : 12:00 – 18:00 (Sur déplacement / RDV uniquement)",
    instagramName: "@alta_beauty_salon",
    instagramUrl: "https://instagram.com",
    tiktokName: "@alta_beauty_pro",
    tiktokUrl: "https://tiktok.com",
    whatsappUrl: "https://wa.me/237696423556"
  }
};
