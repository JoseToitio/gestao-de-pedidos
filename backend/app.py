from flask import Flask
from config import Config
from models import db
from routes.pedidos import pedidos_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(pedidos_bp)

if __name__ == '__main__':
    app.run(debug=True)