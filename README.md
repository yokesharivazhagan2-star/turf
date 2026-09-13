# TURFBOOK — Multi-Turf Sports Booking Marketplace

> High-performance multi-turf discovery, real-time slot reservation mutex, and venue management platform engineered with mobile-first web app architecture, Tamil Nadu-wide geographic coverage, Leaflet marker clustering, and interactive 3D particle arena visualization.

---

## 📋 Table of Contents
1. [Architecture Overview](#-architecture-overview)
2. [Data Models & Database Schema](#-data-models--database-schema)
3. [API Endpoints Reference](#-api-endpoints-reference)
4. [Real-Time WebSocket Protocol](#-real-time-websocket-protocol)
5. [Concurrency & Mutex Locking Engine](#-concurrency--mutex-locking-engine)
6. [Granular Testing & QA Documentation](#-granular-testing--qa-documentation)
7. [Error Boundaries & Resilience Strategy](#-error-boundaries--resilience-strategy)
8. [Geographic Coverage & Map Engine](#-geographic-coverage--map-engine)
9. [Local Development & Scripts](#-local-development--scripts)

---

## 🏗 Architecture Overview

TurfBook is built as a reactive, full-stack monorepo application:

```
┌────────────────────────────────────────────────────────┐
│               TurfBook Client (Vite + React 19)        │
│  ┌───────────────────┐ ┌────────────────────────────┐  │
│  │ Three.js 3D Arena │ │ Leaflet Cluster Map Engine │  │
│  └───────────────────┘ └────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Mobile-First Navigation & Booking BottomSheet    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Multi-Level Error Boundary Trees (Canvas/Map/App)│  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────────▲────────────────────────────┘
                            │ HTTP REST & WebSocket (/ws)
┌───────────────────────────▼────────────────────────────┐
│         TurfBook Node.js & Express API Gateway         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ In-Memory Data Store (Turfs, Bookings, Users)    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 5-Minute Slot Hold Mutex & Atomic Race Locker   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Haversine GPS Radar Distance Sorting Engine      │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ WebSocket Broadcast Dispatcher                   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 🗄 Data Models & Database Schema

### 1. Turf Entity (`Turf`)
Represents an arena venue registered on the platform.

| Field | Type | Description |
|---|---|---|
| `id` | `String` (PK) | Unique turf identifier (e.g., `trf-1`) |
| `name` | `String` | Commercial or venue title |
| `ownerId` | `String` (FK) | Reference to `Owner` |
| `ownerName` | `String` | Business / operating entity name |
| `tagline` | `String` | Marketing subtitle |
| `description` | `String` | Venue details and facilities |
| `address` | `String` | Physical street address |
| `area` | `String` | Neighborhood / Hub (e.g. `Anna Nagar`, `Peelamedu`) |
| `city` | `String` | City name (e.g. `Chennai`, `Madurai`, `Salem`) |
| `state` | `String` | State (`Tamil Nadu`) |
| `coordinates` | `Object` | `{ lat: Float, lng: Float }` (Validated within TN bounds) |
| `sports` | `Array<String>` | Supported sports: `['Football', 'Cricket', 'Badminton', ...]` |
| `facilities` | `Array<String>` | Amenities list (Floodlights, Parking, Changing Room) |
| `images` | `Array<String>` | High-resolution photography URLs |
| `openingHours` | `Object` | `{ open: "06:00", close: "23:00", slotDurationMinutes: 60 }` |
| `pricing` | `Object` | `{ basePrice, weekdayRate, weekendRate, peakHourRate, offPeakRate }` |
| `advanceBookingDays` | `Number` | Max lookahead reservation window (default: 30 days) |
| `rules` | `String` | Terms, footwear guidelines, and ground rules |
| `cancellationPolicy`| `String` | Refund threshold policy (e.g., "100% refund up to 4 hrs prior") |
| `status` | `String` | `APPROVED` \| `PENDING` \| `SUSPENDED` |
| `rating` | `Float` | Verified player review average (1.0 – 5.0) |
| `ratingCount` | `Number` | Total verified review counter |

### 2. Booking Entity (`Booking`)
Represents a confirmed slot reservation.

| Field | Type | Description |
|---|---|---|
| `id` | `String` (PK) | Unique booking reference (e.g., `bk-101`) |
| `turfId` | `String` (FK) | Target arena ID |
| `turfName` | `String` | Cached venue name |
| `turfAddress` | `String` | Venue street address |
| `turfArea` | `String` | Venue area |
| `turfCity` | `String` | Venue city |
| `userId` | `String` (FK) | Booker user identifier |
| `userName` | `String` | Booker full name |
| `userPhone` | `String` | Booker contact phone number |
| `userEmail` | `String` | Booker email address |
| `teamId` | `String \| null` | Optional linked player team |
| `teamName` | `String \| null` | Optional linked squad name |
| `sport` | `String` | Selected sport for the match |
| `date` | `String` | Slot date in `YYYY-MM-DD` ISO format |
| `startTime` | `String` | Start time formatted as `HH:mm` (e.g., `18:00`) |
| `endTime` | `String` | End time formatted as `HH:mm` (e.g., `19:00`) |
| `durationHours` | `Number` | Duration in hours |
| `price` | `Number` | Computed total match price in INR |
| `status` | `String` | `CONFIRMED` \| `CANCELLED` \| `COMPLETED` |
| `qrCodeData` | `String` | High-security payload for venue turnstile scanning |
| `createdAt` | `String` | ISO timestamp |

### 3. User & Auth Entities (`User`, `Owner`, `Admin`)
* **Role-Based Access Control**:
  * `PLAYER`: Can explore turfs, hold slots, create bookings, register teams, and generate QR entry passes.
  * `OWNER`: Can manage owned arenas, toggle slot blocks, adjust custom rates, and view payout settlements.
  * `ADMIN`: Can inspect marketplace analytics, approve/suspend venues, and monitor platform governance.

---

## 📡 API Endpoints Reference

### Public & Discovery Endpoints
* `GET /api/health`
  * **Response**: `{ status: "ok", timestamp: ISOString, service: "TURFBOOK Backend API" }`
* `GET /api/turfs`
  * **Query Params**:
    * `sport`: Filter by sport (`Football`, `Cricket`, etc.)
    * `city`: Filter by city (e.g. `Chennai`, `Madurai`)
    * `area`: Hub/district filter (bypassed if state-wide)
    * `search`: Case-insensitive text query over `name`, `area`, `city`, `state`, and `address`
    * `userLat`, `userLng`: Latitude & Longitude for live GPS radar distance calculations
  * **Response**: `Array<Turf>` (includes `distanceKm` when user coordinates provided)
* `GET /api/turfs/:id`
  * **Response**: Single `Turf` detail payload
* `GET /api/turfs/:id/availability?date=YYYY-MM-DD`
  * **Response**: Matrix of slots between `open` and `close` times:
    ```json
    {
      "turfId": "trf-1",
      "date": "2026-09-14",
      "slots": [
        {
          "hour": 18,
          "timeSlot": "18:00 - 19:00",
          "status": "AVAILABLE",
          "price": 1200,
          "isPeak": true
        }
      ]
    }
    ```
    *Slot statuses:* `AVAILABLE`, `HELD`, `BOOKED`, `BLOCKED`.

### Slot Hold & Concurrency Mutex Endpoints
* `POST /api/turfs/:id/hold-slot`
  * **Payload**: `{ date: "YYYY-MM-DD", hour: 18, userId: "u-1", userName: "Player", teamId: null }`
  * **Status**: `200 OK` on success, `409 Conflict` if held or booked
  * **Behavior**: Locks slot for exactly 300 seconds (5 minutes); auto-releases on expiry.
* `POST /api/turfs/:id/release-slot`
  * **Payload**: `{ date: "YYYY-MM-DD", hour: 18, userId: "u-1" }`
  * **Status**: `200 OK`

### Booking & QR Verification Endpoints
* `POST /api/bookings`
  * **Payload**: `{ turfId, date, hour, durationHours, sport, userId, userName, userPhone, userEmail, teamId, teamName }`
  * **Status**: `201 Created` with full booking record and QR data; `409 Conflict` if contested.
* `GET /api/bookings?userId=...`
  * **Response**: List of bookings for the authenticated user.
* `POST /api/bookings/:id/cancel`
  * **Payload**: `{ userId: "u-1" }`
  * **Response**: Cancellation receipt with calculated refund amount.
* `GET /api/bookings/verify-qr/:qrCode`
  * **Response**: `{ valid: true, booking: { id, turfName, sport, date, time, teamName, player } }`

### Owner & Admin Endpoints
* `GET /api/owner/turfs?ownerId=...`
* `POST /api/owner/turfs` (Registers new turf in `PENDING` state)
* `POST /api/owner/turf-slots` (Block/unblock maintenance hours)
* `GET /api/owner/stats?ownerId=...` (Revenue, fee, net payout)
* `GET /api/admin/turfs` (All turfs regardless of status)
* `PUT /api/admin/turfs/:id/status` (Update status: `APPROVED`, `SUSPENDED`, `PENDING`)
* `GET /api/admin/stats` (Platform-wide GMV, active venues, user counts)

---

## ⚡ Real-Time WebSocket Protocol

TurfBook maintains a bidirectional WebSocket gateway on `ws://<host>:<port>/ws`.

### Event Payloads Broadcasted to All Clients:
1. `SLOT_HELD`:
   ```json
   {
     "type": "SLOT_HELD",
     "turfId": "trf-1",
     "date": "2026-09-14",
     "hour": 18,
     "heldBy": "John Doe",
     "expiresAt": 1789290000000
   }
   ```
2. `SLOT_RELEASED`:
   ```json
   { "type": "SLOT_RELEASED", "turfId": "trf-1", "date": "2026-09-14", "hour": 18 }
   ```
3. `SLOT_BOOKED`:
   ```json
   { "type": "SLOT_BOOKED", "turfId": "trf-1", "date": "2026-09-14", "hour": 18, "sport": "Football" }
   ```
4. `TURF_REGISTERED`: Alerts admins to newly submitted venues.
5. `TURF_STATUS_CHANGED`: Synchronizes instant visibility changes (`APPROVED` / `SUSPENDED`).
6. `SLOT_UPDATED`: Notifies clients when owners block slots for pitch maintenance.

---

## 🔒 Concurrency & Mutex Locking Engine

To prevent double-bookings during high-traffic matches, TurfBook uses a multi-tier concurrency control model:

1. **Active In-Memory Lock Key**: `${turfId}_${date}_${hour}`
2. **5-Minute Temporary Hold**:
   - When a user enters the booking sheet, a slot hold request is sent to `POST /api/turfs/:id/hold-slot`.
   - The slot transition is registered in `heldSlots` with a Javascript `setTimeout` timer.
   - If checkout is not completed in 300 seconds, the slot automatically releases and a `SLOT_RELEASED` WebSocket broadcast is triggered.
3. **Atomic Commit Validation**:
   - `POST /api/bookings` verifies that the slot is either held by the requesting user or currently free.
   - If two concurrent requests arrive for the exact same slot, the first acquires the atomic lock; the second receives `409 Conflict`.

---

## 🧪 Granular Testing & QA Documentation

The test architecture consists of automated integration, concurrency stress, and geographic validation test suites.

### 1. Master 50-Point QA Verification Suite (`scripts/master_qa_suite.js`)
Executes an end-to-end full-stack audit covering all critical flows:

* **Tests 1–2**: Backend server health check and WebSocket connection handshake.
* **Tests 3–7**: User registration, duplicate email rejection (`400`), login authentication, and profile persistence.
* **Tests 8–12**: Live GPS Haversine distance calculations and multi-sport/keyword discovery filters.
* **Tests 13–15**: Venue availability matrix generation and dynamic peak/off-peak price computation.
* **Tests 16–19**: Slot hold acquisition, concurrent hold rejection (`409`), explicit release, and re-acquisition.
* **Tests 20–22**: Atomic race condition stress test (fires simultaneous booking requests; enforces exactly one `201 Created` and one `409 Conflict`).
* **Tests 23–27**: Team directory linkage, QR code pass generation, cryptographically valid verification, and malformed pass rejection (`404`).
* **Tests 28–35**: Turf owner registration, `PENDING` queue isolation, admin moderation approval, live public indexing, and suspension hiding.
* **Tests 36–40**: Owner pitch maintenance blocking, unauthorized cross-owner editing rejection (`403`), and role escalation prevention.
* **Tests 41–44**: Dynamic platform commission calculations (10% fee), cancellation refund math, double cancellation prevention (`400`), and slot restoration.
* **Tests 45–50**: WebSocket multi-client message delivery, booking history persistence, platform analytics, credential leakage audits, input sanitation, and Vite production bundle compilation.

**Execution Command:**
```bash
node scripts/master_qa_suite.js
```

### 2. Tamil Nadu Geographic Validation Suite (`scripts/verify_tn_expansion.js`)
Validates that demo data conforms to the Tamil Nadu statewide mandate:
* Verifies total venue count $\ge 50$ (currently 70).
* Checks distribution across $\ge 30$ cities/districts (currently 35).
* Validates every GPS coordinate pair within Tamil Nadu boundaries:
  $$8.0^\circ\text{N} \le \text{Latitude} \le 13.6^\circ\text{N}$$
  $$76.2^\circ\text{E} \le \text{Longitude} \le 80.4^\circ\text{E}$$
* Runs city-specific search tests across Chennai, Coimbatore, Madurai, Salem, Trichy, Tiruppur, Erode, Vellore, Tirunelveli, etc.

**Execution Command:**
```bash
node scripts/verify_tn_expansion.js
```

---

## 🛡 Error Boundaries & Resilience Strategy

TurfBook implements hierarchical React Error Boundaries ([`src/components/common/ErrorBoundary.jsx`](src/components/common/ErrorBoundary.jsx)) to guarantee zero unhandled white-screen crashes:

### Error Boundary Hierarchy:
```
<Root ErrorBoundary>
  │
  ├── <3D Background ErrorBoundary> (Silent Fallback)
  │     └─ <AnimatedSportsBackground /> (WebGL / Context Loss Shield)
  │
  ├── <AppHeader />
  │
  ├── <Screen Router ErrorBoundary> (Card Fallback with "Try Again")
  │     │
  │     ├── <MapPage ErrorBoundary> (Map Specific Shield)
  │     │     └─ <TurfMapView /> (Tile / Geolocation Shield)
  │     │
  │     └── <Other Pages: Home, Explore, Bookings, Owner, Admin>
  │
  └── <BookingBottomSheet />
```

### Resilience Features:
1. **WebGL Context Loss Shield**: If the GPU runs out of memory or fails to initialize Three.js, the 3D background gracefully unmounts without interrupting the user's navigation or booking.
2. **Interactive Map Shield**: Leaflet tile loading network drops or malformed coordinates trigger an isolated map fallback while keeping the header, bottom navigation, and search functional.
3. **Session State Protection**: The boundary provides a **"Try Again"** action that resets the component state without erasing authentication tokens, active slot holds, or team selections.

---

## 🗺 Geographic Coverage & Map Engine

* **Engine**: Leaflet + `leaflet.markercluster` with dark emerald clusters (`#10b981`).
* **Initial Centroid**: Centered on Tamil Nadu geometric centroid (`[11.1271, 78.6569]`, zoom level 7).
* **Auto-Fit Bounds**: Dynamic `map.fitBounds(markersBounds, { padding: [50, 50], maxZoom: 13 })` automatically zooms and centers around returned search results.
* **Covered Hubs & Districts (35)**:
  Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore, Thoothukudi, Tirunelveli, Dindigul, Thanjavur, Hosur, Nagercoil, Kanchipuram, Cuddalore, Kumbakonam, Karur, Namakkal, Sivakasi, Pudukkottai, Dharmapuri, Krishnagiri, Ranipet, Tiruvallur, Villupuram, Virudhunagar, Ramanathapuram, Nagapattinam, Mayiladuthurai, Ariyalur, Perambalur, Tenkasi, Kallakurichi, Tirupathur.

---

## 💻 Local Development & Scripts

### Prerequisites
* Node.js v18+
* npm v9+

### Quickstart
```bash
# 1. Clone repository
git clone git@github.com:yokesharivazhagan2-star/turf.git
cd turf

# 2. Install dependencies
npm install

# 3. Start development server (backend on :5005 and frontend on :3000)
npm run dev
```

### Available NPM Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Concurrently launches backend API on port `5005` and Vite client on port `3000` |
| `npm run dev:server` | Starts Express & WebSocket backend (`node server/server.js`) |
| `npm run dev:client` | Starts Vite HMR frontend server |
| `npm run build` | Generates optimized production build in `dist/` |
| `node scripts/master_qa_suite.js` | Executes 50-point end-to-end QA validation test suite |
| `node scripts/verify_tn_expansion.js` | Validates Tamil Nadu coordinates and city search queries |
