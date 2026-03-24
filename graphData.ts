// utils/graphData.ts

export interface Graph {
    [key: string]: { [neighbor: string]: number };
}

// SLIDE 4 & SLIDE 3 - EXACT NODES AND CONNECTIONS
export const campusGraph: Graph = {
    "University Building": { "Boys Hostel Block": 2, "Chemistry Lab": 2, "Tech Park": 2 },
    "Boys Hostel Block": { "University Building": 2, "Chemistry Lab": 2 },
    "Chemistry Lab": { "University Building": 2, "Boys Hostel Block": 2, "BEL Lab": 2, "Tech Park": 2 },
    "BEL Lab": { "Chemistry Lab": 2, "TP Ground": 2 },
    "Tech Park": { "University Building": 2, "Chemistry Lab": 2, "TP Ground": 2, "TP Ganeshum Auditorium": 2 },
    "TP Ground": { "Tech Park": 2, "BEL Lab": 2, "Girls Hostel Block": 2, "SRM Hospital": 2 },
    "TP Ganeshum Auditorium": { "Tech Park": 2, "SRM Hospital": 2 },
    "SRM Hospital": { "TP Ganeshum Auditorium": 2, "TP Ground": 2 },
    "Girls Hostel Block": { "TP Ground": 2 }
};

// SLIDE 6 - TIME CONSTRAINTS
export const timeConstraints: any = {
    "08:00 AM": {
        "Boys Hostel Block-University Building": 10,
        "Girls Hostel Block-University Building": 15
    },
    "09:45 AM": {
        "Boys Hostel Block-Tech Park": 15,
        "Girls Hostel Block-Tech Park": 12
    },
    "12:00 PM": {
        "Tech Park-Boys Hostel Block": 15,
        "Tech Park-Girls Hostel Block": 12,
        "University Building-Boys Hostel Block": 10,
        "University Building-Girls Hostel Block": 15
    },
    "03:00 PM": {
        "Boys Hostel Block-Chemistry Lab": 10,
        "Boys Hostel Block-BEL Lab": 5,
        "Girls Hostel Block-Chemistry Lab": 10,
        "Girls Hostel Block-BEL Lab": 5
    }
};

// HELPER LIST FOR DROPDOWNS
export const allNodes = Object.keys(campusGraph);