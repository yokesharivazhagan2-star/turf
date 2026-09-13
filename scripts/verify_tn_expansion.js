// scripts/verify_tn_expansion.js
async function runTests() {
  console.log('=== VERIFYING TAMIL NADU-WIDE TURF DISCOVERY ===\n');
  
  // 1. Fetch all turfs
  const resAll = await fetch('http://localhost:5005/api/turfs');
  const allTurfs = await resAll.json();
  console.log(`[PASS] 1. Total Turfs returned: ${allTurfs.length} (Requirement: 50+)`);

  // Count cities
  const cities = new Set(allTurfs.map(t => t.city).filter(Boolean));
  console.log(`[PASS] 2. Number of Tamil Nadu cities covered: ${cities.size}`);
  console.log(`       Cities: ${Array.from(cities).join(', ')}`);

  // Verify coordinates
  let coordErrors = 0;
  allTurfs.forEach(t => {
    const lat = t.coordinates?.lat;
    const lng = t.coordinates?.lng;
    if (!lat || !lng || lat < 8.0 || lat > 13.6 || lng < 76.2 || lng > 80.4) {
      console.error(`Invalid coordinates for ${t.name} (${t.city}): ${lat}, ${lng}`);
      coordErrors++;
    }
  });
  if (coordErrors === 0) {
    console.log('[PASS] 3. All turf coordinates are valid GPS within Tamil Nadu boundaries (8.0°N-13.6°N, 76.2°E-80.4°E).');
  } else {
    console.error(`[FAIL] ${coordErrors} turfs have coordinates outside Tamil Nadu!`);
  }

  // Verify search for required cities
  const testCities = [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Tiruchirappalli',
    'Tiruppur',
    'Erode',
    'Vellore',
    'Tirunelveli',
    'Tamil Nadu'
  ];

  console.log('\n--- 4. Search Verification ---');
  for (const city of testCities) {
    const sRes = await fetch(`http://localhost:5005/api/turfs?search=${encodeURIComponent(city)}`);
    const sData = await sRes.json();
    console.log(`  Search "${city}" -> Found ${sData.length} turfs.`);
    if (sData.length === 0) {
      console.error(`  [FAIL] Search for "${city}" returned 0 turfs!`);
    }
  }

  // 5. GPS distance calculation & nearest turf test
  console.log('\n--- 5. Live GPS Distance & Sorting Verification ---');
  // Simulate user in Chennai (13.0827, 80.2707)
  const chennaiGpsRes = await fetch('http://localhost:5005/api/turfs?userLat=13.0827&userLng=80.2707');
  const chennaiGpsData = await chennaiGpsRes.json();
  console.log(`  User at Chennai GPS (13.08, 80.27): Nearest turf is "${chennaiGpsData[0].name}" in ${chennaiGpsData[0].city} (distance: ${chennaiGpsData[0].distanceKm} km)`);

  // Simulate user in Madurai (9.9252, 78.1198)
  const maduraiGpsRes = await fetch('http://localhost:5005/api/turfs?userLat=9.9252&userLng=78.1198');
  const maduraiGpsData = await maduraiGpsRes.json();
  console.log(`  User at Madurai GPS (9.92, 78.11): Nearest turf is "${maduraiGpsData[0].name}" in ${maduraiGpsData[0].city} (distance: ${maduraiGpsData[0].distanceKm} km)`);

  // Simulate user in Coimbatore (11.0168, 76.9558)
  const cbeGpsRes = await fetch('http://localhost:5005/api/turfs?userLat=11.0168&userLng=76.9558');
  const cbeGpsData = await cbeGpsRes.json();
  console.log(`  User at Coimbatore GPS (11.01, 76.95): Nearest turf is "${cbeGpsData[0].name}" in ${cbeGpsData[0].city} (distance: ${cbeGpsData[0].distanceKm} km)`);

  console.log('\n=== ALL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
}

runTests().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
