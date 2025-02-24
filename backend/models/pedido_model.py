from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cliente = db.Column(db.String(255), nullable=False)
    valor = db.Column(db.Numeric(10, 2), nullable=False)
    descricao = db.Column(db.String(500), nullable=False)
    data_criacao = db.Column(db.DateTime, server_default=db.func.now())

    def __init__(self, cliente, valor, descricao):
        self.cliente = cliente
        self.valor = valor
        self.descricao = descricao

    def to_dict(self):
        return {
            'id': self.id,
            'cliente': self.cliente,
            'valor': float(self.valor),
            'descricao': self.descricao,
            'data_criacao': self.data_criacao.strftime("%Y-%m-%d %H:%M:%S")  # Formata a data
        }