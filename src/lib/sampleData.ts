export const SAMPLE_CSV = `# Home ZIP Code: 94102
transaction_id,merchant_name,description,mcc,amount,date,zip_code
txn_001,STARBUCKS COFFEE #1234,Coffee and pastry purchase,5814,12.45,2025-08-15,94102
txn_002,WHOLE FOODS MARKET,Weekly grocery shopping,5411,156.78,2025-08-16,94102
txn_003,EQUINOX FITNESS,Monthly gym membership fee,7997,200.00,2025-08-15,94102
txn_004,SHELL OIL 78945,Gasoline fill-up,5541,45.20,2025-08-17,94103
txn_005,PAYPAL*TICKETMASTR,Concert tickets - Sabrina Carpenter,7996,287.50,2025-08-17,
txn_006,AplPAY UBER EATS,Food delivery via Apple Pay,5814,45.30,2025-08-18,
txn_007,AMAZON.COM,Online shopping - books,5942,34.99,2025-08-18,
txn_008,PAYPAL*ETSY,Handmade home decor,5969,78.25,2025-08-19,
txn_009,DELTA AIR LINES,Flight to NYC JFK,4511,450.00,2025-08-12,94102
txn_010,MARRIOTT HOTELS,Hotel stay 3 nights,7011,600.00,2025-08-13,10036
txn_011,CVS PHARMACY,Prescription medication,5912,28.50,2025-08-19,94102
txn_012,LULULEMON,Athletic wear purchase,5651,89.00,2025-08-20,94102
txn_013,CHEWY.COM,Dog food and supplies,5995,67.89,2025-08-21,94102
txn_014,NETFLIX.COM,Monthly streaming subscription,4899,15.99,2025-08-15,
txn_015,UBER TRIP,Ride to downtown,4121,23.50,2025-08-22,94102
txn_016,CHIPOTLE MEXICAN GRILL,Lunch burrito bowl,5814,11.75,2025-08-22,94102
txn_017,TARGET STORES,Home goods and groceries,5411,127.34,2025-08-23,94103
txn_018,AplPAY APPLE.COM,App Store purchases via Apple Pay,5734,4.99,2025-08-15,
txn_019,LA FITNESS,Gym membership renewal,7997,29.99,2025-08-24,94102
txn_020,SEPHORA,Cosmetics and skincare,5977,156.50,2025-08-25,94102
txn_021,PETSMART,Pet supplies,5995,43.20,2025-08-26,94103
txn_022,SPOTIFY,Premium music subscription,4899,10.99,2025-08-15,
txn_023,PAYPAL*STUBHUB,Broadway show tickets,7922,195.00,2025-08-26,
txn_024,SOUTHWEST AIRLINES,Flight booking,4511,289.00,2025-08-27,
txn_025,WALGREENS,Pharmacy and sundries,5912,34.67,2025-08-28,94102
txn_026,PANERA BREAD,Lunch and coffee,5814,18.45,2025-08-29,94102
txn_027,HOME DEPOT,Home improvement supplies,5211,234.56,2025-08-30,94103
txn_028,TRADER JOES,Grocery shopping,5411,89.23,2025-08-31,94102
txn_029,NORDSTROM,Clothing purchase,5651,178.90,2025-09-01,94102
txn_030,PETCO,Dog treats and toys,5995,28.40,2025-09-02,94103
txn_031,AMC THEATRES,Movie tickets and snacks,7832,42.00,2025-09-03,94102
txn_032,DOORDASH,Food delivery,5814,35.60,2025-09-04,94102
txn_033,SHELL OIL,Gas station,5541,52.30,2025-09-05,94103
txn_034,COSTCO WHOLESALE,Bulk shopping,5411,198.76,2025-09-06,94102
txn_035,BLUE APRON,Meal kit delivery,5814,71.94,2025-08-08,
txn_036,EQUINOX SPA,Spa treatment,7298,150.00,2025-09-07,94102
txn_037,BARNES & NOBLE,Books purchase,5942,45.80,2025-09-08,94102
txn_038,VETERINARY CLINIC,Dog annual checkup,0742,185.00,2025-09-09,94103
txn_039,HULU,Streaming subscription,4899,14.99,2025-08-15,
txn_040,LYFT RIDE,Ride to airport,4121,35.80,2025-09-10,94102
txn_041,OLIVE GARDEN,Dinner for two,5812,67.50,2025-09-11,94103
txn_042,IKEA,Furniture purchase,5712,345.00,2025-09-12,94102
txn_043,ULTA BEAUTY,Beauty products,5977,92.30,2025-09-13,94102
txn_044,PETFOOD EXPRESS,Premium dog food,5995,54.99,2025-09-14,94103
txn_045,HBO MAX,Streaming subscription,4899,15.99,2025-08-15,
txn_046,STARBUCKS COFFEE,Morning coffee,5814,6.75,2025-09-15,94102
txn_047,RITE AID PHARMACY,Over-the-counter meds,5912,18.90,2025-09-16,94103
txn_048,NIKE STORE,Running shoes,5661,129.99,2025-09-17,94102
txn_049,HILTON HOTELS,Business travel accommodation,7011,425.00,2025-09-18,94102
txn_050,WHOLE FOODS,Organic groceries,5411,143.56,2025-09-19,94102
txn_051,PLANET FITNESS,Monthly membership,7997,22.99,2025-09-15,94102
txn_052,WARBY PARKER,Prescription glasses,5995,195.00,2025-09-20,94102
txn_053,GRUBHUB,Dinner delivery,5814,42.30,2025-09-21,
txn_054,LOWES,Garden supplies,5211,87.45,2025-09-22,94103
txn_055,SHELL OIL LOCAL,Gas station home,5541,48.20,2025-09-23,94102
txn_056,DELTA AIR LINES NYC,Flight to LaGuardia NYC,4511,520.00,2025-09-24,
txn_057,MARRIOTT TIMES SQUARE,Hotel check-in NYC 4 nights,7011,950.00,2025-09-24,10036
txn_058,SHELL OIL QUEENS NY,Gas rental car Queens,5541,58.30,2025-09-24,11101
txn_059,UBER NYC,Ride from airport to hotel,4121,45.80,2025-09-24,10036
txn_060,STARBUCKS MANHATTAN,Coffee in Times Square,5814,8.95,2025-09-25,10036
txn_061,JOES PIZZA NYC,Lunch Manhattan,5814,22.50,2025-09-25,10001
txn_062,BROADWAY THEATRE,Hamilton tickets,7922,350.00,2025-09-25,10036
txn_063,UBER NYC,Ride to Broadway,4121,18.40,2025-09-25,10036
txn_064,SHELL OIL BROOKLYN,Gas fill-up Brooklyn,5541,62.15,2025-09-26,11211
txn_065,WHOLE FOODS MANHATTAN,Groceries for hotel,5411,45.70,2025-09-26,10001
txn_066,MET MUSEUM NYC,Museum admission,8999,30.00,2025-09-26,10028
txn_067,LYFT NYC,Ride to museum,4121,22.30,2025-09-26,10028
txn_068,CENTRAL PARK CAFE,Lunch in park,5814,28.60,2025-09-27,10024
txn_069,UBER NYC,Ride to airport,4121,52.90,2025-09-28,11101
txn_070,DELTA AIR LINES,Return flight home,4511,480.00,2025-09-28,
txn_071,SHELL OIL LOCAL,Gas station home,5541,49.10,2025-09-29,94102
txn_072,STARBUCKS COFFEE,Morning coffee home,5814,6.75,2025-09-30,94102`;

export const SAMPLE_CSV_SPORTS_WELLNESS = `# Home ZIP Code: 78701
transaction_id,merchant_name,description,mcc,amount,date,zip_code
txn_s001,LULULEMON ATHLETICA,Yoga pants and sports bra,5655,189.00,2025-08-15,
txn_s002,WHOLE FOODS MARKET,Organic groceries and supplements,5411,143.67,2025-08-15,78701
txn_s003,EQUINOX AUSTIN,Monthly gym membership premium,7997,250.00,2025-08-15,
txn_s004,JUICE LAND,Post-workout green juice,5814,12.50,2025-08-16,
txn_s005,GNC LIVE WELL,Protein powder and vitamins,5499,87.45,2025-08-16,
txn_s006,REI CO-OP,Hiking boots and trail gear,5941,234.99,2025-08-17,78701
txn_s007,NIKE STORE AUSTIN,Running shoes,5661,159.99,2025-08-17,
txn_s008,BARRYS BOOTCAMP,5-class package,7997,150.00,2025-08-18,
txn_s009,SNAP KITCHEN,Healthy meal prep 5 days,5814,89.50,2025-08-18,
txn_s010,VITAMIN SHOPPE,Pre-workout and BCAAs,5499,62.30,2025-08-19,
txn_s011,TRADER JOES,Healthy snacks and produce,5411,67.89,2025-08-19,78701
txn_s012,SOULCYCLE AUSTIN,Cycling class 3-pack,7997,85.00,2025-08-20,
txn_s013,ATHLETA,Workout leggings and tank tops,5655,156.50,2025-08-20,
txn_s014,PICNIK AUSTIN,Protein coffee and breakfast,5814,15.75,2025-08-21,
txn_s015,DICKS SPORTING GOODS,Dumbbells and resistance bands,5941,178.90,2025-08-21,78701
txn_s016,WHOLE FOODS MARKET,Organic meat and vegetables,5411,124.56,2025-08-22,78701
txn_s017,LIFETIME FITNESS,Personal training session,7997,95.00,2025-08-22,
txn_s018,SMOOTHIE KING,Post-workout protein smoothie,5814,9.95,2025-08-23,
txn_s019,UNDER ARMOUR,Athletic wear and socks,5655,98.40,2025-08-23,
txn_s020,SPROUTS FARMERS MARKET,Organic produce and supplements,5411,89.23,2025-08-24,
txn_s021,AUSTIN ROCK GYM,Day pass and gear rental,7997,45.00,2025-08-24,
txn_s022,ROGUE FITNESS AUSTIN,Kettlebells and yoga mat,5941,267.80,2025-08-25,78701
txn_s023,ELEMENTS MASSAGE,Deep tissue massage 90min,7298,145.00,2025-08-25,
txn_s024,WHOLE FOODS MARKET,Supplements and protein bars,5411,78.90,2025-08-26,78701
txn_s025,ORANGE THEORY FITNESS,Monthly membership,7997,189.00,2025-08-26,
txn_s026,PATAGONIA AUSTIN,Running jacket and shorts,5655,198.50,2025-08-27,
txn_s027,FACTOR MEALS,Meal delivery service,5814,119.94,2025-08-27,
txn_s028,SEPHORA,Sport sunscreen and skincare,5977,67.30,2025-08-28,
txn_s029,YOGA YOGA AUSTIN,10-class pass,7997,120.00,2025-08-28,
txn_s030,JUICE LAND,Acai bowl and smoothie,5814,16.50,2025-08-29,
txn_s031,REI CO-OP,Camping gear and backpack,5941,345.67,2025-08-29,
txn_s032,WHOLE FOODS MARKET,Weekly organic groceries,5411,156.78,2025-08-30,78701
txn_s033,LULULEMON ATHLETICA,Sports bras and headbands,5655,134.00,2025-08-30,
txn_s034,SHELL OIL,Gas fill-up,5541,52.30,2025-08-31,78701
txn_s035,AUSTIN CHIROPRACTIC,Adjustment and therapy,8049,95.00,2025-08-31,
txn_s036,SNAP KITCHEN,Lunch bowls 5-pack,5814,67.50,2025-09-01,
txn_s037,DICKS SPORTING GOODS,Foam roller and stretch bands,5941,89.99,2025-09-01,78701
txn_s038,RESTORE HYPER WELLNESS,Cryotherapy session,7298,65.00,2025-09-02,
txn_s039,TRADER JOES,Healthy snacks and produce,5411,73.45,2025-09-02,
txn_s040,NIKE STORE AUSTIN,Training shoes and apparel,5661,198.00,2025-09-03,
txn_s041,BARRYS BOOTCAMP,Single class drop-in,7997,34.00,2025-09-03,
txn_s042,PICNIK AUSTIN,Coffee and breakfast burrito,5814,14.30,2025-09-04,
txn_s043,GNC LIVE WELL,Multivitamins and fish oil,5499,54.20,2025-09-04,
txn_s044,WHOLE FOODS MARKET,Organic groceries and juice,5411,132.90,2025-09-05,78701
txn_s045,ATHLETA,Running shorts and top,5655,112.50,2025-09-05,
txn_s046,SOULCYCLE AUSTIN,Single ride,7997,32.00,2025-09-06,
txn_s047,SMOOTHIE KING,Green smoothie,5814,10.50,2025-09-06,
txn_s048,VITAMIN SHOPPE,Protein bars and collagen,5499,48.90,2025-09-07,
txn_s049,SPROUTS FARMERS MARKET,Organic produce and nuts,5411,95.67,2025-09-07,
txn_s050,REI CO-OP,Hydration pack and water bottle,5941,87.50,2025-09-08,
txn_s051,ELEMENTS MASSAGE,Sports massage 60min,7298,95.00,2025-09-08,
txn_s052,LULULEMON ATHLETICA,Yoga mat and blocks,5655,78.00,2025-09-09,
txn_s053,FACTOR MEALS,Weekly meal delivery,5814,119.94,2025-09-09,
txn_s054,WHOLE FOODS MARKET,Supplements and vitamins,5411,89.45,2025-09-10,78701
txn_s055,ORANGE THEORY FITNESS,Extra class fee,7997,18.00,2025-09-10,
txn_s056,UNDER ARMOUR,Compression wear,5655,87.30,2025-09-11,
txn_s057,JUICE LAND,Protein smoothie bowl,5814,13.75,2025-09-11,
txn_s058,DICKS SPORTING GOODS,Resistance bands set,5941,45.99,2025-09-12,78701
txn_s059,SHELL OIL,Gas station,5541,48.70,2025-09-12,78701
txn_s060,HILTON DALLAS,Weekend trip hotel 2 nights,7011,320.00,2025-09-13,75201
txn_s061,SHELL OIL DALLAS,Gas fill-up Dallas,5541,55.40,2025-09-13,75201
txn_s062,WHOLE FOODS DALLAS,Groceries while traveling,5411,45.60,2025-09-14,75201
txn_s063,YOGA STUDIO DALLAS,Drop-in class,7997,25.00,2025-09-14,
txn_s064,SHELL OIL,Gas return home,5541,51.20,2025-09-15,78701
txn_s065,TRADER JOES,Weekly groceries,5411,82.35,2025-09-16,78701
txn_s066,BARRYS BOOTCAMP,Class package renewal,7997,150.00,2025-09-16,
txn_s067,NIKE STORE AUSTIN,Athletic socks and headband,5661,45.50,2025-09-17,
txn_s068,SNAP KITCHEN,Healthy dinner meals,5814,78.00,2025-09-17,
txn_s069,GNC LIVE WELL,Post-workout recovery drink,5499,36.80,2025-09-18,
txn_s070,WHOLE FOODS MARKET,Organic groceries weekly,5411,167.89,2025-09-19,78701
txn_s071,RESTORE HYPER WELLNESS,IV therapy session,7298,175.00,2025-09-20,
txn_s072,LULULEMON ATHLETICA,Workout jacket,5655,148.00,2025-09-21,
txn_s073,PICNIK AUSTIN,Breakfast and coffee,5814,16.90,2025-09-22,
txn_s074,ATHLETA,Yoga pants and bra,5655,134.50,2025-09-23,
txn_s075,WHOLE FOODS MARKET,Final weekly groceries,5411,145.23,2025-09-24,78701`;

export const PILLAR_COLORS: Record<string, string> = {
  "Sports & Active Living": "#3b82f6",
  "Health & Wellness": "#10b981",
  "Food & Dining": "#f59e0b",
  "Travel & Exploration": "#8b5cf6",
  "Home & Living": "#ec4899",
  "Style & Beauty": "#f43f5e",
  "Pets": "#06b6d4",
  "Entertainment & Culture": "#6366f1",
  "Technology & Digital Life": "#ef4444",
  "Family & Community": "#14b8a6",
  "Financial & Aspirational": "#a855f7",
  "Miscellaneous & Unclassified": "#64748b"
};

export const LIFESTYLE_PILLARS = [
  "Sports & Active Living",
  "Health & Wellness",
  "Food & Dining",
  "Travel & Exploration",
  "Home & Living",
  "Style & Beauty",
  "Pets",
  "Entertainment & Culture",
  "Technology & Digital Life",
  "Family & Community",
  "Financial & Aspirational",
  "Miscellaneous & Unclassified"
];
