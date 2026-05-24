import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = ["Home", "Rooms", "Amenities", "Gallery", "Offers", "Policies", "Testimonials", "Contact"];

const ROOMS = [
  { id: 1, name: "Deluxe King Room", price: 320, size: "48 m²", floor: "5–8", capacity: 2, category: "Deluxe", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", amenities: ["🛏 King Bed", "🛁 Jacuzzi", "🌄 City View", "📶 WiFi", "❄️ AC", "📺 4K TV"], desc: "An elegant retreat featuring hand-stitched linens, a deep-soak Jacuzzi, and sweeping city vistas from floor-to-ceiling glass." },
  { id: 2, name: "Ocean Suite", price: 580, size: "72 m²", floor: "10–14", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", amenities: ["🛏 King Bed", "🌊 Ocean View", "🍾 Mini Bar", "🛁 Soaking Tub", "🛎 Butler"], desc: "Wake to the sound of waves. A private terrace, curated minibar, and panoramic ocean views define this signature suite." },
  { id: 3, name: "Presidential Villa", price: 1200, size: "180 m²", floor: "18–20", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", amenities: ["🛏 2 Bedrooms", "🏊 Private Pool", "🍽 Butler", "🚗 Chauffeur", "🎵 Sound System"], desc: "The pinnacle of luxury. A dedicated butler, private plunge pool, and 24-hour chauffeur ensure unmatched exclusivity." },
  { id: 4, name: "Garden Bungalow", price: 410, size: "65 m²", floor: "Ground", capacity: 2, category: "Bungalow", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", amenities: ["🌿 Garden View", "🛁 Rain Shower", "☕ Espresso Bar", "📶 WiFi", "🌺 Private Garden"], desc: "Nestled among manicured gardens, this serene bungalow offers direct garden access and a rainfall outdoor shower." },
  { id: 5, name: "Sky Penthouse", price: 950, size: "140 m²", floor: "Top Floor", capacity: 3, category: "Penthouse", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", amenities: ["🏙 360° View", "🛏 King Bed", "🍾 Welcome Kit", "🛁 Spa Bath", "🍳 Kitchenette"], desc: "Above the clouds, this penthouse commands a 360-degree horizon, perfect for those who demand nothing less than the top." },
  { id: 6, name: "Classic Double", price: 195, size: "36 m²", floor: "2–4", capacity: 2, category: "Classic", img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80", amenities: ["🛏 Double Beds", "📺 Smart TV", "☕ Coffee Maker", "📶 WiFi", "🪟 City View"], desc: "Thoughtfully appointed with modern comforts, this room is the ideal base for business or leisure travelers." },
  { id: 7, name: "Honeymoon Terrace", price: 760, size: "95 m²", floor: "12–15", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", amenities: ["🛏 King Canopy Bed", "🌹 Petal Turndown", "🍾 Champagne", "🛁 Couples Tub", "🌅 Sunset Terrace"], desc: "Designed for love. Rose petal turndown service, private sunset terrace, and a signature champagne welcome await." },
  { id: 8, name: "Lagoon Pool Villa", price: 1450, size: "220 m²", floor: "Ground", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", amenities: ["🏊 Private Lagoon", "🛏 2 Bedrooms", "🍽 Chef Service", "🚣 Kayak Access", "🌴 Beachfront"], desc: "Step from your villa directly into your private lagoon. A personal chef, kayaks, and direct beach access await." },
  { id: 9, name: "Heritage Loft", price: 490, size: "80 m²", floor: "3–5", capacity: 3, category: "Suite", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", amenities: ["🏛 Heritage Decor", "🛏 King Bed", "📚 Library Nook", "🪵 Exposed Brick", "☕ Pour-Over Bar"], desc: "A marriage of old-world character and contemporary luxury. Exposed brick, a curated library, and a specialty coffee bar." },
  { id: 10, name: "Cliff Edge Studio", price: 380, size: "55 m²", floor: "8–10", capacity: 2, category: "Studio", img: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80", amenities: ["🌊 Cliff View", "🛁 Open Bath", "🍳 Mini Kitchen", "🎨 Art Collection", "📶 WiFi"], desc: "Suspended above dramatic cliffs, this studio apartment blends an artisan aesthetic with breathtaking natural drama." },
  { id: 11, name: "Wellness Retreat Room", price: 550, size: "85 m²", floor: "6–9", capacity: 2, category: "Wellness", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", amenities: ["🧘 Yoga Corner", "🌿 Aromatherapy", "🥗 Wellness Menu", "🛁 Salt Bath", "🏋️ Private Gym"], desc: "A holistic sanctuary with a dedicated yoga corner, daily wellness menus, and an in-room salt therapy bath." },
  { id: 12, name: "Family Grand Suite", price: 680, size: "120 m²", floor: "4–7", capacity: 6, category: "Suite", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80", amenities: ["🛏 3 Bedrooms", "🧒 Kids Lounge", "🎮 Game Console", "🍳 Full Kitchen", "🛁 2 Bathrooms"], desc: "Spacious enough for the whole family. Three bedrooms, a dedicated kids lounge, and a full gourmet kitchen." },
  { id: 13, name: "Overwater Bungalow", price: 1100, size: "130 m²", floor: "Over Water", capacity: 2, category: "Bungalow", img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80", amenities: ["💧 Glass Floor Panel", "🛏 King Bed", "🚿 Open-Air Shower", "🐠 Snorkel Set", "🌅 Sunrise View"], desc: "Perched above the lagoon on stilts, a glass floor reveals colorful marine life below while you sleep." },
  { id: 14, name: "Artist's Studio", price: 340, size: "58 m²", floor: "Top Floor", capacity: 2, category: "Studio", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80", amenities: ["🎨 Skylight Atelier", "🖼 Original Art", "🛏 King Bed", "📷 Photography Kit", "☕ Brew Bar"], desc: "A light-flooded loft with a working atelier, skylight ceiling, and original artwork. For guests who see the world differently." },
  { id: 15, name: "Forest Treehouse", price: 620, size: "75 m²", floor: "Elevated", capacity: 2, category: "Treehouse", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", amenities: ["🌲 Treetop View", "🛏 King Bed", "🔥 Fireplace", "🦅 Bird Watching", "🪵 Wood Deck"], desc: "Nestled among ancient trees, this treehouse hideaway features a wood-burning fireplace and private observation deck." },
  { id: 16, name: "Desert Pavilion", price: 890, size: "110 m²", floor: "Ground", capacity: 4, category: "Pavilion", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", amenities: ["🏜 Desert View", "🏊 Plunge Pool", "🎆 Stargazing Deck", "🛏 2 Bedrooms", "🍸 Private Bar"], desc: "Under endless skies, this desert pavilion offers a private plunge pool and telescope for stargazing beneath the Milky Way." },
  { id: 17, name: "Arctic Lodge", price: 980, size: "100 m²", floor: "Ground", capacity: 2, category: "Lodge", img: "https://images.unsplash.com/photo-1533760881669-80db4d7b341c?w=800&q=80", amenities: ["❄️ Ice Architecture", "🔥 Wood Stove", "🌌 Northern Lights View", "🛏 Fur Bed", "🍷 Wine Cellar"], desc: "A crystalline ice lodge with fur-clad beds, a roaring wood stove, and front-row views of the aurora borealis." },
  { id: 18, name: "Rooftop Loft", price: 520, size: "90 m²", floor: "Top Floor", capacity: 2, category: "Loft", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", amenities: ["🏙 Skyline View", "🛁 Outdoor Hot Tub", "🛏 King Bed", "☀️ Sun Deck", "🎵 Sound System"], desc: "The city belongs to you from this rooftop loft with an outdoor hot tub, sun deck, and 360-degree skyline vistas." },
  { id: 19, name: "Vineyard Cottage", price: 460, size: "70 m²", floor: "Ground", capacity: 3, category: "Cottage", img: "https://images.unsplash.com/photo-1516788875874-c5912cae7b43?w=800&q=80", amenities: ["🍇 Vineyard View", "🍷 Wine Cellar Access", "🛏 King Bed", "🧺 Picnic Basket", "🌿 Herb Garden"], desc: "Set among sun-drenched vines, this romantic cottage includes a private wine cellar and daily vineyard picnic basket." },
  { id: 20, name: "Cave Suite", price: 740, size: "88 m²", floor: "Below Ground", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80", amenities: ["🪨 Cave Architecture", "🛁 Natural Spring Bath", "🕯 Candlelit Dining", "🛏 King Bed", "🧖 Spa"], desc: "Carved into volcanic rock, this extraordinary cave suite features natural thermal spring baths and candlelit dinners." },
  { id: 21, name: "Imperial Suite", price: 1350, size: "200 m²", floor: "Royal Floor", capacity: 4, category: "Suite", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", amenities: ["👑 Royal Décor", "🛏 California King", "🍽 Private Chef", "🎼 Grand Piano", "💎 Jewellery Safe"], desc: "Inspired by imperial palaces. A grand piano, private chef, and bespoke butler service make this the ultimate statement." },
  { id: 22, name: "Nomad Tent Suite", price: 390, size: "62 m²", floor: "Garden", capacity: 2, category: "Tent", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80", amenities: ["⛺ Luxury Tent", "🛏 Ortho Mattress", "🔥 Fire Pit", "🌟 Clear Ceiling", "🍳 Camp Chef"], desc: "Glamping elevated. A transparent roof for stargazing, a crackling fire pit, and gourmet camp cooking." },
  { id: 23, name: "Underwater Alcove", price: 2200, size: "95 m²", floor: "Below Sea", capacity: 2, category: "Alcove", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", amenities: ["🐟 360° Sea View", "🛏 King Bed", "🤿 Dive Access", "🌊 Submarine Service", "🍽 Diver-Chef"], desc: "The world's most exclusive address: 5 metres below the ocean surface. Watch manta rays glide past your bedroom window." },
  { id: 24, name: "Mountain Chalet", price: 570, size: "95 m²", floor: "Summit", capacity: 4, category: "Chalet", img: "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=800&q=80", amenities: ["🏔 Mountain View", "🔥 Stone Fireplace", "🎿 Ski Storage", "🛏 2 Bedrooms", "♨️ Sauna"], desc: "A classic alpine chalet with a stone fireplace, private sauna, and sweeping mountain panoramas from every window." },
  { id: 25, name: "Lotus Pool Room", price: 430, size: "68 m²", floor: "3–6", capacity: 2, category: "Pool", img: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80", amenities: ["🌸 Pool Access", "🛏 King Bed", "🏊 Swim-Out", "🌺 Floral Bath", "🧴 Aromatherapy"], desc: "A swim-out access room where you step directly from your terrace into a lotus-scented garden pool." },
  { id: 26, name: "Glass Cube Suite", price: 820, size: "100 m²", floor: "12–16", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?w=800&q=80", amenities: ["🔲 Glass Walls", "🛏 Floating Bed", "🌆 City Panorama", "🧖 In-Room Spa", "🍷 Wine Fridge"], desc: "An architectural marvel — four glass walls, a floating king bed, and a full-service in-room spa with city panoramas." },
  { id: 27, name: "Safari Tent Villa", price: 680, size: "115 m²", floor: "Wilderness", capacity: 4, category: "Villa", img: "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=800&q=80", amenities: ["🦁 Wildlife View", "🛏 2 Beds", "🔭 Telescope", "🍖 BBQ Dinner", "🌅 Dawn Game Walk"], desc: "Fall asleep to the sounds of the wild. A telescope, dawn game walks, and fireside BBQ dinners under the stars." },
  { id: 28, name: "Romantic Alcove", price: 510, size: "76 m²", floor: "9–12", capacity: 2, category: "Romantic", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80", amenities: ["🌹 Rose Décor", "🕯 Canopy Bed", "🍓 Strawberry Bar", "🎵 Curated Playlist", "💆 Couples Massage"], desc: "Every detail whispers romance. A canopy bed draped in silk, a private couples massage suite, and a strawberry bar." },
  { id: 29, name: "Sky Glass Villa", price: 1800, size: "250 m²", floor: "Top 2 Floors", capacity: 6, category: "Villa", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe2e6?w=800&q=80", amenities: ["🏙 Duplex Layout", "🏊 Indoor Pool", "🛏 3 Bedrooms", "🎬 Home Cinema", "🍽 Private Dining"], desc: "A two-floor private villa with an indoor pool, home cinema, three bedrooms, and private chef dining room." },
  { id: 30, name: "Lighthouse Keeper Suite", price: 650, size: "85 m²", floor: "Lighthouse Tower", capacity: 2, category: "Suite", img: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&q=80", amenities: ["🏮 360° Lantern Room", "🛏 King Bed", "⚓ Nautical Décor", "🌊 Ocean Access", "🦞 Seafood Menu"], desc: "Perched in a historic lighthouse tower, this unique suite revolves around a working lantern room with ocean-to-horizon views." },
  { id: 31, name: "Celestial Dome", price: 1600, size: "160 m²", floor: "Observatory", capacity: 2, category: "Dome", img: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800&q=80", amenities: ["🔭 Observatory Dome", "🌌 Star Map Ceiling", "🛏 Floating Bed", "🍸 Constellation Bar", "📡 NASA Feed"], desc: "Sleep under a retractable dome ceiling. A custom constellation projection system and live NASA feed transform night into wonder." },
  { id: 32, name: "Bamboo Eco Villa", price: 440, size: "80 m²", floor: "Forest Ground", capacity: 3, category: "Eco", img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80", amenities: ["♻️ Eco-Certified", "🌿 Solar Powered", "🛏 Bamboo Bed", "🌳 Forest Deck", "🥬 Organic Meals"], desc: "100% solar-powered, built from sustainable bamboo, and offering certified organic meals grown on-site. Luxury for the planet." },
];

const AMENITIES = [
  { icon: "♨️", name: "Infinity Spa", desc: "Rejuvenate with curated therapies and ancient rituals from five continents." },
  { icon: "🏊", name: "Rooftop Pool", desc: "Swim above the clouds with panoramic skyline views and poolside service." },
  { icon: "🏋️", name: "Fitness Center", desc: "State-of-the-art equipment and personal trainers available 24/7." },
  { icon: "🍽️", name: "Fine Dining", desc: "Michelin-starred cuisine crafted from locally-sourced, seasonal ingredients." },
  { icon: "🍸", name: "Sky Bar", desc: "Craft cocktails, rare spirits, and live jazz at the golden hour." },
  { icon: "🧘", name: "Yoga Pavilion", desc: "Morning and sunset sessions with world-class certified instructors." },
  { icon: "🚗", name: "Valet Parking", desc: "Complimentary valet, airport transfers, and helicopter arrivals." },
  { icon: "🛎️", name: "24H Concierge", desc: "Your personal concierge for every request, any hour of the day." },
  { icon: "🤿", name: "Water Sports", desc: "Diving, surfing, kayaking, and snorkeling with expert instructors." },
  { icon: "🎭", name: "Cultural Events", desc: "Nightly cultural performances, art installations, and private screenings." },
  { icon: "🍷", name: "Wine Cellar", desc: "6,000 curated labels across 14 wine-growing regions." },
  { icon: "🧒", name: "Kids Club", desc: "Supervised activities, nature trails, and creative workshops for children." },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=90",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=90",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe2e6?w=900&q=90",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=90",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=90",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=90",
  "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?w=900&q=90",
  "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=900&q=90",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=90",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&q=90",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=90",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=90",
  "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=900&q=90",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=90",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90",
  "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?w=900&q=90",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=90",
];

const OFFERS = [
  { title: "Honeymoon Bliss", emoji: "🌹", discount: "30% OFF", tag: "Most Popular", desc: "Roses, champagne, couples spa, and sunset dining on your private terrace.", original: 860, sale: 602, ends: 3, color: "#e85d8a", gradient: "linear-gradient(135deg, #e85d8a22, #d4af3711)" },
  { title: "Weekend Getaway", emoji: "✈️", discount: "20% OFF", tag: "Limited", desc: "Two nights in our Deluxe King with complimentary breakfast and city tour.", original: 640, sale: 512, ends: 5, color: "#5b8dee", gradient: "linear-gradient(135deg, #5b8dee22, #d4af3711)" },
  { title: "Summer Escape", emoji: "🌊", discount: "25% OFF", tag: "Summer Special", desc: "Ocean Suite with free airport pickup and snorkeling for stays of 3+ nights.", original: 1160, sale: 870, ends: 8, color: "#1ec8a0", gradient: "linear-gradient(135deg, #1ec8a022, #d4af3711)" },
  { title: "Wellness Retreat", emoji: "🧘", discount: "15% OFF", tag: "New", desc: "5-night wellness package: daily yoga, spa treatments, and a detox menu.", original: 2750, sale: 2338, ends: 12, color: "#a67cff", gradient: "linear-gradient(135deg, #a67cff22, #d4af3711)" },
];

const POLICIES = [
  { icon: "📅", title: "Cancellation Policy", type: "info", rules: ["Free cancellation up to 72 hours before check-in", "50% charge within 24–72 hours of check-in", "100% charge for no-shows or same-day cancellations", "Non-refundable rates are exempt from all waivers"] },
  { icon: "💳", title: "Payment Terms", type: "info", rules: ["Full payment required at booking for non-refundable rates", "25% deposit required for refundable bookings", "Balance due 72 hours before arrival", "All major cards, crypto, and bank transfer accepted"] },
  { icon: "⚠️", title: "Damage & Penalties", type: "warning", rules: ["Room damage assessed and billed at replacement cost", "Smoking violation: ₹25,000 fine + deep-cleaning fee", "Missing room items: billed at retail price + 20% handling", "Unauthorized pets: ₹10,000 penalty per night"] },
  { icon: "🚫", title: "Prohibited Activities", type: "danger", rules: ["No external catering or food delivery services", "No parties or events without prior written approval", "Quiet hours strictly enforced: 11 PM – 7 AM", "No recording in spa or private dining areas without consent"] },
  { icon: "✅", title: "Check-In / Check-Out", type: "success", rules: ["Check-in from 3:00 PM | Check-out by 12:00 PM", "Early check-in subject to availability (₹3,000 fee)", "Late check-out until 6 PM: 50% of nightly rate", "Luggage storage available 24 hours at no charge"] },
  { icon: "👑", title: "Loyalty & Privileges", type: "gold", rules: ["Gold Members: complimentary room upgrade when available", "Platinum Members: guaranteed suite upgrade on all stays", "Diamond Members: private arrival lounge + dedicated butler", "Points never expire; transferable to family members"] },
];

const TESTIMONIALS = [
  { name: "Amara Singh", role: "Travel Blogger", text: "Absolutely the finest stay of my life. Every detail was curated to perfection — the staff, the food, the suite. I've written about luxury travel for 8 years and nothing comes close.", rating: 5, img: "https://i.pravatar.cc/120?img=47", country: "🇮🇳 India", stay: "Ocean Suite · 4 nights", date: "April 2026" },
  { name: "James Whitfield", role: "CEO, Whitfield Co.", text: "I've stayed at over 200 luxury hotels worldwide. Anvi stands in a class of its own. The Presidential Villa's butler service is unmatched. We'll return every single year.", rating: 5, img: "https://i.pravatar.cc/120?img=11", country: "🇬🇧 United Kingdom", stay: "Presidential Villa · 7 nights", date: "March 2026" },
  { name: "Léa Fontaine", role: "Interior Designer", text: "The aesthetic is breathtaking — every corner is art. The rooftop pool at sunset is an experience I'll never forget. I photographed every inch. Simply extraordinary.", rating: 5, img: "https://i.pravatar.cc/120?img=45", country: "🇫🇷 France", stay: "Glass Cube Suite · 3 nights", date: "February 2026" },
  { name: "Ravi Menon", role: "Film Director", text: "Shot part of our production here and the team went above and beyond. Exceptional hospitality, incredible locations, and the food was Michelin-worthy every single meal.", rating: 5, img: "https://i.pravatar.cc/120?img=13", country: "🇮🇳 India", stay: "Rooftop Loft · 10 nights", date: "January 2026" },
  { name: "Sofia Marchetti", role: "Luxury Editor, Vogue Italia", text: "Three words: flawless, opulent, unforgettable. Anvi has set a new benchmark for what five-star really means. I featured it in our May issue as India's #1 luxury resort.", rating: 5, img: "https://i.pravatar.cc/120?img=44", country: "🇮🇹 Italy", stay: "Honeymoon Terrace · 5 nights", date: "May 2026" },
  { name: "Chen Wei", role: "Tech Entrepreneur", text: "The Presidential Villa with private pool exceeded every expectation. The butler knew what I wanted before I did. I hosted an entire business retreat here — flawless.", rating: 5, img: "https://i.pravatar.cc/120?img=3", country: "🇨🇳 China", stay: "Presidential Villa · 6 nights", date: "March 2026" },
  { name: "Priya Nambiar", role: "Architect & Influencer", text: "As someone obsessed with design, Anvi genuinely moved me. The Heritage Loft is perfection. Exposed brick, curated art, a pour-over bar — they thought of absolutely everything.", rating: 5, img: "https://i.pravatar.cc/120?img=49", country: "🇮🇳 India", stay: "Heritage Loft · 3 nights", date: "April 2026" },
  { name: "Marcus de Bruyne", role: "Michelin Inspector (Retired)", text: "I rarely write reviews. Anvi earned this one. The tasting menu rivals anything in Europe. The sommelier's pairings were inspired. A destination unto itself.", rating: 5, img: "https://i.pravatar.cc/120?img=15", country: "🇧🇪 Belgium", stay: "Sky Penthouse · 4 nights", date: "February 2026" },
  { name: "Aisha Al-Rashid", role: "Royal Court Advisor", text: "We chose Anvi for our family's anniversary celebration. The discretion, the personalized arrangements, the sheer beauty of the Lagoon Villa — unforgettable in every way.", rating: 5, img: "https://i.pravatar.cc/120?img=56", country: "🇦🇪 UAE", stay: "Lagoon Pool Villa · 8 nights", date: "January 2026" },
  { name: "Daniel Okafor", role: "Award-Winning Photographer", text: "I've shot resorts across 40 countries. Anvi's light, architecture and staff energy are unlike anything I've captured before. Every frame was effortless. Stunning place.", rating: 5, img: "https://i.pravatar.cc/120?img=7", country: "🇳🇬 Nigeria", stay: "Artist's Studio · 5 nights", date: "March 2026" },
  { name: "Yuki Tanaka", role: "Wellness Retreat Director", text: "The wellness programme here is genuinely world-class. The Ayurvedic consultations, the salt baths, the organic menus — I left feeling reborn. I'm bringing my entire team next year.", rating: 5, img: "https://i.pravatar.cc/120?img=41", country: "🇯🇵 Japan", stay: "Wellness Retreat Room · 7 nights", date: "April 2026" },
  { name: "Isabelle Moreau", role: "Honeymoon Traveller", text: "Our honeymoon at Anvi was pure magic. Rose petals on arrival, champagne on the terrace, couples massage at sunset. My husband and I still talk about it every single day.", rating: 5, img: "https://i.pravatar.cc/120?img=39", country: "🇫🇷 France", stay: "Honeymoon Terrace · 6 nights", date: "May 2026" },
];

const MEMBERSHIP_TIERS = [
  { tier: "Gold", icon: "🥇", price: "₹15,000/yr", color: "#d4af37", perks: ["10% off all stays", "Free breakfast daily", "Priority check-in", "Room upgrade on availability"] },
  { tier: "Platinum", icon: "💎", price: "₹35,000/yr", color: "#a8d8ea", perks: ["20% off all stays", "Suite upgrade guaranteed", "Complimentary spa session", "Dedicated concierge", "Airport limousine"] },
  { tier: "Diamond", icon: "👑", price: "₹75,000/yr", color: "#f0c040", perks: ["30% off all stays", "Presidential access", "Private arrival lounge", "Personal butler", "Helipad transfers", "Exclusive member events"] },
];

// ─── MOCK AUTH STORE (in-memory) ──────────────────────────────────────────────
const authStore = {
  users: [],
  currentUser: null,
  register(data) {
    const exists = this.users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) throw new Error("An account with this email already exists.");
    const user = { ...data, id: Date.now(), joinedAt: new Date().toISOString(), points: 0 };
    this.users.push(user);
    this.currentUser = user;
    return user;
  },
  login(email, password) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("No account found with this email address.");
    if (user.password !== password) throw new Error("Incorrect password. Please try again.");
    this.currentUser = user;
    return user;
  },
  logout() { this.currentUser = null; },
};

function useCountdown(days) {
  const [time, setTime] = useState({ h: 23 - (days % 24), m: 41, s: 58 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function Countdown({ days }) {
  const { h, m, s } = useCountdown(days);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "14px 0" }}>
      {[["Days", days], ["Hrs", pad(h)], ["Min", pad(m)], ["Sec", pad(s)]].map(([label, val]) => (
        <div key={label} style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 8, padding: "8px 12px", textAlign: "center", minWidth: 52 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#d4af37", fontVariantNumeric: "tabular-nums" }}>{val}</div>
          <div style={{ fontSize: 9, opacity: 0.6, letterSpacing: 2, marginTop: 2 }}>{label.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

function Stars({ n }) {
  return <span style={{ color: "#d4af37", fontSize: 16, letterSpacing: 2 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

const CATEGORIES = ["All", "Classic", "Deluxe", "Suite", "Villa", "Penthouse", "Bungalow", "Studio", "Loft", "Treehouse", "Other"];

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"
  const [regStep, setRegStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "", remember: false });
  const [loginErrors, setLoginErrors] = useState({});

  const [regData, setRegData] = useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
    nationality: "", idType: "Passport", idNumber: "",
    address: "", city: "", country: "", tier: "Gold",
    password: "", confirm: "", newsletter: true, terms: false,
  });
  const [regErrors, setRegErrors] = useState({});

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const switchMode = (m) => {
    setMode(m); setRegStep(1); setServerError(""); setSuccessMsg("");
    setLoginErrors({}); setRegErrors({}); setForgotError("");
  };

  // Login
  const handleLoginChange = e => {
    const { name, value, type, checked } = e.target;
    setLoginData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setLoginErrors(p => ({ ...p, [name]: "" }));
  };

  const validateLogin = () => {
    const errs = {};
    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!loginData.password) errs.password = "Password is required";
    return errs;
  };

  const handleLogin = async () => {
    const errs = validateLogin();
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoading(true); setServerError("");
    await new Promise(r => setTimeout(r, 900));
    try {
      const user = authStore.login(loginData.email, loginData.password);
      setLoading(false);
      onSuccess(user, "login");
    } catch (e) {
      setLoading(false);
      setServerError(e.message);
    }
  };

  // Register
  const handleRegChange = e => {
    const { name, value, type, checked } = e.target;
    setRegData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setRegErrors(p => ({ ...p, [name]: "" }));
  };

  const validateRegStep = step => {
    const errs = {};
    if (step === 1) {
      if (!regData.firstName.trim()) errs.firstName = "Required";
      if (!regData.lastName.trim()) errs.lastName = "Required";
      if (!regData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
      if (!regData.phone.trim()) errs.phone = "Required";
      if (!regData.dob) errs.dob = "Date of birth required";
    }
    if (step === 2) {
      if (!regData.idNumber.trim()) errs.idNumber = "ID number required";
      if (!regData.address.trim()) errs.address = "Required";
      if (!regData.city.trim()) errs.city = "Required";
      if (!regData.country.trim()) errs.country = "Required";
    }
    if (step === 3) {
      if (!regData.password || regData.password.length < 8) errs.password = "Minimum 8 characters";
      if (regData.password !== regData.confirm) errs.confirm = "Passwords do not match";
      if (!regData.terms) errs.terms = "You must accept the terms to continue";
    }
    return errs;
  };

  const handleRegNext = async () => {
    const errs = validateRegStep(regStep);
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    setRegErrors({});
    if (regStep < 3) { setRegStep(s => s + 1); return; }
    setLoading(true); setServerError("");
    await new Promise(r => setTimeout(r, 1100));
    try {
      const user = authStore.register(regData);
      setLoading(false);
      onSuccess(user, "register");
    } catch (e) {
      setLoading(false);
      setServerError(e.message);
    }
  };

  // Forgot password
  const handleForgot = async () => {
    if (!forgotEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setForgotError("Please enter a valid email address"); return;
    }
    setLoading(true); setForgotError("");
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSuccessMsg(`A password reset link has been sent to ${forgotEmail}`);
  };

  const inputStyle = (err) => ({
    background: "rgba(255,255,255,0.04)", border: `1px solid ${err ? "#e85d5d" : "rgba(212,175,55,0.25)"}`,
    color: "#fff", padding: "13px 16px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem",
    width: "100%", outline: "none", borderRadius: 6, transition: "border-color 0.25s",
  });

  const labelStyle = { fontSize: "0.68rem", letterSpacing: 2, color: "#777", display: "block", marginBottom: 5, textTransform: "uppercase" };
  const errStyle = { color: "#e85d5d", fontSize: "0.7rem", marginTop: 4 };

  const tierColors = { Gold: "#d4af37", Platinum: "#a8d8ea", Diamond: "#f0c040" };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px 16px", overflowY: "auto",
      }}
    >
      <div style={{
        background: "linear-gradient(160deg,#111,#0a0a0a)", border: "1px solid rgba(212,175,55,0.2)",
        borderRadius: 16, width: "100%", maxWidth: 480, position: "relative",
        boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.08)",
        animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Gold top bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg,transparent,#d4af37,transparent)", borderRadius: "16px 16px 0 0" }} />

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "none", color: "#888", fontSize: 18, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; e.currentTarget.style.color = "#d4af37"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#888"; }}>✕</button>

        <div style={{ padding: "32px 36px 36px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#d4af37", letterSpacing: 5, marginBottom: 4 }}>ANVI</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: 3, color: "#555" }}>RESORT & SPA</div>
          </div>

          {/* Mode Tabs */}
          {mode !== "forgot" && (
            <div style={{ display: "flex", gap: 0, marginBottom: 28, border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, overflow: "hidden" }}>
              {["login", "register"].map(m => (
                <button key={m} onClick={() => switchMode(m)} style={{ flex: 1, background: mode === m ? "linear-gradient(135deg,#d4af37,#f0c840)" : "transparent", color: mode === m ? "#000" : "#888", border: "none", padding: "11px 0", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: mode === m ? 600 : 400, transition: "all 0.25s" }}>
                  {m === "login" ? "Sign In" : "Join"}
                </button>
              ))}
            </div>
          )}

          {/* ── SERVER ERROR ── */}
          {serverError && (
            <div style={{ background: "rgba(232,93,93,0.1)", border: "1px solid rgba(232,93,93,0.3)", borderRadius: 6, padding: "10px 14px", marginBottom: 18, color: "#e85d5d", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠️</span>{serverError}
            </div>
          )}

          {/* ── SUCCESS MESSAGE ── */}
          {successMsg && (
            <div style={{ background: "rgba(30,200,160,0.1)", border: "1px solid rgba(30,200,160,0.3)", borderRadius: 6, padding: "10px 14px", marginBottom: 18, color: "#1ec8a0", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 8 }}>
              <span>✅</span>{successMsg}
            </div>
          )}

          {/* ════ LOGIN ════ */}
          {mode === "login" && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 6 }}>Welcome back</h2>
              <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: 24 }}>Sign in to access your membership benefits and reservations.</p>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email Address</label>
                <input name="email" type="email" value={loginData.email} onChange={handleLoginChange}
                  placeholder="your@email.com" style={inputStyle(loginErrors.email)}
                  onFocus={e => e.target.style.borderColor = "#d4af37"}
                  onBlur={e => e.target.style.borderColor = loginErrors.email ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                {loginErrors.email && <p style={errStyle}>{loginErrors.email}</p>}
              </div>

              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input name="password" type={showPass ? "text" : "password"} value={loginData.password} onChange={handleLoginChange}
                    placeholder="••••••••" style={{ ...inputStyle(loginErrors.password), paddingRight: 44 }}
                    onFocus={e => e.target.style.borderColor = "#d4af37"}
                    onBlur={e => e.target.style.borderColor = loginErrors.password ? "#e85d5d" : "rgba(212,175,55,0.25)"}
                    onKeyDown={e => e.key === "Enter" && handleLogin()} />
                  <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>{showPass ? "🙈" : "👁"}</button>
                </div>
                {loginErrors.password && <p style={errStyle}>{loginErrors.password}</p>}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.75rem", color: "#666" }}>
                  <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange} style={{ accentColor: "#d4af37", width: 14, height: 14 }} />
                  Remember me
                </label>
                <button onClick={() => switchMode("forgot")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.75rem", cursor: "pointer", letterSpacing: 0.5 }}>Forgot password?</button>
              </div>

              <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />Signing in…</> : "Sign In →"}
              </button>

              <div style={{ marginTop: 20, textAlign: "center" }}>
                <span style={{ color: "#555", fontSize: "0.78rem" }}>Don't have an account? </span>
                <button onClick={() => switchMode("register")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.78rem", cursor: "pointer", textDecoration: "underline" }}>Join Anvi</button>
              </div>
            </div>
          )}

          {/* ════ REGISTER ════ */}
          {mode === "register" && (
            <div>
              {/* Step Indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28, position: "relative" }}>
                {[1, 2, 3].map((s, i) => (
                  <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    {i < 2 && <div style={{ position: "absolute", top: 14, left: "50%", right: "-50%", height: 1, background: s < regStep ? "#d4af37" : "rgba(212,175,55,0.2)", zIndex: 0 }} />}
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: s < regStep ? "#d4af37" : s === regStep ? "linear-gradient(135deg,#d4af37,#f0c840)" : "rgba(255,255,255,0.06)", border: `2px solid ${s <= regStep ? "#d4af37" : "rgba(212,175,55,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", color: s <= regStep ? "#000" : "#555", fontWeight: 700, zIndex: 1, position: "relative", transition: "all 0.3s" }}>
                      {s < regStep ? "✓" : s}
                    </div>
                    <div style={{ fontSize: "0.6rem", color: s === regStep ? "#d4af37" : "#555", marginTop: 5, letterSpacing: 1, textAlign: "center", textTransform: "uppercase" }}>
                      {["Personal", "Details", "Security"][i]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step 1 — Personal Info */}
              {regStep === 1 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Personal Information</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input name="firstName" value={regData.firstName} onChange={handleRegChange} placeholder="Arjun" style={inputStyle(regErrors.firstName)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.firstName ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.firstName && <p style={errStyle}>{regErrors.firstName}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input name="lastName" value={regData.lastName} onChange={handleRegChange} placeholder="Mehta" style={inputStyle(regErrors.lastName)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.lastName ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.lastName && <p style={errStyle}>{regErrors.lastName}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" type="email" value={regData.email} onChange={handleRegChange} placeholder="arjun@example.com" style={inputStyle(regErrors.email)}
                      onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.email ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                    {regErrors.email && <p style={errStyle}>{regErrors.email}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input name="phone" value={regData.phone} onChange={handleRegChange} placeholder="+91 98765 43210" style={inputStyle(regErrors.phone)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.phone ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.phone && <p style={errStyle}>{regErrors.phone}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Date of Birth</label>
                      <input name="dob" type="date" value={regData.dob} onChange={handleRegChange} style={inputStyle(regErrors.dob)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.dob ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.dob && <p style={errStyle}>{regErrors.dob}</p>}
                    </div>
                  </div>
                  {/* Tier Selection */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ ...labelStyle, marginBottom: 10 }}>Membership Tier</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {MEMBERSHIP_TIERS.map(t => (
                        <button key={t.tier} onClick={() => setRegData(p => ({ ...p, tier: t.tier }))}
                          style={{ flex: 1, border: `1px solid ${regData.tier === t.tier ? t.color : "rgba(212,175,55,0.15)"}`, background: regData.tier === t.tier ? `${t.color}18` : "rgba(255,255,255,0.02)", borderRadius: 8, padding: "10px 6px", cursor: "pointer", transition: "all 0.25s", textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
                          <div style={{ fontSize: "0.68rem", color: regData.tier === t.tier ? t.color : "#666", letterSpacing: 1, fontWeight: 600 }}>{t.tier}</div>
                          <div style={{ fontSize: "0.6rem", color: "#555", marginTop: 2 }}>{t.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 — Identity & Address */}
              {regStep === 2 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Identity & Address</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>ID Type</label>
                      <select name="idType" value={regData.idType} onChange={handleRegChange} style={{ ...inputStyle(false), cursor: "pointer" }}>
                        {["Passport", "Aadhar Card", "PAN Card", "Driving Licence", "Voter ID"].map(t => <option key={t} style={{ background: "#111" }}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>ID Number</label>
                      <input name="idNumber" value={regData.idNumber} onChange={handleRegChange} placeholder="AB1234567" style={inputStyle(regErrors.idNumber)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.idNumber ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.idNumber && <p style={errStyle}>{regErrors.idNumber}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Street Address</label>
                    <input name="address" value={regData.address} onChange={handleRegChange} placeholder="12 MG Road, Indiranagar" style={inputStyle(regErrors.address)}
                      onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.address ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                    {regErrors.address && <p style={errStyle}>{regErrors.address}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input name="city" value={regData.city} onChange={handleRegChange} placeholder="Bengaluru" style={inputStyle(regErrors.city)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.city ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.city && <p style={errStyle}>{regErrors.city}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input name="country" value={regData.country} onChange={handleRegChange} placeholder="India" style={inputStyle(regErrors.country)}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.country ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      {regErrors.country && <p style={errStyle}>{regErrors.country}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Nationality</label>
                    <input name="nationality" value={regData.nationality} onChange={handleRegChange} placeholder="Indian" style={inputStyle(false)}
                      onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.25)"} />
                  </div>
                </>
              )}

              {/* Step 3 — Security & Preferences */}
              {regStep === 3 && (
                <>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 20 }}>Security & Preferences</h2>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Create Password</label>
                    <div style={{ position: "relative" }}>
                      <input name="password" type={showPass ? "text" : "password"} value={regData.password} onChange={handleRegChange}
                        placeholder="Minimum 8 characters" style={{ ...inputStyle(regErrors.password), paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.password ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>{showPass ? "🙈" : "👁"}</button>
                    </div>
                    {/* Strength bar */}
                    {regData.password && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: "flex", gap: 4, marginBottom: 3 }}>
                          {[1, 2, 3, 4].map(lvl => {
                            const strength = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(regData.password)).length;
                            return <div key={lvl} style={{ flex: 1, height: 3, borderRadius: 2, background: lvl <= strength ? (strength <= 1 ? "#e85d5d" : strength <= 2 ? "#f0a028" : strength <= 3 ? "#1ec8a0" : "#d4af37") : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />;
                          })}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "#555" }}>
                          {[/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(regData.password)).length <= 1 ? "Weak" :
                            [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(regData.password)).length <= 2 ? "Fair" :
                            [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(regData.password)).length <= 3 ? "Good" : "Strong"} password
                        </div>
                      </div>
                    )}
                    {regErrors.password && <p style={errStyle}>{regErrors.password}</p>}
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <input name="confirm" type={showConfirm ? "text" : "password"} value={regData.confirm} onChange={handleRegChange}
                        placeholder="Re-enter your password" style={{ ...inputStyle(regErrors.confirm), paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = regErrors.confirm ? "#e85d5d" : "rgba(212,175,55,0.25)"} />
                      <button onClick={() => setShowConfirm(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>{showConfirm ? "🙈" : "👁"}</button>
                    </div>
                    {regErrors.confirm && <p style={errStyle}>{regErrors.confirm}</p>}
                  </div>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 10 }}>
                    <input type="checkbox" name="newsletter" checked={regData.newsletter} onChange={handleRegChange} style={{ accentColor: "#d4af37", width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.5 }}>Send me exclusive offers, new room launches, and members-only events</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 4 }}>
                    <input type="checkbox" name="terms" checked={regData.terms} onChange={handleRegChange} style={{ accentColor: "#d4af37", width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.5 }}>I agree to the <span style={{ color: "#d4af37", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "#d4af37", cursor: "pointer" }}>Privacy Policy</span></span>
                  </label>
                  {regErrors.terms && <p style={errStyle}>{regErrors.terms}</p>}
                </>
              )}

              {/* Navigation buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {regStep > 1 && (
                  <button onClick={() => { setRegStep(s => s - 1); setRegErrors({}); }} style={{ flex: 1, background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid rgba(255,255,255,0.1)", padding: "13px", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", borderRadius: 8, transition: "all 0.2s" }}>← Back</button>
                )}
                <button onClick={handleRegNext} disabled={loading} style={{ flex: 2, background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "13px", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {loading ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />Creating account…</> : regStep < 3 ? `Continue →` : "Create My Account"}
                </button>
              </div>
            </div>
          )}

          {/* ════ FORGOT PASSWORD ════ */}
          {mode === "forgot" && (
            <div>
              <button onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "0.75rem", cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>← Back to Sign In</button>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 300, color: "#f5f0e8", marginBottom: 8 }}>Reset Password</h2>
              <p style={{ color: "#555", fontSize: "0.8rem", marginBottom: 24 }}>Enter your registered email and we'll send you a secure reset link.</p>
              {!successMsg ? (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={forgotEmail} onChange={e => { setForgotEmail(e.target.value); setForgotError(""); }}
                      placeholder="your@email.com" style={inputStyle(forgotError)}
                      onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = forgotError ? "#e85d5d" : "rgba(212,175,55,0.25)"}
                      onKeyDown={e => e.key === "Enter" && handleForgot()} />
                    {forgotError && <p style={errStyle}>{forgotError}</p>}
                  </div>
                  <button onClick={handleForgot} disabled={loading} style={{ width: "100%", background: loading ? "rgba(212,175,55,0.3)" : "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {loading ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />Sending…</> : "Send Reset Link"}
                  </button>
                </>
              ) : (
                <button onClick={() => switchMode("login")} style={{ width: "100%", background: "linear-gradient(135deg,#d4af37,#f0c840)", color: "#000", border: "none", padding: "14px", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, borderRadius: 8, marginTop: 12 }}>Back to Sign In</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── USER WELCOME BANNER ──────────────────────────────────────────────────────
function UserBanner({ user, onLogout }) {
  const tierColor = { Gold: "#d4af37", Platinum: "#a8d8ea", Diamond: "#f0c040" }[user.tier] || "#d4af37";
  return (
    <div style={{ position: "fixed", top: 70, right: 24, zIndex: 998, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(16px)", border: `1px solid ${tierColor}44`, borderRadius: 12, padding: "14px 18px", boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${tierColor}22`, animation: "slideIn 0.4s cubic-bezier(0.34,1.56,0.64,1)", minWidth: 220 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${tierColor}22`, border: `1.5px solid ${tierColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: tierColor, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif" }}>
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div>
          <div style={{ fontSize: "0.82rem", color: "#f5f0e8", fontWeight: 500 }}>{user.firstName} {user.lastName}</div>
          <div style={{ fontSize: "0.62rem", color: tierColor, letterSpacing: 1.5 }}>{user.tier.toUpperCase()} MEMBER</div>
        </div>
      </div>
      <button onClick={onLogout} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", padding: "7px", fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans'", borderRadius: 6, transition: "all 0.2s" }}
        onMouseOver={e => { e.currentTarget.style.background = "rgba(232,93,93,0.1)"; e.currentTarget.style.borderColor = "rgba(232,93,93,0.3)"; e.currentTarget.style.color = "#e85d5d"; }}
        onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#888"; }}>
        Sign Out
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomCategory, setRoomCategory] = useState("All");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [galleryHover, setGalleryHover] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", checkin: "", checkout: "", room: "", guests: "2", requests: "" });
  const [formSent, setFormSent] = useState(false);

  // Auth state
  const [authModal, setAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserBanner, setShowUserBanner] = useState(false);
  const [authToast, setAuthToast] = useState(null);

  const sectionRefs = useRef({});
  const autoTestimonial = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    autoTestimonial.current = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(autoTestimonial.current);
  }, []);

  const scrollTo = useCallback((section) => {
    setActive(section);
    setMenuOpen(false);
    const el = sectionRefs.current[section];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleAuthSuccess = (user, type) => {
    setCurrentUser(user);
    setAuthModal(false);
    setShowUserBanner(true);
    const msg = type === "register"
      ? `Welcome to Anvi, ${user.firstName}! Your ${user.tier} membership is active.`
      : `Welcome back, ${user.firstName}!`;
    setAuthToast({ msg, type: "success" });
    setTimeout(() => setAuthToast(null), 4000);
    setTimeout(() => setShowUserBanner(false), 6000);
  };

  const handleLogout = () => {
    authStore.logout();
    setCurrentUser(null);
    setShowUserBanner(false);
    setAuthToast({ msg: "You've been signed out. See you soon.", type: "info" });
    setTimeout(() => setAuthToast(null), 3500);
  };

  const filteredRooms = roomCategory === "All" ? ROOMS : ROOMS.filter(r => r.category === roomCategory || (roomCategory === "Other" && !["Classic","Deluxe","Suite","Villa","Penthouse","Bungalow","Studio","Loft","Treehouse"].includes(r.category)));

  const openLightbox = (idx) => { setLightboxIdx(idx); setLightbox(true); };
  const lightboxPrev = () => setLightboxIdx(i => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length);
  const lightboxNext = () => setLightboxIdx(i => (i + 1) % GALLERY_IMGS.length);

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFormSubmit = () => {
    if (formData.name && formData.email && formData.checkin) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 5000);
    }
  };

  const policyColors = { info: { bg: "rgba(91,141,238,0.08)", border: "rgba(91,141,238,0.3)", icon: "#5b8dee" }, warning: { bg: "rgba(240,160,40,0.08)", border: "rgba(240,160,40,0.3)", icon: "#f0a028" }, danger: { bg: "rgba(232,93,93,0.08)", border: "rgba(232,93,93,0.3)", icon: "#e85d5d" }, success: { bg: "rgba(30,200,160,0.08)", border: "rgba(30,200,160,0.3)", icon: "#1ec8a0" }, gold: { bg: "rgba(212,175,55,0.08)", border: "rgba(212,175,55,0.3)", icon: "#d4af37" } };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{--gold:#d4af37;--gold-light:#f0d060;--dark:#080808;--dark2:#0e0e0e;--mid:#181818;--light:#f5f0e8;--text:#bbb;--card:#141414;}
    html{scroll-behavior:smooth;}
    body{background:var(--dark);color:var(--light);font-family:'DM Sans',sans-serif;overflow-x:hidden;}
    h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.35);}50%{box-shadow:0 0 0 14px rgba(212,175,55,0);}}
    @keyframes rotateIn{from{opacity:0;transform:rotate(-5deg) scale(0.95);}to{opacity:1;transform:rotate(0) scale(1);}}
    @keyframes stepPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
    @keyframes marqueeScroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
    @keyframes slideIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
    @keyframes toastIn{from{opacity:0;transform:translateX(100%);}to{opacity:1;transform:translateX(0);}}
    .fade-up{animation:fadeUp 0.9s ease both;}
    .fade-in{animation:fadeIn 1.2s ease both;}
    .gold{color:var(--gold);}
    .section-title{font-size:clamp(2rem,5vw,3.5rem);font-weight:300;letter-spacing:2px;margin-bottom:8px;}
    .section-sub{color:var(--gold);font-size:0.72rem;letter-spacing:6px;text-transform:uppercase;font-family:'DM Sans',sans-serif;margin-bottom:16px;}
    .divider{width:60px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:0 auto 40px;}
    .btn-gold{background:linear-gradient(135deg,#d4af37,#f0c840);color:#000;border:none;padding:14px 36px;font-size:0.78rem;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Sans';font-weight:500;transition:all 0.3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,175,55,0.4);}
    .btn-outline{background:transparent;color:var(--gold);border:1px solid rgba(212,175,55,0.5);padding:11px 28px;font-size:0.75rem;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-family:'DM Sans';transition:all 0.3s;}
    .btn-outline:hover{background:var(--gold);color:#000;}
    section{padding:100px 24px;text-align:center;}
    .card{background:var(--card);border:1px solid rgba(212,175,55,0.12);transition:transform 0.35s,border-color 0.35s,box-shadow 0.35s;overflow:hidden;}
    .card:hover{transform:translateY(-6px);border-color:rgba(212,175,55,0.4);box-shadow:0 20px 60px rgba(0,0,0,0.5);}
    input,textarea,select{background:rgba(255,255,255,0.04);border:1px solid rgba(212,175,55,0.2);color:#fff;padding:14px 18px;font-family:'DM Sans';font-size:0.9rem;width:100%;outline:none;transition:border-color 0.3s,background 0.3s;border-radius:4px;}
    input:focus,textarea:focus,select:focus{border-color:var(--gold);background:rgba(212,175,55,0.04);}
    input::placeholder,textarea::placeholder{color:#555;}
    select option{background:#111;color:#fff;}
    input[type="checkbox"]{width:auto;margin-right:8px;}
    .gallery-item{position:relative;overflow:hidden;cursor:pointer;border-radius:4px;}
    .gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s;}
    .gallery-item:hover img{transform:scale(1.1);filter:brightness(0.75);}
    .gallery-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity 0.4s;background:linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6));}
    .gallery-item:hover .gallery-overlay{opacity:1;}
    .err{color:#e85d5d;font-size:0.72rem;margin-top:4px;}
    @media(max-width:768px){section{padding:70px 16px;}}
    @media(max-width:768px){.desktop-nav{display:none!important;}.hamburger{display:block!important;}[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}
  `;

  return (
    <>
      <style>{css}</style>

      {/* AUTH MODAL */}
      {authModal && <AuthModal onClose={() => setAuthModal(false)} onSuccess={handleAuthSuccess} />}

      {/* USER WELCOME BANNER */}
      {currentUser && showUserBanner && <UserBanner user={currentUser} onLogout={handleLogout} />}

      {/* TOAST NOTIFICATION */}
      {authToast && (
        <div style={{ position: "fixed", bottom: 28, right: 24, zIndex: 9998, background: authToast.type === "success" ? "rgba(30,200,160,0.12)" : "rgba(91,141,238,0.12)", border: `1px solid ${authToast.type === "success" ? "rgba(30,200,160,0.4)" : "rgba(91,141,238,0.4)"}`, borderRadius: 10, padding: "14px 20px", color: authToast.type === "success" ? "#1ec8a0" : "#5b8dee", fontSize: "0.82rem", maxWidth: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)", backdropFilter: "blur(10px)" }}>
          <span style={{ marginRight: 8 }}>{authToast.type === "success" ? "✅" : "ℹ️"}</span>{authToast.msg}
        </div>
      )}

      {/* ═══ NAV ═══ */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(8,8,8,0.96)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(212,175,55,0.1)":"none",transition:"all 0.4s",padding:"0 40px",display:"flex",alignItems:"center",justifyContent:"space-between",height:70 }}>
        <div style={{ display:"flex",alignItems:"center",gap:14,cursor:"pointer" }} onClick={()=>scrollTo("Home")}>
          <img src="bgbomg.jpeg" alt="Anvi" style={{ width:42,height:42,borderRadius:"50%",objectFit:"cover",border:"2px solid #d4af37",boxShadow:"0 0 12px rgba(212,175,55,0.4)",flexShrink:0 }} />
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:400,letterSpacing:6,color:"#d4af37",textShadow:"0 0 20px rgba(212,175,55,0.4)" }}>
            ANVI<span style={{ color:"#ffffff",fontSize:12,letterSpacing:3,marginLeft:8,verticalAlign:"middle",fontWeight:300 }}>RESORT & SPA</span>
          </div>
        </div>
        <div style={{ display:"flex",gap:24,alignItems:"center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={()=>scrollTo(link)} style={{ background:"none",border:"none",color:active===link?"#d4af37":"#fff",cursor:"pointer",fontSize:"0.72rem",letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'DM Sans'",fontWeight:400,transition:"color 0.3s",borderBottom:active===link?"1px solid #d4af37":"1px solid transparent",paddingBottom:2 }}>{link}</button>
          ))}
          {/* Auth Button */}
          {currentUser ? (
            <button onClick={() => setShowUserBanner(p => !p)} style={{ background:"rgba(212,175,55,0.1)",border:"1px solid rgba(212,175,55,0.35)",color:"#d4af37",cursor:"pointer",fontSize:"0.7rem",letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Sans'",padding:"8px 16px",borderRadius:20,transition:"all 0.25s",display:"flex",alignItems:"center",gap:6 }}>
              <span style={{ width:22,height:22,borderRadius:"50%",background:"rgba(212,175,55,0.2)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700 }}>{currentUser.firstName[0]}</span>
              {currentUser.firstName}
            </button>
          ) : (
            <button onClick={() => setAuthModal(true)} style={{ background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",border:"none",cursor:"pointer",fontSize:"0.7rem",letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Sans'",fontWeight:600,padding:"9px 20px",borderRadius:20,transition:"all 0.25s" }}
              onMouseOver={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseOut={e=>e.currentTarget.style.transform="translateY(0)"}>
              Sign In / Join
            </button>
          )}
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{ display:"none",background:"none",border:"none",color:"#d4af37",fontSize:24,cursor:"pointer" }} className="hamburger">☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed",top:70,left:0,right:0,background:"rgba(8,8,8,0.99)",zIndex:999,padding:"28px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:24,borderBottom:"1px solid rgba(212,175,55,0.1)" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={()=>scrollTo(link)} style={{ background:"none",border:"none",color:active===link?"#d4af37":"#fff",cursor:"pointer",fontSize:"0.9rem",letterSpacing:2,textTransform:"uppercase",fontFamily:"'DM Sans'" }}>{link}</button>
          ))}
          {!currentUser && <button onClick={()=>{setMenuOpen(false);setAuthModal(true);}} style={{ background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",border:"none",cursor:"pointer",fontSize:"0.8rem",letterSpacing:2,padding:"10px 28px",borderRadius:20,fontFamily:"'DM Sans'",fontWeight:600 }}>Sign In / Join</button>}
        </div>
      )}

      {/* ═══ HOME HERO ═══ */}
      <section ref={el=>sectionRefs.current["Home"]=el} style={{ padding:0,position:"relative",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
        <video autoPlay loop playsInline style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0 }} src="VID-20260524-WA0001_1_.mp4"
          ref={el=>{if(el){el.muted=false;el.volume=1;el.play().catch(()=>{el.muted=true;el.play().catch(()=>{});const u=()=>{el.muted=false;document.removeEventListener("click",u);};document.addEventListener("click",u,{once:true});});}}}
        />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.75) 50%,rgba(8,8,8,0.99) 100%)",zIndex:1 }} />

        <div style={{ position:"relative",zIndex:2,textAlign:"center",padding:"70px 24px 0",maxWidth:960,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
          <h1 className="fade-up" style={{ fontSize:"clamp(3rem,9vw,7rem)",fontWeight:300,letterSpacing:"0.08em",lineHeight:1.05,animationDelay:"0.4s",color:"#ffffff",textShadow:"0 2px 24px rgba(0,0,0,0.9)",marginBottom:4 }}>ANVI</h1>
          <p className="fade-up" style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(1.4rem,4vw,2.8rem)",color:"#d4af37",letterSpacing:4,animationDelay:"0.5s",marginBottom:20,fontWeight:300 }}>Resort &amp; Spa</p>

          <div className="fade-up" style={{ animationDelay:"0.55s",marginBottom:18 }}>
            <div style={{ width:108,height:108,borderRadius:"50%",border:"3px solid #d4af37",boxShadow:"0 0 0 6px rgba(212,175,55,0.18),0 10px 40px rgba(0,0,0,0.8)",overflow:"hidden" }}>
              <img src="bgbomg.jpeg" alt="Anvi Owner" style={{ width:"100%",height:"130%",objectFit:"cover",objectPosition:"center 10%",marginTop:"-8%" }} />
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay:"0.6s",display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:18 }}>
            {[
              { name:"Instagram", url:"https://instagram.com", color:"#E1306C", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
              { name:"Facebook", url:"https://facebook.com", color:"#1877F2", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              { name:"X / Twitter", url:"https://twitter.com", color:"#fff", svg:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name:"LinkedIn", url:"https://linkedin.com", color:"#0A66C2", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { name:"YouTube", url:"https://youtube.com", color:"#FF0000", svg:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
              { name:"WhatsApp", url:"https://wa.me/", color:"#25D366", svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
            ].map(s=>(
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                style={{ display:"flex",alignItems:"center",gap:7,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(10px)",border:"1px solid rgba(212,175,55,0.35)",borderRadius:20,padding:"7px 16px",textDecoration:"none",transition:"all 0.3s",color:s.color }}
                onMouseOver={e=>{ e.currentTarget.style.background=`${s.color}22`; e.currentTarget.style.borderColor=s.color; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseOut={e=>{ e.currentTarget.style.background="rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor="rgba(212,175,55,0.35)"; e.currentTarget.style.transform="translateY(0)"; }}>
                {s.svg}
                <span style={{ fontSize:"0.65rem",color:"#fff",letterSpacing:1,whiteSpace:"nowrap",fontFamily:"'DM Sans'" }}>{s.name}</span>
              </a>
            ))}
          </div>

          <div className="fade-up" style={{ width:100,height:1,background:"linear-gradient(to right,transparent,#d4af37,transparent)",margin:"0 auto 18px",animationDelay:"0.65s" }} />

          <p className="fade-up" style={{ margin:"0 auto 24px",maxWidth:560,fontSize:"1.05rem",fontWeight:300,color:"#ffffff",lineHeight:1.9,animationDelay:"0.7s",textShadow:"0 1px 10px rgba(0,0,0,0.95)" }}>
            Where timeless luxury meets the art of living. 32 extraordinary suites. One unforgettable world.
          </p>

          <div className="fade-up" style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animationDelay:"0.85s",marginBottom:28 }}>
            <button className="btn-gold" onClick={()=>scrollTo("Rooms")}>Explore 32 Suites</button>
            <button className="btn-outline" onClick={()=>setAuthModal(true)}>Become a Member</button>
            <button className="btn-outline" onClick={()=>scrollTo("Contact")}>Reserve Now</button>
          </div>

          <div className="fade-up" style={{ display:"flex",gap:0,justifyContent:"center",animationDelay:"1s",border:"1px solid rgba(212,175,55,0.2)",borderRadius:4,overflow:"hidden",maxWidth:700,width:"100%",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(14px)" }}>
            {[["32+","Unique Rooms"],["5","Restaurants"],["12","Awards"],["24/7","Butler"],["3:1","Staff Ratio"]].map(([n,l],i)=>(
              <div key={l} style={{ flex:1,textAlign:"center",padding:"16px 8px",borderRight:i<4?"1px solid rgba(212,175,55,0.12)":"none" }}>
                <div style={{ fontFamily:"'Cormorant Garamond'",fontSize:"1.6rem",color:"#d4af37",fontWeight:300,lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:"0.56rem",letterSpacing:2,color:"#ccc",marginTop:4 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reserve bar */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,zIndex:3,background:"rgba(8,8,8,0.92)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(212,175,55,0.2)",padding:"14px 40px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",justifyContent:"center" }}>
          <span style={{ color:"#d4af37",fontSize:"0.65rem",letterSpacing:3,whiteSpace:"nowrap" }}>QUICK RESERVE</span>
          <div style={{ width:1,height:28,background:"rgba(212,175,55,0.2)" }} />
          {[["CHECK-IN","checkin","date"],["CHECK-OUT","checkout","date"]].map(([label,name,type])=>(
            <div key={name} style={{ display:"flex",flexDirection:"column",gap:3 }}>
              <span style={{ fontSize:"0.58rem",letterSpacing:2,color:"#555" }}>{label}</span>
              <input type={type} name={name} value={formData[name]} onChange={handleFormChange} style={{ background:"transparent",border:"none",borderBottom:"1px solid rgba(212,175,55,0.3)",borderRadius:0,padding:"4px 8px",color:"#ccc",fontSize:"0.82rem",width:130,outline:"none" }} />
            </div>
          ))}
          <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
            <span style={{ fontSize:"0.58rem",letterSpacing:2,color:"#555" }}>GUESTS</span>
            <select name="guests" value={formData.guests} onChange={handleFormChange} style={{ background:"#111",border:"none",borderBottom:"1px solid rgba(212,175,55,0.3)",borderRadius:0,padding:"4px 8px",color:"#ccc",fontSize:"0.82rem",width:110,outline:"none" }}>
              {[1,2,3,4,5,6].map(n=><option key={n} style={{background:"#111"}}>{n} {n===1?"Guest":"Guests"}</option>)}
            </select>
          </div>
          <button className="btn-gold" style={{ padding:"10px 28px",fontSize:"0.72rem",letterSpacing:2 }} onClick={()=>scrollTo("Contact")}>Check Availability →</button>
        </div>
      </section>

      {/* ═══ FEATURE HIGHLIGHTS STRIP ═══ */}
      <div style={{ background:"#050505",padding:"0 24px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderBottom:"1px solid rgba(212,175,55,0.08)" }}>
          {[
            { icon:"🏆", title:"Forbes 5-Star", sub:"Certified luxury since 2012" },
            { icon:"🍽️", title:"Michelin Dining", sub:"Chef-crafted seasonal menus" },
            { icon:"♻️", title:"Eco-Certified", sub:"Carbon neutral since 2023" },
            { icon:"🛎️", title:"24/7 Butler", sub:"3 staff members per guest" },
          ].map((f,i)=>(
            <div key={i} style={{ padding:"28px 24px",display:"flex",alignItems:"center",gap:16,borderRight:i<3?"1px solid rgba(212,175,55,0.08)":"none",transition:"background 0.3s",cursor:"default" }}
              onMouseOver={e=>e.currentTarget.style.background="rgba(212,175,55,0.04)"}
              onMouseOut={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ fontSize:28,flexShrink:0 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",color:"#d4af37",marginBottom:3 }}>{f.title}</div>
                <div style={{ fontSize:"0.72rem",color:"#555",lineHeight:1.4 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ANVI ═══ */}
      <section style={{ background:"#0a0a0a", padding:"120px 24px", textAlign:"left" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div style={{ position:"relative", height:600 }}>
            <div style={{ position:"absolute", top:0, left:0, width:"75%", height:"68%", overflow:"hidden", borderRadius:2, border:"1px solid rgba(212,175,55,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=85" alt="Anvi Lobby" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.88)" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(212,175,55,0.08), transparent)" }} />
            </div>
            <div style={{ position:"absolute", bottom:0, right:0, width:"62%", height:"52%", overflow:"hidden", borderRadius:2, border:"1px solid rgba(212,175,55,0.2)", boxShadow:"0 32px 80px rgba(0,0,0,0.7)" }}>
              <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=85" alt="Anvi Pool" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.85)" }} />
            </div>
            <div style={{ position:"absolute", top:"42%", right:"18%", background:"linear-gradient(135deg,#d4af37,#f0c840)", color:"#000", padding:"18px 22px", borderRadius:3, textAlign:"center", boxShadow:"0 16px 48px rgba(212,175,55,0.35)", zIndex:5 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:300, lineHeight:1 }}>18</div>
              <div style={{ fontSize:"0.6rem", letterSpacing:3, fontWeight:600, marginTop:3 }}>YEARS OF<br/>EXCELLENCE</div>
            </div>
          </div>
          <div>
            <p style={{ color:"#d4af37", fontSize:"0.7rem", letterSpacing:6, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:20 }}>Our Story</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.2rem)", fontWeight:300, lineHeight:1.15, marginBottom:28, color:"#f5f0e8", letterSpacing:1 }}>
              A Legacy Forged<br /><em style={{ color:"#d4af37", fontStyle:"italic" }}>in Gold</em>
            </h2>
            <div style={{ width:50, height:1, background:"linear-gradient(to right,#d4af37,transparent)", marginBottom:28 }} />
            <p style={{ color:"#888", lineHeight:1.95, fontSize:"0.92rem", marginBottom:20 }}>
              Founded in 2008 by visionary hotelier <strong style={{color:"#ccc"}}>Vikram Nair</strong>, Anvi was conceived as a counter to the era's sterile luxury — a place where every surface, scent, and sound was intentional.
            </p>
            <p style={{ color:"#888", lineHeight:1.95, fontSize:"0.92rem", marginBottom:20 }}>
              Nestled in the heart of Bengaluru, our 32 bespoke rooms and suites draw from Indian heritage while embracing global sophistication.
            </p>
            <p style={{ color:"#888", lineHeight:1.95, fontSize:"0.92rem", marginBottom:40 }}>
              Today, Anvi holds <strong style={{color:"#d4af37"}}>12 international awards</strong>, a Michelin recognition for our flagship restaurant, and the loyalty of guests from over 60 countries.
            </p>
            <div style={{ display:"flex", gap:40, marginBottom:44 }}>
              {[["Michelin","Recognition"],["Forbes","5-Star Rated"],["Condé Nast","Top 10 India"]].map(([title,sub])=>(
                <div key={title}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", color:"#d4af37", fontWeight:400, marginBottom:4 }}>{title}</div>
                  <div style={{ fontSize:"0.65rem", letterSpacing:2, color:"#555" }}>{sub.toUpperCase()}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn-gold" onClick={()=>scrollTo("Rooms")}>Explore Our Rooms</button>
              <button className="btn-outline" onClick={()=>setAuthModal(true)}>Join Membership</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <div style={{ background:"linear-gradient(135deg,rgba(212,175,55,0.07),rgba(212,175,55,0.02))", borderTop:"1px solid rgba(212,175,55,0.12)", borderBottom:"1px solid rgba(212,175,55,0.12)", padding:"52px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0, textAlign:"center" }}>
          {[["32+","Unique Rooms & Suites"],["60+","Countries Represented"],["98%","Guest Return Rate"],["12","Global Awards"],["5★","Michelin Recognition"]].map(([num, label], i)=>(
            <div key={label} style={{ borderRight: i < 4 ? "1px solid rgba(212,175,55,0.1)" : "none", padding:"8px 0" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3rem)", color:"#d4af37", fontWeight:300, lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:"0.65rem", letterSpacing:2.5, color:"#666", marginTop:8, lineHeight:1.4 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ MEMBERSHIP CTA STRIP ═══ */}
      <div style={{ background:"linear-gradient(135deg,#0d0900,#080808)", borderTop:"1px solid rgba(212,175,55,0.15)", borderBottom:"1px solid rgba(212,175,55,0.15)", padding:"64px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", flexWrap:"wrap" }}>
          <div>
            <p style={{ color:"#d4af37", fontSize:"0.65rem", letterSpacing:6, marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>EXCLUSIVE MEMBERSHIP</p>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:300, color:"#f5f0e8", marginBottom:12 }}>Join the Anvi Circle</h3>
            <p style={{ color:"#666", fontSize:"0.85rem", lineHeight:1.7, maxWidth:520 }}>Gold, Platinum & Diamond tiers with exclusive perks — from guaranteed suite upgrades to personal butlers and helipad transfers.</p>
            <div style={{ display:"flex", gap:24, marginTop:20 }}>
              {MEMBERSHIP_TIERS.map(t => (
                <div key={t.tier} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:18 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize:"0.72rem", color:t.color, fontWeight:600, letterSpacing:1 }}>{t.tier}</div>
                    <div style={{ fontSize:"0.62rem", color:"#555" }}>{t.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"center" }}>
            <button className="btn-gold" onClick={()=>setAuthModal(true)} style={{ whiteSpace:"nowrap" }}>
              {currentUser ? `Welcome, ${currentUser.firstName} ✨` : "Join Now →"}
            </button>
            {!currentUser && <button onClick={()=>setAuthModal(true)} style={{ background:"none",border:"none",color:"#555",fontSize:"0.72rem",cursor:"pointer",letterSpacing:1 }}>Already a member? Sign in</button>}
          </div>
        </div>
      </div>

      {/* ═══ AWARDS MARQUEE ═══ */}
      <div style={{ background:"#0a0a0a", borderTop:"1px solid rgba(212,175,55,0.1)", borderBottom:"1px solid rgba(212,175,55,0.1)", padding:"48px 0", overflow:"hidden" }}>
        <p style={{ textAlign:"center", color:"#d4af37", fontSize:"0.65rem", letterSpacing:6, textTransform:"uppercase", marginBottom:36, fontFamily:"'DM Sans',sans-serif" }}>Awards & Recognition</p>
        <div style={{ display:"flex", gap:0, animation:"marqueeScroll 32s linear infinite", whiteSpace:"nowrap" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={rep} style={{ display:"flex", gap:0, flexShrink:0 }}>
              {[
                ["🏆","World's Best Hotels 2024","Travel + Leisure"],
                ["⭐","Michelin Recommended","Guide Michelin 2025"],
                ["🌟","Top 10 Luxury Resorts India","Condé Nast Traveller"],
                ["💎","Forbes 5-Star Certified","Forbes Travel Guide"],
                ["🥇","Best Spa Resort — Asia","Tatler Spa Awards"],
                ["🎖","Sustainable Luxury Award","Green Globe Certified"],
                ["👑","Best Urban Hotel","Luxury Travel Magazine"],
                ["🏅","Readers' Choice Award","Condé Nast 2024"],
              ].map(([icon, award, by]) => (
                <div key={award + rep} style={{ display:"inline-flex", alignItems:"center", gap:16, padding:"0 52px", borderRight:"1px solid rgba(212,175,55,0.1)", flexShrink:0 }}>
                  <span style={{ fontSize:22 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"#f0ede0", fontWeight:400 }}>{award}</div>
                    <div style={{ fontSize:"0.65rem", letterSpacing:2.5, color:"#555", marginTop:2 }}>{by.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <section style={{ background:"#080808",padding:"110px 24px",textAlign:"center" }}>
        <p style={{ color:"#d4af37",fontSize:"0.7rem",letterSpacing:6,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16 }}>Recognition & Milestones</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:300,letterSpacing:2,marginBottom:12,color:"#f5f0e8" }}>Our Achievements</h2>
        <div style={{ width:60,height:1,background:"linear-gradient(to right,transparent,#d4af37,transparent)",margin:"0 auto 20px" }} />
        <p style={{ color:"#666",maxWidth:560,margin:"0 auto 64px",lineHeight:1.85,fontSize:"0.88rem" }}>
          Built on a foundation of passion, dedication, and an unwavering commitment to excellence — these milestones mark our journey.
        </p>

        {/* Owner spotlight with photo */}
        <div style={{ maxWidth:1100,margin:"0 auto 72px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",textAlign:"left" }}>
          <div style={{ position:"relative" }}>
            <div style={{ borderRadius:12,overflow:"hidden",border:"1px solid rgba(212,175,55,0.25)",boxShadow:"0 32px 80px rgba(0,0,0,0.6)",position:"relative" }}>
              <img src="IMG-20260522-WA0001.jpg" alt="Anvi Resort Founder" style={{ width:"100%",height:520,objectFit:"cover",objectPosition:"center top",filter:"brightness(0.9)" }} />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
              <div style={{ position:"absolute",bottom:24,left:24,right:24 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",color:"#f5f0e8",fontWeight:300 }}>Anvi Vikram Nair</div>
                <div style={{ fontSize:"0.68rem",color:"#d4af37",letterSpacing:3,marginTop:4 }}>FOUNDER & VISIONARY · ANVI RESORT & SPA</div>
              </div>
            </div>
            {/* Gold floating badge */}
            <div style={{ position:"absolute",top:-16,right:-16,background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"16px 18px",borderRadius:8,textAlign:"center",boxShadow:"0 12px 40px rgba(212,175,55,0.4)",zIndex:5 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,lineHeight:1 }}>18</div>
              <div style={{ fontSize:"0.55rem",letterSpacing:2,fontWeight:700,marginTop:2 }}>YEARS OF<br/>EXCELLENCE</div>
            </div>
          </div>

          <div>
            <p style={{ color:"#d4af37",fontSize:"0.7rem",letterSpacing:6,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",marginBottom:16 }}>The Visionary Behind Anvi</p>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:300,lineHeight:1.2,marginBottom:24,color:"#f5f0e8" }}>
              A Dream Built on<br /><em style={{ color:"#d4af37" }}>Gold Standards</em>
            </h3>
            <div style={{ width:50,height:1,background:"linear-gradient(to right,#d4af37,transparent)",marginBottom:24 }} />
            <p style={{ color:"#888",lineHeight:1.95,fontSize:"0.9rem",marginBottom:16 }}>
              What began as a bold vision in 2008 has become one of India's most celebrated luxury destinations. Every decision — from the thread count of our linens to the sourcing of our menu ingredients — reflects an obsession with the extraordinary.
            </p>
            <p style={{ color:"#888",lineHeight:1.95,fontSize:"0.9rem",marginBottom:32 }}>
              Trained in hospitality at the École hôtelière de Lausanne and mentored by some of the world's finest hoteliers, Anvi Vikram Nair has dedicated two decades to redefining what Indian luxury can look like on the world stage.
            </p>

            {/* Achievement milestones */}
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { year:"2008", milestone:"Founded Anvi Resort & Spa in Bengaluru with just 12 rooms" },
                { year:"2012", milestone:"Received Forbes 5-Star certification — first in Karnataka" },
                { year:"2016", milestone:"Expanded to 32 unique suites; launched the Infinity Spa" },
                { year:"2019", milestone:"Michelin Guide recognition for flagship restaurant Prana" },
                { year:"2022", milestone:"Named India's #1 Luxury Resort by Condé Nast Traveller" },
                { year:"2024", milestone:"Celebrated 60,000 guests from 60+ countries worldwide" },
                { year:"2025", milestone:"Carbon neutral certification & 12th international award" },
              ].map((a,i)=>(
                <div key={i} style={{ display:"flex",gap:16,alignItems:"flex-start" }}>
                  <div style={{ background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"4px 10px",borderRadius:4,fontSize:"0.65rem",fontWeight:700,letterSpacing:1,flexShrink:0,marginTop:2 }}>{a.year}</div>
                  <div style={{ color:"#888",fontSize:"0.82rem",lineHeight:1.6,borderBottom:"1px solid rgba(255,255,255,0.04)",paddingBottom:10,flex:1 }}>{a.milestone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement stat cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20,maxWidth:1100,margin:"0 auto" }}>
          {[
            { icon:"🏆", num:"12", label:"International Awards", sub:"Across 8 categories globally" },
            { icon:"⭐", num:"4.9", label:"Average Guest Rating", sub:"Across all platforms" },
            { icon:"🌍", num:"60+", label:"Countries Represented", sub:"Guests from every continent" },
            { icon:"🛎️", num:"98%", label:"Return Guest Rate", sub:"The highest in India" },
            { icon:"👨‍🍳", num:"5★", label:"Michelin Recognition", sub:"Restaurant Prana, since 2019" },
            { icon:"♻️", num:"100%", label:"Carbon Neutral", sub:"Green Globe Certified 2023" },
          ].map((s,i)=>(
            <div key={i} style={{ background:"rgba(212,175,55,0.04)",border:"1px solid rgba(212,175,55,0.12)",borderRadius:10,padding:"28px 20px",textAlign:"center",transition:"all 0.3s",cursor:"default" }}
              onMouseOver={e=>{e.currentTarget.style.background="rgba(212,175,55,0.08)";e.currentTarget.style.borderColor="rgba(212,175,55,0.35)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseOut={e=>{e.currentTarget.style.background="rgba(212,175,55,0.04)";e.currentTarget.style.borderColor="rgba(212,175,55,0.12)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{ fontSize:32,marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:"#d4af37",fontWeight:300,lineHeight:1 }}>{s.num}</div>
              <div style={{ color:"#f5f0e8",fontSize:"0.78rem",marginTop:6,fontWeight:500 }}>{s.label}</div>
              <div style={{ color:"#555",fontSize:"0.65rem",marginTop:4,lineHeight:1.4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ROOMS ═══ */}
      <div ref={el=>sectionRefs.current["Rooms"]=el} style={{ background:"#0e0e0e" }}>
        <div style={{ position:"relative", width:"100%", height:"500px", overflow:"hidden" }}>
          <video autoPlay muted loop playsInline style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }} src="room.mp4" />
          <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(14,14,14,1) 100%)" }} />
          <div style={{ position:"absolute", inset:0, zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px" }}>
            <p style={{ color:"#d4af37", fontSize:"0.72rem", letterSpacing:6, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif", marginBottom:16 }}>Accommodation</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:300, letterSpacing:2, marginBottom:16, color:"#f5f0e8" }}>32 Rooms & Suites</h2>
            <div style={{ width:60, height:1, background:"linear-gradient(to right,transparent,#d4af37,transparent)", marginBottom:20 }} />
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1rem", fontWeight:300, maxWidth:480, lineHeight:1.8 }}>From intimate studios to palatial villas — every room is a world of its own.</p>
          </div>
        </div>
        <section style={{ padding:"60px 24px 100px", textAlign:"center" }}>
          <div style={{ display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",maxWidth:900,margin:"0 auto 48px" }}>
            {CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>setRoomCategory(cat)} style={{ background:roomCategory===cat?"linear-gradient(135deg,#d4af37,#f0c840)":"rgba(255,255,255,0.06)",color:roomCategory===cat?"#000":"#888",border:`1px solid ${roomCategory===cat?"transparent":"rgba(212,175,55,0.2)"}`,padding:"8px 18px",fontSize:"0.72rem",letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"'DM Sans'",transition:"all 0.25s" }}>{cat}</button>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24,maxWidth:1200,margin:"0 auto" }}>
            {filteredRooms.map((room,i)=>(
              <div key={room.id} className="card fade-in" style={{ animationDelay:`${i*0.06}s`,borderRadius:8 }}>
                <div style={{ position:"relative",overflow:"hidden",height:220 }}>
                  <img src={room.img} alt={room.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.6s" }}
                    onMouseOver={e=>e.target.style.transform="scale(1.08)"}
                    onMouseOut={e=>e.target.style.transform="scale(1)"} />
                  <div style={{ position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.7))" }} />
                  <div style={{ position:"absolute",top:14,left:14,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",color:"#d4af37",padding:"4px 12px",fontSize:"0.68rem",letterSpacing:2,border:"1px solid rgba(212,175,55,0.3)",borderRadius:2 }}>{room.category.toUpperCase()}</div>
                  <div style={{ position:"absolute",top:14,right:14,background:"linear-gradient(135deg,#d4af37,#f0c840)",color:"#000",padding:"5px 12px",fontSize:"0.78rem",fontWeight:600,borderRadius:2 }}>FROM ${room.price}</div>
                  <div style={{ position:"absolute",bottom:12,left:16,display:"flex",gap:8 }}>
                    <span style={{ background:"rgba(0,0,0,0.7)",color:"#ccc",padding:"3px 10px",fontSize:"0.65rem",borderRadius:2 }}>📐 {room.size}</span>
                    <span style={{ background:"rgba(0,0,0,0.7)",color:"#ccc",padding:"3px 10px",fontSize:"0.65rem",borderRadius:2 }}>👥 {room.capacity}</span>
                  </div>
                </div>
                <div style={{ padding:"20px 20px 22px" }}>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:400,color:"#f5f0e8",marginBottom:8 }}>{room.name}</h3>
                  <p style={{ color:"#666",fontSize:"0.78rem",lineHeight:1.7,marginBottom:14 }}>{room.desc}</p>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:16 }}>
                    {room.amenities.map(a=>(
                      <span key={a} style={{ background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.15)",color:"#888",padding:"3px 10px",fontSize:"0.65rem",borderRadius:20 }}>{a}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex",gap:10 }}>
                    <button onClick={()=>setSelectedRoom(room)} className="btn-outline" style={{ flex:1,padding:"10px",fontSize:"0.68rem",letterSpacing:2 }}>View Details</button>
                    <button onClick={()=>scrollTo("Contact")} className="btn-gold" style={{ flex:1,padding:"10px",fontSize:"0.68rem",letterSpacing:2,clipPath:"none",borderRadius:4 }}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div onClick={e=>{if(e.target===e.currentTarget)setSelectedRoom(null);}} style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px" }}>
          <div style={{ background:"#111",border:"1px solid rgba(212,175,55,0.2)",borderRadius:12,maxWidth:700,width:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative" }}>
            <button onClick={()=>setSelectedRoom(null)} style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:18,zIndex:2 }}>✕</button>
            <img src={selectedRoom.img} alt={selectedRoom.name} style={{ width:"100%",height:320,objectFit:"cover",borderRadius:"12px 12px 0 0" }} />
            <div style={{ padding:"28px 32px 36px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
                <div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:300,color:"#f5f0e8",marginBottom:4 }}>{selectedRoom.name}</h2>
                  <div style={{ display:"flex",gap:16 }}>
                    <span style={{ color:"#666",fontSize:"0.78rem" }}>📐 {selectedRoom.size}</span>
                    <span style={{ color:"#666",fontSize:"0.78rem" }}>🏢 Floor: {selectedRoom.floor}</span>
                    <span style={{ color:"#666",fontSize:"0.78rem" }}>👥 Up to {selectedRoom.capacity} guests</span>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:"#d4af37",fontWeight:300 }}>${selectedRoom.price}</div>
                  <div style={{ fontSize:"0.65rem",color:"#555",letterSpacing:2 }}>PER NIGHT</div>
                </div>
              </div>
              <p style={{ color:"#888",lineHeight:1.8,marginBottom:20 }}>{selectedRoom.desc}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:24 }}>
                {selectedRoom.amenities.map(a=>(
                  <span key={a} style={{ background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.2)",color:"#ccc",padding:"6px 14px",fontSize:"0.75rem",borderRadius:20 }}>{a}</span>
                ))}
              </div>
              <button onClick={()=>{setSelectedRoom(null);scrollTo("Contact");}} className="btn-gold" style={{ width:"100%",padding:"15px",fontSize:"0.8rem",letterSpacing:3,clipPath:"none",borderRadius:8 }}>Reserve This Room →</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ AMENITIES ═══ */}
      <section ref={el=>sectionRefs.current["Amenities"]=el} style={{ background:"#080808" }}>
        <p className="section-sub">World-Class Facilities</p>
        <h2 className="section-title">Amenities</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20,maxWidth:1100,margin:"0 auto" }}>
          {AMENITIES.map((am,i)=>(
            <div key={i} className="card" style={{ padding:"28px 24px",textAlign:"left",borderRadius:8 }}
              onMouseOver={e=>e.currentTarget.style.background="rgba(212,175,55,0.04)"}
              onMouseOut={e=>e.currentTarget.style.background=""}>
              <div style={{ fontSize:36,marginBottom:14 }}>{am.icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",color:"#d4af37",marginBottom:8 }}>{am.name}</h3>
              <p style={{ color:"#666",fontSize:"0.8rem",lineHeight:1.75 }}>{am.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section ref={el=>sectionRefs.current["Gallery"]=el} style={{ background:"#0a0a0a" }}>
        <p className="section-sub">Visual Journey</p>
        <h2 className="section-title">Gallery</h2>
        <div className="divider" />
        {/* Gallery Video — full width above images */}
        <div style={{ maxWidth:1200,margin:"0 auto 16px",borderRadius:8,overflow:"hidden",border:"1px solid rgba(212,175,55,0.18)",lineHeight:0,position:"relative" }}>
          <video
            src="VID-20260524-WA0003.mp4"
            autoPlay
            loop
            playsInline
            style={{ width:"100%",maxHeight:"520px",objectFit:"cover",display:"block" }}
          />
          <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        </div>

        <div style={{ columns:"3 280px",gap:12,maxWidth:1200,margin:"0 auto" }}>
          {GALLERY_IMGS.map((src,i)=>(
            <div key={i} className="gallery-item" style={{ marginBottom:12,breakInside:"avoid" }} onClick={()=>openLightbox(i)}>
              <img src={src} alt={`Gallery ${i+1}`} style={{ display:"block",width:"100%" }} />
              <div className="gallery-overlay">
                <div style={{ color:"#d4af37",fontSize:24,marginBottom:6 }}>🔍</div>
                <div style={{ color:"#fff",fontSize:"0.7rem",letterSpacing:2 }}>VIEW</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={e=>{if(e.target===e.currentTarget)setLightbox(null);}} style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.97)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <button onClick={lightboxPrev} style={{ position:"absolute",left:24,background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.3)",color:"#d4af37",width:50,height:50,borderRadius:"50%",cursor:"pointer",fontSize:20 }}>‹</button>
          <img src={GALLERY_IMGS[lightboxIdx]} alt="" style={{ maxWidth:"85vw",maxHeight:"85vh",objectFit:"contain",borderRadius:4 }} />
          <button onClick={lightboxNext} style={{ position:"absolute",right:24,background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.3)",color:"#d4af37",width:50,height:50,borderRadius:"50%",cursor:"pointer",fontSize:20 }}>›</button>
          <button onClick={()=>setLightbox(null)} style={{ position:"absolute",top:24,right:24,background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:40,height:40,borderRadius:"50%",cursor:"pointer",fontSize:18 }}>✕</button>
          <div style={{ position:"absolute",bottom:24,color:"#555",fontSize:"0.78rem",letterSpacing:2 }}>{lightboxIdx+1} / {GALLERY_IMGS.length}</div>
        </div>
      )}

      {/* ═══ OFFERS ═══ */}
      <section ref={el=>sectionRefs.current["Offers"]=el} style={{ background:"#060606" }}>
        <p className="section-sub">Limited Time</p>
        <h2 className="section-title">Exclusive Offers</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24,maxWidth:1200,margin:"0 auto" }}>
          {OFFERS.map((o,i)=>(
            <div key={i} className="card" style={{ padding:"28px 24px",textAlign:"left",background:o.gradient,borderRadius:8 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
                <span style={{ fontSize:36 }}>{o.emoji}</span>
                <div style={{ textAlign:"right" }}>
                  <div style={{ background:o.color,color:"#fff",padding:"4px 12px",fontSize:"0.7rem",fontWeight:700,letterSpacing:1,borderRadius:3,marginBottom:4 }}>{o.discount}</div>
                  <div style={{ fontSize:"0.62rem",color:"#666",letterSpacing:1 }}>{o.tag.toUpperCase()}</div>
                </div>
              </div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",color:"#f5f0e8",marginBottom:8 }}>{o.title}</h3>
              <p style={{ color:"#777",fontSize:"0.78rem",lineHeight:1.7,marginBottom:16 }}>{o.desc}</p>
              <Countdown days={o.ends} />
              <div style={{ display:"flex",alignItems:"baseline",gap:12,marginBottom:18 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",color:"#d4af37",fontWeight:300 }}>${o.sale}</span>
                <span style={{ color:"#555",fontSize:"0.85rem",textDecoration:"line-through" }}>${o.original}</span>
                <span style={{ color:"#888",fontSize:"0.75rem" }}>/night</span>
              </div>
              <button onClick={()=>scrollTo("Contact")} className="btn-gold" style={{ width:"100%",padding:"12px",fontSize:"0.72rem",letterSpacing:2,clipPath:"none",borderRadius:6 }}>Claim Offer →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ POLICIES ═══ */}
      <section ref={el=>sectionRefs.current["Policies"]=el} style={{ background:"#0a0a0a" }}>
        <p className="section-sub">Hotel Guidelines</p>
        <h2 className="section-title">Policies</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:20,maxWidth:1100,margin:"0 auto",textAlign:"left" }}>
          {POLICIES.map((p,i)=>{
            const c = policyColors[p.type];
            return (
              <div key={i} style={{ background:c.bg,border:`1px solid ${c.border}`,borderRadius:8,padding:"24px 22px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
                  <span style={{ fontSize:24 }}>{p.icon}</span>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",color:c.icon,fontWeight:400 }}>{p.title}</h3>
                </div>
                <ul style={{ listStyle:"none",padding:0 }}>
                  {p.rules.map((r,j)=>(
                    <li key={j} style={{ display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderBottom:j<p.rules.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
                      <span style={{ color:c.icon,flexShrink:0,marginTop:2 }}>›</span>
                      <span style={{ color:"#888",fontSize:"0.8rem",lineHeight:1.6 }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section ref={el=>sectionRefs.current["Testimonials"]=el} style={{ background:"#080808" }}>
        <p className="section-sub">Guest Voices</p>
        <h2 className="section-title">Testimonials</h2>
        <div className="divider" />
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          {/* Featured rotating testimonial */}
          <div style={{ background:"rgba(212,175,55,0.04)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:12,padding:"44px 48px",position:"relative",minHeight:220,marginBottom:16 }}>
            <div style={{ fontSize:60,color:"rgba(212,175,55,0.15)",position:"absolute",top:20,left:32,fontFamily:"serif",lineHeight:1 }}>"</div>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} style={{ display:i===testimonialIdx?"block":"none",animation:i===testimonialIdx?"fadeIn 0.6s ease":"none" }}>
                <Stars n={t.rating} />
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",color:"#f0ede0",lineHeight:1.8,margin:"18px 0 24px",fontStyle:"italic",fontWeight:300 }}>"{t.text}"</p>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                    <img src={t.img} alt={t.name} style={{ width:56,height:56,borderRadius:"50%",border:"2px solid rgba(212,175,55,0.4)",objectFit:"cover" }} />
                    <div style={{ textAlign:"left" }}>
                      <div style={{ color:"#f5f0e8",fontWeight:500,fontSize:"0.92rem" }}>{t.name}</div>
                      <div style={{ color:"#888",fontSize:"0.75rem" }}>{t.role}</div>
                      <div style={{ color:"#666",fontSize:"0.7rem",marginTop:2 }}>{t.country}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:"0.68rem",color:"#d4af37",letterSpacing:1,border:"1px solid rgba(212,175,55,0.25)",padding:"4px 12px",borderRadius:20,marginBottom:4 }}>{t.stay}</div>
                    <div style={{ fontSize:"0.62rem",color:"#555",letterSpacing:1 }}>{t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:8,justifyContent:"center",marginBottom:56 }}>
            {TESTIMONIALS.map((_,i)=>(
              <button key={i} onClick={()=>setTestimonialIdx(i)} style={{ width:i===testimonialIdx?28:8,height:8,borderRadius:4,background:i===testimonialIdx?"#d4af37":"rgba(212,175,55,0.2)",border:"none",cursor:"pointer",transition:"all 0.35s" }} />
            ))}
          </div>

          {/* Rating summary bar */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginBottom:56,maxWidth:700,margin:"0 auto 56px" }}>
            {[["4.9 / 5","Overall Rating","Based on 2,400+ reviews"],["98%","Would Recommend","To friends & family"],["4.8 / 5","TripAdvisor Score","#1 in Bengaluru"]].map(([num,label,sub])=>(
              <div key={label} style={{ textAlign:"center",background:"rgba(212,175,55,0.04)",border:"1px solid rgba(212,175,55,0.12)",borderRadius:8,padding:"20px 12px" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",color:"#d4af37",fontWeight:300 }}>{num}</div>
                <div style={{ fontSize:"0.72rem",color:"#f5f0e8",marginTop:4,letterSpacing:0.5 }}>{label}</div>
                <div style={{ fontSize:"0.62rem",color:"#555",marginTop:3 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Grid of all review cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16 }}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.02)",border:"1px solid rgba(212,175,55,0.1)",borderRadius:10,padding:"20px",textAlign:"left",transition:"all 0.3s",cursor:"default" }}
                onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(212,175,55,0.35)";e.currentTarget.style.background="rgba(212,175,55,0.04)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(212,175,55,0.1)";e.currentTarget.style.background="rgba(255,255,255,0.02)";}}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
                  <img src={t.img} alt={t.name} style={{ width:42,height:42,borderRadius:"50%",objectFit:"cover",border:"1.5px solid rgba(212,175,55,0.3)" }} />
                  <div>
                    <div style={{ color:"#f5f0e8",fontSize:"0.82rem",fontWeight:500 }}>{t.name}</div>
                    <div style={{ color:"#666",fontSize:"0.68rem" }}>{t.country}</div>
                  </div>
                </div>
                <Stars n={t.rating} />
                <p style={{ color:"#888",fontSize:"0.76rem",lineHeight:1.7,margin:"10px 0 12px",fontStyle:"italic" }}>"{t.text.slice(0,120)}{t.text.length>120?"…":""}"</p>
                <div style={{ fontSize:"0.62rem",color:"#d4af37",letterSpacing:0.5 }}>{t.stay} · {t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <div style={{ background:"linear-gradient(135deg,#0d0900,#080808)",borderTop:"1px solid rgba(212,175,55,0.15)",borderBottom:"1px solid rgba(212,175,55,0.15)",padding:"56px 24px" }}>
        <div style={{ maxWidth:700,margin:"0 auto",textAlign:"center" }}>
          <p style={{ color:"#d4af37",fontSize:"0.65rem",letterSpacing:6,marginBottom:12,fontFamily:"'DM Sans',sans-serif" }}>STAY IN THE LOOP</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:300,color:"#f5f0e8",marginBottom:10 }}>Get Exclusive Offers & New Suite Launches</h3>
          <p style={{ color:"#666",fontSize:"0.82rem",marginBottom:32 }}>Early access to seasonal offers, new room reveals, and members-only events.</p>
          <div style={{ display:"flex",gap:0,maxWidth:480,margin:"0 auto",border:"1px solid rgba(212,175,55,0.3)",borderRadius:3,overflow:"hidden" }}>
            <input type="email" placeholder="Your email address" style={{ flex:1,background:"rgba(255,255,255,0.04)",border:"none",borderRadius:0,padding:"14px 20px",color:"#fff",fontSize:"0.88rem",outline:"none" }} />
            <button className="btn-gold" style={{ borderRadius:0,clipPath:"none",padding:"14px 28px",fontSize:"0.72rem",letterSpacing:2,whiteSpace:"nowrap" }}>Subscribe</button>
          </div>
          <p style={{ color:"#444",fontSize:"0.7rem",marginTop:12 }}>🔒 No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* ═══ CONTACT ═══ */}
      <section ref={el=>sectionRefs.current["Contact"]=el} style={{ background:"#0e0e0e" }}>
        <p className="section-sub">Get In Touch</p>
        <h2 className="section-title">Reserve Your Stay</h2>
        <div className="divider" />
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,maxWidth:1100,margin:"0 auto",textAlign:"left" }}>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",color:"#f5f0e8",marginBottom:20,fontWeight:300 }}>Send Us a Message</h3>
            {formSent ? (
              <div style={{ background:"rgba(30,200,160,0.08)",border:"1px solid rgba(30,200,160,0.3)",borderRadius:8,padding:"28px 24px",textAlign:"center" }}>
                <div style={{ fontSize:40,marginBottom:14 }}>✅</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",color:"#1ec8a0",marginBottom:8 }}>Message Received</h3>
                <p style={{ color:"#666",fontSize:"0.82rem",lineHeight:1.7 }}>Our concierge will contact you within 2 hours to confirm your reservation.</p>
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {[["name","Your Full Name","text"],["email","Email Address","email"],["phone","Phone Number","tel"]].map(([name,ph,type])=>(
                  <div key={name}><input type={type} name={name} placeholder={ph} value={formData[name]} onChange={handleFormChange} style={{ borderRadius:6 }} /></div>
                ))}
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                  <input type="date" name="checkin" value={formData.checkin} onChange={handleFormChange} style={{ borderRadius:6 }} />
                  <input type="date" name="checkout" value={formData.checkout} onChange={handleFormChange} style={{ borderRadius:6 }} />
                </div>
                <select name="room" value={formData.room} onChange={handleFormChange} style={{ borderRadius:6 }}>
                  <option value="">Select a room type</option>
                  {["Deluxe","Suite","Villa","Penthouse","Bungalow","Studio","Other"].map(r=><option key={r} style={{background:"#111"}}>{r}</option>)}
                </select>
                <textarea name="requests" placeholder="Special requests or questions…" value={formData.requests} onChange={handleFormChange} rows={4} style={{ resize:"vertical",borderRadius:6 }} />
                <button onClick={handleFormSubmit} className="btn-gold" style={{ width:"100%",padding:"15px",fontSize:"0.78rem",letterSpacing:3,clipPath:"none",borderRadius:8 }}>Send Reservation Request →</button>
              </div>
            )}
          </div>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",color:"#f5f0e8",marginBottom:20,fontWeight:300 }}>Contact & Location</h3>
            {[
              { icon:"📍", label:"Address", val:"12, Luxury Lane, Indiranagar, Bengaluru 560038" },
              { icon:"📞", label:"Reservations", val:"+91 80 4567 8900" },
              { icon:"✉️", label:"Email", val:"stay@anviresort.com" },
              { icon:"⏰", label:"Concierge Hours", val:"24 hours, 7 days a week" },
            ].map((c,i)=>(
              <div key={i} style={{ display:"flex",gap:16,padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize:22,flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:"0.65rem",letterSpacing:2,color:"#555",marginBottom:3 }}>{c.label.toUpperCase()}</div>
                  <div style={{ color:"#ccc",fontSize:"0.88rem" }}>{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:32,background:"rgba(212,175,55,0.05)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:8,padding:"20px 22px" }}>
              <div style={{ fontSize:"0.7rem",letterSpacing:3,color:"#d4af37",marginBottom:12 }}>BECOME A MEMBER</div>
              <p style={{ color:"#666",fontSize:"0.8rem",lineHeight:1.7,marginBottom:16 }}>Join the Anvi Circle and unlock exclusive rates, priority reservations, and bespoke privileges.</p>
              <button onClick={()=>setAuthModal(true)} className="btn-gold" style={{ clipPath:"none",borderRadius:6,padding:"11px 24px",fontSize:"0.72rem" }}>
                {currentUser ? `Welcome, ${currentUser.firstName} ✨` : "Join Now →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background:"#050505",borderTop:"1px solid rgba(212,175,55,0.1)",padding:"60px 40px 40px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:60,marginBottom:48 }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#d4af37",letterSpacing:5,marginBottom:8 }}>ANVI</div>
              <div style={{ fontSize:"0.62rem",letterSpacing:3,color:"#555",marginBottom:18 }}>RESORT & SPA</div>
              <p style={{ color:"#555",fontSize:"0.78rem",lineHeight:1.9,maxWidth:280 }}>Where timeless luxury meets the art of living. Bengaluru's most celebrated five-star retreat.</p>
            </div>
            {[
              { title:"Navigate", links:NAV_LINKS },
              { title:"Experiences", links:["Private Dining","Spa & Wellness","Water Sports","Cultural Events","Wine Tastings","Art Tours"] },
              { title:"Information", links:["About Anvi","Press & Media","Careers","Partner With Us","Privacy Policy","Terms of Service"] },
            ].map(col=>(
              <div key={col.title}>
                <div style={{ fontSize:"0.62rem",letterSpacing:3,color:"#d4af37",marginBottom:20,fontFamily:"'DM Sans',sans-serif" }}>{col.title.toUpperCase()}</div>
                <ul style={{ listStyle:"none",padding:0 }}>
                  {col.links.map(l=>(
                    <li key={l} style={{ marginBottom:10 }}>
                      <button onClick={()=>{ const ref=sectionRefs.current[l]; if(ref) ref.scrollIntoView({behavior:"smooth"}); }} style={{ background:"none",border:"none",color:"#555",fontSize:"0.78rem",cursor:"pointer",fontFamily:"'DM Sans'",transition:"color 0.2s",padding:0 }}
                        onMouseOver={e=>e.currentTarget.style.color="#d4af37"}
                        onMouseOut={e=>e.currentTarget.style.color="#555"}>{l}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(212,175,55,0.08)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
            <div style={{ color:"#444",fontSize:"0.72rem" }}>© 2025 Anvi Resort & Spa. All rights reserved.</div>
            <div style={{ color:"#444",fontSize:"0.72rem",display:"flex",gap:24 }}>
              <span>Forbes 5-Star Certified</span>
              <span>·</span>
              <span>Michelin Recognised</span>
              <span>·</span>
              <span>Green Globe Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
