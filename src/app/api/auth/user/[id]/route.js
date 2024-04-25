import { NextResponse } from "next/server";
import DB from "../../../../../../services/database";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// GET METHOD BY ID OF USERS

export async function GET(request, { params }){
    try {
        const { id } = params;
        
        const { User } = await DB();

        const userFound = await User.findOne({_id: id });

        return NextResponse.json({ userFound }, { status:200 });

    } catch (error) {
        console.log(error);
        if(error instanceof mongoose.Error.ValidatorError){
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status:400
                },
            );
        };
        return NextResponse.error();
    };
};

// PUT METHOD BY ID OF USERS

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        
        const { putFirstName: first_name, putLastName: last_name, putEmail: email, putPassword: password } = await request.json();

        const { User } = await DB();
        
        if (password.length < 8) return NextResponse.json (
            {
                message: "The password can't be less than 8 characters long"
            },
            {
                status:400
            },
        );

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(id, { first_name, last_name, email, password:hashedPassword });
        
        return NextResponse.json({ message: "The data has been updated" }, { status: 200 } );

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError){
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status:400,
                }
            );
        };
        return NextResponse.error();
    };
};