# from flask import Flask, request, jsonify
# import google.generativeai as genai
# import PIL.Image
# import json
# from dateutil import parser
# from fuzzywuzzy import fuzz

# app = Flask(__name__)

# # Configure Google Gemini AI
# genai.configure(api_key="AIzaSyA7bt67SU7MUgGaAmyn6NgNxRJoIQYwR8k")

# def normalize_date(date_str):
#     try:
#         parsed_date = parser.parse(date_str)
#         return parsed_date.strftime("%d/%m/%Y")
#     except ValueError:
#         return "Invalid Date"

# def extract_text_details(text):
#     prompt = (
#         f"Extract the following details from this text:\n{text}\n\n"
#         "- Product Name:\n- Quantity:\n- Store Name:\n- Purchase Date:\n- Price:"
#     )
#     response = genai.GenerativeModel("models/gemini-2.0-flash").generate_content(prompt)
#     extracted_values = [line.split(":")[-1].strip() for line in response.text.split("\n") if ":" in line]
#     return extracted_values

# def extract_image_details(image_path):
#     image = PIL.Image.open(image_path)
#     img_prompt = (
#         "Extract the following details from this receipt in JSON format (not as a string):\n"
#         "- Date\n- Store Name\n- List of Products with each product having Name, Amount, Quantity\n- Total Amount"
#     )
#     response = genai.GenerativeModel("models/gemini-2.0-flash").generate_content([img_prompt, image])
#     try:
#         extracted_data = json.loads(response.text.strip("```json").strip("```").strip())
#         return {
#             "date": normalize_date(extracted_data.get("Date", "Not Found")),
#             "store_name": extracted_data.get("Store Name", "Not Found").lower(),
#             "products": extracted_data.get("Products", []),
#             "total_amount": extracted_data.get("Total Amount", "Not Found")
#         }
#     except json.JSONDecodeError:
#         return None

# def is_product_match(product_list, search_query, price, threshold=60):
#     search_query = search_query.lower()
#     for product in product_list:
#         similarity = fuzz.partial_ratio(search_query, product['Name'].lower())
#         if similarity >= threshold and int(price) == int(product['Amount']):
#             return True, product
#     return False, None

# def authenticate_bill(text, image_path):
#     text_values = extract_text_details(text)
#     image_details = extract_image_details(image_path)

#     if not image_details:
#         return False, "Image extraction failed"

#     extracted_date = image_details["date"]
#     store_name = image_details["store_name"]
#     products = image_details["products"]

#     if not text_values or len(text_values) < 5:
#         return False, "Text extraction failed"

#     product_name = text_values[0].lower()
#     price = text_values[4]
#     purchase_date = normalize_date(text_values[3])

#     found, matched_product = is_product_match(products, product_name, price)

#     if found and extracted_date == purchase_date and store_name == text_values[2].lower():
#         return True, "Bill authenticated"

#     return False, "Authentication failed"

# @app.route('/authenticate', methods=['POST'])
# def authenticate():
#     data = request.json
#     text = data.get("text", "")
#     image_path = data.get("image_path", "")

#     result, message = authenticate_bill(text, image_path)
#     return jsonify({"success": result, "message": message})

# if __name__ == '__main__':
#     app.run(debug=True)
import google.generativeai as genai
import PIL.Image
import json
import requests
from io import BytesIO
from dateutil import parser
from fuzzywuzzy import fuzz

# Configure Google Gemini AI
genai.configure(api_key="AIzaSyA7bt67SU7MUgGaAmyn6NgNxRJoIQYwR8k")

def normalize_date(date_str):
    """Normalize date format to DD/MM/YYYY"""
    try:
        parsed_date = parser.parse(date_str)
        return parsed_date.strftime("%d/%m/%Y")
    except ValueError:
        return "Invalid Date"

def fetch_image_from_url(image_url):
    """Fetch image from Cloudinary URL and return PIL Image"""
    try:
        response = requests.get(image_url)
        image = PIL.Image.open(BytesIO(response.content))
        return image
    except Exception as e:
        print("❌ Error fetching image:", e)
        return None

def extract_text_details(text):
    """Extract details from text using Gemini AI"""
    prompt = (
        f"Extract the following details from this text  and in price just take integer:\n{text}\n\n"
        "- Product Name:\n- Store Name:\n- Purchase Date:\n- Price:"
    )
    import re
    response = genai.GenerativeModel("models/gemini-2.0-flash").generate_content(prompt)
    extracted_values = [re.sub(r"[*\n]", "", line).split("**")[-1].split(":")[-1].strip() for line in response.text.split("\n") if "**" in line]
    
    return extracted_values

def extract_image_details(image_url):
    """Extract details from image using Gemini AI"""
    image = fetch_image_from_url(image_url)
    if image is None:
        return None

    img_prompt = (
        "Extract the following details from this receipt in JSON format (not as a string):\n"
        "- Date\n- Store Name\n- List of Products with each product having Name, Amount, Quantity\n- Total Amount"
    )
    response = genai.GenerativeModel("models/gemini-2.0-flash").generate_content([img_prompt, image])

    try:
        extracted_data = json.loads(response.text.strip("```json").strip("```").strip())
        return {
            "date": normalize_date(extracted_data.get("Date", "Not Found")),
            "store_name": extracted_data.get("Store Name", "Not Found").lower(),
            "products": extracted_data.get("Products", []),
            "total_amount": extracted_data.get("Total Amount", "Not Found")
        }
    except json.JSONDecodeError:
        return None

def is_product_match(product_list, search_query, price, threshold=60):
    """Check if the product from text matches any product in the bill"""
    search_query = search_query.lower()

    for product in product_list:
        similarity = fuzz.partial_ratio(search_query, product['Name'].lower())
        print(similarity,product['Amount'],price)
        if similarity >= threshold and int(price) == int(product['Amount']):
            return True, product
    return False, None

def authenticate_bill(text, image_url):
    """Main function to authenticate the bill"""
    text_values = extract_text_details(text)
    image_details = extract_image_details(image_url)
    # print(text_values)
    # print(image_details)
    if not image_details:
        return False, "Image extraction failed"

    extracted_date = normalize_date(image_details["date"])
    store_name = image_details["store_name"]
    products = image_details["products"]

    print("🔹 Extracted Products:", products)
    print(extracted_date, store_name)
    print(text_values)
    if not text_values or len(text_values) < 4:
        print("❌ Text extraction failed")
        return False, "Text extraction failed"

    product_name = text_values[0].lower()
    price = text_values[3]
    purchase_date = normalize_date(text_values[2])

    found, matched_product = is_product_match(products, product_name, price)
    print(found)
    print(extracted_date,purchase_date)
    if found and extracted_date == purchase_date and store_name == text_values[1].lower():
        return True, matched_product
    
    return False, "Authentication failed"

# Flask Server
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/authenticate", methods=["POST"])
def authenticate():
    data = request.json
    text = data.get("postText", "")
    image_url = data.get("uploadedUrl", "")

    if not text or not image_url:
        return jsonify({"success": False, "message": "Missing text or image URL"}), 400

    result, message = authenticate_bill(text, image_url)
    return jsonify({"success": result, "message": message})

if __name__ == "__main__":
    app.run(debug=True, port=5000)