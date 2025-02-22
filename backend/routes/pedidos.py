from flask import Blueprint, request, jsonify
from models import db, Pedido

pedidos_bp = Blueprint('pedidos', __name__)

@pedidos_bp.route('/pedidos', methods=['POST'])
def criar_pedido():
    data = request.get_json()
    novo_pedido = Pedido(
        cliente=data['cliente'],
        valor=data['valor'],
        descricao=data['descricao']
    )
    db.session.add(novo_pedido)
    db.session.commit()
    return jsonify({'id': novo_pedido.id}), 201

@pedidos_bp.route('/pedidos', methods=['GET'])
def listar_pedidos():
    pedidos = Pedido.query.all()
    result = []
    for pedido in pedidos:
        result.append({
            'id': pedido.id,
            'cliente': pedido.cliente,
            'valor': float(pedido.valor),
            'descricao': pedido.descricao,
            'data_criacao': pedido.data_criacao
        })
    return jsonify(result)

@pedidos_bp.route('/pedidos/<id>', methods=['GET'])
def obter_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    return jsonify({
        'id': pedido.id,
        'cliente': pedido.cliente,
        'valor': float(pedido.valor),
        'descricao': pedido.descricao,
        'data_criacao': pedido.data_criacao
    })

@pedidos_bp.route('/pedidos/<id>', methods=['PUT'])
def atualizar_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    data = request.get_json()
    pedido.cliente = data['cliente']
    pedido.valor = data['valor']
    pedido.descricao = data['descricao']
    db.session.commit()
    return jsonify({
        'id': pedido.id,
        'cliente': pedido.cliente,
        'valor': float(pedido.valor),
        'descricao': pedido.descricao,
        'data_criacao': pedido.data_criacao
    })

@pedidos_bp.route('/pedidos/<id>', methods=['DELETE'])
def deletar_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    db.session.delete(pedido)
    db.session.commit()
    return jsonify({'message': 'Pedido deletado com sucesso'})

@pedidos_bp.route('/indicador', methods=['GET'])
def indicador():
    total_pedidos = Pedido.query.count()
    total_clientes = Pedido.query.with_entities(Pedido.cliente).distinct().count()
    media_pedidos = total_pedidos / total_clientes if total_clientes > 0 else 0
    return jsonify({'media_pedidos': media_pedidos})
