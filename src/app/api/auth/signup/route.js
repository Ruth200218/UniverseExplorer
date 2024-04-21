import { NextResponse } from "next/server";
import DB from "../../../../../services/database";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST (request) {
    try {
        const { first_name, last_name, email, password } = await request.json();
        const { User } = await DB();
        const emailFound = await User.findOne({email});

        if (emailFound) return NextResponse.json(
            {
                message: "Email already exists"
            },
            {
                status: 406,
            },
        );

        if (password.length < 8) return NextResponse.json (
            {
                message: "The password can't be less than 8 characters long"
            },
            {
                status:400
            },
        );

        const hashedPassword = await bcrypt.hash(password, 12);

        const user  = await User.create(
            {
                first_name,
                last_name,
                email,
                password: hashedPassword,
            }
        );

        return NextResponse.json(
            {
                email: user.email,
                password: user.password,
            },
            {
                message: "User signup"
            },
            {
                status: 201
            },
        );

    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError){
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            );
        }
        return NextResponse.error();
    }
}