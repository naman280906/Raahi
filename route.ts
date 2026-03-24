// app/api/route/route.ts
import { NextResponse } from 'next/server';

/**
 * CORRECTED PATHS
 * Because 'utils' is inside 'app', we go up 2 levels
 */
import { campusGraph } from '../../utils/graphData';
import { indiaFullGraph } from '../../utils/indiaTravelData';
import { findShortestPath } from '../../utils/dijkstra';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { source, destination, filter, mode } = body;

        // --- 1. CAMPUS MODE LOGIC ---
        if (mode === 'campus') {
            if (!campusGraph[source] || !campusGraph[destination]) {
                return NextResponse.json({ error: "Campus location not found." }, { status: 404 });
            }
            const result = findShortestPath(campusGraph, source, destination);
            return NextResponse.json({
                path: result.path,
                totalTime: result.distance,
                explanation: `Raahi optimized your campus walk. Total time: ${result.distance} mins.`
            });
        }

        // --- 2. TRAVELER MODE LOGIC (India Dataset) ---
        if (mode === 'travel') {
            if (!indiaFullGraph[source] || !indiaFullGraph[destination]) {
                return NextResponse.json({ error: "City not found in India database." }, { status: 404 });
            }

            const travelWeights: any = {};

            // We loop through the data to find the "weight" based on your PDF filter
            for (const startCity in indiaFullGraph) {
                travelWeights[startCity] = {};
                for (const endCity in indiaFullGraph[startCity]) {
                    const modes = indiaFullGraph[startCity][endCity];
                    
                    let minWeight = Infinity;

                    // This part looks at [Time, Cost, CO2] based on your filter selection
                    Object.values(modes).forEach((data: any) => {
                        let currentVal = 0;
                        if (filter === 'fastest') currentVal = data[0];   // Hours
                        else if (filter === 'cheapest') currentVal = data[1]; // INR
                        else currentVal = data[2]; // CO2 kg

                        if (currentVal < minWeight) minWeight = currentVal;
                    });

                    travelWeights[startCity][endCity] = minWeight;
                }
            }

            const result = findShortestPath(travelWeights, source, destination);
            const unit = filter === 'fastest' ? 'hrs' : filter === 'cheapest' ? 'INR' : 'kg CO2';

            return NextResponse.json({
                path: result.path,
                totalTime: result.distance.toFixed(1),
                summary: { type: filter, totalTime: result.distance.toFixed(1) + " " + unit },
                explanation: `India-wide path calculated for ${filter.toUpperCase()}. Covering ${result.path.length} cities.`
            });
        }

        return NextResponse.json({ error: "Invalid Mode Selected" }, { status: 400 });

    } catch (error) {
        console.error("Raahi Backend Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}