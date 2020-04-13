# CRUD API for Intro Service

> CRUD API for Introduction Service, description of the shape of each of the API calls.

All of the Requests are use with `http://localhost:3002`.
# Table Of Contents:
1. Get Listing - [GET](#get-listing)
2. Create Listing - [POST](#create-listing)

## Get Listing

> Get request for listing data.

API Endpoint : `/api/intro/:listingId`

Fetches listing data from the database with listingId.

The following is an example of the data output:
```javascript
    {
      "photos": [
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300"
      ],
      "title": "New Place",
      "description": "A nice big place",
    }
```

## Create Listing

> POST request for listing data

API Endpoint : `/api/intro/:listingId`

All of the following fields are required:
* **photos** - Array
* **title** - String
* **description** - String

- All data is required, photos array can be empty. Front end data does not cover this case, so it's safe to assume that a photos array has 4 - 6 url strings.

- Validation for each field is not added yet: [Will be implemented](https://github.com/Epona-SDC/melvin-service/issues/6)

  <span style="color:red">*User should not be able to update listingNumber*</span>
