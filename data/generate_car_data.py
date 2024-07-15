import csv
import random
from datetime import datetime, timedelta
import json
           
# Generate data 
NUM_CARS = 10000
NUM_ORDERS = 1000

# Create the CSV file
OUTPUT_FILE1 = "cars.csv"
OUTPUT_FILE2 = "orders.csv"
OUTPUT_FILE3 = "orders_cars.csv"

used = [True, False]
make_model = ["Audi A3", "Audi A6", "Honda Accord", "Nissan Altima", "Ford Bronco", "Toyota Camry", "Toyota Corolla","Dodge Challenger", "Jeep Cherokee", "Honda Civic"
              ,"Cadillac Escalade", "Ford Escape", "Ford Expedition", "Toyota Land Cruiser", "Toyota RAV4", "Toyota Sienna", "Chevrolet Tahoe", "Jeep Wrangler", "Toyota 4Runner"]
color = ["Red", "White", "Green", "Blue", "Black", "Yellow", "Grey", "Maroon", "Light Blue"]
# Generate data rows for cars
data_rows_cars = []
for i in range(1, NUM_CARS + 1):
    car_id = i
    car_price = random.randint(5000,150000)
    car_quantity = random.randint(1,50)
    car_year = random.randint(1998,2024)
    car_used = True
    if car_year >2022:
        car_used = False
    car_mm = random.choice(make_model)
    car_color = random.choice(color)

    # Create the data row
    data_row = [
        car_id,
        car_price,
        car_quantity,
        car_year,
        car_used,
        car_mm,
        car_color
    ]
    #print(data_row)

    # Add the data row to the list
    data_rows_cars.append(data_row)

street = ["Elm", "Maple", "Walnut", "Thornberry", "Main", "Water", "Hudson", "Acorn Court", "Bell Terrace", "Bexley Place", "Caulk Court", "Cypress Point", "Duval Court",
          "Gaskin Place", "Gatsby Lane", "Iron Oak Way", "Iva Place", "Lock Street", "Miranda Way", "Mistwood Lane", "Moore Terrace", "Mission Hills Trail", "Paradise Drive",
           "Pardo Place", "Rogers Road","Rose Path", "Sherwood Street", "Talley Ridge Drive", "Swallow Court", "Waalker Loop", "Wade Meadow Lane", "Ware Way", "Yuma Place" ]
state_names = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District ", "of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

# Generate data rows for orders
data_rows_orders = []
for i in range(1, NUM_ORDERS + 1):
    order_id = i
    order_timestamp = datetime.now() - timedelta(days=i, seconds=random.randint(1,59))
    order_payment = random.randint(1000000000000000, 9999999999999999)
    order_address_num = random.randint (1,999)
    order_address_street = random.choice(street)
    order_address_state = random.choice(state_names)
    order_zip = random.randint(10000,99999)
    order_completed = random.choice([True, False])

    # Create the data row
    data_row = [
        order_id,
        order_timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        order_payment,
        order_address_num,
        order_address_street,
        order_address_state,
        order_zip,
        order_completed
    ]
    #print(data_row)

    # Add the data row to the list
    data_rows_orders.append(data_row)

data_rows_orders_cars = []
for order in data_rows_orders:
    order_num_cars = random.randint(1,4)
    for i in range(order_num_cars):
        data_row = [
            order[0],
            random.randint(1,NUM_CARS)
        ]
        data_rows_orders_cars.append(data_row)
    


# Write the data to the CSV file
with open(OUTPUT_FILE1, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["car_id","car_price", "car_quantity", "car_year", "car_used", "car_mm", "car_color"]
    )
    writer.writerows(data_rows_cars)

with open(OUTPUT_FILE2, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["order_id","order_timestamp","order_payment", "order_address_num", "order_address_street", "order_address_state", "order_zip", "order_completed"]
    )
    writer.writerows(data_rows_orders)


with open(OUTPUT_FILE3, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["order_id","car_id"]
    )
    writer.writerows(data_rows_orders_cars)    

print("Data generation complete.")

