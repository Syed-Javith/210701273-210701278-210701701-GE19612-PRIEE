export interface Food {
    _id: String,
    description: String,
    location: String,
    distributor: String
    isDelivered: Boolean,
    isBooked: Boolean,
    image: String
    foods: String
}
export interface User {
    _id: String,
    username: String,
    email: String,
    mobileNumber: Number,
    pincode: String
    isAdmin: Boolean
    role: "G" | "D" | "V",
    token: String
}
export interface LoginUser {
    email: String,
    password: String
}
export interface RegisterUser {
    username: String,
    email: String,
    mobileNumber: Number,
    pincode: String,
    role: "G" | "D" | "V",
    password: String
}
export interface Request {
    user: User,
    userId: String,
    foodId: String,
    foods: String,
    _id: String,
    isTaken: Boolean
}
export interface Coord{
    lat : number,
    long : number
}
export interface AddFood {
    pincode: String
    description: String
    location: String
    distributor: String
    image: String
    foods: String
    coordinates : Coord,
    distributorId : String
}