const User = require('./models/User');
const Listing = require('./models/Listing')
const Booking = require('./models/Booking')

exports.resolvers = {
    Query: {
        
        // Query for User
        getUsers: async (parent, args) => {
            return User.find({})
        },
        getUserById: async (parent, args) => {
            return User.findById(args.id)
        },
        getUserByUsername: async (parent, args) => {
            console.log(args)
            return await User.find({"username": args.username})
        },  
        // Query for Listing
        getListings: async (parent, args) => {
            return Listing.find({})
        },
        getListingByUser: async (parent, args) => {
            return await Listing.find({"username": args.username})
        },
        getListingByPostalCode: async (parent, args) => {
            return await Listing.find({"postal_code": args.postal_code})
        },
        getListingByAdmin: async (parent, args) => {
            console.log(args)
            return await Listing.find({"type": args.type})
        },
        // Query for Booking
        
        getBookings: async (parent, args) => {
            return Booking.find({})
        },
        getBookingByUser: async (parent, args) => {
            return Booking.find({"type": args.username.type})
        },
        getBookingByAdmin: async (parent, args) => {
            console.log(args)
            return await Booking.find({"type": args.username.type})
        },
    },

    Mutation: {
        // Mutation for User
        addUser: async (parent, args) => {
            console.log(args)

            let newUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })

            return newUser.save()
        },
        updateUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            
            return await User.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    username: args.username,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    password: args.password,
                    email: args.email,
                    type: args.type
                }
            }, {new: true}, (err, user) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the user');
                } else 
                {
                    return user
                }
            }
        );
        },
        deleteUser: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }   
            return await User.findByIdAndDelete(args.id)
        },
        loginUser: async (parent, args) => {
            console.log(args)
            const isAdmin = rule({ cache: 'contextual' })(
                async (parent, args) => {
                  return args.type === 'admin'
                },)
            // let user = User.find({"username": args.username})
             if (!isAdmin){
                 return JSON.stringify({status: false, "message" : "No user found"});
             }else{
                 return Listing.find({})
             }  
        },
        // Mutation for Listing
        addListing: async (parent, args) => {
            console.log(args)

            let newListing = new Listing({
                listing_id: args.listing_id,
                listing_title: args.listing_title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                username: args.username
            })

            return newListing.save()
        },
        updateListing: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
        
            return await Listing.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
                }
            }, {new: true}, (err, listing) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the listing');
                } else 
                {
                    return listing
                }
            }
        );
        },
        deleteListing: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await Listing.findByIdAndDelete(args.id)
        },
        // Mutation for Booking
        addBooking: async (parent, args) => {
            console.log(args)

            let newBooking = new Booking({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: args.username
            })

            return newBooking.save()
        },
        updateBooking: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
        
            return await Booking.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    listing_id: args.listing_id,
                    booking_id: args.booking_id,
                    booking_date: args.booking_date,
                    booking_start: args.booking_start,
                    booking_end: args.booking_end,
                    username: args.username
                }
            }, {new: true}, (err, booking) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the booking');
                } else 
                {
                    return booking
                }
            }
        );
        },
        deleteBooking: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return JSON.stringify({status: false, "message" : "No ID found"});
            }
            return await Booking.findByIdAndDelete(args.id)
        }
    }
}
