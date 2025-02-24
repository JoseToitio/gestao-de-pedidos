from flask import Blueprint, request, jsonify
from models.pedido_model import db, Pedido
from controllers.pedido_controller import criar_pedido, listar_pedidos, atualizar_pedido, deletar_pedido, obter_pedido, indicador
pedidos_bp = Blueprint('pedidos', __name__)

@pedidos_bp.route('/pedidos', methods=['POST'])
def criar():
    data = request.get_json()
    return criar_pedido(data)

@pedidos_bp.route('/pedidos', methods=['GET'])
def listar():
    return listar_pedidos()

@pedidos_bp.route('/pedidos/<id>', methods=['GET'])
def obter(id):
    return obter_pedido(id)

@pedidos_bp.route('/pedidos/<id>', methods=['PUT'])
def atualizar(id):
    data = request.get_json()
    return atualizar_pedido(id, data)

@pedidos_bp.route('/pedidos/<id>', methods=['DELETE'])
def deletar(id):
    return deletar_pedido(id)

@pedidos_bp.route('/indicador', methods=['GET'])
def indicador_total():
    return indicador()