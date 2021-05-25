from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.utils.aws import allowed_file, get_unique_filename, upload_file_to_s3

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods=['POST'])
def add_image():
    if 'image' not in request.files:
        return {'errors': 'image needed'}

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'bad image'}

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    print(url)
    return {'url': url}
