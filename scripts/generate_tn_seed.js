// Script to generate comprehensive Tamil Nadu-wide turf seed data
import fs from 'fs';

const CITIES = [
  // 1. Chennai (6 turfs)
  { city: 'Chennai', area: 'Santhome Marina', name: 'Marina Coastal Arena', tagline: 'Beachside 7v7 High-Performance Turf', lat: 13.0334, lng: 80.2785, sports: ['Football', 'Cricket'], price: 1200 },
  { city: 'Chennai', area: 'Thoraipakkam OMR', name: 'OMR TechPark PlayGround', tagline: 'IT Corridor Premier Artificial Turf', lat: 12.9352, lng: 80.2295, sports: ['Football', 'Cricket', 'Basketball'], price: 1100 },
  { city: 'Chennai', area: 'Anna Nagar', name: 'Metro Kickers Anna Nagar', tagline: 'Central Chennai 5v5 Multisport Hub', lat: 13.0850, lng: 80.2101, sports: ['Football', 'Badminton'], price: 1000 },
  { city: 'Chennai', area: 'Velachery', name: 'South Chennai Champions Ground', tagline: 'Floodlit Arena with Dugouts', lat: 12.9815, lng: 80.2180, sports: ['Football', 'Cricket'], price: 950 },
  { city: 'Chennai', area: 'Neelankarai ECR', name: 'ECR Seaside Box Cricket & Turf', tagline: 'Seaside Box Cricket & Football Dome', lat: 12.9490, lng: 80.2580, sports: ['Cricket', 'Football'], price: 1300 },
  { city: 'Chennai', area: 'Ambattur', name: 'Ambattur Strikers Complex', tagline: 'Industrial Hub Sports Centre', lat: 13.1143, lng: 80.1548, sports: ['Football', 'Badminton', 'Volleyball'], price: 850 },

  // 2. Coimbatore (6 turfs)
  { city: 'Coimbatore', area: 'Saravanampatti', name: 'Elite Sports Arena', tagline: 'Coimbatore’s Premier 7v7 High-Density Turf', lat: 11.0827, lng: 76.9958, sports: ['Football', 'Cricket'], price: 800 },
  { city: 'Coimbatore', area: 'Peelamedu', name: 'Metro Turf Club', tagline: 'Dual Multisport Arena with Premium Synthetic Court', lat: 11.0315, lng: 77.0180, sports: ['Football', 'Badminton', 'Cricket'], price: 900 },
  { city: 'Coimbatore', area: 'RS Puram', name: 'GreenField Football Park', tagline: 'Downtown 5v5 Turf with Spectator Dugout', lat: 11.0117, lng: 76.9511, sports: ['Football'], price: 750 },
  { city: 'Coimbatore', area: 'Gandhipuram', name: 'Smash & Volley Badminton Complex', tagline: 'BWF-Approved 4-Court Badminton Arena', lat: 11.0168, lng: 76.9673, sports: ['Badminton'], price: 600 },
  { city: 'Coimbatore', area: 'Singanallur', name: 'ProKick 7v7 High-Density Arena', tagline: '50mm Monofilament Synthetic Turf with Floodlights', lat: 10.9996, lng: 77.0266, sports: ['Football', 'Cricket'], price: 850 },
  { city: 'Coimbatore', area: 'Vadavalli', name: 'Apex Multi-Sport Turf Hub', tagline: 'Scenic Foothills Football & Box Cricket Arena', lat: 11.0256, lng: 76.9012, sports: ['Football', 'Cricket'], price: 700 },

  // 3. Madurai (4 turfs)
  { city: 'Madurai', area: 'KK Nagar', name: 'Meenakshi Champions Arena', tagline: 'Premium 7v7 Turf in Temple City', lat: 9.9295, lng: 78.1462, sports: ['Football', 'Cricket'], price: 850 },
  { city: 'Madurai', area: 'Mattuthavani', name: 'Pandya Kingdom Soccer Park', tagline: 'High-Density Turf near Integrated Bus Terminal', lat: 9.9472, lng: 78.1578, sports: ['Football'], price: 800 },
  { city: 'Madurai', area: 'TVS Nagar', name: 'Temple City Box Cricket & Turf', tagline: 'Day & Night Floodlit Sports Hub', lat: 9.9078, lng: 78.1023, sports: ['Cricket', 'Badminton'], price: 750 },
  { city: 'Madurai', area: 'Othakadai', name: 'Othakadai Premier Turf', tagline: 'Spacious Outskirts Football Ground', lat: 9.9701, lng: 78.1824, sports: ['Football', 'Volleyball'], price: 700 },

  // 4. Tiruchirappalli (4 turfs)
  { city: 'Tiruchirappalli', area: 'Thillai Nagar', name: 'Rockfort Champions Arena', tagline: 'Heart of Trichy Premier 7v7 Arena', lat: 10.8286, lng: 78.6869, sports: ['Football', 'Cricket'], price: 850 },
  { city: 'Tiruchirappalli', area: 'Cantonment', name: 'Kaveri Delta Sports Hub', tagline: 'Central Trichy Multisport Synthetic Turf', lat: 10.8038, lng: 78.6830, sports: ['Football', 'Badminton'], price: 800 },
  { city: 'Tiruchirappalli', area: 'KK Nagar', name: 'Trichy United 5v5 Soccer Park', tagline: 'Dynamic AstroTurf for Fast-Paced Matches', lat: 10.7745, lng: 78.6989, sports: ['Football'], price: 750 },
  { city: 'Tiruchirappalli', area: 'Srirangam', name: 'Srirangam Island Turf & Cricket', tagline: 'Island City Box Cricket & Football Pitch', lat: 10.8624, lng: 78.6946, sports: ['Cricket', 'Football'], price: 700 },

  // 5. Salem (3 turfs)
  { city: 'Salem', area: 'Fairlands', name: 'Shevaroy Foothills Sports Turf', tagline: 'Scenic High-Altitude Football Arena', lat: 11.6748, lng: 78.1408, sports: ['Football', 'Cricket'], price: 800 },
  { city: 'Salem', area: 'Hasthampatti', name: 'Steel City Athletic Park', tagline: 'FIFA-Standard Turf with LED Towers', lat: 11.6789, lng: 78.1634, sports: ['Football'], price: 750 },
  { city: 'Salem', area: 'Alagapuram', name: 'Salem Central Box Cricket & Turf', tagline: 'Covered Box Cricket & 5v5 Football Pitch', lat: 11.6841, lng: 78.1340, sports: ['Cricket', 'Badminton'], price: 700 },

  // 6. Tiruppur (3 turfs)
  { city: 'Tiruppur', area: 'Avinashi Road', name: 'Knit City Soccer Dome', tagline: 'Tiruppur Textile Corridor Premier Turf', lat: 11.1189, lng: 77.3456, sports: ['Football', 'Cricket'], price: 850 },
  { city: 'Tiruppur', area: 'Kangeyam Road', name: 'Kongu Sports Arena', tagline: 'Modern 7v7 Football Ground with Dugouts', lat: 11.0967, lng: 77.3621, sports: ['Football'], price: 750 },
  { city: 'Tiruppur', area: 'Palladam Road', name: 'Tiruppur Strikers Turf', tagline: 'All-Weather Box Cricket & Football Facility', lat: 11.0821, lng: 77.3325, sports: ['Cricket', 'Badminton'], price: 700 },

  // 7. Erode (3 turfs)
  { city: 'Erode', area: 'Perundurai Road', name: 'Turmeric City Sports Hub', tagline: 'Premier Sports Venue in Western Tamil Nadu', lat: 11.3324, lng: 77.7123, sports: ['Football', 'Cricket'], price: 800 },
  { city: 'Erode', area: 'Thindal', name: 'Bhavani River Turf Arena', tagline: '5v5 Artificial Turf with Player Gallery', lat: 11.3145, lng: 77.6890, sports: ['Football'], price: 750 },
  { city: 'Erode', area: 'Brough Road', name: 'Erode Central Box Cricket Pitch', tagline: 'Indoor & Outdoor Sports Recreation Hub', lat: 11.3412, lng: 77.7289, sports: ['Cricket', 'Volleyball'], price: 650 },

  // 8. Vellore (2 turfs)
  { city: 'Vellore', area: 'Katpadi', name: 'Vellore Fort City Arena', tagline: 'Katpadi Junction Premier 7v7 Turf', lat: 12.9698, lng: 79.1389, sports: ['Football', 'Cricket'], price: 800 },
  { city: 'Vellore', area: 'Gandhi Nagar', name: 'Palar Valley Sports Ground', tagline: 'All-Weather Multi-Sport Facility', lat: 12.9567, lng: 79.1412, sports: ['Football', 'Badminton'], price: 750 },

  // 9. Tirunelveli (2 turfs)
  { city: 'Tirunelveli', area: 'Palayamkottai', name: 'Nellai Strikers Football Turf', tagline: 'Oxford of South India Premier Turf', lat: 8.7139, lng: 77.7314, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Tirunelveli', area: 'Vannarpettai', name: 'South Coast Multi-Sport Arena', tagline: 'Modern Box Cricket and 5v5 Soccer Dome', lat: 8.7290, lng: 77.7180, sports: ['Cricket', 'Football'], price: 700 },

  // 10. Thoothukudi (2 turfs)
  { city: 'Thoothukudi', area: 'Millerpuram', name: 'Pearl City Maritime Turf', tagline: 'Deepwater Portside 7v7 Football Park', lat: 8.7945, lng: 78.1320, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Thoothukudi', area: 'Bryant Nagar', name: 'Tuticorin Portside Sports Club', tagline: 'Coastal Turf with LED Floodlights', lat: 8.8067, lng: 78.1512, sports: ['Football', 'Volleyball'], price: 700 },

  // 11. Dindigul (2 turfs)
  { city: 'Dindigul', area: 'GTN Road', name: 'Dindigul Lock City Turf', tagline: 'Lock City Premier Artificial Turf', lat: 10.3624, lng: 77.9803, sports: ['Football', 'Cricket'], price: 700 },
  { city: 'Dindigul', area: 'Palani Road', name: 'Sirumalai View Arena', tagline: 'Hillview 5v5 Football Ground', lat: 10.3712, lng: 77.9620, sports: ['Football'], price: 650 },

  // 12. Thanjavur (2 turfs)
  { city: 'Thanjavur', area: 'Medical College Road', name: 'Brihadisvara Delta Sports Turf', tagline: 'Heritage Capital Premier Football Pitch', lat: 10.7689, lng: 79.1234, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Thanjavur', area: 'New Bus Stand', name: 'Royal Chola Football Ground', tagline: 'Central Thanjavur Multisport Arena', lat: 10.7723, lng: 79.1089, sports: ['Football', 'Badminton'], price: 700 },

  // 13. Hosur (2 turfs)
  { city: 'Hosur', area: 'SIPCOT Industrial Hub', name: 'Hosur Borderline Sports Park', tagline: 'Bengaluru-TN Border High-Tech Turf', lat: 12.7409, lng: 77.8253, sports: ['Football', 'Cricket'], price: 900 },
  { city: 'Hosur', area: 'Bagalur Road', name: 'Silicon Gateway Turf Arena', tagline: 'Corporate Leagues and Weekend Matches', lat: 12.7540, lng: 77.8389, sports: ['Football', 'Basketball'], price: 850 },

  // 14. Nagercoil (2 turfs)
  { city: 'Nagercoil', area: 'Vadasery', name: 'Kanyakumari South Tip Arena', tagline: 'India’s Southernmost Premier Turf', lat: 8.1890, lng: 77.4289, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Nagercoil', area: 'Kottar', name: 'Cape Comorin Turf Park', tagline: 'Lush Green All-Weather Synthetic Court', lat: 8.1723, lng: 77.4412, sports: ['Football'], price: 700 },

  // 15. Kanchipuram (2 turfs)
  { city: 'Kanchipuram', area: 'Gandhi Road', name: 'Silk City Multi-Sport Turf', tagline: 'Historical Silk City Sports Arena', lat: 12.8342, lng: 79.7036, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Kanchipuram', area: 'Ennaikaran', name: 'Varadharaja Sports Club', tagline: 'Floodlit 5v5 Soccer & Box Cricket Pitch', lat: 12.8420, lng: 79.6980, sports: ['Cricket', 'Badminton'], price: 700 },

  // 16. Cuddalore (2 turfs)
  { city: 'Cuddalore', area: 'Silver Beach Road', name: 'Silver Beach Coastal Turf', tagline: 'Beachside Football Turf with Cool Sea Breeze', lat: 11.7420, lng: 79.7745, sports: ['Football', 'Volleyball'], price: 700 },
  { city: 'Cuddalore', area: 'Semmandalam', name: 'Pennaiyar River Sports Park', tagline: 'Central Cuddalore Multisport Turf', lat: 11.7564, lng: 79.7612, sports: ['Football', 'Cricket'], price: 650 },

  // 17. Kumbakonam (2 turfs)
  { city: 'Kumbakonam', area: 'TSR Big Street', name: 'Mahamaham Temple Turf', tagline: 'Temple City Heart Multi-Sport Venue', lat: 10.9602, lng: 79.3845, sports: ['Football', 'Cricket'], price: 700 },
  { city: 'Kumbakonam', area: 'Chennai Bypass', name: 'Cauvery Classic Box Cricket', tagline: 'Bypass Road All-Weather Box Cricket Pitch', lat: 10.9723, lng: 79.4012, sports: ['Cricket'], price: 600 },

  // 18. Karur (2 turfs)
  { city: 'Karur', area: 'Kovai Road', name: 'Amaravathi Riverview Turf', tagline: 'Textile Capital Premier 7v7 Arena', lat: 10.9578, lng: 78.0765, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Karur', area: 'Thanthonimalai', name: 'Karur Textile Arena', tagline: 'Modern 5v5 AstroTurf with Spectator Seating', lat: 10.9320, lng: 78.0845, sports: ['Football'], price: 700 },

  // 19. Namakkal (2 turfs)
  { city: 'Namakkal', area: 'Mohanur Road', name: 'Anjaneyar Sports Ground', tagline: 'Fort City High-Density Soccer Pitch', lat: 11.2189, lng: 78.1678, sports: ['Football', 'Cricket'], price: 700 },
  { city: 'Namakkal', area: 'Paramathi Road', name: 'Namakkal Transport Hub Turf', tagline: 'Highway Corridor Multi-Sport Facility', lat: 11.2045, lng: 78.1523, sports: ['Cricket', 'Volleyball'], price: 650 },

  // 20. Sivakasi (2 turfs)
  { city: 'Sivakasi', area: 'Sattur Road', name: 'Sivakasi Spark Arena', tagline: 'Industrial City High-Paced Football Turf', lat: 9.4532, lng: 77.7989, sports: ['Football', 'Cricket'], price: 700 },
  { city: 'Sivakasi', area: 'Thiruthangal', name: 'Virudhunagar District Turf Club', tagline: 'Floodlit 5v5 Soccer Court', lat: 9.4789, lng: 77.8123, sports: ['Football'], price: 650 },

  // 21-35 Single representative turfs for remaining TN districts:
  { city: 'Pudukkottai', area: 'Alangudi Road', name: 'Pudukkottai Royal Sports Hub', tagline: 'Historic Princely City Turf Arena', lat: 10.3812, lng: 78.8234, sports: ['Football', 'Cricket'], price: 650 },
  { city: 'Dharmapuri', area: 'Salem Main Road', name: 'Hogenakkal Gateway Turf', tagline: 'Northern Tamil Nadu Football Park', lat: 12.1289, lng: 78.1589, sports: ['Football'], price: 650 },
  { city: 'Krishnagiri', area: 'Bangalore Road', name: 'Mango City Sports Arena', tagline: 'National Highway Multi-Sport Pitch', lat: 12.5266, lng: 78.2146, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Ranipet', area: 'BHEL Township', name: 'Ranipet Industrial Turf', tagline: 'BHEL Township Sports Recreation Center', lat: 12.9278, lng: 79.3325, sports: ['Football', 'Volleyball'], price: 700 },
  { city: 'Tiruvallur', area: 'JN Road', name: 'Veeraraghava Sports Ground', tagline: 'Chennai Outer Belt 7v7 Football Ground', lat: 13.1432, lng: 79.9089, sports: ['Football', 'Cricket'], price: 750 },
  { city: 'Villupuram', area: 'Trichy Trunk Road', name: 'Villupuram Junction Arena', tagline: 'Central Junction High-Density AstroTurf', lat: 11.9401, lng: 79.4989, sports: ['Football', 'Cricket'], price: 700 },
  { city: 'Virudhunagar', area: 'Madurai Road', name: 'Kamarajar Memorial Sports Ground', tagline: 'South TN Multi-Sport Turf Court', lat: 9.5872, lng: 77.9578, sports: ['Football'], price: 650 },
  { city: 'Ramanathapuram', area: 'Rameswaram Road', name: 'Sethupathi Maritime Arena', tagline: 'Coastal Corridor Box Cricket & Turf', lat: 9.3712, lng: 78.8324, sports: ['Cricket', 'Football'], price: 700 },
  { city: 'Tenkasi', area: 'Courtallam Road', name: 'Courtallam Falls Football Turf', tagline: 'Western Ghats Scenic Foothills Turf', lat: 8.9592, lng: 77.3145, sports: ['Football', 'Badminton'], price: 700 },
  { city: 'Tirupathur', area: 'Vaniyambadi Road', name: 'Yelagiri Hills Valley Turf', tagline: 'Valley View Synthetic Turf Ground', lat: 12.4956, lng: 78.5678, sports: ['Football'], price: 650 },
  { city: 'Nagapattinam', area: 'Beach Road', name: 'Nagore Coastline Sports Turf', tagline: 'Bay of Bengal Coastal Football Pitch', lat: 10.7656, lng: 79.8428, sports: ['Football', 'Volleyball'], price: 650 },
  { city: 'Mayiladuthurai', area: 'Kachery Road', name: 'Mayuranathar Sports Park', tagline: 'Delta Region AstroTurf Facility', lat: 11.1075, lng: 79.6524, sports: ['Football', 'Cricket'], price: 650 },
  { city: 'Ariyalur', area: 'Sendurai Road', name: 'Ariyalur Cement City Turf', tagline: 'Fossil City Premier Soccer Pitch', lat: 11.1401, lng: 79.0782, sports: ['Football'], price: 600 },
  { city: 'Perambalur', area: 'Elambalur Road', name: 'Perambalur Central Sports Arena', tagline: 'Highway Multisport Artificial Turf', lat: 11.2345, lng: 78.8789, sports: ['Football', 'Cricket'], price: 650 },
  { city: 'Kallakurichi', area: 'Salem Highway', name: 'Kallakurichi Foothills Turf', tagline: 'Salem-Chennai Highway Sports Ground', lat: 11.7389, lng: 78.9620, sports: ['Football', 'Cricket'], price: 650 }
];

const PHOTOS = [
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80'
];

const OWNERS = ['own-1', 'own-2', 'own-3'];

const turfs = CITIES.map((c, index) => {
  const id = `trf-${index + 1}`;
  const ownerId = OWNERS[index % OWNERS.length];
  const photo1 = PHOTOS[index % PHOTOS.length];
  const photo2 = PHOTOS[(index + 1) % PHOTOS.length];
  const photo3 = PHOTOS[(index + 2) % PHOTOS.length];

  return {
    id,
    ownerId,
    name: c.name,
    slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    tagline: c.tagline,
    description: `${c.name} is a state-of-the-art sports turf in ${c.area}, ${c.city}. Features 50mm monofilament FIFA-approved artificial turf, high-lux flicker-free LED floodlights, player changing rooms, and spectator gallery.`,
    address: `${c.area} Main Road, ${c.city}, Tamil Nadu`,
    area: c.area,
    city: c.city,
    state: 'Tamil Nadu',
    coordinates: { lat: c.lat, lng: c.lng },
    sports: c.sports,
    facilities: ['FIFA Grade Artificial Turf', 'LED Floodlights 500 Lux', 'Dressing Room & Showers', 'Spacious Car & Bike Parking', 'Chilled RO Drinking Water', 'First Aid & Ice Packs'],
    images: [photo1, photo2, photo3],
    pricing: {
      basePrice: c.price,
      weekdayRate: c.price,
      weekendRate: c.price + 200,
      peakHourRate: c.price + 300,
      offPeakRate: Math.max(500, c.price - 100)
    },
    openingHours: { open: '05:00', close: '23:59' },
    slotDurationMinutes: 60,
    advanceBookingDays: 30,
    cancellationPolicy: 'Flexible: 100% refund up to 4 hours prior to booking start time.',
    rules: [
      'Flat-sole turf shoes or studs recommended; metal spikes strictly prohibited.',
      'Report 10 minutes prior to slot timing.',
      'Smoking, alcohol and outside glass bottles are prohibited.',
      'Proper sports attire mandatory.'
    ],
    // Let trf-9 be PENDING to maintain verification tests for admin approval
    status: id === 'trf-9' ? 'PENDING' : 'APPROVED',
    rating: Number((4.5 + ((index % 5) * 0.1)).toFixed(1)),
    ratingCount: 40 + (index * 7)
  };
});

console.log(`Generated ${turfs.length} turfs across ${new Set(turfs.map(t => t.city)).size} cities in Tamil Nadu.`);

// Read seedData.js template up to line 57
const original = fs.readFileSync('./server/data/seedData.js', 'utf8');
const beforeTurfs = original.split('export const initialTurfs = [')[0];

const newContent = `${beforeTurfs}export const initialTurfs = ${JSON.stringify(turfs, null, 2)};

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
`;

fs.writeFileSync('./server/data/seedData.js', newContent, 'utf8');
console.log('Successfully updated server/data/seedData.js');
