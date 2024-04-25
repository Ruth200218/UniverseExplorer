import { NextResponse } from "next/server";
import DB from "../../../../../services/database";
import mongoose from "mongoose";

//GET METHOD BY ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        
        const { SolarSystem } = await DB();
        
        const solarSystemFound = await SolarSystem.findOne({ _id: id });
       
        return NextResponse.json({ solarSystemFound }, { status:200 });

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            );
        };
    };
};


//PUT METHOD BT ID
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        
        const { putName: name, putDisplayName: displayName, putScaleFactor: scaleFactor, putPlanets: planets, putStars: stars} = await request.json();
        
        const { SolarSystem } = await DB();

        //UPDATE PLANETS
        const putProcessedPlanets = [];
        for (const planetData of planets) {
            const { putName: name, putDisplayName: displayName, putRadius: radius, putTexture: texture, putDistance: distance, putYear: year, putDay: day, putDescription: description, putLayers: layers, putMoons: moons, putRings: rings } = planetData;

            const putPlanet = {
                name, 
                displayName,
                radius,
                texture,
                distance,
                year,
                day, 
                description,
                layers: [], 
                moons: [],
                rings: []
            };

            // PUT LAYERS
            for (const layerData of layers) {
                const { putName: name, putDisplayName: displayName, putRadius: radius, putOpacity: opacity, putTexture:texture, putSpeed:speed, putDescription: description } = layerData;
                const putLayer = {
                    name,
                    displayName,
                    radius,
                    opacity,
                    texture,
                    speed,
                    description
                };

                putPlanet.layers.push(putLayer);
            };

            // PUT MOONS
            for (const moonData of moons) {
                const { putName:name,  putDisplayName: displayName, putRadius:radius, putDistance: distance, putTexture:texture,  putYear: year, putDay: day, putDescription: description } = moonData;
                const putMoon = {
                    name,
                    displayName,
                    radius,
                    distance,
                    texture,
                    year,
                    day,
                    description
                };

                putPlanet.moons.push(putMoon);
            };
            //PUT RINGS
            for (const ringData of rings) {
                const { putName:name,  putDisplayName: displayName, putInsideRadius:insideRadius, putOutsideRadius: outsideRadius, putSegments:segments, putDescription: description } = ringData;
                const putRing = {
                    name,
                    displayName,
                    insideRadius,
                    outsideRadius,
                    segments,
                    description
                };
                
                putPlanet.rings.push(putRing);
            };

            putProcessedPlanets.push(putPlanet);
        };

        //UPDATE STARS 
        const putProcessedStars = [];
        for (const starData of stars){
            const { putName: name, putDisplayName: displayName, putRadius: radius, putTexture: texture, putSpeed: speed, putDescription: description } = starData;

            const putStar = {
                name,
                displayName,
                radius,
                texture,
                speed,
                description
            };

            putProcessedStars.push(putStar);
        };

        //UPDATE SOLAR SYSTEM 
        const putSolarSystem = await SolarSystem.findByIdAndUpdate(id, {
            name,
            displayName,
            scaleFactor,
            planets: putProcessedPlanets,
            stars: putProcessedStars
        }, { new: true });

        return NextResponse.json({ message: "Solar System Updated", data: putSolarSystem }, { status:200 })

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError){
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400
                }
            );
        };
    };
};