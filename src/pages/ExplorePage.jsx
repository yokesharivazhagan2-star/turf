import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TurfCard from '../components/turf/TurfCard';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  ArrowUpDown, 
  Filter, 
  X, 
  Check, 
  Activity, 
  Flame, 
  Zap, 
  CircleDot, 
  Radio 
} from 'lucide-react';

export default function ExplorePage() {
  const { 
    turfs, 
    selectedSport, 
    setSelectedSport, 
    searchQuery, 
    setSearchQuery, 
    setCurrentScreen 
  } = useApp();

  const [selectedArea, setSelectedArea] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'price' | 'rating'
  const [onlyOpenToday, setOnlyOpenToday] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('All');
  const [showFilterBottomSheet, setShowFilterBottomSheet] = useState(false);

  const sportsList = ['All', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Tennis'];
  const areasList = ['All', 'Saravanampatti', 'Peelamedu', 'RS Puram', 'Gandhipuram', 'Avinashi Road', 'Singanallur', 'Vadavalli', 'Kuniyamuthur'];
  const facilitiesList = ['All', 'Floodlights', 'Changing Rooms', 'Parking', 'Equipment Rental', 'Live Streaming'];

  // In-memory filter logic
  let results = turfs.filter((t) => {
    const matchSport = selectedSport === 'All' || t.sports.includes(selectedSport);
    const matchArea = selectedArea === 'All' || t.area.toLowerCase() === selectedArea.toLowerCase();
    const matchPrice = (t.pricing?.basePrice || 0) <= maxPrice;
    const matchOpen = !onlyOpenToday || (t.availableSlotsToday || 0) > 0;
    const matchFacility = selectedFacility === 'All' || t.facilities?.some((f) => f.toLowerCase().includes(selectedFacility.toLowerCase()));
    const matchSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sports.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchSport && matchArea && matchPrice && matchOpen && matchFacility && matchSearch;
  });

  if (sortBy === 'distance') {
    results.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
  } else if (sortBy === 'price') {
    results.sort((a, b) => (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0));
  } else if (sortBy === 'rating') {
    results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const activeFilterCount = (selectedSport !== 'All' ? 1 : 0) +
    (selectedArea !== 'All' ? 1 : 0) +
    (maxPrice < 1500 ? 1 : 0) +
    (onlyOpenToday ? 1 : 0) +
    (selectedFacility !== 'All' ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedSport('All');
    setSelectedArea('All');
    setMaxPrice(1500);
    setSortBy('distance');
    setOnlyOpenToday(false);
    setSelectedFacility('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pb-28 relative z-10 px-3 sm:px-6 pt-3 max-w-7xl mx-auto">
      
      {/* Top Search & Filter Bar */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="relative flex-1 glass-panel rounded-2xl p-2.5 border border-white/10 flex items-center gap-2 px-3 shadow-inner">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Search arena, area, or sport..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500 font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white p-0.5">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Drawer Trigger */}
        <button
          onClick={() => setShowFilterBottomSheet(true)}
          className={`px-3 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95 ${
            activeFilterCount > 0
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-md shadow-emerald-500/20'
              : 'glass-panel text-slate-200 border-white/10 hover:border-emerald-500/40'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-slate-950 text-emerald-400 text-[10px] flex items-center justify-center font-black">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick Filter Horizontal Scroll Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {sportsList.map((sp) => (
          <button
            key={sp}
            onClick={() => setSelectedSport(sp)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
              selectedSport === sp
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'glass-panel text-slate-400 hover:text-slate-200 border border-white/5'
            }`}
          >
            {sp}
          </button>
        ))}

        <div className="w-[1px] h-5 bg-white/10 shrink-0" />

        <button
          onClick={() => setOnlyOpenToday(!onlyOpenToday)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
            onlyOpenToday
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'glass-panel text-slate-400 border-white/5 hover:text-slate-200'
          }`}
        >
          ● Open Today
        </button>

        <button
          onClick={() => setCurrentScreen('MAP')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap glass-panel text-sky-300 border border-sky-500/30 hover:bg-sky-500/10 transition-all shrink-0 flex items-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Map View</span>
        </button>
      </div>

      {/* Main Layout: Desktop Split View or Mobile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Desktop Side Filter Panel (hidden on mobile, opens as bottom sheet) */}
        <div className="hidden lg:block lg:col-span-1 glass-panel p-4 rounded-3xl border border-white/10 space-y-4 sticky top-16">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>Filters & Sort</span>
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-emerald-400 font-bold"
              >
                Reset
              </button>
            )}
          </div>

          {/* Sort Option */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="distance">Distance: Nearest First</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating: Highest Rated</option>
            </select>
          </div>

          {/* Area Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Neighborhood / Area</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {areasList.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>Max Starting Price</span>
              <span className="text-emerald-400 font-black">₹{maxPrice}/hr</span>
            </div>
            <input
              type="range"
              min="600"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Facility Filter */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Facility Feature</label>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {facilitiesList.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Turf Results Column */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
            <span>Showing <strong className="text-white">{results.length}</strong> arenas</span>
            <span>Sorted by {sortBy === 'distance' ? 'Nearest' : sortBy === 'price' ? 'Price' : 'Rating'}</span>
          </div>

          {results.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 border border-white/10">
              <p className="text-sm font-bold text-white mb-1">No matching arenas found</p>
              <p className="text-xs text-slate-400 mb-4">Try clearing filters or selecting another sport/area.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Bottom Sheet */}
      {showFilterBottomSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-md animate-fade-in lg:hidden">
          <div className="w-full max-w-lg glass-panel bg-slate-950 rounded-t-3xl border-t border-white/15 p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-slide-up">
            
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span>Filter & Sort Arenas</span>
              </h3>
              <button
                onClick={() => setShowFilterBottomSheet(false)}
                className="p-1 rounded-full bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sport Filter */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Sport</label>
              <div className="flex gap-2 flex-wrap">
                {sportsList.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSport === s
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 text-slate-300 border-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Option */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                <option value="distance">Distance: Nearest First</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Rating: Highest Rated</option>
              </select>
            </div>

            {/* Neighborhood / Area */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Neighborhood</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white"
              >
                {areasList.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Max Price Range */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Max Starting Price</span>
                <span className="text-emerald-400 font-black">₹{maxPrice}/hr</span>
              </div>
              <input
                type="range"
                min="600"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Apply & Reset Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-2xl glass-panel text-slate-300 font-bold text-xs"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilterBottomSheet(false)}
                className="flex-1 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
              >
                Apply ({results.length} Arenas)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
