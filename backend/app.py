from flask import Flask
from config import Config
from models.pedido_model import db
from routes.pedidos_routes import pedidos_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(pedidos_bp)

if __name__ == '__main__':
    app.run(debug=True)