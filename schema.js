const { gql } = require('apollo-server-express');

exports.typeDefs = /* graphql Schema */ gql `
    """ 
        For User
    """
    type User {
        id: ID
        username: String
        firstname: String
        lastname: String
        password: String
        email: String
        type: String
    }

    """
        For Listing
    """
    type Listing {
        id: ID
        listing_id: String
        listing_title: String
        description: String
        street: String
        city: String
        postal_code: String
        price: String
        email: String
        username: String
        user: User
    }

    """
        For Booking
    """
    type Booking {
        id: ID
        listing_id: String
        booking_id: String
        booking_date: String
        booking_start: String
        booking_end: String
        username: String
        listing: Listing
    }

    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
        getUserByUsername(username: String!): [User]

        getListings: [Listing]
        getListingById(id: ID!): Listing
        getListingByUser(username: String!): [Listing]
        getListingByAdmin(type: String!): [Listing]
        getListingByPostalCode(postal_code: String!): [Listing]

        getBookings: [Booking]
        getBookingById(id: ID!): Booking
        getBookingByUser(username: String!): [Booking]
        getBookingByAdmin(username: String!): [Booking]

    }

    type Mutation {
        addUser(username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!): User
        """
            I am comment - Update User
        """
        updateUser(id:ID!
            username: String!
            firstname: String!
            lastname: String!
            password: String!
            email: String!
            type: String!): User

        deleteUser(id:ID!): User

        loginUser(username: String!
            password: String!): Listing

        addListing(listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: String!
            email: String!
            username: String!): Listing
        """
            I am comment - Update Listing
        """
        updateListing(id:ID!
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: String!
            email: String!
            username: String!): Listing

        deleteListing(id:ID!): Listing

        addBooking(listing_id: String!
            booking_id: String!
            booking_date: String!
            booking_start: String!
            booking_end: String!
            username: String!): Booking
        """
            I am comment - Update Booking
        """
        updateBooking(id:ID!
            listing_id: String!
            booking_id: String!
            booking_date: String!
            booking_start: String!
            booking_end: String!
            username: String!): Booking

        deleteBooking(id:ID!): Booking
    }
`