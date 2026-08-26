import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,

        },

        contact: {
            type: String,
            trim: true,
        },

        role: {
            type: String,
            enum: ["customer", "seller"],
            default: "customer",
        },

        avatar: {
            type: String,
            default: "",
        },

        addresses: [
            {
                fullName: String,
                phone: String,
                address: String,
                city: String,
                state: String,
                pincode: String,
                country: {
                    type: String,
                    default: "India",
                },
                isDefault: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return ;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
