import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
        first_name: {
            type: String,
            required: [true, "Name is required"],
            match: [
                /^[A-Za-zñÑáéíóúÁÉÍÓÚ]*$/,
                "Nombre inválido"
            ],
        },
        last_name: {
            type: String, 
            required: [true, "Last name is required"],
            match: [
                /^[A-Za-zñÑáéíóúÁÉÍÓÚ]*$/, 
                "Apellido inválido"
            ],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Email is invalid"
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;