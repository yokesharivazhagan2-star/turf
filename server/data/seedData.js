// TURFBOOK Seed Data
// Includes 5 Users (Players), 3 Owners, 1 Admin, 9 Turfs (8 Approved, 1 Pending for Admin verification)

export const initialUsers = [
  { id: 'usr-1', name: 'Arun Kumar', email: 'arun@turfbook.com', role: 'PLAYER', phone: '+91 98401 23456', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', defaultTeamId: 'tm-1' },
  { id: 'usr-2', name: 'Dinesh Karthik', email: 'dinesh@turfbook.com', role: 'PLAYER', phone: '+91 98402 34567', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', defaultTeamId: 'tm-2' },
  { id: 'usr-3', name: 'Rahul Sharma', email: 'rahul@turfbook.com', role: 'PLAYER', phone: '+91 98403 45678', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', defaultTeamId: 'tm-3' },
  { id: 'usr-4', name: 'Priya Sundaram', email: 'priya@turfbook.com', role: 'PLAYER', phone: '+91 98404 56789', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', defaultTeamId: 'tm-4' },
  { id: 'usr-5', name: 'Karthik Raja', email: 'karthik@turfbook.com', role: 'PLAYER', phone: '+91 98405 67890', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', defaultTeamId: null },
];

export const initialOwners = [
  { id: 'own-1', name: 'Arun Sports Group', contactPerson: 'Arunachalam S', email: 'owner.arun@sportsgroup.in', phone: '+91 99401 11223', verified: true },
  { id: 'own-2', name: 'PlaySphere Tamil Nadu', contactPerson: 'Senthil Nathan', email: 'contact@playsphere.in', phone: '+91 99402 22334', verified: true },
  { id: 'own-3', name: 'Apex Arena Ventures', contactPerson: 'Vikram Menon', email: 'admin@apexarenas.in', phone: '+91 99403 33445', verified: true },
];

export const initialAdmin = {
  id: 'adm-1',
  name: 'Platform Administrator',
  email: 'superadmin@turfbook.com',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
};

export const initialTeams = [
  { id: 'tm-1', userId: 'usr-1', name: 'Chennai Strikers', sport: 'Football', players: 10, visibility: 'PUBLIC' },
  { id: 'tm-2', userId: 'usr-2', name: 'Kovai Titans', sport: 'Cricket', players: 11, visibility: 'PUBLIC' },
  { id: 'tm-3', userId: 'usr-3', name: 'Bangalore FC Regulars', sport: 'Football', players: 8, visibility: 'PRIVATE' },
  { id: 'tm-4', userId: 'usr-4', name: 'Smash Club Coimbatore', sport: 'Badminton', players: 4, visibility: 'PUBLIC' },
  { id: 'tm-5', userId: 'usr-5', name: 'Solo Strikers', sport: 'Football', players: 7, visibility: 'PRIVATE' },
];

export const initialSports = [
  { id: 'sp-1', name: 'Football', icon: 'Footprints', popular: true },
  { id: 'sp-2', name: 'Cricket', icon: 'Activity', popular: true },
  { id: 'sp-3', name: 'Badminton', icon: 'Zap', popular: true },
  { id: 'sp-4', name: 'Basketball', icon: 'CircleDot', popular: true },
  { id: 'sp-5', name: 'Volleyball', icon: 'Disc', popular: false },
  { id: 'sp-6', name: 'Tennis', icon: 'Crosshair', popular: false },
];

export const initialFacilitiesList = [
  'FIFA Grade Artificial Turf',
  'LED Floodlights 500 Lux',
  'Covered Weather Canopy',
  'Dressing Room & Showers',
  'Free High-Speed Wi-Fi',
  'Spacious Car & Bike Parking',
  'Chilled RO Drinking Water',
  'Cafeteria & Sports Drinks',
  'First Aid & Ice Packs',
  'Turf Boots & Bibs on Rent',
  'HD Action Camera Recording',
  'Spectator Gallery Seating'
];

export const initialTurfs = [
  {
    "id": "trf-1",
    "ownerId": "own-1",
    "name": "Marina Coastal Arena",
    "slug": "marina-coastal-arena",
    "tagline": "Beachside 7v7 High-Performance Turf",
    "description": "Marina Coastal Arena is a state-of-the-art sports turf in Santhome Marina, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Santhome Marina Main Road, Chennai, Tamil Nadu",
    "area": "Santhome Marina",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 13.0334,
      "lng": 80.2785
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 1200,
      "weekdayRate": 1200,
      "weekendRate": 1400,
      "peakHourRate": 1500,
      "offPeakRate": 1100
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 40
  },
  {
    "id": "trf-2",
    "ownerId": "own-2",
    "name": "OMR TechPark PlayGround",
    "slug": "omr-techpark-playground",
    "tagline": "IT Corridor Premier Artificial Turf",
    "description": "OMR TechPark PlayGround is a state-of-the-art sports turf in Thoraipakkam OMR, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Thoraipakkam OMR Main Road, Chennai, Tamil Nadu",
    "area": "Thoraipakkam OMR",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.9352,
      "lng": 80.2295
    },
    "sports": [
      "Football",
      "Cricket",
      "Basketball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 1100,
      "weekdayRate": 1100,
      "weekendRate": 1300,
      "peakHourRate": 1400,
      "offPeakRate": 1000
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 47
  },
  {
    "id": "trf-3",
    "ownerId": "own-3",
    "name": "Metro Kickers Anna Nagar",
    "slug": "metro-kickers-anna-nagar",
    "tagline": "Central Chennai 5v5 Multisport Hub",
    "description": "Metro Kickers Anna Nagar is a state-of-the-art sports turf in Anna Nagar, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Anna Nagar Main Road, Chennai, Tamil Nadu",
    "area": "Anna Nagar",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 13.085,
      "lng": 80.2101
    },
    "sports": [
      "Football",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 1000,
      "weekdayRate": 1000,
      "weekendRate": 1200,
      "peakHourRate": 1300,
      "offPeakRate": 900
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 54
  },
  {
    "id": "trf-4",
    "ownerId": "own-1",
    "name": "South Chennai Champions Ground",
    "slug": "south-chennai-champions-ground",
    "tagline": "Floodlit Arena with Dugouts",
    "description": "South Chennai Champions Ground is a state-of-the-art sports turf in Velachery, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Velachery Main Road, Chennai, Tamil Nadu",
    "area": "Velachery",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.9815,
      "lng": 80.218
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 950,
      "weekdayRate": 950,
      "weekendRate": 1150,
      "peakHourRate": 1250,
      "offPeakRate": 850
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 61
  },
  {
    "id": "trf-5",
    "ownerId": "own-2",
    "name": "ECR Seaside Box Cricket & Turf",
    "slug": "ecr-seaside-box-cricket-turf",
    "tagline": "Seaside Box Cricket & Football Dome",
    "description": "ECR Seaside Box Cricket & Turf is a state-of-the-art sports turf in Neelankarai ECR, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Neelankarai ECR Main Road, Chennai, Tamil Nadu",
    "area": "Neelankarai ECR",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.949,
      "lng": 80.258
    },
    "sports": [
      "Cricket",
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 1300,
      "weekdayRate": 1300,
      "weekendRate": 1500,
      "peakHourRate": 1600,
      "offPeakRate": 1200
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 68
  },
  {
    "id": "trf-6",
    "ownerId": "own-3",
    "name": "Ambattur Strikers Complex",
    "slug": "ambattur-strikers-complex",
    "tagline": "Industrial Hub Sports Centre",
    "description": "Ambattur Strikers Complex is a state-of-the-art sports turf in Ambattur, Chennai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Ambattur Main Road, Chennai, Tamil Nadu",
    "area": "Ambattur",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 13.1143,
      "lng": 80.1548
    },
    "sports": [
      "Football",
      "Badminton",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 75
  },
  {
    "id": "trf-7",
    "ownerId": "own-1",
    "name": "Elite Sports Arena",
    "slug": "elite-sports-arena",
    "tagline": "Coimbatore’s Premier 7v7 High-Density Turf",
    "description": "Elite Sports Arena is a state-of-the-art sports turf in Saravanampatti, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Saravanampatti Main Road, Coimbatore, Tamil Nadu",
    "area": "Saravanampatti",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0827,
      "lng": 76.9958
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 82
  },
  {
    "id": "trf-8",
    "ownerId": "own-2",
    "name": "Metro Turf Club",
    "slug": "metro-turf-club",
    "tagline": "Dual Multisport Arena with Premium Synthetic Court",
    "description": "Metro Turf Club is a state-of-the-art sports turf in Peelamedu, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Peelamedu Main Road, Coimbatore, Tamil Nadu",
    "area": "Peelamedu",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0315,
      "lng": 77.018
    },
    "sports": [
      "Football",
      "Badminton",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 900,
      "weekdayRate": 900,
      "weekendRate": 1100,
      "peakHourRate": 1200,
      "offPeakRate": 800
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 89
  },
  {
    "id": "trf-9",
    "ownerId": "own-3",
    "name": "GreenField Football Park",
    "slug": "greenfield-football-park",
    "tagline": "Downtown 5v5 Turf with Spectator Dugout",
    "description": "GreenField Football Park is a state-of-the-art sports turf in RS Puram, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "RS Puram Main Road, Coimbatore, Tamil Nadu",
    "area": "RS Puram",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0117,
      "lng": 76.9511
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "PENDING",
    "rating": 4.8,
    "ratingCount": 96
  },
  {
    "id": "trf-10",
    "ownerId": "own-1",
    "name": "Smash & Volley Badminton Complex",
    "slug": "smash-volley-badminton-complex",
    "tagline": "BWF-Approved 4-Court Badminton Arena",
    "description": "Smash & Volley Badminton Complex is a state-of-the-art sports turf in Gandhipuram, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Gandhipuram Main Road, Coimbatore, Tamil Nadu",
    "area": "Gandhipuram",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0168,
      "lng": 76.9673
    },
    "sports": [
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 600,
      "weekdayRate": 600,
      "weekendRate": 800,
      "peakHourRate": 900,
      "offPeakRate": 500
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 103
  },
  {
    "id": "trf-11",
    "ownerId": "own-2",
    "name": "ProKick 7v7 High-Density Arena",
    "slug": "prokick-7v7-high-density-arena",
    "tagline": "50mm Monofilament Synthetic Turf with Floodlights",
    "description": "ProKick 7v7 High-Density Arena is a state-of-the-art sports turf in Singanallur, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Singanallur Main Road, Coimbatore, Tamil Nadu",
    "area": "Singanallur",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.9996,
      "lng": 77.0266
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 110
  },
  {
    "id": "trf-12",
    "ownerId": "own-3",
    "name": "Apex Multi-Sport Turf Hub",
    "slug": "apex-multi-sport-turf-hub",
    "tagline": "Scenic Foothills Football & Box Cricket Arena",
    "description": "Apex Multi-Sport Turf Hub is a state-of-the-art sports turf in Vadavalli, Coimbatore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Vadavalli Main Road, Coimbatore, Tamil Nadu",
    "area": "Vadavalli",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0256,
      "lng": 76.9012
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 117
  },
  {
    "id": "trf-13",
    "ownerId": "own-1",
    "name": "Meenakshi Champions Arena",
    "slug": "meenakshi-champions-arena",
    "tagline": "Premium 7v7 Turf in Temple City",
    "description": "Meenakshi Champions Arena is a state-of-the-art sports turf in KK Nagar, Madurai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "KK Nagar Main Road, Madurai, Tamil Nadu",
    "area": "KK Nagar",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.9295,
      "lng": 78.1462
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 124
  },
  {
    "id": "trf-14",
    "ownerId": "own-2",
    "name": "Pandya Kingdom Soccer Park",
    "slug": "pandya-kingdom-soccer-park",
    "tagline": "High-Density Turf near Integrated Bus Terminal",
    "description": "Pandya Kingdom Soccer Park is a state-of-the-art sports turf in Mattuthavani, Madurai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Mattuthavani Main Road, Madurai, Tamil Nadu",
    "area": "Mattuthavani",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.9472,
      "lng": 78.1578
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 131
  },
  {
    "id": "trf-15",
    "ownerId": "own-3",
    "name": "Temple City Box Cricket & Turf",
    "slug": "temple-city-box-cricket-turf",
    "tagline": "Day & Night Floodlit Sports Hub",
    "description": "Temple City Box Cricket & Turf is a state-of-the-art sports turf in TVS Nagar, Madurai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "TVS Nagar Main Road, Madurai, Tamil Nadu",
    "area": "TVS Nagar",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.9078,
      "lng": 78.1023
    },
    "sports": [
      "Cricket",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 138
  },
  {
    "id": "trf-16",
    "ownerId": "own-1",
    "name": "Othakadai Premier Turf",
    "slug": "othakadai-premier-turf",
    "tagline": "Spacious Outskirts Football Ground",
    "description": "Othakadai Premier Turf is a state-of-the-art sports turf in Othakadai, Madurai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Othakadai Main Road, Madurai, Tamil Nadu",
    "area": "Othakadai",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.9701,
      "lng": 78.1824
    },
    "sports": [
      "Football",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 145
  },
  {
    "id": "trf-17",
    "ownerId": "own-2",
    "name": "Rockfort Champions Arena",
    "slug": "rockfort-champions-arena",
    "tagline": "Heart of Trichy Premier 7v7 Arena",
    "description": "Rockfort Champions Arena is a state-of-the-art sports turf in Thillai Nagar, Tiruchirappalli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Thillai Nagar Main Road, Tiruchirappalli, Tamil Nadu",
    "area": "Thillai Nagar",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.8286,
      "lng": 78.6869
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 152
  },
  {
    "id": "trf-18",
    "ownerId": "own-3",
    "name": "Kaveri Delta Sports Hub",
    "slug": "kaveri-delta-sports-hub",
    "tagline": "Central Trichy Multisport Synthetic Turf",
    "description": "Kaveri Delta Sports Hub is a state-of-the-art sports turf in Cantonment, Tiruchirappalli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Cantonment Main Road, Tiruchirappalli, Tamil Nadu",
    "area": "Cantonment",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.8038,
      "lng": 78.683
    },
    "sports": [
      "Football",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 159
  },
  {
    "id": "trf-19",
    "ownerId": "own-1",
    "name": "Trichy United 5v5 Soccer Park",
    "slug": "trichy-united-5v5-soccer-park",
    "tagline": "Dynamic AstroTurf for Fast-Paced Matches",
    "description": "Trichy United 5v5 Soccer Park is a state-of-the-art sports turf in KK Nagar, Tiruchirappalli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "KK Nagar Main Road, Tiruchirappalli, Tamil Nadu",
    "area": "KK Nagar",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.7745,
      "lng": 78.6989
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 166
  },
  {
    "id": "trf-20",
    "ownerId": "own-2",
    "name": "Srirangam Island Turf & Cricket",
    "slug": "srirangam-island-turf-cricket",
    "tagline": "Island City Box Cricket & Football Pitch",
    "description": "Srirangam Island Turf & Cricket is a state-of-the-art sports turf in Srirangam, Tiruchirappalli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Srirangam Main Road, Tiruchirappalli, Tamil Nadu",
    "area": "Srirangam",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.8624,
      "lng": 78.6946
    },
    "sports": [
      "Cricket",
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 173
  },
  {
    "id": "trf-21",
    "ownerId": "own-3",
    "name": "Shevaroy Foothills Sports Turf",
    "slug": "shevaroy-foothills-sports-turf",
    "tagline": "Scenic High-Altitude Football Arena",
    "description": "Shevaroy Foothills Sports Turf is a state-of-the-art sports turf in Fairlands, Salem. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Fairlands Main Road, Salem, Tamil Nadu",
    "area": "Fairlands",
    "city": "Salem",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.6748,
      "lng": 78.1408
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 180
  },
  {
    "id": "trf-22",
    "ownerId": "own-1",
    "name": "Steel City Athletic Park",
    "slug": "steel-city-athletic-park",
    "tagline": "FIFA-Standard Turf with LED Towers",
    "description": "Steel City Athletic Park is a state-of-the-art sports turf in Hasthampatti, Salem. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Hasthampatti Main Road, Salem, Tamil Nadu",
    "area": "Hasthampatti",
    "city": "Salem",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.6789,
      "lng": 78.1634
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 187
  },
  {
    "id": "trf-23",
    "ownerId": "own-2",
    "name": "Salem Central Box Cricket & Turf",
    "slug": "salem-central-box-cricket-turf",
    "tagline": "Covered Box Cricket & 5v5 Football Pitch",
    "description": "Salem Central Box Cricket & Turf is a state-of-the-art sports turf in Alagapuram, Salem. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Alagapuram Main Road, Salem, Tamil Nadu",
    "area": "Alagapuram",
    "city": "Salem",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.6841,
      "lng": 78.134
    },
    "sports": [
      "Cricket",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 194
  },
  {
    "id": "trf-24",
    "ownerId": "own-3",
    "name": "Knit City Soccer Dome",
    "slug": "knit-city-soccer-dome",
    "tagline": "Tiruppur Textile Corridor Premier Turf",
    "description": "Knit City Soccer Dome is a state-of-the-art sports turf in Avinashi Road, Tiruppur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Avinashi Road Main Road, Tiruppur, Tamil Nadu",
    "area": "Avinashi Road",
    "city": "Tiruppur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.1189,
      "lng": 77.3456
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 201
  },
  {
    "id": "trf-25",
    "ownerId": "own-1",
    "name": "Kongu Sports Arena",
    "slug": "kongu-sports-arena",
    "tagline": "Modern 7v7 Football Ground with Dugouts",
    "description": "Kongu Sports Arena is a state-of-the-art sports turf in Kangeyam Road, Tiruppur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Kangeyam Road Main Road, Tiruppur, Tamil Nadu",
    "area": "Kangeyam Road",
    "city": "Tiruppur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0967,
      "lng": 77.3621
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 208
  },
  {
    "id": "trf-26",
    "ownerId": "own-2",
    "name": "Tiruppur Strikers Turf",
    "slug": "tiruppur-strikers-turf",
    "tagline": "All-Weather Box Cricket & Football Facility",
    "description": "Tiruppur Strikers Turf is a state-of-the-art sports turf in Palladam Road, Tiruppur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Palladam Road Main Road, Tiruppur, Tamil Nadu",
    "area": "Palladam Road",
    "city": "Tiruppur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.0821,
      "lng": 77.3325
    },
    "sports": [
      "Cricket",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 215
  },
  {
    "id": "trf-27",
    "ownerId": "own-3",
    "name": "Turmeric City Sports Hub",
    "slug": "turmeric-city-sports-hub",
    "tagline": "Premier Sports Venue in Western Tamil Nadu",
    "description": "Turmeric City Sports Hub is a state-of-the-art sports turf in Perundurai Road, Erode. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Perundurai Road Main Road, Erode, Tamil Nadu",
    "area": "Perundurai Road",
    "city": "Erode",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.3324,
      "lng": 77.7123
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 222
  },
  {
    "id": "trf-28",
    "ownerId": "own-1",
    "name": "Bhavani River Turf Arena",
    "slug": "bhavani-river-turf-arena",
    "tagline": "5v5 Artificial Turf with Player Gallery",
    "description": "Bhavani River Turf Arena is a state-of-the-art sports turf in Thindal, Erode. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Thindal Main Road, Erode, Tamil Nadu",
    "area": "Thindal",
    "city": "Erode",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.3145,
      "lng": 77.689
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 229
  },
  {
    "id": "trf-29",
    "ownerId": "own-2",
    "name": "Erode Central Box Cricket Pitch",
    "slug": "erode-central-box-cricket-pitch",
    "tagline": "Indoor & Outdoor Sports Recreation Hub",
    "description": "Erode Central Box Cricket Pitch is a state-of-the-art sports turf in Brough Road, Erode. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Brough Road Main Road, Erode, Tamil Nadu",
    "area": "Brough Road",
    "city": "Erode",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.3412,
      "lng": 77.7289
    },
    "sports": [
      "Cricket",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 236
  },
  {
    "id": "trf-30",
    "ownerId": "own-3",
    "name": "Vellore Fort City Arena",
    "slug": "vellore-fort-city-arena",
    "tagline": "Katpadi Junction Premier 7v7 Turf",
    "description": "Vellore Fort City Arena is a state-of-the-art sports turf in Katpadi, Vellore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Katpadi Main Road, Vellore, Tamil Nadu",
    "area": "Katpadi",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.9698,
      "lng": 79.1389
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 800,
      "weekdayRate": 800,
      "weekendRate": 1000,
      "peakHourRate": 1100,
      "offPeakRate": 700
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 243
  },
  {
    "id": "trf-31",
    "ownerId": "own-1",
    "name": "Palar Valley Sports Ground",
    "slug": "palar-valley-sports-ground",
    "tagline": "All-Weather Multi-Sport Facility",
    "description": "Palar Valley Sports Ground is a state-of-the-art sports turf in Gandhi Nagar, Vellore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Gandhi Nagar Main Road, Vellore, Tamil Nadu",
    "area": "Gandhi Nagar",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.9567,
      "lng": 79.1412
    },
    "sports": [
      "Football",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 250
  },
  {
    "id": "trf-32",
    "ownerId": "own-2",
    "name": "Nellai Strikers Football Turf",
    "slug": "nellai-strikers-football-turf",
    "tagline": "Oxford of South India Premier Turf",
    "description": "Nellai Strikers Football Turf is a state-of-the-art sports turf in Palayamkottai, Tirunelveli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Palayamkottai Main Road, Tirunelveli, Tamil Nadu",
    "area": "Palayamkottai",
    "city": "Tirunelveli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.7139,
      "lng": 77.7314
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 257
  },
  {
    "id": "trf-33",
    "ownerId": "own-3",
    "name": "South Coast Multi-Sport Arena",
    "slug": "south-coast-multi-sport-arena",
    "tagline": "Modern Box Cricket and 5v5 Soccer Dome",
    "description": "South Coast Multi-Sport Arena is a state-of-the-art sports turf in Vannarpettai, Tirunelveli. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Vannarpettai Main Road, Tirunelveli, Tamil Nadu",
    "area": "Vannarpettai",
    "city": "Tirunelveli",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.729,
      "lng": 77.718
    },
    "sports": [
      "Cricket",
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 264
  },
  {
    "id": "trf-34",
    "ownerId": "own-1",
    "name": "Pearl City Maritime Turf",
    "slug": "pearl-city-maritime-turf",
    "tagline": "Deepwater Portside 7v7 Football Park",
    "description": "Pearl City Maritime Turf is a state-of-the-art sports turf in Millerpuram, Thoothukudi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Millerpuram Main Road, Thoothukudi, Tamil Nadu",
    "area": "Millerpuram",
    "city": "Thoothukudi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.7945,
      "lng": 78.132
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 271
  },
  {
    "id": "trf-35",
    "ownerId": "own-2",
    "name": "Tuticorin Portside Sports Club",
    "slug": "tuticorin-portside-sports-club",
    "tagline": "Coastal Turf with LED Floodlights",
    "description": "Tuticorin Portside Sports Club is a state-of-the-art sports turf in Bryant Nagar, Thoothukudi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Bryant Nagar Main Road, Thoothukudi, Tamil Nadu",
    "area": "Bryant Nagar",
    "city": "Thoothukudi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.8067,
      "lng": 78.1512
    },
    "sports": [
      "Football",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 278
  },
  {
    "id": "trf-36",
    "ownerId": "own-3",
    "name": "Dindigul Lock City Turf",
    "slug": "dindigul-lock-city-turf",
    "tagline": "Lock City Premier Artificial Turf",
    "description": "Dindigul Lock City Turf is a state-of-the-art sports turf in GTN Road, Dindigul. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "GTN Road Main Road, Dindigul, Tamil Nadu",
    "area": "GTN Road",
    "city": "Dindigul",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.3624,
      "lng": 77.9803
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 285
  },
  {
    "id": "trf-37",
    "ownerId": "own-1",
    "name": "Sirumalai View Arena",
    "slug": "sirumalai-view-arena",
    "tagline": "Hillview 5v5 Football Ground",
    "description": "Sirumalai View Arena is a state-of-the-art sports turf in Palani Road, Dindigul. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Palani Road Main Road, Dindigul, Tamil Nadu",
    "area": "Palani Road",
    "city": "Dindigul",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.3712,
      "lng": 77.962
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 292
  },
  {
    "id": "trf-38",
    "ownerId": "own-2",
    "name": "Brihadisvara Delta Sports Turf",
    "slug": "brihadisvara-delta-sports-turf",
    "tagline": "Heritage Capital Premier Football Pitch",
    "description": "Brihadisvara Delta Sports Turf is a state-of-the-art sports turf in Medical College Road, Thanjavur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Medical College Road Main Road, Thanjavur, Tamil Nadu",
    "area": "Medical College Road",
    "city": "Thanjavur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.7689,
      "lng": 79.1234
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 299
  },
  {
    "id": "trf-39",
    "ownerId": "own-3",
    "name": "Royal Chola Football Ground",
    "slug": "royal-chola-football-ground",
    "tagline": "Central Thanjavur Multisport Arena",
    "description": "Royal Chola Football Ground is a state-of-the-art sports turf in New Bus Stand, Thanjavur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "New Bus Stand Main Road, Thanjavur, Tamil Nadu",
    "area": "New Bus Stand",
    "city": "Thanjavur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.7723,
      "lng": 79.1089
    },
    "sports": [
      "Football",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 306
  },
  {
    "id": "trf-40",
    "ownerId": "own-1",
    "name": "Hosur Borderline Sports Park",
    "slug": "hosur-borderline-sports-park",
    "tagline": "Bengaluru-TN Border High-Tech Turf",
    "description": "Hosur Borderline Sports Park is a state-of-the-art sports turf in SIPCOT Industrial Hub, Hosur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "SIPCOT Industrial Hub Main Road, Hosur, Tamil Nadu",
    "area": "SIPCOT Industrial Hub",
    "city": "Hosur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.7409,
      "lng": 77.8253
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 900,
      "weekdayRate": 900,
      "weekendRate": 1100,
      "peakHourRate": 1200,
      "offPeakRate": 800
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 313
  },
  {
    "id": "trf-41",
    "ownerId": "own-2",
    "name": "Silicon Gateway Turf Arena",
    "slug": "silicon-gateway-turf-arena",
    "tagline": "Corporate Leagues and Weekend Matches",
    "description": "Silicon Gateway Turf Arena is a state-of-the-art sports turf in Bagalur Road, Hosur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Bagalur Road Main Road, Hosur, Tamil Nadu",
    "area": "Bagalur Road",
    "city": "Hosur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.754,
      "lng": 77.8389
    },
    "sports": [
      "Football",
      "Basketball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 850,
      "weekdayRate": 850,
      "weekendRate": 1050,
      "peakHourRate": 1150,
      "offPeakRate": 750
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 320
  },
  {
    "id": "trf-42",
    "ownerId": "own-3",
    "name": "Kanyakumari South Tip Arena",
    "slug": "kanyakumari-south-tip-arena",
    "tagline": "India’s Southernmost Premier Turf",
    "description": "Kanyakumari South Tip Arena is a state-of-the-art sports turf in Vadasery, Nagercoil. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Vadasery Main Road, Nagercoil, Tamil Nadu",
    "area": "Vadasery",
    "city": "Nagercoil",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.189,
      "lng": 77.4289
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 327
  },
  {
    "id": "trf-43",
    "ownerId": "own-1",
    "name": "Cape Comorin Turf Park",
    "slug": "cape-comorin-turf-park",
    "tagline": "Lush Green All-Weather Synthetic Court",
    "description": "Cape Comorin Turf Park is a state-of-the-art sports turf in Kottar, Nagercoil. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Kottar Main Road, Nagercoil, Tamil Nadu",
    "area": "Kottar",
    "city": "Nagercoil",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.1723,
      "lng": 77.4412
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 334
  },
  {
    "id": "trf-44",
    "ownerId": "own-2",
    "name": "Silk City Multi-Sport Turf",
    "slug": "silk-city-multi-sport-turf",
    "tagline": "Historical Silk City Sports Arena",
    "description": "Silk City Multi-Sport Turf is a state-of-the-art sports turf in Gandhi Road, Kanchipuram. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Gandhi Road Main Road, Kanchipuram, Tamil Nadu",
    "area": "Gandhi Road",
    "city": "Kanchipuram",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.8342,
      "lng": 79.7036
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 341
  },
  {
    "id": "trf-45",
    "ownerId": "own-3",
    "name": "Varadharaja Sports Club",
    "slug": "varadharaja-sports-club",
    "tagline": "Floodlit 5v5 Soccer & Box Cricket Pitch",
    "description": "Varadharaja Sports Club is a state-of-the-art sports turf in Ennaikaran, Kanchipuram. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Ennaikaran Main Road, Kanchipuram, Tamil Nadu",
    "area": "Ennaikaran",
    "city": "Kanchipuram",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.842,
      "lng": 79.698
    },
    "sports": [
      "Cricket",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 348
  },
  {
    "id": "trf-46",
    "ownerId": "own-1",
    "name": "Silver Beach Coastal Turf",
    "slug": "silver-beach-coastal-turf",
    "tagline": "Beachside Football Turf with Cool Sea Breeze",
    "description": "Silver Beach Coastal Turf is a state-of-the-art sports turf in Silver Beach Road, Cuddalore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Silver Beach Road Main Road, Cuddalore, Tamil Nadu",
    "area": "Silver Beach Road",
    "city": "Cuddalore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.742,
      "lng": 79.7745
    },
    "sports": [
      "Football",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 355
  },
  {
    "id": "trf-47",
    "ownerId": "own-2",
    "name": "Pennaiyar River Sports Park",
    "slug": "pennaiyar-river-sports-park",
    "tagline": "Central Cuddalore Multisport Turf",
    "description": "Pennaiyar River Sports Park is a state-of-the-art sports turf in Semmandalam, Cuddalore. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Semmandalam Main Road, Cuddalore, Tamil Nadu",
    "area": "Semmandalam",
    "city": "Cuddalore",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.7564,
      "lng": 79.7612
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 362
  },
  {
    "id": "trf-48",
    "ownerId": "own-3",
    "name": "Mahamaham Temple Turf",
    "slug": "mahamaham-temple-turf",
    "tagline": "Temple City Heart Multi-Sport Venue",
    "description": "Mahamaham Temple Turf is a state-of-the-art sports turf in TSR Big Street, Kumbakonam. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "TSR Big Street Main Road, Kumbakonam, Tamil Nadu",
    "area": "TSR Big Street",
    "city": "Kumbakonam",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.9602,
      "lng": 79.3845
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 369
  },
  {
    "id": "trf-49",
    "ownerId": "own-1",
    "name": "Cauvery Classic Box Cricket",
    "slug": "cauvery-classic-box-cricket",
    "tagline": "Bypass Road All-Weather Box Cricket Pitch",
    "description": "Cauvery Classic Box Cricket is a state-of-the-art sports turf in Chennai Bypass, Kumbakonam. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Chennai Bypass Main Road, Kumbakonam, Tamil Nadu",
    "area": "Chennai Bypass",
    "city": "Kumbakonam",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.9723,
      "lng": 79.4012
    },
    "sports": [
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 600,
      "weekdayRate": 600,
      "weekendRate": 800,
      "peakHourRate": 900,
      "offPeakRate": 500
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 376
  },
  {
    "id": "trf-50",
    "ownerId": "own-2",
    "name": "Amaravathi Riverview Turf",
    "slug": "amaravathi-riverview-turf",
    "tagline": "Textile Capital Premier 7v7 Arena",
    "description": "Amaravathi Riverview Turf is a state-of-the-art sports turf in Kovai Road, Karur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Kovai Road Main Road, Karur, Tamil Nadu",
    "area": "Kovai Road",
    "city": "Karur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.9578,
      "lng": 78.0765
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 383
  },
  {
    "id": "trf-51",
    "ownerId": "own-3",
    "name": "Karur Textile Arena",
    "slug": "karur-textile-arena",
    "tagline": "Modern 5v5 AstroTurf with Spectator Seating",
    "description": "Karur Textile Arena is a state-of-the-art sports turf in Thanthonimalai, Karur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Thanthonimalai Main Road, Karur, Tamil Nadu",
    "area": "Thanthonimalai",
    "city": "Karur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.932,
      "lng": 78.0845
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 390
  },
  {
    "id": "trf-52",
    "ownerId": "own-1",
    "name": "Anjaneyar Sports Ground",
    "slug": "anjaneyar-sports-ground",
    "tagline": "Fort City High-Density Soccer Pitch",
    "description": "Anjaneyar Sports Ground is a state-of-the-art sports turf in Mohanur Road, Namakkal. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Mohanur Road Main Road, Namakkal, Tamil Nadu",
    "area": "Mohanur Road",
    "city": "Namakkal",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.2189,
      "lng": 78.1678
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 397
  },
  {
    "id": "trf-53",
    "ownerId": "own-2",
    "name": "Namakkal Transport Hub Turf",
    "slug": "namakkal-transport-hub-turf",
    "tagline": "Highway Corridor Multi-Sport Facility",
    "description": "Namakkal Transport Hub Turf is a state-of-the-art sports turf in Paramathi Road, Namakkal. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Paramathi Road Main Road, Namakkal, Tamil Nadu",
    "area": "Paramathi Road",
    "city": "Namakkal",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.2045,
      "lng": 78.1523
    },
    "sports": [
      "Cricket",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 404
  },
  {
    "id": "trf-54",
    "ownerId": "own-3",
    "name": "Sivakasi Spark Arena",
    "slug": "sivakasi-spark-arena",
    "tagline": "Industrial City High-Paced Football Turf",
    "description": "Sivakasi Spark Arena is a state-of-the-art sports turf in Sattur Road, Sivakasi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Sattur Road Main Road, Sivakasi, Tamil Nadu",
    "area": "Sattur Road",
    "city": "Sivakasi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.4532,
      "lng": 77.7989
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 411
  },
  {
    "id": "trf-55",
    "ownerId": "own-1",
    "name": "Virudhunagar District Turf Club",
    "slug": "virudhunagar-district-turf-club",
    "tagline": "Floodlit 5v5 Soccer Court",
    "description": "Virudhunagar District Turf Club is a state-of-the-art sports turf in Thiruthangal, Sivakasi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Thiruthangal Main Road, Sivakasi, Tamil Nadu",
    "area": "Thiruthangal",
    "city": "Sivakasi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.4789,
      "lng": 77.8123
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 418
  },
  {
    "id": "trf-56",
    "ownerId": "own-2",
    "name": "Pudukkottai Royal Sports Hub",
    "slug": "pudukkottai-royal-sports-hub",
    "tagline": "Historic Princely City Turf Arena",
    "description": "Pudukkottai Royal Sports Hub is a state-of-the-art sports turf in Alangudi Road, Pudukkottai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Alangudi Road Main Road, Pudukkottai, Tamil Nadu",
    "area": "Alangudi Road",
    "city": "Pudukkottai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.3812,
      "lng": 78.8234
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 425
  },
  {
    "id": "trf-57",
    "ownerId": "own-3",
    "name": "Hogenakkal Gateway Turf",
    "slug": "hogenakkal-gateway-turf",
    "tagline": "Northern Tamil Nadu Football Park",
    "description": "Hogenakkal Gateway Turf is a state-of-the-art sports turf in Salem Main Road, Dharmapuri. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Salem Main Road Main Road, Dharmapuri, Tamil Nadu",
    "area": "Salem Main Road",
    "city": "Dharmapuri",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.1289,
      "lng": 78.1589
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 432
  },
  {
    "id": "trf-58",
    "ownerId": "own-1",
    "name": "Mango City Sports Arena",
    "slug": "mango-city-sports-arena",
    "tagline": "National Highway Multi-Sport Pitch",
    "description": "Mango City Sports Arena is a state-of-the-art sports turf in Bangalore Road, Krishnagiri. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Bangalore Road Main Road, Krishnagiri, Tamil Nadu",
    "area": "Bangalore Road",
    "city": "Krishnagiri",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.5266,
      "lng": 78.2146
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 439
  },
  {
    "id": "trf-59",
    "ownerId": "own-2",
    "name": "Ranipet Industrial Turf",
    "slug": "ranipet-industrial-turf",
    "tagline": "BHEL Township Sports Recreation Center",
    "description": "Ranipet Industrial Turf is a state-of-the-art sports turf in BHEL Township, Ranipet. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "BHEL Township Main Road, Ranipet, Tamil Nadu",
    "area": "BHEL Township",
    "city": "Ranipet",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.9278,
      "lng": 79.3325
    },
    "sports": [
      "Football",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 446
  },
  {
    "id": "trf-60",
    "ownerId": "own-3",
    "name": "Veeraraghava Sports Ground",
    "slug": "veeraraghava-sports-ground",
    "tagline": "Chennai Outer Belt 7v7 Football Ground",
    "description": "Veeraraghava Sports Ground is a state-of-the-art sports turf in JN Road, Tiruvallur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "JN Road Main Road, Tiruvallur, Tamil Nadu",
    "area": "JN Road",
    "city": "Tiruvallur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 13.1432,
      "lng": 79.9089
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 750,
      "weekdayRate": 750,
      "weekendRate": 950,
      "peakHourRate": 1050,
      "offPeakRate": 650
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 453
  },
  {
    "id": "trf-61",
    "ownerId": "own-1",
    "name": "Villupuram Junction Arena",
    "slug": "villupuram-junction-arena",
    "tagline": "Central Junction High-Density AstroTurf",
    "description": "Villupuram Junction Arena is a state-of-the-art sports turf in Trichy Trunk Road, Villupuram. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Trichy Trunk Road Main Road, Villupuram, Tamil Nadu",
    "area": "Trichy Trunk Road",
    "city": "Villupuram",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.9401,
      "lng": 79.4989
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 460
  },
  {
    "id": "trf-62",
    "ownerId": "own-2",
    "name": "Kamarajar Memorial Sports Ground",
    "slug": "kamarajar-memorial-sports-ground",
    "tagline": "South TN Multi-Sport Turf Court",
    "description": "Kamarajar Memorial Sports Ground is a state-of-the-art sports turf in Madurai Road, Virudhunagar. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Madurai Road Main Road, Virudhunagar, Tamil Nadu",
    "area": "Madurai Road",
    "city": "Virudhunagar",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.5872,
      "lng": 77.9578
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 467
  },
  {
    "id": "trf-63",
    "ownerId": "own-3",
    "name": "Sethupathi Maritime Arena",
    "slug": "sethupathi-maritime-arena",
    "tagline": "Coastal Corridor Box Cricket & Turf",
    "description": "Sethupathi Maritime Arena is a state-of-the-art sports turf in Rameswaram Road, Ramanathapuram. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Rameswaram Road Main Road, Ramanathapuram, Tamil Nadu",
    "area": "Rameswaram Road",
    "city": "Ramanathapuram",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 9.3712,
      "lng": 78.8324
    },
    "sports": [
      "Cricket",
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 474
  },
  {
    "id": "trf-64",
    "ownerId": "own-1",
    "name": "Courtallam Falls Football Turf",
    "slug": "courtallam-falls-football-turf",
    "tagline": "Western Ghats Scenic Foothills Turf",
    "description": "Courtallam Falls Football Turf is a state-of-the-art sports turf in Courtallam Road, Tenkasi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Courtallam Road Main Road, Tenkasi, Tamil Nadu",
    "area": "Courtallam Road",
    "city": "Tenkasi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 8.9592,
      "lng": 77.3145
    },
    "sports": [
      "Football",
      "Badminton"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 700,
      "weekdayRate": 700,
      "weekendRate": 900,
      "peakHourRate": 1000,
      "offPeakRate": 600
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 481
  },
  {
    "id": "trf-65",
    "ownerId": "own-2",
    "name": "Yelagiri Hills Valley Turf",
    "slug": "yelagiri-hills-valley-turf",
    "tagline": "Valley View Synthetic Turf Ground",
    "description": "Yelagiri Hills Valley Turf is a state-of-the-art sports turf in Vaniyambadi Road, Tirupathur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Vaniyambadi Road Main Road, Tirupathur, Tamil Nadu",
    "area": "Vaniyambadi Road",
    "city": "Tirupathur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 12.4956,
      "lng": 78.5678
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 488
  },
  {
    "id": "trf-66",
    "ownerId": "own-3",
    "name": "Nagore Coastline Sports Turf",
    "slug": "nagore-coastline-sports-turf",
    "tagline": "Bay of Bengal Coastal Football Pitch",
    "description": "Nagore Coastline Sports Turf is a state-of-the-art sports turf in Beach Road, Nagapattinam. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Beach Road Main Road, Nagapattinam, Tamil Nadu",
    "area": "Beach Road",
    "city": "Nagapattinam",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 10.7656,
      "lng": 79.8428
    },
    "sports": [
      "Football",
      "Volleyball"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.5,
    "ratingCount": 495
  },
  {
    "id": "trf-67",
    "ownerId": "own-1",
    "name": "Mayuranathar Sports Park",
    "slug": "mayuranathar-sports-park",
    "tagline": "Delta Region AstroTurf Facility",
    "description": "Mayuranathar Sports Park is a state-of-the-art sports turf in Kachery Road, Mayiladuthurai. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Kachery Road Main Road, Mayiladuthurai, Tamil Nadu",
    "area": "Kachery Road",
    "city": "Mayiladuthurai",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.1075,
      "lng": 79.6524
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.6,
    "ratingCount": 502
  },
  {
    "id": "trf-68",
    "ownerId": "own-2",
    "name": "Ariyalur Cement City Turf",
    "slug": "ariyalur-cement-city-turf",
    "tagline": "Fossil City Premier Soccer Pitch",
    "description": "Ariyalur Cement City Turf is a state-of-the-art sports turf in Sendurai Road, Ariyalur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Sendurai Road Main Road, Ariyalur, Tamil Nadu",
    "area": "Sendurai Road",
    "city": "Ariyalur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.1401,
      "lng": 79.0782
    },
    "sports": [
      "Football"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 600,
      "weekdayRate": 600,
      "weekendRate": 800,
      "peakHourRate": 900,
      "offPeakRate": 500
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.7,
    "ratingCount": 509
  },
  {
    "id": "trf-69",
    "ownerId": "own-3",
    "name": "Perambalur Central Sports Arena",
    "slug": "perambalur-central-sports-arena",
    "tagline": "Highway Multisport Artificial Turf",
    "description": "Perambalur Central Sports Arena is a state-of-the-art sports turf in Elambalur Road, Perambalur. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Elambalur Road Main Road, Perambalur, Tamil Nadu",
    "area": "Elambalur Road",
    "city": "Perambalur",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.2345,
      "lng": 78.8789
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.8,
    "ratingCount": 516
  },
  {
    "id": "trf-70",
    "ownerId": "own-1",
    "name": "Kallakurichi Foothills Turf",
    "slug": "kallakurichi-foothills-turf",
    "tagline": "Salem-Chennai Highway Sports Ground",
    "description": "Kallakurichi Foothills Turf is a state-of-the-art sports turf in Salem Highway, Kallakurichi. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.",
    "address": "Salem Highway Main Road, Kallakurichi, Tamil Nadu",
    "area": "Salem Highway",
    "city": "Kallakurichi",
    "state": "Tamil Nadu",
    "coordinates": {
      "lat": 11.7389,
      "lng": 78.962
    },
    "sports": [
      "Football",
      "Cricket"
    ],
    "facilities": [
      "FIFA Grade Artificial Turf",
      "LED Floodlights 500 Lux",
      "Dressing Room & Showers",
      "Spacious Car & Bike Parking",
      "Chilled RO Drinking Water",
      "First Aid & Ice Packs"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80"
    ],
    "pricing": {
      "basePrice": 650,
      "weekdayRate": 650,
      "weekendRate": 850,
      "peakHourRate": 950,
      "offPeakRate": 550
    },
    "openingHours": {
      "open": "05:00",
      "close": "23:59"
    },
    "slotDurationMinutes": 60,
    "advanceBookingDays": 30,
    "cancellationPolicy": "Flexible: 100% refund up to 4 hours prior to booking start time.",
    "rules": [
      "Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.",
      "Report 10 minutes prior to slot timing.",
      "Smoking, alcohol and outside glass bottles are prohibited.",
      "Proper sports attire mandatory."
    ],
    "status": "APPROVED",
    "rating": 4.9,
    "ratingCount": 523
  }
];

export const initialBookings = [
  {
    id: 'bkg-101',
    turfId: 'trf-1',
    userId: 'usr-1',
    userName: 'Arun Kumar',
    teamId: 'tm-1',
    teamName: 'Chennai Strikers',
    isTeamPublic: true,
    sport: 'Football',
    date: '2026-09-12',
    startTime: '19:00',
    endTime: '20:00',
    durationHours: 1,
    amount: 1100,
    status: 'CONFIRMED',
    createdAt: '2026-09-11T14:30:00.000Z',
    qrCodeData: 'TURFBOOK-BKG-101-TRF1-20260912-1900'
  },
  {
    id: 'bkg-102',
    turfId: 'trf-1',
    userId: 'usr-3',
    userName: 'Rahul Sharma',
    teamId: 'tm-3',
    teamName: 'Bangalore FC Regulars',
    isTeamPublic: false,
    sport: 'Football',
    date: '2026-09-12',
    startTime: '20:00',
    endTime: '21:00',
    durationHours: 1,
    amount: 1100,
    status: 'CONFIRMED',
    createdAt: '2026-09-11T16:20:00.000Z',
    qrCodeData: 'TURFBOOK-BKG-102-TRF1-20260912-2000'
  },
  {
    id: 'bkg-103',
    turfId: 'trf-2',
    userId: 'usr-2',
    userName: 'Dinesh Karthik',
    teamId: 'tm-2',
    teamName: 'Kovai Titans',
    isTeamPublic: true,
    sport: 'Cricket',
    date: '2026-09-13',
    startTime: '18:00',
    endTime: '20:00',
    durationHours: 2,
    amount: 2500,
    status: 'CONFIRMED',
    createdAt: '2026-09-11T18:00:00.000Z',
    qrCodeData: 'TURFBOOK-BKG-103-TRF2-20260913-1800'
  }
];
