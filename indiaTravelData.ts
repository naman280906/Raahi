// utils/indiaTravelData.ts

export interface TransportOption {
  time: number;  // Hours
  cost: number;  // INR
  co2: number;   // KG per passenger
}

export interface CityNode {
  lat: number;
  lng: number;
  region: string;
}

// SLIDE 3 & 4: Geo-Coordinates for Map Markers
export const cities: Record<string, CityNode> = {
  "Srinagar": { lat: 34.0837, lng: 74.7973, region: "North" },
  "Jammu": { lat: 32.7266, lng: 74.8570, region: "North" },
  "Delhi": { lat: 28.6139, lng: 77.2090, region: "North" },
  "Mumbai": { lat: 19.0760, lng: 72.8777, region: "West" },
  "Bengaluru": { lat: 12.9716, lng: 77.5946, region: "South" },
  "Chennai": { lat: 13.0827, lng: 80.2707, region: "South" },
  "Kolkata": { lat: 22.5726, lng: 88.3639, region: "East" },
  "Guwahati": { lat: 26.1445, lng: 91.7362, region: "Northeast" },
  "Kanyakumari": { lat: 8.0883, lng: 77.5385, region: "South" },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714, region: "West" },
  "Haridwar": { lat: 29.9457, lng: 78.1642, region: "North" },
  "Leh": { lat: 34.1526, lng: 77.5771, region: "North" },
  "Kochi": { lat: 9.9312, lng: 76.2673, region: "South" }
};

/** 
 * INTEGRATED MULTI-MODAL GRAPH
 * Format: [Time (hrs), Cost (INR), CO2 (kg)]
 * Derived from Slides 7, 11, 15, and 21.
 */
export const indiaFullGraph: any = {
  "Srinagar": {
    "Jammu": { road: [6, 800, 43], rail: [null], air: [null] },
    "Delhi": { air: [1.5, 3500, 100], road: [18, 3000, 100] }
  },
  "Jammu": {
    "Srinagar": { road: [6, 800, 43] },
    "Delhi": { road: [9, 1400, 87], rail: [9.5, 577, 46], air: [1.2, 2800, 100] }
  },
  "Delhi": {
    "Mumbai": { air: [2.1, 4000, 210], rail: [18, 1384, 112], road: [20, 6000, 210] },
    "Bengaluru": { air: [2.6, 4500, 261], rail: [33, 2057, 139] },
    "Chennai": { air: [2.8, 5500, 264], rail: [30, 2180, 140] },
    "Kolkata": { air: [2.2, 3500, 195], rail: [20, 1441, 104] },
    "Ahmedabad": { road: [9, 2500, 66], rail: [14, 935, 35], air: [1.5, 3000, 77] }
  },
  "Mumbai": {
    "Pune": { road: [2.5, 500, 22], rail: [3, 150, 12] },
    "Goa": { road: [9, 1500, 87], rail: [10, 582, 46], air: [1.1, 2800, 80] },
    "Bengaluru": { air: [1.4, 3000, 126], road: [14, 4500, 126], rail: [20, 1155, 67] },
    "Ahmedabad": { road: [7.5, 2000, 66], rail: [7, 493, 35], air: [1.1, 2500, 77] }
  },
  "Chennai": {
    "Kanyakumari": { road: [11, 2800, 104], rail: [10.5, 698, 55] },
    "Bengaluru": { road: [5, 1200, 51], rail: [5.5, 362, 27], air: [0.8, 2200, 45] },
    "Kolkata": { air: [2.2, 4500, 137], rail: [26, 1663, 110] }
  },
  "Kolkata": {
    "Guwahati": { air: [1.1, 3200, 145], rail: [15, 969, 77], road: [16, 4000, 145] }
  },
  "Kochi": {
    "Bengaluru": { road: [8, 1500, 103], rail: [10, 614, 55], air: [1, 2500, 95] }
  },
  "Bengaluru": {
      "Kanyakumari": { road: [11, 3200, 108], rail: [12.5, 846, 57] }
  }
};

// Helper to get dropdown options in UI
export const ALL_INDIAN_CITIES = Object.keys(cities);