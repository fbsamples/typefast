var fb_defs = {
    "!name": "!Facebook Scripting Definitions",
    "!define": {
        "cursor_prototype": {
            ":Symbol.iterator": "fn() -> !this"
        },
        "AdCreativeLinkDataAppLinkSpec": {
            "android": {
                "!type": "list<AndroidAppLink>",
                "!doc": "Native deeplinks to use on Android"
            },
            "ios": {
                "!type": "list<IosAppLink>",
                "!doc": "Native deeplinks to use on iOS"
            },
            "ipad": {
                "!type": "list<IosAppLink>",
                "!doc": "Native deeplinks to use on iPad"
            },
            "iphone": {
                "!type": "list<IosAppLink>",
                "!doc": "Native deeplinks to use on iPhone"
            }
        },
        "BusinessPageRequest": {
            "id": {
                "!type": "string",
                "!doc": "The Page ID"
            },
            "page": {
                "!type": "Object",
                "!doc": "The Page that is being requested. This may not be visible"
            }
        },
        "CustomAudiencePrefillState": {
            "description": {
                "!type": "string",
                "!doc": "Detailed explanation of the status"
            },
            "num_added": {
                "!type": "number",
                "!doc": "Number of items successfully added by the prefill"
            },
            "status": {
                "!type": "string",
                "!doc": "Operation Status of the prefill job"
            }
        },
        "TargetingGeoLocationCity": {
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "distance_unit": {
                "!type": "string",
                "!doc": "Distance unit"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            },
            "radius": {
                "!type": "number",
                "!doc": "Radius"
            },
            "region": {
                "!type": "string",
                "!doc": "Region"
            },
            "region_id": {
                "!type": "string",
                "!doc": "Region ID"
            }
        },
        "SystemUser_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +SystemUser, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +SystemUser",
                "!doc": "Return the next SystemUser item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +SystemUser",
                "!doc": "Gets the current SystemUser of the cursor"
            }
        },
        "ReachFrequencyPrediction_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ReachFrequencyPrediction, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ReachFrequencyPrediction",
                "!doc": "Return the next ReachFrequencyPrediction item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ReachFrequencyPrediction",
                "!doc": "Gets the current ReachFrequencyPrediction of the cursor"
            }
        },
        "AdsPixel_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdsPixel, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdsPixel",
                "!doc": "Return the next AdsPixel item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdsPixel",
                "!doc": "Gets the current AdsPixel of the cursor"
            }
        },
        "null_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +null, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +null",
                "!doc": "Return the next null item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +null",
                "!doc": "Gets the current null of the cursor"
            }
        },
        "BusinessPageRequest_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +BusinessPageRequest, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +BusinessPageRequest",
                "!doc": "Return the next BusinessPageRequest item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +BusinessPageRequest",
                "!doc": "Gets the current BusinessPageRequest of the cursor"
            }
        },
        "AudiencePermission_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AudiencePermission, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AudiencePermission",
                "!doc": "Return the next AudiencePermission item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AudiencePermission",
                "!doc": "Gets the current AudiencePermission of the cursor"
            }
        },
        "InstagramUser_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +InstagramUser, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +InstagramUser",
                "!doc": "Return the next InstagramUser item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +InstagramUser",
                "!doc": "Gets the current InstagramUser of the cursor"
            }
        },
        "ProductCatalog_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductCatalog, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductCatalog",
                "!doc": "Return the next ProductCatalog item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductCatalog",
                "!doc": "Gets the current ProductCatalog of the cursor"
            }
        },
        "ProfilePictureSource_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProfilePictureSource, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProfilePictureSource",
                "!doc": "Return the next ProfilePictureSource item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProfilePictureSource",
                "!doc": "Gets the current ProfilePictureSource of the cursor"
            }
        },
        "Page_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Page, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Page",
                "!doc": "Return the next Page item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Page",
                "!doc": "Gets the current Page of the cursor"
            }
        },
        "BusinessAdAccountRequest_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +BusinessAdAccountRequest, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +BusinessAdAccountRequest",
                "!doc": "Return the next BusinessAdAccountRequest item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +BusinessAdAccountRequest",
                "!doc": "Gets the current BusinessAdAccountRequest of the cursor"
            }
        },
        "MeasurementReport_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +MeasurementReport, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +MeasurementReport",
                "!doc": "Return the next MeasurementReport item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +MeasurementReport",
                "!doc": "Gets the current MeasurementReport of the cursor"
            }
        },
        "AdAccount_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccount, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccount",
                "!doc": "Return the next AdAccount item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccount",
                "!doc": "Gets the current AdAccount of the cursor"
            }
        },
        "Business": {
            "getSystemUsers": {
                "!type": "fn() -> +SystemUser_cursor",
                "!doc": "The business's system users"
            },
            "getReachFrequencyPredictions": {
                "!type": "fn() -> +ReachFrequencyPrediction_cursor",
                "!doc": "The GRP Plans that business owns"
            },
            "getAdsPixels": {
                "!type": "fn() -> +AdsPixel_cursor",
                "!doc": "The pixels owned by this business"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getBusinessPageRequests": {
                "!type": "fn() -> +BusinessPageRequest_cursor",
                "!doc": "The pages that the business has requested ownership of"
            },
            "getAudiencePermissions": {
                "!type": "fn() -> +AudiencePermission_cursor",
                "!doc": "The shared audience permissions of audiences owned by this business"
            },
            "getInstagramUsers": {
                "!type": "fn() -> +InstagramUser_cursor",
                "!doc": "The Instagram accounts this business owns"
            },
            "createProductCatalogs": {
                "!type": "fn() -> +ProductCatalog_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getProfilePictureSources": {
                "!type": "fn() -> +ProfilePictureSource_cursor",
                "!doc": "The picture of this business"
            },
            "getPages": {
                "!type": "fn() -> +Page_cursor",
                "!doc": "The pages that the business owns"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "getProductCatalogs": {
                "!type": "fn() -> +ProductCatalog_cursor",
                "!doc": "The product catalogs that belong to this business"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getBusinessAdAccountRequests": {
                "!type": "fn() -> +BusinessAdAccountRequest_cursor",
                "!doc": "The ad accounts that the business has requested ownership of"
            },
            "getMeasurementReports": {
                "!type": "fn() -> +MeasurementReport_cursor",
                "!doc": "The measurement reports that the business owns"
            },
            "createMeasurementReports": {
                "!type": "fn() -> +MeasurementReport_cursor",
                "!doc": "Creates a multi-channel report for this business"
            },
            "getAdAccounts": {
                "!type": "fn() -> +AdAccount_cursor",
                "!doc": "The ad accounts that the business owns"
            },
            "id": {
                "!type": "string",
                "!doc": "The business ID"
            },
            "name": {
                "!type": "string",
                "!doc": "The business's name"
            },
            "payment_account_id": {
                "!type": "string",
                "!doc": "The id of the payment account for this business identity"
            },
            "primary_page": {
                "!type": "Object",
                "!doc": "The primary page of the business"
            }
        },
        "CustomAudienceSession": {
            "end_time": {
                "!type": "string",
                "!doc": "Upload end time"
            },
            "num_invalid_entries": {
                "!type": "string",
                "!doc": "Number of invalid entries in the current session"
            },
            "num_matched": {
                "!type": "string",
                "!doc": "Number of entries matched in the current session"
            },
            "num_received": {
                "!type": "string",
                "!doc": "Number of entries received in the current session"
            },
            "progress": {
                "!type": "string",
                "!doc": "Progress of the session"
            },
            "session_id": {
                "!type": "string",
                "!doc": "Upload session ID"
            },
            "stage": {
                "!type": "string",
                "!doc": "Status of the session"
            },
            "start_time": {
                "!type": "string",
                "!doc": "Upload start time"
            }
        },
        "AdAccountTargetingInsights": {
            "recommendation_rating": {
                "!type": "number",
                "!doc": "Recommendation Rating"
            },
            "path": {
                "!type": "list<string>",
                "!doc": "Path"
            },
            "name": {
                "!type": "string",
                "!doc": "Attribute name"
            },
            "performance_rating": {
                "!type": "number",
                "!doc": "Performance Rating"
            },
            "exploration_ratio": {
                "!type": "number",
                "!doc": "Exploration Ratio"
            },
            "tags": {
                "!type": "list<string>",
                "!doc": "Tags"
            },
            "type": {
                "!type": "AdAccountTargetingInsights_type",
                "!doc": "Attribute type"
            },
            "id": {
                "!type": "string",
                "!doc": "Attribute id"
            },
            "audience_size": {
                "!type": "number",
                "!doc": "Audience size"
            }
        },
        "ProductSet_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductSet, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductSet",
                "!doc": "Return the next ProductSet item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductSet",
                "!doc": "Gets the current ProductSet of the cursor"
            }
        },
        "ProductItem": {
            "update": {
                "!type": "fn(params: Object) -> +ProductItem",
                "!doc": "Update fields on the ProductItem"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the ProductItem"
            },
            "getProductSets": {
                "!type": "fn() -> +ProductSet_cursor",
                "!doc": "Product sets that this item belongs to"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "additional_image_urls": {
                "!type": "list<string>",
                "!doc": "More images. Include as many of these as you want."
            },
            "sale_price_end_date": {
                "!type": "string",
                "!doc": "Date when the sale price ends"
            },
            "size": {
                "!type": "string",
                "!doc": "The size of the item. We only accept the following units of measurement: `in, ft, cm, m`. Format is \"LxWxH units\" (Length x Width x Height). e.g. 10x6x8 in"
            },
            "gender": {
                "!type": "ProductItem_gender",
                "!doc": "Gender the product item is targeted towards."
            },
            "color": {
                "!type": "string",
                "!doc": "Color of the product item"
            },
            "material": {
                "!type": "string",
                "!doc": "Material of the product item<br>Max size: 200"
            },
            "manufacturer_part_number": {
                "!type": "string",
                "!doc": "Manufacturer's ID for the product item <br>**Note**: Either `gtin`, `mpn`, or `brand` are required."
            },
            "ordering_index": {
                "!type": "number",
                "!doc": "Index used for ordering items within a group"
            },
            "brand": {
                "!type": "string",
                "!doc": "Brand of the product <br>**Note**: Either `gtin`, `mpn`, or `brand` are required."
            },
            "price": {
                "!type": "string",
                "!doc": "Price of the product item, e.g. $5.99"
            },
            "product_type": {
                "!type": "string",
                "!doc": "Retailer defined category of the product item. You can include more than one product type delimited by commas or include multiple `<product_type>` attributes. <br>Max size: 750"
            },
            "retailer_id": {
                "!type": "string",
                "!doc": "Retailer's ID for the product item. From the `id` field in the feed"
            },
            "image_url": {
                "!type": "string",
                "!doc": "Image URL of the product item This is the image used in the feed. Maintain aspect ratio 1.91:1. Images will be displayed at 1200x630px"
            },
            "start_date": {
                "!type": "string",
                "!doc": "Date when the product started to exist"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the product item"
            },
            "product_feed": {
                "!type": "ProductFeed",
                "!doc": "Product feed the product item is in"
            },
            "url": {
                "!type": "string",
                "!doc": "URL of the product item"
            },
            "pattern": {
                "!type": "string",
                "!doc": "Pattern of the product item"
            },
            "sale_price": {
                "!type": "string",
                "!doc": "Sale price of the product item, e.g. $3.99"
            },
            "gtin": {
                "!type": "string",
                "!doc": "Global trade ID of the product item, one of: EAN, UPC, JAN, or ISBN <br>**Note**: Either `gtin`, `mpn`, or `brand` are required."
            },
            "visibility": {
                "!type": "ProductItem_visibility",
                "!doc": "Visibility of the product"
            },
            "review_rejection_reasons": {
                "!type": "list<item_of_review_rejection_reasons>",
                "!doc": "Reasons the product was rejected on review, if applicable"
            },
            "custom_label_0": {
                "!type": "string",
                "!doc": "An optional custom label that can contain additional information about\n        the item."
            },
            "applinks": {
                "!type": "AppLinks",
                "!doc": "App links for native platforms, e.g. Android, IOS and Windows Phone."
            },
            "custom_label_1": {
                "!type": "string",
                "!doc": "An optional custom label that can contain additional information about\n        the item."
            },
            "custom_data": {
                "!type": "list<Object>",
                "!doc": "Custom data key-value pairs"
            },
            "review_status": {
                "!type": "ProductItem_review_status",
                "!doc": "The internal review status of the product"
            },
            "custom_label_2": {
                "!type": "string",
                "!doc": "An optional custom label that can contain additional information about\n        the item."
            },
            "sale_price_start_date": {
                "!type": "string",
                "!doc": "Date when the sale price starts"
            },
            "shipping_weight_unit": {
                "!type": "ProductItem_shipping_weight_unit",
                "!doc": "Shipping weight unit of the product item"
            },
            "custom_label_3": {
                "!type": "string",
                "!doc": "An optional custom label that can contain additional information about\n        the item."
            },
            "retailer_product_group_id": {
                "!type": "string",
                "!doc": "The parent ID for products that are variants of one another. e.g. the Red Polo Shirt is a variant of Polo Shirt. From the `item_group_id` field in the feed."
            },
            "id": {
                "!type": "string",
                "!doc": "A unique identifier for this item (which can be a variant for a product). If there are multiple instances of the same ID, all of those entries will be ignored. This maps to `retailer_id` after the product has been imported."
            },
            "condition": {
                "!type": "ProductItem_condition",
                "!doc": "Condition of the product item."
            },
            "availability": {
                "!type": "ProductItem_availability",
                "!doc": "Availability of the product item"
            },
            "custom_label_4": {
                "!type": "string",
                "!doc": "An optional custom label that can contain additional information about\n        the item."
            },
            "shipping_weight_value": {
                "!type": "number",
                "!doc": "Shipping weight value of the product item"
            },
            "description": {
                "!type": "string",
                "!doc": "Description of the product item"
            },
            "category": {
                "!type": "string",
                "!doc": "Category of the product iteme.g., `Apparel & Accessories > Clothing > Dresses` <br>Max size: 250"
            },
            "expiration_date": {
                "!type": "string",
                "!doc": "Date when the product expires"
            },
            "commerce_insights": {
                "!type": "ProductItemCommerceInsights",
                "!doc": "Commerce insights for this product"
            },
            "age_group": {
                "!type": "ProductItem_age_group",
                "!doc": "Age group the product item is targeted towards."
            }
        },
        "CustomAudiencePermission": {
            "can_edit": {
                "!type": "bool",
                "!doc": "Permission to edit the audience"
            },
            "can_see_insight": {
                "!type": "bool",
                "!doc": "Permission to see insight of the audience"
            },
            "can_share": {
                "!type": "bool",
                "!doc": "Capability to share audience based on gatekeeper"
            },
            "subtype_supports_lookalike": {
                "!type": "bool",
                "!doc": "Capability to be used as seed for lookalike audience"
            }
        },
        "ReachFrequencySpec": {
            "countries": {
                "!type": "list<string>",
                "!doc": "List of supported targeting countries"
            },
            "max_campaign_duration": {
                "!type": "string",
                "!doc": "Individual account reach and frequency maximum campaign duration."
            },
            "max_days_to_finish": {
                "!type": "string",
                "!doc": "Individual account reach and frequency maximum days to finish."
            },
            "min_campaign_duration": {
                "!type": "string",
                "!doc": "Individual account reach and frequency minimum campaign duration."
            },
            "min_reach_limits": {
                "!type": "string",
                "!doc": "Individual reach and frequency configurations name"
            }
        },
        "ProductFeedSchedule": {
            "day_of_month": {
                "!type": "number",
                "!doc": "The day of month to fetch feed, for monthly schedules e.g., 1 for first of month"
            },
            "day_of_week": {
                "!type": "ProductFeedSchedule_day_of_week",
                "!doc": "The day of week to fetch feed, for weekly schedules. Allowed values: SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY"
            },
            "hour": {
                "!type": "number",
                "!doc": "Hour of the day to fetch the product feed, 0-23 PST"
            },
            "interval": {
                "!type": "ProductFeedSchedule_interval",
                "!doc": "The interval at which the product feed gets fetched"
            },
            "minute": {
                "!type": "number",
                "!doc": "Minute of the hour to fetch the product feed, 0-59"
            },
            "url": {
                "!type": "string",
                "!doc": "The location of the product feed to fetch"
            },
            "username": {
                "!type": "string",
                "!doc": "The username that is needed to access the url"
            }
        },
        "ProductFeedUploadErrorSample": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the sample"
            },
            "retailer_id": {
                "!type": "string",
                "!doc": "Retailer ID of the item involved if applies, empty string otherwise"
            },
            "row_number": {
                "!type": "number",
                "!doc": "Row number in the product feed file where the error was found"
            }
        },
        "AdPreview": {
            "body": {
                "!type": "string",
                "!doc": "The HTML to render a preview of the ad"
            }
        },
        "AdCreativeLinkDataCallToAction": {
            "type": {
                "!type": "AdCreativeLinkDataCallToAction_type",
                "!doc": "The type of the action. Not all types can be used for all\n      ads. Check\n      [Ads Product Guide](https://www.facebook.com/business/ads-guide)\n      to see which type can be used based on the `objective` of your\n      campaign."
            },
            "value": {
                "!type": "Object",
                "!doc": "JSON containing the call to action data."
            }
        },
        "AdAccountRoasCohorts": {
            "adgroup_id": {
                "!type": "string",
                "!doc": "Ad group ID for the cohorts"
            },
            "campaign_group_id": {
                "!type": "string",
                "!doc": "Campaign group ID for the cohorts"
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "Campaign ID for the cohorts"
            },
            "cohorts_data": {
                "!type": "list<RoasCohortsData>",
                "!doc": "Cohorts data for the specified time range"
            }
        },
        "BusinessAdAccountRequest": {
            "ad_account": {
                "!type": "AdAccount",
                "!doc": "The ad account that is being requested"
            },
            "id": {
                "!type": "string",
                "!doc": "The ad account ID"
            },
            "permitted_roles": {
                "!type": "list<string>",
                "!doc": "Roles that are assignable to this ad account"
            }
        },
        "AdPromotedObject": {
            "product_set_id": {
                "!type": "string",
                "!doc": "The ID of a Product Set within a Campaign Group level Product\n      Catalog. Used with\n      [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads)."
            },
            "application_id": {
                "!type": "string",
                "!doc": "The ID of a Facebook Application. Usually related to mobile or canvas games being promoted on Facebook for installs or engagement"
            },
            "page_id": {
                "!type": "string",
                "!doc": "The ID of a Facebook Page"
            },
            "custom_event_type": {
                "!type": "AdPromotedObject_custom_event_type",
                "!doc": "The event from an App Event of a mobile app, or `tag` of an\n    [conversion pixel](/docs/marketing-api/offsite-pixels)."
            },
            "place_page_set_id": {
                "!type": "string",
                "!doc": "The ID of a Place Page Set for Dynamic Local Ads."
            },
            "object_store_url": {
                "!type": "string",
                "!doc": "The uri of the mobile / digital store where an application can be bought / downloaded. This is platform specific. When combined with the \"application_id\" this uniquely specifies an object which can be the subject of a Facebook advertising campaign."
            },
            "product_catalog_id": {
                "!type": "string",
                "!doc": "The ID of a Product Catalog. Used with\n      [Dynamic Product Ads](/docs/marketing-api/dynamic-product-ads)."
            },
            "pixel_id": {
                "!type": "string",
                "!doc": "The ID of a Facebook conversion pixel.  Used with offsite conversion campaigns."
            },
            "offer_id": {
                "!type": "string",
                "!doc": "The ID of an Offer from a Facebook Page."
            }
        },
        "AdRecommendationData": {
            "link": {
                "!type": "string",
                "!doc": "Link associated with the recommendation"
            }
        },
        "FlexibleTargeting": {
            "behaviors": {
                "!type": "list<IDName>",
                "!doc": "Behaviors to target"
            },
            "politics": {
                "!type": "list<IDName>",
                "!doc": "Politics to target"
            },
            "custom_audiences": {
                "!type": "list<IDName>",
                "!doc": "Custom list of users to target to"
            },
            "relationship_statuses": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting relationship statuses"
            },
            "education_schools": {
                "!type": "list<IDName>",
                "!doc": "Schools attended"
            },
            "moms": {
                "!type": "list<IDName>",
                "!doc": "Types of moms to target"
            },
            "income": {
                "!type": "list<IDName>",
                "!doc": "Income to target"
            },
            "interests": {
                "!type": "list<IDName>",
                "!doc": "Targeting user interests"
            },
            "household_composition": {
                "!type": "list<IDName>",
                "!doc": "Household compositions to target"
            },
            "work_employers": {
                "!type": "list<IDName>",
                "!doc": "Employers"
            },
            "net_worth": {
                "!type": "list<IDName>",
                "!doc": "Net worth to target"
            },
            "college_years": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user year in college"
            },
            "home_ownership": {
                "!type": "list<IDName>",
                "!doc": "Home owership types to target"
            },
            "user_adclusters": {
                "!type": "list<IDName>",
                "!doc": "Targeting user ad clusters"
            },
            "home_value": {
                "!type": "list<IDName>",
                "!doc": "Home values to target"
            },
            "education_majors": {
                "!type": "list<IDName>",
                "!doc": "Majors during education"
            },
            "connections": {
                "!type": "list<IDName>",
                "!doc": "Targeting connections"
            },
            "education_statuses": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user education statuses"
            },
            "friends_of_connections": {
                "!type": "list<IDName>",
                "!doc": "Friends of connections to target to"
            },
            "generation": {
                "!type": "list<IDName>",
                "!doc": "Generations to target"
            },
            "ethnic_affinity": {
                "!type": "list<IDName>",
                "!doc": "Ethnic affinities to target"
            },
            "home_type": {
                "!type": "list<IDName>",
                "!doc": "Home types to target"
            },
            "family_statuses": {
                "!type": "list<IDName>",
                "!doc": "Status of family"
            },
            "interested_in": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting gender of person user is interested in"
            },
            "work_positions": {
                "!type": "list<IDName>",
                "!doc": "Positions at work"
            },
            "industries": {
                "!type": "list<IDName>",
                "!doc": "Industries to target"
            },
            "life_events": {
                "!type": "list<IDName>",
                "!doc": "Events in life"
            },
            "office_type": {
                "!type": "list<IDName>",
                "!doc": "Office types to target"
            }
        },
        "PartnerCategory": {
            "details": {
                "!type": "string",
                "!doc": "Details of the partner category"
            },
            "approximate_count": {
                "!type": "number",
                "!doc": "Reach estimate of the partner category"
            },
            "targeting_type": {
                "!type": "string",
                "!doc": "Targeting type of the partner category"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the partner category"
            },
            "is_private": {
                "!type": "bool",
                "!doc": "Whether or not this is a private partner category"
            },
            "status": {
                "!type": "string",
                "!doc": "Status of the partner category"
            },
            "parent_category": {
                "!type": "string",
                "!doc": "Parent of the partner category"
            },
            "country": {
                "!type": "string",
                "!doc": "Country of the partner category"
            },
            "source": {
                "!type": "string",
                "!doc": "Source of the partner category"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the partner category"
            },
            "description": {
                "!type": "string",
                "!doc": "Description of the partner category"
            }
        },
        "IDName": {
            "id": {
                "!type": "string",
                "!doc": "ID"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            }
        },
        "AdsPixelStatsResult": {
            "aggregation": {
                "!type": "AdsPixelStatsResult_aggregation",
                "!doc": "The aggregation used for the stat."
            },
            "data": {
                "!type": "list<AdsPixelStats>",
                "!doc": "Field value and number of times the pixel fired with the value"
            },
            "timestamp": {
                "!type": "string",
                "!doc": "Timestamp of this stats."
            }
        },
        "ConnectionObjectOpenGraphObject": {
            "display_name": {
                "!type": "string",
                "!doc": "Display name of this Open Graph Object"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of this Open Graph Object"
            },
            "properties": {
                "!type": "list<ConnectionObjectOpenGraphObjectProperty>",
                "!doc": "Properties of this Open Graph Object"
            }
        },
        "CustomAudienceStatus": {
            "code": {
                "!type": "number",
                "!doc": "Status code"
            },
            "description": {
                "!type": "string",
                "!doc": "Status description"
            }
        },
        "TransactionCurrencyAmount": {
            "amount": {
                "!type": "string",
                "!doc": "Value of the amount in cents"
            },
            "currency": {
                "!type": "string",
                "!doc": "Currency in which the amount is given"
            },
            "total_amount": {
                "!type": "string",
                "!doc": "Value of the amount in cents"
            }
        },
        "AdsPixelStatsResult_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdsPixelStatsResult, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdsPixelStatsResult",
                "!doc": "Return the next AdsPixelStatsResult item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdsPixelStatsResult",
                "!doc": "Gets the current AdsPixelStatsResult of the cursor"
            }
        },
        "CustomConversion": {
            "update": {
                "!type": "fn(params: Object) -> +CustomConversion",
                "!doc": "Update fields on the CustomConversion"
            },
            "getAdsPixelStatsResults": {
                "!type": "fn() -> +AdsPixelStatsResult_cursor",
                "!doc": "Stats data for this conversion"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "pixel": {
                "!type": "AdsPixel",
                "!doc": "The pixel that will send events"
            },
            "default_conversion_value": {
                "!type": "number",
                "!doc": "When conversion is URL based, the conversion value associated to each conversion"
            },
            "last_fired_time": {
                "!type": "string",
                "!doc": "Time at which the pixel was last fired"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the custom conversion"
            },
            "creation_time": {
                "!type": "string",
                "!doc": "Time at which the conversion was created"
            },
            "first_fired_time": {
                "!type": "string",
                "!doc": "Time at which the pixel was first fired"
            },
            "account_id": {
                "!type": "string",
                "!doc": "Ad Account ID assoicated to this custom conversion"
            },
            "custom_event_type": {
                "!type": "CustomConversion_custom_event_type",
                "!doc": "The type of the conversion event, e.g. PURCHASE"
            },
            "pixel_rule": {
                "!type": "string",
                "!doc": "Rule of the custom conversion"
            },
            "is_archived": {
                "!type": "bool",
                "!doc": "Whether this conversion is archived. Archived conversions are no longer tracked in the system"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the custom conversion"
            },
            "description": {
                "!type": "string",
                "!doc": "Description of the custom conversion"
            }
        },
        "WebAppLink": {
            "should_fallback": {
                "!type": "bool",
                "!doc": "Describes if the web link should be used if the native links don't work"
            },
            "url": {
                "!type": "string",
                "!doc": "The web equivalent for an app link"
            }
        },
        "TargetingSentenceLine": {
            "id": {
                "!type": "string",
                "!doc": "ID of the target sentence line"
            },
            "params": {
                "!type": "Targeting",
                "!doc": "Target spec after normalization"
            },
            "targetingsentencelines": {
                "!type": "[?]",
                "!doc": "Plain language description of the target spec"
            }
        },
        "TargetingGeoLocationRegion": {
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            }
        },
        "AdCreativeTextData": {
            "message": {
                "!type": "string",
                "!doc": "The text of the page post."
            }
        },
        "AdsPixelStats": {
            "count": {
                "!type": "number",
                "!doc": "How many times the aggregation value was recorded"
            },
            "value": {
                "!type": "string",
                "!doc": "Value of aggregation field"
            }
        },
        "AdCreativeLinkDataChildAttachment": {
            "place_data": {
                "!type": "Object",
                "!doc": "Additional description to help navigate people to your business\n         location"
            },
            "name": {
                "!type": "string",
                "!doc": "Overwrites the title of the attachment on Facebook, not used on\n        Instagram."
            },
            "image_hash": {
                "!type": "string",
                "!doc": "The image hash of an uploaded image for this attachment. For an ad\n        on Facebook, if\n        neither `picture` nor `image_hash` is set, the image of `link_data`\n        above will be used. For an ad on Instagram, either `picture` or\n        `image_hash` is required."
            },
            "call_to_action": {
                "!type": "AdCreativeLinkDataCallToAction",
                "!doc": "Call to action of this attachment. On Facebook, we support\n        one optional CTA per attachment. If it not specified, there will\n        be no CTA for this attachment. <br>\n        On Instagram, there is one CTA per attachment. If\n        the CTA is not specified, a CTA will be created by the system, using\n        \"Learn more\" as the `type`, and the `link` from this child attachment\n        as the `link`. If the CTA is specified, its `link` must be the same\n        as the `link` of this child attachment."
            },
            "link": {
                "!type": "string",
                "!doc": "The link of this attachment."
            },
            "description": {
                "!type": "string",
                "!doc": "Overwrites the description of each attachment on Facebook, not used\n        on Instagram."
            },
            "picture": {
                "!type": "string",
                "!doc": "The url of an image for this attachment. For an ad on Facebook, if\n        neither `picture` nor `image_hash` is set, the image specified in\n        `link_data` above will be used. For an ad on Instagram, either `picture`\n        or `image_hash` is required."
            },
            "video_id": {
                "!type": "string",
                "!doc": "ID of an uploaded video, if this attachment is a video. Not supported\n        for Instagram ads."
            },
            "image_crops": {
                "!type": "AdsImageCrops",
                "!doc": "Image crops, using the crop spec with `100x100` key for Carousel ads.\n        If no `100x100` crop spec is provided, the image would be cropped\n        automatically, unless the image is square already. The final cropped\n        image size needs to be at least 200x200 pixels for Facebook, or\n        600x600 for Instagram."
            }
        },
        "AdCreativePhotoData": {
            "branded_content_sponsor_page_id": {
                "!type": "string",
                "!doc": "The branded content sponsor page id."
            },
            "caption": {
                "!type": "string",
                "!doc": "The description of the image"
            },
            "image_hash": {
                "!type": "string",
                "!doc": "Hash of an image in your image library with Facebook. Specify this\n        field or `url` but not both. See\n        [Ad Image](/docs/marketing-api/reference/ad-image)."
            },
            "url": {
                "!type": "string",
                "!doc": "URL of an image to use in the ad. Specify this field or `image_hash`\n         but not both. The image specified at the URL will be saved into the\n         ad accounts [image library](/docs/marketing-api/reference/ad-image)"
            }
        },
        "ProductFeed_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductFeed, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductFeed",
                "!doc": "Return the next ProductFeed item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductFeed",
                "!doc": "Gets the current ProductFeed of the cursor"
            }
        },
        "ExternalEventSource_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ExternalEventSource, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ExternalEventSource",
                "!doc": "Return the next ExternalEventSource item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ExternalEventSource",
                "!doc": "Gets the current ExternalEventSource of the cursor"
            }
        },
        "ProductGroup_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductGroup, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductGroup",
                "!doc": "Return the next ProductGroup item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductGroup",
                "!doc": "Gets the current ProductGroup of the cursor"
            }
        },
        "ProductItem_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductItem, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductItem",
                "!doc": "Return the next ProductItem item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductItem",
                "!doc": "Gets the current ProductItem of the cursor"
            }
        },
        "Business_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Business, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Business",
                "!doc": "Return the next Business item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Business",
                "!doc": "Gets the current Business of the cursor"
            }
        },
        "ProductCatalog": {
            "update": {
                "!type": "fn(params: Object) -> +ProductCatalog",
                "!doc": "Update fields on the ProductCatalog"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the ProductCatalog"
            },
            "createProductFeeds": {
                "!type": "fn() -> +ProductFeed_cursor",
                "!doc": "A Product Feed"
            },
            "createProductSets": {
                "!type": "fn() -> +ProductSet_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "createExternalEventSources": {
                "!type": "fn() -> +ExternalEventSource_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "createProductGroups": {
                "!type": "fn() -> +ProductGroup_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Products that this product catalog contains"
            },
            "getProductSets": {
                "!type": "fn() -> +ProductSet_cursor",
                "!doc": "Product sets belonging to this catalog"
            },
            "createProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Create a product"
            },
            "getProductGroups": {
                "!type": "fn() -> +ProductGroup_cursor",
                "!doc": "Product groups that this product catalog contains"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "deleteExternalEventSources": {
                "!type": "fn() -> +ExternalEventSource_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getProductFeeds": {
                "!type": "fn() -> +ProductFeed_cursor",
                "!doc": "Product feeds belonging to this catalog"
            },
            "getBusinesss": {
                "!type": "fn() -> +Business_cursor",
                "!doc": "Agencies that have access to the product catalog"
            },
            "getExternalEventSources": {
                "!type": "fn() -> +ExternalEventSource_cursor",
                "!doc": "External Event Sources (including pixels) for catalog events like ViewContent"
            },
            "business": {
                "!type": "Business",
                "!doc": "Business that owns the product catalog"
            },
            "feed_count": {
                "!type": "number",
                "!doc": "The total number of feeds of this product catalog"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product catalog"
            },
            "name": {
                "!type": "string",
                "!doc": "The name given by the owner of this product catalog"
            },
            "product_count": {
                "!type": "number",
                "!doc": "The total number of products of this product catalog"
            }
        },
        "TargetingSentenceLine_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +TargetingSentenceLine, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +TargetingSentenceLine",
                "!doc": "Return the next TargetingSentenceLine item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +TargetingSentenceLine",
                "!doc": "Gets the current TargetingSentenceLine of the cursor"
            }
        },
        "CustomAudience_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +CustomAudience, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +CustomAudience",
                "!doc": "Return the next CustomAudience item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +CustomAudience",
                "!doc": "Gets the current CustomAudience of the cursor"
            }
        },
        "CustomAudiencesTOS_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +CustomAudiencesTOS, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +CustomAudiencesTOS",
                "!doc": "Return the next CustomAudiencesTOS item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +CustomAudiencesTOS",
                "!doc": "Gets the current CustomAudiencesTOS of the cursor"
            }
        },
        "PartnerCategory_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +PartnerCategory, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +PartnerCategory",
                "!doc": "Return the next PartnerCategory item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +PartnerCategory",
                "!doc": "Gets the current PartnerCategory of the cursor"
            }
        },
        "AdCampaignGroup_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdCampaignGroup, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdCampaignGroup",
                "!doc": "Return the next AdCampaignGroup item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdCampaignGroup",
                "!doc": "Gets the current AdCampaignGroup of the cursor"
            }
        },
        "AdAsyncRequestSet_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAsyncRequestSet, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAsyncRequestSet",
                "!doc": "Return the next AdAsyncRequestSet item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAsyncRequestSet",
                "!doc": "Gets the current AdAsyncRequestSet of the cursor"
            }
        },
        "AdsInsights_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdsInsights, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdsInsights",
                "!doc": "Return the next AdsInsights item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdsInsights",
                "!doc": "Gets the current AdsInsights of the cursor"
            }
        },
        "AdCampaign_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdCampaign, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdCampaign",
                "!doc": "Return the next AdCampaign item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdCampaign",
                "!doc": "Gets the current AdCampaign of the cursor"
            }
        },
        "AdPreview_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdPreview, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdPreview",
                "!doc": "Return the next AdPreview item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdPreview",
                "!doc": "Gets the current AdPreview of the cursor"
            }
        },
        "AdCreative_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdCreative, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdCreative",
                "!doc": "Return the next AdCreative item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdCreative",
                "!doc": "Gets the current AdCreative of the cursor"
            }
        },
        "AdImage_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdImage, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdImage",
                "!doc": "Return the next AdImage item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdImage",
                "!doc": "Gets the current AdImage of the cursor"
            }
        },
        "OffsitePixel_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +OffsitePixel, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +OffsitePixel",
                "!doc": "Return the next OffsitePixel item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +OffsitePixel",
                "!doc": "Gets the current OffsitePixel of the cursor"
            }
        },
        "AdPlacePageSet_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdPlacePageSet, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdPlacePageSet",
                "!doc": "Return the next AdPlacePageSet item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdPlacePageSet",
                "!doc": "Gets the current AdPlacePageSet of the cursor"
            }
        },
        "AdActivity_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdActivity, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdActivity",
                "!doc": "Return the next AdActivity item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdActivity",
                "!doc": "Gets the current AdActivity of the cursor"
            }
        },
        "LeadGenData_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +LeadGenData, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +LeadGenData",
                "!doc": "Return the next LeadGenData item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +LeadGenData",
                "!doc": "Gets the current LeadGenData of the cursor"
            }
        },
        "Transaction_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Transaction, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Transaction",
                "!doc": "Return the next Transaction item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Transaction",
                "!doc": "Gets the current Transaction of the cursor"
            }
        },
        "Adgroup_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Adgroup, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Adgroup",
                "!doc": "Return the next Adgroup item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Adgroup",
                "!doc": "Gets the current Adgroup of the cursor"
            }
        },
        "Returns the number of object received._cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Returns the number of object received., i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Returns the number of object received.",
                "!doc": "Return the next Returns the number of object received. item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Returns the number of object received.",
                "!doc": "Gets the current Returns the number of object received. of the cursor"
            }
        },
        "RateCard_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +RateCard, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +RateCard",
                "!doc": "Return the next RateCard item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +RateCard",
                "!doc": "Gets the current RateCard of the cursor"
            }
        },
        "ReachEstimate_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ReachEstimate, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ReachEstimate",
                "!doc": "Return the next ReachEstimate item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ReachEstimate",
                "!doc": "Gets the current ReachEstimate of the cursor"
            }
        },
        "Video_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Video, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Video",
                "!doc": "Return the next Video item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Video",
                "!doc": "Gets the current Video of the cursor"
            }
        },
        "AdsDataPartner_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdsDataPartner, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdsDataPartner",
                "!doc": "Return the next AdsDataPartner item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdsDataPartner",
                "!doc": "Gets the current AdsDataPartner of the cursor"
            }
        },
        "AdReportSchedule_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdReportSchedule, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdReportSchedule",
                "!doc": "Return the next AdReportSchedule item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdReportSchedule",
                "!doc": "Gets the current AdReportSchedule of the cursor"
            }
        },
        "AdAccountRoas_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccountRoas, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccountRoas",
                "!doc": "Return the next AdAccountRoas item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccountRoas",
                "!doc": "Gets the current AdAccountRoas of the cursor"
            }
        },
        "BroadTargetingCategories_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +BroadTargetingCategories, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +BroadTargetingCategories",
                "!doc": "Return the next BroadTargetingCategories item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +BroadTargetingCategories",
                "!doc": "Gets the current BroadTargetingCategories of the cursor"
            }
        },
        "AdAccountUser_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccountUser, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccountUser",
                "!doc": "Return the next AdAccountUser item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccountUser",
                "!doc": "Gets the current AdAccountUser of the cursor"
            }
        },
        "AdReportRun_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdReportRun, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdReportRun",
                "!doc": "Return the next AdReportRun item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdReportRun",
                "!doc": "Gets the current AdReportRun of the cursor"
            }
        },
        "MinimumBudget_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +MinimumBudget, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +MinimumBudget",
                "!doc": "Return the next MinimumBudget item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +MinimumBudget",
                "!doc": "Gets the current MinimumBudget of the cursor"
            }
        },
        "AdAccountRoasCohorts_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccountRoasCohorts, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccountRoasCohorts",
                "!doc": "Return the next AdAccountRoasCohorts item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccountRoasCohorts",
                "!doc": "Gets the current AdAccountRoasCohorts of the cursor"
            }
        },
        "AdLabel_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdLabel, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdLabel",
                "!doc": "Return the next AdLabel item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdLabel",
                "!doc": "Gets the current AdLabel of the cursor"
            }
        },
        "Application_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +Application, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +Application",
                "!doc": "Return the next Application item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +Application",
                "!doc": "Gets the current Application of the cursor"
            }
        },
        "AdAccountTargetingInsights_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccountTargetingInsights, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccountTargetingInsights",
                "!doc": "Return the next AdAccountTargetingInsights item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccountTargetingInsights",
                "!doc": "Gets the current AdAccountTargetingInsights of the cursor"
            }
        },
        "AdAccount": {
            "update": {
                "!type": "fn(params: Object) -> +AdAccount",
                "!doc": "Update fields on the AdAccount"
            },
            "getTargetingSentenceLines": {
                "!type": "fn() -> +TargetingSentenceLine_cursor",
                "!doc": "The targeting description sentence for a given target spec"
            },
            "createAdsPixels": {
                "!type": "fn() -> +AdsPixel_cursor",
                "!doc": "Edge to create an adspixel"
            },
            "createCustomAudiences": {
                "!type": "fn() -> +CustomAudience_cursor",
                "!doc": "Edge to create custom audiences"
            },
            "getCustomAudiencesTOSs": {
                "!type": "fn() -> +CustomAudiencesTOS_cursor",
                "!doc": "The custom audiences term of services signed by the ad account"
            },
            "getPartnerCategorys": {
                "!type": "fn() -> +PartnerCategory_cursor",
                "!doc": "Partner categories can be used for targeting"
            },
            "createAdCampaignGroups": {
                "!type": "fn() -> +AdCampaignGroup_cursor",
                "!doc": "A campaign"
            },
            "createAdAsyncRequestSets": {
                "!type": "fn() -> +AdAsyncRequestSet_cursor",
                "!doc": "To create an async ad request set"
            },
            "createAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Edge to create an async job for fetching ad insights for the\n      ad account node"
            },
            "createAdCampaigns": {
                "!type": "fn() -> +AdCampaign_cursor",
                "!doc": "An ad set"
            },
            "getAdPreviews": {
                "!type": "fn() -> +AdPreview_cursor",
                "!doc": "Generate previews for a creative specification"
            },
            "getReachFrequencyPredictions": {
                "!type": "fn() -> +ReachFrequencyPrediction_cursor",
                "!doc": "The reach and frequency predictions of this ad account"
            },
            "createAdCreatives": {
                "!type": "fn() -> +AdCreative_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "deleteAdImages": {
                "!type": "fn() -> +AdImage_cursor",
                "!doc": "To remove an ad image from your library"
            },
            "getAdsPixels": {
                "!type": "fn() -> +AdsPixel_cursor",
                "!doc": "The associated tracking pixels for this ad account"
            },
            "createOffsitePixels": {
                "!type": "fn() -> +OffsitePixel_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getCustomAudiences": {
                "!type": "fn() -> +CustomAudience_cursor",
                "!doc": "The custom audiences owned by/shared with this ad account"
            },
            "createAdPlacePageSets": {
                "!type": "fn() -> +AdPlacePageSet_cursor",
                "!doc": "Ad place page set for an ad account."
            },
            "getAdCampaigns": {
                "!type": "fn() -> +AdCampaign_cursor",
                "!doc": "Search ad sets associated with given labels within this ad account"
            },
            "getAdCreatives": {
                "!type": "fn() -> +AdCreative_cursor",
                "!doc": "Search creatives associated with given labels within this ad account"
            },
            "getAdActivitys": {
                "!type": "fn() -> +AdActivity_cursor",
                "!doc": "The activities of this ad account"
            },
            "getLeadGenDatas": {
                "!type": "fn() -> +LeadGenData_cursor",
                "!doc": "A list of lead generation forms created for this Ad Account."
            },
            "getTransactions": {
                "!type": "fn() -> +Transaction_cursor",
                "!doc": "The transactions of this ad account"
            },
            "getInstagramUsers": {
                "!type": "fn() -> +InstagramUser_cursor",
                "!doc": "Instagram accounts connected to the ad accounts"
            },
            "getAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "Search ads associated with given labels within this ad account"
            },
            "createReturns the number of object received.s": {
                "!type": "fn() -> +Returns the number of object received._cursor",
                "!doc": "Offline conversions for an ad account"
            },
            "getRateCards": {
                "!type": "fn() -> +RateCard_cursor",
                "!doc": "Rate card of an ad account"
            },
            "getOffsitePixels": {
                "!type": "fn() -> +OffsitePixel_cursor",
                "!doc": "Offsite pixels for this ad account"
            },
            "getAdPlacePageSets": {
                "!type": "fn() -> +AdPlacePageSet_cursor",
                "!doc": "The associated ad place page sets for this ad account"
            },
            "getReachEstimates": {
                "!type": "fn() -> +ReachEstimate_cursor",
                "!doc": "The reach estimate of a given\n        [targeting spec](/docs/marketing-api/targeting-specs) for this ad\n        account"
            },
            "getVideos": {
                "!type": "fn() -> +Video_cursor",
                "!doc": "The videos associated with this account"
            },
            "getAdsDataPartners": {
                "!type": "fn() -> +AdsDataPartner_cursor",
                "!doc": "The ad partners of this ad account"
            },
            "getAdReportSchedules": {
                "!type": "fn() -> +AdReportSchedule_cursor",
                "!doc": "All scheduled reports of this ad account"
            },
            "getAdAccountRoass": {
                "!type": "fn() -> +AdAccountRoas_cursor",
                "!doc": "The return on ad spend"
            },
            "getAdImages": {
                "!type": "fn() -> +AdImage_cursor",
                "!doc": "The images associated with this account"
            },
            "deleteAdCampaignGroups": {
                "!type": "fn() -> +AdCampaignGroup_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getBroadTargetingCategoriess": {
                "!type": "fn() -> +BroadTargetingCategories_cursor",
                "!doc": "Broad targeting categories (BCTs) can be used for targeting "
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "createAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "An ad"
            },
            "getAdAccountUsers": {
                "!type": "fn() -> +AdAccountUser_cursor",
                "!doc": "Container for the user ID, permissions, and role"
            },
            "createVideos": {
                "!type": "fn() -> +Video_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getAdReportRuns": {
                "!type": "fn() -> +AdReportRun_cursor",
                "!doc": "All bookmarked async runs of this ad account"
            },
            "getMinimumBudgets": {
                "!type": "fn() -> +MinimumBudget_cursor",
                "!doc": "Returns minimum daily budget values by currency."
            },
            "createAdImages": {
                "!type": "fn() -> +AdImage_cursor",
                "!doc": "You can upload an image or zip file, get back a hash, and use the hash in an ad group or creative. You must include an extension with your filename, e.g. \"sample.jpg\" and not just \"sample\" or \"sample.tmp\", etc."
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getAdAccountRoasCohortss": {
                "!type": "fn() -> +AdAccountRoasCohorts_cursor",
                "!doc": "The return on ad spend for cohorts"
            },
            "getAdLabels": {
                "!type": "fn() -> +AdLabel_cursor",
                "!doc": "The labels associated with this ad account"
            },
            "getApplications": {
                "!type": "fn() -> +Application_cursor",
                "!doc": "Applications connected to the ad accounts"
            },
            "getAdAccountTargetingInsightss": {
                "!type": "fn() -> +AdAccountTargetingInsights_cursor",
                "!doc": "Targeting insights based on ad performacne analysis\n        from past and current campaigns"
            },
            "getAdCampaignGroups": {
                "!type": "fn() -> +AdCampaignGroup_cursor",
                "!doc": "Search campaigns associated with given labels within this ad account"
            },
            "getAdAsyncRequestSets": {
                "!type": "fn() -> +AdAsyncRequestSet_cursor",
                "!doc": "The async ad request sets associated with this account"
            },
            "createAdLabels": {
                "!type": "fn() -> +AdLabel_cursor",
                "!doc": "AdLabel for an ad account."
            },
            "getAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Insights on advertising performance of this ad account"
            },
            "createReachFrequencyPredictions": {
                "!type": "fn() -> +ReachFrequencyPrediction_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "media_agency": {
                "!type": "string",
                "!doc": "The ID of a Facebook Page or Facebook Application"
            },
            "agency_client_declaration": {
                "!type": "AgencyClientDeclaration",
                "!doc": "Details of the agency advertising on behalf of this client account, if applicable"
            },
            "funding_source_details": {
                "!type": "FundingSourceDetails",
                "!doc": "`ID` = ID of the payment method<br>`COUPON` = Details of the Facebook Ads Coupon from the payment method<br>`AMOUNT` = Amount of Facebook Ads Coupon<br>`CURRENCY` = Currency of the Facebook Ads Coupon<br>`DISPLAY_AMOUNT` = How the amount of Facebook Ads Coupon is displayed<br>`EXPIRATION` = When the coupon will expire<br>`DISPLAY_STRING` = How the payment method is shown<br>`TYPE` = Type of the funding source"
            },
            "business": {
                "!type": "Business",
                "!doc": "The [Business Manager](/docs/marketing-api/businessmanager), if this ad account is owned by one."
            },
            "can_create_brand_lift_study": {
                "!type": "bool",
                "!doc": "If we can create a new automated brand lift study under the ad account."
            },
            "timezone_id": {
                "!type": "number",
                "!doc": "The [timezone ID](/docs/marketing-api/reference/ad-account/timezone-ids) of this ad account. "
            },
            "tax_id_status": {
                "!type": "number",
                "!doc": "VAT status code for the account.<br>0: Unknown<br>1: VAT not required- US/CA<br>2: VAT information required<br>3: VAT information submitted<br>4: Offline VAT validation failed<br>5: Account is a personal account"
            },
            "io_number": {
                "!type": "string",
                "!doc": "The IO number"
            },
            "business_street": {
                "!type": "string",
                "!doc": "First line of the business street address for the account"
            },
            "business_zip": {
                "!type": "string",
                "!doc": "Zip code for business address"
            },
            "asset_score": {
                "!type": "number",
                "!doc": "relevance score of an asset"
            },
            "has_migrated_permissions": {
                "!type": "bool",
                "!doc": "Whether this account has migrated permissions"
            },
            "created_time": {
                "!type": "string",
                "!doc": "The time the account was created in ISO 8601 format."
            },
            "account_status": {
                "!type": "number",
                "!doc": "Status of the account <br>`1 = ACTIVE`<br>`2 = DISABLED`<br>`3 = UNSETTLED`<br>`7 = PENDING_RISK_REVIEW`<br>`9 = IN_GRACE_PERIOD`<br>`100 = PENDING_CLOSURE`<br>`101 = CLOSED`<br>`102 = PENDING_SETTLEMENT`<br>`201 = ANY_ACTIVE`<br>`202 = ANY_CLOSED`<br>"
            },
            "account_groups": {
                "!type": "list<AdAccountGroupResult>",
                "!doc": "Container for the ID, name, and status of the ad account groups which contain this account"
            },
            "rf_spec": {
                "!type": "ReachFrequencySpec",
                "!doc": "Reach and Frequency limits configuration. [See Reach and Frequency](/docs/marketing-api/reachandfrequency)"
            },
            "last_used_time": {
                "!type": "string",
                "!doc": "last used time of this object by the current viewer"
            },
            "amount_spent": {
                "!type": "string",
                "!doc": "Current total amount spent by the account. This can be reset."
            },
            "partner": {
                "!type": "string",
                "!doc": "The ID of a Facebook Page or Facebook App"
            },
            "is_prepay_account": {
                "!type": "bool",
                "!doc": "If this ad account is a prepay or postpay account"
            },
            "user_role": {
                "!type": "string",
                "!doc": "Role ID of the user"
            },
            "business_city": {
                "!type": "string",
                "!doc": "City for business address"
            },
            "tax_id_type": {
                "!type": "string",
                "!doc": "Type of Tax ID"
            },
            "business_name": {
                "!type": "string",
                "!doc": "The business name for the account"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the account. If the account name is not set, the name of the first admin visible to the user will be returned"
            },
            "owner_business": {
                "!type": "Business",
                "!doc": "owner business of this object"
            },
            "account_id": {
                "!type": "string",
                "!doc": "The ID of the ad account"
            },
            "tos_accepted": {
                "!type": "map<string, int>",
                "!doc": "IDs of Terms of Service contracts signed"
            },
            "timezone_offset_hours_utc": {
                "!type": "number",
                "!doc": "Time Zone difference from UTC"
            },
            "tax_id": {
                "!type": "string",
                "!doc": "Tax ID"
            },
            "end_advertiser": {
                "!type": "string",
                "!doc": "The ID of a Facebook Page or Facebook App"
            },
            "min_campaign_group_spend_cap": {
                "!type": "string",
                "!doc": "The minimum required spend cap of campaign group"
            },
            "business_street2": {
                "!type": "string",
                "!doc": "Second line of the business street address for the account"
            },
            "currency": {
                "!type": "string",
                "!doc": "The currency used for the account, based on the corresponding value in the account settings. See [supported currencies](/docs/marketing-api/currencies)"
            },
            "spend_cap": {
                "!type": "string",
                "!doc": "The maximum that can be spent by this account after which campaigns will be paused. A value of 0 signifies no spending-cap and setting a new spend cap only applies to spend AFTER the time at which you set it. Value specified in basic unit of the currency, e.g. cents for USD."
            },
            "stored_balance_status": {
                "!type": "AdAccount_stored_balance_status",
                "!doc": "Stored balance status for the ad account.<br>prepay: advertisers pay in advance of ad delivery using a stored balance<br>postpay: advertisers pay after ad delivery and do not use a stored balance<br>new_user: account has no payment method added yet"
            },
            "timezone_name": {
                "!type": "string",
                "!doc": "Name for the time zone"
            },
            "business_state": {
                "!type": "string",
                "!doc": "State abbreviation for business address"
            },
            "owner": {
                "!type": "string",
                "!doc": "The ID of the account owner"
            },
            "vertical_name": {
                "!type": "string",
                "!doc": "Vertical name"
            },
            "failed_delivery_checks": {
                "!type": "list<DeliveryCheck>",
                "!doc": "Failed delivery checks"
            },
            "is_notifications_enabled": {
                "!type": "bool",
                "!doc": "Get the notifications status of the user for this ad account. This will return true or false depending if notifications are enabled or not."
            },
            "is_personal": {
                "!type": "number",
                "!doc": "Indicates that this ad account is being used for private, non-business purposes which affects how value added tax (VAT) is assessed."
            },
            "business_country_code": {
                "!type": "string",
                "!doc": "Country code for the business address"
            },
            "capabilities": {
                "!type": "list<string>",
                "!doc": "See [capabilities](/docs/marketing-api/reference/ad-account/capabilities)"
            },
            "offsite_pixels_tos_accepted": {
                "!type": "bool",
                "!doc": "Indicates whether the offsite pixel Terms Of Service contract was signed. More details on offsite-pixels can be found [here](/docs/marketing-api/reference/offsite-pixel)"
            },
            "min_daily_budget": {
                "!type": "number",
                "!doc": "The minimum daily budget for this ad account"
            },
            "is_tax_id_required": {
                "!type": "bool",
                "!doc": "If tax id for this ad account is required or not"
            },
            "id": {
                "!type": "string",
                "!doc": "The string `act_{ad_account_id}`"
            },
            "end_advertiser_name": {
                "!type": "string",
                "!doc": "The name of a Facebook Page or Facebook App"
            },
            "disable_reason": {
                "!type": "number",
                "!doc": "The reason why the account was disabled. Possible reasons are:<br>`0 = NONE`<br>`1 = ADS_INTEGRITY_POLICY`<br>`2 = ADS_IP_REVIEW`<br>`3 = RISK_PAYMENT`<br>`4 = GRAY_ACCOUNT_SHUT_DOWN`<br>`5 = ADS_AFC_REVIEW`<br>"
            },
            "balance": {
                "!type": "string",
                "!doc": "Bill amount due"
            },
            "funding_source": {
                "!type": "string",
                "!doc": "ID of the payment method. If the account does not have a payment method it will still be possible to create ads but these ads will get no delivery."
            },
            "line_numbers": {
                "!type": "list<int>",
                "!doc": "The line numbers"
            },
            "age": {
                "!type": "number",
                "!doc": "Amount of time the ad account has been open, in days"
            }
        },
        "FundingSourceDetails": {
            "coupon": {
                "!type": "FundingSourceDetailsCoupon",
                "!doc": "Coupon"
            },
            "display_string": {
                "!type": "string",
                "!doc": "Display string"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the funding source"
            },
            "type": {
                "!type": "number",
                "!doc": "Type of the funding source"
            }
        },
        "DeliveryCheckExtraInfo": {
            "adgroup_ids": {
                "!type": "list<string>",
                "!doc": "The IDs of the adgroups this adgroup is competing with."
            },
            "campaign_ids": {
                "!type": "list<string>",
                "!doc": "The IDs of the competing campaigns under the account."
            },
            "countries": {
                "!type": "list<string>",
                "!doc": "The countries that conflict between page gating and ad targeting."
            }
        },
        "ExternalEventSource": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the object"
            },
            "source_type": {
                "!type": "ExternalEventSource_source_type",
                "!doc": "Type of the source object"
            }
        },
        "TargetingDynamicRule": {
            "action.type": {
                "!type": "string",
                "!doc": "Type of the dynamic rule"
            },
            "ad_group_id": {
                "!type": "string",
                "!doc": "Ad ID"
            },
            "campaign_group_id": {
                "!type": "string",
                "!doc": "Ad campaign group ID"
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "Ad campaign ID"
            },
            "impression_count": {
                "!type": "string",
                "!doc": "Impression count of a give ad/campaign/campaign group"
            },
            "page_id": {
                "!type": "string",
                "!doc": "Page ID, used in certain types of engagement specs"
            },
            "post": {
                "!type": "string",
                "!doc": "Video ID of the dynamic rule is targeting to"
            },
            "retention_seconds": {
                "!type": "string",
                "!doc": "Retention time period, in seconds"
            }
        },
        "AgencyClientDeclaration": {
            "client_province": {
                "!type": "string",
                "!doc": "Client's province"
            },
            "client_country_code": {
                "!type": "string",
                "!doc": "Client's country code"
            },
            "is_client_paying_invoices": {
                "!type": "number",
                "!doc": "Whether the client is paying via invoice"
            },
            "client_postal_code": {
                "!type": "string",
                "!doc": "Client's postal code"
            },
            "client_based_in_france": {
                "!type": "number",
                "!doc": "Whether the client is based in France"
            },
            "agency_representing_client": {
                "!type": "number",
                "!doc": "Whether this account is for an agency representing a client"
            },
            "client_street": {
                "!type": "string",
                "!doc": "First line of client's street address"
            },
            "client_street2": {
                "!type": "string",
                "!doc": "Second line of client's street address"
            },
            "has_written_mandate_from_advertiser": {
                "!type": "number",
                "!doc": "Whether the agency has a written mandate to advertise on behalf of this client"
            },
            "client_email_address": {
                "!type": "string",
                "!doc": "Client's email address"
            },
            "client_city": {
                "!type": "string",
                "!doc": "Client's city"
            },
            "client_name": {
                "!type": "string",
                "!doc": "Name of the client"
            }
        },
        "AdsInsights": {
            "cpm": {
                "!type": "number",
                "!doc": "The average cost you've paid to have 1,000 impressions on your ad."
            },
            "video_30_sec_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "This shows the number of total views of at least 30 seconds or to the end of your video, whichever occurs first."
            },
            "ctr": {
                "!type": "number",
                "!doc": "The number of clicks you received divided by the number of impressions."
            },
            "social_reach": {
                "!type": "number",
                "!doc": "The number of people your ad was served to with social information. For example, if 3 people see an ad 2 times each that says a friend likes your Page, it counts as 3 social reaches."
            },
            "gender": {
                "!type": "string",
                "!doc": "Gender of people you've reached. People who don't list their gender are shown as 'not specified'."
            },
            "video_10_sec_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "This shows the number of total views of at least 10 seconds or to the end of your video, whichever occurs first."
            },
            "total_actions": {
                "!type": "number",
                "!doc": "The number of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Actions include Page likes, app installs, conversions, event responses and more. For example, 2 Page likes and 2 comments would be counted as 4 actions."
            },
            "place_page_name": {
                "!type": "string",
                "!doc": "The name of the place page involved in impression, click or action. Has to be used together with Business Locations breakdown."
            },
            "cost_per_10_sec_video_view": {
                "!type": "list<AdsActionStats>",
                "!doc": "The average cost per 10-second video view, calculated as the amount spent divided by the number of 10-second video views."
            },
            "cpp": {
                "!type": "number",
                "!doc": "The average cost you've paid to have your ad served to 1,000 unique people."
            },
            "total_action_value": {
                "!type": "number",
                "!doc": "The total revenue returned from conversions or Facebook credit spends that occurred on your website or app."
            },
            "unique_link_clicks_ctr": {
                "!type": "number",
                "!doc": "Unique click-through rate for clicks to link. The number of people who clicked on the link in your ad that directs people off Facebook divided by the number of people you reached. Example: if you received 20 unique clicks to link and your ad was shown to 1,000 unique people, your unique click-through rate would be 2%."
            },
            "newsfeed_avg_position": {
                "!type": "number",
                "!doc": "The average position where your ad was inserted into people's news feeds on mobile and desktop. Position 1 is the one at the top of the feed."
            },
            "deeplink_clicks": {
                "!type": "number",
                "!doc": "The numbers of clicks that go to app after user clicks your ads"
            },
            "cost_per_total_action": {
                "!type": "number",
                "!doc": "The average you've spent on actions. For example, if you spent $20 and you got 10 Page likes, each one cost an average of $2."
            },
            "placement": {
                "!type": "string",
                "!doc": "Where your ad was served on Facebook, for example on Newsfeed on a mobile device."
            },
            "hourly_stats_aggregated_by_advertiser_time_zone": {
                "!type": "string",
                "!doc": "Hourly breakdown aggregated by the time ads were delivered in the advertiser's time zone. For example, if your ads are scheduled to run from 9 AM to 11 AM, but they reach audiences in multiple time zones, they may deliver from 9 AM to 1 PM in the advertiser's time zone. Stats will be aggregated into four groups 9 AM - 10 AM, 10 AM - 11 AM, 11 AM - 12 PM, and 12 PM - 1 PM."
            },
            "unique_social_impressions": {
                "!type": "number",
                "!doc": "The number of people the ad was served to with social context."
            },
            "video_15_sec_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed more than 15 seconds, including views that skipped to this point."
            },
            "ad_name": {
                "!type": "string",
                "!doc": "An individual ad includes its creative (ex: the image and text it uses) and the specific audience it targets."
            },
            "app_store_clicks": {
                "!type": "number",
                "!doc": "The numbers of clicks that go to app store after user clicks your ads"
            },
            "cost_per_unique_action_type": {
                "!type": "list<AdsActionStats>",
                "!doc": "The average you paid for each type of unique action."
            },
            "total_unique_actions": {
                "!type": "number",
                "!doc": "The number of unique people who took an action such as liking your Page  or installing your app as a result of your ad. For example, if the  same person likes and comments on a post, they will be counted  as 1 unique person."
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "ID number that is unique to each campaign."
            },
            "inline_link_clicks": {
                "!type": "number",
                "!doc": "The number of inline link clicks that your ad got"
            },
            "impressions": {
                "!type": "string",
                "!doc": "The number of times your ad was served. On our mobile apps an ad is counted as served the first time it's viewed. On all other Facebook interfaces, an ad is served the first time it's placed in a person's News Feed or each time it's placed in the right column."
            },
            "video_complete_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "This shows the number of total views of at least 30 seconds or to the end of your video, whichever occurs first."
            },
            "adset_name": {
                "!type": "string",
                "!doc": "A group of ads that share the same budget and are usually about a single topic."
            },
            "product_id": {
                "!type": "string",
                "!doc": "The id and name of the product involved in impression, click or action."
            },
            "inline_link_click_ctr": {
                "!type": "number",
                "!doc": "Click-through rate for inline clicks to link."
            },
            "action_values": {
                "!type": "list<AdsActionStats>",
                "!doc": "The total revenue returned from conversions or Facebook credit spends that occurred on your website or app."
            },
            "clicks": {
                "!type": "number",
                "!doc": "The total number of clicks on your ad. Depending on what you're promoting, this can include Page likes, event responses or app installs."
            },
            "cost_per_inline_post_engagement": {
                "!type": "number",
                "!doc": "The average you paid for each inline post engagement"
            },
            "impression_device": {
                "!type": "string",
                "!doc": "The device where your last ad was served to someone on Facebook. For example \"iPhone\" if someone viewed your ad on an iPhone."
            },
            "social_spend": {
                "!type": "number",
                "!doc": "The total amount you've spent so far for your ads showed with social information. (ex: Jane Doe likes this)."
            },
            "relevance_score": {
                "!type": "AdgroupRelevanceScore",
                "!doc": "Ad relevance score is multiple metrics related to how your audience responded to your ad. Only available at ad level and will not be returned for aggregations at other levels."
            },
            "account_id": {
                "!type": "string",
                "!doc": "ID number that is unique to your ad account."
            },
            "video_avg_sec_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The average length of time people spent viewing your video. This is the total video watch time for your video divided by the total number of times your video was played."
            },
            "frequency_value": {
                "!type": "string",
                "!doc": "The number of times an ad in your Reach and Frequency campaign was served to each person."
            },
            "cost_per_unique_click": {
                "!type": "number",
                "!doc": "The average cost per unique click for these ads, calculated as the amount spent divided by the number of unique clicks received."
            },
            "website_clicks": {
                "!type": "number",
                "!doc": "The numbers of clicks that go to web after user clicks your ads"
            },
            "unique_social_clicks": {
                "!type": "number",
                "!doc": "The number of individuals who clicked this ad while it had social context."
            },
            "cost_per_unique_inline_link_click": {
                "!type": "number",
                "!doc": "The average you paid for each unique inline link click"
            },
            "unique_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Actions include Page likes, app installs, conversions, event responses and more. For example, 2 Page likes and 2 comments would be counted as 4 actions."
            },
            "cost_per_action_type": {
                "!type": "list<AdsActionStats>",
                "!doc": "The average you've spent on actions. For example, if you spent $20 and you got 10 Page likes, each one cost an average of $2."
            },
            "cost_per_estimated_ad_recallers": {
                "!type": "number",
                "!doc": "The average cost per additional person we estimate will recall seeing your ad if asked within 2 days. Available for ad accounts with `CAN_CREATE_BRAND_AWARENESS _OBJECTIVE_ADS` capability"
            },
            "date_start": {
                "!type": "string",
                "!doc": "The start date for your data."
            },
            "call_to_action_clicks": {
                "!type": "number",
                "!doc": "The number of clicks on the call to action button your ad receives."
            },
            "video_p100_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed to 100% of its length, including views that skipped to this point."
            },
            "canvas_avg_view_time": {
                "!type": "number",
                "!doc": "The average time spent in seconds, within a Canvas unit"
            },
            "unique_ctr": {
                "!type": "number",
                "!doc": "The number of people who clicked on your ad divided by the number of people you reached. For example, if you received 20 unique clicks and your ad was served to 1,000 unique people, your unique click-through rate would be 2%."
            },
            "reach": {
                "!type": "number",
                "!doc": "The number of people your ad was served to."
            },
            "place_page_id": {
                "!type": "string",
                "!doc": "The id of the place page involved in impression, click or action."
            },
            "date_stop": {
                "!type": "string",
                "!doc": "The end date for your data."
            },
            "video_p50_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed to 50% of its length, including views that skipped to this point."
            },
            "region": {
                "!type": "string",
                "!doc": "The regions where the people you've reached are located. This is based on information such as a person's hometown, their current city and the geographical location where they tend to be when they visit Facebook."
            },
            "cost_per_inline_link_click": {
                "!type": "number",
                "!doc": "The average you paid for each inline link click"
            },
            "estimated_ad_recall_rate": {
                "!type": "number",
                "!doc": "The estimated number of people who recall your ad divided by the number of people your ad reached. Available for ad accounts with `CAN_CREATE_BRAND_AWARENESS _OBJECTIVE_ADS` capability"
            },
            "video_p95_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed to 95% of its length, including views that skipped to this point."
            },
            "cpc": {
                "!type": "number",
                "!doc": "The average cost per click for these ads, calculated as the amount spent divided by the number of clicks received."
            },
            "country": {
                "!type": "string",
                "!doc": "The countries where the people you've reached are located. This is based on information such as a person's hometown, their current city and the geographical location where they tend to be when they visit Facebook."
            },
            "ad_id": {
                "!type": "string",
                "!doc": "ID number that is unique to each ad."
            },
            "video_p75_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed to 75% of its length, including views that skipped to this point."
            },
            "social_impressions": {
                "!type": "Object",
                "!doc": "The number of times your ad was served, with social information. For example, if 3 people are served an ad 2 times each and it includes information about a friend liking your Page, it counts as 6 social impressions."
            },
            "unique_inline_link_clicks": {
                "!type": "number",
                "!doc": "The number of unique inline link clicks that your ad got"
            },
            "inline_post_engagement": {
                "!type": "number",
                "!doc": "The number of inline post engagement that your ad got"
            },
            "unique_clicks": {
                "!type": "number",
                "!doc": "The total number of unique people who have clicked on your ad. For example, if 3 people click on the same ad 5 times, it will count as 3 unique clicks."
            },
            "newsfeed_clicks": {
                "!type": "number",
                "!doc": "The total number of clicks your ad received in people's news feed, on mobile and desktop."
            },
            "objective": {
                "!type": "string",
                "!doc": "The objective you selected for your ad, ad set, or campaign. Your objective reflects what you want to achieve with ads."
            },
            "campaign_name": {
                "!type": "string",
                "!doc": "A group of ad sets that share the same objective."
            },
            "adset_id": {
                "!type": "string",
                "!doc": "ID number that is unique to each ad set."
            },
            "video_p25_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of times your video was viewed to 25% of its length, including views that skipped to this point."
            },
            "unique_impressions": {
                "!type": "number",
                "!doc": "The number of individuals the ad was served to on the site."
            },
            "frequency": {
                "!type": "number",
                "!doc": "The average number of times your ad was served to each person."
            },
            "estimated_ad_recallers": {
                "!type": "number",
                "!doc": "The additional number of people we estimate will remember seeing your ads if asked within 2 days. Available for ad accounts with `CAN_CREATE_BRAND_AWARENESS _OBJECTIVE_ADS` capability"
            },
            "newsfeed_impressions": {
                "!type": "number",
                "!doc": "The total number of times your ad was inserted into people's news feeds, on mobile and desktop."
            },
            "website_ctr": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of link clicks a product received divided by the number of impressions of the product, only applicable for multi-product ads."
            },
            "social_clicks": {
                "!type": "number",
                "!doc": "The number of clicks your ad receives when it's shown with social information (ex: Jane Doe likes this)."
            },
            "actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Actions include Page likes, app installs, conversions, event responses and more. For example, 2 Page likes and 2 comments would be counted as 4 actions."
            },
            "unique_inline_link_click_ctr": {
                "!type": "number",
                "!doc": "Click-through rate for unique inline clicks to link."
            },
            "account_name": {
                "!type": "string",
                "!doc": "The grouping of all your specific ads activity. Your ad account includes different campaigns, ads and billing information."
            },
            "buying_type": {
                "!type": "string",
                "!doc": "The method by which you pay for and target ads in your campaigns: through dynamic auction bidding, fixed-price bidding, or reach and frequency buying."
            },
            "video_avg_pct_watched_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The average percentage of your video that people viewed. This is the total video watch percentage for your video divided by the total number of times your video was played."
            },
            "spend": {
                "!type": "number",
                "!doc": "The total amount you've spent so far."
            },
            "canvas_avg_view_percent": {
                "!type": "number",
                "!doc": "The average percentage of the Canvas seen"
            },
            "age": {
                "!type": "string",
                "!doc": "The age range of the people you've reached."
            },
            "hourly_stats_aggregated_by_audience_time_zone": {
                "!type": "string",
                "!doc": "Hourly breakdown aggregated by the time ads were delivered in the audiences' time zone. For example, if your ads are scheduled to run from 9 AM to 11 AM but they reach audiences in multiple time zones, they may deliver from 9 AM to 1 PM in the advertiser's time zone. Stats will be aggregated into two groups 9 AM - 10 AM and 10 AM - 11 AM."
            }
        },
        "CustomAudienceCapabilities": {
            "capabilities": {
                "!type": "map",
                "!doc": "List of capabilities for each legacy ad account"
            }
        },
        "BroadTargetingCategories": {
            "size": {
                "!type": "number",
                "!doc": "Estimated reach for the broad targeting category"
            },
            "path": {
                "!type": "list<string>",
                "!doc": "Path to the category"
            },
            "name": {
                "!type": "string",
                "!doc": "Broad Targeting Category name"
            },
            "type_name": {
                "!type": "string",
                "!doc": "Descriptive name for the type of the category"
            },
            "untranslated_parent_name": {
                "!type": "string",
                "!doc": "English name of the category's parent"
            },
            "parent_category": {
                "!type": "string",
                "!doc": "The parent of the Broad Targeting Category"
            },
            "type": {
                "!type": "number",
                "!doc": "Type of the broad targeting category"
            },
            "source": {
                "!type": "string",
                "!doc": "Source of the broad targeting category"
            },
            "untranslated_name": {
                "!type": "string",
                "!doc": "English name of the category"
            },
            "id": {
                "!type": "string",
                "!doc": "Broad Targeting Category ID"
            },
            "category_description": {
                "!type": "string",
                "!doc": "Broad Targeting Category description"
            }
        },
        "AdAsyncRequest_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAsyncRequest, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAsyncRequest",
                "!doc": "Return the next AdAsyncRequest item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAsyncRequest",
                "!doc": "Gets the current AdAsyncRequest of the cursor"
            }
        },
        "AdAsyncRequestSet": {
            "getAdAsyncRequests": {
                "!type": "fn() -> +AdAsyncRequest_cursor",
                "!doc": "Requests that belongs to this set"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Time when this async request time was created"
            },
            "notification_status": {
                "!type": "AdAsyncRequestSet_notification_status",
                "!doc": "Status of the notification"
            },
            "owner_id": {
                "!type": "string",
                "!doc": "ID of the object which owns this async request set"
            },
            "canceled_count": {
                "!type": "number",
                "!doc": "The number of requests that were canceled by user"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of this async request set"
            },
            "notification_result": {
                "!type": "AdAsyncRequestSetNotificationResult",
                "!doc": "The result of the notification sending"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "The latest time this async request was updated"
            },
            "success_count": {
                "!type": "number",
                "!doc": "The number of finished requests that succeed"
            },
            "initial_count": {
                "!type": "number",
                "!doc": "The number of requests that have not been served yet"
            },
            "total_count": {
                "!type": "number",
                "!doc": "The total number of requests in this set"
            },
            "is_completed": {
                "!type": "bool",
                "!doc": "Whether all async requests in this set were completed"
            },
            "notification_mode": {
                "!type": "AdAsyncRequestSet_notification_mode",
                "!doc": "Different way to receive notification. E.g. OFF(no need to send notification) or ON_COMPLETE(send notification when whole set is done)"
            },
            "in_progress_count": {
                "!type": "number",
                "!doc": "The number of requests that are in progress"
            },
            "notification_uri": {
                "!type": "string",
                "!doc": "The uri that this async request set will call when completed"
            },
            "error_count": {
                "!type": "number",
                "!doc": "The number of finished requests that failed"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this async request set"
            }
        },
        "AndroidAppLink": {
            "app_name": {
                "!type": "string",
                "!doc": "The native apps name in the Android store."
            },
            "class": {
                "!type": "string",
                "!doc": "The fully classified class name of the app for intent generation."
            },
            "package": {
                "!type": "string",
                "!doc": "The fully classified package name of the app for intent generation."
            },
            "url": {
                "!type": "string",
                "!doc": "The native Android URL that will be navigated to."
            }
        },
        "TargetingGeoLocationZip": {
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            },
            "primary_city_id": {
                "!type": "number",
                "!doc": "City ID"
            },
            "region_id": {
                "!type": "number",
                "!doc": "Region ID"
            }
        },
        "RoasCohortsPerCohortIntervalUnit": {
            "interval_start": {
                "!type": "string",
                "!doc": "Timestamp for start of that collation interval"
            },
            "revenue": {
                "!type": "number",
                "!doc": "Revenue for single cohort's collation interval in USD"
            }
        },
        "AdCampaignGroup": {
            "update": {
                "!type": "fn(params: Object) -> +AdCampaignGroup",
                "!doc": "Update fields on the AdCampaignGroup"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the AdCampaignGroup"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Disassociates a set of labels from a campaign"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Associates a set of labels with a campaign"
            },
            "getAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "Ads under this campaign"
            },
            "getAdCampaigns": {
                "!type": "fn() -> +AdCampaign_cursor",
                "!doc": "The ad sets under this campaign"
            },
            "getAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Insights on advertising performance of this campaign"
            },
            "createAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Edge to create an async job for fetching ad insights for campaigns"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "adlabels": {
                "!type": "list<AdLabel>",
                "!doc": "Ad Labels associated with this campaign"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Created Time"
            },
            "start_time": {
                "!type": "string",
                "!doc": "Start Time"
            },
            "stop_time": {
                "!type": "string",
                "!doc": "Stop Time"
            },
            "effective_status": {
                "!type": "AdCampaignGroup_effective_status",
                "!doc": "The effective status of this campaign."
            },
            "can_use_spend_cap": {
                "!type": "bool",
                "!doc": "Whether the campaign can set the spend cap"
            },
            "name": {
                "!type": "string",
                "!doc": "Campaign's name"
            },
            "account_id": {
                "!type": "string",
                "!doc": "ID of the ad account that owns this campaign"
            },
            "spend_cap": {
                "!type": "string",
                "!doc": "A spend cap for the campaign, such that it will not spend more than this cap. Expressed as integer value of the subunit in your currency."
            },
            "updated_time": {
                "!type": "string",
                "!doc": "Updated Time"
            },
            "status": {
                "!type": "AdCampaignGroup_status",
                "!doc": "If this status is `PAUSED`, all its active ad sets and ads will\n        be paused and have an effective status `CAMPAIGN_PAUSED`. The field\n        returns the same value as 'configured_status', and is the suggested\n        one to use."
            },
            "configured_status": {
                "!type": "AdCampaignGroup_configured_status",
                "!doc": "If this status is `PAUSED`, all its active ad sets and ads will\n        be paused and have an effective status `CAMPAIGN_PAUSED`. Prefer\n        using 'status' instead of this."
            },
            "objective": {
                "!type": "string",
                "!doc": "Campaign's objective"
            },
            "recommendations": {
                "!type": "list<AdRecommendation>",
                "!doc": "If there are recommendations for this campaign, this field includes them. Otherwise, this field will be null."
            },
            "id": {
                "!type": "string",
                "!doc": "Campaign's ID"
            },
            "buying_type": {
                "!type": "string",
                "!doc": "Buying type, possible values are: <br>`AUCTION`: default<br>`RESERVED`: for [reach and frequency ads](/docs/marketing-api/reachandfrequency)"
            }
        },
        "ProductFeedUpload_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductFeedUpload, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductFeedUpload",
                "!doc": "Return the next ProductFeedUpload item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductFeedUpload",
                "!doc": "Gets the current ProductFeedUpload of the cursor"
            }
        },
        "ProductFeed": {
            "update": {
                "!type": "fn(params: Object) -> +ProductFeed",
                "!doc": "Update fields on the ProductFeed"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the ProductFeed"
            },
            "getProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Products in the product feed"
            },
            "getProductFeedUploads": {
                "!type": "fn() -> +ProductFeedUpload_cursor",
                "!doc": "Concrete upload attempts"
            },
            "createProductFeedUploads": {
                "!type": "fn() -> +ProductFeedUpload_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Creation time of the product feed"
            },
            "delimiter": {
                "!type": "ProductFeed_delimiter",
                "!doc": "The delimiter used in product feed file"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the product feed"
            },
            "file_name": {
                "!type": "string",
                "!doc": "File name of the product feed. Will be overridden by `name` if present"
            },
            "deletion_enabled": {
                "!type": "bool",
                "!doc": "Allows products to be deleted if they are no longer included\n         in a product feed"
            },
            "quoted_fields_mode": {
                "!type": "ProductFeed_quoted_fields_mode",
                "!doc": "Allows tabs and newlines within fields"
            },
            "encoding": {
                "!type": "ProductFeed_encoding",
                "!doc": "The character encoding used by provided feed"
            },
            "country": {
                "!type": "string",
                "!doc": "An ISO 3166-1 Alpha 2 country code"
            },
            "schedule": {
                "!type": "ProductFeedSchedule",
                "!doc": "The configuration for fetching a feed in a recurrant manner"
            },
            "latest_upload": {
                "!type": "ProductFeedUpload",
                "!doc": "The latest upload session of the product feed"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product feed"
            },
            "product_count": {
                "!type": "number",
                "!doc": "The total products of this product catalog"
            }
        },
        "IosAppLink": {
            "app_name": {
                "!type": "string",
                "!doc": "The native apps name in the iTunes store."
            },
            "app_store_id": {
                "!type": "string",
                "!doc": "The native apps ID in the iTunes store."
            },
            "url": {
                "!type": "string",
                "!doc": "The native iOS URL that will be navigated to."
            }
        },
        "RevSharePolicy": {
            "policy_id": {
                "!type": "string",
                "!doc": "Rev Share Policy ID"
            },
            "policy_name": {
                "!type": "string",
                "!doc": "Rev Share Policy Name"
            }
        },
        "AdsDataPartner": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this partner"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of this partner"
            },
            "rev_share_policies": {
                "!type": "list<RevSharePolicy>",
                "!doc": "Revenue share policies of this partner"
            }
        },
        "ProductFeedUploadError_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductFeedUploadError, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductFeedUploadError",
                "!doc": "Return the next ProductFeedUploadError item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductFeedUploadError",
                "!doc": "Gets the current ProductFeedUploadError of the cursor"
            }
        },
        "ProductFeedUpload": {
            "getProductFeedUploadErrors": {
                "!type": "fn() -> +ProductFeedUploadError_cursor",
                "!doc": "List of errors during the product feed upload"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "end_time": {
                "!type": "string",
                "!doc": "The time the upload was completed"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product feed upload"
            },
            "input_method": {
                "!type": "ProductFeedUpload_input_method",
                "!doc": "The input method the product feed was obtained with"
            },
            "start_time": {
                "!type": "string",
                "!doc": "The time the upload process started"
            },
            "url": {
                "!type": "string",
                "!doc": "The url to fetch the products from"
            }
        },
        "AdPlacePageSet": {
            "update": {
                "!type": "fn(params: Object) -> +AdPlacePageSet",
                "!doc": "Update fields on the AdPlacePageSet"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "account_id": {
                "!type": "string",
                "!doc": "ID of the payments ad account associated with the Page set"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the Page set"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the Page set"
            },
            "pages_count": {
                "!type": "number",
                "!doc": "The number of pages are contained in the Page set"
            },
            "parent_page": {
                "!type": "Object",
                "!doc": "The parent page whose children are contained in the Page set"
            }
        },
        "DayPart": {
            "days": {
                "!type": "list<int>",
                "!doc": "Ints representing which days the day part is active. Valid values are from 0 - 6 with 0 representing Sunday,  ..., 6 representing Saturday."
            },
            "end_minute": {
                "!type": "number",
                "!doc": "A 0 based minute of the day representing when the day part ends. Valid values are from 0 - 1439."
            },
            "start_minute": {
                "!type": "number",
                "!doc": "A 0 based minute of the day representing when the day part starts. Valid values are from 0 - 1439."
            }
        },
        "RateCard": {
            "country": {
                "!type": "string",
                "!doc": "Country in which offer or discount was valid"
            },
            "currency": {
                "!type": "string",
                "!doc": "Used monetary unit of the rate"
            },
            "rate": {
                "!type": "number",
                "!doc": "Standard rate offered or negotiated discount given"
            }
        },
        "WindowsPhoneAppLink": {
            "app_id": {
                "!type": "string",
                "!doc": "The native apps id in the Windows Phone store."
            },
            "app_name": {
                "!type": "string",
                "!doc": "The native apps name in the Windows Phone store."
            },
            "url": {
                "!type": "string",
                "!doc": "The native Windows Phone URL that will be navigated to."
            }
        },
        "FundingSourceDetailsCoupon": {
            "amount": {
                "!type": "number",
                "!doc": "Coupon amount"
            },
            "currency": {
                "!type": "string",
                "!doc": "Coupon currency"
            },
            "display_amount": {
                "!type": "string",
                "!doc": "Coupon display amount"
            },
            "expiration": {
                "!type": "string",
                "!doc": "Coupon expiration time"
            }
        },
        "ProductGroup": {
            "update": {
                "!type": "fn(params: Object) -> +ProductGroup",
                "!doc": "Update fields on the ProductGroup"
            },
            "getProductSets": {
                "!type": "fn() -> +ProductSet_cursor",
                "!doc": "Product sets that this product group belongs to"
            },
            "getProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Products that belong to this product group"
            },
            "createProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Create a product"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product group"
            },
            "retailer_id": {
                "!type": "string",
                "!doc": "Retailer ID of the product group"
            },
            "variants": {
                "!type": "list<ProductVariant>",
                "!doc": "The list of product variants and their options in the order theyneed to be displayed on the UI"
            }
        },
        "OffsitePixel": {
            "update": {
                "!type": "fn(params: Object) -> +OffsitePixel",
                "!doc": "Update fields on the OffsitePixel"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the OffsitePixel"
            },
            "deleteAdAccounts": {
                "!type": "fn() -> +AdAccount_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "getAdAccounts": {
                "!type": "fn() -> +AdAccount_cursor",
                "!doc": "Accounts associated with the pixel"
            },
            "createAdAccounts": {
                "!type": "fn() -> +AdAccount_cursor",
                "!doc": "SELF_EXPLANATORY"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "creator": {
                "!type": "string",
                "!doc": "ID and name of the ad account that first created the pixel"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the conversion pixel"
            },
            "js_pixel": {
                "!type": "string",
                "!doc": "JavaScript code for the pixel that you should place in the head of the conversion page"
            },
            "last_firing_time": {
                "!type": "string",
                "!doc": "Last time the pixel was fired"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the conversion pixel"
            },
            "tag": {
                "!type": "string",
                "!doc": "One of: `checkout`, `registration`, `lead`, `key_page_view`, `add_to_cart`, `other`"
            }
        },
        "ProfilePictureSource": {
            "bottom": {
                "!type": "number",
                "!doc": "Deprecated"
            },
            "height": {
                "!type": "number",
                "!doc": "Picture height in pixels. Only returned when specified as a modifier"
            },
            "is_silhouette": {
                "!type": "bool",
                "!doc": "True if the profile picture is the default 'silhouette' picture"
            },
            "left": {
                "!type": "number",
                "!doc": "Deprecated"
            },
            "right": {
                "!type": "number",
                "!doc": "Deprecated"
            },
            "top": {
                "!type": "number",
                "!doc": "Deprecated"
            },
            "url": {
                "!type": "string",
                "!doc": "URL of the profile picture"
            },
            "width": {
                "!type": "number",
                "!doc": "Picture width in pixels. Only returned when specified as a modifier"
            }
        },
        "AdLabel": {
            "update": {
                "!type": "fn(params: Object) -> +AdLabel",
                "!doc": "Update fields on the AdLabel"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the AdLabel"
            },
            "getAdCreatives": {
                "!type": "fn() -> +AdCreative_cursor",
                "!doc": "Creatives associated with this label"
            },
            "getAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "Ads associated with this label"
            },
            "getAdCampaigns": {
                "!type": "fn() -> +AdCampaign_cursor",
                "!doc": "Ad sets associated with this label"
            },
            "getAdCampaignGroups": {
                "!type": "fn() -> +AdCampaignGroup_cursor",
                "!doc": "Campaigns associated with this label"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "account": {
                "!type": "AdAccount",
                "!doc": "Ad Account"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Created time"
            },
            "id": {
                "!type": "string",
                "!doc": "Ad Label ID"
            },
            "name": {
                "!type": "string",
                "!doc": "Ad Label name"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "Updated time"
            }
        },
        "Targeting": {
            "excluded_connections": {
                "!type": "list<IDName>",
                "!doc": "Connections to exclude targeting to"
            },
            "behaviors": {
                "!type": "list<IDName>",
                "!doc": "Behaviors to target"
            },
            "politics": {
                "!type": "list<IDName>",
                "!doc": "Politics to target"
            },
            "custom_audiences": {
                "!type": "list<IDName>",
                "!doc": "Custom list of users to target to"
            },
            "excluded_product_audience_specs": {
                "!type": "list<TargetingProductAudienceSpec>",
                "!doc": "Similar to product_audience_specs, but instead of including the people who have performed certain actions, excluding them."
            },
            "age_max": {
                "!type": "number",
                "!doc": "Targeting user maximum age"
            },
            "exclusions": {
                "!type": "FlexibleTargeting",
                "!doc": "Excluded targeting rules and clusters"
            },
            "user_event": {
                "!type": "list<unsigned int>",
                "!doc": "User event"
            },
            "relationship_statuses": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting relationship statuses"
            },
            "exclude_reached_since": {
                "!type": "list<string>",
                "!doc": "Exclude users reached by this account since given date"
            },
            "education_schools": {
                "!type": "list<IDName>",
                "!doc": "Schools attended"
            },
            "moms": {
                "!type": "list<IDName>",
                "!doc": "Types of moms to target"
            },
            "income": {
                "!type": "list<IDName>",
                "!doc": "Income to target"
            },
            "interests": {
                "!type": "list<IDName>",
                "!doc": "Targeting user interests"
            },
            "page_types": {
                "!type": "list<string>",
                "!doc": "Types of the pages to target to"
            },
            "cities": {
                "!type": "list<IDName>",
                "!doc": "Targeting cities"
            },
            "household_composition": {
                "!type": "list<IDName>",
                "!doc": "Household compositions to target"
            },
            "user_device": {
                "!type": "list<string>",
                "!doc": "User mobile device"
            },
            "work_employers": {
                "!type": "list<IDName>",
                "!doc": "Employers"
            },
            "keywords": {
                "!type": "list<string>",
                "!doc": "Targeting keywords"
            },
            "fb_deal_id": {
                "!type": "number",
                "!doc": "Deal Id for predefined deals between advertisers and publishers (eg: Instant Articles, Video Home, Audience Network)"
            },
            "rtb_flag": {
                "!type": "bool",
                "!doc": "Does the targeting support RTB"
            },
            "political_views": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user political views"
            },
            "net_worth": {
                "!type": "list<IDName>",
                "!doc": "Net worth to target"
            },
            "excluded_engagement_specs": {
                "!type": "list<TargetingDynamicRule>",
                "!doc": "Similar to engagement_specs, but instead of include people who have performed certain activities, target the people who have not performed the specified activities."
            },
            "product_audience_specs": {
                "!type": "list<TargetingProductAudienceSpec>",
                "!doc": "A JSON spec that is used to describe the people who have performed certain actions on a set of products."
            },
            "college_years": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user year in college"
            },
            "home_ownership": {
                "!type": "list<IDName>",
                "!doc": "Home owership types to target"
            },
            "excluded_publisher_list_ids": {
                "!type": "list<string>",
                "!doc": "Excluded publisher list IDs on Audience Network"
            },
            "app_install_state": {
                "!type": "string",
                "!doc": "Targeting whether an app is installed or not on a device"
            },
            "flexible_spec": {
                "!type": "list<FlexibleTargeting>",
                "!doc": "Flexible combination of targeting rules and clusters"
            },
            "user_adclusters": {
                "!type": "list<IDName>",
                "!doc": "Targeting user ad clusters"
            },
            "geo_locations": {
                "!type": "TargetingGeoLocation",
                "!doc": "Locations used for ad targeting"
            },
            "home_value": {
                "!type": "list<IDName>",
                "!doc": "Home values to target"
            },
            "education_majors": {
                "!type": "list<IDName>",
                "!doc": "Majors during education"
            },
            "radius": {
                "!type": "string",
                "!doc": "Targeting user located within a radius of the location"
            },
            "zips": {
                "!type": "list<string>",
                "!doc": "Targeting locations' zip codes"
            },
            "genders": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting genders"
            },
            "age_min": {
                "!type": "number",
                "!doc": "Targeting user minimum age"
            },
            "countries": {
                "!type": "list<string>",
                "!doc": "Targeting countries"
            },
            "excluded_publisher_categories": {
                "!type": "list<string>",
                "!doc": "Excluded publisher categories, for example app categories on Audience Network"
            },
            "connections": {
                "!type": "list<IDName>",
                "!doc": "Targeting connections"
            },
            "excluded_custom_audiences": {
                "!type": "list<IDName>",
                "!doc": "Custom list of users to exclude targeting to"
            },
            "site_category": {
                "!type": "list<string>",
                "!doc": "The site category"
            },
            "country": {
                "!type": "list<string>",
                "!doc": "Targeting country"
            },
            "education_statuses": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user education statuses"
            },
            "friends_of_connections": {
                "!type": "list<IDName>",
                "!doc": "Friends of connections to target to"
            },
            "wireless_carrier": {
                "!type": "list<string>",
                "!doc": "The wireless carrier"
            },
            "engagement_specs": {
                "!type": "list<TargetingDynamicRule>",
                "!doc": "Engagement activities that people matched based on their online behaviors. e.g. video they watched, pages visited, ads clicked, etc."
            },
            "generation": {
                "!type": "list<IDName>",
                "!doc": "Generations to target"
            },
            "ethnic_affinity": {
                "!type": "list<IDName>",
                "!doc": "Ethnic affinities to target"
            },
            "user_os": {
                "!type": "list<string>",
                "!doc": "User mobile OS"
            },
            "locales": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting user locales"
            },
            "home_type": {
                "!type": "list<IDName>",
                "!doc": "Home types to target"
            },
            "targeting_optimization": {
                "!type": "string",
                "!doc": "Relax targeting constraints to hints"
            },
            "excluded_geo_locations": {
                "!type": "TargetingGeoLocation",
                "!doc": "Excluded locations for ads targeting"
            },
            "family_statuses": {
                "!type": "list<IDName>",
                "!doc": "Status of family"
            },
            "interested_in": {
                "!type": "list<unsigned int>",
                "!doc": "Targeting gender of person user is interested in"
            },
            "work_positions": {
                "!type": "list<IDName>",
                "!doc": "Positions at work"
            },
            "industries": {
                "!type": "list<IDName>",
                "!doc": "Industries to target"
            },
            "life_events": {
                "!type": "list<IDName>",
                "!doc": "Events in life"
            },
            "dynamic_audience_ids": {
                "!type": "list<string>",
                "!doc": "Dynamic audience IDs"
            },
            "office_type": {
                "!type": "list<IDName>",
                "!doc": "Office types to target"
            },
            "adgroup_id": {
                "!type": "string",
                "!doc": "ID of the ad group"
            },
            "regions": {
                "!type": "list<IDName>",
                "!doc": "Targeting regions"
            }
        },
        "TargetingGeoLocationMarket": {
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            },
            "market_type": {
                "!type": "string",
                "!doc": "Market type"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            }
        },
        "VideoThumbnail": {
            "height": {
                "!type": "number",
                "!doc": "The height of the thumbnail"
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of the thumbnail"
            },
            "is_preferred": {
                "!type": "bool",
                "!doc": "Whether this is the preferred thumbnail for the video"
            },
            "name": {
                "!type": "string",
                "!doc": "The name of the thumbnail"
            },
            "scale": {
                "!type": "number",
                "!doc": "The scale of the thumbnail"
            },
            "uri": {
                "!type": "string",
                "!doc": "The URI of the thumbnail"
            },
            "width": {
                "!type": "number",
                "!doc": "The width of the thumbnail"
            }
        },
        "AdActivity": {
            "actor_id": {
                "!type": "string",
                "!doc": "Actor ID"
            },
            "translated_event_type": {
                "!type": "string",
                "!doc": "Translated event type"
            },
            "application_id": {
                "!type": "string",
                "!doc": "Application ID"
            },
            "object_name": {
                "!type": "string",
                "!doc": "Object Name"
            },
            "event_time": {
                "!type": "string",
                "!doc": "Timestamp"
            },
            "date_time_in_timezone": {
                "!type": "string",
                "!doc": "Date/Time string in account timezone"
            },
            "actor_name": {
                "!type": "string",
                "!doc": "Actor Name"
            },
            "extra_data": {
                "!type": "string",
                "!doc": "JSON encoded extra information"
            },
            "application_name": {
                "!type": "string",
                "!doc": "Application Name"
            },
            "object_id": {
                "!type": "string",
                "!doc": "Object ID"
            },
            "event_type": {
                "!type": "AdActivity_event_type",
                "!doc": "Event types by category:<br>ACCOUNT<br>`ad_review_approved`: Ad approved<br>`ad_review_declined`: Ad not approved<br>`ad_account_set_business_information`: Account business information updated<br>`ad_account_update_status`: Account status updated<br>`ad_account_add_user_to_role`: Person added to account<br>`ad_account_remove_user_from_role`: Person removed from account<br><br>AD<br>`ad_review_approved`: Ad approved<br>`ad_review_declined`: Ad not approved<br>`add_images`: Image added to the library<br>`create_ad`: Ad created<br>`edit_images`: Image edited in library<br>`update_ad_creative`: Ad updated<br>`update_ad_friendly_name`: Ad name updated<br>`update_ad_run_status`: Ad status updated<br><br>AD_SET<br>`create_ad_set`: Ad set created<br>`update_ad_set_bidding`: Ad set bidding updated<br>`update_ad_set_budget`: Ad set budget updated<br>`update_ad_set_duration`: Ad set schedule updated<br>`update_ad_set_name`: Ad set name updated<br>`update_ad_set_run_status`: Ad set status updated<br>`update_ad_set_target_spec`: Ad set targeting updated<br><br>AUDIENCE<br>`create_audience`: Custom audience created<br>`update_audience`: Custom audience updated<br>`delete_audience`: Custom audience deleted<br><br>BID<br>`update_ad_bid_info`: Bid updated<br>`update_ad_bid_type`: Bidding type updated<br>`update_ad_set_bidding`: Ad set bidding updated<br><br>BUDGET<br>`ad_account_billing_charge`: Account billed<br>`ad_account_billing_chargeback`: Bank refund<br>`ad_account_billing_chargeback_reversal`: Paid (Bank refund cancelled)<br>`ad_account_billing_decline`: Account payment method declined<br>`ad_account_billing_refund`: Account refunded<br>`ad_account_remove_spend_limit`: Spending limit removed<br>`ad_account_reset_spend_limit`: Spending limit reset<br>`ad_account_update_spend_limit`: Spending limit updated<br>`add_funding_source`: Payment method added<br>`billing_event`: Billing Event<br>`funding_event_initiated`: Funding Event Initiated<br>`funding_event_successful`: Money added to balance<br>`remove_funding_source`: Payment method removed<br>`update_ad_set_budget`: Ad set budget updated<br>`update_campaign_budget`: Campaign budget updated<br>`update_campaign_group_spend_cap`: Campaign spending limit updated<br><br>CAMPAIGN<br>`create_campaign`: Campaign created<br>`create_campaign_legacy`: Campaign created<br>`create_campaign_group`: Campaign created<br>`update_campaign_duration`: Campaign schedule updated<br>`update_campaign_name`: Campaign name updated<br>`update_campaign_run_status`: Campaign status updated<br><br>DATE<br>`update_ad_set_duration`: Ad set schedule updated<br>`update_campaign_duration`: Campaign schedule updated<br><br>STATUS<br>`ad_account_update_status`: Account status updated<br>`update_ad_run_status`: Ad status updated<br>`update_ad_set_run_status`: Ad set status updated<br>`update_campaign_run_status`: Campaign status updated<br><br>TARGETING<br>`update_ad_set_target_spec`: Ad set targeting updated<br>`update_ad_targets_spec`: Ad targeting updated<br><br>"
            }
        },
        "AdAccountGroupResult": {
            "account_group_id": {
                "!type": "string",
                "!doc": "The ID of the account group"
            },
            "name": {
                "!type": "string",
                "!doc": "The name of the account group"
            },
            "status": {
                "!type": "number",
                "!doc": "The status of the account group"
            }
        },
        "AdCreative": {
            "update": {
                "!type": "fn(params: Object) -> +AdCreative",
                "!doc": "Update fields on the AdCreative"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the AdCreative"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Disassociates a set of labels from a creative"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Associates a set of labels with a creative"
            },
            "getAdPreviews": {
                "!type": "fn() -> +AdPreview_cursor",
                "!doc": "The HTML Snippets for previewing this creative"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "call_to_action_type": {
                "!type": "AdCreative_call_to_action_type",
                "!doc": "The call to action button text and header text of legacy ads."
            },
            "actor_image_url": {
                "!type": "string",
                "!doc": "The URL of the icon for the actor (Page ID) of this creative. This field is only available for mobile app ads created before 2015"
            },
            "body": {
                "!type": "string",
                "!doc": "The body of the ad"
            },
            "adlabels": {
                "!type": "list<AdLabel>",
                "!doc": "[Ad Labels](/docs/marketing-api/reference/ad-label) that are associated with this creative"
            },
            "object_story_id": {
                "!type": "string",
                "!doc": "The ID of a page post to use in an ad. This ID can be retrieved by using the graph API to query the posts of the page. If an image is used in the post, it will be downloaded and available in your account's [image library](/docs/marketing-api/adimage/)"
            },
            "object_story_spec": {
                "!type": "AdCreativeObjectStorySpec",
                "!doc": "The page id and the content to create a new unpublished page post specified using one of `link_data`, `photo_data`, `video_data`, `offer_data`, `text_data` or `template_data`"
            },
            "actor_id": {
                "!type": "string",
                "!doc": "The actor ID (Page ID) of this creative. This field is available only for mobile app ads created before 2015"
            },
            "run_status": {
                "!type": "AdCreative_run_status",
                "!doc": "The run status of this creative. Allowed values are:<br>`ACTIVE`<br>`DELETED`<br>"
            },
            "product_set_id": {
                "!type": "string",
                "!doc": "The ID of the product set for this creative. See [dynamic product ads](/docs/marketing-api/dynamic-product-ads/ads-management/) for more detail"
            },
            "url_tags": {
                "!type": "string",
                "!doc": "A set of query string parameters which will replace or be appended to urls clicked from page post ads, and canvas app install creatives only"
            },
            "template_url": {
                "!type": "string",
                "!doc": "The Tracking URL for dynamic product ads. See [dynamic product ads](/docs/marketing-api/dynamic-product-ads/ads-management#templateurl) for more detail"
            },
            "link_url": {
                "!type": "string",
                "!doc": "Used to identify a specific landing tab on the Page (e.g. a Page tab app) by the Page tab's URL. See [connection objects](/docs/marketing-api/connectionobjects/) for retrieving Page tabs' URLs. [app_data](/docs/facebook-login/manually-build-a-login-flow) parameters may be added to the url to pass data to a tab app"
            },
            "image_url": {
                "!type": "string",
                "!doc": "A URL for the image for this creative. The image specified at this URL will be saved into the ad account's [image library](/docs/marketing-api/adimage/)"
            },
            "name": {
                "!type": "string",
                "!doc": "The name of the creative in the creative library. Ad Creative names should be unique."
            },
            "platform_customizations": {
                "!type": "Object",
                "!doc": "Use this field to customize the media for different Facebook\n        [placements](/docs/marketing-api/targeting-specs/#placement). Currently\n        you can use this field for customizing images only. The\n        media specified here replaces the original media defined in the\n        ad creative when the ad displays on those placements. For example,\n        if you define a media here for the `instagram` key, Facebook\n        uses that media instead of the media defined in the ad creative when\n        showing the ad on Instagram."
            },
            "instagram_permalink_url": {
                "!type": "string",
                "!doc": "Instagram permalink"
            },
            "object_url": {
                "!type": "string",
                "!doc": "Destination URL for a link ads not connected to a page"
            },
            "image_hash": {
                "!type": "string",
                "!doc": "Image hash for an image you can use in creatives. See [image library](/docs/marketing-api/adimage/) for more details"
            },
            "instagram_actor_id": {
                "!type": "string",
                "!doc": "Instagram actor ID"
            },
            "instagram_story_id": {
                "!type": "string",
                "!doc": "Instagram Story ID"
            },
            "applink_treatment": {
                "!type": "AdCreative_applink_treatment",
                "!doc": "Deep link fallback behavior for [dynamic product ads](/docs/marketing-api/dynamic-product-ads/ads-management) if the app is not installed."
            },
            "actor_name": {
                "!type": "string",
                "!doc": "The title text used for actor. This field is available only for mobile app ads created before 2015"
            },
            "title": {
                "!type": "string",
                "!doc": "Title for a link ad (not connected to a Page)"
            },
            "object_type": {
                "!type": "AdCreative_object_type",
                "!doc": "The type of object that is being advertised. Allowed values are:<br>`PAGE`<br>`DOMAIN`<br>`EVENT`<br>`STORE_ITEM`: refers to an iTunes or Google Play store destination<br>`OFFER`<br>`SHARE`: from a page<br>`PHOTO`<br>`STATUS`: of a page<br>`VIDEO`<br>`APPLICATION`: app on Facebook<br>`INVALID`: when an invalid object_id was specified such as a deleted object or if you do not have permission to see the object. In very few cases, this field may be empty if Facebook is unable to identify the type of advertised object"
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of this creative"
            },
            "object_id": {
                "!type": "string",
                "!doc": "The ID of the [promoted_object](/docs/marketing-api/reference/ad-campaign/promoted-object) or object that is relevant to the ad and ad type"
            },
            "actor_image_hash": {
                "!type": "string",
                "!doc": "The image used for actor's icon. This field is available only for mobile app ads created before 2015"
            },
            "thumbnail_url": {
                "!type": "string",
                "!doc": "The URL to a thumbnail for this creative. You can optionally request dimensions of this thumbnail by providing the `thumbnail_width` and `thumbnail_height` parameters. [See example](/docs/marketing-api/reference/ad-creative#thumbnail-example) for more detail"
            },
            "link_og_id": {
                "!type": "string",
                "!doc": "The Open Graph (OG) ID for the link in this creative if the landing page has OG tags"
            },
            "image_crops": {
                "!type": "AdsImageCrops",
                "!doc": "A JSON object defining crop dimensions for the image specified. See [image crop reference](/docs/marketing-api/image-crops/) for more details"
            }
        },
        "TargetingGeoLocationPlace": {
            "region_id": {
                "!type": "number",
                "!doc": "Region ID"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            },
            "latitude": {
                "!type": "number",
                "!doc": "Latitude"
            },
            "distance_unit": {
                "!type": "string",
                "!doc": "Distance unit"
            },
            "longitude": {
                "!type": "number",
                "!doc": "Longitude"
            },
            "radius": {
                "!type": "number",
                "!doc": "Radius"
            },
            "primary_city_id": {
                "!type": "number",
                "!doc": "City ID"
            },
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            }
        },
        "MinimumBudget": {
            "currency": {
                "!type": "string",
                "!doc": "The currency these budgets pertain to"
            },
            "min_daily_budget_high_freq": {
                "!type": "number",
                "!doc": "The minimum daily budget for an ad set optimized for high frequency actions like clicks and likes."
            },
            "min_daily_budget_imp": {
                "!type": "number",
                "!doc": "The minimum daily budget for an ad set optimized for impressions."
            },
            "min_daily_budget_low_freq": {
                "!type": "number",
                "!doc": "The minimum daily budget for an ad set optimized for low frequency actions like mobile app installs, offer claims, or canvas app installs."
            },
            "min_daily_budget_video_views": {
                "!type": "number",
                "!doc": "The minimum daily budget for an ad set optimized for video views."
            }
        },
        "ProductSet": {
            "update": {
                "!type": "fn(params: Object) -> +ProductSet",
                "!doc": "Update fields on the ProductSet"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the ProductSet"
            },
            "getProductGroups": {
                "!type": "fn() -> +ProductGroup_cursor",
                "!doc": "Product groups that belong to this product set"
            },
            "getProductItems": {
                "!type": "fn() -> +ProductItem_cursor",
                "!doc": "Product items that belong to this product set"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "filter": {
                "!type": "string",
                "!doc": "The filter rule that defines the set of products in the catalog"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product set"
            },
            "name": {
                "!type": "string",
                "!doc": "The name given by the owner of this product set"
            },
            "product_count": {
                "!type": "number",
                "!doc": "Count of products in this product set"
            }
        },
        "AdCreativeVideoData": {
            "branded_content_sponsor_page_id": {
                "!type": "string",
                "!doc": "The branded content sponsor page id."
            },
            "call_to_action": {
                "!type": "AdCreativeLinkDataCallToAction",
                "!doc": "An optional call to action.\n        Additionally you can specify a `LIKE_PAGE` call to action when the ad\n        is in a PAGE_LIKES campaign."
            },
            "description": {
                "!type": "string",
                "!doc": "The description of the video"
            },
            "image_hash": {
                "!type": "string",
                "!doc": "Hash of an image in your image library with Facebook to use as\n        thumbnail"
            },
            "image_url": {
                "!type": "string",
                "!doc": "URL of image to use as thumbnail. You should not use image URLs\n        returned from the FB CDN but instead have the image hosted on your own\n        servers. The image specified at the URL will be saved into the ad\n        accounts [image library](/docs/marketing-api/reference/ad-image)"
            },
            "targeting": {
                "!type": "Targeting",
                "!doc": "The post gating for the video."
            },
            "title": {
                "!type": "string",
                "!doc": "The title of the video"
            },
            "video_id": {
                "!type": "string",
                "!doc": "ID of video that user has permission to or a video in ad account [video\n         library](/docs/marketing-api/advideo/)."
            }
        },
        "AdCampaign": {
            "update": {
                "!type": "fn(params: Object) -> +AdCampaign",
                "!doc": "Update fields on the AdCampaign"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the AdCampaign"
            },
            "getTargetingSentenceLines": {
                "!type": "fn() -> +TargetingSentenceLine_cursor",
                "!doc": "The targeting description sentence for this ad set"
            },
            "createAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Edge to create an async job for fetching ad insights for ad sets"
            },
            "getAdAsyncRequests": {
                "!type": "fn() -> +AdAsyncRequest_cursor",
                "!doc": "Async ad requests for this ad set"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Disassociates a set of labels from an ad set"
            },
            "getAdCreatives": {
                "!type": "fn() -> +AdCreative_cursor",
                "!doc": "The creatives of this ad set"
            },
            "getAdActivitys": {
                "!type": "fn() -> +AdActivity_cursor",
                "!doc": "The activities of this ad set"
            },
            "getAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "The ads under this ad set"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Associates a set of labels with an ad set"
            },
            "getAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Insights on advertising performance of this ad set"
            },
            "rf_prediction_id": {
                "!type": "string",
                "!doc": "Reach and frequency prediction ID"
            },
            "frequency_cap_reset_period": {
                "!type": "number",
                "!doc": "Frequency cap reset period"
            },
            "adlabels": {
                "!type": "list<AdLabel>",
                "!doc": "Ad Labels associated with this ad set"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Created time"
            },
            "optimization_goal": {
                "!type": "AdCampaign_optimization_goal",
                "!doc": "Which optimization goal this ad set is using:<br>NONE: Only available in read mode for campaigns created pre v2.4<br>APP_INSTALLS: Optimize for people more likely to install your app.<br>BRAND_AWARENESS: Optimize to reach the most number of users who are\n        likely to spend at least a minimum amount of time on the image or\n        video.<br>CLICKS: Optimize for people more likely to click anywhere in the ad. <br>ENGAGED_USER: Optimize for people more likely to take a particular action in your app <br>EXTERNAL: FBX only <br>EVENT_RESPONSES: Optimize for people more likely to attend your event <br>IMPRESSIONS: Show the ads as many times as possible <br>LINK_CLICKS: Optimize for people more likely to click in the link of the ad. <br>OFFER_CLAIMS: Optimize for people more likely to claim the offer.<br>OFFSITE_CONVERSION: Optimize for people more likely to make a  conversion in the site <br>PAGE_LIKES: Optimize for people more likely to like your page. <br>PAGE_ENGAGEMENT: Optimize for people more likely to engage with your page. <br>POST_ENGAGEMENT: Optimize for people more likely to engage with your post. <br>REACH: Optimize to reach the most unique users of each day or interval specified in `frequency_control_specs`. <br>SOCIAL_IMPRESSIONS: Increase the number of impressions with social context. <br>I.e. with the names of one or more of the user's friends attached to the ad who have already liked the page or installed the app. <br>VIDEO_VIEWS: Optimize for people more likely to watch videos.LEAD_GENERATION: Optimize for people more likely to fill out a lead generation form."
            },
            "pacing_type": {
                "!type": "list<string>",
                "!doc": "Defines the pacing type, standard or using ad scheduling"
            },
            "start_time": {
                "!type": "string",
                "!doc": "Start time, in UTC UNIX timestamp"
            },
            "effective_status": {
                "!type": "AdCampaign_effective_status",
                "!doc": "The effective status of the ad set, which can be either its own status\n        or caused by its parent campaign."
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "Campaign ID"
            },
            "daily_budget": {
                "!type": "string",
                "!doc": "The daily budget of the set defined in your [account currency](/docs/marketing-api/adset/budget-limits). "
            },
            "rtb_flag": {
                "!type": "bool",
                "!doc": "Whether this ad set is using RTB or not"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of ad set"
            },
            "account_id": {
                "!type": "string",
                "!doc": "Ad Account ID"
            },
            "frequency_cap": {
                "!type": "number",
                "!doc": "Frequency cap"
            },
            "campaign": {
                "!type": "AdCampaignGroup",
                "!doc": "The campaign that contains this ad set"
            },
            "bid_info": {
                "!type": "map<string, unsigned int>",
                "!doc": "Map of bid objective to bid value. This field is not available if `is_autobid` is true."
            },
            "targeting": {
                "!type": "Targeting",
                "!doc": "Targeting"
            },
            "creative_sequence": {
                "!type": "list<string>",
                "!doc": "Order of the adgroup sequence to be shown to users"
            },
            "end_time": {
                "!type": "string",
                "!doc": "End time, in UTC UNIX timestamp"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "Updated time"
            },
            "status": {
                "!type": "AdCampaign_status",
                "!doc": "Ad set status"
            },
            "frequency_control_specs": {
                "!type": "list<Object>",
                "!doc": "An array of frequency control specs for this ad set. As there is only\n        one event type supported currently, this array would have no more than\n        one element. Only available in ad sets of campaigns with\n        `BRAND_AWARENESS` as objective and `REACH` as `optimization_goal`.\n        These cannot be used in Reach & Frequency campaigns."
            },
            "configured_status": {
                "!type": "AdCampaign_configured_status",
                "!doc": "The status set at the ad set level. It can be different from the\n        effective status due to its parent campaign. Prefer using 'status'\n        instead of this."
            },
            "use_new_app_click": {
                "!type": "bool",
                "!doc": "If set, allows Mobile App Engagement ads to optimize for LINK_CLICKS"
            },
            "billing_event": {
                "!type": "AdCampaign_billing_event",
                "!doc": "The billing event that this adset is using:<br>APP_INSTALLS: Pay when people install your app.<br>CLICKS: Pay when people click anywhere in the ad. <br>IMPRESSIONS: Pay when the ads are shown to people.<br>LINK_CLICKS: Pay when people click on the link of the ad.<br>OFFER_CLAIMS: Pay when people claim the offer.<br>PAGE_LIKES: Pay when people like your page.<br>POST_ENGAGEMENT: Pay when people engage with your post.<br>VIDEO_VIEWS: Pay when people watch videos."
            },
            "adset_schedule": {
                "!type": "list<DayPart>",
                "!doc": "Ad set schedule, representing a delivery schedule for a single day"
            },
            "lifetime_frequency_cap": {
                "!type": "number",
                "!doc": "Lifetime frequency cap"
            },
            "is_autobid": {
                "!type": "bool",
                "!doc": "Did the advertiser express the intent to bid automatically. This field is not available if `bid_info` or `bid_amount` is returned."
            },
            "bid_amount": {
                "!type": "number",
                "!doc": "Bid amount for this ad set,\n        defined as your true value bid based on `optimization_goal`. This\n        field is not available if `is_autobid` is true or when `bid_info` is\n        returned. The bid amount's unit is cent for currencies like USD, EUR,\n        and the basic unit for currencies like JPY, KRW.\n        The bid amount for ads with `IMPRESSION`, `REACH` as `billing_event` is\n        per 1,000 occurrences, and that for ads with other `billing_event`\n        is for each occurrence."
            },
            "promoted_object": {
                "!type": "AdPromotedObject",
                "!doc": "The object this ad set is promoting across all its ads."
            },
            "recommendations": {
                "!type": "list<AdRecommendation>",
                "!doc": "If there are recommendations for this ad set, this field includes them. Otherwise, this field will be null."
            },
            "lifetime_budget": {
                "!type": "string",
                "!doc": "The lifetime budget of the set defined in your [account currency](/docs/marketing-api/adset/budget-limits). "
            },
            "id": {
                "!type": "string",
                "!doc": "Ad set ID"
            },
            "budget_remaining": {
                "!type": "string",
                "!doc": "Remaining budget"
            },
            "lifetime_imps": {
                "!type": "number",
                "!doc": "Lifetime impressions. Available only for campaigns with `buying_type=FIXED_CPM`"
            },
            "product_ad_behavior": {
                "!type": "AdCampaign_product_ad_behavior",
                "!doc": "Option to choose between prospecting and retargeting"
            }
        },
        "DeliveryCheck": {
            "check_name": {
                "!type": "string",
                "!doc": "Type of the check"
            },
            "description": {
                "!type": "string",
                "!doc": "Detailed description of the error"
            },
            "extra_info": {
                "!type": "DeliveryCheckExtraInfo",
                "!doc": "Extra information for the current check"
            },
            "summary": {
                "!type": "string",
                "!doc": "Summary of the error"
            }
        },
        "AdAsyncRequestSetNotificationResult": {
            "response": {
                "!type": "string",
                "!doc": "The response of the notification"
            },
            "status": {
                "!type": "string",
                "!doc": "The status of the sending result"
            }
        },
        "AdCreativeOfferData": {
            "claim_limit": {
                "!type": "number",
                "!doc": "The maximum number of times the offer can be claimed"
            },
            "coupon_type": {
                "!type": "string",
                "!doc": "The type of offer: `in_store_only` or `in_store_and_online`."
            },
            "expiration_time": {
                "!type": "string",
                "!doc": "The expiration time of the offer (used when displaying the offer)."
            },
            "image_url": {
                "!type": "string",
                "!doc": "The URL for the offer's image."
            },
            "message": {
                "!type": "string",
                "!doc": "The body text of the offer."
            },
            "redemption_link": {
                "!type": "string",
                "!doc": "The URL where the offer may be redeemed."
            },
            "reminder_time": {
                "!type": "string",
                "!doc": "Time before the expiration_time of the offer when the user receives a notification that the offer is about to expire"
            },
            "title": {
                "!type": "string",
                "!doc": "The title of the offer."
            }
        },
        "LookalikeSpec": {
            "country": {
                "!type": "string",
                "!doc": "Two letter country code. The country to find the lookalikes in."
            },
            "is_financial_service": {
                "!type": "bool",
                "!doc": "Is this lookalike used in financial service"
            },
            "origin": {
                "!type": "list<Object>",
                "!doc": "The ID of origin Custom Audience. The origin audience you create must\n        have a minimum size of 100."
            },
            "ratio": {
                "!type": "number",
                "!doc": "Range 0.01-0.20. Indicates the top x% of original audience in the\n        selected country. The default value is 0.01 which is 1%."
            },
            "starting_ratio": {
                "!type": "number",
                "!doc": "Used for tiered lookalikes"
            },
            "type": {
                "!type": "string",
                "!doc": "Type of the lookalike audience: `similarity` or `reach`"
            }
        },
        "AdReportRun": {
            "getAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Insights results of this Ad Report Run"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "time_ref": {
                "!type": "number",
                "!doc": "Time when this Ad Report Run was created"
            },
            "schedule_id": {
                "!type": "string",
                "!doc": "ID for the schedule that determines this Ad Report Run's execution"
            },
            "is_bookmarked": {
                "!type": "bool",
                "!doc": "Whether this Ad Report Run is bookmarked"
            },
            "is_running": {
                "!type": "bool",
                "!doc": "Whether this Ad Report Run is still runing"
            },
            "account_id": {
                "!type": "string",
                "!doc": "ID for the ad account this Ad Report Run belongs to"
            },
            "date_start": {
                "!type": "string",
                "!doc": "Earliest date in the time range of the report generated by this Ad Report Run"
            },
            "date_stop": {
                "!type": "string",
                "!doc": "Latest date in the time range of the report generated by this Ad Report Run"
            },
            "async_status": {
                "!type": "string",
                "!doc": "The status of async job for this report run"
            },
            "emails": {
                "!type": "list<string>",
                "!doc": "Recipients to send the finished report to"
            },
            "async_percent_completion": {
                "!type": "number",
                "!doc": "Completion percent of async job for this report run"
            },
            "time_completed": {
                "!type": "number",
                "!doc": "Time when this Ad Report Run was completed"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this report run"
            },
            "friendly_name": {
                "!type": "string",
                "!doc": "Friendly name for this Ad Report Run"
            }
        },
        "AdAccountGroupAdAccounts_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdAccountGroupAdAccounts, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdAccountGroupAdAccounts",
                "!doc": "Return the next AdAccountGroupAdAccounts item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdAccountGroupAdAccounts",
                "!doc": "Gets the current AdAccountGroupAdAccounts of the cursor"
            }
        },
        "AdAccountGroup": {
            "update": {
                "!type": "fn(params: Object) -> +AdAccountGroup",
                "!doc": "Update fields on the AdAccountGroup"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the AdAccountGroup"
            },
            "deleteAdAccountGroupAdAccountss": {
                "!type": "fn() -> +AdAccountGroupAdAccounts_cursor",
                "!doc": "Ad account in the ad account group"
            },
            "getAdAccountGroupAdAccountss": {
                "!type": "fn() -> +AdAccountGroupAdAccounts_cursor",
                "!doc": "The ad accounts in the ad account group"
            },
            "createAdAccountGroupAdAccountss": {
                "!type": "fn() -> +AdAccountGroupAdAccounts_cursor",
                "!doc": "Ad account in the ad account group"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "User that owns the ad account group"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "User that owns the ad account group"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "account_group_id": {
                "!type": "string",
                "!doc": "ID of this ad account group"
            },
            "accounts": {
                "!type": "list<Object>",
                "!doc": "The accounts in an account group in which the users have access"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this ad account group, it's the same as account_group_id"
            },
            "name": {
                "!type": "string",
                "!doc": "Name for the account group."
            },
            "status": {
                "!type": "number",
                "!doc": "Determines whether the account has a status of active (1) or\n        deleted (2)"
            },
            "users": {
                "!type": "list<Object>",
                "!doc": "The users who own the ad account group"
            }
        },
        "CustomAudienceSession_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +CustomAudienceSession, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +CustomAudienceSession",
                "!doc": "Return the next CustomAudienceSession item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +CustomAudienceSession",
                "!doc": "Gets the current CustomAudienceSession of the cursor"
            }
        },
        "CustomAudienceAdAccount_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +CustomAudienceAdAccount, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +CustomAudienceAdAccount",
                "!doc": "Return the next CustomAudienceAdAccount item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +CustomAudienceAdAccount",
                "!doc": "Gets the current CustomAudienceAdAccount of the cursor"
            }
        },
        "CustomAudiencePrefillState_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +CustomAudiencePrefillState, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +CustomAudiencePrefillState",
                "!doc": "Return the next CustomAudiencePrefillState item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +CustomAudiencePrefillState",
                "!doc": "Gets the current CustomAudiencePrefillState of the cursor"
            }
        },
        "CustomAudience": {
            "update": {
                "!type": "fn(params: Object) -> +CustomAudience",
                "!doc": "Update fields on the CustomAudience"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the CustomAudience"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Remove users from custom audience with custumer list"
            },
            "getCustomAudienceSessions": {
                "!type": "fn() -> +CustomAudienceSession_cursor",
                "!doc": "Data upload sessions of this custom audience"
            },
            "deleteCustomAudienceAdAccounts": {
                "!type": "fn() -> +CustomAudienceAdAccount_cursor",
                "!doc": "Remove an ad account from access to the custom audience"
            },
            "getAdgroups": {
                "!type": "fn() -> +Adgroup_cursor",
                "!doc": "Ads that are using this custom audience"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "getCustomAudienceAdAccounts": {
                "!type": "fn() -> +CustomAudienceAdAccount_cursor",
                "!doc": "The ad account ids associated with this custom audience"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Add users to custom audience with custumer list"
            },
            "createCustomAudienceAdAccounts": {
                "!type": "fn() -> +CustomAudienceAdAccount_cursor",
                "!doc": "Allow ad accounts to have access to this custom audience"
            },
            "getCustomAudiencePrefillStates": {
                "!type": "fn() -> +CustomAudiencePrefillState_cursor",
                "!doc": "Status of the prefill jobs if they exist"
            },
            "lookalike_spec": {
                "!type": "LookalikeSpec",
                "!doc": "Generated only when the subtype is `LOOKALIKE`. More info at\n        [Lookalike Audience](/docs/marketing-api/lookalike-audience-targeting/)\n        "
            },
            "lookalike_audience_ids": {
                "!type": "list<string>",
                "!doc": "The IDs of the lookalike audiences generated from this audience"
            },
            "time_content_updated": {
                "!type": "number",
                "!doc": "Last update of people in this custom audience"
            },
            "approximate_count": {
                "!type": "number",
                "!doc": "Approximate number of people in this audience"
            },
            "included_custom_audiences": {
                "!type": "list<CustomAudience>",
                "!doc": "Field that exist only on `COMBINATION` custom audiences. It's a\n        list of ids of every audience to be included in the combination"
            },
            "time_updated": {
                "!type": "number",
                "!doc": "Last time this audience metadata was updated"
            },
            "operation_status": {
                "!type": "CustomAudienceStatus",
                "!doc": "JSON dictionary of `code` to int value and `description` to a\n        description string. The operation status represents the status of the\n        last operation performed on an audience. In general, it will have\n        following states:<br>\n        * 0: Status not available<br>\n        * 200: Normal: there is no updating or issues found<br>\n        * 400: Warning: there is some message we would like advertisers to\n        know<br>\n        * 410: No upload: no file has been uploaded<br>\n        * 411: Low match rate: low rate of matched people<br>\n        * 412: High invalid rate: high rate of invalid people<br>\n        * 421: No pixel: Your Facebook pixel hasn't been installed on\n        your website yet<br>\n        * 422: Pixel not firing: Your Facebook pixel isn't firing<br>\n        * 423: Invalid pixel: Your Facebook pixel is invalid<br>\n        * 431: Lookalike Audience refresh failed<br>\n        * 432: Lookalike Audience build failed<br>\n        * 433: Lookalike Audience build failed<br>\n        * 434: Lookalike Audience build retrying<br>\n        * 500: Error: there is some error and advertisers need to take action\n        items to fix the error<br>"
            },
            "name": {
                "!type": "string",
                "!doc": "Custom audience name"
            },
            "account_id": {
                "!type": "string",
                "!doc": "Ad Account ID"
            },
            "data_source": {
                "!type": "CustomAudienceDataSource",
                "!doc": "JSON dictionary of `type`, `sub_type` to indicate by which method the\n        custom audience was created."
            },
            "external_event_source": {
                "!type": "AdsPixel",
                "!doc": "Read-only JSON dictionary with key `id` containing the pixel id whose\n        traffic generated this custom audience"
            },
            "pixel_id": {
                "!type": "string",
                "!doc": "ID of the pixel which is collecting events for this Website Custom audience"
            },
            "excluded_custom_audiences": {
                "!type": "list<CustomAudience>",
                "!doc": "Field that exist only on `COMBINATION` custom audiences. It's a\n        list of ids of every audience to be excluded in the combination"
            },
            "time_created": {
                "!type": "number",
                "!doc": "Creation time"
            },
            "permission_for_actions": {
                "!type": "CustomAudiencePermission",
                "!doc": "JSON dictionary of permissions (string) to boolean value if the\n        custom audience has that permission"
            },
            "opt_out_link": {
                "!type": "string",
                "!doc": "Your opt-out URL so people can choose not to be targeted"
            },
            "retention_days": {
                "!type": "number",
                "!doc": "Number of days to keep the user in this cluster. You can use any value\n        between 1 and 180 days. Defaults to 14 days if not specified"
            },
            "subtype": {
                "!type": "string",
                "!doc": "Type of custom audience, derived from original data source"
            },
            "id": {
                "!type": "string",
                "!doc": "Custom audience ID"
            },
            "rule": {
                "!type": "string",
                "!doc": "Audience rules to be applied on the referrer URL"
            },
            "description": {
                "!type": "string",
                "!doc": "Custom audience description"
            },
            "delivery_status": {
                "!type": "CustomAudienceStatus",
                "!doc": "JSON dictionary of `code` and `description`. Indicates whether or not\n        an audience can be used in ads. There are two situations that an\n        audience will make ads not deliverable. First, if the size is smaller\n        than 20 people, the audience can't be delivered. Second, if for some\n        reason the audience is disabled (such as violation of policy, expired),\n        validation will fail when it is used in ads."
            }
        },
        "TargetingGeoLocation": {
            "electoral_districts": {
                "!type": "list<Object>",
                "!doc": "Targeting an electoral district"
            },
            "geo_markets": {
                "!type": "list<TargetingGeoLocationMarket>",
                "!doc": "Targeting a market region, for example: designated market area(DMA)"
            },
            "cities": {
                "!type": "list<TargetingGeoLocationCity>",
                "!doc": "Targeting cities"
            },
            "places": {
                "!type": "list<TargetingGeoLocationPlace>",
                "!doc": "Targeting circle around a place"
            },
            "location_types": {
                "!type": "list<string>",
                "!doc": "Targeting home/recent location"
            },
            "custom_locations": {
                "!type": "list<TargetingGeoLocationCustomLocation>",
                "!doc": "Targeting circle around a latitude and longitude"
            },
            "zips": {
                "!type": "list<TargetingGeoLocationZip>",
                "!doc": "Targeting locations' zip codes"
            },
            "countries": {
                "!type": "list<string>",
                "!doc": "Targeting countries"
            },
            "regions": {
                "!type": "list<TargetingGeoLocationRegion>",
                "!doc": "Targeting regions"
            }
        },
        "AdgroupRelevanceScore": {
            "negative_feedback": {
                "!type": "string",
                "!doc": "Negative feedback level (LOW, MEDIUM, HIGH)"
            },
            "positive_feedback": {
                "!type": "string",
                "!doc": "Positive feedback level (LOW, MEDIUM, HIGH)"
            },
            "score": {
                "!type": "number",
                "!doc": "Score (1-10, 10 being the highest)"
            },
            "status": {
                "!type": "string",
                "!doc": "Status (OK, NOT_ENOUGH_IMPRESSIONS, UNKNOWN_ERROR)"
            }
        },
        "CustomAudienceAdAccount": {
            "id": {
                "!type": "string",
                "!doc": "The ID of an ad account"
            }
        },
        "AdAccountUser": {
            "id": {
                "!type": "string",
                "!doc": "ID of the App Scoped User"
            },
            "name": {
                "!type": "string",
                "!doc": "User public full name"
            },
            "permissions": {
                "!type": "list<unsigned int>",
                "!doc": "Permissions of App Scoped User"
            },
            "role": {
                "!type": "number",
                "!doc": "Role of App Scoped User"
            }
        },
        "AdAsyncRequest": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "async_request_set": {
                "!type": "AdAsyncRequestSet",
                "!doc": "The async request set that contains this individual request"
            },
            "created_time": {
                "!type": "string",
                "!doc": "The time when this async request was created"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this async request"
            },
            "input": {
                "!type": "map",
                "!doc": "The original input for this async request"
            },
            "result": {
                "!type": "map",
                "!doc": "The result of the request, if it's finished"
            },
            "scope_object_id": {
                "!type": "string",
                "!doc": "The parent id of the object this request would be creating"
            },
            "status": {
                "!type": "AdAsyncRequest_status",
                "!doc": "The status of this async request"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "The time when this async request was last updated"
            }
        },
        "ProductVariant": {
            "label": {
                "!type": "string",
                "!doc": "Name of the variant to be displayed on the UI."
            },
            "options": {
                "!type": "list<string>",
                "!doc": "A vector of possible options of the variant in the order by which they will be shown on the UI."
            },
            "product_field": {
                "!type": "string",
                "!doc": "Name of the first-class or custom-data product item field describing a variant of the product."
            }
        },
        "AdCreativeLinkData": {
            "event_id": {
                "!type": "string",
                "!doc": "The id of a Facebook event. This is only to be used if this creative is for a Website Clicks campaign, the Call To Action is Buy Tickets, and the `link` points to the ticketing website of this Facebook event."
            },
            "multi_share_optimized": {
                "!type": "bool",
                "!doc": "If set to true, automatically select and order images and links.\n        Default is true. Used by\n        [carousel ads](/docs/marketing-api/guides/carousel-ads/)."
            },
            "app_link_spec": {
                "!type": "AdCreativeLinkDataAppLinkSpec",
                "!doc": "Native deeplinks attached to the post"
            },
            "max_product_count": {
                "!type": "number",
                "!doc": "Maximum number of products to show for dynamic product ads. See\n        [dynamic creative\n        ](/docs/marketing-api/dynamic-product-ads/ads-management#adtemplate)"
            },
            "caption": {
                "!type": "string",
                "!doc": "Link caption. Overwrites the caption under the title in the link\n        on Facebook. See [post](/docs/graph-api/reference/post) for\n        more info. This setting is not used on Instagram."
            },
            "message": {
                "!type": "string",
                "!doc": "The main body of the post. See [post](/docs/graph-api/reference/post)\n        for more info. This field is required for a [carousel ad\n        ](/docs/marketing-api/guides/carousel-ads/)."
            },
            "branded_content_sponsor_page_id": {
                "!type": "string",
                "!doc": "The branded content sponsor page id."
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the `link`. Overwrites the title of the link preview. See [post\n        ](/docs/graph-api/reference/post) for more info."
            },
            "child_attachments": {
                "!type": "list<AdCreativeLinkDataChildAttachment>",
                "!doc": "A 2-5 element array of link objects required for\n        [carousel ads](/docs/marketing-api/guides/carousel-ads/).\n        If `multi_share_optimized` is set to `true`, this array could have up to\n        10 objects. Facebook will automatically optimize the order in which the\n        carousel cards are shown and display the top 5.\n        We strongly recommend that you use at least 3 attachments for achieving\n        optimal performance; allowing minimum of 2 attachments is for enabling\n        lightweight integrations and using 2 objects might result in\n        sub-optimal campaign results.<br>\n        If this ad creative is used for an\n        [Instagram Carousel ad](/docs/marketing-api/guides/instagramads), you\n        will need to have at least 3 attachments for `MOBILE_APP_INSTALLS` ads\n        and 2 for the other objectives. If more than 5 are given, only the\n        first 5 will be\n        shown on Instagram, even if `multi_share_optimized` is `true`. "
            },
            "image_hash": {
                "!type": "string",
                "!doc": "Hash of an image in your image library with Facebook.\n        Specify this field or `picture` but not both"
            },
            "attachment_style": {
                "!type": "AdCreativeLinkData_attachment_style",
                "!doc": "The style of the attachment."
            },
            "additional_image_index": {
                "!type": "number",
                "!doc": "The index (zero based) of the image from the additionalimages array to use as the ad image for a\n        [dynamic product\n        ad](/docs/marketing-api/dynamic-product-ads/ads-management/)"
            },
            "call_to_action": {
                "!type": "AdCreativeLinkDataCallToAction",
                "!doc": "An optional call to action button. If not specified, on Instagram,\n        a default CTA would be used, `{\"type\":\"LEARN_MORE\",\"value\":\n        {\"link\":<LINK VALUE OF LINK_DATA>,}}`."
            },
            "multi_share_end_card": {
                "!type": "bool",
                "!doc": "If set to false, removes the end card which displays the page icon.\n        Default is true. Used by\n        [carousel ads](/docs/marketing-api/guides/carousel-ads/)."
            },
            "canvas_enabled": {
                "!type": "bool",
                "!doc": "If canvas experience is enabled post click"
            },
            "link": {
                "!type": "string",
                "!doc": "Link url. See [post](/docs/graph-api/reference/post) for more info.\n        This field is required for a [carousel ad\n        ](/docs/marketing-api/guides/carousel-ads/)."
            },
            "description": {
                "!type": "string",
                "!doc": "Link description. Overwrites the description in the link on\n        Facebook. See [post](/docs/graph-api/reference/post) for more info.\n        This setting is not used on Instagram."
            },
            "picture": {
                "!type": "string",
                "!doc": "URL of a picture to use in the post. Specify this field or `image_hash`\n         but not both. See [post](/docs/graph-api/reference/post) for more info.\n         The image specified at the URL will be saved into the ad accounts\n         [image library](/docs/marketing-api/reference/ad-image)"
            },
            "image_crops": {
                "!type": "AdsImageCrops",
                "!doc": "How to the image should be cropped. Different placements use different\n        crop specs. For example, Facebook News Feed uses the crop spec with\n        `191x100` key, and Instagram uses `100x100` crop spec."
            }
        },
        "AdsPixel": {
            "update": {
                "!type": "fn(params: Object) -> +AdsPixel",
                "!doc": "Update fields on the AdsPixel"
            },
            "getCustomAudiences": {
                "!type": "fn() -> +CustomAudience_cursor",
                "!doc": "The [website custom\n        audiences](/docs/marketing-api/custom-audience-website/)\n        associated with this pixel"
            },
            "getAdAccounts": {
                "!type": "fn() -> +AdAccount_cursor",
                "!doc": "Ad Accounts in the same business that this pixel is shared"
            },
            "getBusinesss": {
                "!type": "fn() -> +Business_cursor",
                "!doc": "Agencies or other businesses this pixel\n        is shared with"
            },
            "getAdsPixelStatsResults": {
                "!type": "fn() -> +AdsPixelStatsResult_cursor",
                "!doc": "Stats data for this pixel"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "code": {
                "!type": "string",
                "!doc": "Pixel code to be placed on the website"
            },
            "creation_time": {
                "!type": "string",
                "!doc": "Time at which the pixel was created"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the pixel"
            },
            "last_fired_time": {
                "!type": "string",
                "!doc": "Time at which the pixel was last fired"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the pixel"
            },
            "owner_ad_account": {
                "!type": "AdAccount",
                "!doc": "Ad Account that owns this pixel"
            },
            "owner_business": {
                "!type": "Business",
                "!doc": "ID of the business that owns this pixel or null if\n        the pixel has not been claimed by any business yet."
            }
        },
        "UserLeadGenInfo": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "post": {
                "!type": "Object",
                "!doc": "Post used for the LeadGen Ad unit"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Time this object was created"
            },
            "ad_name": {
                "!type": "string",
                "!doc": "Ad name for the Lead Ad"
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "Campaign ID for the Lead Ad"
            },
            "adset_name": {
                "!type": "string",
                "!doc": "Ad Set name for the Lead Ad"
            },
            "field_data": {
                "!type": "list<Object>",
                "!doc": "Data submitted by the user"
            },
            "is_organic": {
                "!type": "bool",
                "!doc": "Indicates whether the lead is organic"
            },
            "form_id": {
                "!type": "string",
                "!doc": "Form ID used for the Lead Ads"
            },
            "ad_id": {
                "!type": "string",
                "!doc": "Ad ID for the Lead Ad"
            },
            "campaign_name": {
                "!type": "string",
                "!doc": "Campaign name for the Lead Ad"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the LeadGenInfo object"
            },
            "adset_id": {
                "!type": "string",
                "!doc": "Ad Set ID for the Lead Ad"
            }
        },
        "ProductItemCommerceInsights": {
            "message_sends": {
                "!type": "number",
                "!doc": "The number of message sends triggered by this product's Message Seller CTA"
            },
            "organic_impressions": {
                "!type": "number",
                "!doc": "The number of organic impressions for this product's details"
            },
            "paid_impressions": {
                "!type": "number",
                "!doc": "The number of paid impressions for this product's details"
            }
        },
        "WindowsAppLink": {
            "app_id": {
                "!type": "string",
                "!doc": "The native apps id in the Windows store."
            },
            "app_name": {
                "!type": "string",
                "!doc": "The native apps name in the Windows store."
            },
            "package_family_name": {
                "!type": "string",
                "!doc": "The Package Family Name of the app."
            },
            "url": {
                "!type": "string",
                "!doc": "The native Windows URL that will be navigated to."
            }
        },
        "AppLinks": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "windows": {
                "!type": "list<WindowsAppLink>",
                "!doc": "App links to Windows apps"
            },
            "iphone": {
                "!type": "list<IosAppLink>",
                "!doc": "App links to iPhone apps"
            },
            "ipad": {
                "!type": "list<IosAppLink>",
                "!doc": "App links to iPad apps"
            },
            "ios": {
                "!type": "list<IosAppLink>",
                "!doc": "App links to apps supported across all iOS devices"
            },
            "android": {
                "!type": "list<AndroidAppLink>",
                "!doc": "App links to Android apps"
            },
            "windows_universal": {
                "!type": "list<WindowsAppLink>",
                "!doc": "App links to Windows and Windows Phone apps"
            },
            "windows_phone": {
                "!type": "list<WindowsPhoneAppLink>",
                "!doc": "App links to Windows Phone apps"
            },
            "web": {
                "!type": "WebAppLink",
                "!doc": "The web equivalent of an app link.An empty value indicates this is a mobile-only object"
            },
            "id": {
                "!type": "string",
                "!doc": "The source url of the app links object"
            }
        },
        "AdgroupPlacementSpecificReviewFeedback": {
            "facebook": {
                "!type": "map<string, string>",
                "!doc": "Reasons for disapproval on \"FACEBOOK\". Each reason has\n        key and a description. Some of the key-description combinations\n        can be found at [Ad review feedback\n        definitions](/docs/marketing-api/adgroup/feedback/)."
            },
            "instagram": {
                "!type": "map<string, string>",
                "!doc": "Reasons for disapproval on \"INSTAGRAM\". Each reason has\n        key and a description. Some of the key-description combinations\n        can be found at [Ad review feedback\n        definitions](/docs/marketing-api/adgroup/feedback/)."
            }
        },
        "ReachFrequencyPrediction": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "external_maximum_reach": {
                "!type": "number",
                "!doc": "Maximum reach given the target"
            },
            "campaign_time_stop": {
                "!type": "string",
                "!doc": "Unix timestamp of the ad set stop time"
            },
            "reservation_status": {
                "!type": "number",
                "!doc": "Reservation status. <br>0 = Cancelled prediction, <br>1 = Reserved prediction, <br>2 = Prediction has been attached to a campaign"
            },
            "time_updated": {
                "!type": "string",
                "!doc": "Unix timestamp when the row is updated"
            },
            "curve_budget_reach": {
                "!type": "string",
                "!doc": "The curve for budget and reach. It is a string in JSON format representing a JSON object with these fields. <br>`num_points`: the number of data points within the object. <br>`reach`: Data contained at corresponding indices of each array form a single data point. The \"reach\" values are presented in ascending order with the final value containing the maximum available reach. <br>`budget`: Data contained at corresponding indices of each array form a single data point. Cent of accounts currency. <br>`impression`: Data contained at corresponding indices of each array form a single data point."
            },
            "target_spec": {
                "!type": "string",
                "!doc": "A string in JSON format representing the [targeting specs](/docs/marketing-api/targeting-specs) specified on creation."
            },
            "story_event_type": {
                "!type": "number",
                "!doc": "Used to indicated the prediction is for video ads or not. If it is for video, the prediction will not include devices that cannot play video"
            },
            "campaign_group_id": {
                "!type": "number",
                "!doc": "The id of the campaign which this prediction belongs to"
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "The ID of the ad set to which this reach frequency prediction is assigned"
            },
            "holdout_percentage": {
                "!type": "number",
                "!doc": "Percent of users in holdout"
            },
            "external_minimum_budget": {
                "!type": "string",
                "!doc": "Minimum budget given the target, in cents"
            },
            "name": {
                "!type": "string",
                "!doc": "Prediction name."
            },
            "destination_id": {
                "!type": "string",
                "!doc": "The ID of the Page or the ID of the app which the ad promotes."
            },
            "account_id": {
                "!type": "string",
                "!doc": "The ID of the Ad Account this reach frequency prediction belongs to"
            },
            "external_minimum_reach": {
                "!type": "number",
                "!doc": "Minimum reach given the target"
            },
            "target_audience_size": {
                "!type": "number",
                "!doc": "Unique 30-day active users for given targetting specs. Used as tip to indicate the maximum possible audience size if campaign length is increased"
            },
            "external_minimum_impression": {
                "!type": "number",
                "!doc": "Minimum impressions given the target"
            },
            "frequency_cap": {
                "!type": "number",
                "!doc": "Lifetime frequency cap per user, always relevant, 0 means no frequncy cap"
            },
            "grp_dmas_audience_size": {
                "!type": "number",
                "!doc": "GRP: Audience size within DMAs based on Nielsen definition"
            },
            "status": {
                "!type": "number",
                "!doc": "Represents the status of the prediction, refer to [Response Status](/docs/marketing-api/reachandfrequency/#statuscodes)"
            },
            "prediction_mode": {
                "!type": "number",
                "!doc": "The prediction mode, <br>0 = given reach, predict budget, <br>1 = given budget, predict reach"
            },
            "time_created": {
                "!type": "string",
                "!doc": "The time when this reach frequency prediction was created"
            },
            "external_maximum_budget": {
                "!type": "string",
                "!doc": "Maximum budget given the target, in cents"
            },
            "external_budget": {
                "!type": "string",
                "!doc": "Predicted budget in cents for the ad set, relevant if prediction mode is <PREDICT BY BUDGET>"
            },
            "instagram_destination_id": {
                "!type": "string",
                "!doc": "The Instagram account id if `instagramstream` placement is used, except\n        in the case of Mobile App Installs ads."
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of this reach frequency prediction"
            },
            "interval_frequency_cap_reset_period": {
                "!type": "number",
                "!doc": "Custom reset period (hours) for interval frequency cap"
            },
            "external_maximum_impression": {
                "!type": "number",
                "!doc": "Maximum number of impressions given the target"
            },
            "expiration_time": {
                "!type": "string",
                "!doc": "Unix timestamp of the expiration time of prediction, if applicable"
            },
            "external_impression": {
                "!type": "number",
                "!doc": "Predicted impressions for the ad set"
            },
            "prediction_progress": {
                "!type": "number",
                "!doc": "Represents percentage value indicating the prediction progress (values 0-100). When 100 check status to indicate whether the prediction was successful."
            },
            "campaign_time_start": {
                "!type": "string",
                "!doc": "Unix timestamp of the ad set start time"
            },
            "external_reach": {
                "!type": "number",
                "!doc": "Predicted reach for the ad set, relevant if prediction mode is <PREDICT BY REACH>"
            }
        },
        "AdImage": {
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Time the image was created"
            },
            "creatives": {
                "!type": "list<string>",
                "!doc": "A list of ad creative IDs that this ad image is being used in. Not applicable for creatives using `object_story_spec` and a URL in the `picture` field."
            },
            "width": {
                "!type": "number",
                "!doc": "The width of the image."
            },
            "height": {
                "!type": "number",
                "!doc": "The height of the image."
            },
            "url_128": {
                "!type": "string",
                "!doc": "A temporary URL pointing to a version of the image resized to fit withing a 128x128 pixel box"
            },
            "name": {
                "!type": "string",
                "!doc": "The filename of the image"
            },
            "account_id": {
                "!type": "string",
                "!doc": "The ad account that owns the image"
            },
            "hash": {
                "!type": "string",
                "!doc": "The hash which uniquely identifies the image."
            },
            "url": {
                "!type": "string",
                "!doc": "A temporary URL which the image can be retrieved at. NOTE: do not use this URL in ad creative creation"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "Time the image was updated"
            },
            "status": {
                "!type": "AdImage_status",
                "!doc": "Status of the image"
            },
            "original_height": {
                "!type": "number",
                "!doc": "The height of the image that was originally uploaded."
            },
            "original_width": {
                "!type": "number",
                "!doc": "The width of the image that was originally uploaded."
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of the image"
            },
            "permalink_url": {
                "!type": "string",
                "!doc": "A permanent URL of the image to use in story creatives"
            }
        },
        "AdsImageCrops": {
            "100x100": {
                "!type": "list<list>",
                "!doc": "Crop specification for 100x100"
            },
            "100x72": {
                "!type": "list<list>",
                "!doc": "Crop specification for 100x72"
            },
            "191x100": {
                "!type": "list<list>",
                "!doc": "Crop specification for 191x100"
            },
            "400x150": {
                "!type": "list<list>",
                "!doc": "Crop specification for 400x150"
            },
            "600x360": {
                "!type": "list<list>",
                "!doc": "Crop specification for 600x360"
            }
        },
        "AdKeywordStats": {
            "cpm": {
                "!type": "number",
                "!doc": "The average cost you've paid to have 1,000 impressions on your ad."
            },
            "ctr": {
                "!type": "number",
                "!doc": "The number of clicks you received divided by the number of impressions."
            },
            "total_actions": {
                "!type": "number",
                "!doc": "The number of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Actions include Page likes, app installs, conversions, event responses and more. For example, 2 Page likes and 2 comments would be counted as 4 actions."
            },
            "cpp": {
                "!type": "number",
                "!doc": "The average cost you've paid to have your ad served to 1,000 unique people."
            },
            "cost_per_total_action": {
                "!type": "number",
                "!doc": "The average you've spent on actions. For example, if you spent $20 and you got 10 Page likes, each one cost an average of $2."
            },
            "total_unique_actions": {
                "!type": "number",
                "!doc": "The number of unique people who took an action such as liking your Page  or installing your app as a result of your ad. For example, if the  same person likes and comments on a post, they will be counted  as 1 unique person."
            },
            "impressions": {
                "!type": "number",
                "!doc": "The number of times your ad was served. On our mobile apps an ad is counted as served the first time it's viewed. On all other Facebook interfaces, an ad is served the first time it's placed in a person's News Feed or each time it's placed in the right column."
            },
            "name": {
                "!type": "string",
                "!doc": "Keyword name"
            },
            "clicks": {
                "!type": "number",
                "!doc": "The total number of clicks on your ad. Depending on what you're promoting, this can include Page likes, event responses or app installs."
            },
            "cost_per_unique_click": {
                "!type": "number",
                "!doc": "The average cost per unique click for these ads, calculated as the amount spent divided by the number of unique clicks received."
            },
            "unique_actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of unique people who took an action such as liking your Page  or installing your app as a result of your ad. For example, if the  same person likes and comments on a post, they will be counted  as 1 unique person."
            },
            "unique_ctr": {
                "!type": "number",
                "!doc": "The number of people who clicked on your ad divided by the number of people you reached. For example, if you received 20 unique clicks and your ad was served to 1,000 unique people, your unique click-through rate would be 2%."
            },
            "reach": {
                "!type": "number",
                "!doc": "The number of people your ad was served to."
            },
            "cpc": {
                "!type": "number",
                "!doc": "The average cost per click for these ads, calculated as the amount spent divided by the number of clicks received."
            },
            "unique_clicks": {
                "!type": "number",
                "!doc": "The total number of unique people who have clicked on your ad. For example, if 3 people click on the same ad 5 times, it will count as 3 unique clicks."
            },
            "id": {
                "!type": "string",
                "!doc": "Keyword id"
            },
            "unique_impressions": {
                "!type": "number",
                "!doc": "The number of people your ad was served to."
            },
            "frequency": {
                "!type": "number",
                "!doc": "The average number of times your ad was served to each person."
            },
            "actions": {
                "!type": "list<AdsActionStats>",
                "!doc": "The number of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Actions include Page likes, app installs, conversions, event responses and more. For example, 2 Page likes and 2 comments would be counted as 4 actions."
            },
            "spend": {
                "!type": "number",
                "!doc": "The total amount you've spent so far."
            }
        },
        "TargetingProductAudienceSubSpec": {
            "retention_seconds": {
                "!type": "string",
                "!doc": "The number of seconds to keep the person in the audience; or The number of seconds to retain the exclusion."
            },
            "rule": {
                "!type": "string",
                "!doc": "Website Custom Audience Rule referencing one event."
            }
        },
        "RoasCohortsData": {
            "cohorts_end": {
                "!type": "string",
                "!doc": "End date for this cohort(exclusive)"
            },
            "cohorts_start": {
                "!type": "string",
                "!doc": "Start date for this cohort"
            },
            "installs": {
                "!type": "number",
                "!doc": "Number of installs for this cohort"
            },
            "revenue_cohorts": {
                "!type": "list<RoasCohortsPerCohortIntervalUnit>",
                "!doc": "ROAS breakdown for this cohort"
            },
            "spend": {
                "!type": "number",
                "!doc": "USD Amount spend for this cohort"
            }
        },
        "AdsActionStats": {
            "action_target_id": {
                "!type": "string",
                "!doc": "The destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK)."
            },
            "action_type": {
                "!type": "string",
                "!doc": "The kind of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Action types include Page likes, app installs, conversions, event responses and more.<br>Actions prepended by `app_custom_event` come from mobile [app events](/docs/app-events) and actions prepended by `offsite_conversion` come from the [Facebook Pixel](/docs/marketing-api/audiences-api/pixel). <br>`app_custom_event.fb_mobile_achievement_unlocked`: Mobile App Feature Unlocks<br>`app_custom_event.fb_mobile_activate_app`: Mobile App Starts<br>`app_custom_event.fb_mobile_add_payment_info`: Mobile App Payment Details<br>`app_custom_event.fb_mobile_add_to_cart`: Mobile App Adds To Cart<br>`app_custom_event.fb_mobile_add_to_wishlist`: Mobile App Adds to Wishlist<br>`app_custom_event.fb_mobile_complete_registration`: Mobile App Registrations<br>`app_custom_event.fb_mobile_content_view`: Mobile App Content Views<br>`app_custom_event.fb_mobile_initiated_checkout`: Mobile App Checkouts<br>`app_custom_event.fb_mobile_level_achieved`: Mobile App Achievements<br>`app_custom_event.fb_mobile_purchase`: Mobile App Purchases<br>`app_custom_event.fb_mobile_rate`: Mobile App Ratings<br>`app_custom_event.fb_mobile_search`: Mobile App Searchs<br>`app_custom_event.fb_mobile_spent_credits`: Mobile App Credit Spends<br>`app_custom_event.fb_mobile_tutorial_completion`: Mobile App Tutorial Completions<br>`app_custom_event.other`: Other Mobile App Actions<br>`app_install`: App Installs<br>`app_use`: App Uses<br>`attention_event`: Attentive Impressions<br>`checkin`: Check-ins<br>`comment`: Post Comments<br>`commerce_event.add_to_cart`: Commerce Adds to Cart<br>`commerce_event.message_to_buy`: Commerce Messages to Buy<br>`commerce_event.purchase`: Commerce Purchases<br>`commerce_event.view_content`: Commerce Product Views<br>`credit_spent`: Credit Spends<br>`dwell`: Post Dwells<br>`follow`: Question Follows<br>`full_view`: Post Full Views<br>`games.plays`: Game Plays<br>`gift_sale`: Facebook Gifts Sale<br>`leadgen.other`: Leads (Form)<br>`like`: Page Likes<br>`link_click`: Website Clicks<br>`mention`: Page Mentions<br>`messenger.accept_messenger_request`: Messenge Requests Accepted<br>`messenger.block`: Message Blocks<br>`messenger.reply`: Message Replys<br>`mobile_app_install`: Mobile App Installs<br>`new_mobile`: Newly Purchased Mobile Devices<br>`offline_conversion.add_to_cart`: Add To Cart<br>`offline_conversion.lead`: Lead<br>`offline_conversion.purchase`: Purchase<br>`offsite_conversion.add_to_cart`: Adds to Cart<br>`offsite_conversion.checkout`: Checkouts<br>`offsite_conversion.key_page_view`: Key Page Views<br>`offsite_conversion.lead`: Leads<br>`offsite_conversion.other`: Other Website Conversions<br>`offsite_conversion.registration`: Registrations<br>`photo_view`: Page Photo Views<br>`post`: Post Shares<br>`post_like`: Post Likes<br>`receive_offer`: Offer Claims<br>`rsvp`: Event Responses<br>`tab_view`: Page Tab Views<br>`video_play`: Clicks to Play Video<br>`video_view`: Video Views<br>`vote`: Question Answers<br>"
            },
            "action_carousel_card_name": {
                "!type": "string",
                "!doc": "The specific carousel card that people engaged with when they saw your ad. The cards are identified by their headlines."
            },
            "action_destination": {
                "!type": "string",
                "!doc": "The destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK)."
            },
            "28d_view": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"28 days after viewing the ad\""
            },
            "28d_click": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"28 days after clicking the ad\""
            },
            "action_video_type": {
                "!type": "string",
                "!doc": "Video metrics breakdown."
            },
            "1d_view": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"1 day after viewing the ad\""
            },
            "value": {
                "!type": "number",
                "!doc": "Metric value of default attribution window"
            },
            "action_carousel_card_id": {
                "!type": "string",
                "!doc": "The ID of the specific carousel card that people engaged with when they saw your ad."
            },
            "7d_click": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"7 days after clicking the ad\""
            },
            "7d_view": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"7 days after viewing the ad\""
            },
            "1d_click": {
                "!type": "number",
                "!doc": "Metric value of attribution window \"1 day after clicking the ad\""
            },
            "action_device": {
                "!type": "string",
                "!doc": "The device on which the conversion event you are tracking occurred. For example, \"Desktop\" if someone converted on a desktop computer. Supported values are:<br>`Other`<br>`Desktop`<br>`iPhone`<br>`iPad`<br>`iPod`<br>`Android Smartphone`<br>`Android Tablet`<br>`Offline`<br>`N/A`"
            }
        },
        "AdgroupReviewFeedback": {
            "global": {
                "!type": "map<string, string>",
                "!doc": "Reasons for review disapproval across all platforms, such as `facebook`\n        or `instagram`. Each reason has a key and a description. Some of\n        the key-description combinations can be found at [Ad review\n        feedback definitions](/docs/marketing-api/adgroup/feedback/)."
            },
            "placement_specific": {
                "!type": "AdgroupPlacementSpecificReviewFeedback",
                "!doc": "Reasons for review disapproval on a certain platform, such as\n        `facebook` or `instagram`."
            }
        },
        "AdAccountRoas": {
            "yield_3d": {
                "!type": "number",
                "!doc": "Yield 3D since install"
            },
            "yield_365d": {
                "!type": "number",
                "!doc": "Yield 365D since install"
            },
            "arpu_90d": {
                "!type": "number",
                "!doc": "ARPU 90D since install"
            },
            "revenue_30d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 30D since install"
            },
            "arpu_180d": {
                "!type": "number",
                "!doc": "ARPU 180D since install"
            },
            "yield_1d": {
                "!type": "number",
                "!doc": "Yield 1D since install"
            },
            "campaign_group_id": {
                "!type": "string",
                "!doc": "Ad campaign group for the interval to aggregate"
            },
            "revenue_90d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 90D since install"
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "Ad campaign for the interval to aggregate"
            },
            "yield_180d": {
                "!type": "number",
                "!doc": "Yield 180D since install"
            },
            "revenue_7d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 7D since install"
            },
            "date_start": {
                "!type": "string",
                "!doc": "Start date for interval"
            },
            "date_stop": {
                "!type": "string",
                "!doc": "Stop date for interval"
            },
            "revenue_3d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 3D since install"
            },
            "yield_30d": {
                "!type": "number",
                "!doc": "Yield 30D since install"
            },
            "revenue_365d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 365D since install"
            },
            "revenue_1d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 1D since install"
            },
            "arpu_7d": {
                "!type": "number",
                "!doc": "ARPU 7D since install"
            },
            "installs": {
                "!type": "number",
                "!doc": "Number of installs"
            },
            "arpu_3d": {
                "!type": "number",
                "!doc": "ARPU 3D since install"
            },
            "yield_90d": {
                "!type": "number",
                "!doc": "Yield 90D since install"
            },
            "arpu_365d": {
                "!type": "number",
                "!doc": "ARPU 365D since install"
            },
            "revenue": {
                "!type": "number",
                "!doc": "Revenue amount for interval in ad account currency"
            },
            "arpu_1d": {
                "!type": "number",
                "!doc": "ARPU 1D since install"
            },
            "revenue_180d": {
                "!type": "number",
                "!doc": "Cumulative Revenue 180D since install"
            },
            "spend": {
                "!type": "number",
                "!doc": "Amount spend in ad account currency"
            },
            "arpu_30d": {
                "!type": "number",
                "!doc": "ARPU 30D since install"
            },
            "adgroup_id": {
                "!type": "string",
                "!doc": "Ad group for the interval to aggregate"
            },
            "yield_7d": {
                "!type": "number",
                "!doc": "Yield 7D since install"
            }
        },
        "CustomAudiencesTOS": {
            "content": {
                "!type": "string",
                "!doc": "Content of the term of services"
            },
            "id": {
                "!type": "string",
                "!doc": "Id of the term of services"
            },
            "type": {
                "!type": "string",
                "!doc": "Type of the term of services"
            }
        },
        "CustomAudienceDataSource": {
            "creation_params": {
                "!type": "string",
                "!doc": "Additional information on creation source"
            },
            "sub_type": {
                "!type": "CustomAudienceDataSource_sub_type",
                "!doc": "Custom Audience subtype"
            },
            "type": {
                "!type": "CustomAudienceDataSource_type",
                "!doc": "Custom Audience type"
            }
        },
        "ProductFeedUploadErrorSample_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +ProductFeedUploadErrorSample, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +ProductFeedUploadErrorSample",
                "!doc": "Return the next ProductFeedUploadErrorSample item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +ProductFeedUploadErrorSample",
                "!doc": "Gets the current ProductFeedUploadErrorSample of the cursor"
            }
        },
        "ProductFeedUploadError": {
            "getProductFeedUploadErrorSamples": {
                "!type": "fn() -> +ProductFeedUploadErrorSample_cursor",
                "!doc": "Samples (concrete instances) of the error"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "description": {
                "!type": "string",
                "!doc": "Longer user-readable description of the error"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the product feed upload error"
            },
            "severity": {
                "!type": "ProductFeedUploadError_severity",
                "!doc": "Severity of the error"
            },
            "summary": {
                "!type": "string",
                "!doc": "Short user-readable summary of the error"
            },
            "total_count": {
                "!type": "number",
                "!doc": "Total count of errors of this type in the product feed file"
            }
        },
        "TargetingGeoLocationCustomLocation": {
            "region_id": {
                "!type": "number",
                "!doc": "Region ID"
            },
            "name": {
                "!type": "string",
                "!doc": "Name"
            },
            "latitude": {
                "!type": "number",
                "!doc": "Latitude"
            },
            "distance_unit": {
                "!type": "string",
                "!doc": "Distance unit"
            },
            "longitude": {
                "!type": "number",
                "!doc": "Longitude"
            },
            "radius": {
                "!type": "number",
                "!doc": "Radius"
            },
            "primary_city_id": {
                "!type": "number",
                "!doc": "City ID"
            },
            "country": {
                "!type": "string",
                "!doc": "Country"
            },
            "address_string": {
                "!type": "string",
                "!doc": "Address string"
            },
            "key": {
                "!type": "string",
                "!doc": "Key"
            }
        },
        "ReachEstimate": {
            "bid_estimations": {
                "!type": "[?]",
                "!doc": "A list of bid estimations for this targeting and ad account\n        combination. Each estimate contains `bid_amount_min`,\n        `bid_amount_median`, and `bid_amount_max`, representing the estimated\n        bid amount needed to reach a minimum, median, and maximum audience"
            },
            "estimate_ready": {
                "!type": "bool",
                "!doc": "If the targeting spec is ready. This is used for targeting specs\n        which contain [custom audiences](/docs/marketing-api/custom-audience-targeting),\n        which may take time to become available for use."
            },
            "unsupported": {
                "!type": "bool",
                "!doc": "Whether the estimate is unsupported"
            },
            "users": {
                "!type": "number",
                "!doc": "The estimate number of users reached by this targeting"
            }
        },
        "ConnectionObjectOpenGraphObjectProperty": {
            "name": {
                "!type": "string",
                "!doc": "Name of the Open Graph Property"
            },
            "type": {
                "!type": "string",
                "!doc": "Type of the Open Graph Property"
            }
        },
        "AdKeywordStats_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +AdKeywordStats, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +AdKeywordStats",
                "!doc": "Return the next AdKeywordStats item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +AdKeywordStats",
                "!doc": "Gets the current AdKeywordStats of the cursor"
            }
        },
        "UserLeadGenInfo_cursor": {
            "!proto": "cursor_prototype",
            "forEach": {
                "!type": "fn(f: fn(el: +UserLeadGenInfo, i: number, array: +Array), context?: ?)"
            },
            "valid": {
                "!type": "fn() -> bool",
                "!doc": "Wether the cursor is valid"
            },
            "key": {
                "!type": "fn() -> number",
                "!doc": "The current index of the cursor"
            },
            "rewind": {
                "!type": "fn() -> !this"
            },
            "next": {
                "!type": "fn() -> +UserLeadGenInfo",
                "!doc": "Return the next UserLeadGenInfo item from the cursor.",
                "!url": "https://facebook.com"
            },
            "current": {
                "!type": "fn() -> +UserLeadGenInfo",
                "!doc": "Gets the current UserLeadGenInfo of the cursor"
            }
        },
        "Adgroup": {
            "update": {
                "!type": "fn(params: Object) -> +Adgroup",
                "!doc": "Update fields on the Adgroup"
            },
            "delete": {
                "!type": "fn(params: Object) -> bool",
                "!doc": "Delete the Adgroup"
            },
            "getTargetingSentenceLines": {
                "!type": "fn() -> +TargetingSentenceLine_cursor",
                "!doc": "The targeting description sentence for this ad"
            },
            "createAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Edge to create an async job for fetching ad insights for ads"
            },
            "getAdKeywordStatss": {
                "!type": "fn() -> +AdKeywordStats_cursor",
                "!doc": "Stats of keywords of this ad"
            },
            "getAdPreviews": {
                "!type": "fn() -> +AdPreview_cursor",
                "!doc": "Preview of the ad"
            },
            "deletes": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Disassociates a set of labels from an ad"
            },
            "getAdCreatives": {
                "!type": "fn() -> +AdCreative_cursor",
                "!doc": "Creative associated with this ad"
            },
            "getReachEstimates": {
                "!type": "fn() -> +ReachEstimate_cursor",
                "!doc": "The reach estimate for this ad"
            },
            "getUserLeadGenInfos": {
                "!type": "fn() -> +UserLeadGenInfo_cursor",
                "!doc": "Leads submitted for this ad"
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "creates": {
                "!type": "fn() -> +null_cursor",
                "!doc": "Associates a set of labels with an ad"
            },
            "getAdsInsightss": {
                "!type": "fn() -> +AdsInsights_cursor",
                "!doc": "Insights on advertising performance of this ad"
            },
            "adlabels": {
                "!type": "list<AdLabel>",
                "!doc": "Ad labels associated with this ad"
            },
            "created_time": {
                "!type": "string",
                "!doc": "Created time"
            },
            "effective_status": {
                "!type": "Adgroup_effective_status",
                "!doc": "The effective status of the ad. The status could be effective either\n        because of its own status, or the status of its parent units."
            },
            "campaign_id": {
                "!type": "string",
                "!doc": "ID of the ad campaign that contains this ad"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of the ad."
            },
            "account_id": {
                "!type": "string",
                "!doc": "The ID of the ad account that this ad belongs to."
            },
            "creative": {
                "!type": "AdCreative",
                "!doc": "This field is required for create. The ID of the ad creative to be used by this ad. You can read more about creatives [here](/docs/marketing-api/adcreative). You should supply the ID within an object as follows:<br><br>`{\"creative_id\": <CREATIVE_ID>}`"
            },
            "conversion_specs": {
                "!type": "list<ConversionActionQuery>",
                "!doc": "Conversion specs"
            },
            "ad_review_feedback": {
                "!type": "AdgroupReviewFeedback",
                "!doc": "The review feedback for\n        this ad after it is reviewed."
            },
            "tracking_specs": {
                "!type": "list<ConversionActionQuery>",
                "!doc": "Tracking specs"
            },
            "campaign": {
                "!type": "AdCampaignGroup",
                "!doc": "Ad campaign that contains this ad"
            },
            "bid_info": {
                "!type": "map<string, unsigned int>",
                "!doc": "A dictionary of `{objective}:{value}` that you place on your bid, based on the `bid_type` of ad set. <br>Values are defined in your currency's minimum denomination:<br>For `bid_type=CPM`, `bid_info={'IMPRESSIONS':<value>}`<br>For `bid_type=CPC`, `bid_info={'CLICKS':<value>}`<br>For `bid_type=ABSOLUTE_OCPM`, `bid_info={'ACTIONS':<value>, 'REACH':<value>, 'CLICKS':<value>, 'SOCIAL':<value>}`<br>For `bid_type=CPA`, `bid_info={'ACTIONS':<value>}`"
            },
            "updated_time": {
                "!type": "string",
                "!doc": "Updated time"
            },
            "status": {
                "!type": "Adgroup_status",
                "!doc": "The configured status of the ad. The field returns the same value as\n      'configured_status', and is the suggested one to use."
            },
            "configured_status": {
                "!type": "Adgroup_configured_status",
                "!doc": "The configured status of the ad. Prefer using 'status' instead of\n      this."
            },
            "last_updated_by_app_id": {
                "!type": "string",
                "!doc": "Last Updated By App ID"
            },
            "bid_amount": {
                "!type": "number",
                "!doc": "Bid amount for this ad which will be used in auction instead of the ad set `bid_amount`, if specified. Any updates to the ad set `bid_amount` will overwrite this value with the new ad set value."
            },
            "recommendations": {
                "!type": "list<AdRecommendation>",
                "!doc": "If there are recommendations for this ad, this field includes them. Otherwise, this field will be null."
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of this ad."
            },
            "adset_id": {
                "!type": "string",
                "!doc": "ID of the ad set that contains the ad"
            },
            "bid_type": {
                "!type": "Adgroup_bid_type",
                "!doc": "Bid type"
            },
            "adset": {
                "!type": "AdCampaign",
                "!doc": "Ad set that contains this ad"
            }
        },
        "ConversionActionQuery": {
            "post": {
                "!type": "list<string>",
                "!doc": "Post"
            },
            "response": {
                "!type": "list<string>",
                "!doc": "Response"
            },
            "fb_pixel": {
                "!type": "list<string>",
                "!doc": "Facebook pixel id"
            },
            "conversion_id": {
                "!type": "list<string>",
                "!doc": "Rule based offsite conversion"
            },
            "question.creator": {
                "!type": "list<string>",
                "!doc": "Question creator"
            },
            "question": {
                "!type": "list<string>",
                "!doc": "Question"
            },
            "product_set_id": {
                "!type": "list<string>",
                "!doc": "Product set id"
            },
            "page.parent": {
                "!type": "list<string>",
                "!doc": "Page parent"
            },
            "post.object.wall": {
                "!type": "list<string>",
                "!doc": "Post object wall"
            },
            "post.object": {
                "!type": "list<string>",
                "!doc": "Post object"
            },
            "page": {
                "!type": "list<string>",
                "!doc": "Page"
            },
            "creative": {
                "!type": "list<string>",
                "!doc": "Creative"
            },
            "application": {
                "!type": "list<string>",
                "!doc": "Application"
            },
            "action.type": {
                "!type": "list<string>",
                "!doc": "Action type"
            },
            "object.domain": {
                "!type": "list<string>",
                "!doc": "Object domain"
            },
            "leadgen": {
                "!type": "list<string>",
                "!doc": "Leadgen"
            },
            "dataset": {
                "!type": "list<string>",
                "!doc": "Dataset"
            },
            "event.creator": {
                "!type": "list<string>",
                "!doc": "Event creator"
            },
            "post.wall": {
                "!type": "list<string>",
                "!doc": "Post wall"
            },
            "subtype": {
                "!type": "list<string>",
                "!doc": "Subtype"
            },
            "offer.creator": {
                "!type": "list<string>",
                "!doc": "Offer creator"
            },
            "event": {
                "!type": "list<string>",
                "!doc": "Event"
            },
            "offer": {
                "!type": "list<string>",
                "!doc": "Offer"
            },
            "offsite_pixel": {
                "!type": "list<string>",
                "!doc": "Offsite pixel"
            },
            "fb_pixel_event": {
                "!type": "list<string>",
                "!doc": "Facebook pixel event"
            },
            "event_type": {
                "!type": "list<string>",
                "!doc": "Event Type"
            },
            "object": {
                "!type": "list<string>",
                "!doc": "Object"
            }
        },
        "AdRecommendation": {
            "blame_field": {
                "!type": "string",
                "!doc": "Field to associate the recommendation with (optional)"
            },
            "code": {
                "!type": "number",
                "!doc": "Unique recommendation code"
            },
            "confidence": {
                "!type": "AdRecommendation_confidence",
                "!doc": "Indicator of how reliable recommendation is. Allowed values are: `HIGH`, `MEDIUM`, `LOW`"
            },
            "importance": {
                "!type": "AdRecommendation_importance",
                "!doc": "Indicator of how important recommendation is. Allowed values are: `HIGH`, `MEDIUM`, `LOW`"
            },
            "message": {
                "!type": "string",
                "!doc": "Content of the recommendation message"
            },
            "recommendation_data": {
                "!type": "AdRecommendationData",
                "!doc": "Additional data associated with the recommendation. Returned fields can vary depending on the recommendation code."
            },
            "title": {
                "!type": "string",
                "!doc": "Recommendation title"
            }
        },
        "TargetingProductAudienceSpec": {
            "exclusions": {
                "!type": "list<TargetingProductAudienceSubSpec>",
                "!doc": "A set of events that remove a person from targeting"
            },
            "inclusions": {
                "!type": "list<TargetingProductAudienceSubSpec>",
                "!doc": "A set of events to target"
            },
            "product_set_id": {
                "!type": "string",
                "!doc": "The Product Set to target with this audience"
            }
        },
        "ConnectionObjectOpenGraphAction": {
            "connected_objects": {
                "!type": "list<string>",
                "!doc": "The connected objects of this Open Graph Action"
            },
            "display_name": {
                "!type": "string",
                "!doc": "Display name of this Open Graph Object"
            },
            "name": {
                "!type": "string",
                "!doc": "Name of this Open Graph Object"
            },
            "properties": {
                "!type": "list<ConnectionObjectOpenGraphObjectProperty>",
                "!doc": "Properties of this Open Graph Object"
            }
        },
        "ConnectionObject": {
            "app_installs_tracked": {
                "!type": "bool",
                "!doc": "If app installs are tracked"
            },
            "object_store_urls": {
                "!type": "map",
                "!doc": "The URL of the object store"
            },
            "native_app_targeting_ids": {
                "!type": "map",
                "!doc": "The IDs of the apps on the Apple App Store"
            },
            "is_game": {
                "!type": "bool",
                "!doc": "Whether object is a game"
            },
            "icon_url": {
                "!type": "string",
                "!doc": "The url of the icon"
            },
            "name": {
                "!type": "string",
                "!doc": "The name of this Facebook object"
            },
            "event_parent_page_name": {
                "!type": "string",
                "!doc": "Name of the event parent Page"
            },
            "og_objects": {
                "!type": "list<ConnectionObjectOpenGraphObject>",
                "!doc": "If the Facebook object is an application, an array of Open Graph objects it implements (if any)"
            },
            "supported_platforms": {
                "!type": "list<unsigned int>",
                "!doc": "If the Facebook object is an application, an array of integers representing which platforms are supported by the app. Here is a list of the supported platforms:<br>`1`: Website with FB Login<br>`2`: Canvas app<br>`3`: Mobile Web<br>`4`: Native iOS (with iPhone store ID)<br>`5`: Native iOS (with iPad store ID)<br>`6`: Native Android (with package and class name)<br>"
            },
            "url": {
                "!type": "string",
                "!doc": "The URL of this Facebook object"
            },
            "cpa_access": {
                "!type": "map<string, bool>",
                "!doc": "Info about CPA (bid type) access"
            },
            "event_is_viewer_admin": {
                "!type": "bool",
                "!doc": "Whether the viewer is an admin of the event"
            },
            "name_with_location_descriptor": {
                "!type": "string",
                "!doc": "The name of this Facebook Page with its location and/or global brand descriptor"
            },
            "event_start_timestamp": {
                "!type": "number",
                "!doc": "The start time of the event"
            },
            "native_app_store_ids": {
                "!type": "map",
                "!doc": "The ID of the app on the Apple App Store"
            },
            "og_namespace": {
                "!type": "string",
                "!doc": "The namespace of the Facebook application object (if any)"
            },
            "og_actions": {
                "!type": "list<ConnectionObjectOpenGraphAction>",
                "!doc": "If the Facebook object is an application, an array of Open Graph actions it implements (if any)"
            },
            "checkin_capable": {
                "!type": "bool",
                "!doc": "Capable of checking in"
            },
            "type": {
                "!type": "number",
                "!doc": "The type of this Facebook object. Here are the types:<br>`1`: Page<br>`2`: Application<br>`3`: Event<br>`6`: Place<br>`7`: Domain<br>`8`: Status<br>`10`: Video<br>`11`: Share<br>`12`: Photo<br>`13`: Mobile Store Object<br>`14`: Coupon<br>"
            },
            "website": {
                "!type": "string",
                "!doc": "The website"
            },
            "logo_url": {
                "!type": "string",
                "!doc": "The url of the logo"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of this Facebook object"
            },
            "event_parent_page_id": {
                "!type": "string",
                "!doc": "ID of the event parent Page"
            },
            "picture": {
                "!type": "string",
                "!doc": "The link to the picture that corresponds to this object"
            },
            "tabs": {
                "!type": "map",
                "!doc": "An map of links to the tabs of the Page if the object is a Facebook Page"
            }
        },
        "Transaction": {
            "tracking_id": {
                "!type": "string",
                "!doc": "A 10-digit alphanumeric string which may be used to identify the payment."
            },
            "charge_type": {
                "!type": "string",
                "!doc": "Type of charge involved in the transaction"
            },
            "provider_amount": {
                "!type": "TransactionCurrencyAmount",
                "!doc": "Monetary amount charged to the user for this transaction"
            },
            "product_type": {
                "!type": "Transaction_product_type",
                "!doc": "The type of ads included in this transaction"
            },
            "account_id": {
                "!type": "string",
                "!doc": "ID of the source Ad Account"
            },
            "time": {
                "!type": "number",
                "!doc": "Time at which the transaction was created"
            },
            "billing_start_time": {
                "!type": "number",
                "!doc": "Start time of the transaction's billing period"
            },
            "payment_option": {
                "!type": "string",
                "!doc": "Method used to pay for the transaction"
            },
            "fatura_id": {
                "!type": "number",
                "!doc": "ID for the Brazilian invoice (if transaction was made in Brazil)\n             else 0"
            },
            "status": {
                "!type": "string",
                "!doc": "Current status of the transaction"
            },
            "billing_end_time": {
                "!type": "number",
                "!doc": "End time of the transaction's billing period"
            },
            "app_amount": {
                "!type": "TransactionCurrencyAmount",
                "!doc": "Monetary amount given to the app for this transaction"
            },
            "id": {
                "!type": "string",
                "!doc": "ID of the transaction"
            }
        },
        "LeadGenData": {
            "getUserLeadGenInfos": {
                "!type": "fn() -> +UserLeadGenInfo_cursor",
                "!doc": "The leads that were submitted to this lead gen data."
            },
            "#get": {
                "!type": "fn() -> +null_cursor"
            },
            "follow_up_action_text": {
                "!type": "string",
                "!doc": "The displayed label on the follow up action when the user completes the form."
            },
            "created_time": {
                "!type": "string",
                "!doc": "The time the LeadGenData was created."
            },
            "is_continued_flow": {
                "!type": "bool",
                "!doc": "Whether or not this is acontinued flow form."
            },
            "leads_count": {
                "!type": "number",
                "!doc": "Total number of Leads for a given Form."
            },
            "qualifiers": {
                "!type": "list<Object>",
                "!doc": "The questions used in this form."
            },
            "cusomized_tcpa_content": {
                "!type": "string",
                "!doc": "The customized tcpa content created by user in form builder."
            },
            "page_id": {
                "!type": "string",
                "!doc": "The ID of the page that this form belongs to."
            },
            "name": {
                "!type": "string",
                "!doc": "The name of LeadGen Ad Form name."
            },
            "page": {
                "!type": "Object",
                "!doc": "The page that this form belongs to."
            },
            "leadgen_export_csv_url": {
                "!type": "string",
                "!doc": "The URL where the page admin can export the leads as a CSV."
            },
            "privacy_policy_url": {
                "!type": "string",
                "!doc": "The URL to the advertiser's privacy policy."
            },
            "tcpa_compliance": {
                "!type": "bool",
                "!doc": "Whether or not the form is TCPA Compliant. Required for capturing leads containing phone numbers."
            },
            "locale": {
                "!type": "string",
                "!doc": "The locale of contents in this lead gen ad."
            },
            "id": {
                "!type": "string",
                "!doc": "The ID of the Lead Ad Form."
            },
            "follow_up_action_url": {
                "!type": "string",
                "!doc": "The URL that the `follow_up_action_text` will take them to on click."
            }
        },
        "AdCreativeObjectStorySpec": {
            "instagram_actor_id": {
                "!type": "string",
                "!doc": "The Instagram user account that the story will be posted to"
            },
            "link_data": {
                "!type": "AdCreativeLinkData",
                "!doc": "The spec for a link page post or [carousel ad\n        ](/docs/marketing-api/guides/carousel-ads/)"
            },
            "offer_data": {
                "!type": "AdCreativeOfferData",
                "!doc": "The spec for an offer page post."
            },
            "page_id": {
                "!type": "string",
                "!doc": "ID of a Facebook page. An unpublished page post will be created on\n        this page. User must have [Admin or Editor role\n        ](https://www.facebook.com/help/323502271070625/) for this page."
            },
            "photo_data": {
                "!type": "AdCreativePhotoData",
                "!doc": "The spec for a photo page post."
            },
            "template_data": {
                "!type": "AdCreativeLinkData",
                "!doc": "The spec for a template link page post as used in [Dynamic Product\n        Ads](/docs/marketing-api/dynamic-product-ads/)."
            },
            "text_data": {
                "!type": "AdCreativeTextData",
                "!doc": "The spec for a text page post."
            },
            "video_data": {
                "!type": "AdCreativeVideoData",
                "!doc": "The spec for a video page post."
            }
        }
    },
    "adaccount": "AdAccount"
}